import getWindow from './getWindow';

export default (node, val) => {

    let win = getWindow(node);
    let left = win ? (('pageXOffset' in win) ? win.pageXOffset : win.document.documentElement.scrollLeft) : node.scrollLeft;
    let top = win ? (('pageYOffset' in win) ? win.pageYOffset : win.document.documentElement.scrollTop) : 0;

    if (val === undefined) {
        return left;
    }

    win ? win.scrollTo(val, top) : node.scrollLeft = val;
};
