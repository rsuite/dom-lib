export default (container: Element | (() => Element), defaultContainer?: Element): Element => {
  container = typeof container === 'function' ? container() : container;
  return container || defaultContainer;
};
