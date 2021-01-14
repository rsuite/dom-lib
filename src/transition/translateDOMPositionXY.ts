/**
 * Source code reference from:
 * https://github.com/facebook/fbjs/blob/d308fa83c9/packages/fbjs/src/dom/translateDOMPositionXY.js
 */

import BrowserSupportCore from '../BrowserSupportCore';
import getVendorPrefixedName from '../getVendorPrefixedName';
import getGlobal from '../getGlobal';

const g = getGlobal();
const TRANSFORM = getVendorPrefixedName('transform');
const BACKFACE_VISIBILITY = getVendorPrefixedName('backfaceVisibility');

interface Options {
  enable3DTransform?: boolean;
}

export const getTranslateDOMPositionXY = (conf: Options = { enable3DTransform: true }) => {
  if (BrowserSupportCore.hasCSSTransforms()) {
    const ua = g.window ? g.window.navigator.userAgent : 'UNKNOWN';
    const isSafari = /Safari\//.test(ua) && !/Chrome\//.test(ua);

    // It appears that Safari messes up the composition order
    // of GPU-accelerated layers
    // (see bug https://bugs.webkit.org/show_bug.cgi?id=61824).
    // Use 2D translation instead.
    if (!isSafari && BrowserSupportCore.hasCSS3DTransforms() && conf.enable3DTransform) {
      return (style: CSSStyleDeclaration, x = 0, y = 0) => {
        style[TRANSFORM] = `translate3d(${x}px,${y}px,0)`;
        style[BACKFACE_VISIBILITY] = 'hidden';

        return style;
      };
    }

    return (style: CSSStyleDeclaration, x = 0, y = 0) => {
      style[TRANSFORM] = `translate(${x}px,${y}px)`;

      return style;
    };
  }

  return (style: CSSStyleDeclaration, x = 0, y = 0) => {
    style.left = `${x}px`;
    style.top = `${y}px`;

    return style;
  };
};

const translateDOMPositionXY = getTranslateDOMPositionXY();

export default translateDOMPositionXY;
