<script>
import { mapGetters, mapActions } from 'vuex'
import colorMixin from '../../mixins/colorMixin.js'
import ElementForm from './ElementForm'
import ElementText from './ElementText'
import ElementButton from './ElementButton'
import ElementHtml from './ElementHtml'
import ElementImage from './ElementImage'
import resizer from '../ui/OnesideResizer'

function scrollDown (offset) {
  const el = document.getElementById('main-wrapper')
  // scrollHeight
  el.scrollTop = el.scrollTop + offset
}

export default {
  props: ['sectionId', 'section'],
  mixins: [colorMixin],
  components: {
    ElementForm,
    ElementText,
    ElementButton,
    ElementHtml,
    ElementImage,
    resizer
  },
  data () {
    return {
      mouseHere: false
    }
  },
  computed: {
    ...mapGetters({
      workspace: 'editorWorkspace',
      elements: 'editorElements'
    }),
    editing () {
      return this.workspace.activeSectionId === this.sectionId
    },
    showButton () {
      return this.mouseHere && this.workspace.activeSectionId === null || this.workspace.activeSectionId === this.sectionId
    },
    height: function () {
      const height = this.section.style[this.workspace.version]['height']
      return parseInt(height.replace(/px$/, ''))
    }
  },
  methods: {
    ...mapActions({
      moveSection: 'moveSection',
      removeSection: 'removeSection',
      setActiveSectionId: 'setActiveSectionId',
      modifySection: 'modifySection'
    }),
    resizeHeight (direction, saveToStore, size, moved) {
      const style = {}
      style[this.workspace.version] = { height: size + 'px' }
      if (saveToStore) {
        this.modifySection([this.sectionId, style])
      } else {
        this.$el.style.height = size + 'px'
        scrollDown(moved)
      }
    }
  },
  mounted () {
  }
}
</script>

<template>
  <div  
    class="section"
    :style="{
      height: section.style[workspace.version]['height'],
      backgroundColor: getColor(section.style[workspace.version]['background-color']),
      borderColor: getColor(section.style[workspace.version]['border-color']),
      borderWidth: section.style[workspace.version]['border-width'] || '0px',
      borderStyle: 'solid'
    }"
    @mouseenter="mouseHere = true"
    @mouseleave="mouseHere = false"
  >
    <div class="editable-area" :style="{width: workspace.width + 2 + 'px'}">
      <!-- 页面元素组件 -->
      <transition-group name="fade" tag="div">
        <component v-for="elementId in section.elements[workspace.version]" :is="'element-' + elements[elementId].type" :element="elements[elementId]" :section-id="sectionId" :element-id="elementId" :key="elementId"></component>
      </transition-group>
      <!-- 板块操作按钮组 -->
      <transition name="fade">
        <div class="btn-group-vertical page-section-operation" v-show="showButton" :style="{left: workspace.width + 5 + 'px'}">
          <template v-if="editing">
            <div class="btn btn-success" title="完成" @click="setActiveSectionId(null)"><span class="glyphicon glyphicon-ok"></span></div>
          </template>
          <template v-if="!editing">
            <div class="btn btn-primary" title="修改" @click.stop="setActiveSectionId(sectionId)"><span class="glyphicon glyphicon-pencil"></span></div>
            <div class="btn btn-default" title="上移" @click="moveSection(['up', sectionId])"><span class="glyphicon glyphicon-chevron-up"></span></div>
            <div class="btn btn-default" title="下移" @click="moveSection(['down', sectionId])"><span class="glyphicon glyphicon-chevron-down"></span></div>
            <div class="btn btn-default" title="删除" @click="removeSection(sectionId)"><span class="glyphicon glyphicon-trash"></span></div>
          </template>
        </div>
      </transition>
    </div>
    <div class="section-line" rel="ruler"></div>
    <resizer :size="height" @resize-end="resizeHeight" @resizing="resizeHeight" :side="'bottom'" :min-size="60"></resizer>
  </div>
</template>

<style>
.editable-area {
  position: relative;
  margin: 0 auto;
  border-left: 1px dashed #03ddff;
  border-right: 1px dashed #03ddff;
  height: 100%;
  transition: all .4s ease;
}

.section {
  position: relative;
  transition: background .4s ease;
}

.page-section-operation {
  position: absolute;
  top: 5px;
  z-index: 10;
  box-shadow: 0 0 8px #ddd;
}

.section-line{
  position: absolute;
  width: 100%;
  z-index: 1;
  border-bottom: 1px dashed #03ddff;
  height: 1px;
  bottom: -1px;
}
</style>

