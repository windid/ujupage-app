<template>
  <div class="workspace" :style="{height: workspace.height + 10 + 'px'}">
    <div id="content-area" :style="{height: workspace.height + 'px', width: (workspace.width-2) + 'px', marginLeft:(-workspace.width/2 + 1) +'px'}"></div>
    <div v-for="(sectionId, section) in sections" class="page-section" :style="(workspace.version == 'pc') ? section.style : section.styleM"  v-on:mouseover="setCurrentSectionId(sectionId)">
      <div class="editable-area" :style="{width: workspace.width + 'px'}">
        <!-- 页面元素组件 -->
        <component v-for="(elementId,element) in section.elements" :is="'element-' + element.type" :element="element" :section-id="sectionId" :element-id="elementId"></component>
        <!-- 板块操作按钮组 -->
        <div class="btn-group page-section-operation" role="group" v-show="workspace.currentSectionId==sectionId" transition="fade" :style="{left: workspace.width + 5 + 'px'}">
          <button type="button" class="btn btn-primary" title="修改" @click="showSectionEdit = true"><span class="glyphicon glyphicon-pencil"></span></button>
          <button type="button" class="btn btn-default" title="上移" @click="moveSection('up',sectionId)"><span class="glyphicon glyphicon-chevron-up"></span></button>
          <button type="button" class="btn btn-default" title="下移" @click="moveSection('down',sectionId)"><span class="glyphicon glyphicon-chevron-down"></span></button>
          <button type="button" class="btn btn-default" title="删除" @click="removeSection(sectionId)"><span class="glyphicon glyphicon-trash"></span></button>
        </div>
      </div>
    </div>
    <div style="height:60px;"></div>
    <section-edit :show.sync="showSectionEdit" v-if="showSectionEdit"></section-edit>
  </div>
</template>
<script>
import { setCurrentSectionId,moveSection,removeSection,setActiveElementId }  from '../store/actions'
import { getWorkspaceData,getSections,getColorSet } from '../store/getters'
import elementText from './element-text.vue'
import elementImage from './element-image.vue'
import sectionEdit from './section-edit.vue'

export default {
  name:'editorWorkspace',
  components: {
    "element-text": elementText,
    "element-image": elementImage,
    "section-edit" : sectionEdit
  },
  data (){
    return {
      showSectionEdit: false
    }
  },
  // mixins: [mixin],
  vuex: {
    actions: {
      setActiveElementId,
      setCurrentSectionId,
      removeSection,
      moveSection,
    },
    getters: {
      workspace: getWorkspaceData,
      sections: getSections,
      colorSet: getColorSet
    }
  }
}
</script>