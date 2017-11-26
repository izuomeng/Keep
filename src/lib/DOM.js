/* 
 * @param {Object} element The DOMElement to compute
 * @param {Bool} reference true for doucment, false for window
 * @returns {Object} left: Number, top: Number
*/
export function getPosition(element, reference = true) {
  if (!element.getBoundingClientRect || !element instanceof HTMLElement) {
    return
  }
  const clientPos = element.getBoundingClientRect(),
    left = clientPos.left,
    top = clientPos.top
  const scrollTop = document.documentElement.scrollTop,
    scrollLeft = document.documentElement.scrollLeft
  return reference ? {left: left + scrollLeft, top: top + scrollTop} :
    {left, top}
}