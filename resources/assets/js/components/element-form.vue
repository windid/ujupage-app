<script>
import { modifyElement }  from '../store/actions'
import { getWorkspaceData } from '../store/getters'
import elementCommon from './element-common.vue'
import elementButton from './element-button.vue'


export default {
  //接受父组件传参，element元素属性，sectionId:板块ID，elementId:元素ID
  props:['element','sectionId','elementId'],
  components: {
    elementCommon,
    elementButton
  },
  vuex: {
    actions: {
      modifyElement
    },
    getters: {
      workspace: getWorkspaceData,
    }
  },
  methods:{
    edit: function(){

    }
  },
  data (){
    return {
      buttonGroup:'main'
    }
  },
}
</script>
  
<template>
  <element-common :element="element" :section-id="sectionId" :element-id="elementId" :button-group.sync="buttonGroup" :draggable.sync="draggable">
    <div slot="content">
      123
    </div>
    <template slot="main-buttons-extend">
      <div class="btn btn-primary" title="编辑" @click="edit">编辑</div>
    </template>
    <template slot="button-groups">
      
    </template>
  </element-common>
</template>