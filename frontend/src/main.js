import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App'
import API from './API'
import './sass/bootstrap.scss'

API.account.current().then(response => {
  store.dispatch('loadUser', response.data)
  AppInit()
}, response => {
  console.log(response)
  AppInit()
})

const AppInit = () => {
  Vue.http.interceptors.push((request, next) => {
    store.dispatch('loading')
    next((response) => {
      if (response.ok) {
        store.dispatch('loadingDone')
      } else if (response.status === 401) {
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
