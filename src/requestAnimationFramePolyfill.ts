import emptyFunction from './utils/emptyFunction';
import getGlobal from './utils/getGlobal';

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
 * @deprecated Use `requestAnimationFrame` instead.
 */
const requestAnimationFramePolyfill = g.requestAnimationFrame || _setTimeout;

// Works around a rare bug in Safari 6 where the first request is never invoked.
requestAnimationFramePolyfill(emptyFunction);

export default requestAnimationFramePolyfill;
