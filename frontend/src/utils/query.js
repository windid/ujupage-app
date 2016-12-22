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
  each: function (fn) {
    for (let i = 0; i < this.length; i++) {
      fn.apply(this[i], this[i], i)
    }
  }
})

$.fn.extend({
  show: function () {
    this.each((el) => {
      el.style.display = ''
    })
  },
  hide: function () {
    this.each((el) => {
      el.style.display = 'none'
    })
  },
  hasClass: function (className) {
    return this.length > 0 && this[0].classList.contains(className)
  },
  addClass: function (className) {
    this.each((el) => {
      el.classList.add(className)
    })
  },
  removeClass: function (className) {
    this.each((el) => {
      el.classList.remove(className)
    })
  }
})

export default $
