
function removeStyle(node, key) {
  return ('removeProperty' in node.style) ? node.style.removeProperty(key) : node.style.removeAttribute(key);
}

/**
 *
 * key(s) typeof [string , array] ?
 */
export default (node, keys) => {

  if (typeof key === 'string') {
    return removeStyle(node, keys);
  } else if (Object.prototype.toString.call(keys) === '[object Array]') {
    keys.forEach(key => removeStyle(node, key));
  }
};
