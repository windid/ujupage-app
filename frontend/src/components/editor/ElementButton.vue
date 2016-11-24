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
      hasPopup: false
    }
  },
  created () {
    // 如果有属性缺失，手动补充
    const fill = (object, key, fillValue) => {
      if (!object.hasOwnProperty(key)) {
        object[key] = fillValue
      }
    }
    const fillElement = (key, value) => fill(this.buttonElement, key, value)
    const fillProps = (key, value) => fill(this.buttonElement.props, key, value)
    fillElement('imageObj', null)
    const s = ['boxShadowX', 'boxShadowY', 'boxShadowSize']
    s.forEach((e) => fillProps(e, 0))
    fillProps('borderWidth', 1)
    fillProps('boxShadowInset', 'false')
    fillProps('boxShadowColor', 4)
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
    },
    buttonStyle () {
      const props = this.buttonElement.props
      const style = {
        borderRadius: props.borderRadius,
        borderStyle: props.borderStyle,
        borderWidth: (props.borderWidth ? props.borderWidth : 0) + 'px',
        borderColor: this.getColor(props.borderColor),
        overflow: 'hidden'
      }
      let shadow = ''
      shadow += (props.boxShadowX ? props.boxShadowX : 0) + 'px '
      shadow += (props.boxShadowY ? props.boxShadowY : 0) + 'px '
      shadow += (props.boxShadowSize ? props.boxShadowSize : 0) + 'px '
      shadow += this.getColor(props.boxShadowColor)
      if (props.boxShadowInset === 'true') {
        shadow += ' inset'
      }
      style.boxShadow = shadow
      if (this.buttonElement.imageObj) {
        // 图片按钮
      } else {
        style.fontSize = props.fontSize
        style.fontWeight = props.fontWeight
        style.backgroundColor = this.hover ? this.getColor(props.hoverColor) : this.getColor(props.backgroundColor)
        style.color = this.getColor(props.color)
      }
      return style
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
    popupChange (val) {
      this.hasPopup = val
    },
    imageChange (val) {
      this.buttonElement.imageObj = val
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
        // this.buttonElement.imageObj = newImage
        this.buttonElement.style = style
        if (!isEqual(this.element, this.buttonElement)) {
          this.modifyElement([this.elementId, this.buttonElement, true])
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
      this.buttonElement = merge({}, val)
    },
    'buttonElement.imageObj': function (newImage) {
      this.manualUpdate(newImage)
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
    <div slot="content" v-if="buttonElement.imageObj" class="element-image-button"
      :style="buttonStyle">
      <img :src="buttonElement.imageObj.url" :style="{width: '100%', height: 'auto'}" @mousedown.prevent/>
    </div>
    <div slot="content" v-else class="element-button"
      @dblclick="edit" 
      @mouseenter = "hover = true"
      @mouseleave = "hover = false"
      :style="buttonStyle">
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
  <button-editor :show="editing" v-model="buttonElement"
    @edit-done="editDone"
    @popup-change="popupChange"
    @image-change="imageChange"></button-editor>
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