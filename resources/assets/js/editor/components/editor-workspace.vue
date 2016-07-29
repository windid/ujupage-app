<script>
import { getWorkspaceData,getSections } from '../store/getters'
import pageSection from './page-section.vue'
// import {max} from 'lodash'

export default {
  components: {
    pageSection
  },
  data (){
    return {
      
    }
  },
  methods:{
    
  },
  vuex: {
    actions: {
      
    },
    getters: {
      workspace: getWorkspaceData,
      sections: getSections,
    }
  }
}
</script>

<template>
  <div class="workspace">
    <div id="content-area" :style="{height: workspace.height + 'px', width: (workspace.width) + 'px', marginLeft:(-workspace.width/2) +'px'}"></div>
    <page-section v-for="(sectionId, section) in sections" track-by="id" :section-id="sectionId", :section="section"></page-section>
  </div>
  <div style="height:20px;"></div>
</template>