import hyphenateStyleName from './utils/hyphenateStyleName';
import removeStyle from './removeStyle';

export interface CSSProperty {
  [key: string]: string | number;
}

export default (node: Element, property: string | CSSProperty, value?: string | number): void => {
  let css = '';
  let props = property;

  if (typeof property === 'string') {
    if (value === undefined) {
      throw new Error('value is undefined');
    }
    (props = {})[property] = value;
  }

  if (typeof props === 'object') {
    for (const key in props) {
      if (Object.prototype.hasOwnProperty.call(props, key)) {
        if (!props[key] && props[key] !== 0) {
          removeStyle(node, hyphenateStyleName(key));
        } else {
          css += `${hyphenateStyleName(key)}:${props[key]};`;
        }
      }
    }
  }

  (node as HTMLElement).style.cssText += `;${css}`;
};
