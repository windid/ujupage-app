<template>
  <element-common :element="element" :section-id="sectionId" :element-id="elementId" :button-group.sync="buttonGroup">
    <div slot="content" @dbclick="edit()">
      <img v-bind:src="element.src" width="{{(workspace.version == 'pc') ? element.style.width : element.styleM.width}}" height="auto">
    </div>
    <template slot="main-buttons-extend">
      <button type="button" class="btn btn-primary" title="更换图片">更换图片</button>
      <button type="button" class="btn btn-default" title="链接"><span class="glyphicon glyphicon-link"></span></button>
    </template>
    <template slot="button-groups">
      
    </template>
  </element-common>
</template>
<script>
import { setActiveElementId }  from '../store/actions'
import { getWorkspaceData } from '../store/getters'
import elementCommon from './element-common.vue'

export default {
  //接受父组件传参，element元素属性，sid:板块ID sectionId，eid:元素ID elementId
  props:['element','sectionId','elementId'],
  components: {
    "element-common": elementCommon
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
      buttonGroup:'main'
    }
  },
  methods: {
    edit: function(){
      
    }
  },
  created: function(){
    //this.$parent
  }
}
</script>