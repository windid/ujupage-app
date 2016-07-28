<template>
  <div>
    <common-header></common-header>
    <div id="main-wrapper">
      <div id="main">
        <div id="sidebar"></div>
        <div id="content"></div>
      </div> 
    </div>
    <div id="footer-wrapper">
      <div id="footer"></div>
    </div>
  </div>
</template>

<script>
import commonHeader from '../../common/header.vue'
import store from '../vuex/store'

export default {
  components: {
    commonHeader
  },
  vuex: {
    actions: {
      
    }
  },
  store,
  methods: {
    
  }
}
</script>

