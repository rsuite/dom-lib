import canUseDOM from './canUseDOM';

function getTransitionProperties() {
  if (!canUseDOM) {
    return {};
  }

  const vendorMap = {
    O: e => `o${e.toLowerCase()}`,
    Moz: e => e.toLowerCase(),
    Webkit: e => `webkit${e}`,
    ms: e => `MS${e}`
  };

  const vendors = Object.keys(vendorMap);

  let style = document.createElement('div').style;

  let tempTransitionEnd;
  let tempPrefix = '';

  for (let i = 0; i < vendors.length; i += 1) {
    const vendor = vendors[i];

    if (`${vendor}TransitionProperty` in style) {
      tempPrefix = `-${vendor.toLowerCase()}`;
      tempTransitionEnd = vendorMap[vendor]('TransitionEnd');
      break;
    }
  }

  if (!tempTransitionEnd && 'transitionProperty' in style) {
    tempTransitionEnd = 'transitionend';
  }

  style = null;

  const addPrefix = (name: string) => `${tempPrefix}-${name}`;

  return {
    end: tempTransitionEnd,
    backfaceVisibility: addPrefix('backface-visibility'),
    transform: addPrefix('transform'),
    property: addPrefix('transition-property'),
    timing: addPrefix('transition-timing-function'),
    delay: addPrefix('transition-delay'),
    duration: addPrefix('transition-duration')
  };
}

export default getTransitionProperties;
