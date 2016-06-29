<template>
  <element-common :element="element" :section-id="sectionId" :element-id="elementId" :button-group.sync="buttonGroup">
    <div slot="content" @dblclick="edit">
      {{{element.content}}}
    </div>
    <template slot="main-buttons-extend">
      <button type="button" class="btn btn-primary" title="编辑" @click="edit">编辑</button>
    </template>
    <template slot="button-groups">
      <div v-show="buttonGroup == 'edit'" class="btn-group el-btn-group" role="group">
        <color-picker :color.sync="fontColor"><button type="button" class="btn btn-default" data-toggle="dropdown" title="颜色"><span class="glyphicon glyphicon-text-color"></span> <span class="caret"></span></button></color-picker>
        <button type="button" class="btn btn-default" title="字号"><span class="glyphicon glyphicon-text-size"></span> <span class="caret"></span></button>
        <button type="button" class="btn btn-default" title="行高"><span class="glyphicon glyphicon-text-height"></span> <span class="caret"></span></button>
        <button type="button" class="btn btn-default" title="对齐"><span class="glyphicon glyphicon-align-left"></span> <span class="caret"></span></button>
        <button type="button" class="btn btn-default" title="加粗">B</button>
        <button type="button" class="btn btn-default" title="斜体"><i>I</i></button>
        <button type="button" class="btn btn-default" title="斜体"><u>U</u></button>
        <button type="button" class="btn btn-default" title="链接"><span class="glyphicon glyphicon-link"></span></button>
        <button type="button" class="btn btn-success" title="完成编辑">完成</button>
      </div>
    </template>
  </element-common>
</template>
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
      fontColor:"3"
    }
  },
  methods: {
    edit: function(event){
      //event.stopPropagation();
      this.buttonGroup = 'edit';
    }
  }
}
</script>