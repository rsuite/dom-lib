export default (
  container: Element | null | (() => Element | null),
  defaultContainer?: Element
): Element => {
  container = typeof container === 'function' ? container() : container;
  return container || defaultContainer;
};
