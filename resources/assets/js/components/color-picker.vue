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
    },
    position: {
      type: String,
      default: "left"
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
    },
    inputColor: function(e){
      let newColor = e.target.value;
      if (newColor.toString().substr(0,1) != "#"){
        newColor = "#" + newColor;
      }
      this.color = newColor;
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

<template>
  <dropdown :show.sync="show">
    <slot><div data-toggle="dropdown" class="color-button" :style="{background:getColor(color)}"></div></slot>
    <div slot="dropdown-menu" class="dropdown-menu" :class="{'dropdown-menu-right':position === 'right'}">
      <div v-for="colorItem in colorSet" :style="{background: colorItem}" @click="setColor($index)" class="color-block"></div>
      <div class="color-block" @click="setColor('')">无颜色</div>
      <div class="input-group color-block">
        <div class="input-group-addon" :style="{background:getColor(color)}"> &nbsp; </div>
        <input type="text" class="form-control input-text-shadow" :value="getColor(color)" @input="inputColor" placeholder="自定义颜色">
        <div class="input-group-addon btn btn-primary" @click="show=false"><span class="glyphicon glyphicon-ok"></span></div>
      </div>
    </div>
  </dropdown>
</template>

<style>
.color-block {
  width:160px;
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