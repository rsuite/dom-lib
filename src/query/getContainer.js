export default (container, defaultContainer) => {
  container = typeof container === 'function' ? container() : container;
  return container || defaultContainer;
};
