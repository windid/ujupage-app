<template>
  <editor-header></editor-header>
  <div class="main">
    <editor-toolbar></editor-toolbar>
    <editor-workspace></editor-workspace>
  </div> 
</template>
<script>
import editorHeader from './editor-header.vue'
import editorToolbar from './editor-toolbar.vue'
import editorWorkspace from './editor-workspace.vue'
import store from '../store/store'
import { setActiveElementId }  from '../store/actions'

export default {
  name: 'editor',
  components: {
    editorHeader,
    editorToolbar,
    editorWorkspace
  },
  vuex: {
    actions: {
      setActiveElementId
    }
  },
  store
}
</script>

