<script>
import ColorPicker from './ColorPicker'
import FontSize from './FontSize'
import CheckboxButton from './CheckboxButton'
import colorMixin from '../../mixins/colorMixin'
import ImagePicker from './ImagePicker'
import ShadowEditor from './ShadowEditor'
import BorderEditor from './BorderEditor'
import { Slider } from 'element-ui'

import { mapActions } from 'vuex'

export default {
  props: ['show', 'value'],
  components: {
    ColorPicker,
    FontSize,
    CheckboxButton,
    ImagePicker,
    ShadowEditor,
    BorderEditor,
    Slider
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
      'getImage'
    ])
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
      <div class="input-group">
        <div class="input-group-addon"> 文字 </div>
        <input type="text" class="form-control input-text-shadow" v-model="button.text">
        <div class="input-group-btn">
          <font-size style="z-index:3" v-model="button.props.fontSize" position="right"></font-size>
        </div>
      </div>
    </div>

    <div class="sidebar-block">

      <checkbox-button v-model="button.props.fontWeight" :values="['normal','bold']">加粗</checkbox-button>

      <div class="btn-toolbar" style="float: right;">

        <div class="btn-group">
          <div class="btn btn-default">背景</div>
          <color-picker v-model="button.props.backgroundColor" position="right">
            <div class="btn btn-default color-btn" data-toggle="dropdown" :style="{background:getColor(button.props.backgroundColor)}"></div>
          </color-picker>
        </div>

        <div class="btn-group">
          <div class="btn btn-default">文字</div>
          <color-picker v-model="button.props.color" position="right">
            <div class="btn btn-default color-btn" data-toggle="dropdown" :style="{background:getColor(button.props.color)}"></div>
          </color-picker>
        </div>

      </div>

    </div>
    
    <border-editor v-model="button.style.border"></border-editor>

    <shadow-editor v-model="button.style.shadow"></shadow-editor>

    <div class="sidebar-block">
      <div class="input-group">
        <div class="input-group-addon"> 圆角 </div>
        <slider :max="30" class="form-control" v-model="borderRadius"></slider>
      </div>
    </div>

    <div class="sidebar-block">
      <image-picker v-model="button.image"></image-picker>
    </div>
  </div>
</template>

<style scoped>
  .sidebar-block .btn {
    height: 34px;
  }
  .color-btn {
    height: 33px;
    width: 45px;
  }
</style>