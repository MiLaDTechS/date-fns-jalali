import toDate from '../toDate/index'
import toInteger from '../_lib/toInteger/index'

import coreGetMonth from '../_core/getMonth/index'
import coreGetDate from '../_core/getDate/index'
import coreGetFullYear from '../_core/getFullYear/index'
import coreNewDate from '../_core/newDate/index'

/**
 * @name roundToNearestMinutes
 * @category Minute Helpers
 * @summary Rounds the given date to the nearest minute
 *
 * @description
 * Rounds the given date to the nearest minute (or number of minutes).
 * Rounds up when the given date is exactly between the nearest round minutes.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to round
 * @param {Object} [options] - an object with options.
 * @param {Number} [options.nearestTo=1] - nearest number of minutes to round to. E.g. `15` to round to quarter hours.
 * @returns {Date} the new date rounded to the closest minute
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.nearestTo` must be between 1 and 30
 *
 * @example
 * // Round 10 July 2014 12:12:34 to nearest minute:
 * var result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34))
 * //=> Thu Jul 10 2014 12:13:00
 *
 * @example
 * // Round 10 July 2014 12:07:30 to nearest quarter hour:
 * var result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34), { nearestTo: 15 })
 * // rounds up because given date is exactly between 12:00:00 and 12:15:00
 * //=> Thu Jul 10 2014 12:15:00
 */
export default function roundToNearestMinutes(
  dirtyDate: Date | number,
  options?: { nearestTo: number }
): Date {
  if (arguments.length < 1) {
    throw new TypeError('1 argument required, but only none provided present')
  }

  const nearestTo =
    options && 'nearestTo' in options ? toInteger(options.nearestTo) : 1

  if (nearestTo < 1 || nearestTo > 30) {
    throw new RangeError('`options.nearestTo` must be between 1 and 30')
  }

  const date = toDate(dirtyDate)
  const seconds = date.getSeconds() // relevant if nearestTo is 1, which is the default case
  const minutes = date.getMinutes() + seconds / 60
  const roundedMinutes = Math.floor(minutes / nearestTo) * nearestTo
  const remainderMinutes = minutes % nearestTo
  const addedMinutes = Math.round(remainderMinutes / nearestTo) * nearestTo

  return coreNewDate(
    coreGetFullYear(date),
    coreGetMonth(date),
    coreGetDate(date),
    date.getHours(),
    roundedMinutes + addedMinutes
  )
}
