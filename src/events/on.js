const bind = window.addEventListener ? 'addEventListener' : 'attachEvent';
const unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent';
const eventPrefix = bind !== 'addEventListener' ? 'on' : '';

/**
 * Bind `target` event `eventName`'s callback `listener`.
 * @param  {Element} target
 * @param  {String} eventName
 * @param  {Function} listener
 * @param  {Boolean} capture
 * @return {Object}
 */
export default function on(target, eventName, listener, capture = false) {
    target[bind](eventPrefix + eventName, listener, capture);
    return {
        off() {
            target[unbind](eventPrefix + eventName, listener, capture);
        }
    };
}
