import VueResource from 'vue-resource'
import dashboard from './components/dashboard.vue'
import store from './vuex/store'

Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

Vue.use(VueResource);
Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var vm = new Vue({
  el: '#page',
  store,
  render: h => h(dashboard)
})

