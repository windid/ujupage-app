<style>

</style>

<template>
  <sidebar :show.sync="show">
    
    <div slot="header">
      <button class="btn btn-success btn" @click="show = false">&nbsp; 完成 &nbsp;</button>
      <button type="button" class="close fr" aria-label="Close" @click="show = false"><span aria-hidden="true">&times;</span></button>
    </div>
    <div slot="body">
      
    </div>
      
  </sidebar>
</template>

<script>
import {  }  from '../store/actions'
import { getWorkspaceData, getColorSet } from '../store/getters'
import sidebar from './sidebar.vue'

export default {
  name:'sectionEdit',
  components: {
    sidebar
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      twoWay: true    
    }
  },
  data (){
    return {
      currentTab: 'seo'
    }
  },
  methods:{
    
  },
  vuex: {
    actions: {
      
    },
    getters: {
      workspace: getWorkspaceData,
      colorSet: getColorSet
    }
  }
}
</script>