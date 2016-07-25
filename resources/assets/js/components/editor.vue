<template>
  <div @mousedown="setActiveElementId('')">
    <editor-header></editor-header>
    <div class="main">
      <editor-toolbar></editor-toolbar>
      <editor-workspace></editor-workspace>
    </div> 
  </div>
</template>
<script>
import editorHeader from './editor-header.vue'
import editorToolbar from './editor-toolbar.vue'
import editorWorkspace from './editor-workspace.vue'
import store from '../store/store'
import { setActiveElementId, pageInit }  from '../store/actions'

export default {
  name: 'editor',
  components: {
    editorHeader,
    editorToolbar,
    editorWorkspace
  },
  vuex: {
    actions: {
      setActiveElementId,
      pageInit
    }
  },
  store,
  methods: {
    loadPage: function(){
      let variationId = 1;
      this.$http.get('/editor/page/variation/' + variationId).then(function(response){
        let page = response.json();
        // let page = data.html_json;
        this.pageInit({page:page});
      },function(response){
        console.log(response.json());
      });

    }
  },
  created: function(){
    this.loadPage()
  }
}
</script>

