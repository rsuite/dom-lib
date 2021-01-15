export default (node: Element): Document => (node && node.ownerDocument) || document;
