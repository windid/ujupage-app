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

  .fade-enter-active, .fade-leave-active {
    transition: all .3s ease;
    overflow: hidden;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-active {
    padding-left: 10px;
    opacity: 0;
  }

  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-out .5s;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes bounce-out {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }

</style>