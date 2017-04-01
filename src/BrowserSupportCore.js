import getVendorPrefixedName from './getVendorPrefixedName';

export default {
    /**
     * @return {bool} True if browser supports css animations.
     */
    hasCSSAnimations: () => {
        return !!getVendorPrefixedName('animationName');
    },

    /**
     * @return {bool} True if browser supports css transforms.
     */
    hasCSSTransforms: () => {
        return !!getVendorPrefixedName('transform');
    },

    /**
     * @return {bool} True if browser supports css 3d transforms.
     */
    hasCSS3DTransforms: () => {
        return !!getVendorPrefixedName('perspective');
    },

    /**
     * @return {bool} True if browser supports css transitions.
     */
    hasCSSTransitions: () => {
        return !!getVendorPrefixedName('transition');
    }
};

