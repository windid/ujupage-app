<template>
  <div class="color-picker" @click.stop>
    <div class="saturation-wrap">
      <saturation :hsv="color.hsv" @on-change="changeSaturation"></saturation>
    </div>
    <div class="body">
      <div class="controls-wrap">
        <div class="current-color"><div class="active-color" :style="{ background: currentColor}"></div></div>
        <div class="controls">
          <hue class="slider-hue" v-model="color.hsl.h" @on-change="changeHue"></hue>
          <alpha :color="color" @on-change="changeAlpha"></alpha>
        </div>
      </div>
      <div class="fields-wrap">
        <div class="fields" v-show="showedField === 0">
          <color-input label="r" v-model="color.rgb.r" @on-change="inputChange"></color-input>
          <color-input label="g" v-model="color.rgb.g" @on-change="inputChange"></color-input>
          <color-input label="b" v-model="color.rgb.b" @on-change="inputChange"></color-input>
          <color-input label="a" v-model="color.a" :filter="alphaFilter" @on-change="inputChange"></color-input>
        </div>
        <div class="fields" v-show="showedField === 1">
          <color-input label="h" v-model="color.hsl.h" @on-change="inputChange"></color-input>
          <color-input label="s" v-model="color.hsl.s" :filter="percentFilter" @on-change="inputChange"></color-input>
          <color-input label="l" v-model="color.hsl.l" :filter="percentFilter" @on-change="inputChange"></color-input>
          <color-input label="a" v-model="color.a" :filter="alphaFilter" @on-change="inputChange"></color-input>
        </div>
        <div class="toggle" @click="switchFields">
        </div>
      </div>
    </div>
    <div class="footer">
      <a class="picker-button" @click="selected">确定</a>
    </div>
  </div>
</template>
<script>
import Saturation from './common/Saturation'
import Hue from './common/Hue'
import Alpha from './common/Alpha'
import ColorInput from './common/ColorInput'

import Color from '../../../utils/color'

export default {
  name: 'color-picker',
  components: {
    Saturation,
    Hue,
    Alpha,
    ColorInput
  },
  props: {
    c: String
  },
  data () {
    return {
      color: Color(this.c),
      showedField: 0
    }
  },
  computed: {
    currentColor () {
      const { r, g, b } = this.color.rgb
      return 'rgba(' + [r, g, b].join(',') + ',' + this.color.a + ')'
    },
    showedAlpha () {
      const alpha = this.color.a
      return alpha % 1 === 0 ? alpha : alpha.toFixed(2)
    }
  },
  methods: {
    alphaFilter (a) {
      return Math.floor(a * 100) / 100
    },
    percentFilter (val) {
      return val + '%'
    },
    changeSaturation (hsv) {
      this.color = Color({ hsv })
    },
    changeHue (h) {
      const c = this.color.hsl
      this.color = Color({
        hsl: {
          h: h,
          s: c.s,
          l: c.l
        }
      }, this.color)
    },
    changeAlpha (a) {
      this.color.a = a
    },
    switchFields () {
      this.showedField = (this.showedField + 1) % 2
    },
    inputChange (label, val) {
      if ('rgb'.indexOf(label) > -1) {
        const rgb = this.color.rgb
        rgb[label] = val
        this.color = Color({ rgb }, this.color)
      } else if ('hsl'.indexOf(label) > -1) {
        const hsl = this.color.hsl
        hsl[label] = val
        this.color = Color({ hsl }, this.color)
      } else if (label === 'a') {
        this.color.a = val
      }
    },
    selected () {
      this.$emit('on-change', this.color)
    }
  }
}
</script>

<style lang="scss">

.el-popover {
  padding: 0;
  border: none;
  box-shadow: none;
}
.color-picker {
  width: 100%;
  background: #fff;
  border-radius: 2px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .5);
  .slider-hue {
    margin-bottom: 8px;
  }
  .body {
    padding: 15px 15px 5px 15px;
  }
  .controls-wrap {
    display: flex;
    align-items: center;
  }
  .current-color {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    border-radius: 50%;
    background: url(../../../assets/img/alpha_bg.png);
  }
  .active-color {
    height: 100%;
    border-radius: inherit;
  }
  .controls {
    flex: 1;
  }
  .fields-wrap {
    display: flex;
    align-items: center;
    margin-top: 12px;
  }
  .fields {
    display: flex;
    flex: 1;
    color: #333;
  }
  .toggle {
    margin-left: 5px;
    padding: 2px 8px;
    border-radius: 2px;
    &:hover {
      background: #eee;
    }
    &::before, &::after {
      display: block;
      content: '';
      width: 0;
      border-width: 4px 3px;
      border-style: solid;
    }
    &::before {
      border-color: transparent transparent #000 transparent;
      margin-bottom: 4px;
    }
    &::after {
      border-color: #000 transparent transparent transparent;
    }
  }
  .footer {
    border-top: 1px solid #eee;
    padding: 5px 0;
    font-size: 13px;
    text-align: center;
  }
  a {
    cursor: pointer;
  }
}
</style>