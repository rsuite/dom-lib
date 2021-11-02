import getWindow from './getWindow';
import getOffset from './getOffset';

export default (node: Element | Window, client?: Element): number => {
  const win = getWindow(node);

  if (win) {
    return win.innerHeight;
  }

  return client ? (node as Element).clientHeight : getOffset(node as Element).height;
};
