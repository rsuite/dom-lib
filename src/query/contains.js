// @flow

/* eslint-disable */

import canUseDOM from './canUseDOM';

const fallback = (context: any, node: any) => {
  if (node) {
    do {
      if (node === context) {
        return true;
      }
    } while ((node = node.parentNode));
  }
  return false;
};

// HTML DOM and SVG DOM may have different support levels,
// so we need to check on context instead of a document root element.
const contains = (context: any, node: any) => {
  if (context.contains) {
    return context.contains(node);
  } else if (context.compareDocumentPosition) {
    return context === node || !!(context.compareDocumentPosition(node) & 16);
  }

  return fallback(context, node);
};

export default (() => (canUseDOM ? contains : fallback))();
