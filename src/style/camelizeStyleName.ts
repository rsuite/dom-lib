import { camelize } from '../utils/stringFormatter';

const msPattern = /^ms-/;

export default (name: string) => camelize(name.replace(msPattern, 'ms-'));
