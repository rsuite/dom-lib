/**
 * Source code reference from:
 * https://github.com/facebook/fbjs/blob/d308fa83c9/packages/fbjs/src/dom/translateDOMPositionXY.js
 */

import BrowserSupportCore from './utils/BrowserSupportCore';
import getVendorPrefixedName from './utils/getVendorPrefixedName';
import getGlobal from './utils/getGlobal';

const g = getGlobal();
const TRANSFORM = getVendorPrefixedName('transform');
const BACKFACE_VISIBILITY = getVendorPrefixedName('backfaceVisibility');

export interface Options {
  enableTransform?: boolean;
  enable3DTransform?: boolean;
  forceUseTransform?: boolean;
}

const appendLeftAndTop = (style: CSSStyleDeclaration, x = 0, y = 0) => {
  style.left = `${x}px`;
  style.top = `${y}px`;

  return style;
};

const appendTranslate = (style: CSSStyleDeclaration, x = 0, y = 0) => {
  style[TRANSFORM] = `translate(${x}px,${y}px)`;

  return style;
};

const appendTranslate3d = (style: CSSStyleDeclaration, x = 0, y = 0) => {
  style[TRANSFORM] = `translate3d(${x}px,${y}px,0)`;
  style[BACKFACE_VISIBILITY] = 'hidden';

  return style;
};

export const getTranslateDOMPositionXY = (conf?: Options) => {
  const { enableTransform = true, enable3DTransform = true, forceUseTransform } = conf || {};
  if (forceUseTransform) {
    return conf.enable3DTransform ? appendTranslate3d : appendTranslate;
  }

  if (BrowserSupportCore.hasCSSTransforms() && enableTransform) {
    const ua = g.window ? g.window.navigator.userAgent : 'UNKNOWN';
    const isSafari = /Safari\//.test(ua) && !/Chrome\//.test(ua);

    // It appears that Safari messes up the composition order
    // of GPU-accelerated layers
    // (see bug https://bugs.webkit.org/show_bug.cgi?id=61824).
    // Use 2D translation instead.
    if (!isSafari && BrowserSupportCore.hasCSS3DTransforms() && enable3DTransform) {
      return appendTranslate3d;
    }

    return appendTranslate;
  }

  return appendLeftAndTop;
};

const translateDOMPositionXY = getTranslateDOMPositionXY();

export default translateDOMPositionXY;
