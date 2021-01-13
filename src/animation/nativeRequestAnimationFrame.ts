// @flow

import getGlobal from '../getGlobal';

const g = getGlobal();

export default g.requestAnimationFrame || g.webkitRequestAnimationFrame;
