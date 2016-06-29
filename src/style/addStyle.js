import hyphenateStyleName from './hyphenateStyleName';
import removeStyle from './removeStyle';

export default function addStyle(node, property, value) {
    let css = '';
    let props = property;

    for (var key in props) {
        if (Object.prototype.hasOwnProperty.call(props, key)) {
            !props[key] && props[key] !== 0 ?
                removeStyle(node, hyphenateStyleName(key))
                : (css += hyphenateStyleName(key) + ':' + props[key] + ';');
        }
    }

    node.style.cssText += ';' + css;
}
