import hyphenateStyleName from './utils/hyphenateStyleName';
import removeStyle from './removeStyle';

export interface CSSProperty {
  [key: string]: string | number;
}

/**
 * Apply a single CSS style rule to a given element
 *
 * @param node The element to add styles to
 * @param property The style property to be added
 * @param value The style value to be added
 */
function addStyle(node: Element, property: string, value: string | number): void;

/**
 * Apply multiple CSS style rules to a given element
 *
 * @param node The element to add styles to
 * @param properties The key-value object of style properties to be added
 */
function addStyle(node: Element, properties: Partial<CSSProperty>): void;
function addStyle(
  node: Element,
  property: string | Partial<CSSProperty>,
  value?: string | number
): void {
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
}

export default addStyle;
