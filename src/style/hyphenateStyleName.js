import { hyphenate } from '../utils/stringFormatter';

const msPattern = /^ms-/;

export default string => hyphenate(string).replace(msPattern, '-ms-');
