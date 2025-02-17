/* eslint-env mocha */

import assert from 'assert'
import differenceInMilliseconds from '.'

describe('differenceInMilliseconds', function () {
  it('returns the number of milliseconds between the given dates', function () {
    const result = differenceInMilliseconds(
      /* 1393/4/11 */ new Date(2014, 6 /* Jul */, 2, 12, 30, 20, 700),
      /* 1393/4/11 */ new Date(2014, 6 /* Jul */, 2, 12, 30, 20, 600)
    )
    assert(result === 100)
  })

  it('returns a negative number if the time value of the first date is smaller', function () {
    const result = differenceInMilliseconds(
      /* 1393/4/11 */ new Date(2014, 6 /* Jul */, 2, 12, 30, 20, 600),
      /* 1393/4/11 */ new Date(2014, 6 /* Jul */, 2, 12, 30, 20, 700)
    )
    assert(result === -100)
  })

  it('accepts timestamps', function () {
    const result = differenceInMilliseconds(
      /* 1393/6/14 */ new Date(2014, 8 /* Sep */, 5, 18, 30, 45, 500).getTime(),
      /* 1393/6/14 */ new Date(2014, 8 /* Sep */, 5, 18, 30, 45, 500).getTime()
    )
    assert(result === 0)
  })

  it('does not return -0 when the given dates are the same', () => {
    function isNegativeZero(x: number): boolean {
      return x === 0 && 1 / x < 0
    }
    const result = differenceInMilliseconds(
      /* 1393/6/14 */ new Date(2014, 8 /* Sep */, 5, 0, 0),
      /* 1393/6/14 */ new Date(2014, 8 /* Sep */, 5, 0, 0)
    )

    const resultIsNegative = isNegativeZero(result)
    assert(resultIsNegative === false)
  })

  it('returns NaN if the first date is `Invalid Date`', function () {
    const result = differenceInMilliseconds(
      new Date(NaN),
      /* 1395/10/12 */ new Date(2017, 0 /* Jan */, 1)
    )
    assert(isNaN(result))
  })

  it('returns NaN if the second date is `Invalid Date`', function () {
    const result = differenceInMilliseconds(
      /* 1395/10/12 */ new Date(2017, 0 /* Jan */, 1),
      new Date(NaN)
    )
    assert(isNaN(result))
  })

  it('returns NaN if the both dates are `Invalid Date`', function () {
    const result = differenceInMilliseconds(new Date(NaN), new Date(NaN))
    assert(isNaN(result))
  })

  it('throws TypeError exception if passed less than 2 arguments', function () {
    // @ts-expect-error
    assert.throws(differenceInMilliseconds.bind(null), TypeError)
    // @ts-expect-error
    assert.throws(differenceInMilliseconds.bind(null, 1), TypeError)
  })
})
