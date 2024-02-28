import getWindow from './getWindow';
import getOffset from './getOffset';

/**
 * Get the height of a DOM element
 * @param node The DOM element
 * @param client Whether to get the client height
 * @returns The height of the DOM element
 */
export default function getHeight(node: Element | Window, client?: Element): number {
  const win = getWindow(node);

  if (win) {
    return win.innerHeight;
  }

  return client ? (node as Element).clientHeight : getOffset(node as Element).height;
}
