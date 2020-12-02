import { canUseDOM } from '../query';

export cancelAnimationFramePolyfill from './cancelAnimationFramePolyfill';
export nativeRequestAnimationFrame from './nativeRequestAnimationFrame';
export requestAnimationFramePolyfill from './requestAnimationFramePolyfill';

const vendorMap = {
  animation: 'animationend',
  OAnimation: 'oAnimationEnd',
  MozAnimation: 'animationend',
  WebkitAnimation: 'webkitAnimationEnd',
};

function getAnimationEvent() {
  if (!canUseDOM) {
    return;
  }

  let tempAnimationEnd;
  const style = document.createElement('div').style;
  for (tempAnimationEnd in vendorMap) {
    if (style[tempAnimationEnd] !== undefined) {
      return vendorMap[tempAnimationEnd];
    }
  }
}

export const events = () => {
  return {
    end: getAnimationEvent(),
  };
};
