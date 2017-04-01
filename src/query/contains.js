import canUseDOM from './canUseDOM';

export default (function () {
    var root = canUseDOM && document.documentElement;

    return (root && root.contains) ?
        (context, node) => {
            return context.contains(node);
        } : (root && root.compareDocumentPosition) ?
            (context, node) => {
                return context === node || !!(context.compareDocumentPosition(node) & 16);
            } : (context, node) => {
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
