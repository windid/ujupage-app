import Vue from 'vue'
import router from './router'
import VueResource from 'vue-resource'
import store from './store'
import App from './App'
import './sass/bootstrap.scss'

Vue.use(VueResource)
Vue.http.options.root = '/api'

Vue.http.interceptors.push((request, next) => {
  store.dispatch('loading')
  next((response) => {
    if (response.ok) {
      store.dispatch('loadingDone')
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
