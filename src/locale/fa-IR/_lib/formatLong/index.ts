import buildFormatLongFn from '../../../_lib/buildFormatLongFn/index'
import type { FormatLong } from '../../../types'

const dateFormats = {
  full: 'EEEE do MMMM y',
  long: 'do MMMM y',
  medium: 'd MMM y',
  short: 'yyyy/MM/dd',
}

const timeFormats = {
  full: 'h:mm:ss a zzzz',
  long: 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  short: 'h:mm a',
}

const dateTimeFormats = {
  full: "{{date}} 'در' {{time}}",
  long: "{{date}} 'در' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}',
}

const formatLong: FormatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: 'full',
  }),

  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: 'full',
  }),

  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: 'full',
  }),
}

export default formatLong
