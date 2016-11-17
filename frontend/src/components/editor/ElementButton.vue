<script>
import ElementCommon from './ElementCommon'
import LinkEditor from './LinkEditor'
import ButtonEditor from './ButtonEditor'
import colorMixin from '../../mixins/colorMixin'
import { mapGetters, mapActions } from 'vuex'
import { merge, isEqual } from 'lodash'

export default {
  name: 'element-button',
  // 接受父组件传参，element元素属性，sectionId:板块ID，elementId:元素ID
  props: ['element', 'sectionId', 'elementId'],
  mixins: [colorMixin],
  components: {
    ElementCommon,
    LinkEditor,
    ButtonEditor
  },
  data () {
    return {
      // 初始加载主按钮组
      buttonGroup: 'main',
      // 是否处于编辑状态
      editing: false,
      // 组件实例化时将传入的element参数复制到button中，以避免直接修改store中的状态
      buttonElement: merge({}, this.element),
      linkObj: merge({}, this.element.link),
      // 模拟css hover伪类效果
      hover: false,
      resize: {},
      draggableFromChild: true,
      imageObj: {},
      hasPopup: false
    }
  },
  computed: {
    ...mapGetters({
      workspace: 'editorWorkspace'
    }),
    // 编辑状态不允许拖动
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
      'getImage'
    ]),
    edit () {
      this.editing = true
      this.buttonGroup = 'edit'
    },
    editDone () {
      this.editing = false
      this.buttonGroup = 'main'
      if (!isEqual(this.element, this.buttonElement)) {
        this.modifyElement([this.elementId, this.buttonElement])
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
    selectImage () {
      this.hasPopup = true
      this.getImage([(image) => {
        this.hasPopup = false
        this.imageObj = image
      }])
    },
    deleteImage () {
      this.buttonElement.imageObj = null
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
      this.buttonElement = merge({}, val)
    },
    'imageObj': function (newImage) {
      const self = this
      if (newImage && newImage.url) {
        // adjust size
        const pcWidth = (newImage.width > 960) ? 960 : newImage.width
        const mobileWidth = (newImage.width > 360) ? 360 : newImage.width
        const pcLeft = (960 - pcWidth) / 2
        const mobileLeft = (360 - mobileWidth) / 2
        const style = {
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
        // commit to store
        this.buttonElement.imageObj = newImage
        this.buttonElement.style = style
        if (!isEqual(this.element, this.buttonElement)) {
          this.modifyElement([self.elementId, this.buttonElement, true])
        }
      }
    }
  }
}
</script>

<template>
<div>
  <element-common 
    :element="element" 
    :section-id="sectionId" 
    :element-id="elementId" 
    :button-group="buttonGroup" 
    :draggable="draggable" 
    :resize="resize" 
    :resizable="resizable" 
    @change-button-group="changeButtonGroup" 
    @change-draggable="changeDraggable" 
    @drag-start="editDone"
  >
    <div slot="content" v-if="buttonElement.imageObj">
      <img :src="buttonElement.imageObj.url" :style="{width: '100%', height: 'auto'}" @mousedown.prevent/>
    </div>
    <div slot="content" v-else class="element-button"
      @dblclick="edit" 
      @mouseenter = "hover = true"
      @mouseleave = "hover = false"
      :style="[
        {
          borderRadius: buttonElement.props.borderRadius,
          fontSize: buttonElement.props.fontSize,
          boxShadow: buttonElement.props.boxShadow,
          fontWeight: buttonElement.props.fontWeight,
          borderStyle: buttonElement.props.borderStyle,
          backgroundColor: hover ? getColor(buttonElement.props.hoverColor) : getColor(buttonElement.props.backgroundColor),
          borderColor: getColor(buttonElement.props.borderColor),
          color: getColor(buttonElement.props.color),
        }
      ]">
      {{buttonElement.text}}
    </div>
    
    <template slot="main-buttons-extend">
      <div class="btn btn-primary" title="编辑" @click.stop="edit">编辑</div>
      <div class="btn btn-default" title="链接" @click="editLink"><span class="glyphicon glyphicon-link"></span></div>
    </template>
    <template slot="button-groups">
      <div v-show="buttonGroup === 'edit'" class="btn-group el-btn-group" role="group">
        <div class="btn btn-success"><span class="glyphicon glyphicon-ok"></span></div>
      </div>
      <link-editor v-if="buttonGroup === 'link'" :link-editing="buttonGroup === 'link'" :link-obj="linkObj" @link-edit-done="editLinkDone"></link-editor>
    </template>
  </element-common>
  <button-editor :show="editing" v-model="buttonElement" @edit-done="editDone" @select-image="selectImage" @delete-image="deleteImage"></button-editor>
</div>
</template>

<style>

.element-button{
  text-align: center;
  cursor:pointer;
  border-width: 2px;
  padding: 6px;
  height:100%;
}
</style>