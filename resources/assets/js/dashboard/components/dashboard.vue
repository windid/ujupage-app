<script>

import commonHeader from '../../layout/header.vue'
import sidebar from './sidebar.vue'
import workspace from './workspace.vue'
import { mapGetters, mapActions } from '../../vendor/vuex-2.0.0'

export default {
  components: {
    commonHeader,
    sidebar,
    workspace
  },
  computed: {

  },
  methods: mapActions([
    'init'
  ]),
  created (){
    this.init();
  }
}
</script>

<template>
  <div id="page">
    <common-header></common-header>
    <div id="main">
      <sidebar></sidebar>
      <workspace></workspace>
    </div> 
  </div>
</template>

<style>
  #main{
    position:relative;
    top:55px;
  }
</style>