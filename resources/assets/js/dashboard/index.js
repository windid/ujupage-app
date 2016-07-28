import VueResource from 'vue-resource'
import commonHeader from '../common/header.vue'
import sidebar from './components/sidebar.vue'
import store from './vuex/store'

Vue.use(VueResource);

Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var vm = new Vue({
  el: '#page',
  components: { 
  	commonHeader,
  	sidebar
  }
})

