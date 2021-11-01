import canUseDOM from './canUseDOM';

const vendorMap = {
  animation: 'animationend',
  OAnimation: 'oAnimationEnd',
  MozAnimation: 'animationend',
  WebkitAnimation: 'webkitAnimationEnd'
};

function getAnimationEnd() {
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

export default getAnimationEnd;
