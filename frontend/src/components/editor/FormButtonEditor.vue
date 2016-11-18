<script>
import ColorPicker from './ColorPicker'
import FontSize from './FontSize'
import CheckboxButton from './CheckboxButton'
import colorMixin from '../../mixins/colorMixin'
import ImagePicker from '../ui/ImagePicker'

import { mapActions } from 'vuex'

export default {
  props: ['show', 'value'],
  components: {
    ColorPicker,
    FontSize,
    CheckboxButton,
    ImagePicker
  },
  mixins: [colorMixin],
  data () {
    if (!this.value.hasOwnProperty('imageObj')) {
      this.value.imageObj = null
    }
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
  },
  methods: {
    ...mapActions([
      'modifyElement',
      'resizeElement',
      'getImage'
    ]),
    imageChange (newImage) {
      this.$emit('image-change', newImage)
      this.button.imageObj = newImage
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

    <div class="sidebar-block">
      <image-picker v-model="button.imageObj"
        @before-pick="$emit('popup-change', true)"
        @after-pick="$emit('popup-change', false)"
        @image-change="imageChange"></image-picker>
    </div>
  </div>
</template>

<style>
  .button-background-selector {
    position: relative;
    width: 120px;
    height: 120px;
    /* border: 1px dashed #444; */
    background-color: #eee;
    cursor: pointer;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    border-radius: 3px;
    overflow: hidden;
  }
  .button-background-thumbnail {
    max-width: 100%;
    max-height: 100%;
    height: auto;
  }
  .button-background-thumbnail-action {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: #333;
    color: #fff;
    flex-direction: column;
    display: none;
  }
  .button-background-selector:hover .button-background-thumbnail-action {
    display: flex;
  }
  .button-background-thumbnail-action div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .button-background-thumbnail-action div:hover {
    background-color: #444;
  }
</style>