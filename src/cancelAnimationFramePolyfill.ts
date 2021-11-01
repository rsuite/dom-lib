import getGlobal from './utils/getGlobal';

const g = getGlobal();

/**
 * @deprecated use `cancelAnimationFrame` instead
 */
export default g.cancelAnimationFrame || g.clearTimeout;
