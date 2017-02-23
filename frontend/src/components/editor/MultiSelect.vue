
<script>
import mouseDrag from '../../mixins/mouseDrag'
import elementMoveMixin from '../../mixins/elementMoveMixin'
import { mapActions } from 'vuex'
import * as editorHelper from '../../utils/editor'

export default {
  name: 'multi-select',
  mixins: [mouseDrag, elementMoveMixin],
  props: ['wrapperStyle', 'innerStyle', 'visible'],
  data () {
    return {}
  },
  methods: {
    ...mapActions([
      'updateMultiMove',
      'clearMultiSelect',
      'moveElements'
    ]),
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
    },
    dragMove (move, offset) {
      if (move && move.x === 0 && move.y === 0) return
      const _move = this.actualMove(move)
      this.$refs.box.style.left = `${this.startPosLeft + _move.x}px`
      this.$refs.box.style.top = `${this.startPosTop + _move.y}px`
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
      editorHelper.elementsMove(elements, _move)
      this.moveElements({
        elements,
        move: _move
      })
    }
  }
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
    :style="innerStyle"></div>
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
  z-index: 99999; cursor: pointer;
}
</style>
