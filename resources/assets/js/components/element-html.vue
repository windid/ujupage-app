<script>
import { modifyElement }  from '../store/actions'
import { getWorkspaceData } from '../store/getters'
import elementCommon from './element-common.vue'
import {merge} from 'lodash'

export default {
  //接受父组件传参, element 元素属性, sectionId 板块ID, elementId 元素ID
  props:['element','sectionId','elementId'],
  components: {
    elementCommon,
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
      content: this.element.content,
      resize: {
        handles: 's,e'
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
      }
    },
    editDone: function(){
      this.editing = false;
      this.buttonGroup = 'main';
      
      if (this.element.content !== this.content){
        this.modifyElement(this.sectionId, this.elementId, {content:this.content});
      }
    }
  },
  watch: {
    'workspace.activeElementId': function(val){
      if (val !== this.elementId && this.editing) this.editDone();
    }
  }
}
</script>

<template>
  <element-common :element="element" :section-id="sectionId" :element-id="elementId" :button-group.sync="buttonGroup" :draggable.sync="draggable" :resize="resize" :resizable="resizable">
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
.element-html-wrapper{
  width: 100%;
  height: 100%;
  border:1px solid #ccc;
  background: #eee;
  display: table;
}

.element-html-title{
  font-size:20px;
  color:#91aa9d;
}

.element-html-text{
  text-align: center;
  display: table-cell;
  vertical-align: middle;
}

.element-html-input{
  height: 100%;
}
</style>
