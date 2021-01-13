import getWindow from './getWindow';

export default (node: HTMLElement, val?: number): number => {
  const win = getWindow(node);
  let left = node.scrollLeft;
  let top = 0;

  if (win) {
    left = win.pageXOffset;
    top = win.pageYOffset;
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
