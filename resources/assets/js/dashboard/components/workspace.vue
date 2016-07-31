<script>
import pageItem from './pageItem.vue'
import { mapGetters, mapActions } from '../../vendor/vuex-2.0.0'

export default {
  components: {
    pageItem
  },
  computed: mapGetters({
    workspace: 'workspace',
    pages: 'allPages'
  }),
  methods: {
    
  }
}
</script>

<template>
  <div id="workspace">
    <div v-if="workspace.loadStatus" class="loading"></div>
    <page-item v-for="pageItem in pages" :page-item="pageItem"></page-item>
  </div>
</template>

<style>
#workspace{
  position:relative;
  height:100%;
  margin-left:240px;
  padding:15px;
}
</style>