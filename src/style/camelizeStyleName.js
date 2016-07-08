const  { camelize } = require('../utils/stringFormatter');
const msPattern = /^ms-/;

module.exports =  function camelizeStyleName(string) {
    return camelize(string.replace(msPattern, 'ms-'));
};
