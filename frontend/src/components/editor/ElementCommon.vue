<script>
import { mapGetters, mapActions } from 'vuex'

import mouseDrag from 'mixins/mouseDrag'
import resizer from '../ui/OnesideResizer'
import FixedEditor from './FixedEditor'
import { Tooltip } from 'element-ui'
import eventHandler from 'utils/eventHandler'
import * as editorHelper from 'utils/editor'

// 纪录上一个操作的元素，需要用来判断在移动元素到新的section时已经发生了复制
let EDIT_CACHE = {
  id: null,
  mountedId: null
}

export default {
  name: 'element-common',
  mixins: [mouseDrag],
  components: {
    resizer,
    FixedEditor,
    Tooltip
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
    },
    fixedEditable: {
      type: Boolean,
      default: false
    },
    dimensionContraint: {
      type: Object
    }
  },
  data () {
    return {
      toolbarPosition: 'top left',
      elPositionInPage: { left: 0, top: 0 },
      clickOnThisElement: false,
      resizeConfig: {
        handles: 'e',
        aspectRatio: false
      },
      updateTimer: null,
      dragging: false,
      resizing: false,
      startTop: 0,
      startPosLeft: 0,
      startPosTop: 0,
      horizontalMax: [0, 0],
      verticalMax: [0, 0],
      widthMax: 0,
      heightMax: 0,
      fixedEditing: false,
      documentScrollPx: 0,
      // key*, 方向键移动相关的属性
      mountedId: null,
      keyEventAttached: false,
      keyMoveTimer: null,
      keyMoveTimestamp: null,
      keyMove: {
        x: 0,
        y: 0
      }
    }
  },
  computed: {
    ...mapGetters({
      workspace: 'editorWorkspace',
      alignIds: 'alignIds',
      multiMove: 'multiMove',
      updatedSection: 'updatedSection'
    }),
    actived () {
      return this.alignIds.indexOf(this.elementId) >= 0
    },
    // 直接watch element.fixed居然无效，只好用计算属性来监听，不确定是不是Vue的bug
    // 如果元素被固定，那么不允许拖动
    isFixed () {
      this.$emit('change-draggable', !this.element.fixed)
      return !!this.element.fixed
    },
    sizeRange: function () {
      const constraint = this.dimensionContraint
      const get = (key, isMin) => {
        if (constraint && constraint.hasOwnProperty(key)) {
          return constraint[key]
        }
        return (isMin ? 0 : Number.MAX_SAFE_INTEGER)
      }
      return {
        'minWidth': get('minWidth', true),
        'minHeight': get('minHeight', true),
        'maxWidth': get('maxWidth', false),
        'maxHeight': get('maxHeight', false)
      }
    }
  },
  methods: {
    ...mapActions([
      'setActiveElementId',
      'removeElement',
      'moveElement',
      'resizeElement',
      'indexElement',
      'duplicateElement',
      'modifyElement',
      // 对齐
      'updateAlign',
      'clearAlign',
      'clearMultiSelect'
    ]),
    selectElement () {
      this.setActiveElementId(this.elementId)
    },
    onKey (event) {
      if (event && event.target) {
        const tagName = event.target.tagName
        const contentEditable = event.target.isContentEditable
        if (tagName === 'INPUT' || tagName === 'TEXTAREA' || contentEditable) {
          return
        }
      }
      const code = event.which || event.keyCode
      if (code === 8 || code === 46) {
        // 删除, `backspace` or `delete`
        this.removeElement([this.elementId])
        event.stopPropagation()
        event.preventDefault()
      } else if (code >= 37 && code <= 40) {
        // 37 left, 39 right
        // 38 up, 40 down
        event.stopPropagation()
        event.preventDefault()
        if (this.keyMoveTimer === null) {
          if (!this.draggable) return
          this.dragBegin()
          this.keyMove = {
            x: 0,
            y: 0
          }
        } else {
          clearTimeout(this.keyMoveTimer)
        }
        const offset = {
          x: 0,
          y: 0
        }
        this.dragging = true
        {
          const i = code - 37
          const name = i % 2 === 0 ? 'x' : 'y'
          const value = i < 2 ? -1 : 1
          this.keyMove[name] += value
          offset[name] = value
        }
        this.keyMoveTimer = setTimeout(() => {
          this.keyMoveTimer = null
          this.keyMoveTimestamp = null
          this.dragging = false
          this.dragEnd(this.keyMove, offset)
        }, 800)
        const newTime = new Date()
        if (this.keyMoveTimestamp !== null && newTime - this.keyMoveTimestamp <= 100) {
          return
        } else {
          this.keyMoveTimestamp = newTime
        }
        this.dragMove(this.keyMove, offset, true)
      }
    },
    showToolbar () {
      this.$emit('change-button-group', 'main')

      const viewTop = getElementTop(this.$el) - document.documentElement.scrollTop
      const toolbarPositionY = (viewTop < 95) ? 'bottom' : 'top'

      const viewRight = this.workspace.width - parseInt(this.element.style[this.workspace.version].left)
      const toolbarPositionX = (viewRight < 0) ? 'right' : 'left'

      this.toolbarPosition = toolbarPositionY + ' ' + toolbarPositionX
    },
    editFixed () {
      this.fixedEditing = true
      this.$emit('change-button-group', 'fixedEditing')
    },
    changFixed (element) {
      if (element) {
        this.modifyElement([this.elementId, element])
      }
      this.fixedEditing = false
      this.$emit('change-button-group', 'main')
    },
    actualMove (move) {
      const getMin = (v, range) => {
        const i = v < 0 ? 0 : 1
        return [Math.max, Math.min][i](range[i], v)
      }
      return {
        x: getMin(move.x, this.horizontalMax),
        y: getMin(move.y, this.verticalMax)
      }
    },
    getPosTop () {
      return getElementTop(this.$el) - 50 - this.$el.offsetTop
    },
    getStartPos () {
      const style = window.getComputedStyle(this.$el, null)
      const getSize = (key) => parseInt(style[key])
      this.startPosLeft = getSize('left')
      this.startPosTop = getSize('top')
    },
    dragBegin () {
      this.clearMultiSelect()
      if (!this.keyEventAttached) {
        document.addEventListener('keydown', this.onKey, false)
        this.keyEventAttached = true
      }
      EDIT_CACHE = { id: this.elementId, mountedId: this.mountedId }
      this.getStartPos()
      this.setActiveElementId(this.elementId)
      this.$emit('drag-start')

      const self = this.$el.getBoundingClientRect()
      const boxContainer = this.element.fixed ? 'fixed-container' : 'content-area'
      const box = document.getElementById(boxContainer).getBoundingClientRect()
      this.horizontalMax = [box.left - self.left, box.right - self.right]
      this.verticalMax = [box.top - self.top, box.bottom - self.bottom]
      this.startTop = this.getPosTop()

      editorHelper.alignBegin(this.elementId)
    },
    dragMove (move, offset, options) {
      if (move.x === 0 && move.y === 0) return
      if (this.buttonGroup !== 'position') {
        this.$emit('change-button-group', 'position')
      }
      const actualMove = this.actualMove(move)
      let speed = 0
      if (options.speed) {
        speed = Math.max(options.speed.x, options.speed.y)
      }
      const _move = editorHelper.alignNext({
        move: actualMove,
        offset,
        options: {
          speed
        }
      })
      const moveX = _move.x
      const moveY = _move.y
      const left = this.startPosLeft + moveX
      this.$el.style.left = left + 'px'
      this.elPositionInPage.left = left

      const top = this.startPosTop + moveY
      this.$el.style.top = top + 'px'
      this.elPositionInPage.top = this.startTop + top
      if (_move.alignData !== null) {
        this.updateAlign(_move.alignData)
      }
    },
    dragEnd (move, offset) {
      if (move && move.x === 0 && move.y === 0) return
      this.$emit('change-button-group', 'main')
      this.elPositionInPage.left = parseInt(this.$el.style.left)
      this.elPositionInPage.top = parseInt(this.$el.style.top) + this.startTop
      this.moveElement([this.sectionId, this.elementId, this.elPositionInPage, this.$el.offsetHeight])
      this.updateDimen()
      this.clearAlign()
      editorHelper.alignEnd()
    },
    // dragEnable () {
    //   // calbacks
    // },
    // dragDisable () {
    //   // this.updateStyle()
    //   // this.$el.style.top = this.element.style[this.workspace.version].top
    //   // this.$el.style.left = this.element.style[this.workspace.version].left
    // },
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
      this.bounds = this.getDimen()
      const self = this.$el.getBoundingClientRect()
      const boxContainer = this.element.fixed ? 'fixed-container' : 'content-area'
      const box = document.getElementById(boxContainer).getBoundingClientRect()
      if (direction === 'right' || direction === 'bottom') {
        this.widthMax = box.right - self.left
        this.heightMax = box.bottom - self.top
      } else if (direction === 'left' || direction === 'top') {
        this.widthMax = self.right - box.left
        this.heightMax = self.bottom - box.top
      }
      this.$emit('resize-start', direction)
    },
    resizeAction (direction, saveToStore, size) {
      const width = parseInt(this.$el.style.width)
      const height = parseInt(this.$el.style.height)
      let newWidth, newHeight
      if (direction === 'top' || direction === 'bottom') {
        newHeight = Math.min(this.heightMax, size)
        if (this.resize.aspectRatio) {
          newWidth = newHeight * width / height
          if (newWidth > this.widthMax) {
            newWidth = this.widthMax
            newHeight = newWidth * height / width
          }
          this.$el.style.width = `${newWidth}px`
        }
        this.$el.style.height = `${newHeight}px`
      } else if (direction === 'left' || direction === 'right') {
        newWidth = Math.min(this.widthMax, size)
        if (this.resize.aspectRatio) {
          newHeight = newWidth * height / width
          if (newHeight > this.heightMax) {
            newHeight = this.heightMax
            newWidth = newHeight * width / height
          }
          this.$el.style.height = `${newHeight}px`
        }
        this.$el.style.width = `${newWidth}px`
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
        this.$emit('resize-end')
        this.updateDimen()
        this.clearAlign()
      } else {
        this.resizing = true
        this.$emit('change-draggable', false)
        this.$emit('resizing', direction, size)
        // this.findAlignments()
      }
    },
    resizeEnable () {
    },
    resizeDisable () {
    },
    // updateStyle () {
    //   for (const prop in this.element.style[this.workspace.version]) {
    //     if (prop !== 'zIndex') {
    //       this.$el.style[prop] = this.element.style[this.workspace.version][prop]
    //     }
    //   }
    // },
    getDimen () {
      const elRect = this.$refs.box.getBoundingClientRect()
      const containerRect = document.getElementById('content-area').getBoundingClientRect()
      const left = elRect.left - containerRect.left
      const right = elRect.right - containerRect.left
      const top = elRect.top - containerRect.top
      const bottom = elRect.bottom - containerRect.top
      const hcenter = Math.round((left + right) / 2)
      const vcenter = Math.round((top + bottom) / 2)
      const rect = {
        width: elRect.width,
        height: elRect.height,
        left, hcenter, right,
        top, vcenter, bottom
      }
      return rect
    },
    updateDimen (ifNew) {
      const positionInPage = { top: parseInt(this.$el.style.top) + this.getPosTop(), left: parseInt(this.$el.style.left) }
      const element = {
        mid: this.mountedId,
        id: this.elementId,
        sectionId: this.sectionId,
        positionInPage,
        rect: this.getDimen()
      }
      if (ifNew) {
        editorHelper.elementAdd(element)
      } else {
        editorHelper.elementUpdate(element)
      }
    },
    updateDimenAsync () {
      clearTimeout(this.updateTimer)
      this.updateTimer = setTimeout(() => {
        this.updateDimen()
      }, 800)
    },
    watchScroll () {
      this.watchEvent = eventHandler.listen(window, 'scroll', (e) => {
        this.documentScrollPx = document.body.scrollTop
      })
    },
    removeWatchScroll () {
      this.watchEvent && this.watchEvent.remove()
    }
  },
  watch: {
    // 'draggable': function (dragEnabled) {
    //   dragEnabled ? this.dragEnable() : this.dragDisable()
    // },
    'resizable': function (resizeEnabled) {
      resizeEnabled ? this.resizeEnable() : this.resizeDisable()
    },

    'isFixed': function (val) {
      this.$emit('change-draggable', !val)
    },

    'workspace.activeElementId': function (elementId) {
      if (this.elementId === elementId) {
        this.showToolbar()
      } else {
        if (this.keyEventAttached) {
          document.removeEventListener('keydown', this.onKey, false)
          this.keyEventAttached = false
        }
        if (this.keyMoveTimer !== null) {
          clearTimeout(this.keyMoveTimer)
          this.keyMoveTimer = null
          this.dragEnd(this.keyMove)
        }
      }
    },

    'workspace.version': function (newVersion) {
      this.updateDimenAsync()
    },

    'updatedSection': function (val) {
      if (this.sectionId > val.id) {
        this.updateDimen()
      }
    },

    'element.style': function (val) {
      this.updateDimenAsync()
    },

    'multiMove': function (val) {
      if (!this.actived) return
      if (val === null) return
      if (val.started) {
        this.getStartPos()
      }
      if (val.move) {
        const left = this.startPosLeft + val.move.x
        this.$el.style.left = left + 'px'
        this.elPositionInPage.left = left
        const top = this.startPosTop + val.move.y
        this.$el.style.top = top + 'px'
        this.elPositionInPage.top = top
      }
    }
  },
  mounted () {
    this.mountedId = new Date().getTime()
    this.resizeDisable()
    this.element.fixed && this.element.fixedScrollPx > 0 && this.watchScroll()
    if (this.workspace.activeElementId === this.elementId) {
      this.showToolbar()
      this.resizeEnable()
    }
    if (EDIT_CACHE.id === this.elementId && EDIT_CACHE.mountedId !== this.mountedId) {
      // 新复制的元素
      document.addEventListener('keydown', this.onKey)
      this.keyEventAttached = true
    }
    // 在 mobile/pc 切换时有动画，如果元素曾移动到不同的版块，会重新生成
    this.updateDimenAsync()
  },
  destroyed () {
    if (this.updateTimer !== null) {
      clearTimeout(this.updateTimer)
      this.updateTimer = null
    }
    if (this.keyMoveTimer !== null) {
      clearTimeout(this.keyMoveTimer)
      this.keyMoveTimer = null
    }
    if (this.keyEventAttached) {
      document.removeEventListener('keydown', this.onKey, false)
    }
    // 从位置信息中删除
    editorHelper.elementRemove(this.mountedId)
    clearTimeout(this._updateAlignmentTimer)
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
  <div class="element" @click="selectElement" @mousedown.stop="onDragBegin"
    ref="box"
    :class="{ 'active-highlighted': actived }"
    :style="{
      display: (element.fixed && documentScrollPx < element.fixedScrollPx) ? 'none' : 'block',
      left: element.fixed ? element.fixedPosition.left : element.style[workspace.version].left,
      top: element.fixed ? element.fixedPosition.top : element.style[workspace.version].top,
      bottom: element.fixed ? element.fixedPosition.bottom : '',
      right: element.fixed ? element.fixedPosition.right : '',
      width: element.style[workspace.version].width,
      height: element.style[workspace.version].height || 'auto',
      transition: (actived || resizing || dragging) ? 'none' : 'all .3s'
    }"
  >
    <div class="el-content" :id="'element-' + elementId"
      :style="{
        zIndex: element.style[workspace.version].zIndex,
      }"
      :class="{'outline':workspace.activeElementId === elementId}"
    >
      <slot name="content"></slot>
    </div>
    <template v-if="resizable">
      <resizer v-for="(side, dir) in {'n': 'top', 'e': 'right', 's': 'bottom', 'w': 'left'}"
        v-if="hasResizer(dir)"
        :class="'resizable-' + dir"
        :autoStyle="false"
        @resize-start="resizeStart"
        @resize-end="resizeAction"
        @resizing="resizeAction"
        :side="side"
        :minSize="['n', 'e'].indexOf(side) >= 0 ? sizeRange.minHeight: sizeRange.minWidth"
      />
    </template>
    <div v-if="workspace.activeElementId === elementId" class="el-toolbar" :class="toolbarPosition" @mousedown.stop>
      <div v-show="buttonGroup === 'main'" class="btn-group el-btn-group" role="group">
        <slot name="main-buttons-extend"></slot>
        <tooltip v-if="fixedEditable" class="btn btn-default" content="固定位置" @click.native.stop="editFixed">
          <div><span class="glyphicon glyphicon-pushpin"></span></div>
        </tooltip>
        <tooltip class="btn btn-default" @click.native.stop="duplicateElement(elementId)" content="复制一个">
          <div><span class="glyphicon glyphicon-duplicate"></span></div>
        </tooltip>
        <tooltip class="btn btn-default" content="移到顶层" @click.native="indexElement([ elementId, 'top' ])">
          <div><span class="glyphicon glyphicon-circle-arrow-up"></span></div>
        </tooltip>
        <tooltip class="btn btn-default" content="移到底层" @click.native="indexElement([ elementId, 'bottom' ])">
          <div><span class="glyphicon glyphicon-circle-arrow-down"></span></div>
        </tooltip>
        <tooltip class="btn btn-default" content="删除" @click.native="removeElement([elementId])">
          <div><span class="glyphicon glyphicon-trash"></span></div>
        </tooltip>
      </div>
      <div v-show="buttonGroup === 'fixedEditing'" class="btn-group el-btn-group" role="group">
        <div class="btn btn-success"><span class="glyphicon glyphicon-ok"></span></div>
      </div>
      <div v-show="buttonGroup === 'position'" class="btn-group el-btn-group" role="group">
        <div class="btn btn-success">X: {{elPositionInPage.left}} &nbsp; Y: {{elPositionInPage.top}}</div>
      </div>
      <slot name="button-groups"></slot>
    </div>
    <fixed-editor v-if="fixedEditable" :show="fixedEditing" :value="element" @input="changFixed"></fixed-editor>
    <slot name="sidebar"></slot>
  </div>
</template>

<style scoped>
.element {
  position: absolute;
  pointer-events: auto;
}

.el-content {
  position: relative;
  cursor: pointer;
  word-wrap: break-word;
  height: 100%;
  z-index: 1;
}

.el-content.outline {
  outline: 1px solid #03ddff;
  box-shadow: 0px 0px 8px #ddd;
}

.el-content:hover {
  outline: 1px solid #03ddff;
}

.resize-handle {
  z-index: 101000;
}

.resizable-e,
.resizable-w,
.resizable-s,
.resizable-n {
  position: absolute;
  width: 0;
  height: 0;
  border-width: 5px;
  border-style: solid;
}

.resizable-s,
.resizable-n {
  left: 50%;
}

.resizable-e,
.resizable-w {
  top: 50%;
}

.resizable-e {
  margin-top: -5px;
  right: -12px;
  border-color: transparent transparent transparent #03ddff;
}

.resizable-w {
  margin-top: -5px;
  left: -12px;
  border-color: transparent #03ddff transparent transparent;
}

.resizable-s {
  margin-left: -5px;
  bottom: -12px;
  border-color: #03ddff transparent transparent transparent;
}

.resizable-n {
  margin-left: -5px;
  top: -12px;
  border-color: transparent transparent #03ddff transparent;
}
</style>

<style>
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

  .el-btn-group > .btn, .el-btn-group > .btn-group {
    float: none;
  }

  .el-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 110000;
    background: white;
    opacity: 0;
    filter: alpha(opacity=1);
  }

  .active-highlighted {
    outline: 1px solid red;
  }
</style>
