import { camelize } from '../utils/stringFormatter';
const msPattern = /^ms-/;

export default (string) => {
  return camelize(string.replace(msPattern, 'ms-'));
};
