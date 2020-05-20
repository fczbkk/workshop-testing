import {
  getNameChunks, getNameChunksPure,
  getTomorrowTimestamp,
  getTomorrowTimestampPure, getUserName, getUserNamePure
} from './index'

function makeCacheable (fn) {
  const results = new Map()
  return function (...args) {
    if (!results.has(args)) {
      results.set(args, fn(...args))
    }
    return results.get(args)
  }
}

describe('pure function', function () {

  beforeEach(function () {
    window.userName = 'John Doe'
  })

  it.skip('will not return same result if not pure', function (done) {
    const result1 = getTomorrowTimestamp()
    setTimeout(function () {
      const result2 = getTomorrowTimestamp()
      expect(result1).toBe(result2)
      done()
    }, 10)
  })

  it('will return the same result for the same input if pure', function (done) {
    const result1 = getTomorrowTimestampPure(0)
    setTimeout(function () {
      const result2 = getTomorrowTimestampPure(0)
      expect(result1).toBe(result2)
      done()
    }, 10)
  })

  it.skip('will be influenced by changes outside function if not pure', function () {
    expect(getNameChunks()).toEqual(['John', 'Doe'])
    window.userName = 'Riki Fridrich'
    expect(getNameChunks()).toEqual(['John', 'Doe'])
  })

  it('will not be influenced by changes outside function if pure', function () {
    expect(getNameChunksPure('John Doe')).toEqual(['John', 'Doe'])
    window.userName = 'Riki Fridrich'
    expect(getNameChunksPure('John Doe')).toEqual(['John', 'Doe'])
  })

  it.skip('will cause side-effects if not pure', function () {
    expect(window.userName).toBe('John Doe')
    const result = getUserName('Riki', 'Fridrich')
    expect(result).toBe('Riki Fridrich')
    expect(window.userName).toBe('John Doe')
  })

  it('will not cause side-effects if pure', function () {
    expect(window.userName).toBe('John Doe')
    const result = getUserNamePure('Riki', 'Fridrich')
    expect(result).toBe('Riki Fridrich')
    expect(window.userName).toBe('John Doe')
  })

  it.skip('will be not cacheable if not pure', function () {
    const cacheableGetNameChunks = makeCacheable(getNameChunks)
    const result1 = cacheableGetNameChunks()
    window.userName = 'Riki Fridrich'
    const result2 = cacheableGetNameChunks()
    expect(result1).toEqual(result2)
  })

  it('will be cacheable if pure', function () {
    const cacheableGetNameChunks = makeCacheable(getNameChunksPure)
    const result1 = cacheableGetNameChunks('John Doe')
    window.userName = 'Riki Fridrich'
    const result2 = cacheableGetNameChunks('John Doe')
    expect(result1).toEqual(result2)
  })

})
