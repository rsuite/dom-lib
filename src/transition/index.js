import { canUseDOM } from '../query';

let has = Object.prototype.hasOwnProperty,
  transform = 'transform',
  transition = {},
  transitionTiming,
  transitionDuration,
  transitionProperty,
  transitionDelay,
  backfaceVisibility;

if (canUseDOM) {
  transition = getTransitionProperties();

  transform = transition.prefix + transform;

  transitionProperty = transition.prefix + 'transition-property';
  transitionDuration = transition.prefix + 'transition-duration';
  transitionDelay = transition.prefix + 'transition-delay';
  transitionTiming = transition.prefix + 'transition-timing-function';
  backfaceVisibility = transition.prefix + 'backface-visibility';
}

function getTransitionProperties() {
  let endEvent,
    prefix = '',
    transitions = {
      O: 'otransitionend',
      Moz: 'transitionend',
      Webkit: 'webkitTransitionEnd',
      ms: 'MSTransitionEnd'
    };

  const element = document.createElement('div');

  for (let vendor in transitions) {
    if (has.call(transitions, vendor)) {
      if (element.style[vendor + 'TransitionProperty'] !== undefined) {
        prefix = '-' + vendor.toLowerCase() + '-';
        endEvent = transitions[vendor];
        break;
      }
    }
  }

  if (!endEvent && element.style.transitionProperty !== undefined) {
    endEvent = 'transitionend';
  }

  return {
    end: endEvent,
    prefix
  };
}


export default {
  backfaceVisibility,
  transform,
  end: transition.end,
  property: transitionProperty,
  timing: transitionTiming,
  delay: transitionDelay,
  duration: transitionDuration
};
