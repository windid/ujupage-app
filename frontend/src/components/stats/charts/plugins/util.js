export function $ (selector, context = document) {
  return context.querySelector(selector)
}

export function hasClass ($el, className) {
  return $el && (' ' + $el.getAttribute('class') + ' ').indexOf(' ' + className + ' ') > -1
}

export function addClass ($el, className) {
  if (!hasClass($el, className)) {
    $el.className = $el.className + ' ' + className
  }
}

export function removeClass ($el, className) {
  if (!$el) {
    return
  }
  const regex = new RegExp(className + '\\s*', 'gi')
  $el.className = $el.className.replace(regex, '').trim()
}

export function show ($el) {
  if (!$el) {
    return
  }
  $el.style.display = ''
}

export function hide ($el) {
  if (!$el) {
    return
  }
  $el.style.display = 'none'
}

export function getOffset ($el) {
  const docEl = document.documentElement
  const boundingRect = $el.getBoundingClientRect()
  const top = boundingRect.top + window.pageYOffset - docEl.clientTop
  const left = boundingRect.left + window.pageXOffset - docEl.clientLeft

  return {
    top,
    left
  }
}
