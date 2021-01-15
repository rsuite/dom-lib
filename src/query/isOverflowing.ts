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

export default (container: Element) => {
  const win = getWindow(container);
  const isBody = container && container.tagName.toLowerCase() === 'body';

  return win || isBody
    ? bodyIsOverflowing(container)
    : container.scrollHeight > container.clientHeight;
};
