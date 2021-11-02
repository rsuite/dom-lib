import { camelize } from './stringFormatter';

const msPattern = /^ms-/;

export default (name: string) => camelize(name.replace(msPattern, 'ms-'));
