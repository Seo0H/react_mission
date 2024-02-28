import { camelToKebab } from '@/utils/camel-to-kebab';
import { isObject } from '@/utils/is';

import type { GlobalColor, GlobalFontSize } from '@/style/css-variable';

/**
 * @description 전역 스타일 객체를 CSS Variable 형식의 String으로 변환하는 함수.
 */
export const generateCssVar = (variable: GlobalColor | GlobalFontSize) => {
  const type = isColorType(variable) ? 'color' : 'font';
  return Object.entries(variable).reduce((mergeCssVars, [key, val]) => {
    key = camelToKebab(key);

    // 명도로 표현되는 색상 판별
    if (isBrightnessType(type, val)) {
      return `${mergeCssVars}${Object.entries(val).reduce(generateBrightnessCssVarString(key), '')}`;
    } else if (type === 'font') {
      return `${mergeCssVars}--font-size-${key}:${val};`;
    }

    return `${mergeCssVars}--${key}:${val};`;
  }, '');
};

/**
 * 특정 키, 밝기, 색상에 대한 CSS 변수 스타일 문자열을 생성합
 * @param  key - CSS 변수와 연결된 키
 * @returns 이전 스타일 문자열과 [밝기, 색상] 배열을 받아 CSS 변수 정의가 추가된 업데이트된 스타일 문자열을 반환하는 함수
 */
const generateBrightnessCssVarString =
  (key: string) =>
  (prev: string, [brightness, color]: [string, string]) => {
    return `${prev}--${key}-${brightness}:${color};`;
  };

const isColorType = (variable: GlobalColor | GlobalFontSize): variable is GlobalColor => {
  if ('mainColor' in variable) {
    return true;
  }

  return false;
};

const isBrightnessType = (
  type: 'color' | 'font',
  value: GlobalColor[keyof GlobalColor],
): value is GlobalColor[keyof GlobalColor] => {
  return type === 'color' && isObject(value);
};
