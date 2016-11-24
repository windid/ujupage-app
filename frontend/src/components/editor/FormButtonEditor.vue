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
  },
  watch: {
    'value': {
      handler: function (newButton) {
        this.button = this.value
      },
      deep: true
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
        <input type="number" class="form-control input-text-shadow" style="text-align:center" v-model.number="borderRadius" min="0">
      </div>
      <div style="clear:both"></div>
    </div>

    <div class="sidebar-block" style="text-align:center;">
      <checkbox-button v-model="button.props.fontWeight" :values="['normal','bold']">加粗</checkbox-button> &nbsp; 
      <checkbox-button v-model="button.props.boxShadow" :values="['','1px 3px 6px #888']">阴影</checkbox-button> &nbsp; 
      <checkbox-button v-model="button.props.borderStyle" :values="['none','solid']">边框</checkbox-button>
    </div>
    <h4>边框</h4>
    <div class="sidebar-block border-setting row">
      <div class="form-group col-xs-6">
        <div class="input-group">
          <div class="input-group-addon">宽度</div>
          <div class="input-group-btn" style="width: 20px;">
            <input type="number" v-model="button.props.borderWidth" min="0" step="1" class="form-control"/>
          </div>
        </div>
      </div>
      <div class="form-group col-xs-6" style="padding: 0;">
        <div class="input-group">
          <div class="input-group-addon">类型</div>
          <div class="input-group-btn">
            <select v-model="button.props.borderStyle" class="form-control" style="width: 80px;">
              <option value="none">无</option>
              <option value="solid">实线</option>
              <option value="dashed">虚线</option>
              <option value="dotted">点</option>
              <option value="double">双线</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <h4>阴影</h4>
    <div class="sidebar-block">
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <label style="float: left;">X：</label>
            <input type="number" v-model="button.props.boxShadowX" min="0" step="1" class="form-control"/>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <label>Y：</label>
            <input type="number" v-model="button.props.boxShadowY" min="0" step="1" class="form-control"/>
          </div>
        </div>
      </div>
    </div>

      <div class="form-group">
        <label>大小</label>
        <input type="number" v-model="button.props.boxShadowSize" min="0" step="1" class="form-control" style="display: inline; width: 80px;"/>
        <checkbox-button v-model="button.props.boxShadowInset" :values="['false','true']">内阴影</checkbox-button>
        <color-picker v-model="button.props.boxShadowColor"></color-picker>
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