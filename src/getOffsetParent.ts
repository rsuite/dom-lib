import ownerDocument from './ownerDocument';
import nodeName from './nodeName';
import getStyle from './getStyle';

/**
 * Get the offset parent of a DOM element
 * @param node The DOM element
 * @returns The offset parent of the DOM element
 */
export default function getOffsetParent(node: Element): Element {
  const doc = ownerDocument(node);
  let offsetParent: Element = (node as HTMLElement)?.offsetParent;

  while (
    offsetParent &&
    nodeName(node) !== 'html' &&
    getStyle(offsetParent, 'position') === 'static'
  ) {
    offsetParent = (offsetParent as HTMLElement).offsetParent;
  }

  return offsetParent || doc.documentElement;
}
