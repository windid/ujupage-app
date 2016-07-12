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
      this.color = newColor + '';
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
      <div v-for="colorItem in colorSet" :style="{background: colorItem}" @click="setColor($index)" class="color-block" :class="{'selected':$index.toString() === color}"></div>
      <div class="common-color-blocks-wrapper">
        <div class="color-block common-color-block" style="background:#000;color:#fff" @click="setColor('#000000')" :class="{'selected':color == '#000'}">黑</div>
        <div class="color-block common-color-block" style="background:#fff" @click="setColor('#ffffff')" :class="{'selected':color == '#fff'}">白</div>
        <div class="color-block common-color-block" style="background:#bbb" @click="setColor('#cccccc')" :class="{'selected':color == '#ccc'}">灰</div>
        <div class="color-block common-color-block" @click="setColor('')">透</div>
        <div style="clear:both"></div>
      </div>
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
  line-height: 26px;
}

.color-block.selected {
  border:2px solid #666;
}

.color-block:hover, .color-button:hover{
  border: 2px solid #ccc;
}

.common-color-block {
  float:left;
  width:35px;
  margin-right:1px;
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