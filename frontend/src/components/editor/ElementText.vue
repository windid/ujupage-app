<script>
import ElementCommon from './ElementCommon'
import colorMixin from '../../mixins/colorMixin.js'
import ColorPicker from './ColorPicker'
import FontSize from './FontSize'
import LineHeight from './LineHeight'
import TextAlign from './TextAlign'
import { mapGetters, mapActions } from 'vuex'
import { merge, isEqual } from 'lodash'

function execCommand (...args) {
  const selection = document.getSelection()
  if (selection.toString().length > 0) {
    document.execCommand(...args)
  }
}

function saveSelection () {
  if (window.getSelection) {
    var sel = window.getSelection()
    if (sel.getRangeAt && sel.rangeCount) {
      var ranges = []
      for (var i = 0, len = sel.rangeCount; i < len; ++i) {
        ranges.push(sel.getRangeAt(i))
      }
      return ranges
    }
  } else if (document.selection && document.selection.createRange) {
    return document.selection.createRange()
  }
  return null
}

function restoreSelection (savedSel) {
  if (savedSel) {
    if (window.getSelection) {
      var sel = window.getSelection()
      sel.removeAllRanges()
      for (let i = 0, len = savedSel.length; i < len; ++i) {
        sel.addRange(savedSel[i])
      }
    } else if (document.selection && savedSel.select) {
      savedSel.select()
    }
  }
}

function detectSelection (el) {
  const r = {
    link: false
  }
  if (window.getSelection) {
    var sel = window.getSelection()
    var nodes = el.getElementsByTagName('*')
    Array.prototype.forEach.call(nodes, (e) => {
      // 检查是否包含 <a> 标签
      if (e.tagName === 'A') {
        if (sel.containsNode(e, true)) {
          r.link = true
        }
      }
    })
  }
  return r
}

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
      draggableFromChild: true,
      addingLink: false,
      linkAddress: '',
      userSelection: null,
      linkSelected: false
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
  mounted () {
    const self = this
    this.$refs.content.innerHTML = this.textElement.content
    this.$refs.content.addEventListener('dragstart', function (e) {
      if (e.target.nodeName.toUpperCase() === 'A') {
        e.preventDefault()
        return false
      }
    })
    this.$refs.content.addEventListener('mouseup', function (e) {
      const l = detectSelection(self.$refs.content).link
      self.linkSelected = l
    })
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
      this.addingLink = false
    },
    changeButtonGroup (val) {
      this.buttonGroup = val
    },
    changeDraggable (val) {
      this.draggableFromChild = val
    },
    styleColor (color) {
      execCommand('foreColor', false, color)
    },
    styleText (action) {
      execCommand(action, false)
    },
    link () {
      this.linkAddress = ''
      if (detectSelection(this.$el).link) {
        execCommand('unlink', false)
        return
      }
      this.userSelection = saveSelection()
      this.addingLink = true
      setTimeout(() => {
        this.$refs.linkAddressInput.focus()
      }, 10)
    },
    addLink () {
      this.addingLink = false
      setTimeout(() => {
        restoreSelection(this.userSelection)
        this.$refs.content.focus()
        if (this.linkAddress) {
          execCommand('createLink', false, this.linkAddress)
        }
      }, 10)
    },
    cancelLink () {
      this.addingLink = false
      setTimeout(() => {
        restoreSelection(this.userSelection)
        this.$refs.content.focus()
      }, 10)
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
      @click.prevent
      :contenteditable="editing" 
      spellcheck="false" 
      :style="merge({}, textElement.fontStyle, {
        cursor: editing ? 'text' : 'pointer',
        color: getColor(textElement.fontStyle.color)
      })"
    >
    </div>
    <template slot="main-buttons-extend">
      <div class="btn btn-primary" title="编辑" @click="edit">编辑</div>
    </template>
    <template slot="button-groups">
      <div v-show="buttonGroup === 'edit' && !addingLink" class="btn-group el-btn-group">
        <color-picker v-model="textElement.fontStyle.color">
          <div class="btn btn-default dropdown-toggle" data-toggle="dropdown" title="颜色" ><span class="glyphicon glyphicon-text-color" :style="{color:getColor(textElement.fontStyle.color)}"></span> <span class="caret"></span></div>
        </color-picker>
        <font-size v-model="textElement.fontStyle.fontSize"></font-size>
        <line-height v-model="textElement.fontStyle.lineHeight"></line-height>
        <text-align v-model="textElement.fontStyle.textAlign"></text-align>
        <div class="btn btn-default" title="加粗" @click="styleText('bold')">B</div>
        <div class="btn btn-default" title="斜体" @click="styleText('italic')"><i>I</i></div>
        <div class="btn btn-default" title="下划线" @click="styleText('underline')"><u>U</u></div>
        <div class="btn btn-default" title="链接" @click="link"><span class="glyphicon glyphicon-link" :class="{unlink: linkSelected}"></span></div>
        <div class="btn btn-success" title="完成编辑" @click="editDone">完成</div>
      </div>
      <div v-show="buttonGroup === 'edit' && addingLink" class="el-btn-group form-inline form-createlinks">
        <div class="btn-group">
          <input type="text" class="form-control" placeholder="所要添加的链接地址" v-model="linkAddress" ref="linkAddressInput"></input>
        </div>
        <button type="submit" class="btn btn-default" @click.stop="cancelLink">取消</button>
        <button type="submit" class="btn btn-success" @click.stop="addLink">添加</button>
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

.form-createlinks .btn-group {
  box-shadow: none;
}

.form-createlinks input {
  height: 33px;
  border-radius: 4px 0 0 4px;
  border-right: none !important;
}

.form-createlinks button {
  border-radius: 0;
}

.form-createlinks button:last-child {
  border-radius: 0 4px 4px 0;
}

.form-createlinks input:focus {
  outline: none;
  box-shadow: none;
  border: 1px solid #ccc;
}

.glyphicon.unlink {
  text-decoration: line-through;
}
</style>