import 'babel-polyfill'
import VueResource from 'vue-resource'
import dashboard from './components/dashboard.vue'
import store from './vuex/store'

Vue.use(VueResource);
Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
Vue.http.options.root = '/dashboard';

var vm = new Vue({
  el: '#page',
  store,
  render: h => h(dashboard)
})

