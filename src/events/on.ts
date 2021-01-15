/**
 * Bind `target` event `eventName`'s callback `listener`.
 */

export default function on<K extends keyof DocumentEventMap>(
  target: Element | Window,
  eventType: K,
  listener: EventListenerOrEventListenerObject,
  options: boolean | AddEventListenerOptions = false
): { off: () => void } {
  target.addEventListener(eventType, listener, options);

  return {
    off() {
      target.removeEventListener(eventType, listener, options);
    }
  };
}
