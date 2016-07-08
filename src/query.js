const ReactDOM  = require('react-dom');
const { getStyle }  = require('./style');


function ownerDocument(componentOrElement) {
    let node = ReactDOM.findDOMNode(componentOrElement);
    return (node && node.ownerDocument) || document;
}

function ownerWindow(componentOrElement) {
    let doc = ownerDocument(componentOrElement);
    return doc && doc.defaultView || doc.parentWindow;
}

function getWindow(node) {
    return node === node.window ?
        node : node.nodeType === 9 ?
        node.defaultView || node.parentWindow : false;
}

function getContainer(container, defaultContainer) {
    container = typeof container === 'function' ? container() : container;
    return ReactDOM.findDOMNode(container) || defaultContainer;
}

const canUseDOM = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
);


const contains = (function() {
    var root = canUseDOM && document.documentElement;

    return (root && root.contains) ?
        function(context, node) {
            return context.contains(node);
        } : (root && root.compareDocumentPosition) ?
        function(context, node) {
            return context === node || !!(context.compareDocumentPosition(node) & 16);
        } : function(context, node) {
            if (node) {
                do {
                    if (node === context) {
                        return true;
                    }
                } while ((node = node.parentNode));
            }
            return false;
        };
})();

function nodeName(node) {
    return node.nodeName && node.nodeName.toLowerCase();
}


function scrollTop(node, val) {
    let win = getWindow(node);
    let top = win ? (('pageYOffset' in win) ? win.pageYOffset : win.document.documentElement.scrollTop) : node.scrollTop;
    let left = win ? (('pageXOffset' in win) ? win.pageXOffset : win.document.documentElement.scrollLeft) : 0;

    if (val === undefined) {
        return top;
    }

    win ? win.scrollTo(left, val) : node.scrollTop = val;
}


function scrollLeft(node, val) {

    let win = getWindow(node);
    let left = win ? (('pageXOffset' in win) ? win.pageXOffset : win.document.documentElement.scrollLeft) : node.scrollLeft;
    let top = win ? (('pageYOffset' in win) ? win.pageYOffset : win.document.documentElement.scrollTop) : 0;

    if (val === undefined) {
        return left;
    }

    win ? win.scrollTo(val, top) : node.scrollLeft = val;
}

function getOffset(node) {
    let doc = ownerDocument(node);
    let win = getWindow(doc);
    let docElem = doc && doc.documentElement;
    let box = {
        top: 0,
        left: 0,
        height: 0,
        width: 0
    };

    if (!doc) {
        return;
    }

    // Make sure it's not a disconnected DOM node
    if (!contains(docElem, node)) {
        return box;
    }

    if (node.getBoundingClientRect !== undefined) {
        box = node.getBoundingClientRect();
    }

    if (box.width || box.height) {

        box = {
            top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
            left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0),
            width: (box.width === null ? node.offsetWidth : box.width) || 0,
            height: (box.height === null ? node.offsetHeight : box.height) || 0
        };
    }

    return box;
}

function getOffsetParent(node) {
    let doc = ownerDocument(node),
        offsetParent = node && node.offsetParent;

    while (offsetParent && nodeName(node) !== 'html' && getStyle(offsetParent, 'position') === 'static') {
        offsetParent = offsetParent.offsetParent;
    }

    return offsetParent || doc.documentElement;
}


function getPosition(node, _offsetParent) {
    var _parentOffset = {
            top: 0,
            left: 0
        },
        _offset;

    // Fixed elements are offset from window (_parentOffset = {top:0, left: 0},
    // because it is its only offset parent
    if (getStyle(node, 'position') === 'fixed') {
        _offset = node.getBoundingClientRect();
    } else {

        _offsetParent = _offsetParent || offsetParent(node);
        _offset = offset(node);

        if (nodeName(_offsetParent) !== 'html') {
            _parentOffset = offset(_offsetParent);
        }

        _parentOffset.top += (parseInt(getStyle(_offsetParent, 'borderTopWidth'), 10) - scrollTop(_offsetParent)) || 0;
        _parentOffset.left += (parseInt(getStyle(_offsetParent, 'borderLeftWidth'), 10) - scrollLeft(_offsetParent)) || 0;
    }

    // Subtract parent offsets and node margins
    return {
        ...offset,
        top: _offset.top - _parentOffset.top - (parseInt(getStyle(node, 'marginTop'), 10) || 0),
        left: _offset.left - _parentOffset.left - (parseInt(getStyle(node, 'marginLeft'), 10) || 0)
    };
}


function isOverflowing(container) {
    let win = getWindow(container);
    let isBody = container && container.tagName.toLowerCase() === 'body';

    function bodyIsOverflowing(node) {
        let doc = ownerDocument(node);
        let win = getWindow(doc);
        let fullWidth = win.innerWidth;

        // Support: ie8, no innerWidth
        if (!fullWidth) {
            let documentElementRect = doc.documentElement.getBoundingClientRect();
            fullWidth = documentElementRect.right - Math.abs(documentElementRect.left);
        }
        return doc.body.clientWidth < fullWidth;
    }

    return win || isBody ? bodyIsOverflowing(container) : container.scrollHeight > container.clientHeight;
}

function activeElement(doc = document) {
    return doc.activeElement;
}

function getScrollbarSize(recalc) {
    let size;
    if (!size || recalc) {
        if (canUseDOM) {
            let scrollDiv = document.createElement('div');

            scrollDiv.style.position = 'absolute';
            scrollDiv.style.top = '-9999px';
            scrollDiv.style.width = '50px';
            scrollDiv.style.height = '50px';
            scrollDiv.style.overflow = 'scroll';

            document.body.appendChild(scrollDiv);
            size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
            document.body.removeChild(scrollDiv);
        }
    }

    return size;
}

function getHeight(node, client) {
    var win = getWindow(node);
    return win ? win.innerHeight : client ? node.clientHeight : getOffset(node).height;
}

function getWidth(node, client) {
    var win = getWindow(node);
    return win ? win.innerWidth : client ? node.clientWidth : getOffset(node).width;
}


module.exports = {
    ownerDocument,
    ownerWindow,
    getWindow,
    getContainer,
    canUseDOM,
    contains,
    nodeName,
    scrollTop,
    scrollLeft,
    getOffset,
    getOffsetParent,
    getPosition,
    isOverflowing,
    activeElement,
    getScrollbarSize,
    getHeight,
    getWidth
};
