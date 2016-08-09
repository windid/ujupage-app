// import VueResource from 'vue-resource'
import preview from './components/preview.vue'

// Vue.use(VueResource);
// Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
// Vue.http.options.root = '/dashboard';

var vm = new Vue({
  el: '#page',
  render: h => h(preview)
})

