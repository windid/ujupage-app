<script>
import { setCurrentSectionId,setActiveSectionId,moveSection,removeSection,modifySection }  from '../store/actions'
import { getWorkspaceData } from '../store/getters'

import sectionEdit from './section-edit.vue'

import elementText from './element-text.vue'
import elementImage from './element-image.vue'
import elementButton from './element-button.vue'
import elementForm from './element-form.vue'

import colorMixin from '../mixins/colorMixin.js'

export default {
  mixins: [colorMixin],
  props: ['sectionId', 'section'],
  components: {
    elementText,
    elementImage,
    elementButton,
    elementForm,
    sectionEdit
  },
  data (){
    return {
      sectionEditing: false,
    }
  },
  methods:{
    editSection: function() {
      this.sectionEditing = true;
      this.setActiveSectionId(this.sectionId);
    },
    sectionEditDone: function() {
      this.sectionEditing = false;
      this.setActiveSectionId(null);
    }
  },
  vuex: {
    actions: {
      setCurrentSectionId,
      setActiveSectionId,
      removeSection,
      moveSection,
      modifySection
    },
    getters: {
      workspace: getWorkspaceData,
    }
  },
  ready:function() {
  }
}
</script>

<template>
  <div  
    class="page-section" 
    :style="{
      height:section.style[workspace.version]['height'],
      backgroundColor:getColor(section.style[workspace.version]['background-color']),
      borderColor:getColor(section.style[workspace.version]['border-color']),
      borderWidth:'0',
      borderTopWidth:section.style[workspace.version]['border-width'] + 'px',
      borderBottomWidth:section.style[workspace.version]['border-width'] + 'px',
      borderStyle:'solid'
    }"  
    v-on:mouseenter="setCurrentSectionId(sectionId)"
    v-on:mouseleave="setCurrentSectionId('')"
  >
    <div class="editable-area" :style="{width: workspace.width + 'px'}">
      <!-- 页面元素组件 -->
      <component v-for="(elementId,element) in section.elements" :is="'element-' + element.type" :element="element" :section-id="sectionId" :element-id="elementId"></component>
      <!-- 板块操作按钮组 -->
      <div class="btn-group-vertical page-section-operation" role="group" v-show="workspace.currentSectionId==sectionId" transition="fade" :style="{left: workspace.width + 5 + 'px'}">
        <template v-if="workspace.activeSectionId === sectionId">
          <div class="btn btn-success" title="完成" @click="sectionEditDone"><span class="glyphicon glyphicon-ok"></span></div>
        </template>
        <template v-if="(workspace.activeSectionId !== sectionId)">
          <div class="btn btn-primary" title="修改" @click.stop="editSection"><span class="glyphicon glyphicon-pencil"></span></div>
          <div class="btn btn-default" title="上移" @click="moveSection('up',sectionId)"><span class="glyphicon glyphicon-chevron-up"></span></div>
          <div class="btn btn-default" title="下移" @click="moveSection('down',sectionId)"><span class="glyphicon glyphicon-chevron-down"></span></div>
          <div class="btn btn-default" title="删除" @click="removeSection(sectionId)"><span class="glyphicon glyphicon-trash"></span></div>
        </template>
      </div>
    </div>
    <section-edit :show.sync="sectionEditing" :section-id="sectionId" ></section-edit>
    <div class="resize-line"></div>
    <div class="resize-line-wrap"></div>
  </div>
</template>