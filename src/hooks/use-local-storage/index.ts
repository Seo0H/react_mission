import { useCallback, useEffect, useState, type Dispatch, type SetStateAction } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T | undefined,
): [T, Dispatch<SetStateAction<T>>, () => void] {
  const serializer = useCallback<(value: T) => string>((value) => JSON.stringify(value), []);

  const deserializer = useCallback<(value: string) => T>(
    (value) => {
      // Support 'undefined' as a value
      if (value === 'undefined') {
        return undefined as unknown as T;
      }

      const defaultValue = initialValue instanceof Function ? initialValue() : initialValue;

      let parsed: unknown;

      try {
        parsed = JSON.parse(value);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        return defaultValue; // Return initialValue if parsing fails
      }

      return parsed as T;
    },
    [initialValue],
  );

  // 로컬 저장소에서 가져온 다음
  // 저장된 json을 구문 분석하거나 초기 값을 반환합니다.
  const readValue = useCallback((): T => {
    const initialValueToUse = initialValue instanceof Function ? initialValue() : initialValue;

    // 빌드 오류 "창이 정의되지 않았습니다"를 방지하지만 계속 작동합니다.

    try {
      const raw = window.localStorage.getItem(key);
      return raw ? deserializer(raw) : initialValueToUse;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValueToUse;
    }
  }, [initialValue, key, deserializer]);

  const [storedValue, setStoredValue] = useState(() =>
    initialValue instanceof Function ? initialValue() : initialValue,
  );

  // useState의 setter 함수의 래핑된 버전을 반환합니다.
  // 새 값을 localStorage에 유지합니다.
  const setValue: Dispatch<SetStateAction<T>> = (value) => {
    try {
      // 값이 함수가 되도록 허용하여 useState와 동일한 API를 갖습니다.
      const newValue = value instanceof Function ? value(readValue()) : value;

      // Save to local storage
      window.localStorage.setItem(key, serializer(newValue));

      // Save state
      setStoredValue(newValue);

      //모든 유사한 useLocalStorage 후크에 알림을 보낼 수 있도록 맞춤 이벤트를 전달합니다.
      window.dispatchEvent(new StorageEvent('local-storage', { key }));
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  };

  const removeValue = () => {
    const defaultValue = initialValue instanceof Function ? initialValue() : initialValue;

    // 로컬 저장소에서 키를 제거합니다.
    window.localStorage.removeItem(key);

    // 상태를 기본값으로 저장
    setStoredValue(defaultValue);

    // 모든 유사한 useLocalStorage 후크에 알림을 보낼 수 있도록 맞춤 이벤트를 전달합니다.
    window.dispatchEvent(new StorageEvent('local-storage', { key }));
  };

  const setStorageAndReadValue = () => setStoredValue(readValue());

  useEffect(() => {
    setStorageAndReadValue();
  }, [key]);

  useEffect(() => {
    window.addEventListener('storage', setStorageAndReadValue);
    return () => window.removeEventListener('storage', setStorageAndReadValue);
  }, [key]);

  return [storedValue, setValue, removeValue];
}
