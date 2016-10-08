import Vue from 'vue'
import store from './store'
import router from './router'
import App from './App'
import API from './API'
import cookieHandler from './utils/cookieHandler'
import './sass/bootstrap.scss'

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
    next((response) => {
      if (response.status === 401) {
        store.dispatch('requireLogin')
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
