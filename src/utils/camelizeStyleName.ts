import { camelize } from './stringFormatter';

const msPattern = /^-ms-/;

export default function camelizeStyleName(name: string) {
  // The `-ms` prefix is converted to lowercase `ms`.
  // http://www.andismith.com/blog/2012/02/modernizr-prefixed/
  return camelize(name.replace(msPattern, 'ms-'));
}
