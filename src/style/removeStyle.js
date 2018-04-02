// @flow

function removeStyle(node: HTMLElement, key: string) {
  if ('removeProperty' in node.style) {
    node.style.removeProperty(key);
  } else if (typeof node.style.removeAttribute === 'function') {
    node.style.removeAttribute(key);
  }
}

/**
 * key(s) typeof [string , array] ?
 */
export default (node: HTMLElement, keys: string | Array<string>) => {
  if (typeof keys === 'string') {
    removeStyle(node, keys);
  } else if (Object.prototype.toString.call(keys) === '[object Array]') {
    keys.forEach(key => removeStyle(node, key));
  }
};
