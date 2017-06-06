<script>
import Sidebar from '../ui/Sidebar'
import BackgroundEditor from './BackgroundEditor'
import BorderEditor from './BorderEditor'
import colorMixin from '../../mixins/colorMixin'
import ColorPicker from './ColorPicker'
import { Slider, Tooltip } from 'element-ui'

import defaultSection from '../../config/editorSection'

import { mapGetters, mapActions } from 'vuex'
import { merge, isEqual } from 'lodash'

export default {
  components: {
    Sidebar,
    BackgroundEditor,
    BorderEditor,
    ColorPicker,
    Slider,
    Tooltip
  },
  mixins: [colorMixin],
  data () {
    return {
      style: {},
      maskOpacity: 0,
      sync: true
    }
  },
  computed: {
    ...mapGetters({
      workspace: 'editorWorkspace',
      sections: 'editorSections',
      page: 'editingPage'
    }),
    show () {
      return this.workspace.activeSectionId !== null
    }
  },
  methods: {
    ...mapActions([
      'setActiveSectionId',
      'modifySection'
    ]),
    changeMaskOpacity (val) {
      this.style.mask.opacity = val
    }
  },
  watch: {
    'workspace.activeSectionId': function (sectionId) {
      if (sectionId !== null) {
        this.style = merge({}, defaultSection.style.mobile, this.sections[sectionId]['style'][this.workspace.version])
        this.maskOpacity = this.style.mask.opacity
      } else {
        this.style = {}
      }
    },
    'style': {
      handler: function (newStyle, oldStyle) {
        if (oldStyle.height && newStyle.height) {
          const style = {}
          if (this.sync) {
            style.pc = { ...newStyle }
            style.mobile = { ...newStyle }
            delete style.pc.height
            delete style.mobile.height
          } else {
            style[this.workspace.version] = { ...newStyle }
          }
          this.modifySection([this.workspace.activeSectionId, style])
        }
      },
      deep: true
    },
    'styleFromStore': function (newStyle, oldStyle) {
      if (!isEqual(newStyle, this.style)) {
        if (newStyle !== null) {
          this.style = merge({}, this.style, newStyle)
        }
      }
    }
  }
}
</script>

<template>
  <sidebar v-if="show" :show="show" @close="setActiveSectionId(null)" style="z-index: 1020;">
    <div slot="header">
      <div class="btn btn-success" @click="setActiveSectionId(null)">完成</div>
      <tooltip v-if="page.is_compat" placement="left" content="同时修改桌面版和移动版" class="fr">
        <h5><label><input type="checkbox" v-model="sync"> 同步修改</label></h5>
      </tooltip>
    </div>
    <div slot="body">
      <border-editor v-model="style.border"></border-editor>
      <background-editor v-model="style.background"></background-editor>
      <div class="sidebar-block">
        <div>
          <label v-if="page.is_compat"><input type="checkbox" v-model="style.background.stretch"/> 背景拉伸到边缘</label> &nbsp; &nbsp; 
          <label v-if="style.background.image"><input type="checkbox" v-model="style.background.fixed"/> 背景固定不滚动</label>
        </div>
      </div>
      <div v-if="style.background.image" class="sidebar-block">
        <div class="input-group">
          <div class="input-group-addon">蒙版</div>
          <slider class="form-control" v-model="maskOpacity" @change="changeMaskOpacity"></slider>
          <span class="input-group-btn">
            <color-picker v-model="style.mask.color" position="right">
              <div class="btn btn-defualt" data-toggle="dropdown" :style="{backgroundColor: getColor(style.mask.color)}"> &nbsp; </div>
            </color-picker>
          </span>
        </div>
      </div>
    </div>
  </sidebar>
</template>

<style scpoed>
label {
  font-weight: normal;
}
</style>
