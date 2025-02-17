import toDate from '../toDate/index'
import differenceInCalendarMonths from '../differenceInCalendarMonths/index'
import compareAsc from '../compareAsc/index'
import requiredArgs from '../_lib/requiredArgs/index'
import isLastDayOfMonth from '../isLastDayOfMonth/index'

import coreGetMonth from '../_core/getMonth/index'
import coreSetMonth from '../_core/setMonth/index'
import coreGetDate from '../_core/getDate/index'
import coreSetDate from '../_core/setDate/index'

/**
 * @name differenceInMonths
 * @category Month Helpers
 * @summary Get the number of full months between the given dates.
 *
 * @description
 * Get the number of full months between the given dates using trunc as a default rounding method.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of full months
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many full months are between 31 January 2014 and 1 September 2014?
 * const result = differenceInMonths(new Date(2014, 8, 1), new Date(2014, 0, 31))
 * //=> 7
 */
export default function differenceInMonths(
  dirtyDateLeft: Date | number,
  dirtyDateRight: Date | number
): number {
  requiredArgs(2, arguments)

  const dateLeft = toDate(dirtyDateLeft)
  const dateRight = toDate(dirtyDateRight)

  const sign = compareAsc(dateLeft, dateRight)
  const difference = Math.abs(differenceInCalendarMonths(dateLeft, dateRight))
  let result

  // Check for the difference of less than month
  if (difference < 1) {
    result = 0
  } else {
    if (coreGetMonth(dateLeft) === 11 && coreGetDate(dateLeft) > 28) {
      // This will check if the date is end of Esfand and assign a higher end of month date
      // to compare it with Farvardin
      coreSetDate(dateLeft, 30)
    }

    coreSetMonth(dateLeft, coreGetMonth(dateLeft) - sign * difference)

    // Math.abs(diff in full months - diff in calendar months) === 1 if last calendar month is not full
    // If so, result must be decreased by 1 in absolute value
    let isLastMonthNotFull = compareAsc(dateLeft, dateRight) === -sign

    // Check for cases of one full calendar month
    if (
      isLastDayOfMonth(toDate(dirtyDateLeft)) &&
      difference === 1 &&
      compareAsc(dirtyDateLeft, dateRight) === 1
    ) {
      isLastMonthNotFull = false
    }

    result = sign * (difference - Number(isLastMonthNotFull))
  }

  // Prevent negative zero
  return result === 0 ? 0 : result
}
