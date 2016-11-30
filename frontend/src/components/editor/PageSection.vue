<script>
import { mapGetters, mapActions } from 'vuex'
import colorMixin from '../../mixins/colorMixin.js'
import ElementForm from './ElementForm'
import ElementText from './ElementText'
import ElementButton from './ElementButton'
import ElementHtml from './ElementHtml'
import ElementImage from './ElementImage'
import ElementShape from './ElementShape'
import ElementVideo from './ElementVideo'
import ElementTimer from './ElementTimer'
import resizer from '../ui/OnesideResizer'

function scrollDown (offset) {
  const el = document.getElementById('main-wrapper')
  // scrollHeight
  if (offset !== null) {
    el.scrollTop = el.scrollTop + offset
  }
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
    ElementShape,
    ElementVideo,
    ElementTimer,
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
    mainStyle () {
      const v = this.workspace.version
      const style = {
        height: this.section.style[v]['height'],
        backgroundAttachment: 'scroll',
        backgroundColor: this.getColor(this.section.style[v]['background-color']),
        borderColor: this.getColor(this.section.style[v]['border-color']),
        borderWidth: this.section.style[v]['border-width'] || '0px',
        borderStyle: 'solid'
      }
      const bg = this.section.style.bg
      if (bg) {
        style.backgroundImage = `url("${bg.src}")`
        const r = parseInt(bg.repeat)
        style.backgroundRepeat = ['no-repeat', 'repeat', 'repeat-x', 'repeat-y', 'cover'][r]
        style.backgroundSize = (r === 4) ? 'cover' : 'auto'
        const position = []
        let p = parseInt(bg.position)
        if (isNaN(p)) p = 1
        p--
        position[0] = ['left', 'center', 'right'][p % 3]
        position[1] = ['top', 'center', 'bottom'][Math.floor(p / 3)]
        style.backgroundPosition = position.join(' ')

        if (bg.attachment) {
          style.backgroundAttachment = 'fixed'
        }
        if (bg.stretch) {
          // todo::
          style.width = '100%'
          style.marign = ''
        } else {
          style.width = this.workspace.width + 'px'
          style.margin = '0 auto'
        }
      }
      return style
    },
    maskStyle () {
      if (!this.section.style.hasOwnProperty('mask')) {
        this.section.style.mask = {}
      }
      const m = this.section.style.mask
      const style = {
        backgroundColor: this.getColor(m.color),
        opacity: m.opacity / 100
      }
      return style
    },
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
    resizeStart (size) {
      this.$refs.ruler.classList.add('active')
    },
    resizeHeight (direction, saveToStore, size, moved) {
      const style = {}
      style[this.workspace.version] = { height: size + 'px' }
      if (saveToStore) {
        this.modifySection([this.sectionId, style])
        this.$refs.ruler.classList.remove('active')
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
    :style="mainStyle"
    @mouseenter="mouseHere = true"
    @mouseleave="mouseHere = false"
  >
    <!-- 蒙板 -->
    <div class="section-mask" :style="maskStyle" v-if="section.style.bg && section.style.bg.src"></div>

    <div class="editable-area" :style="{width: workspace.width + 2 + 'px'}">
      <!-- 页面元素组件 -->
      <transition-group name="fade" tag="div">
        <component v-for="elementId in section.elements[workspace.version]" v-if="!elements[elementId].fixed" :is="'element-' + elements[elementId].type" :element="elements[elementId]" :section-id="sectionId" :element-id="elementId" :key="elementId"></component>
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
    <div class="section-line" ref="ruler"></div>
    <resizer :size="height" @resize-start="resizeStart" @resize-end="resizeHeight" @resizing="resizeHeight" :side="'bottom'" :min-size="60"></resizer>
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

.section-line.active {
    border-bottom: 1px dashed #ff6a6a;
}

.section-mask {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  user-select: unset;
}
</style>

