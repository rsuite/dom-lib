
const { hyphenate } = require('../utils/stringFormatter');
const msPattern = /^ms-/;

module.exports =  function hyphenateStyleName(string) {
    return hyphenate(string).replace(msPattern, '-ms-');
};
