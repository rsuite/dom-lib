import { hyphenate } from './stringFormatter';

const msPattern = /^ms-/;

export default string => hyphenate(string).replace(msPattern, '-ms-');
