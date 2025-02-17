/* eslint-env mocha */

import assert from 'assert'
import differenceInMonths from '.'

describe('differenceInMonths', function () {
  it('returns the number of full months between the given dates', function () {
    const result = differenceInMonths(
      /* 1391/4/12 */ new Date(2012, 6 /* Jul */, 2, 18, 0),
      /* 1390/4/11 */ new Date(2011, 6 /* Jul */, 2, 6, 0)
    )
    assert(result === 12)
  })

  it('returns a negative number if the time value of the first date is smaller', function () {
    const result = differenceInMonths(
      /* 1390/4/11 */ new Date(2011, 6 /* Jul */, 2, 6, 0),
      /* 1391/4/12 */ new Date(2012, 6 /* Jul */, 2, 18, 0)
    )
    assert(result === -12)
  })

  it('accepts timestamps', function () {
    const result = differenceInMonths(
      /* 1393/5/11 */ new Date(2014, 7 /* Aug */, 2).getTime(),
      /* 1389/4/11 */ new Date(2010, 6 /* Jul */, 2).getTime()
    )
    assert(result === 49)
  })

  describe('edge cases', function () {
    it('it returns diff of 1 month between 29 Esfand 1398 and 30 Bahman 1398', function () {
      const result = differenceInMonths(
        /* 1398/12/29 */ new Date(2020, 2 /* Mar */, 19),
        /* 1398/11/30 */ new Date(2020, 1 /* Feb */, 19)
      )
      assert(result === 1)
    })

    it('it returns diff of 1 month between 30 Esfand 1399 and 30 Bahman 1399', function () {
      const result = differenceInMonths(
        /* 1399/12/30 */ new Date(2021, 2 /* Mar */, 20),
        /* 1399/11/30 */ new Date(2021, 1 /* Feb */, 18)
      )
      assert(result === 1)
    })

    it('it returns diff of 1 month between Nov, 30 2021 and Oct, 31 2021', function () {
      const result = differenceInMonths(
        /* 1400/9/9 */ new Date(2021, 10 /* Nov */, 30),
        /* 1400/8/9 */ new Date(2021, 9 /* Oct */, 31)
      )
      assert(result === 1)
    })

    it('it returns diff of 1 month between Oct, 31 2021 and Sep, 30 2021', function () {
      const result = differenceInMonths(
        /* 1400/8/9 */ new Date(2021, 9 /* Oct */, 31),
        /* 1400/7/8 */ new Date(2021, 8 /* Sep */, 30)
      )
      assert(result === 1)
    })

    it('it returns diff of 6 month between 31 Ordibehesh 1400 and 30 Azar 1399', function () {
      const result = differenceInMonths(
        /* 1400/2/31 */ new Date(2021, 4 /* May */, 21),
        /* 1399/8/30 */ new Date(2020, 10 /* Nov */, 20)
      )
      assert(result === 6)
    })

    it('it returns diff of -1 month between Sep, 30 2021 and Oct, 31 2021', function () {
      const result = differenceInMonths(
        /* 1400/7/8 */ new Date(2021, 8 /* Sep */, 30),
        /* 1400/8/9 */ new Date(2021, 9 /* Oct */, 31)
      )
      assert(result === -1)
    })

    it('the difference is less than a month, but the given dates are in different calendar months', function () {
      const result = differenceInMonths(
        /* 1393/5/10 */ new Date(2014, 7 /* Aug */, 1),
        /* 1393/5/9 */ new Date(2014, 6 /* Jul */, 31)
      )
      assert(result === 0)
    })

    it('the same for the swapped dates', function () {
      const result = differenceInMonths(
        /* 1393/5/9 */ new Date(2014, 6 /* Jul */, 31),
        /* 1393/5/10 */ new Date(2014, 7 /* Aug */, 1)
      )
      assert(result === 0)
    })

    it('the days of months of the given dates are the same', function () {
      const result = differenceInMonths(
        /* 1393/6/15 */ new Date(2014, 8 /* Sep */, 6),
        /* 1393/5/15 */ new Date(2014, 7 /* Aug */, 6)
      )
      assert(result === 1)
    })

    it('the given dates are the same', function () {
      const result = differenceInMonths(
        /* 1393/6/14 */ new Date(2014, 8 /* Sep */, 5, 0, 0),
        /* 1393/6/14 */ new Date(2014, 8 /* Sep */, 5, 0, 0)
      )
      assert(result === 0)
    })

    it('does not return -0 when the given dates are the same', () => {
      function isNegativeZero(x: number): boolean {
        return x === 0 && 1 / x < 0
      }

      const result = differenceInMonths(
        /* 1393/6/14 */ new Date(2014, 8 /* Sep */, 5, 0, 0),
        /* 1393/6/14 */ new Date(2014, 8 /* Sep */, 5, 0, 0)
      )

      const resultIsNegative = isNegativeZero(result)
      assert(resultIsNegative === false)
    })
  })

  it('returns NaN if the first date is `Invalid Date`', function () {
    const result = differenceInMonths(
      new Date(NaN),
      /* 1395/10/12 */ new Date(2017, 0 /* Jan */, 1)
    )
    assert(isNaN(result))
  })

  it('returns NaN if the second date is `Invalid Date`', function () {
    const result = differenceInMonths(
      /* 1395/10/12 */ new Date(2017, 0 /* Jan */, 1),
      new Date(NaN)
    )
    assert(isNaN(result))
  })

  it('returns NaN if the both dates are `Invalid Date`', function () {
    const result = differenceInMonths(new Date(NaN), new Date(NaN))
    assert(isNaN(result))
  })

  it('throws TypeError exception if passed less than 2 arguments', function () {
    // @ts-expect-error
    assert.throws(differenceInMonths.bind(null), TypeError)
    // @ts-expect-error
    assert.throws(differenceInMonths.bind(null, 1), TypeError)
  })

  describe('edge cases', function () {
    it('returns the number of full months between the given dates - end of Feb', function () {
      assert(
        differenceInMonths(
          /* 1390/12/10 */ new Date(2012, 1 /* Feb */, 29, 9, 0, 0),
          /* 1390/12/10 */ new Date(2012, 1 /* Feb */, 29, 10, 0, 0)
        ) === 0
      )
      assert(
        differenceInMonths(
          /* 1390/12/9 */ new Date(2012, 1 /* Feb */, 28, 9, 0, 0),
          /* 1390/12/10 */ new Date(2012, 1 /* Feb */, 29, 10, 0, 0)
        ) === 0
      )
      assert(
        differenceInMonths(
          /* 1390/12/8 */ new Date(2012, 1 /* Feb */, 27, 9, 0, 0),
          /* 1390/12/8 */ new Date(2012, 1 /* Feb */, 27, 10, 0, 0)
        ) === 0
      )
      assert(
        differenceInMonths(
          /* 1390/12/9 */ new Date(2012, 1 /* Feb */, 28, 9, 0, 0),
          /* 1390/12/9 */ new Date(2012, 1 /* Feb */, 28, 10, 0, 0)
        ) === 0
      )
    })

    assert(
      differenceInMonths(
        /* 1399/12/10 */ new Date(2021, 1 /* Feb */, 28, 7, 23, 7),
        /* 1399/12/10 */ new Date(2021, 1 /* Feb */, 28, 7, 38, 18)
      ) === 0
    )
  })
})
