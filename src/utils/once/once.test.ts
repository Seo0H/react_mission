// once.test.ts
import { once } from '.'; // your-module은 once 함수가 정의된 파일의 경로로 바꿔주세요.

describe('once', () => {
  it('once로 랩핑된 함수를 여러번 호출해도 한번만 호출되어야 합니다.', () => {
    const originalFunction = jest.fn();
    const onceFunction = once(originalFunction);

    // Call the onceFunction multiple times
    onceFunction();
    onceFunction();
    onceFunction();

    // Check if the original function is called only once
    expect(originalFunction).toHaveBeenCalledTimes(1);
  });

  it('기존 함수의 결과를 반환합니다.', () => {
    const originalFunction = jest.fn((num) => `${num}번 실행`);
    const onceFunction = once(originalFunction);

    // Call the onceFunction
    const result1 = onceFunction(1);
    const result2 = onceFunction(2);

    // Check if the result is correct
    expect(result1).toBe('1번 실행');
    expect(result2).toBe('1번 실행');
  });
});
