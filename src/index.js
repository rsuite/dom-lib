
const className  = require('./class');
const style  = require('./style');
const query  = require('./query');
const events  = require('./events');
const transition  = require('./transition');



module.exports = {
    ...className,
    ...style,
    ...query,
    ...events,
    transition: transition
};
