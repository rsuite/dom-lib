// @flow

import camelizeStyleName from './camelizeStyleName';
import getComputedStyle from './getComputedStyle';
import hyphenateStyleName from './hyphenateStyleName';

export default (node: HTMLElement, property?: string) => {
  if (property) {
    const value = node.style[camelizeStyleName(property)];

    if (value) {
      return value;
    }

    const styles = getComputedStyle(node);

    if (styles) {
      return styles.getPropertyValue(hyphenateStyleName(property));
    }
  }

  return node.style || getComputedStyle(node);
};
