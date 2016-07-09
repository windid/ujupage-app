<script>
import { setActiveElementId }  from '../store/actions'
import { getWorkspaceData } from '../store/getters'
import elementCommon from './element-common.vue'
import colorPicker from './color-picker.vue'
import colorMixin from '../mixins/colorMixin.js'

export default {
  //接受父组件传参，element元素属性，sid:板块ID sectionId，eid:元素ID elementId
  props:['element','sectionId','elementId'],
  mixins: [colorMixin],
  components: {
    elementCommon,
    colorPicker
  },
  vuex: {
    actions: {
      
    },
    getters: {
      workspace: getWorkspaceData,
    }
  },
  data (){
    return {
      buttonGroup:'main',
      editing: false,
      fontColor:"3"
    }
  },
  computed:{
    draggable: function(){
      return !this.editing;
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
      this.$els.content.setAttribute("contenteditable" ,false);
    }
  },
  watch: {
    'workspace.activeElementId': function(val){
      if (val !== this.elementId) this.editDone();
    }
  }
}
</script>

<template>
  <element-common :element="element" :section-id="sectionId" :element-id="elementId" :button-group.sync="buttonGroup" :draggable.sync="draggable">
    <div v-el:content slot="content" @dblclick="edit" contenteditable="false" :style="{cursor:editing ? 'text' : 'default'}">
      {{{element.content}}}
    </div>
    <template slot="main-buttons-extend">
      <div class="btn btn-primary" title="编辑" @click="edit">编辑</div>
    </template>
    <template slot="button-groups">
      <div v-show="buttonGroup === 'edit'" class="btn-group el-btn-group" role="group">
        <color-picker :color.sync="fontColor">
          <div class="btn btn-default" data-toggle="dropdown" title="颜色"><span class="glyphicon glyphicon-text-color"></span> <span class="caret"></span></div>
        </color-picker>
        <div class="btn btn-default" title="字号"><span class="glyphicon glyphicon-text-size"></span> <span class="caret"></span></div>
        <div class="btn btn-default" title="行高"><span class="glyphicon glyphicon-text-height"></span> <span class="caret"></span></div>
        <div class="btn btn-default" title="对齐"><span class="glyphicon glyphicon-align-left"></span> <span class="caret"></span></div>
        <div class="btn btn-default" title="加粗">B</div>
        <div class="btn btn-default" title="斜体"><i>I</i></div>
        <div class="btn btn-default" title="斜体"><u>U</u></div>
        <div class="btn btn-default" title="链接"><span class="glyphicon glyphicon-link"></span></div>
        <div class="btn btn-success" title="完成编辑" @click="editDone">完成</div>
      </div>
    </template>
  </element-common>
</template>