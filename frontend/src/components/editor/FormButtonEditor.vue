<script>
import ColorPicker from './ColorPicker'
import FontSize from './FontSize'
import CheckboxButton from './CheckboxButton'
import colorMixin from '../../mixins/colorMixin'

export default {
  props: ['show', 'value'],
  components: {
    ColorPicker,
    FontSize,
    CheckboxButton
  },
  mixins: [colorMixin],
  data () {
    return {
      button: this.value
    }
  },
  computed: {
    borderRadius: {
      set (newValue) {
        this.button.props.borderRadius = newValue + 'px'
      },
      get () {
        return parseInt(this.button.props.borderRadius)
      }
    }
  }
}
</script>


<template>
  <div>
    <div class="sidebar-block">
      <div class="input-group shadow">
        <div class="input-group-addon"> 按钮文字 </div>
        <input type="text" class="form-control input-text-shadow" v-model="button.text">
      </div>
    </div>

    <div class="sidebar-block color-groups">

      <div  class="float-color-picker">
        <div class="float-color-block-text">按钮</div>
        <color-picker v-model="button.props.backgroundColor">
          <div class="float-color-block" data-toggle="dropdown" :style="{background:getColor(button.props.backgroundColor)}"></div>
        </color-picker>
      </div>

      <div  class="float-color-picker">
        <div class="float-color-block-text">悬停</div>
        <color-picker v-model="button.props.hoverColor">
          <div class="float-color-block" data-toggle="dropdown" :style="{background:getColor(button.props.hoverColor)}"></div>
        </color-picker>
      </div>

      <div  class="float-color-picker">
        <div class="float-color-block-text">文字</div>
        <color-picker v-model="button.props.color" position="right">
          <div class="float-color-block" data-toggle="dropdown" :style="{background:getColor(button.props.color)}"></div>
        </color-picker>
      </div>

      <div  class="float-color-picker">
        <div class="float-color-block-text">边框</div>
        <color-picker v-model="button.props.borderColor" position="right">
          <div class="float-color-block" data-toggle="dropdown" :style="{background:getColor(button.props.borderColor)}"></div>
        </color-picker>
      </div>
      <div style="clear:both"></div>
    </div>

    <div class="sidebar-block">
      <div class="input-group font-size-input">
        <div class="input-group-addon"> 字号 </div>
        <div class="input-group-btn">
          <font-size v-model="button.props.fontSize"></font-size>
        </div>
      </div>
      <div class="input-group corner-radius-input">
        <div class="input-group-addon"> 圆角 </div>
        <input type="number" class="form-control input-text-shadow" style="text-align:center" v-model.number="borderRadius">
      </div>
      <div style="clear:both"></div>
    </div>

    <div class="sidebar-block" style="text-align:center;">
      <checkbox-button v-model="button.props.fontWeight" :values="['normal','bold']">加粗</checkbox-button> &nbsp; 
      <checkbox-button v-model="button.props.boxShadow" :values="['','1px 3px 6px #888']">阴影</checkbox-button> &nbsp; 
      <checkbox-button v-model="button.props.borderStyle" :values="['none','solid']">边框</checkbox-button>
    </div>
  </div>
</template>