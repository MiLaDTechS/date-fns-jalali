import addDays from '../addDays/index'
import toDate from '../toDate/index'
import toInteger from '../_lib/toInteger/index'
import requiredArgs from '../_lib/requiredArgs/index'
import { LocalOptions, WeekStartOptions } from '../types'

/**
 * @name setDay
 * @category Weekday Helpers
 * @summary Set the day of the week to the given date.
 *
 * @description
 * Set the day of the week to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} day - the day of the week of the new date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the new date with the day of the week set
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // Set week day to Sunday, with the default weekStartsOn of Sunday:
 * var result = setDay(new Date(2014, 8, 1), 0)
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // Set week day to Sunday, with a weekStartsOn of Monday:
 * var result = setDay(new Date(2014, 8, 1), 0, { weekStartsOn: 1 })
 * //=> Sun Sep 07 2014 00:00:00
 */
export default function setDay(
  dirtyDate: Date | number,
  dirtyDay: number,
  dirtyOptions?: WeekStartOptions & LocalOptions
): Date {
  requiredArgs(2, arguments)

  const options = dirtyOptions || {}
  const locale = options.locale
  const localeWeekStartsOn =
    locale && locale.options && locale.options.weekStartsOn
  const defaultWeekStartsOn =
    localeWeekStartsOn == null ? 6 : toInteger(localeWeekStartsOn)
  const weekStartsOn =
    options.weekStartsOn == null
      ? defaultWeekStartsOn
      : toInteger(options.weekStartsOn)

  // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively')
  }

  const date = toDate(dirtyDate)
  const day = toInteger(dirtyDay)
  const currentDay = date.getDay()

  const remainder = day % 7
  const dayIndex = (remainder + 7) % 7

  const delta = 7 - weekStartsOn
  const diff =
    day < 0 || day > 6
      ? day - ((currentDay + delta) % 7)
      : ((dayIndex + delta) % 7) - ((currentDay + delta) % 7)
  return addDays(date, diff)
}
