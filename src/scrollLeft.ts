import getWindow from './getWindow';

/**
 * Gets the number of pixels to scroll the element's content from the left edge.
 * @param node The DOM element
 */
function scrollLeft(node: Element): number;

/**
 * Sets the number of pixels to scroll the element's content from its left edge.
 * @param node The DOM element
 * @param val The number of pixels to scroll the element's content from its left edge
 */
function scrollLeft(node: Element, val: number): void;
function scrollLeft(node: Element, val?: number): number {
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
}

export default scrollLeft;
