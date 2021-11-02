import ownerDocument from './ownerDocument';
import nodeName from './nodeName';
import getStyle from './getStyle';

export default (node: Element): Element => {
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
};
