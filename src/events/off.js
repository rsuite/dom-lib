const bind = window.addEventListener ? 'addEventListener' : 'attachEvent';
const unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent';
const eventPrefix = bind !== 'addEventListener' ? 'on' : '';

/**
 * Unbind `target` event `eventName`'s callback `listener`.
 *
 * @param {Element} target
 * @param {String} eventName
 * @param {Function} listener
 * @param {Boolean} capture
 * @api public
 */

export default (target, eventName, listener, capture = false) => {
    target[unbind](eventPrefix + eventName, listener, capture);
};
