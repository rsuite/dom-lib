
export default (listener) => {
  let useFocusin = !document.addEventListener;
  let off;

  if (useFocusin) {
    document.attachEvent('onfocusin', listener);
    off = () => document.detachEvent('onfocusin', listener);
  } else {
    document.addEventListener('focus', listener, true);
    off = () => document.removeEventListener('focus', listener, true);
  }

  return {
    off
  };
};
