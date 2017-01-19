// 获取滚动条宽度（在 body border 为0的时候有效）
export function getScrollbarWidth () {
  return window.innerWidth - document.body.clientWidth
}

export const isWindows = window.navigator.userAgent.indexOf('Windows') >= 0
