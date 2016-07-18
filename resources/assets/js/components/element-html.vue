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
        handles: 'e'
      }
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
  <element-common :element="element" :section-id="sectionId" :element-id="elementId" :button-group.sync="buttonGroup" :draggable.sync="draggable" :resize="resize">
    <div slot="content">
      <div v-show="!editing" @dblclick="edit">HTML<br>在预览模式中可以查看渲染效果</div>
      <textarea v-show="editing" spellcheck="false" class="form-control" v-model="content"></textarea>
    </div>
    
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