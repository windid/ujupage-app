<script>
import { modifyElement }  from '../store/actions'
import { getWorkspaceData } from '../store/getters'
import elementCommon from './element-common.vue'
import buttonEdit from './button-edit.vue'
import { merge } from 'lodash'
import colorMixin from '../mixins/colorMixin.js'
import linkEdit from './link-edit.vue'

export default {
  //接受父组件传参，element元素属性，sid:板块ID sectionId，eid:元素ID elementId
  props:['element','sectionId','elementId'],
  mixins: [colorMixin],
  components: {
    elementCommon,
    buttonEdit,
    linkEdit
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
      //初始加载主按钮组
      buttonGroup: 'main',
      //是否处于编辑状态
      editing: false,
      //是否被修改
      changed: false,
      //组件实例化时将传入的element参数复制到button中，以避免直接修改store中的状态
      button: {
        text: this.element.text,
        props: merge({}, this.element.props),
      },
      linkObj: merge({}, this.element.link),
      //js模拟css hover伪类效果
      hover: false,
      resize:{
      }
    }
  },
  computed:{
    // 编辑状态不允许拖动
    draggable: function(){
      return !this.editing && this.buttonGroup !== 'link';
    },
    resizable: function(){
      return (!this.editing && this.buttonGroup !== 'link' && this.workspace.activeElementId === this.elementId);
    }
  },
  methods: {
    edit: function(){
      this.editing = true;
      this.buttonGroup = 'edit';
    },
    editLink: function(){
      this.buttonGroup = 'link';
    },
    editDone: function(){
      this.editing = false;
      this.buttonGroup = 'main';
      if (this.changed){
        this.modifyElement(this.sectionId, this.elementId, this.button);
        this.changed = false;
      }
    }
  },
  events:{
    'link-edit-done':function(changed, linkObj){
      if (changed){
        this.linkObj = merge({}, linkObj);
        const newPropsObj = {link:linkObj};
        this.modifyElement(this.sectionId, this.elementId, newPropsObj); 
      }
      this.buttonGroup = 'main';
    },
    'button-edit-done': function(){
      this.editDone();
    }
  },
  watch: {
    'workspace.activeElementId': function(val){
      if (val !== this.elementId) this.editDone();
    },
    'button':{
      deep: true,
      handler: function(val){
        this.changed = true;
      }
    }
  }
}
</script>

<template>
  <element-common :element="element" :section-id="sectionId" :element-id="elementId" :button-group.sync="buttonGroup" :draggable.sync="draggable" :resize="resize" :resizable="resizable">
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
      <link-edit v-show="buttonGroup === 'link'" :link-editing="buttonGroup === 'link'" :link-obj="linkObj"></link-edit>
    </template>
    <template slot="tools">
      <button-edit :show.sync="editing" :button.sync="button"></button-edit>
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