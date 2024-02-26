import { globalColor } from '@/style/css-variable';
import generateCssVar from '@/style/utils/generate-css-variable';

export function setCssVariable() {
  const r = document.querySelector(':root');
  r?.setAttribute('style', generateCssVar(globalColor));
}
