<script>

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
      twoWay: true
    }
  },
  data(){
    return {
      bodyHeight:'auto',
    }
  },
  ready(){
    var browserHeight = document.documentElement.clientHeight;
    this.bodyHeight = (browserHeight - 100) + 'px';
  }
}
</script>

<template>
  <div class="sidebar" v-if="show">
    
    <div class="sidebar-header">
      <slot name="header">
      </slot>
    </div>
    
    <div class="sidebar-body" :style="{height:bodyHeight}">
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
  height: 55px;
  border-bottom: 1px solid #ddd;
}

.sidebar-body {
  padding:12px;
  height:100%;
  overflow-x: auto;
  position: relative;
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