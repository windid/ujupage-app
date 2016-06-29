<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
      twoWay: true
    }
  }
}
</script>

<template>
  <div class="sidebar" transition="fade" v-if="show">
    
    <div class="sidebar-header">
      <slot name="header">
      </slot>
    </div>
    
    <div class="sidebar-body">
      <slot name="body">
      </slot>
    </div>
  </div>
</template>

<style>
.sidebar {
  position:fixed;
  z-index: 80000;
  width:240px;
  top:45px;
  right: 0;
  height:100%;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
}

.sidebar-header {
  padding:10px;
}

.sidebar-body {
  padding:12px;
  border-top:1px solid #ccc;
  border-bottom:1px solid #ccc;
  min-height:500px;
  background: #eee;
  overflow-x: auto;
  position: relative;
}

</style>