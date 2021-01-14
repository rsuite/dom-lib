export default (node: HTMLElement): Document => (node && node.ownerDocument) || document;
