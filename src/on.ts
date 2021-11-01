/**
 * Bind `target` event `eventName`'s callback `listener`.
 */

export interface CustomEventListener<T = any> {
  (evt: T): void;
}
export default function on<K extends keyof DocumentEventMap>(
  target: Element | Window | Document | EventTarget,
  eventType: K,
  listener: EventListenerOrEventListenerObject | CustomEventListener,
  options: boolean | AddEventListenerOptions = false
): { off: () => void } {
  target.addEventListener(eventType, listener, options);

  return {
    off() {
      target.removeEventListener(eventType, listener, options);
    }
  };
}
