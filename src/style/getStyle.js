import camelizeStyleName from './camelizeStyleName';
import getComputedStyle from './getComputedStyle';
import hyphenateStyleName from './hyphenateStyleName';

export default function getStyle(node, property) {
    return node.style[camelizeStyleName(property)] || getComputedStyle(node).getPropertyValue(hyphenateStyleName(property));
}
