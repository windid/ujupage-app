import VueResource from 'vue-resource'
import editor from '../components/editor.vue'

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
  components: { editor },
  methods: {
    bodyClick: function(event){
      this.$broadcast('body-click',event);
    }
  }
})

