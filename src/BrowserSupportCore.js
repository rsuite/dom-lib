import getVendorPrefixedName from './getVendorPrefixedName';

var BrowserSupportCore = {
    /**
     * @return {bool} True if browser supports css animations.
     */
    hasCSSAnimations: function () {
        return !!getVendorPrefixedName('animationName');
    },

    /**
     * @return {bool} True if browser supports css transforms.
     */
    hasCSSTransforms: function () {
        return !!getVendorPrefixedName('transform');
    },

    /**
     * @return {bool} True if browser supports css 3d transforms.
     */
    hasCSS3DTransforms: function () {
        return !!getVendorPrefixedName('perspective');
    },

    /**
     * @return {bool} True if browser supports css transitions.
     */
    hasCSSTransitions: function () {
        return !!getVendorPrefixedName('transition');
    }
};

module.exports = BrowserSupportCore;
