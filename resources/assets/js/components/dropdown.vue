<script>
export default {
  props: {
    show: {
      type:Boolean,
      required: true,
      default:false,
      twoWay: true
    },
    //dropdown 向下弹出，dropup向上弹出
    dir: {
      type:String,
      default:'dropdown'
    },
    //left左对齐，right右对齐
    align: {
      type:String,
      defalut:'left'
    }
  },
  data (){
    return {
      clickOnThisDropdown: false
    }
  },
  methods:{
    dropdownClick: function(){
      this.clickOnThisDropdown = true;
    }
  },
  events: {
    'body-click': function(){
      if (this.clickOnThisDropdown){
        this.clickOnThisDropdown = false;
      } else {
        this.show = false;
      }
    }
  }
}
</script>

<template>
<div class="{{dir}} open" @click="dropdownClick">
  <div class="dropdown-toggle" @click="show=!show">
    <slot name="button"></slot>
  </div>
  <div v-show="show" class="dropdown-menu" v-bind:class="{'dropdown-menu-right': (align == 'right')}" transition="fade">
    <slot name="content"></slot>
  </div>
</div>
</template>
<style>
  
</style>