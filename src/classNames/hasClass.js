// @flow

export default (target: HTMLElement, className: string): boolean => {
  if (target.classList) {
    return !!className && target.classList.contains(className);
  }
  return ` ${target.className} `.indexOf(` ${className} `) !== -1;
};
