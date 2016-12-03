<script>
import Sidebar from '../ui/Sidebar'
import SidebarPart from '../ui/SidebarPart'
import ColorPicker from './ColorPicker'
import colorMixin from '../../mixins/colorMixin'
import ImagePicker from '../ui/ImagePicker'
import BorderEditor from './BorderEditor'
import ShadowEditor from './ShadowEditor'
import BackgroundEditor from './BackgroundEditor'
import { Slider } from 'element-ui'

import { mapActions } from 'vuex'

export default {
  props: ['show', 'value'],
  components: {
    Slider,
    Sidebar,
    SidebarPart,
    BorderEditor,
    BackgroundEditor,
    ShadowEditor,
    ColorPicker,
    ImagePicker
  },
  mixins: [colorMixin],
  data () {
    return {

    }
  },
  computed: {
    shape: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    borderRadius: {
      get () {
        return parseInt(this.shape.style.borderRadius)
      },
      set (val) {
        this.shape.style.borderRadius = val + 'px'
      }
    }
  },
  methods: {
    ...mapActions([
      'getImage'
    ])
  }
}
</script>

<template>
  <sidebar v-if="show" :show="show" @close="$emit('edit-done')">
    <div slot="header">
      <div class="btn btn-success" @click="$emit('edit-done')">完成</div>
    </div>
    <div slot="body">
      <background-editor v-if="shape.subType === 'square' || shape.subType === 'circle'" v-model="shape.style.background"></background-editor>
      
      <border-editor v-model="shape.style.border"></border-editor>

      <shadow-editor v-model="shape.style.shadow"></shadow-editor>

      <div v-if="shape.subType === 'square' || shape.subType === 'circle'" class="sidebar-block">
        <div class="input-group">
          <div class="input-group-addon"> 透明 </div>
          <slider class="form-control" v-model="shape.style.opacity"></slider>
        </div>
      </div>

      <div v-if="shape.subType === 'square'" class="sidebar-block">
        <div class="input-group">
          <div class="input-group-addon"> 圆角 </div>
          <slider class="form-control" v-model="borderRadius"></slider>
        </div>
      </div>

    </div>
  </sidebar>
</template>

<style>
.el-slider__runway {
  margin: 9px 0 !important;
}
</style>