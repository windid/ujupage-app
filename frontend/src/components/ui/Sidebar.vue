<script>
import eventHandler from '../../utils/eventHandler'
import { getScrollbarWidth } from '../../utils/env'
import $ from '../../utils/query'

export default {
  props: {
    show: {
      type: Boolean,
      require: true
    }
  },
  data () {
    return {
      bodyScrollable: true
    }
  },
  mounted () {
    var el = this.$el
    this._closeEvent = eventHandler.listen(window, 'click', (e) => {
      if (!el.contains(e.target)) {
        this.$emit('close')
      }
    })
  },
  beforeDestroy () {
    if (this._closeEvent) this._closeEvent.remove()
  },
  computed: {
    style () {
      let paddingRight = getScrollbarWidth()
      if (this.bodyScrollable) {
        paddingRight = 0
      }
      return { paddingRight: paddingRight + 'px' }
    }
  },
  watch: {
    bodyScrollable (val) {
      const $body = $(document.body)
      const $editorHeader = $('.editor-header')
      const sidebarBody = this.$refs.sidebarBody
      this.$nextTick(() => {
        if (val) {
          $body.css('padding-right', '0px').removeClass('no-scroll')
          $editorHeader.css('padding-right', '0px')
        } else if (sidebarBody && sidebarBody.scrollHeight > sidebarBody.offsetHeight) {
          const paddingRight = getScrollbarWidth() + 'px'
          $body.addClass('no-scroll').css('padding-right', paddingRight)
          $editorHeader.css('padding-right', paddingRight)
        }
      })
    }
  }
}
</script>

<template>

<transition name="sidebar">
  <div v-if="show" class="sidebar" @mousedown.stop :style="style">
    <div class="sidebar-header">
      <slot name="header">
      </slot>
    </div>
    <div class="sidebar-body"
      ref="sidebarBody"
      @mouseenter="bodyScrollable = false"
      @mouseleave="bodyScrollable = true">
      <slot name="body">
      </slot>
    </div>
  </div>
</transition>

</template>

<style lang="scss">
$sidebar-width: 300px;

.sidebar {
  position: fixed;
  z-index: 102000;
  width: $sidebar-width;
  top: 50px;
  right: 0;
  height: calc(100% - 50px);
  background-color: #fff;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  box-sizing: content-box;
}

.sidebar-header {
  background: #f6f6f6;
  padding:10px;
  height: 55px;
  border-bottom: 1px solid #ddd;
}

.sidebar-body {
  padding: 0 12px;
  height: calc(100% - 54px);
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
}

.sidebar-enter-active, .sidebar-leave-active {
  transition: all .3s;
}

.sidebar-enter, .sidebar-leave-active {
  right: -$sidebar-width;
}

.sidebar-block{
  padding:15px 0;
}

.sidebar-block .text-input{
  width: 100%;
  padding: 4px 8px;
  border:1px solid #ccc;
  border-radius: 4px;
}

.sidebar-block-inside{
  padding-top:10px;
}

</style>