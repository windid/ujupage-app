<script>
import Sidebar from '../ui/Sidebar'
import BackgroundEditor from './BackgroundEditor'
import BorderEditor from './BorderEditor'
import colorMixin from '../../mixins/colorMixin'
import ColorPicker from './ColorPicker'
import { slider } from 'element-ui'

import defaultSection from '../../config/editorSection'

import { mapGetters, mapActions } from 'vuex'
import { merge, isEqual } from 'lodash'

export default {
  components: {
    Sidebar,
    BackgroundEditor,
    BorderEditor,
    ColorPicker,
    slider
  },
  mixins: [colorMixin],
  data () {
    return {
      style: {}
    }
  },
  computed: {
    ...mapGetters({
      workspace: 'editorWorkspace',
      sections: 'editorSections'
    }),
    show () {
      return this.workspace.activeSectionId !== null
    }
  },
  methods: {
    ...mapActions([
      'setActiveSectionId',
      'modifySection'
    ])
  },
  watch: {
    'workspace.activeSectionId': function (sectionId) {
      if (sectionId !== null) {
        this.style = merge({}, defaultSection.style, this.sections[sectionId]['style'])
      } else {
        this.style = {}
      }
    },
    'style': {
      handler: function (newStyle, oldStyle) {
        if (oldStyle.pc && newStyle.pc) {
          this.modifySection([this.workspace.activeSectionId, newStyle])
        }
        if (newStyle.bg) {
          this.imageObj = newStyle.bg
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
    },
    'imageObj': function (newImage) {
      this.style.bg.src = newImage.src
      this.modifySection([this.workspace.activeSectionId, this.style])
    }
  }
}
</script>

<template>
  <sidebar v-if="show" :show="show" @close="setActiveSectionId(null)">
    <div slot="header">
      <div class="btn btn-success" @click="setActiveSectionId(null)">完成</div>
      <!-- <tooltip placement="left" content="同时修改桌面版和移动版">
        <h5 class="fr"><label><input type="checkbox"> 同步</label></h5>
      </tooltip> -->
    </div>
    <div slot="body">
      <border-editor v-model="style[workspace.version].border"></border-editor>
      <background-editor v-model="style[workspace.version].background"></background-editor>
      <div class="sidebar-block">
        <div>
          <label><input type="checkbox" v-model="style[workspace.version].background.stretch"/> 背景拉伸到边缘</label> &nbsp; &nbsp; 
          <label v-if="style[workspace.version].background.image"><input type="checkbox" v-model="style[workspace.version].background.fixed"/> 背景固定不滚动</label>
        </div>
      </div>
      <div  v-if="style[workspace.version].background.image" class="sidebar-block">
        <div class="input-group">
          <div class="input-group-addon">蒙版</div>
          <slider class="form-control" v-model="style[workspace.version].mask.opacity"></slider>
          <span class="input-group-btn">
            <color-picker v-model="style[workspace.version].mask.color" position="right">
              <div class="btn btn-defualt" data-toggle="dropdown" :style="{backgroundColor: getColor(style[workspace.version].mask.color)}"> &nbsp; </div>
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
