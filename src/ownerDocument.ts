export default (node: Element | null): Document => (node && node.ownerDocument) || document;
