<script>
import ElementCommon from './ElementCommon'
import ShapeEditor from './ShapeEditor'
import colorMixin from '../../mixins/colorMixin'
import { mapGetters, mapActions } from 'vuex'
import { merge, isEqual } from 'lodash'

export default {
  name: 'element-shape',
  // 接受父组件传参，element元素属性，sectionId:板块ID，elementId:元素ID
  props: ['element', 'sectionId', 'elementId'],
  mixins: [colorMixin],
  components: {
    ElementCommon,
    ShapeEditor
  },
  data () {
    return {
      // 初始加载主按钮组
      buttonGroup: 'main',
      // 是否处于编辑状态
      editing: false,
      // 组件实例化时将传入的element参数复制到button中，以避免直接修改store中的状态
      shapeElement: merge({}, this.element),
      resize: {},
      draggableFromChild: true,
      hasPopup: false
    }
  },
  created () {
    if (!this.shapeElement.hasOwnProperty('imageObj')) {
      this.shapeElement.imageObj = null
    }
  },
  computed: {
    ...mapGetters({
      workspace: 'editorWorkspace'
    }),
    draggable () {
      return this.draggableFromChild
    },
    resizable () {
      return (!this.editing && this.workspace.activeElementId === this.elementId)
    }
  },
  methods: {
    ...mapActions([
      'modifyElement',
      'removeElement',
      'resizeElement',
      'setActiveElementId'
    ]),
    edit () {
      this.editing = true
      this.buttonGroup = 'edit'
    },
    editDone () {
      this.editing = false
      this.buttonGroup = 'main'
      if (!isEqual(this.element, this.shapeElement)) {
        this.modifyElement([this.elementId, this.shapeElement])
      }
    },
    editLink () {
      this.buttonGroup = 'link'
    },
    editLinkDone (changed, linkObj) {
      if (changed) {
        this.linkObj = merge({}, linkObj)
        const newPropsObj = { link: linkObj }
        this.modifyElement([this.elementId, newPropsObj])
      }
      this.buttonGroup = 'main'
    },
    changeButtonGroup (val) {
      this.buttonGroup = val
    },
    changeDraggable (val) {
      this.draggableFromChild = val
    },
    popupChange (val) {
      this.hasPopup = val
    },
    imageChange (val) {
      this.shapeElement.imageObj = val
      this.setActiveElementId(this.elementId)
      this.manualUpdate(val)
    },
    manualUpdate (newImage) {
      let style
      if (newImage && newImage.url) {
        // adjust size
        if (!this.element.style.pc.width) {
          const pcWidth = (newImage.width > 960) ? 960 : newImage.width
          const mobileWidth = (newImage.width > 360) ? 360 : newImage.width
          const pcLeft = (960 - pcWidth) / 2
          const mobileLeft = (360 - mobileWidth) / 2
          style = {
            'pc': {
              width: pcWidth + 'px',
              height: undefined,
              left: pcLeft + 'px'
            },
            'mobile': {
              width: mobileWidth + 'px',
              height: undefined,
              left: mobileLeft + 'px'
            }
          }
        } else {
          style = {
            'pc': { ...this.element.style.pc },
            'mobile': { ...this.element.style.mobile }
          }
          style.pc.height = undefined
          style.mobile.height = undefined
        }
        // commit to store
        // this.shapeElement.imageObj = newImage
        this.shapeElement.style = style
        if (!isEqual(this.element, this.shapeElement)) {
          this.modifyElement([this.elementId, this.shapeElement, true])
        }
      }
    }
  },
  watch: {
    'workspace.activeElementId': function (val) {
      if (this.hasPopup) {
        return
      }
      if (val !== this.elementId && this.editing) this.editDone()
    },
    'element': function (val) {
      this.shapeElement = merge({}, val)
    },
    'shapeElement.imageObj': function (newImage) {
      this.manualUpdate(newImage)
    }
  }
}
</script>

<template>
  <element-common
    :element="element" 
    :section-id="sectionId" 
    :element-id="elementId" 
    :button-group="buttonGroup" 
    :draggable="draggable" 
    :resize="resize" 
    :resizable="resizable" 
    :fixedEditable="true"
    @change-button-group="changeButtonGroup" 
    @change-draggable="changeDraggable" 
    @drag-start="editDone"
  >
    <div slot="content" v-if="shapeElement.imageObj" class="element-image-button"
      :style="{
        borderRadius: shapeElement.props.borderRadius,
        boxShadow: shapeElement.props.boxShadow,
        borderStyle: shapeElement.props.borderStyle,
        borderColor: getColor(shapeElement.props.borderColor),
        overflow: 'hidden'
      }">
      <img :src="shapeElement.imageObj.url" :style="{width: '100%', height: 'auto'}" @mousedown.prevent/>
    </div>
    <div slot="content" v-else class="element-shape"
      @dblclick="edit" 
      :style="[
        {
          borderWidth: shapeElement.props.borderWidth,
          borderRadius: shapeElement.props.borderRadius,
          borderStyle: shapeElement.props.borderStyle,
          backgroundColor: getColor(shapeElement.props.backgroundColor),
          borderColor: getColor(shapeElement.props.borderColor)
        }
      ]">
    </div>
    
    <template slot="main-buttons-extend">
      <div class="btn btn-primary" title="编辑" @click.stop="edit">编辑</div>
    </template>
    <template slot="button-groups">
      <div v-show="buttonGroup === 'edit'" class="btn-group el-btn-group" role="group">
        <div class="btn btn-success"><span class="glyphicon glyphicon-ok"></span></div>
      </div>
    </template>
    <!-- <shape-editor 
      slot="sidebar"
      :show="editing" 
      v-model="shapeElement"
      @edit-done="editDone"
      @popup-change="popupChange"
      @image-change="imageChange"
    >
    </shape-editor> -->
  </element-common>
</template>

<style>
.element-shape {
  height: 100%;
}

</style>