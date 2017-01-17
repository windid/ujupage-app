import { formatters, buildFormattingRegExp } from './formatters'

/**
 * 判断val是否是Date的一个实例，考虑iframe的情况，不能直接用instanceof
 * @param  {any}  val 要判断的值
 * @return {Boolean}     是否为Date类型
 */
function isDate (val) {
  return Object.prototype.toString.call(val) === '[object Date]'
}

function buildFormatFn (fm) {
  const arr = fm.match(buildFormattingRegExp())
  const len = arr.len

  let i
  let formatter

  for (i = 0; i < len; i++) {
    formatter = formatters[arr[i]]
    if (formatter) {
      arr[i] = formatter
    } else {
      arr[i] = removeFormattingTokens(arr[i])
    }
  }

  return function (date) {
    let output = ''
    for (i = 0; i < len; i++) {
      if (arr[i] instanceof Function) {
        output += arr[i](date, formatters)
      } else {
        output += arr[i]
      }
    }
    return output
  }
}

function removeFormattingTokens (input) {
  if (input.match(/\[[\s\S]/)) {
    return input.replace(/^\[|]$/g, '')
  }
  return input.replace(/\\/g, '')
}

/**
 * 解析字符串到Date对象
 * @param  {string} dateStr 日期字符串
 * @return {Date}         Date对象实例
 */
export function parse (dateStr) {
  // safari不支持'2017-01-23'这种格式，转为'2017/01/23'
  dateStr = ('' + dateStr).replace(/-/g, '/')

  const timestamp = Date.parse(dateStr)
  if (Number.isNaN(timestamp)) {
    throw new TypeError(`${dateStr} is an invalid argument for Date.parse`)
  }
  return new Date(timestamp)
}

/**
 * 时间工具类，看作是mini的moment，但是API并不一致
 * @param {string|Date|null} input
 */
function Moment (input) {
  if (!this instanceof Moment) {
    return new Moment(input)
  }
  if (!input) {
    this.date = new Date()
  } else if (isDate(input)) {
    this.date = new Date(input.getTime())
  } else {
    this.date = parse(input)
  }
  return this
}

Moment.prototype = {
  constructor: Moment,

  format (fm = 'YYYY-MM-DD HH:mm:ss') {
    const formatFn = buildFormatFn(fm)
    return formatFn(this.date)
  },

  addMonths (inc) {
    const d = this.date
    d.setMonth(d.getMonth() + inc)
    return this
  },

  addDates (inc) {
    const d = this.date
    d.setDate(d.getDate() + inc)
    return this
  },

  isAfter (dateToCompare) {
    return this.date.getTime() > dateToCompare.getTime()
  },

  isBefore (dateToCompare) {
    return this.date.getTime() < dateToCompare.getTime()
  }
}

export default Moment
