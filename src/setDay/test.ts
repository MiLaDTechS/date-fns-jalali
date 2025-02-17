// @flow
/* eslint-env mocha */

import assert from 'power-assert'
import setDay from '.'

describe('setDay', function () {
  it('sets the day of the week', function () {
    const result = setDay(/* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1), 0)
    assert.deepEqual(result, /* 1393/6/9 */ new Date(2014, 7 /* Aug */, 31))
  })

  it('allows to specify which day is the first day of the week', function () {
    const result = setDay(/* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1), 0, {
      weekStartsOn: 1,
    })
    assert.deepEqual(result, /* 1393/6/16 */ new Date(2014, 8 /* Sep */, 7))
  })

  it('allows to specify which day is the first day of the week in locale', function () {
    const result = setDay(/* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1), 0, {
      // @ts-expect-error
      locale: {
        options: { weekStartsOn: 1 },
      },
    })
    assert.deepEqual(result, /* 1393/6/16 */ new Date(2014, 8 /* Sep */, 7))
  })

  it('`options.weekStartsOn` overwrites the first day of the week specified in locale', function () {
    const result = setDay(/* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1), 0, {
      weekStartsOn: 1,
      // @ts-expect-error
      locale: {
        options: { weekStartsOn: 0 },
      },
    })
    assert.deepEqual(result, /* 1393/6/16 */ new Date(2014, 8 /* Sep */, 7))
  })

  it('converts a fractional number to an integer', function () {
    const result = setDay(/* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1), 0.5)
    assert.deepEqual(result, /* 1393/6/9 */ new Date(2014, 7 /* Aug */, 31))
  })

  it('implicitly converts options', function () {
    const result = setDay(/* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1), 0, {
      // @ts-expect-error
      weekStartsOn: '1',
    })
    assert.deepEqual(result, /* 1393/6/16 */ new Date(2014, 8 /* Sep */, 7))
  })

  it('specifies Monday as the first day of the week', function () {
    const result = setDay(/* 1393/6/15 */ new Date(2014, 8 /* Sep */, 6), 1, {
      weekStartsOn: 1,
    })
    assert.deepEqual(result, /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1))
  })

  it('specifies Tuesday as the first day of the week', function () {
    const result = setDay(/* 1393/6/15 */ new Date(2014, 8 /* Sep */, 6), 1, {
      weekStartsOn: 2,
    })
    assert.deepEqual(result, /* 1393/6/17 */ new Date(2014, 8 /* Sep */, 8))
  })

  describe('the day index is more than 6', function () {
    it('sets the day of the next week', function () {
      const result = setDay(/* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1), 8)
      assert.deepEqual(result, /* 1393/6/16 */ new Date(2014, 8 /* Sep */, 7))
    })

    it('allows to specify which day is the first day of the week', function () {
      const result = setDay(/* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1), 7, {
        weekStartsOn: 1,
      })
      assert.deepEqual(result, /* 1393/6/17 */ new Date(2014, 8 /* Sep */, 8))
    })

    it('sets the day of another week in the future', function () {
      const result = setDay(
        /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1),
        14,
        {
          weekStartsOn: 1,
        }
      )
      assert.deepEqual(result, /* 1393/6/24 */ new Date(2014, 8 /* Sep */, 15))
    })
  })

  describe('the day index is less than 0', function () {
    it('sets the day of the last week', function () {
      const result = setDay(/* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1), -6)
      assert.deepEqual(result, /* 1393/6/2 */ new Date(2014, 7 /* Aug */, 24))
    })

    it('allows to specify which day is the first day of the week', function () {
      const result = setDay(
        /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1),
        -7,
        {
          weekStartsOn: 1,
        }
      )
      assert.deepEqual(result, /* 1393/6/3 */ new Date(2014, 7 /* Aug */, 25))
    })

    it('set the day of another week in the past', function () {
      const result = setDay(
        /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1),
        -14,
        {
          weekStartsOn: 1,
        }
      )
      assert.deepEqual(result, /* 1393/5/27 */ new Date(2014, 7 /* Aug */, 18))
    })
  })

  it('accepts a timestamp', function () {
    const result = setDay(
      /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1).getTime(),
      3
    )
    assert.deepEqual(result, /* 1393/6/12 */ new Date(2014, 8 /* Sep */, 3))
  })

  it('implicitly converts number arguments', function () {
    // @ts-expect-error
    const result = setDay(/* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1), '5')
    assert.deepEqual(result, /* 1393/6/14 */ new Date(2014, 8 /* Sep */, 5))
  })

  it('does not mutate the original date', function () {
    const date = /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1)
    setDay(date, 3)
    assert.deepEqual(date, /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1))
  })

  it('returns `Invalid Date` if the given date is invalid', function () {
    const result = setDay(new Date(NaN), 0)
    assert(result instanceof Date && isNaN(result.getTime()))
  })

  it('returns `Invalid Date` if the given amount is NaN', function () {
    const result = setDay(/* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1), NaN)
    assert(result instanceof Date && isNaN(result.getTime()))
  })

  it('throws `RangeError` if `options.weekStartsOn` is not convertable to 0, 1, ..., 6 or undefined', function () {
    // $ExpectedMistake
    const block = setDay.bind(
      null,
      /* 1393/6/10 */ new Date(2014, 8 /* Sep */, 1),
      0,
      {
        weekStartsOn: NaN,
      }
    )
    assert.throws(block, RangeError)
  })

  it('throws TypeError exception if passed less than 2 arguments', function () {
    assert.throws(setDay.bind(null), TypeError)
    assert.throws(setDay.bind(null, 1), TypeError)
  })
})
