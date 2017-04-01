import getWindow from './getWindow';

export default (node, val) => {
    let win = getWindow(node);
    let top = win ? (('pageYOffset' in win) ? win.pageYOffset : win.document.documentElement.scrollTop) : node.scrollTop;
    let left = win ? (('pageXOffset' in win) ? win.pageXOffset : win.document.documentElement.scrollLeft) : 0;

    if (val === undefined) {
        return top;
    }
    win ? win.scrollTo(left, val) : node.scrollTop = val;
};
