// @flow

import getWindow from './getWindow';

export default (node: HTMLElement, val?: number): number => {
  const win = getWindow(node);
  let top = node.scrollTop;
  let left = 0;

  if (win) {
    top = 'pageYOffset' in win ? win.pageYOffset : win.document.documentElement.scrollTop;
    left = 'pageXOffset' in win ? win.pageXOffset : win.document.documentElement.scrollLeft;
  }

  if (val !== undefined) {
    if (win) {
      win.scrollTo(left, val);
    } else {
      node.scrollTop = val;
    }
  }

  return top;
};
