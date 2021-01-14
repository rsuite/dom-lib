export default (
  container: HTMLElement | (() => HTMLElement),
  defaultContainer: HTMLElement
): HTMLElement => {
  container = typeof container === 'function' ? container() : container;
  return container || defaultContainer;
};
