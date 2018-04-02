// @flow

import hasClass from './hasClass';
import addClass from './addClass';
import removeClass from './removeClass';

export default (target: HTMLElement, className: string): HTMLElement => {
  if (hasClass(target, className)) {
    return removeClass(target, className);
  }
  return addClass(target, className);
};
