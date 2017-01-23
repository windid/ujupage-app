import { formatters, buildFormattingRegExp } from './formatters'

export const msOfSecond = 1000
export const msOfHour = msOfSecond * 3600
export const msOfDay = msOfHour * 24

// 缓存buildFormattingRegExp()的执行结果
let cachedFormattingRegExp

/**
 * 判断val是否是Date的一个实例，考虑iframe的情况，不能直接用instanceof
 * @param  {any}    val  要判断的值
 * @return {Boolean}     是否为Date类型
 */
function isDate (val) {
  return Object.prototype.toString.call(val) === '[object Date]'
}

function wrap (moment) {
  if (moment instanceof Moment) {
    return moment
  } else {
    return new Moment(moment)
  }
}

/**
 * 格式化日期
 * @param  {Date} date 日期对象实例
 * @param  {string} fm 格式字符串
 * @return {string}    格式化后的字符串
 */
export function format (date, fm) {
  cachedFormattingRegExp = cachedFormattingRegExp || buildFormattingRegExp()
  const arr = fm.match(cachedFormattingRegExp)
  const len = arr.length
  let formatter

  for (let i = 0; i < len; i++) {
    formatter = formatters[arr[i]]
    if (formatter) {
      arr[i] = formatter(date)
    } else {
      arr[i] = removeFormattingTokens(arr[i])
    }
  }

  return arr.join('')
}

function removeFormattingTokens (input) {
  if (input.match(/\[[\s\S]/)) {
    return input.replace(/^\[|]$/g, '')
  }
  return input.replace(/\\/g, '')
}

export function isLeapYear (year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0
}

export function getDayCountOfMonth (year, month) {
  if (month === 3 || month === 5 || month === 8 || month === 10) {
    return 30
  }

  if (month === 1) {
    return isLeapYear(year) ? 29 : 28
  }

  return 31
}

/**
 * 解析字符串到Date对象
 * @param  {string} dateStr 日期字符串
 * @return {Date}           Date对象实例
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
 * 时间工具类，看作是mini的moment，但是API并不完全一致
 * @param {string|Date|null} input
 */
function Moment (input) {
  if (!(this instanceof Moment)) {
    return new Moment(input)
  }
  if (!input) {
    this.date = new Date()
  } else if (isDate(input)) {
    this.date = new Date(input.getTime())
  } else if (input instanceof Moment) {
    return new Moment(input.value())
  } else {
    this.date = parse(input)
  }
  return this
}

Moment.prototype = {
  constructor: Moment,

  value () {
    return this.date
  },

  format (fm = 'YYYY-MM-DD HH:mm:ss') {
    return format(this.date, fm)
  },

  addYears (inc) {
    const d = this.date
    d.setFullYear(d.getFullYear() + inc)
    return this
  },

  addMonths (inc) {
    const d = this.date
    const date = d.getDate()
    const tmpDate = new Date(d.getTime())
    tmpDate.setMonth(d.getMonth() + inc, 1)
    const year = tmpDate.getFullYear()
    const month = tmpDate.getMonth()
    const newMonthDayCount = getDayCountOfMonth(year, month)
    if (newMonthDayCount < date) {
      d.setDate(newMonthDayCount)
    }
    d.setFullYear(year, month)
    return this
  },

  addDays (inc) {
    const d = this.date
    d.setDate(d.getDate() + inc)
    return this
  },

  addHours (inc) {
    const d = this.date
    d.setHours(d.getHours() + inc)
    return this
  },

  addMinutes (inc) {
    const d = this.date
    d.setMinutes(d.getMinutes() + inc)
    return this
  },

  addSeconds (inc) {
    const d = this.date
    d.setSeconds(d.getSeconds() + inc)
    return this
  },

  add (inc, type) {
    switch (type) {
      case 'y':
      case 'years':
        this.addYears(inc)
        break
      case 'M':
      case 'months':
        this.addMonths(inc)
        break
      case 'd':
      case 'days':
        this.addDays(inc)
        break
      case 'h':
      case 'hours':
        this.addHours(inc)
        break
      case 'm':
      case 'minutes':
        this.addMinutes(inc)
        break
      case 's':
      case 'seconds':
        this.addSeconds(inc)
        break
      default:
        this.date.setTime(this.date.getTime() + inc)
    }
    return this
  },

  subtract (dec, type) {
    return this.add(-dec, type)
  },

  isAfter (dateToCompare = new Date()) {
    return this.date.getTime() > dateToCompare.getTime()
  },

  isBefore (dateToCompare = new Date()) {
    return this.date.getTime() < dateToCompare.getTime()
  },

  startOfYear () {
    const d = this.date
    d.setMonth(0, 1)
    d.setHours(0, 0, 0, 0)
    return this
  },

  startOfMonth () {
    const d = this.date
    d.setDate(1)
    d.setHours(0, 0, 0, 0)
    return this
  },

  startOfDay () {
    this.date.setHours(0, 0, 0, 0)
    return this
  },

  startOfHour () {
    this.date.setSeconds(0, 0)
    return this
  },

  endOfYear () {
    const d = this.date
    const year = d.getFullYear()
    d.setFullYear(year + 1, 0, 0)
    d.setHours(23, 59, 59, 999)
    return this
  },

  endOfMonth () {
    const d = this.date
    const month = d.getMonth()
    d.setFullYear(d.getFullYear(), month + 1, 0)
    d.setHours(23, 59, 59, 999)
    return this
  },

  endOfDay () {
    this.date.setHours(23, 59, 59, 999)
    return this
  },

  endOfHour () {
    this.date.setMinutes(59, 59, 999)
    return this
  },

  startOf (type) {
    switch (type) {
      case 'y':
      case 'year':
        this.startOfYear()
        break
      case 'M':
      case 'month':
        this.startOfMonth()
        break
      case 'd':
      case 'day':
        this.startOfDay()
        break
      case 'h':
      case 'hour':
        this.startOfHour()
        break
    }
    return this
  },

  endOf (type) {
    switch (type) {
      case 'y':
      case 'year':
        this.endOfYear()
        break
      case 'M':
      case 'month':
        this.endOfMonth()
        break
      case 'd':
      case 'day':
        this.endOfDay()
        break
      case 'h':
      case 'hour':
        this.endOfHour()
        break
    }
    return this
  },

  diffTime (moment) {
    return this.date.getTime() - moment.value().getTime()
  },

  diffDays (right) {
    const left = new Moment(this.date).startOfDay()
    right = wrap(right).endOfDay()
    return Math.ceil(left.diffTime(right) / msOfDay)
  },

  diff (moment, type) {
    switch (type) {
      case 'd':
      case 'days':
        return this.diffDays(moment)
    }
  }
}

export default Moment
