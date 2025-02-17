// @flow
/* eslint-env mocha */

import assert from 'power-assert'
import setHours from '.'

describe('setHours', function () {
  it('sets the amount of hours', function () {
    const result = setHours(
      /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1, 11, 30),
      4
    )
    assert.deepEqual(
      result,
      /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1, 4, 30)
    )
  })

  it('accepts a timestamp', function () {
    const result = setHours(
      /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1, 11).getTime(),
      5
    )
    assert.deepEqual(result, /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1, 5))
  })

  it('converts a fractional number to an integer', function () {
    const result = setHours(
      /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1, 11, 30),
      4.123
    )
    assert.deepEqual(
      result,
      /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1, 4, 30)
    )
  })

  it('implicitly converts number arguments', function () {
    // @ts-expect-error
    const result = setHours(
      /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1, 11, 30),
      '4'
    )
    assert.deepEqual(
      result,
      /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1, 4, 30)
    )
  })

  it('does not mutate the original date', function () {
    var date = /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1, 11)
    setHours(date, 12)
    assert.deepEqual(date, /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1, 11))
  })

  it('returns `Invalid Date` if the given date is invalid', function () {
    const result = setHours(new Date(NaN), 4)
    assert(result instanceof Date && isNaN(result.getTime()))
  })

  it('returns `Invalid Date` if the given amount is NaN', function () {
    const result = setHours(
      /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1, 11, 30),
      NaN
    )
    assert(result instanceof Date && isNaN(result.getTime()))
  })

  it('throws TypeError exception if passed less than 2 arguments', function () {
    assert.throws(setHours.bind(null), TypeError)
    assert.throws(setHours.bind(null, 1), TypeError)
  })
})
