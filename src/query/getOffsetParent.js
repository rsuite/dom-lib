import ownerDocument from './ownerDocument';
import nodeName from './nodeName';
import { getStyle } from '../style';
export default (node) => {
  let doc = ownerDocument(node),
    offsetParent = node && node.offsetParent;

  while (offsetParent && nodeName(node) !== 'html' && getStyle(offsetParent, 'position') === 'static') {
    offsetParent = offsetParent.offsetParent;
  }

  return offsetParent || doc.documentElement;
};
