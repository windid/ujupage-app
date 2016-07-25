Vue.config.devtools = true

import VueResource from 'vue-resource'
import editor from './components/editor.vue'
import '../../sass/editor.scss'
import '../vendor/jquery-ui/jquery-ui.js'
import '../vendor/jquery-ui/jquery-ui.css'


Vue.use(VueResource);

Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');


Vue.directive('content', {
  twoWay: true,
  bind: function () {
    this.handler = function () {
      this.set(this.el.innerHTML)
    }.bind(this)
    this.el.addEventListener('keyup', this.handler)
  },
  update: function (newValue, oldValue) {
    this.el.innerHTML = newValue || ''
  },
  unbind: function () {
    this.el.removeEventListener('keyup', this.handler)
  }
});

var vm = new Vue({
  el: 'body',
  components: { editor }
})

