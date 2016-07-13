
const className  = require('./class');
const style  = require('./style');
const query  = require('./query');
const events  = require('./events');
const transition  = require('./transition');
const BrowserSupportCore = require('./BrowserSupportCore');
const getVendorPrefixedName = require('./getVendorPrefixedName');



module.exports = {
    ...className,
    ...style,
    ...query,
    ...events,
    transition: transition,
    getVendorPrefixedName,
    BrowserSupportCore
};
