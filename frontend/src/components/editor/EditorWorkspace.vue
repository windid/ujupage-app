<script>
import PageSection from './PageSection'
import FixedContainer from './FixedContainer'
import SectionEditor from './SectionEditor'
import ImageLibrary from './ImageLibrary'
import { mapGetters, mapActions } from 'vuex'
import mouseDrag from '../../mixins/mouseDrag'
import ElementCommon from './ElementCommon'

export default {
  mixins: [mouseDrag],
  components: {
    PageSection,
    FixedContainer,
    SectionEditor,
    ImageLibrary,
    ElementCommon
  },
  computed: {
    ...mapGetters({
      workspace: 'editorWorkspace',
      height: 'editorHeight',
      sections: 'editorSections',
      alignLines: 'getAlignLines',
      selectionArea: 'getSelectionArea'
    })
  },
  data () {
    return {
      selectionVisible: false,
      selection: {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      }
    }
  },
  methods: {
    ...mapActions({
      updateSelect: 'updateMultiSelect',
      doneSelect: 'doneMultiSelect',
      clearSelect: 'clearMultiSelect'
    }),
    getStartPoint () {
      const contentArea = this.$refs.contentArea.getBoundingClientRect()
      return ({
        left: contentArea.left,
        top: contentArea.top
      })
    },
    dragBegin () {
      this.$el.style.cursor = 'default'
      this.selectionVisible = true
      const top = document.getElementById('main-wrapper').scrollTop
      const origin = this.getStartPoint()
      this.selection.left = this.dragStartX
      this.selection.top = top + this.dragStartY - origin.top
      this.clearSelect()
    },
    dragMove (move, forward) {
      const top = document.getElementById('main-wrapper').scrollTop
      const origin = this.getStartPoint()
      this.selection = {
        left: this.dragStartX + (move.x < 0 ? move.x : 0),
        top: this.dragStartY + (move.y < 0 ? move.y : 0) + top - origin.top,
        width: Math.abs(move.x),
        height: Math.abs(move.y)
      }
      origin.top -= top + this.dragStartY
      if (forward.x !== 0 || forward.y !== 0) {
        this.updateSelect({
          rect: this.selection,
          origin
        })
      }
    },
    dragRelease () {
      this.selectionVisible = false
    },
    dragEnd (move) {
      this.selection.width = 0
      this.selection.height = 0
      this.doneSelect()
    },
    lineStyle (line) {
      if (!line) return null
      return {
        left: (line.vertical ? line.vAxis - 1 : line.min) + 'px',
        top: (line.vertical ? line.min : line.vAxis - 1) + 'px',
        [line.vertical ? 'height' : 'width']: line.length + 'px'
      }
    },
    dotStyle (dot, line) {
      if (!dot) return null
      return {
        position: 'absolute',
        [line.dotSide.main]: (dot - line.min - 2) + 'px',
        [line.dotSide.sub]: '-2px',
        width: '4px',
        height: '4px',
        background: 'red'
      }
    }
  }
}
</script>

<template>
  <div class="workspace" @mousedown.prevent="onDragBegin">
    <div id="content-area" ref="contentArea" :style="{height: height + 'px', width: (workspace.width) + 'px', marginLeft:(-workspace.width/2) +'px'}">
      <div id="alignment-lines">
        <div class="lines-group" v-for="i in ['vertical', 'horizontal']">
          <div class="align-line" v-for="j in [1, 2, 3]"
          v-show='alignLines[i].length >= j'
          :class="'align-line-' + i"
          :style="lineStyle(alignLines[i][j-1])">
            <div style='position: relative; width: 100%; height: 100%;' v-if='alignLines[i][j-1]'>
              <div class="dot" v-for="dot in alignLines[i][j-1].dots"
              :style="dotStyle(dot, alignLines[i][j-1])"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <fixed-container></fixed-container>
    <div class="section-wrapper">
      <page-section 
        v-for="(section, sectionId) in sections" 
        :section-id="sectionId"
        :section="section"
      >
      </page-section>
    </div>
    <section-editor></section-editor>
    <image-library></image-library>
    <div ref="selection" v-show="selectionVisible" id="multi-selection"
    :style="{
      left: selection.left + 'px',
      top: selection.top + 'px',
      width: selection.width + 'px',
      height: selection.height + 'px'
    }"></div>
    <div :style="{height: height + 'px', width: (workspace.width) + 'px', marginLeft:(-workspace.width/2) +'px', position: 'absolute', left: '50%', top: 0}"
    @mousedown.prevent>
      <div style="position: absolute; outline: 1px solid red; background-color: rgba(216, 216, 216, 0.1); z-index: 99999; cursor: pointer;"
      v-if="selectionArea.visible"
      class="select-disable"
      @mousedown.prevent.stop
      :style="{
        left: selectionArea.left + 'px',
        top: selectionArea.top + 'px',
        width: (selectionArea.right - selectionArea.left) + 'px',
        height: (selectionArea.bottom - selectionArea.top) + 'px'
      }"></div>
    </div>
  </div>
</template>

<style scoped>
.workspace {
  position: relative;
  /* 禁止文本选择 */
  user-select: none;
  /*margin-bottom: 30px;*/
  background: #fff;
}

#content-area{
  position: absolute;
  left: 50%;
}

.section-wrapper {
  position: relative;
  z-index: 1;
}

#alignment-lines {
  position: relative;
  width: 100%;
  height: 100%;
}

#multi-selection {
  position: absolute;
  z-index: 9999;
  border: 1px dashed red;
}
</style>

<style> 
/* 对齐线 */
.align-line {
  position: absolute;
  z-index: 9999999;
}
.align-line-horizontal {
  height: 1px;
  border-top: 1px solid red;
}
.align-line-vertical {
  width: 1px;
  border-left: 1px solid red;
}
</style>