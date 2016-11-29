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
  mounted () {
    document.title = this.$store.getters.editingPage.name + ' - 编辑 - 聚页'
  }
}

</script>

<template>
  <div @mousedown="$store.dispatch('setActiveElementId', '')">
  	<editor-header></editor-header>
    <div id="main-wrapper">
      <editor-toolbar></editor-toolbar>
      <editor-workspace></editor-workspace>
  </div>
</template>

<style>
#main-wrapper {
  height: auto;
  position: absolute;
  bottom: 0;
  top: 50px;
  left: 0;
  right: 0;
  min-width: 980px;
}

.dropdown-menu-narrow{
  min-width:52px;
}

.dropdown-menu-narrow li{
  text-align: center;
  border-bottom: 1px solid #eee;
  line-height: 32px;
  cursor: pointer;
}

.dropdown-menu-narrow li:last-child{
  border: 0;
}

.dropdown-menu-narrow li.selected, .dropdown-menu-narrow li:hover{
  background-color:#eee;
}
</style>