import { camelize } from '../utils/stringFormatter';

const msPattern = /^ms-/;

export default function camelizeStyleName(string) {
    return camelize(string.replace(msPattern, 'ms-'));
}
