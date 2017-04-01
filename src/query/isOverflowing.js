import getWindow from './getWindow';
import ownerDocument from './ownerDocument';

export default (container) => {
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
};
