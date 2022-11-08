/**
 * Get the name of the DOM element
 * @param node The DOM element
 * @returns The name of the DOM element
 */
export default function nodeName(node: Element): string {
  return node?.nodeName && node?.nodeName?.toLowerCase();
}
