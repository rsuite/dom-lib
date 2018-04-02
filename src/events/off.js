// @flow

/**
 * Unbind `target` event `eventName`'s callback `listener`.
 *
 * @param {Element} target
 * @param {String} eventName
 * @param {Function} listener
 * @param {Boolean} capture
 * @api public
 */

export default (
  target: HTMLElement,
  eventName: string,
  listener: Function,
  capture?: boolean = false
): void => {
  target.removeEventListener(eventName, listener, capture);
};
