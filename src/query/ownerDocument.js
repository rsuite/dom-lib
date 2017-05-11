export default (node) => {
  return (node && node.ownerDocument) || document;
};
