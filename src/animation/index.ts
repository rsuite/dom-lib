import { canUseDOM } from '../query';

export { default as cancelAnimationFramePolyfill } from './cancelAnimationFramePolyfill';
export { default as nativeRequestAnimationFrame } from './nativeRequestAnimationFrame';
export { default as requestAnimationFramePolyfill } from './requestAnimationFramePolyfill';

const vendorMap = {
  animation: 'animationend',
  OAnimation: 'oAnimationEnd',
  MozAnimation: 'animationend',
  WebkitAnimation: 'webkitAnimationEnd'
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
    end: getAnimationEvent()
  };
};
