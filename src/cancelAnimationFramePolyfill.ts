import getGlobal from './utils/getGlobal';

const g = getGlobal();

/**
 * @deprecated use `cancelAnimationFrame` instead
 */
const cancelAnimationFramePolyfill = g.cancelAnimationFrame || g.clearTimeout;

export default cancelAnimationFramePolyfill;
