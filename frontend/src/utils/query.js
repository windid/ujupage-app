/**
 * A mini jQuery library
 */
import { isPlainObject, camelize } from 'utils'

const $ = function (selector, context = document) {
  return new $.fn.Init(selector, context)
}

$.fn = $.prototype

$.fn.Init = function (selector, context) {
  if (selector.nodeType === 1) {
    this[0] = selector
    this.length = 1
    return this
  }
  const nodeList = context.querySelectorAll(selector)
  this.length = nodeList.length
  for (let i = 0; i < this.length; i++) {
    this[i] = nodeList[i]
  }
  return this
}

$.fn.Init.prototype = $.fn

$.extend = $.fn.extend = function (dest, src) {
  if (typeof src === 'undefined') {
    src = dest
    dest = this
  }
  for (const prop in src) {
    if (src.hasOwnProperty(prop)) {
      dest[prop] = src[prop]
    }
  }
  return dest
}

$.fn.extend({
  each (fn) {
    for (let i = 0; i < this.length; i++) {
      fn.call(this[i], this[i], i)
    }
  }
})

$.fn.extend({
  show () {
    this.each((el) => {
      el.style.display = ''
    })
    return this
  },
  hide () {
    this.each((el) => {
      el.style.display = 'none'
    })
    return this
  },
  hasClass (className) {
    return this.length > 0 && this[0].classList.contains(className)
  },
  addClass (className) {
    this.each((el) => {
      el.classList.add(className)
    })
    return this
  },
  removeClass (className) {
    this.each((el) => {
      el.classList.remove(className)
    })
    return this
  },
  css (props, value) {
    if (isPlainObject(props)) {
      for (const prop in props) {
        this.each(el => {
          el.style[camelize(prop)] = props[prop]
        })
      }
    } else {
      if (!value && this.length > 0) {
        return window.getComputedStyle(this[0]).getPropertyValue(props)
      } else {
        this.each(el => {
          el.style[props] = value
        })
      }
    }
    return this
  },
  has (attr) {
    return this.length > 0 ? this[0].hasAttribute(attr) : false
  },
  attr (name, val) {
    if (typeof val === 'undefined') {
      return this.length > 0 ? this[0].getAttribute(name) : null
    } else {
      this.each((el) => {
        el.setAttribute(name, val)
      })
      return this
    }
  },
  offset () {
    if (this.length > 0) {
      const el = this[0]
      const docEl = document.documentElement
      const boundingRect = el.getBoundingClientRect()
      const top = boundingRect.top + window.pageYOffset - docEl.clientTop
      const left = boundingRect.left + window.pageXOffset - docEl.clientLeft
      return {
        top,
        left
      }
    }
  }
})

export default $
