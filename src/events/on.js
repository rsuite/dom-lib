// @flow

/**
 * Bind `target` event `eventName`'s callback `listener`.
 * @param  {Element} target
 * @param  {String} eventName
 * @param  {Function} listener
 * @param  {Boolean} capture
 * @return {Object}
 */
export default (
  target: HTMLElement,
  eventName: string,
  listener: Function,
  capture?: boolean = false
): { off: Function } => {
  target.addEventListener(eventName, listener, capture);
  return {
    off() {
      target.removeEventListener(eventName, listener, capture);
    }
  };
};
