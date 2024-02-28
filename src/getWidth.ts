import getWindow from './getWindow';
import getOffset from './getOffset';

/**
 * Get the width of a DOM element
 * @param node The DOM element
 * @param client Whether to get the client width
 * @returns The width of the DOM element
 */
export default function getWidth(node: Element | Window, client?: Element): number {
  const win = getWindow(node);

  if (win) {
    return win.innerWidth;
  }

  if (client) {
    return (node as Element).clientWidth;
  }

  const offset = getOffset(node as Element);

  return offset ? offset.width : 0;
}
