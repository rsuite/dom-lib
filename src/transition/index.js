import { canUseDOM } from '../query';

let has = Object.prototype.hasOwnProperty,
  transform = 'transform',
  transition = {},
  transitionTiming,
  transitionDuration,
  transitionProperty,
  transitionDelay,
  backfaceVisibility;

let prefix, transitionEnd;

if (canUseDOM) {
  transition = getTransitionProperties();
  ({ prefix, transitionEnd } = getTransitionProperties());

  transform = `${prefix}-${transform}`;
  transitionProperty = `${prefix}-transition-property`;
  transitionDuration = `${prefix}-transition-duration`;
  transitionDelay = `${prefix}-transition-delay`;
  transitionTiming = `${prefix}-transition-timing-function`;
  backfaceVisibility = `${prefix}-backface-visibility`;
}

function getTransitionProperties() {
  let style = document.createElement('div').style;

  let vendorMap = {
    O: e => `o${e.toLowerCase()}`,
    Moz: e => e.toLowerCase(),
    Webkit: e => `webkit${e}`,
    ms: e => `MS${e}`,
  };

  let vendors = Object.keys(vendorMap);
  let transitionEnd, animationEnd;
  let prefix = '';

  for (let i = 0; i < vendors.length; i++) {
    let vendor = vendors[i];

    if (`${vendor}TransitionProperty` in style) {
      prefix = `-${vendor.toLowerCase()}`;

      console.log(prefix);
      transitionEnd = vendorMap[vendor]('TransitionEnd');
      animationEnd = vendorMap[vendor]('AnimationEnd');
      break;
    }
  }

  if (!transitionEnd && 'transitionProperty' in style) {
    transitionEnd = 'transitionend';
  }


  if (!animationEnd && 'animationName' in style) {
    animationEnd = 'animationend';
  }


  style = null;

  return {
    animationEnd,
    transitionEnd,
    prefix
  };
}

export default {
  backfaceVisibility,
  transform,
  end: transitionEnd,
  property: transitionProperty,
  timing: transitionTiming,
  delay: transitionDelay,
  duration: transitionDuration
};
