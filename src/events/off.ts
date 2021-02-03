export interface CustomEventListener<T = any> {
  (evt: T): void;
}

/**
 * Unbind `target` event `eventName`'s callback `listener`.
 */

export default function on<K extends keyof DocumentEventMap>(
  target: Element | Window | Document | EventTarget,
  eventName: K,
  listener: EventListenerOrEventListenerObject | CustomEventListener,
  options: boolean | AddEventListenerOptions = false
): void {
  target.removeEventListener(eventName, listener, options);
}
