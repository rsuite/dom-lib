import getOffsetParent from './getOffsetParent';
import getOffset from './getOffset';
import { getStyle } from '../style';
import scrollTop from './scrollTop';
import scrollLeft from './scrollLeft';
import nodeName from './nodeName';

export default (node, offsetParent) => {
  let parentOffset = {
    top: 0,
    left: 0
  };
  let offset;

  // Fixed elements are offset from window (parentOffset = {top:0, left: 0},
  // because it is its only offset parent
  if (getStyle(node, 'position') === 'fixed') {
    offset = node.getBoundingClientRect();
  } else {

    offsetParent = offsetParent || getOffsetParent(node);
    offset = getOffset(node);

    if (nodeName(offsetParent) !== 'html') {
      parentOffset = getOffset(offsetParent);
    }

    parentOffset.top += (parseInt(getStyle(offsetParent, 'borderTopWidth'), 10) - scrollTop(offsetParent)) || 0;
    parentOffset.left += (parseInt(getStyle(offsetParent, 'borderLeftWidth'), 10) - scrollLeft(offsetParent)) || 0;
  }


  // Subtract parent offsets and node margins
  return {
    ...offset,
    top: offset.top - parentOffset.top - (parseInt(getStyle(node, 'marginTop'), 10) || 0),
    left: offset.left - parentOffset.left - (parseInt(getStyle(node, 'marginLeft'), 10) || 0)
  };
};
