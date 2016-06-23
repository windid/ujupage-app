<style>
.color-block {
  height: 30px;
  margin: 6px;
  border: 2px solid #eee;
  cursor: pointer;
  border-radius: 4px;
  text-align: center;
  line-height: 30px;
}

.color-block:hover, .color-button:hover{
  border: 1px solid #ccc;
}

.color-button{
  width:100%;
  height:30px;
  border-radius: 4px;
  border: 2px solid #eee;
}
</style>

<template>
  <dropdown :show.sync="show">
    <div slot="button">
      <div class="color-button" :style="{background:getColor(color)}"></div>
    </div>
    <div slot="content">
      <div v-for="colorItem in colorSet" :style="{background: colorItem}" class="color-block"></div>
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
      type: String,
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