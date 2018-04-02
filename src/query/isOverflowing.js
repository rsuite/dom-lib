// @flow

import getWindow from './getWindow';
import ownerDocument from './ownerDocument';

function bodyIsOverflowing(node) {
  let doc = ownerDocument(node);
  let win = getWindow(doc);
  let fullWidth = win.innerWidth;

  if (doc.body) {
    return doc.body.clientWidth < fullWidth;
  }

  return false;
}

export default (container: HTMLElement): boolean => {
  let win = getWindow(container);
  let isBody = container && container.tagName.toLowerCase() === 'body';

  return win || isBody
    ? bodyIsOverflowing(container)
    : container.scrollHeight > container.clientHeight;
};
