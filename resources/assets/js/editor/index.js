import editor from '../components/editor.vue'

var vm = new Vue({
  el: 'body',
  components: { editor },
  methods: {
    bodyClick: function(event){
      this.$broadcast('body-click',event);
    }
  }
})

