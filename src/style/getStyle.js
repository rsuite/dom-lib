import camelizeStyleName from './camelizeStyleName';
import getComputedStyle from './getComputedStyle';
import hyphenateStyleName from './hyphenateStyleName';

export default (node, property) => {

    if (property) {
        return node.style[camelizeStyleName(property)] || getComputedStyle(node).getPropertyValue(hyphenateStyleName(property));
    }

    return node.style || getComputedStyle(node);
};
