import canUseDOM from './canUseDOM';

export default (function () {
    const root = canUseDOM && document.documentElement;

    if (root && root.contains) {
        return (context, node) => {
            return context.contains(node);
        };
    } else if (root && root.compareDocumentPosition) {
        return (context, node) => {
            return context === node || !!(context.compareDocumentPosition(node) & 16);
        };
    } else {
        return (context, node) => {
            if (node) {
                do {
                    if (node === context) {
                        return true;
                    }
                } while ((node = node.parentNode));
            }
            return false;
        };
    }

})();
