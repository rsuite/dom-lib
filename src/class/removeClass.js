module.exports =  function removeClass(target, className) {
    if (className) {
        if (target.classList) {
            target.classList.remove(className);
        } else if (hasClass(className, target)) {
            target.className = target.className
                .replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)', 'g'), '$1')
                .replace(/\s+/g, ' ') // multiple spaces to one
                .replace(/^\s*|\s*$/g, ''); // trim the ends
        }
    }
    return target;
};
