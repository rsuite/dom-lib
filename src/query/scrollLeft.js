// @flow

import getWindow from './getWindow';

export default (node: HTMLElement, val?: number): number => {
  const win = getWindow(node);
  let left = node.scrollLeft;
  let top = 0;

  if (win) {
    left = 'pageXOffset' in win ? win.pageXOffset : win.document.documentElement.scrollLeft;
    top = 'pageYOffset' in win ? win.pageYOffset : win.document.documentElement.scrollTop;
  }

  if (val !== undefined) {
    if (win) {
      win.scrollTo(val, top);
    } else {
      node.scrollLeft = val;
    }
  }

  return left;
};
