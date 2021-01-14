function removeStyle(node: HTMLElement, key: string) {
  node.style?.removeProperty?.(key);
}

/**
 * key(s) typeof [string , array] ?
 */
export default (node: HTMLElement, keys: string | Array<string>) => {
  if (typeof keys === 'string') {
    removeStyle(node, keys);
  } else if (Array.isArray(keys)) {
    keys.forEach(key => removeStyle(node, key));
  }
};
