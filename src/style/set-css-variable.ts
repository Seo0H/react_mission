import { globalColor, globalFontSize } from '@/style/css-variable';
import generateCssVar, { generateFontSizeCssVar } from '@/style/utils/generate-css-variable';

export function setCssVariable() {
  const r = document.querySelector(':root');
  r?.setAttribute('style', `${generateCssVar(globalColor)} ${generateFontSizeCssVar(globalFontSize)}`);
}
