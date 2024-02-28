import hasClass from './hasClass';
import addClass from './addClass';
import removeClass from './removeClass';

/**
 * Toggle a class on an element
 * @param target The DOM element
 * @param className The class name
 * @returns The DOM element
 */
export default function toggleClass(target: Element, className: string): Element {
  if (hasClass(target, className)) {
    return removeClass(target, className);
  }
  return addClass(target, className);
}
