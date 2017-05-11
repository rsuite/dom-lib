
import { hyphenate } from '../utils/stringFormatter';
const msPattern = /^ms-/;

export default (string) => {
  return hyphenate(string).replace(msPattern, '-ms-');
};
