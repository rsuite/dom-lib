import getGlobal from '../getGlobal';

const g = getGlobal();

export default g.cancelAnimationFrame || g.webkitCancelAnimationFrame || g.clearTimeout;
