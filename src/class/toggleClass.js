const hasClass = require('./hasClass');
const addClass = require('./addClass');
const removeClass = require('./removeClass');

module.exports = function toggleClass(target, className) {
    if (hasClass(target, className)) {
        return removeClass(target, className);
    }
    return addClass(target, className);
};
