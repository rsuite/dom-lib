import hasClass from './hasClass';

/**
 * @param target The element to add class to
 * @param className The class to be added
 *
 * @returns The target element
 */
export default function addClass(target: Element, className: string): Element {
  if (className) {
    if (target.classList) {
      target.classList.add(className);
    } else if (!hasClass(target, className)) {
      target.className = `${target.className} ${className}`;
    }
  }
  return target;
}
