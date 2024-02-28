/**
 * Get the Window object of browser
 * @param node The DOM element
 * @returns The Window object of browser
 */
export default function getWindow(node: any): Window {
  if (node === node?.window) {
    return node;
  }

  return node?.nodeType === 9 ? node?.defaultView || node?.parentWindow : null;
}
