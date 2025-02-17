/* eslint-env mocha */

import assert from 'assert'
import differenceInQuarters from '.'

describe('differenceInQuarters', () => {
  it('returns the number of full quarters between the given dates  with `trunc` as a default rounding method', () => {
    const result = differenceInQuarters(
      /* 1391/4/12 */ new Date(2012, 6 /* Jul */, 2, 5, 0),
      /* 1390/4/12 */ new Date(2011, 6 /* Jul */, 3, 6, 0)
    )
    assert(result === 3)
  })

  it('returns the number of full quarters between the given dates', () => {
    const result = differenceInQuarters(
      /* 1391/4/12 */ new Date(2012, 6 /* Jul */, 2, 18, 0),
      /* 1390/4/11 */ new Date(2011, 6 /* Jul */, 2, 6, 0)
    )
    assert(result === 4)
  })

  it('returns the number of full quarters between the given dates with `trunc` as a default rounding method', () => {
    const result = differenceInQuarters(
      /* 1391/4/12 */ new Date(2012, 6 /* Jul */, 2, 18, 0),
      /* 1390/2/12 */ new Date(2011, 4 /* May */, 2, 6, 0)
    )
    assert(result === 4)
  })

  it('returns the number of full quarters between the given dates with `ceil` as a rounding method', () => {
    const result = differenceInQuarters(
      /* 1391/4/12 */ new Date(2012, 6 /* Jul */, 2, 18, 0),
      /* 1390/2/12 */ new Date(2011, 4 /* May */, 2, 6, 0),
      { roundingMethod: 'ceil' }
    )
    assert(result === 5)
  })

  it('returns the number of full quarters between the given dates with `floor` as a rounding method', () => {
    const result = differenceInQuarters(
      /* 1391/4/12 */ new Date(2012, 6 /* Jul */, 2, 18, 0),
      /* 1390/2/12 */ new Date(2011, 4 /* May */, 2, 6, 0),
      { roundingMethod: 'floor' }
    )
    assert(result === 4)
  })

  it('returns the number of full quarters between the given dates with `round` as a rounding method', () => {
    const result = differenceInQuarters(
      /* 1391/4/12 */ new Date(2012, 6 /* Jul */, 2, 18, 0),
      /* 1390/2/12 */ new Date(2011, 4 /* May */, 2, 6, 0),
      { roundingMethod: 'round' }
    )
    assert(result === 5)
  })

  it('returns a negative number if the time value of the first date is smaller', () => {
    const result = differenceInQuarters(
      /* 1390/4/11 */ new Date(2011, 6 /* Jul */, 2, 6, 0),
      /* 1391/4/12 */ new Date(2012, 6 /* Jul */, 2, 18, 0)
    )
    assert(result === -4)
  })

  it('returns a 0, not a negative 0 - issue #2555 ', () => {
    const result = differenceInQuarters(
      /* 1400/4/31 */ new Date(2021, 6 /* Jul */, 22, 6, 1, 28.973),
      /* 1400/4/31 */ new Date(2021, 6 /* Jul */, 22, 6, 1, 28.976)
    )
    assert(Object.is(result, 0))
  })

  it('accepts timestamps', () => {
    const result = differenceInQuarters(
      /* 1393/7/10 */ new Date(2014, 9 /* Oct */, 2).getTime(),
      /* 1389/4/10 */ new Date(2010, 6 /* Jul */, 1).getTime()
    )
    assert(result === 17)
  })

  describe('edge cases', () => {
    it('the difference is less than a quarter, but the given dates are in different calendar quarters', () => {
      const result = differenceInQuarters(
        /* 1393/4/10 */ new Date(2014, 6 /* Jul */, 1),
        /* 1393/4/9 */ new Date(2014, 5 /* Jun */, 30)
      )
      assert(result === 0)
    })

    it('the same for the swapped dates', () => {
      const result = differenceInQuarters(
        /* 1393/4/9 */ new Date(2014, 5 /* Jun */, 30),
        /* 1393/4/10 */ new Date(2014, 6 /* Jul */, 1)
      )
      assert(result === 0)
    })

    it('the days of months of the given dates are the same', () => {
      const result = differenceInQuarters(
        /* 1393/1/17 */ new Date(2014, 3 /* Apr */, 6),
        /* 1392/10/16 */ new Date(2014, 0 /* Jan */, 6)
      )
      assert(result === 1)
    })

    it('the given dates are the same', () => {
      const result = differenceInQuarters(
        /* 1393/6/14 */ new Date(2014, 8 /* Sep */, 5, 0, 0),
        /* 1393/6/14 */ new Date(2014, 8 /* Sep */, 5, 0, 0)
      )
      assert(result === 0)
    })

    it('does not return -0 when the given dates are the same', () => {
      function isNegativeZero(x: number): boolean {
        return x === 0 && 1 / x < 0
      }

      const result = differenceInQuarters(
        /* 1393/6/14 */ new Date(2014, 8 /* Sep */, 5, 0, 0),
        /* 1393/6/14 */ new Date(2014, 8 /* Sep */, 5, 0, 0)
      )

      const resultIsNegative = isNegativeZero(result)
      assert(resultIsNegative === false)
    })
  })

  it('returns NaN if the first date is `Invalid Date`', () => {
    const result = differenceInQuarters(
      new Date(NaN),
      /* 1395/10/12 */ new Date(2017, 0 /* Jan */, 1)
    )
    assert(isNaN(result))
  })

  it('returns NaN if the second date is `Invalid Date`', () => {
    const result = differenceInQuarters(
      /* 1395/10/12 */ new Date(2017, 0 /* Jan */, 1),
      new Date(NaN)
    )
    assert(isNaN(result))
  })

  it('returns NaN if the both dates are `Invalid Date`', () => {
    const result = differenceInQuarters(new Date(NaN), new Date(NaN))
    assert(isNaN(result))
  })

  it('throws TypeError exception if passed less than 2 arguments', () => {
    // @ts-expect-error
    assert.throws(differenceInQuarters.bind(null), TypeError)
    // @ts-expect-error
    assert.throws(differenceInQuarters.bind(null, 1), TypeError)
  })
})
