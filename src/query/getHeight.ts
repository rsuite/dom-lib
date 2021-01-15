import getWindow from './getWindow';
import getOffset from './getOffset';

export default (node: Element, client?: Element): number => {
  const win = getWindow(node);

  if (win) {
    return win.innerHeight;
  }

  return client ? node.clientHeight : getOffset(node).height;
};
