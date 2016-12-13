<script>
import elementMixin from '../../mixins/elementMixin'

export default {
  mixins: [elementMixin],
  data () {
    return {
      content: this.element.content,
      resize: {
        handles: 's,e'
      }
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
      this.editing = true
      this.buttonGroup = 'edit'
    },
    editDone () {
      this.editing = false
      this.buttonGroup = 'main'
      if (this.element.content !== this.content) {
        this.modifyElement([this.elementId, { content: this.content }])
      }
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
    @drag-start="editDone"
  >
    <div slot="content" v-show="!editing" class="element-html-wrapper">
      <div @dblclick="edit" class="element-html-text"><p class="element-html-title">&lt;HTML&gt;</p><p>在预览模式中查看效果</p></div>
    </div>
    <textarea slot="content" v-show="editing" spellcheck="false" class="form-control" style="height:100%" v-model="content"></textarea>
    
    <template slot="main-buttons-extend">
      <div class="btn btn-primary" title="编辑" @click="edit">编辑</div>
    </template>
    <template slot="button-groups">
      <div v-show="buttonGroup === 'edit'" class="btn-group el-btn-group" role="group">
        <div class="btn btn-success" title="完成编辑" @click="editDone">完成</div>
      </div>
    </template>
  </element-common>
</template>

<style>
.element-html-wrapper {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  background: #eee;
  display: table;
}

.element-html-title {
  font-size: 20px;
  color: #91aa9d;
}

.element-html-text {
  text-align: center;
  display: table-cell;
  vertical-align: middle;
}

.element-html-input {
  height: 100%;
}
</style>