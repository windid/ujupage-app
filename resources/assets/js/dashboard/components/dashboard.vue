<script>

import commonHeader from '../../layout/header.vue'
import sidebar from './sidebar.vue'
import workspace from './workspace.vue'
import messageBox from '../../ui/messageBox.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    commonHeader,
    sidebar,
    workspace,
    messageBox
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
    <message-box></message-box>
  </div>
</template>

<style>
  #main{
    position:relative;
    top:55px;
  }
</style>