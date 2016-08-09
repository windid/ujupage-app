<script>
import { modifyElement }  from '../store/actions'
import { getWorkspaceData } from '../store/getters'
import elementCommon from './element-common.vue'
import colorPicker from './color-picker.vue'
import fontSize from './font-size.vue'
import lineHeight from './line-height.vue'
import textAlign from './text-align.vue'
import colorMixin from '../mixins/colorMixin.js'
import {merge} from 'lodash'

export default {
  //接受父组件传参, element 元素属性, sectionId 板块ID, elementId 元素ID
  props:['element','sectionId','elementId'],
  mixins: [colorMixin],
  components: {
    elementCommon,
    colorPicker,
    fontSize,
    lineHeight,
    textAlign
  },
  vuex: {
    actions: {
      modifyElement
    },
    getters: {
      workspace: getWorkspaceData,
    }
  },
  data (){
    return {
      buttonGroup:'main',
      editing: false,
      textElement: {
        content: this.element.content,
        fontStyle: merge({}, this.element.fontStyle)
      },
      changed: false,
      resize: {
      }
    }
  },
  computed:{
    draggable: function(){
      return !this.editing;
    },
    resizable: function(){
      return (!this.editing && this.workspace.activeElementId === this.elementId);
    }
  },
  methods: {
    edit: function(){
      if (this.editing === false){
        this.editing = true;
        this.buttonGroup = 'edit';
        let contentBox = this.$els.content;
        contentBox.setAttribute("contenteditable" ,true);
        contentBox.focus();
        let range = window.getSelection();
        range.selectAllChildren(contentBox);
        range.collapseToEnd();
      }
    },
    editDone: function(){
      this.editing = false;
      this.buttonGroup = 'main';
      
      if (this.changed){
        this.modifyElement(this.elementId, this.textElement);
        this.changed = false;
      }
    }
  },
  watch: {
    'workspace.activeElementId': function(val){
      if (val !== this.elementId && this.editing) this.editDone();
    },
    'textElement':{
      deep: true,
      handler: function(newVal){
        this.changed = true;
      }
    }
  }
}
</script>

<template>
  <element-common :element="element" :section-id="sectionId" :element-id="elementId" :button-group.sync="buttonGroup" :draggable.sync="draggable" :resize="resize" :resizable.sync="resizable">
    <div class="element-text-content" v-el:content slot="content" @dblclick="edit" contenteditable="{{editing}}" spellcheck="false" style="outline:none" :style="[textElement.fontStyle,{cursor:editing ? 'text' : 'pointer',color:getColor(textElement.fontStyle.color)}]" v-content="textElement.content">
    </div>
    <template slot="main-buttons-extend">
      <div class="btn btn-primary" title="编辑" @click="edit">编辑</div>
    </template>
    <template slot="button-groups">
      <div v-show="buttonGroup === 'edit'" class="btn-group el-btn-group" role="group" style="min-width:300px;">
        <color-picker :color.sync="textElement.fontStyle.color">
          <div class="btn btn-default dropdown-toggle" data-toggle="dropdown" title="颜色" ><span class="glyphicon glyphicon-text-color" :style="{color:getColor(textElement.fontStyle.color)}"></span> <span class="caret"></span></div>
        </color-picker>
        <font-size :font-size.sync="textElement.fontStyle.fontSize"></font-size>
        <line-height :line-height.sync="textElement.fontStyle.lineHeight"></line-height>
        <text-align :text-align.sync="textElement.fontStyle.textAlign"></text-align>
        <!-- <div class="btn btn-default" title="加粗">B</div>
        <div class="btn btn-default" title="斜体"><i>I</i></div>
        <div class="btn btn-default" title="斜体"><u>U</u></div>
        <div class="btn btn-default" title="链接"><span class="glyphicon glyphicon-link"></span></div> -->
        <div class="btn btn-success" title="完成编辑" @click="editDone">完成</div>
      </div>
    </template>
  </element-common>
</template>

<style>
.element-text-content p{
  margin:0;
}
</style>