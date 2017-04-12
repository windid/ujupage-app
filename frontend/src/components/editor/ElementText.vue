<script>
import elementMixin from 'mixins/elementMixin'
import colorMixin from 'mixins/colorMixin'
import ColorPicker from './ColorPicker'
import FontSize from './FontSize'
import LineHeight from './LineHeight'
import TextAlign from './TextAlign'
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

function clearSelection () {
  if (window.getSelection) {
    const sel = window.getSelection()
    sel.removeAllRanges()
  }
}

function detectSelection (el) {
  const r = {
    link: false,
    color: []
  }
  if (window.getSelection) {
    var sel = window.getSelection()
    if (sel.rangeCount > 0) {
      const range = sel.getRangeAt(0)
      const nodes = range.cloneContents().querySelectorAll('*')
      Array.prototype.forEach.call(nodes, (e) => {
        // 检查是否包含 <a> 标签
        if (!r.link && e.tagName === 'A') {
          r.link = true
        }
        // 检查该范围内含有的颜色
        if (e.tagName === 'FONT') {
          const color = e.getAttribute('color')
          if (color) {
            r.color.push(color)
          }
        }
      })
    }
  }
  return r
}

export default {
  mixins: [colorMixin, elementMixin],
  components: {
    ColorPicker,
    FontSize,
    LineHeight,
    TextAlign
  },
  data () {
    return {
      addingLink: false,
      linkAddress: '',
      userSelection: null,
      linkSelected: false,
      localColor: 1
    }
  },
  computed: {
    // 编辑状态不允许拖动
    draggable () {
      return !this.editing && this.draggableFromChild
    }
  },
  methods: {
    edit () {
      if (this.editing) return

      this.editing = true
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
      this.localElement.content = this.$refs.content.innerHTML

      if (!isEqual(this.element, this.localElement)) {
        this.modifyElement([this.elementId, this.localElement])
      }
      this.addingLink = false
      this.userSelection = null
      clearSelection()
    },
    styleColor (color) {
      execCommand('styleWithCSS', false, true)
      execCommand('foreColor', false, color)
    },
    styleText (action) {
      execCommand(action, false)
    },
    link () {
      this.linkAddress = ''
      if (detectSelection(this.$el).link) {
        execCommand('unlink', false)
        this.linkSelected = false
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
        this.userSelection = null
        this.$refs.content.focus()
        if (this.linkAddress) {
          execCommand('createLink', false, this.linkAddress)
          this.linkSelected = true
        }
      }, 10)
    },
    cancelLink () {
      this.addingLink = false
      setTimeout(() => {
        restoreSelection(this.userSelection)
        this.userSelection = null
        this.$refs.content.focus()
      }, 10)
    },
    onPaste (event) {
      event.preventDefault()
      const text = event.clipboardData.getData('text/plain')
      document.execCommand('insertHTML', false, text)
    },
    contentDragStart (e) {
      if (e.target.nodeName.toUpperCase() === 'A') {
        e.preventDefault()
        return false
      }
    },
    contentMouseUp (e) {
      const detection = detectSelection(this.$refs.content)
      this.linkSelected = detection.link
      if (detection.color.length === 1) {
        this.localColor = this.getColor(detection.color[0])
      } else {
        this.localColor = 1
      }
    },
    colorInputFocus () {
      this.userSelection = saveSelection()
    },
    colorInput (val, fromInputElement) {
      if (!fromInputElement) {
        if (this.userSelection) {
          restoreSelection(this.userSelection)
          this.userSelection = null
        }
        this.styleColor(this.getColor(val))
      }
    },
    merge: merge
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
  >
    <div 
      class="element-text-content" 
      ref="content" slot="content" 
      v-html="localElement.content"
      @dblclick="edit" 
      @click.prevent
      @dragstart="contentDragStart"
      @mouseup="contentMouseUp"
      @paste="onPaste"
      :contenteditable="editing" 
      spellcheck="false" 
      :style="merge({}, localElement.fontStyle, {
        cursor: editing ? 'text' : 'pointer',
        color: getColor(localElement.fontStyle.color)
      })"
    >
    </div>
    <template slot="main-buttons-extend">
      <div class="btn btn-primary" title="编辑" @click="edit">编辑</div>
    </template>
    <template slot="button-groups">
      <div v-show="buttonGroup === 'edit' && !addingLink" class="btn-group el-btn-group"
      @mousedown.prevent>
        <color-picker v-model="localColor" @inputFocus="colorInputFocus" @input="colorInput">
          <tooltip class="btn btn-default dropdown-toggle" data-toggle="dropdown" content="颜色" >
            <div>
              <span class="glyphicon glyphicon-text-color" :style="{color:getColor(localColor)}"></span> 
            </div>
          </tooltip>
        </color-picker>
        <font-size v-model="localElement.fontStyle.fontSize"></font-size>
        <line-height v-model="localElement.fontStyle.lineHeight"></line-height>
        <text-align v-model="localElement.fontStyle.textAlign"></text-align>
        <tooltip class="btn btn-default" content="加粗" @click.native="styleText('bold')"><div>B</div></tooltip>
        <tooltip class="btn btn-default" content="斜体" @click.native="styleText('italic')"><i>I</i></tooltip>
        <tooltip class="btn btn-default" content="下划线" @click.native="styleText('underline')"><u>U</u></tooltip>
        <tooltip class="btn btn-default" :class="{unlink: linkSelected}" content="链接" @click.native="link">
          <div><span class="glyphicon glyphicon-link" :class="{unlink: linkSelected}"></span></div>
        </tooltip>
        <div class="btn btn-success" title="完成编辑" @click="editDone">完成</div>
      </div>
      <div v-show="buttonGroup === 'edit' && addingLink" class="el-btn-group form-inline form-createlinks"
      @mousedown.prevent>
        <div class="btn-group">
          <input type="text" class="form-control" placeholder="所要添加的链接地址" v-model="linkAddress" ref="linkAddressInput" @mousedown.stop></input>
        </div>
        <button type="submit" class="btn btn-default" @click.stop="cancelLink">取消</button>
        <button type="submit" class="btn btn-success" @click.stop="addLink">添加</button>
      </div>
    </template>
  </element-common>
</template>

<style>
[contenteditable] {
  user-select: text;
}
[contenteditable="false"] {
  user-select: none; 
}
.element-text-content {
  outline:none
}
.element-text-content *::selection {
  background: #337ab7;
  color: #fff;
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

.btn.unlink {
  background-color: #eee;
}
.glyphicon.unlink {
  text-decoration: line-through;
}
</style>