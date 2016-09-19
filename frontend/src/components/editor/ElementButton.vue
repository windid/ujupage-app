<script>
import { mapGetters, mapActions } from 'vuex'
import ElementCommon from './ElementCommon'
import LinkEditor from './LinkEditor'
import { merge } from 'lodash'
import colorMixin from '../../mixins/colorMixin.js'

export default {
  name: 'element-button',
  // 接受父组件传参，element元素属性，sectionId:板块ID，elementId:元素ID
  props: ['element', 'sectionId', 'elementId'],
  mixins: [colorMixin],
  components: {
    ElementCommon,
    LinkEditor
  },
  data () {
    return {
      // 初始加载主按钮组
      buttonGroup: 'main',
      // 是否处于编辑状态
      editing: false,
      // 是否被修改
      changed: false,
      // 组件实例化时将传入的element参数复制到button中，以避免直接修改store中的状态
      button: {
        text: this.element.text,
        props: merge({}, this.element.props)
      },
      linkObj: merge({}, this.element.link),
      // 模拟css hover伪类效果
      hover: false,
      resize: {},
      draggableFromChild: true
    }
  },
  computed: {
    ...mapGetters({
      workspace: 'editorWorkspace'
    }),
    // 编辑状态不允许拖动
    draggable () {
      return !this.editing && this.buttonGroup !== 'link' && this.draggableFromChild
    },
    resizable () {
      return (!this.editing && this.buttonGroup !== 'link' && this.workspace.activeElementId === this.elementId)
    }
  },
  methods: {
    ...mapActions([
      'modifyElement'
    ]),
    edit () {

    },
    editDone () {

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
    }
  }
}
</script>

<template>
  <element-common :element="element" :section-id="sectionId" :element-id="elementId" :button-group="buttonGroup" :draggable="draggable" :resize="resize" :resizable="resizable" @change-button-group="changeButtonGroup" @change-draggable="changeDraggable">
    <div slot="content" class="element-button"
      @dblclick="edit" 
      @mouseenter = "hover = true"
      @mouseleave = "hover = false"
      :style="[
        {
          borderRadius: button.props.borderRadius,
          fontSize: button.props.fontSize,
          boxShadow: button.props.boxShadow,
          fontWeight: button.props.fontWeight,
          borderStyle: button.props.borderStyle,
          backgroundColor:hover ? getColor(button.props.hoverColor) : getColor(button.props.backgroundColor),
          borderColor:getColor(button.props.borderColor),
          color:getColor(button.props.color),
        }
      ]">
      {{button.text}}
    </div>
    
    <template slot="main-buttons-extend">
      <div class="btn btn-primary" title="编辑" @click="edit">编辑</div>
      <div class="btn btn-default" title="链接" @click="editLink"><span class="glyphicon glyphicon-link"></span></div>
    </template>
    <template slot="button-groups">
      <div v-show="buttonGroup === 'edit'" class="btn-group el-btn-group" role="group">
        <div class="btn btn-success" @click="editDone"><span class="glyphicon glyphicon-ok"></span></div>
      </div>
      <link-editor v-show="buttonGroup === 'link'" :link-editing="buttonGroup === 'link'" :link-obj="linkObj" @link-edit-done="editLinkDone"></link-editor>
    </template>
    <template slot="tools">
      <!-- <button-edit :show.sync="editing" :button.sync="button"></button-edit> -->
    </template>
  </element-common>
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