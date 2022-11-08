import camelizeStyleName from './utils/camelizeStyleName';
import getComputedStyle from './utils/getComputedStyle';
import hyphenateStyleName from './utils/hyphenateStyleName';

/**
 * Gets the value for a style property
 * @param node  The DOM element
 * @param property  The style property
 * @returns The value of the style property
 */
export default function getStyle(node: Element, property?: string) {
  if (property) {
    const value = (node as HTMLElement).style[camelizeStyleName(property)];

    if (value) {
      return value;
    }

    const styles = getComputedStyle(node);

    if (styles) {
      return styles.getPropertyValue(hyphenateStyleName(property));
    }
  }

  return (node as HTMLElement).style || getComputedStyle(node);
}
