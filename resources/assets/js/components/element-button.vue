<script>
import { setActiveElementId, modifyElement }  from '../store/actions'
import { getWorkspaceData } from '../store/getters'
import elementCommon from './element-common.vue'
import sidebar from './sidebar.vue'
import { merge } from 'lodash'
import colorPicker from './color-picker.vue'
import colorMixin from '../mixins/colorMixin.js'
import checkboxButton from './checkbox-button.vue'
import fontSize from './font-size.vue'
import linkEdit from './link-edit.vue'

export default {
  //接受父组件传参，element元素属性，sid:板块ID sectionId，eid:元素ID elementId
  props:['element','sectionId','elementId'],
  mixins: [colorMixin],
  components: {
    elementCommon,
    sidebar,
    colorPicker,
    fontSize,
    checkboxButton,
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
        colors: merge({}, this.element.colors),
        buttonStyle: merge({}, this.element.buttonStyle),
        buttonClass: merge({}, this.element.buttonClass),
        link: merge({}, this.element.link)
      },
      //js模拟css hover伪类效果
      hover: false
    }
  },
  computed:{
    // 编辑状态不允许拖动
    draggable: function(){
      return !this.editing && this.buttonGroup !== 'link';
    },
    borderRadius:{
      set: function(newValue){
        this.button.buttonStyle.borderRadius = newValue + 'px';
      },
      get: function(){
        return parseInt(this.button.buttonStyle.borderRadius);
      }
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
      }
    }
  },
  events:{
    'link-edit-done':function(changed, linkObj){
      if (changed){
        this.button.link = merge({}, linkObj);
        const newPropsObj = {link:linkObj};
        this.modifyElement(this.sectionId, this.elementId, newPropsObj); 
      }
      this.buttonGroup = 'main';
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
  <element-common :element="element" :section-id="sectionId" :element-id="elementId" :button-group.sync="buttonGroup" :draggable.sync="draggable">
    <div slot="content" 
      @dblclick="edit" 
      @mouseenter = "hover = true"
      @mouseleave = "hover = false"
     :style="[
        button.buttonStyle,
        {
          backgroundColor:hover ? getColor(button.colors.hover) : getColor(button.colors.backgroundColor),
          borderColor:getColor(button.colors.borderColor),
          color:getColor(button.colors.fontColor)
        }
      ]" 
      class="element-button"
      :class="{
        'element-button-shadow':button.buttonClass.shadow,
        'element-button-border':button.buttonClass.border,
        'element-button-bold':button.buttonClass.bold
      }">
      {{button.text}}
    </div>
    <sidebar :show.sync="editing" slot="tools">
      <div slot="header">
        <div class="btn btn-success" @click="editDone">&nbsp; 完成 &nbsp;</div>
      </div>
      <div slot="body">
        <div class="sidebar-block">
          <div class="input-group shadow">
            <div class="input-group-addon"> 按钮文字 </div>
            <input type="text" class="form-control input-text-shadow" v-model="button.text">
          </div>
          
        </div>
        <div class="sidebar-block color-groups">

          <color-picker :color.sync="button.colors.backgroundColor">
            <div  data-toggle="dropdown" class="float-color-picker">
              <div class="float-color-block shadow" :style="{background:getColor(button.colors.backgroundColor)}"></div>
              <div class="float-color-block-text">按钮</div>
            </div>
          </color-picker>

          <color-picker :color.sync="button.colors.hover">
            <div  data-toggle="dropdown" class="float-color-picker">
              <div class="float-color-block shadow" :style="{background:getColor(button.colors.hover)}"></div>
              <div class="float-color-block-text">悬停</div>
            </div>
          </color-picker>
          
          <color-picker :color.sync="button.colors.fontColor" :position="'right'">
            <div  data-toggle="dropdown" class="float-color-picker">
              <div class="float-color-block shadow" :style="{background:getColor(button.colors.fontColor)}"></div>
              <div class="float-color-block-text">文字</div>
            </div>
          </color-picker>

          <color-picker :color.sync="button.colors.borderColor" :position="'right'">
            <div  data-toggle="dropdown" class="float-color-picker">
              <div class="float-color-block shadow" :style="{background:getColor(button.colors.borderColor)}"></div>
              <div class="float-color-block-text">边框</div>
            </div>
          </color-picker>

        </div>

        <div class="sidebar-block">
          <div class="input-group font-size-input">
            <div class="input-group-addon">字号</div>
            <div class="input-group-btn">
              <font-size :font-size.sync="button.buttonStyle.fontSize"></font-size>
            </div>
          </div>
          <div class="input-group corner-radius-input shadow">
            <div class="input-group-addon"> 圆角 </div>
            <input type="text" class="form-control input-text-shadow" style="text-align:center" v-model="borderRadius">
          </div>
          <div style="clear:both"></div>
        </div>

        <div class="sidebar-block" style="text-align:center;">
          <checkbox-button :value.sync="button.buttonClass.bold">加粗</checkbox-button> &nbsp; 
          <checkbox-button :value.sync="button.buttonClass.shadow">阴影</checkbox-button> &nbsp; 
          <checkbox-button :value.sync="button.buttonClass.border">边框</checkbox-button>
        </div>
        
      </div>
    </sidebar>
    <template slot="main-buttons-extend">
      <div class="btn btn-primary" title="编辑" @click="edit">编辑</div>
      <div class="btn btn-default" title="链接" @click="editLink"><span class="glyphicon glyphicon-link"></span></div>
    </template>
    <template slot="button-groups">
      <div v-show="buttonGroup === 'edit'" class="btn-group el-btn-group" role="group">
        <div class="btn btn-success" @click="editDone"><span class="glyphicon glyphicon-ok"></span></div>
      </div>
      <link-edit v-show="buttonGroup === 'link'" :link-editing="buttonGroup === 'link'" :link-obj="button.link"></link-edit>
    </template>
  </element-common>
</template>

<style>

.element-button{
  text-align: center;
  cursor:pointer;
  padding:6px;
  border-width: 2px;
}

.element-button-border {
  border-style: solid;
}

.element-button-bold {
  font-weight: bold;
}

.element-button-shadow{
  box-shadow:1px 3px 6px #888;
}

.float-color-picker{
  float:left;
  width:48px;
  text-align: center;
  cursor: pointer;
}

.color-groups .btn-group{
  margin-left:4px;
}

.color-groups .btn-group:first-child{
  margin:0;
}

.float-color-block{
  height:30px;
  width:100%;
  border:2px solid #ccc;
  border-radius: 4px;
}

.font-size-input{
  float:left;
  width:100px;
}

.corner-radius-input{
  float:right;
  width:100px;
}

.float-color-block-text{
  margin-top:4px;
}

</style>