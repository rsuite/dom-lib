export default (node: any): Window => {
  if (node === node?.window) {
    return node;
  }

  return node?.nodeType === 9 ? node?.defaultView || node?.parentWindow : null;
};
