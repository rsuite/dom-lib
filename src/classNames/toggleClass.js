
import hasClass from './hasClass';
import addClass from './addClass';
import removeClass from './removeClass';

export default (target, className) => {
  if (hasClass(target, className)) {
    return removeClass(target, className);
  }
  return addClass(target, className);
};
