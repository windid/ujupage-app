<script>
import { mapGetters, mapActions } from 'vuex'

import mouseDrag from '../../mixins/mouseDrag'
import resizer from '../ui/OnesideResizer'

export default {
  name: 'element-common',
  mixins: [mouseDrag],
  components: {
    resizer
  },
  // 接受父组件传参，element元素属性, sectionId:板块ID, elementId:元素ID
  props: {
    element: {
      type: Object,
      required: true
    },
    sectionId: {
      required: true
    },
    elementId: {
      type: String,
      required: true
    },
    buttonGroup: {
      type: String,
      default: 'main'
    },
    draggable: {
      type: Boolean,
      default: true
    },
    resizable: {
      type: Boolean,
      default: false
    },
    resize: {
      type: Object
    }
  },
  data () {
    return {
      toolbarPosition: 'top left',
      elPositionInPage: { left: 0, top: 0 },
      clickOnThisElement: false,
      draggie: null,
      resizeConfig: {
        handles: 'e',
        aspectRatio: false
      },
      dragging: false,
      resizing: false,
      startTop: 0,
      startPosLeft: 0,
      startPosTop: 0,
      horizontalMost: [0, 0],
      verticalMost: [0, 0],
      widthMost: 0,
      heightMost: 0
    }
  },
  computed: mapGetters({
    workspace: 'editorWorkspace'
  }),
  methods: {
    ...mapActions([
      'setActiveElementId',
      'removeElement',
      'moveElement',
      'resizeElement',
      'indexElement',
      'duplicateElement'
    ]),
    showToolbar () {
      this.$emit('change-button-group', 'main')

      const viewTop = getElementTop(this.$el) - document.documentElement.scrollTop
      const toolbarPositionY = (viewTop < 95) ? 'bottom' : 'top'

      const viewRight = this.workspace.width - parseInt(this.element.style[this.workspace.version].left)
      const toolbarPositionX = (viewRight < 0) ? 'right' : 'left'

      this.toolbarPosition = toolbarPositionY + ' ' + toolbarPositionX
    },
    computeMoveMost (movement) {
      const getMin = (v, range) => {
        const i = v < 0 ? 0 : 1
        return [Math.max, Math.min][i](range[i], v)
      }
      return {
        x: getMin(movement.x, this.horizontalMost),
        y: getMin(movement.y, this.verticalMost)
      }
    },
    dragBegin () {
      var style = window.getComputedStyle(this.$el)
      const getSize = (key) => parseInt(style[key].replace(/px$/, ''))
      this.startPosLeft = getSize('left')
      this.startPosTop = getSize('top')
      this.setActiveElementId(this.elementId)
      this.$emit('drag-start')

      const self = this.$el.getBoundingClientRect()
      const box = document.getElementById('content-area').getBoundingClientRect()
      this.horizontalMost = [box.left - self.left, box.right - self.right]
      this.verticalMost = [box.top - self.top, box.bottom - self.bottom]
      this.startTop = getElementTop(this.$el) - 50 - this.$el.offsetTop
    },
    dragMove (movement) {
      if (movement.x === 0 && movement.y === 0) return
      if (this.buttonGroup !== 'position') {
        this.$emit('change-button-group', 'position')
      }
      const move = this.computeMoveMost(movement)
      this.$el.style.left = `${this.startPosLeft + move.x}px`
      this.$el.style.top = `${this.startPosTop + move.y}px`
      this.elPositionInPage.left = this.startPosLeft + move.x
      this.elPositionInPage.top = this.startTop + this.startPosTop + move.y
    },
    dragEnd (movement) {
      if (movement.x === 0 && movement.y === 0) return
      this.$emit('change-button-group', 'main')
      const move = this.computeMoveMost(movement)
      this.elPositionInPage.left = this.startPosLeft + move.x
      this.elPositionInPage.top = this.startTop + this.startPosTop + move.y
      this.moveElement([this.sectionId, this.elementId, this.elPositionInPage, this.$el.offsetHeight])
    },
    dragEnable () {
      // calbacks
    },
    dragDisable () {
      this.updateStyle()
      // this.$el.style.top = this.element.style[this.workspace.version].top
      // this.$el.style.left = this.element.style[this.workspace.version].left
    },
    hasResizer (handle) {
      let handles
      if (this.resize && this.resize.handles) {
        handles = this.resize.handles
      } else {
        handles = 'e'
      }
      return handles.indexOf(handle) > -1
    },
    resizeStart (direction) {
      const self = this.$el.getBoundingClientRect()
      const box = document.getElementById('content-area').getBoundingClientRect()
      if (direction === 'right') {
        this.widthMost = box.right - self.left
      } else if (direction === 'left') {
        this.widthMost = self.right - box.left
      } else if (direction === 'top') {
        this.heightMost = self.bottom - box.top
      } else if (direction === 'bottom') {
        this.heightMost = box.bottom - self.top
      }
    },
    resizeAction (direction, saveToStore, size) {
      if (direction === 'top' || direction === 'bottom') {
        size = Math.min(this.heightMost, size)
        this.$el.style.height = `${size}px`
      } else if (direction === 'left' || direction === 'right') {
        size = Math.min(this.widthMost, size)
        this.$el.style.width = `${size}px`
      }
      if (saveToStore) {
        // resize ends
        this.resizing = false
        this.$emit('change-draggable', true)
        // commit to vuex store
        this.resizeElement([this.elementId, {
          width: parseInt(this.$el.style.width),
          height: parseInt(this.$el.style.height)
        }])
      } else {
        this.resizing = true
        this.$emit('change-draggable', false)
      }
    },
    resizeEnable () {
    },
    resizeDisable () {
    },
    updateStyle () {
      for (const prop in this.element.style[this.workspace.version]) {
        if (prop !== 'zIndex') {
          this.$el.style[prop] = this.element.style[this.workspace.version][prop]
        }
      }
    }
  },
  watch: {
    'draggable': function (dragEnabled) {
      (dragEnabled) ? this.dragEnable() : this.dragDisable()
    },
    'resizable': function (resizeEnabled) {
      (resizeEnabled) ? this.resizeEnable() : this.resizeDisable()
    },
    'workspace.activeElementId': function (elementId) {
      if (this.elementId === elementId) {
        this.showToolbar()
      }
    }
  },
  mounted () {
    this.resizeDisable()
    if (this.workspace.activeElementId === this.elementId) {
      this.showToolbar()
      this.resizeEnable()
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
  <div class="element" @click="setActiveElementId(elementId)" @mousedown.stop="onDragBegin"
    :style="{
      left: element.style[workspace.version].left,
      top: element.style[workspace.version].top,
      width: element.style[workspace.version].width,
      height: element.style[workspace.version].height || 'auto',
      transition: (resizing || dragging) ? 'none' : 'all .4s'
    }"
  >
    <div class="el-content" :id="'element-' + elementId"
      :style="{
        zIndex:element.style[workspace.version].zIndex,
      }" 
      v-bind:class="{'outline':workspace.activeElementId === elementId}"
    >
      <slot name="content"></slot>
    </div>
    <template v-if="resizable">
      <resizer class="resizable-n" v-if="this.hasResizer('n')" :autoStyle="false" @resize-start="resizeStart" @resize-end="resizeAction" @resizing="resizeAction" :side="'top'" />
      <resizer class="resizable-e" v-if="this.hasResizer('e')" :autoStyle="false" @resize-start="resizeStart" @resize-end="resizeAction" @resizing="resizeAction" :side="'right'" />
      <resizer class="resizable-s" v-if="this.hasResizer('s')" :autoStyle="false" @resize-start="resizeStart" @resize-end="resizeAction" @resizing="resizeAction" :side="'bottom'" />
      <resizer class="resizable-w" v-if="this.hasResizer('w')" :autoStyle="false" @resize-start="resizeStart" @resize-end="resizeAction" @resizing="resizeAction" :side="'left'" />
    </template>
    <div v-if="workspace.activeElementId === elementId" class="el-toolbar" :class="toolbarPosition" @mousedown.stop>
      <div v-show="buttonGroup === 'main'" class="btn-group el-btn-group" role="group">
        <slot name="main-buttons-extend"></slot>
        <div class="btn btn-default" title="复制一个" @click.stop="duplicateElement(elementId)">
          <span class="glyphicon glyphicon-duplicate"></span>
        </div>
        <div class="btn btn-default" title="移到顶层" @click="indexElement([ elementId, 'top' ])">
          <span class="glyphicon glyphicon-circle-arrow-up"></span>
        </div>
        <div class="btn btn-default" title="移到底层" @click="indexElement([ elementId, 'bottom' ])">
          <span class="glyphicon glyphicon-circle-arrow-down"></span>
        </div>
        <div class="btn btn-default" title="删除" @click="removeElement([elementId])">
          <span class="glyphicon glyphicon-trash"></span>
        </div>
      </div>
      <div v-show="buttonGroup === 'position'" class="btn-group el-btn-group" role="group">
        <div class="btn btn-success">X: {{elPositionInPage.left}} &nbsp; Y: {{elPositionInPage.top}}</div>
      </div>
      <slot name="button-groups"></slot>
    </div>
  </div>
</template>

<style>

.element {
  position: absolute !important;
}

.el-content {
  position: relative;
  cursor: pointer;
  word-wrap: break-word;
  height: 100%;
}

.el-content.outline {
  outline: 1px solid #03ddff;
  box-shadow: 0px 0px 8px #ddd;
}

.el-content:hover {
  outline: 1px solid #03ddff;
}

.el-toolbar {
  position: absolute;
  height: auto;
  padding: 0;
  z-index: 90000;
  margin-bottom: 0;
}

.el-toolbar.top {
  top: -43px;
}

.el-toolbar.bottom {
  bottom: -43px;
}

.el-toolbar.left {
  left: -1px;
}

.el-toolbar.right {
  right: -1px;
}

.el-btn-group {
  white-space: nowrap;
  font-size: 0;
}

.el-btn-group > .btn, .el-btn-group > .btn-group{
  float: none;
}

.el-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 101000;
}

.is-dragging {
  z-index: 100000;
  cursor: move;
}

.resizable-e {
  position: absolute;
  top: 50%;
  margin-top: -5px;
  right: -12px;
  width: 0;
  height: 0;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent transparent #03ddff;
}

.resizable-w {
  position: absolute;
  top: 50%;
  margin-top: -5px;
  left: -12px;
  width: 0;
  height: 0;
  border-width: 5px;
  border-style: solid;
  border-color: transparent #03ddff transparent transparent;
}

.resizable-s {
  position: absolute;
  left: 50%;
  margin-left: -5px;
  bottom: -12px;
  width: 0;
  height: 0;
  border-width: 5px;
  border-style: solid;
  border-color: #03ddff transparent transparent transparent;
}

.resizable-n{
  position: absolute;
  left: 50%;
  margin-left: -5px;
  top: -12px;
  width: 0;
  height: 0;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent #03ddff transparent;
}
</style>