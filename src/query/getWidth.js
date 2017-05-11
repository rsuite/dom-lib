import getWindow from './getWindow';
import getOffset from './getOffset';

export default (node, client) => {
  var win = getWindow(node);
  return win ? win.innerWidth : client ? node.clientWidth : getOffset(node).width;
};
