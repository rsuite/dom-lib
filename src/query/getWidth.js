// @flow

import getWindow from './getWindow';
import getOffset from './getOffset';

export default (node: HTMLElement, client: HTMLElement): number => {
  const win = getWindow(node);

  if (win) {
    return win.innerWidth;
  }

  if (client) {
    return node.clientWidth;
  }

  const offset = getOffset(node);

  return offset ? offset.width : 0;
};
