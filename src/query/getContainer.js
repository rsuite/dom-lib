// @flow

export default (container: HTMLElement | Function, defaultContainer: HTMLElement): HTMLElement => {
  container = typeof container === 'function' ? container() : container;
  return container || defaultContainer;
};
