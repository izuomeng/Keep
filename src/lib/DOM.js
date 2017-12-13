/* 
 * @param {Object} element The DOMElement to compute
 * @param {Bool} reference true for doucment, false for window
 * @returns {Object} left: Number, top: Number
*/
export function getPosition(element, height, width) {
  if (!element.getBoundingClientRect || !element instanceof HTMLElement) {
    return
  }
  const clientPos = element.getBoundingClientRect(),
    left = clientPos.left,
    top = clientPos.top
  let x, y, position
  const scrollTop = document.documentElement.scrollTop,
    scrollLeft = document.documentElement.scrollLeft
  if (window.innerHeight - clientPos.bottom <= height) {
    y = top + scrollTop - height
    position = 'up'
  } else {
    y = top + scrollTop + 30
    position = 'down'
  }
  if (window.innerWidth - clientPos.right <= width) {
    x = left + scrollLeft - width + 34
  } else {
    x = left + scrollLeft
  }
  return {x, y, position}
}
export function calcTagPosition(tagNum, pos) {
  if (pos.position === 'up') {
    const height = 26 + 32 * tagNum
    pos.y -= height - 132
  }
}
