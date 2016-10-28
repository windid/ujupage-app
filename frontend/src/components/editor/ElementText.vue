<script>
import ElementCommon from './ElementCommon'
import colorMixin from '../../mixins/colorMixin.js'
import ColorPicker from './ColorPicker'
import FontSize from './FontSize'
import LineHeight from './LineHeight'
import TextAlign from './TextAlign'
import { mapGetters, mapActions } from 'vuex'
import { merge, isEqual } from 'lodash'

export default {
  props: ['element', 'sectionId', 'elementId'],
  mixins: [colorMixin],
  components: {
    ElementCommon,
    ColorPicker,
    FontSize,
    LineHeight,
    TextAlign
  },
  data () {
    return {
      // 初始加载主按钮组
      buttonGroup: 'main',
      // 是否处于编辑状态
      editing: false,
      textElement: merge({}, this.element),
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
      return !this.editing && this.draggableFromChild
    },
    resizable () {
      return (!this.editing && this.workspace.activeElementId === this.elementId)
    }
  },
  methods: {
    ...mapActions([
      'modifyElement'
    ]),
    edit () {
      if (this.editing) return

      this.editing = true
      this.changeDraggable(false)
      this.buttonGroup = 'edit'
      this.$nextTick(() => {
        const contentBox = this.$refs.content
        contentBox.setAttribute('contenteditable', true)
        contentBox.focus()
        const range = window.getSelection()
        range.selectAllChildren(contentBox)
        range.collapseToEnd()
      })
    },
    editDone () {
      this.editing = false
      this.buttonGroup = 'main'
      this.textElement.content = this.$refs.content.innerHTML
      this.changeDraggable(true)

      if (!isEqual(this.element, this.textElement)) {
        this.modifyElement([this.elementId, this.textElement])
      }
    },
    changeButtonGroup (val) {
      this.buttonGroup = val
    },
    changeDraggable (val) {
      this.draggableFromChild = val
    },
    merge: merge
  },
  watch: {
    'workspace.activeElementId': function (val) {
      if (val !== this.elementId && this.editing) this.editDone()
    },
    'element': function (val) {
      this.textElement = merge({}, val)
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
    @change-button-group="changeButtonGroup" 
    @change-draggable="changeDraggable"
  >
    <div 
      class="element-text-content" 
      ref="content" slot="content" 
      @dblclick="edit" 
      :contenteditable="editing" 
      spellcheck="false" 
      :style="merge({}, textElement.fontStyle, {
        cursor: editing ? 'text' : 'pointer',
        color: getColor(textElement.fontStyle.color)
      })"
      v-html="textElement.content"
    >
    </div>
    <template slot="main-buttons-extend">
      <div class="btn btn-primary" title="编辑" @click="edit">编辑</div>
    </template>
    <template slot="button-groups">
      <div v-show="buttonGroup === 'edit'" class="btn-group el-btn-group">
        <color-picker v-model="textElement.fontStyle.color">
          <div class="btn btn-default dropdown-toggle" data-toggle="dropdown" title="颜色" ><span class="glyphicon glyphicon-text-color" :style="{color:getColor(textElement.fontStyle.color)}"></span> <span class="caret"></span></div>
        </color-picker>
        <font-size v-model="textElement.fontStyle.fontSize"></font-size>
        <line-height v-model="textElement.fontStyle.lineHeight"></line-height>
        <text-align v-model="textElement.fontStyle.textAlign"></text-align>
        <!-- <div class="btn btn-default" title="加粗">B</div>
        <div class="btn btn-default" title="斜体"><i>I</i></div>
        <div class="btn btn-default" title="下划线"><u>U</u></div>
        <div class="btn btn-default" title="链接"><span class="glyphicon glyphicon-link"></span></div> -->
        <div class="btn btn-success" title="完成编辑" @click="editDone">完成</div>
      </div>
    </template>
  </element-common>
</template>

<style>
.element-text-content {
  outline:none
}

.element-text-content p{
  margin:0;
}
</style>