<script>
  import SidebarPart from '../ui/SidebarPart'
  import ColorPicker from './ColorPicker'
  import colorMixin from '../../mixins/colorMixin'
  import { Slider } from 'element-ui'
  import Dropdown from '../ui/Dropdown'

  export default {
    components: {
      SidebarPart,
      ColorPicker,
      Slider,
      Dropdown
    },
    props: {
      value: {
        required: true
      },
      expand: {
        type: Boolean,
        default: false
      }
    },
    mixins: [colorMixin],
    data () {
      return {
        showQuickSelector: false,
        presetShadows: [
          { x: 0, y: 0, z: 8 },
          { x: -2, y: 2, z: 8 },
          { x: 2, y: 2, z: 8 },
          { x: 0, y: 0, z: 12 },
          { x: -4, y: 4, z: 12 },
          { x: 4, y: 4, z: 12 }
        ]
      }
    },
    computed: {
      shadow: {
        get () {
          return this.value
        },
        set (val) {
          this.$emit('input', val)
        }
      }
    },
    methods: {
      pickPreset (preset) {
        this.shadow.x = preset.x
        this.shadow.y = preset.y
        this.shadow.z = preset.z
      }
    }
  }
</script>

<template>
  <sidebar-part title="投影" :expand="expand">
    <dropdown slot="quick-selector" class="shadow-quick-selector" :show="showQuickSelector" @toggle="showQuickSelector=!showQuickSelector">
      <div class="shadow-wrapper" data-toggle="dropdown">
        <div class="shadow-sample" :style="{boxShadow: shadow.x + 'px ' + shadow.y + 'px ' + shadow.z + 'px ' + getColor(shadow.color)}"></div>
      </div>
      <div slot="dropdown-menu" class="dropdown-menu dropdown-menu-right">
        <div v-for="presetShadow in presetShadows" class="preset-shadow" @click="pickPreset(presetShadow)" 
          :style="{
            boxShadow: presetShadow.x + 'px ' + presetShadow.y + 'px ' + presetShadow.z + 'px ' + getColor(shadow.color)
          }">
        </div>
        <div class="no-shadow" @click="pickPreset({ x: 0, y: 0, z: 0 })">无投影</div>
      </div>
    </dropdown>
    <div slot="content">
      <color-picker v-model="shadow.color"></color-picker>
      <div class="input-group position-slider">
        <div class="input-group-addon"> 横向偏移 </div>
        <slider :min="-50" :max="50" class="form-control" v-model="shadow.x"></slider>
      </div>
      <div class="input-group position-slider">
        <div class="input-group-addon"> 纵向偏移 </div>
        <slider :min="-50" :max="50" class="form-control" v-model="shadow.y"></slider>
      </div>
      <div class="input-group position-slider">
        <div class="input-group-addon"> 垂直偏移 </div>
        <slider class="form-control" v-model="shadow.z"></slider>
      </div>
    </div>
  </sidebar-part>
</template>

<style scoped>
  .position-slider {
    margin-top: 10px;
  }
  .shadow-quick-selector, .shadow-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
  }
  .shadow-wrapper {
    overflow: hidden;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
  }
  .shadow-sample {
    position: absolute;
    top: 0;
    left: 0;
    height: 14px;
    width: 68px;
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-bottom-right-radius: 4px;
    border-top-left-radius: 4px;
    background: #D1DBBD;
  }
  .preset-shadow {
    float: left;
    background: #D1DBBD;
    border: 1px solid #ccc;
    width: 32px;
    height: 30px;
    margin: 10px;
    cursor: pointer;
  }
  .no-shadow {
    clear: both;
    margin: 10px;
    border: 1px solid #ccc;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
    line-height: 22px;
  }
  .preset-shadow:hover, .no-shadow:hover {
    background: #eee;
  }
</style>
