<script>
import SidebarPart from '../ui/SidebarPart'
import BorderStyle from './BorderStyle'
import ColorPicker from './ColorPicker'
import colorMixin from '../../mixins/colorMixin'

export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  components: {
    SidebarPart,
    ColorPicker,
    BorderStyle
  },
  mixins: [colorMixin],
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
  }
}
</script>

<template>
  <sidebar-part title="边框" :expand="true">
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
</style>