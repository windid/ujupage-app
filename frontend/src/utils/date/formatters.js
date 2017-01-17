import { addLeadingZeros } from '../index'

export const formatters = {
  M (date) {
    return date.getMonth() + 1
  },
  MM (date) {
    return addLeadingZeros(date.getMonth() + 1, 2)
  },
  YYYY (date) {
    return addLeadingZeros(date.getFullYear(), 4)
  },
  D (date) {
    return date.getDate()
  },
  DD (date) {
    return addLeadingZeros(date.getDate(), 2)
  },
  H (date) {
    return date.getHours()
  },
  HH (date) {
    return addLeadingZeros(date.getHours(), 2)
  },
  h (date) {
    const hours = date.getHours()
    if (hours === 0) {
      return 12
    } else if (hours > 12) {
      return hours % 12
    } else {
      return hours
    }
  },
  hh (date) {
    return addLeadingZeros(formatters['h'](date), 2)
  },
  m (date) {
    return date.getMinutes()
  }
  mm (date) {
    return addLeadingZeros(date.getMinutes(), 2)
  },
  s (date) {
    return date.getSeconds()
  },
  ss (date) {
    return addLeadingZeros(date.getSeconds(), 2)
  }
}

export function buildFormattingRegExp () {
  const formatterKeys = []
  for (const key in formatters) {
    if (formatters.hasOwnProperty(key)) {
      formatterKeys.push(key)
    }
  }
  formatterKeys.sort().reverse()
  return new RegExp(
    '(\\[[^\\[]*\\])|(\\\\)?' + '(' + formatterKeys.join('|') + '|.)', 'g'
  }
}
