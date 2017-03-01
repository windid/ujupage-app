/**
 * Shorthand for querySelector
 */
export function query (selector, context = document) {
  return context.querySelector(selector)
}

export function hasClass ($el, className) {
  return $el && (' ' + $el.getAttribute('class') + ' ').indexOf(' ' + className + ' ') > -1
}

export function on ($el, event, selector, handler) {
  $el.addEventListener(event, function (e) {
    if (!selector || hasClass(e.target, selector)) {
      handler(e)
    }
  })
}

