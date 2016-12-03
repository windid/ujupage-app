<script>
  import SidebarPart from '../ui/SidebarPart'
  import BorderStyle from './BorderStyle'
  import ColorPicker from './ColorPicker'
  import colorMixin from '../../mixins/colorMixin'
  import Dropdown from '../ui/Dropdown'

  export default {
    props: {
      value: {
        type: Object,
        required: true
      },
      expand: {
        type: Boolean,
        default: false
      }
    },
    components: {
      SidebarPart,
      ColorPicker,
      BorderStyle,
      Dropdown
    },
    mixins: [colorMixin],
    data () {
      return {
        showQuickSelector: false,
        presetBorders: [
          { width: '1px', style: 'solid' },
          { width: '2px', style: 'solid' },
          { width: '4px', style: 'solid' },
          { width: '2px', style: 'dotted' },
          { width: '2px', style: 'dashed' },
          { width: '3px', style: 'double' }
        ]
      }
    },
    computed: {
      border: {
        get () {
          return this.value
        },
        set (val) {
          this.$emit('input', val)
        }
      },
      borderWidth: {
        get () {
          return parseInt(this.border.width)
        },
        set (val) {
          this.border.width = val + 'px'
        }
      }
    },
    methods: {
      pickPreset (presetBorder) {
        this.border.width = presetBorder.width
        this.border.style = presetBorder.style
        this.showQuickSelector = false
      }
    }
  }
</script>

<template>
  <sidebar-part title="边框" :expand="expand">
    <dropdown slot="quick-selector" class="border-quick-selector" :show="showQuickSelector" @toggle="showQuickSelector=!showQuickSelector">
      <div class="border-wrapper" data-toggle="dropdown">
        <div class="border-btn" :style="{
            borderBottomWidth: parseInt(border.width) < 26 ? border.width : '26px',
            borderBottomStyle: border.style,
            borderBottomColor: getColor(border.color)
          }">
        </div>
      </div>
      <div slot="dropdown-menu" class="dropdown-menu dropdown-menu-right">
        <div v-for="presetBorder in presetBorders" class="preset-border" @click="pickPreset(presetBorder)" :style="{
            borderWidth: presetBorder.width,
            borderStyle: presetBorder.style,
            borderColor: '#333'
          }">
        </div>
        <div class="no-border" @click="pickPreset({ width: 0, style: 'solid' })">无边框</div>
      </div>
    </dropdown>
    <div slot="content">
      <border-style class="col" style="width: 38%" v-model="border.style"></border-style>
      <div class="input-group col" style="width: 40%">
        <input type="number" class="form-control" style="text-align:center" v-model.number="borderWidth">
        <div class="input-group-addon">像素</div>
      </div>
      <color-picker class="col" style="width:20%; margin-right: 0" v-model="border.color" position="right">
        <div class="btn btn-default color-btn" data-toggle="dropdown" :style="{background:getColor(border.color)}"></div>
      </color-picker>
    </div>
  </sidebar-part>
</template>

<style scoped>
  .color-btn {
    height: 34px;
    width: 100%;
  }
  .col {
    float: left;
    margin-right: 1%;
  }
  .border-quick-selector {
    display: table;
  }
  .border-quick-selector, .border-wrapper {
    width: 100%;
    height: 100%;
  }
  .border-wrapper {
    max-height: 28px;
    overflow: hidden;
    border: 1px solid #ddd;
    border-radius: 4px;
    display: table-cell;
    vertical-align: middle;
    cursor: pointer;
  }
  .preset-border {
    float: left;
    width: 32px;
    height: 30px;
    margin: 10px;
    cursor: pointer;
  }
  .no-border {
    clear: both;
    margin: 0 10px;
    border: 1px solid #ccc;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
    line-height: 22px;
  }
  .preset-border:hover, .no-border:hover {
    background: #eee;
  }
  .border-btn {
    position: relative;
    margin: auto 10px;
  }
</style>