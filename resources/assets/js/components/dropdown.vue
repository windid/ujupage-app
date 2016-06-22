<script>
export default {
  props: {
    show: {
      type:Boolean,
      required: true,
      default:false,
      twoWay: true
    },
    id: {
      type: String,
      required: true
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
      
    }
  }
}
</script>

<template>
<div v-bind:class="[dir,{open:show}]">
  <div class="dropdown-toggle" id="{{id}}" data-toggle="dropdown" @click="show=!show">
    <slot name="button"></slot>
  </div>
  <div class="dropdown-menu" v-bind:class="{'dropdown-menu-right': (align == 'right')}" aria-labelledby="{{id}}">
    <slot name="content"></slot>
  </div>
</div>
</template>
