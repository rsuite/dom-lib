// @flow

import ownerDocument from './ownerDocument';
import nodeName from './nodeName';
import { getStyle } from '../style';

export default (node: HTMLElement): HTMLElement => {
  const doc = ownerDocument(node);
  let offsetParent: any = node && node.offsetParent;

  while (
    offsetParent &&
    nodeName(node) !== 'html' &&
    getStyle(offsetParent, 'position') === 'static'
  ) {
    offsetParent = offsetParent.offsetParent;
  }

  return offsetParent || doc.documentElement;
};
