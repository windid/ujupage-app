<script>
import Draggabilly from 'draggabilly'
import { mapGetters, mapActions } from 'vuex'
import $ from 'jquery'
import 'jquery-ui/ui/widgets/resizable'
import 'jquery-ui/themes/base/resizable.css'

import { merge } from 'lodash'

export default {
  name: 'element-common',
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
      twoWay: true,
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
      resizeConfig: {},
      dragging: false,
      resizing: false
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

    dragEnable () {
      this.draggie = new Draggabilly(this.$el, {
        containment: '#content-area'
      })
      let startTop = 0
      const vm = this

      this.draggie.on('dragEnd', function (event) {
        vm.dragging = false
        vm.$emit('change-button-group', 'main')
        const position = $(this.element).position()
        vm.elPositionInPage.left = position.left
        vm.elPositionInPage.top = startTop + position.top
        vm.moveElement([vm.sectionId, vm.elementId, vm.elPositionInPage, vm.$el.offsetHeight])
      })

      this.draggie.on('dragStart', function () {
        vm.dragging = true
        vm.setActiveElementId(vm.elementId)
        vm.$emit('drag-start')
        startTop = getElementTop(vm.$el) - 50 - vm.$el.offsetTop
      })

      this.draggie.on('dragMove', function () {
        if (this.buttonGroup !== 'position') {
          vm.$emit('change-button-group', 'position')
        }
        const position = $(this.element).position()
        vm.elPositionInPage.left = position.left
        vm.elPositionInPage.top = startTop + position.top
      })
    },
    dragDisable () {
      this.draggie.destroy()
      this.updateStyle()
      // this.$el.style.top = this.element.style[this.workspace.version].top
      // this.$el.style.left = this.element.style[this.workspace.version].left
    },
    resizeInit () {
      const vm = this
      const defaultResize = {
        handles: 'e',
        aspectRatio: false
      }
      this.resizeConfig = merge({}, defaultResize, this.resize)
      let vmDraggable = vm.draggable
      $(this.$el).resizable({
        handles: this.resizeConfig.handles,
        aspectRatio: this.resizeConfig.aspectRatio,
        containment: $('#content-area'),
        start () {
          vm.resizing = true
          vmDraggable = vm.draggable
          vm.$emit('change-draggable', false)
        },
        stop (e, ui) {
          vm.resizing = false
          vm.$emit('change-draggable', vmDraggable)
          vm.resizeElement([vm.elementId, ui.size])
          // vm.updateStyle()
        }
      })
    },
    resizeEnable () {
      $(this.$el).resizable('enable')
    },
    resizeDisable () {
      $(this.$el).resizable('disable')
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
    this.dragEnable()
    this.resizeInit()
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
  <div class="element" @click="setActiveElementId(elementId)" @mousedown.stop 
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
      <div class="resizable-w" v-if="resizeConfig.handles && resizeConfig.handles.indexOf('w') > -1"></div>
      <div class="resizable-e" v-if="resizeConfig.handles && resizeConfig.handles.indexOf('e') > -1"></div>
      <div class="resizable-n" v-if="resizeConfig.handles && resizeConfig.handles.indexOf('n') > -1"></div>
      <div class="resizable-s" v-if="resizeConfig.handles && resizeConfig.handles.indexOf('s') > -1"></div>
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