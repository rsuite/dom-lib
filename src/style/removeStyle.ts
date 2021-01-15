function removeStyle(node: Element, key: string) {
  (node as HTMLElement).style?.removeProperty?.(key);
}

/**
 * key(s) typeof [string , array] ?
 */
export default (node: Element, keys: string | Array<string>) => {
  if (typeof keys === 'string') {
    removeStyle(node, keys);
  } else if (Array.isArray(keys)) {
    keys.forEach(key => removeStyle(node, key));
  }
};
