// @flow

import BrowserSupportCore from '../BrowserSupportCore';
import getVendorPrefixedName from '../getVendorPrefixedName';

const TRANSFORM = getVendorPrefixedName('transform');
const BACKFACE_VISIBILITY = getVendorPrefixedName('backfaceVisibility');

const translateDOMPositionXY = (() => {
  if (BrowserSupportCore.hasCSSTransforms()) {
    let ua = global.window ? global.window.navigator.userAgent : 'UNKNOWN';
    let isSafari = /Safari\//.test(ua) && !/Chrome\//.test(ua);

    // It appears that Safari messes up the composition order
    // of GPU-accelerated layers
    // (see bug https://bugs.webkit.org/show_bug.cgi?id=61824).
    // Use 2D translation instead.
    if (!isSafari && BrowserSupportCore.hasCSS3DTransforms()) {
      return (style: Object, x: number = 0, y: number = 0) => {
        style[TRANSFORM] = `translate3d(${x}px,${y}px,0)`;
        style[BACKFACE_VISIBILITY] = 'hidden';

        return style;
      };
    }

    return (style: Object, x: number = 0, y: number = 0) => {
      style[TRANSFORM] = `translate(${x}px,${y}px)`;

      return style;
    };
  }

  return (style: Object, x: number = 0, y: number = 0) => {
    style.left = `${x}px`;
    style.top = `${y}px`;

    return style;
  };
})();

export default translateDOMPositionXY;
