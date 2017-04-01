const camelizeStyleName = require('./camelizeStyleName');
const getComputedStyle = require('./getComputedStyle');
const hyphenateStyleName = require('./hyphenateStyleName');

module.exports = function getStyle(node, property) {

    if (property) {
        return node.style[camelizeStyleName(property)] || getComputedStyle(node).getPropertyValue(hyphenateStyleName(property));
    }

    return node.style || getComputedStyle(node);
};
