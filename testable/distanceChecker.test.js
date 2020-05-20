import {
  getDistanceBetweenPoints,
  initDistanceChecker
} from './distanceChecker'

function simulateClick (x = 0, y = 0) {
  const event = new MouseEvent('click', { clientX: x, clientY: y })
  document.dispatchEvent(event)
}

describe('Distance Checker library', function () {

  describe('getDistanceBetweenPoints', function () {

    it('should get distance between zero points', function () {
      const pointA = { x: 0, y: 0 }
      const pointB = { x: 0, y: 0 }
      const result = getDistanceBetweenPoints(pointA, pointB)
      expect(result).toBe(0)
    })

    it('should get distance between horizontal points', function () {
      const pointA = { x: 0, y: 0 }
      const pointB = { x: 100, y: 0 }
      const result = getDistanceBetweenPoints(pointA, pointB)
      expect(result).toBe(100)
    })

    it('should get distance between vertical points', function () {
      const pointA = { x: 0, y: 0 }
      const pointB = { x: 0, y: 100 }
      const result = getDistanceBetweenPoints(pointA, pointB)
      expect(result).toBe(100)
    })

    it('should get distance between diagonal points', function () {
      const pointA = { x: 0, y: 0 }
      const pointB = { x: 100, y: 100 }
      const result = getDistanceBetweenPoints(pointA, pointB)
      expect(result).toBeGreaterThan(141)
      expect(result).toBeLessThan(142)
      expect(result).toBeCloseTo(141, 0)
    })

  })

  describe('initDistanceChecker', function () {

    const callback = jest.fn()
    let cleanup = function () {}

    beforeEach(function () {
      callback.mockReset()
    })

    afterEach(function () {
      cleanup()
    })

    it('should listen to click', function () {
      cleanup = initDistanceChecker({ x: 0, y: 0 }, callback)
      simulateClick(0, 0)
      expect(callback).toHaveBeenCalled()
    })

    it('should only execute callback once', function () {
      expect(callback).not.toHaveBeenCalled()
      cleanup = initDistanceChecker({ x: 0, y: 0 }, callback)
      simulateClick(0, 0)
      expect(callback.mock.calls.length).toBe(1)
    })

    it('should use X and Y position of mouse', function () {
      cleanup = initDistanceChecker({ x: 0, y: 0 }, callback)
      simulateClick(0, 100)
      expect(callback).toHaveBeenCalledWith(100)
    })

    it('should use console.log', function () {
      jest.spyOn(console, 'log')
      cleanup = initDistanceChecker({ x: 0, y: 0 }, console.log)
      simulateClick(0, 100)
      expect(console.log).toHaveBeenCalledWith(100)
    })

  })

})
