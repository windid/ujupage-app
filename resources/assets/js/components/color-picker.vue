<style>
.color-block {
  height: 30px;
  margin: 6px;
  border: 2px solid #ddd;
  cursor: pointer;
  border-radius: 4px;
  text-align: center;
  line-height: 30px;
}

.color-block:hover, .color-button:hover{
  border: 2px solid #ccc;
}

.color-button{
  cursor:pointer;
  width:100%;
  min-width:60px;
  height:30px;
  border-radius: 4px;
  border: 2px solid #ddd;
}
</style>

<template>
  <dropdown :show.sync="show">
    <slot><div data-toggle="dropdown" class="color-button" :style="{background:getColor(color)}"></div></slot>
    <div slot="dropdown-menu" class="dropdown-menu">
      <div v-for="colorItem in colorSet" :style="{background: colorItem}" @click="setColor($index)" class="color-block"></div>
      <hr>
      <div class="color-block" @click="setColor('')">无颜色</div>
      <div class="color-block">自定义颜色</div>
    </div>
  </dropdown>
</template>

<script>
import colorMixin from '../mixins/colorMixin.js'
import dropdown from './dropdown.vue'
import { getColorSet } from '../store/getters'

export default {
  name:'colorPicker',
  mixins: [colorMixin],
  components: {
    dropdown
  },
  props: {
    color: {
      // type: String,
      required: true,
      twoWay: true
    }
  },
  data (){
    return {
      show: false
    }
  },
  methods:{
    setColor: function(newColor){
      this.color = newColor;
      this.show = false;
    }
  },
  vuex: {
    actions: {
      
    },
    getters: {
      colorSet: getColorSet
    }
  }
}
</script>