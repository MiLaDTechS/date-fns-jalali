/* eslint-env mocha */

import assert from 'assert'
import isValid from '.'

describe('isValid', function () {
  it('returns true if the given date is valid', function () {
    const result = isValid(new Date())
    assert(result === true)
  })

  it('returns false if the given date is invalid', function () {
    const result = isValid(new Date(''))
    assert(result === false)
  })

  it('accepts a timestamp', function () {
    assert(
      isValid(/* 1392/11/22 */ new Date(2014, 1 /* Feb */, 11).getTime()) ===
        true
    )
    assert(isValid(NaN) === false)
  })

  it('treats null as an invalid date', function () {
    const result = isValid(null)
    assert(result === false)
  })

  it('throws TypeError exception if passed less than 1 argument', function () {
    // @ts-expect-error
    assert.throws(isValid.bind(null), TypeError)
  })
})
