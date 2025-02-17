/* eslint-env mocha */

import assert from 'assert'
import previousFriday from '.'

describe('previousFriday', function () {
  it('returns the previous Friday given various dates after the same', function () {
    assert.deepStrictEqual(
      previousFriday(/* 1400/3/15 */ new Date(2021, 5 /* Jun */, 5)),
      /* 1400/3/14 */ new Date(2021, 5 /* Jun */, 4)
    )

    assert.deepStrictEqual(
      previousFriday(/* 1400/3/16 */ new Date(2021, 5 /* Jun */, 6)),
      /* 1400/3/14 */ new Date(2021, 5 /* Jun */, 4)
    )

    assert.deepStrictEqual(
      previousFriday(/* 1400/3/21 */ new Date(2021, 5 /* Jun */, 11)),
      /* 1400/3/14 */ new Date(2021, 5 /* Jun */, 4)
    )

    assert.deepStrictEqual(
      previousFriday(/* 1400/3/24 */ new Date(2021, 5 /* Jun */, 14)),
      /* 1400/3/21 */ new Date(2021, 5 /* Jun */, 11)
    )

    assert.deepStrictEqual(
      previousFriday(/* 1400/3/25 */ new Date(2021, 5 /* Jun */, 15)),
      /* 1400/3/21 */ new Date(2021, 5 /* Jun */, 11)
    )

    assert.deepStrictEqual(
      previousFriday(/* 1400/4/3 */ new Date(2021, 5 /* Jun */, 24)),
      /* 1400/3/28 */ new Date(2021, 5 /* Jun */, 18)
    )
  })

  it('returns `Invalid Date` if the given date is invalid', function () {
    assert(previousFriday(new Date(NaN)) instanceof Date)
  })
})
