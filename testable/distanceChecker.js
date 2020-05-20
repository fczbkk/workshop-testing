/**
 * Representation of X and Y coordinates.
 * @typedef {Object} Point
 * @property {number} x
 * @property {number} y
 */

/**
 * Calculates distance between two Points.
 * @param {Point} pointA
 * @param {Point} pointB
 * @returns {number}
 */
export function getDistanceBetweenPoints (pointA, pointB) {
  const distanceX = pointA.x - pointB.x
  const distanceY = pointA.y - pointB.y
  return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2))
}

/**
 * @callback DistanceCallback
 * @param {number}
 */

/**
 * Watches for click events, calculates distance between click and reference point, sends the distance to the callback
 * @param {Point} [referencePoint]
 * @param {DistanceCallback} [callback]
 * @returns {Function} Call this to remove event listener.
 */
export function initDistanceChecker (
  referencePoint = {x: 0, y: 0},
  callback = () => {}
) {
  const handleClick = function (event) {
    const eventPoint = {x: event.clientX, y: event.clientY}
    callback(getDistanceBetweenPoints(referencePoint, eventPoint))
  }

  document.addEventListener('click', handleClick)

  return function () {
    document.removeEventListener('click', handleClick)
  }
}
