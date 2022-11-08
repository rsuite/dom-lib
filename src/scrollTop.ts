import getWindow from './getWindow';

/**
 * Gets the number of pixels that an element's content is scrolled vertically.
 * @param node The DOM element
 */
function scrollTop(node: Element): number;

/**
 * Sets the number of pixels that an element's content is scrolled vertically.
 * @param node The DOM element
 * @param val The number of pixels that an element's content is scrolled vertically
 */
function scrollTop(node: Element, val: number): void;
function scrollTop(node: Element, val?: number): number {
  const win = getWindow(node);
  let top = node.scrollTop;
  let left = 0;

  if (win) {
    top = win.pageYOffset;
    left = win.pageXOffset;
  }

  if (val !== undefined) {
    if (win) {
      win.scrollTo(left, val);
    } else {
      node.scrollTop = val;
    }
  }

  return top;
}

export default scrollTop;
