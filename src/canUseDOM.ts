/**
 * Checks if the current environment is in the browser and can access and modify the DOM.
 */
const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export default canUseDOM;
