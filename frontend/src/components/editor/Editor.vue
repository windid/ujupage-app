<script>
import EditorHeader from './EditorHeader.vue'
import EditorToolbar from './EditorToolbar.vue'
import EditorWorkspace from './EditorWorkspace.vue'
import { mapGetters, mapActions } from 'vuex'
import eventHandler from '../../utils/eventHandler'

export default {
  name: 'editor',
  components: {
    EditorHeader,
    EditorToolbar,
    EditorWorkspace
  },
  computed: {
    ...mapGetters({
      saveStatus: 'saveStatus'
    })
  },
  methods: {
    ...mapActions(['setActiveElementId', 'confirm']),
    clearActiveElement () {
      this.setActiveElementId('')
    }
  },
  mounted () {
    document.title = this.$store.getters.editingPage.name + ' - 编辑 - 聚页'
    this._unloadEvent = eventHandler.listen(window, 'beforeunload', e => {
      const msg = '您对该页面所作修改尚未保存，现在离开导致您所作的修改丢失，确定吗?'
      e = e || window.event
      if (!this.saveStatus) {
        e.returnValue = msg
        return msg
      }
    })
  },
  beforeDestroy () {
    this._unloadEvent.remove()
  },
  beforeRouteLeave (to, from, next) {
    if (!this.saveStatus) {
      this.confirm({
        header: '页面未保存',
        content: '您对该页面所作修改尚未保存，现在离开导致您所作的修改丢失，确定吗?',
        onConfirm: () => {
          next()
        }
      })
    } else {
      next()
    }
  }
}

</script>

<template>
  <div @mousedown="clearActiveElement">
  	<editor-header></editor-header>
    <div id="main-wrapper">
      <editor-toolbar></editor-toolbar>
      <editor-workspace></editor-workspace>
    </div>
  </div>
</template>

<style>
#main-wrapper {
  position: relative;
  top: 50px;
  min-width: 980px;
  background: #fff;
}

.dropdown-menu-narrow{
  min-width: 52px !important;
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
  background-color: #eee;
}
</style>