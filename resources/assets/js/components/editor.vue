<template>
  <editor-header @click="setActiveElementId('')"></editor-header>
  <div class="main" @click="setActiveElementId('')">
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
    "editor-header": editorHeader,
    "editor-toolbar": editorToolbar,
    "editor-workspace": editorWorkspace
  },
  vuex: {
    actions: {
      setActiveElementId
    }
  },
  store
}
</script>

