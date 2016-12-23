import { util } from 'vue'

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
  },
  hide () {
    this.each((el) => {
      el.style.display = 'none'
    })
  },
  hasClass (className) {
    return this.length > 0 && this[0].classList.contains(className)
  },
  addClass (className) {
    this.each((el) => {
      el.classList.add(className)
    })
  },
  removeClass (className) {
    this.each((el) => {
      el.classList.remove(className)
    })
  },
  css (props, value) {
    if (util.isPlainObject(props)) {
      for (const prop in props) {
        this.each(el => {
          el.style[util.camelize(prop)] = props[prop] 
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
  }
})

export default $
