import VueResource from 'vue-resource'
import editor from '../components/editor.vue'

Vue.use(VueResource);

Vue.http.options.root = '/root';

// import tooltip from '../libs/vue-strap/src/tooltip.vue'

// // import eventHandler from '../utils/eventHandler.js'
// import {merge} from 'lodash'

// Vue.directive('tooltip',function(settings){
//   let defaults = {
//     position: 'bottom',
//     content: '',
//     trigger: 'hover'
//   };
//   settings = merge({},defaults,settings);

//   $(this.el).replaceWith(function(){
//     let content = '';
//     content += "<tooltip>" + $(this.el).outerHTML + "</tooltip>";
//     return content
//   });

//   console.log(this.el);
// });

var vm = new Vue({
  el: 'body',
  components: { editor },
  methods: {
    bodyClick: function(event){
      this.$broadcast('body-click',event);
    }
  }
})

