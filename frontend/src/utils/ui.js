// global functions and variables for ui editor

var UI = {}
UI.install = function (Vue, options) {
  Vue.prototype.$ui = {
    headerHeight: 50,
    bodyScrollTop: () => document.body.scrollTop || document.documentElement.scrollTop,
    scrollTop: () => {
      const top = document.body.scrollTop || document.documentElement.scrollTop
      return top - 50
    }
  }
}

export default UI
