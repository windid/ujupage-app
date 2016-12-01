<script>
import eventHandler from '../../utils/eventHandler'

export default {
  props: {
    show: {
      type: Boolean,
      require: true
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
  }
}
</script>

<template>

<transition name="sidebar">
  <div v-if="show" class="sidebar" @mousedown.stop>
    <div class="sidebar-header">
      <slot name="header">
      </slot>
    </div>
    <div class="sidebar-body">
      <slot name="body">
      </slot>
    </div>
  </div>
</transition>

</template>

<style>
.sidebar {
  position: fixed;
  z-index: 800000;
  width: 300px;
  top: 50px;
  right: 0;
  height: calc(100% - 50px);
  background-color: #fff;
  font-size:14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
}

.sidebar-header {
  background: #f6f6f6;
  padding:10px;
  height: 55px;
  border-bottom: 1px solid #ddd;
}

.sidebar-body {
  padding:12px;
  height: calc(100% - 54px);
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
}

.sidebar-enter-active, .sidebar-leave-active {
  transition: all .3s;
}

.sidebar-enter, .sidebar-leave-active {
  right: -300px;
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