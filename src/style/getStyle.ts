import camelizeStyleName from './camelizeStyleName';
import getComputedStyle from './getComputedStyle';
import hyphenateStyleName from './hyphenateStyleName';

export default (node: Element, property?: string) => {
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
};
