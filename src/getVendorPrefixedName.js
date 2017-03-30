import { canUseDOM } from './query';
import { camelize } from './utils/stringFormatter';

let memoized = {};
let prefixes = ['Webkit', 'ms', 'Moz', 'O'];
let prefixRegex = new RegExp('^(' + prefixes.join('|') + ')');
let testStyle = canUseDOM ? document.createElement('div').style : {};

function getWithPrefix(name) {
    for (let i = 0; i < prefixes.length; i++) {
        let prefixedName = prefixes[i] + name;
        if (prefixedName in testStyle) {
            return prefixedName;
        }
    }
    return null;
}

/**
 * @param {string} property Name of a css property to check for.
 * @return {?string} property name supported in the browser, or null if not
 * supported.
 */
function getVendorPrefixedName(property) {
    let name = camelize(property);
    if (memoized[name] === undefined) {
        let capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
        if (prefixRegex.test(capitalizedName)) {
            throw new Error(
                'getVendorPrefixedName must only be called with unprefixed' +
                'CSS property names. It was called with %s', property
            );
        }
        memoized[name] = (name in testStyle) ? name : getWithPrefix(capitalizedName);
    }
    return memoized[name];
}

module.exports = getVendorPrefixedName;
