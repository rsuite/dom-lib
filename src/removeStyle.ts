function _removeStyle(node: Element, key: string) {
  (node as HTMLElement).style?.removeProperty?.(key);
}

/**
 * Remove a style property from a DOM element
 * @param node The DOM element
 * @param keys key(s) typeof [string , array]
 */
export default function removeStyle(node: Element, keys: string | Array<string>) {
  if (typeof keys === 'string') {
    _removeStyle(node, keys);
  } else if (Array.isArray(keys)) {
    keys.forEach(key => _removeStyle(node, key));
  }
}
