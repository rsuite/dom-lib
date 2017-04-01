
/**
 * gives the final used values of all the CSS properties of an element.
 */
export default (node) => {
    if (!node) {
        throw new TypeError('No Element passed to `getComputedStyle()`');
    }

    var doc = node.ownerDocument;

    if ('defaultView' in doc) {
        if (doc.defaultView.opener) {
            return node.ownerDocument.defaultView.getComputedStyle(node, null);
        }
        return window.getComputedStyle(node, null);

    }
    return {
        getPropertyValue(prop) {

            var style = node.style;

            prop = camelize(prop);

            if (prop === 'float') {
                prop = 'styleFloat';
            }

            let current = node.currentStyle[prop] || null;

            if (current === null && style && style[prop]) {
                current = style[prop];
            }

            if (rnumnonpx.test(current) && !rposition.test(prop)) {
                // Remember the original values
                let left = style.left;
                let runStyle = node.runtimeStyle;
                let rsLeft = runStyle && runStyle.left;

                // Put in the new values to get a computed value out
                if (rsLeft) {
                    runStyle.left = node.currentStyle.left;
                }

                style.left = prop === 'fontSize' ? '1em' : current;
                current = style.pixelLeft + 'px';

                // Revert the changed values
                style.left = left;
                if (rsLeft) {
                    runStyle.left = rsLeft;
                }
            }

            return current;
        }
    };

};
