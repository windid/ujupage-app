<script>
import Sidebar from '../ui/Sidebar'
import { mapGetters, mapActions } from 'vuex'
import colorMixin from '../../mixins/colorMixin'
import ColorPicker from './ColorPicker'
import { merge } from 'lodash'

export default {
  components: {
    Sidebar,
    ColorPicker
  },
  mixins: [colorMixin],
  data () {
    return {
      style: {},
      defaultStyle: {
        'pc': {
          'background-color': '',
          'border-color': '',
          'border-width': 0
        },
        'mobile': {
          'background-color': '',
          'border-color': '',
          'border-width': 0
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      workspace: 'editorWorkspace',
      sections: 'editorSections'
    }),
    show () {
      return this.workspace.activeSectionId !== null
    },
    borderWidth: {
      get () {
        return parseInt(this.style[this.workspace.version]['border-width'])
      },
      set (val) {
        this.style[this.workspace.version]['border-width'] = val + 'px 0px'
      }
    }
  },
  methods: mapActions([
    'setActiveSectionId',
    'modifySection'
  ]),
  watch: {
    'workspace.activeSectionId': function (sectionId) {
      if (sectionId !== null) {
        this.style = merge({}, this.defaultStyle, this.sections[sectionId]['style'])
      } else {
        this.style = {}
      }
    },
    'style': {
      handler: function (newStyle, oldStyle) {
        if (oldStyle.pc && newStyle.pc) {
          this.modifySection([this.workspace.activeSectionId, newStyle])
        }
      },
      deep: true
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
      <div class="sidebar-block">
        <color-picker v-model="style[workspace.version]['background-color']"></color-picker> &nbsp; 背景颜色
      </div>
      <div class="sidebar-block">
        <div><color-picker v-model="style[workspace.version]['border-color']"></color-picker> &nbsp; 边框颜色</div>
        <div class="sidebar-block-inside"><input type="text" class="border-width-input" v-model.lazy.number="borderWidth"> &nbsp; 边框尺寸</div>
      </div>
    </div>
  </sidebar>
</template>

<style>

.border-width-input{
  height: 30px;
  border:2px solid #ddd;
  text-align: center;
  border-radius: 4px;
  width:60px;
}
</style>
