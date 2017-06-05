// global functions and variables for ui editor
export function getScrollTop () {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
}

export default {
  install (Vue) {
    Vue.prototype.$ui = {
      headerHeight: 50,
      bodyScrollTop: () => getScrollTop(),
      scrollTop: () => {
        const top = getScrollTop()
        return top - 50
      }
    }
  }
}
