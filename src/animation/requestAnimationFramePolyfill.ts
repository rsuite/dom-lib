// @flow

import nativeRequestAnimationFrame from './nativeRequestAnimationFrame';
import emptyFunction from '../utils/emptyFunction';
import getGlobal from '../getGlobal';

const g = getGlobal();
let lastTime = 0;

function _setTimeout(callback: (t: number) => void) {
  const currTime = Date.now();
  const timeDelay = Math.max(0, 16 - (currTime - lastTime));
  lastTime = currTime + timeDelay;
  return g.setTimeout(() => {
    callback(Date.now());
  }, timeDelay);
}

/**
 * Here is the native and polyfill version of requestAnimationFrame.
 * Please don't use it directly and use requestAnimationFrame module instead.
 */
const requestAnimationFrame =
  (nativeRequestAnimationFrame && nativeRequestAnimationFrame.bind(g)) || _setTimeout;

// Works around a rare bug in Safari 6 where the first request is never invoked.
requestAnimationFrame(emptyFunction);

export default requestAnimationFrame;
