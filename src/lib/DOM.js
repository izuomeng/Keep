/* 
 * @param {Object} element The DOMElement to compute
 * @param {Bool} reference true for doucment, false for window
 * @returns {Object} left: Number, top: Number
*/
export function getPosition(element, reference) {
  if (!element.getBoundingClientRect || element instanceof HTMLElement) {
    return
  }
  const clientPos = element.getBoundingClientRect()
  
}