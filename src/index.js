
const className  = require('./class');
const style  = require('./style');
const query  = require('./query');
const events  = require('./events');
const transition  = require('./transition');
const animation  = require('./animation');
const getVendorPrefixedName = require('./getVendorPrefixedName');
const BrowserSupportCore = require('./BrowserSupportCore');
const DOMMouseMoveTracker = require('./DOMMouseMoveTracker');



module.exports = {
    ...className,
    ...style,
    ...query,
    ...events,
    ...animation,
    transition: transition,
    getVendorPrefixedName,
    BrowserSupportCore,
    DOMMouseMoveTracker
};
