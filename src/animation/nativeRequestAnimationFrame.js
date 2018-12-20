// @flow

import getGlobal from '../getGlobal';

const g = getGlobal();

export default g.requestAnimationFrame ||
  g.webkitRequestAnimationFrame ||
  g.mozRequestAnimationFrame ||
  g.oRequestAnimationFrame ||
  g.msRequestAnimationFrame;
