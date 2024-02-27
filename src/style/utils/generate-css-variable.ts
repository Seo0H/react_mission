import type { GlobalColor, GlobalFontSize } from '@/style/css-variable';

/**
 * @param globalColor 전역 스타일 CSS Variable이 선언되어있는 객체
 * @description 전역 스타일 객체를 CSS Variable 형식의 String으로 변환하는 함수.
 * 전역 스타일에 주입하기 위해 사용.
 */
export default function generateCssVar(globalColor: GlobalColor) {
  return Object.entries(globalColor).reduce((mergeCssVars, [key, val]) => {
    key = camelToKebab(key);
    // 명도로 표현되는 색상 판별
    if (typeof val === 'object') {
      return `${mergeCssVars}${Object.entries(val).reduce(getBrightnessCssVar, '')}`;
    }

    return `${mergeCssVars}--${key}:${val};`;

    function getBrightnessCssVar(prev: string, [brightness, color]: [string, string]) {
      return `${prev}--${key}-${brightness}:${color};`;
    }
  }, '');
}

export function generateFontSizeCssVar(globalFontSize: GlobalFontSize) {
  return Object.entries(globalFontSize).reduce((mergeCssVar, [key, val]) => {
    key = camelToKebab(key);
    return `${mergeCssVar}--font-size-${key}:${val};`;
  }, '');
}

function camelToKebab(input: string) {
  return input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}