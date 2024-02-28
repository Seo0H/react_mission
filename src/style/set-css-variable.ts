import { globalColor, globalFontSize } from '@/style/css-variable';
import { generateCssVar } from '@/style/utils/generate-css-variable';

export function setCssVariable() {
  const r = document.querySelector(':root');
  r?.setAttribute('style', `${generateCssVar(globalColor)} ${generateCssVar(globalFontSize)} --header-height:80px`); // TODO: fix hard coding
}
