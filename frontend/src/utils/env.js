export function getScrollbarWidth () {
  const div = document.createElement('div')
  div.className = 'inter-scrollbar-measure'
  document.body.appendChild(div)
  const scrollbarWidth = div.offsetWidth - div.clientWidth
  document.body.removeChild(div)
  return scrollbarWidth
}

export function isBodyOverflow () {
  return window.innerWidth > document.body.clientWidth
}

