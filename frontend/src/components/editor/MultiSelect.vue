
<script>
import { Tooltip } from 'element-ui'

import mouseDrag from '../../mixins/mouseDrag'
import elementMoveMixin from '../../mixins/elementMoveMixin'
import { mapActions } from 'vuex'
import * as editorHelper from '../../utils/editor'

export default {
  name: 'multi-select',
  mixins: [mouseDrag, elementMoveMixin],
  props: ['wrapperStyle', 'innerStyle', 'visible'],
  components: {
    Tooltip
  },
  data () {
    return {
      toolbarPosition: 'top left'
    }
  },
  methods: {
    ...mapActions([
      'updateMultiMove',
      'clearMultiSelect',
      'moveElements',
      'removeElements',
      'alignMoveElements',
      'indexOfElements'
    ]),
    showToolbar () {
      this.$emit('change-button-group', 'main')

      const viewTop = getElementTop(this.$el) - document.documentElement.scrollTop
      const toolbarPositionY = (viewTop < 95) ? 'bottom' : 'top'

      const viewRight = this.workspace.width - parseInt(this.element.style[this.workspace.version].left)
      const toolbarPositionX = (viewRight < 0) ? 'right' : 'left'

      this.toolbarPosition = toolbarPositionY + ' ' + toolbarPositionX
    },
    dragBegin () {
      // del
      this.bounds = this.getAlignmentInfo()
      if (!this.keyEventAttached) {
        document.addEventListener('keydown', this.onKey, false)
        this.keyEventAttached = true
      }
      const style = window.getComputedStyle(this.$refs.box, null)
      const getSize = (key) => parseInt(style[key])
      this.startPosLeft = getSize('left')
      this.startPosTop = getSize('top')
      const self = this.$refs.box.getBoundingClientRect()
      const box = document.getElementById('content-area').getBoundingClientRect()
      this.horizontalMax = [box.left - self.left, box.right - self.right]
      this.verticalMax = [box.top - self.top, box.bottom - self.bottom]
      this.startTop = -50 - this.$el.offsetTop
      this.updateMultiMove({
        started: true
      })
    },
    dragMove (move, offset) {
      if (move && move.x === 0 && move.y === 0) return
      const _move = this.actualMove(move)
      this.$refs.box.style.left = `${this.startPosLeft + _move.x}px`
      this.$refs.box.style.top = `${this.startPosTop + _move.y}px`
      this.updateMultiMove({
        move: _move
      })
    },
    dragEnd (move, offset) {
      if (move.x === 0 && move.y === 0) return
      this.$emit('change-button-group', 'main')
      this.bounds = null
      this.offsetCache = {
        x: 0,
        y: 0
      }
      const _move = this.actualMove(move)
      this.updateMultiMove({
        move: _move,
        forward: offset
      })
      const elements = editorHelper.getMulti()
      this.moveElements({
        elements,
        move: _move
      })
    },
    copy () {
    },
    moveTop () {
      this.indexOfElements([editorHelper.getMulti(), 'top'])
    },
    moveBottom () {
      this.indexOfElements([editorHelper.getMulti(), 'bottom'])
    },
    alignLeft () {
      const moves = editorHelper.selectionAlignLeft()
      this.alignMove(moves)
    },
    alignCenter () {
      const moves = editorHelper.selectionAlignCenter()
      this.alignMove(moves)
    },
    alignRight () {
      const moves = editorHelper.selectionAlignRight()
      this.alignMove(moves)
    },
    alignMove (moves) {
      if (moves === null) return
      this.alignMoveElements({
        data: moves
      })
    },
    remove () {
      this.removeElements(editorHelper.getMulti())
    }
  }
}

// 获取元素到页面顶部的距离
const getElementTop = (element) => {
  let actualTop = element.offsetTop
  let current = element.offsetParent

  while (current !== null) {
    actualTop += current.offsetTop
    current = current.offsetParent
  }

  return actualTop
}
</script>

<template>
<div
  :style="wrapperStyle"
  id="multi-selection-wrapper"
  @mousedown.prevent>
  <div id="multiple-selection"
    ref="box"
    v-show="visible"
    class="select-disable"
    @mousedown.prevent.stop="onDragBegin"
    :style="innerStyle">
    <div style="position: relative;">
      <div v-show="visible" class="el-toolbar" :class="toolbarPosition" @mousedown.stop>
        <div class="btn-group el-btn-group" role="group">
          <slot name="main-buttons-extend"></slot>
          <!--
          <tooltip class="btn btn-default" @click.native.stop="copy()" content="复制一份">
              <span class="glyphicon glyphicon-duplicate"></span>
          </tooltip>
          -->
          <tooltip class="btn btn-default" content="移到顶层" @click.native="moveTop()">
            <span class="glyphicon glyphicon-circle-arrow-up"></span>
          </tooltip>
          <tooltip class="btn btn-default" content="移到底层" @click.native="moveBottom()">
            <span class="glyphicon glyphicon-circle-arrow-down"></span>
          </tooltip>
          <tooltip class="btn btn-default" content="左对齐" @click.native="alignLeft()">
            <span class="glyphicon glyphicon-align-left"></span>
          </tooltip>
          <tooltip class="btn btn-default" content="居中对齐" @click.native="alignCenter()">
            <span class="glyphicon glyphicon-align-center"></span>
          </tooltip>
          <tooltip class="btn btn-default" content="右对齐" @click.native="alignRight()">
            <span class="glyphicon glyphicon-align-right"></span>
          </tooltip>
          <tooltip class="btn btn-default" content="删除" @click.native="remove()">
            <span class="glyphicon glyphicon-trash"></span>
          </tooltip>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style>
#multi-selection-wrapper {
  position: absolute;
  left: 50%;
  top: 0;
}
#multiple-selection {
  position: absolute;
  outline: 1px solid red;
  background-color: rgba(216, 216, 216, 0.1);
  z-index: 99;
  cursor: pointer;
}
</style>
