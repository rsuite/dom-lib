import ownerDocument from './ownerDocument';

/**
 * Returns the top-level window object of the node.
 * @param componentOrElement The DOM element
 * @returns The top-level window object of the node
 */
export default function ownerWindow(componentOrElement: Element): Window {
  const doc = ownerDocument(componentOrElement);
  return doc.defaultView;
}
