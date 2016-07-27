import VueResource from 'vue-resource'
import dashboard from './components/dashboard.vue'


Vue.use(VueResource);

Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var vm = new Vue({
  el: 'body',
  components: { dashboard }
})

