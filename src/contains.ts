import canUseDOM from './canUseDOM';

const fallback = (context: Element, node: (Node & ParentNode) | null) => {
  if (!node) return false;

  do {
    if (node === context) {
      return true;
    }
  } while (node.parentNode && (node = node.parentNode));

  return false;
};

/**
 * Checks if an element contains another given element.
 *
 * @param context The context element
 * @param node The element to check
 * @returns  `true` if the given element is contained, `false` otherwise
 */

const contains = (context: Element, node: (Node & ParentNode) | null) => {
  if (!node) return false;

  if (context.contains) {
    return context.contains(node);
  } else if (context.compareDocumentPosition) {
    return context === node || !!(context.compareDocumentPosition(node) & 16);
  }

  return fallback(context, node);
};

export default (() => (canUseDOM ? contains : fallback))();
