import Vue from 'vue'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

import App from './App'

import store from './store'
import router from './router'
import API from './API'
import cookieHandler from 'utils/cookieHandler'

if (process.env.NODE_ENV === 'production') {
  Raven.config('https://04878f0f86eb4c21b54fd0e63ed70e3a@sentry.io/126101').addPlugin(RavenVue, Vue).install()
}

API.account.current().then(response => {
  store.dispatch('loadUser', response.data)
  AppInit()
}, response => {
  AppInit()
})

const AppInit = () => {
  Vue.http.interceptors.push((request, next) => {
    var xsrfToken = cookieHandler.get('XSRF-TOKEN')
    if (xsrfToken) {
      request.headers.map['X-XSRF-TOKEN'] = [xsrfToken]
    }
    next(response => {
      if (response.status === 401 && store.getters.isLogin) {
        return new Promise(resolve => {
          store.dispatch('requireLogin', {
            onPass () {
              resolve(Vue.http(request))
            }
          })
        })
      }
    })
  })

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
}
