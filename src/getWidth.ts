import getWindow from './getWindow';
import getOffset from './getOffset';

export default (node: Element | Window, client?: Element): number => {
  const win = getWindow(node);

  if (win) {
    return win.innerWidth;
  }

  if (client) {
    return (node as Element).clientWidth;
  }

  const offset = getOffset(node as Element);

  return offset ? offset.width : 0;
};
