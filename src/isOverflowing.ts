import getWindow from './getWindow';
import ownerDocument from './ownerDocument';

function bodyIsOverflowing(node) {
  const doc = ownerDocument(node);
  const win = getWindow(doc);
  const fullWidth = win.innerWidth;

  if (doc.body) {
    return doc.body.clientWidth < fullWidth;
  }

  return false;
}

/**
 * Check if the document is overflowing and account for the scrollbar width
 * @param container The container to check
 * @returns The document is overflowing
 */
export default function isOverflowing(container: Element) {
  const win = getWindow(container);
  const isBody = container && container.tagName.toLowerCase() === 'body';

  return win || isBody
    ? bodyIsOverflowing(container)
    : container.scrollHeight > container.clientHeight;
}
