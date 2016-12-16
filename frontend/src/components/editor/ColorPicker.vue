<script>
import colorMixin from '../../mixins/colorMixin.js'
import Dropdown from '../ui/Dropdown.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'ColorPicker',
  mixins: [colorMixin],
  components: {
    Dropdown
  },
  props: {
    value: {
      required: true
    },
    position: {
      type: String,
      default: 'left'
    }
  },
  data () {
    return {
      show: false,
      color: this.value,
      hasFocus: false
    }
  },
  computed: mapGetters({
    colorSet: 'editorColorSet'
  }),
  methods: {
    setColor (newColor) {
      this.color = newColor + ''
      this.$emit('input', this.color)
      this.show = false
    },
    inputFocus () {
      if (!this.hasFocus) {
        this.hasFocus = true
        this.$emit('inputFocus')
      }
    },
    inputBlur () {
      this.hasFocus = false
    },
    inputColor (e) {
      let newColor = e.target.value
      if (newColor.toString().substr(0, 1) !== '#') {
        newColor = '#' + newColor
      }
      this.color = newColor
      this.$emit('input', this.color, true)
    },
    inputDone () {
      this.show = false
      this.$emit('input', this.color)
    }
  }
}
</script>

<template>
  <dropdown :show="show" @toggle="show=!show">
    <slot><div data-toggle="dropdown" class="color-button dropdown-toggle" :style="{background:getColor(color)}"></div></slot>
    <div slot="dropdown-menu" class="dropdown-menu" :class="{'dropdown-menu-right':position === 'right'}">
      <div v-for="(colorItem, index) in colorSet" :style="{background: colorItem}" @click="setColor(index)" class="color-block" :class="{'selected':index.toString() === color}"></div>
      <div class="common-color-blocks-wrapper">
        <div class="color-block common-color-block" style="background:#000;color:#fff" @click="setColor('#000')" :class="{'selected':color === '#000'}">黑</div>
        <div class="color-block common-color-block" style="background:#fff" @click="setColor('#fff')" :class="{'selected':color === '#fff'}">白</div>
        <div class="color-block common-color-block" style="background:#bbb" @click="setColor('#ccc')" :class="{'selected':color === '#ccc'}">灰</div>
        <div class="color-block common-color-block" @click="setColor('')" :class="{'selected':color === ''}">透</div>
        <div style="clear:both"></div>
      </div>
      <div class="input-group color-block" @mousedown.stop>
        <div class="input-group-addon" :style="{background:getColor(color)}"> &nbsp; </div>
        <input type="text" class="form-control input-text-shadow" :value="getColor(color)" @input="inputColor" placeholder="自定义颜色" @mousedown.stop="inputFocus" @blur.stop="inputBlur">
        <div class="input-group-btn" @click="inputDone">
          <div class="btn btn-primary"><span class="glyphicon glyphicon-ok"></span></div>
        </div>
      </div>
    </div>
  </dropdown>
</template>

<style scoped>
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