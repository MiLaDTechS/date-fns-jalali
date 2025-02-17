/* eslint-env mocha */

import assert from 'assert'
import differenceInWeeks from '.'

describe('differenceInWeeks', () => {
  it('returns the number of full weeks between the given dates', () => {
    const result = differenceInWeeks(
      /* 1393/4/17 */ new Date(2014, 6 /* Jul */, 8, 18, 0),
      /* 1393/4/8 */ new Date(2014, 5 /* Jun */, 29, 6, 0)
    )
    assert(result === 1)
  })

  it('returns the number of weeks between the given dates with `trunc` as default a rounding method', () => {
    const result = differenceInWeeks(
      /* 1393/4/8 */ new Date(2014, 5 /* Jun */, 29, 6, 0),
      /* 1393/4/22 */ new Date(2014, 6 /* Jul */, 13, 5, 0)
    )
    assert(result === -1)
  })

  it('returns the number of weeks between the given dates with `trunc` passed in as a rounding method', () => {
    const result = differenceInWeeks(
      /* 1393/4/17 */ new Date(2014, 6 /* Jul */, 8, 18, 0),
      /* 1393/4/8 */ new Date(2014, 5 /* Jun */, 29, 6, 0),
      { roundingMethod: 'trunc' }
    )
    assert(result === 1)
  })

  it('returns the number of weeks between the given dates with `ceil` passed in as a rounding method', () => {
    const result = differenceInWeeks(
      /* 1393/4/17 */ new Date(2014, 6 /* Jul */, 8, 18, 0),
      /* 1393/4/8 */ new Date(2014, 5 /* Jun */, 29, 6, 0),
      { roundingMethod: 'ceil' }
    )
    assert(result === 2)
  })

  it('returns the number of weeks between the given dates with `floor` passed in as a rounding method', () => {
    const result = differenceInWeeks(
      /* 1393/4/17 */ new Date(2014, 6 /* Jul */, 8, 18, 0),
      /* 1393/4/8 */ new Date(2014, 5 /* Jun */, 29, 6, 0),
      { roundingMethod: 'floor' }
    )
    assert(result === 1)
  })

  it('returns the number of weeks between the given dates with `round` passed in as a rounding method', () => {
    const result = differenceInWeeks(
      /* 1393/4/19 */ new Date(2014, 6 /* Jul */, 10, 18, 0),
      /* 1393/4/8 */ new Date(2014, 5 /* Jun */, 29, 6, 0),
      { roundingMethod: 'round' }
    )
    assert(result === 2)
  })

  it('returns a negative number if the time value of the first date is smaller', () => {
    const result = differenceInWeeks(
      /* 1393/4/8 */ new Date(2014, 5 /* Jun */, 29, 6, 0),
      /* 1393/4/17 */ new Date(2014, 6 /* Jul */, 8, 18, 0)
    )
    assert(result === -1)
  })

  it('returns a 0, not a negative 0 - issue #2555 ', () => {
    const result = differenceInWeeks(
      /* 1400/4/31 */ new Date(2021, 6 /* Jul */, 22, 6, 1, 28.973),
      /* 1400/4/31 */ new Date(2021, 6 /* Jul */, 22, 6, 1, 28.976)
    )
    assert(result === 0)
  })

  it('accepts timestamps', () => {
    const result = differenceInWeeks(
      /* 1393/4/21 */ new Date(2014, 6 /* Jul */, 12).getTime(),
      /* 1393/4/11 */ new Date(2014, 6 /* Jul */, 2).getTime()
    )
    assert(result === 1)
  })

  describe('edge cases', () => {
    it('the difference is less than a week, but the given dates are in different calendar weeks', () => {
      const result = differenceInWeeks(
        /* 1393/4/15 */ new Date(2014, 6 /* Jul */, 6),
        /* 1393/4/14 */ new Date(2014, 6 /* Jul */, 5)
      )
      assert(result === 0)
    })

    it('the same for the swapped dates', () => {
      const result = differenceInWeeks(
        /* 1393/4/14 */ new Date(2014, 6 /* Jul */, 5),
        /* 1393/4/15 */ new Date(2014, 6 /* Jul */, 6)
      )
      assert(result === 0)
    })

    it('days of weeks of the given dates are the same', () => {
      const result = differenceInWeeks(
        /* 1393/4/18 */ new Date(2014, 6 /* Jul */, 9),
        /* 1393/4/11 */ new Date(2014, 6 /* Jul */, 2)
      )
      assert(result === 1)
    })

    it('the given dates are the same', () => {
      const result = differenceInWeeks(
        /* 1393/6/14 */ new Date(2014, 8 /* Sep */, 5, 0, 0),
        /* 1393/6/14 */ new Date(2014, 8 /* Sep */, 5, 0, 0)
      )
      assert(result === 0)
    })

    it('does not return -0 when the given dates are the same', () => {
      function isNegativeZero(x: number): boolean {
        return x === 0 && 1 / x < 0
      }

      const result = differenceInWeeks(
        /* 1393/6/14 */ new Date(2014, 8 /* Sep */, 5, 0, 0),
        /* 1393/6/14 */ new Date(2014, 8 /* Sep */, 5, 0, 0)
      )

      const resultIsNegative = isNegativeZero(result)
      assert(resultIsNegative === false)
    })
  })

  it('returns NaN if the first date is `Invalid Date`', () => {
    const result = differenceInWeeks(
      new Date(NaN),
      /* 1395/10/12 */ new Date(2017, 0 /* Jan */, 1)
    )
    assert(isNaN(result))
  })

  it('returns NaN if the second date is `Invalid Date`', () => {
    const result = differenceInWeeks(
      /* 1395/10/12 */ new Date(2017, 0 /* Jan */, 1),
      new Date(NaN)
    )
    assert(isNaN(result))
  })

  it('returns NaN if the both dates are `Invalid Date`', () => {
    const result = differenceInWeeks(new Date(NaN), new Date(NaN))
    assert(isNaN(result))
  })

  it('throws TypeError exception if passed less than 2 arguments', () => {
    // @ts-expect-error
    assert.throws(differenceInWeeks.bind(null), TypeError)
    // @ts-expect-error
    assert.throws(differenceInWeeks.bind(null, 1), TypeError)
  })
})
