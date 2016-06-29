import { hyphenate } from '../utils/stringFormatter';

const msPattern = /^ms-/;

export default function hyphenateStyleName(string) {
    return hyphenate(string).replace(msPattern, '-ms-');
}
