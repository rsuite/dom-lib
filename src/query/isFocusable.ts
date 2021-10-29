const selector = `input:not([type='hidden']):not([disabled]), 
select:not([disabled]), textarea:not([disabled]), a[href], 
button:not([disabled]),[tabindex],iframe,object, embed, area[href], 
audio[controls],video[controls],[contenteditable]:not([contenteditable='false'])`;

function isVisible(element: Element) {
  const htmlElement = element as HTMLElement;
  return (
    htmlElement.offsetWidth > 0 ||
    htmlElement.offsetHeight > 0 ||
    element.getClientRects().length > 0
  );
}

/**
 * Checks whether `element` is focusable or not.
 *
 * isFocusable(document.querySelector("input")); // true
 * isFocusable(document.querySelector("input[tabindex='-1']")); // true
 * isFocusable(document.querySelector("input[hidden]")); // false
 * isFocusable(document.querySelector("input:disabled")); // false
 */
function isFocusable(element: Element): boolean {
  return isVisible(element) && element?.matches(selector);
}

export default isFocusable;
