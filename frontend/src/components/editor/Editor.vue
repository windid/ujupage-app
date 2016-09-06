<script>
import EditorHeader from './EditorHeader.vue'
import EditorToolbar from './EditorToolbar.vue'
import EditorWorkspace from './EditorWorkspace.vue'

export default {
  name: 'editor',
  components: {
    EditorHeader,
    EditorToolbar,
    EditorWorkspace
  },
  created () {
    this.$store.dispatch('pageInit', this.$route.params.pageId)
  }
  // beforeRouteEnter (route, redirect, next) {
  //   // console.log(this)
  //   // this.$store.dispatch('pageInit', [ route.params.pageId, next ])
  //   next(vm => {
  //     console.log(vm)
  //   })
  // }
}

</script>

<template>
  <div @mousedown="$store.dispatch('setActiveElementId', '')">
  	<editor-header></editor-header>
    <div class="main-wrapper">
      <editor-toolbar></editor-toolbar>
      <editor-workspace></editor-workspace>
  </div>
</template>

<style>
.main-wrapper {
  height: auto;
  position:absolute;
  bottom:0;
  top:50px;
  left:0;
  right:0;
  min-width:980px;
  overflow:auto;
}
</style>