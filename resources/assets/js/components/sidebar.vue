<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
      twoWay: true
    }
  },
  data (){
    return {
      
    }
  },
  methods:{
  	stopPropagation: function(event){
  		event.stopPropagation()
  	}
  },
  ready:function(){
    
  }
}
</script>

<template>
  <div class="sidebar-mask" transition="sidebar">
    <div class="sidebar-wrapper">
      <div class="sidebar-container" @click="stopPropagation">
        
        <div class="sidebar-header">
          <slot name="header">
          </slot>
        </div>
        
        <div class="sidebar-body">
          <slot name="body">
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.sidebar-mask {
  position: fixed;
  z-index: 800000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  display: table;
  transition: opacity .3s ease;
}

.sidebar-wrapper {
  display: table-cell;
  height: 100%;
}

.sidebar-container {
  width:240px;
  position: absolute;
  right: 0;
  height:100%;
  margin-top:45px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .4s ease;
}

.sidebar-header {
  padding:12px;
}

.sidebar-body {
  padding:12px;
  background: #eee;
  border-top:1px solid #ccc;
  border-bottom:1px solid #ccc;
  overflow-x: auto;
  position: relative;
}


/*
 * the following styles are auto-applied to elements with
 * v-transition="sidebar" when their visiblity is toggled
 * by Vue.js.
 *
 * You can easily play with the sidebar transition by editing
 * these styles.
 */

.sidebar-enter, .sidebar-leave {
  opacity: 0;
}
</style>