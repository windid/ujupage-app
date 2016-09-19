<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      load: 'load'
    })
  }
}
</script>

<template>
<div class="load-status">
  <transition name="fade">
    <div v-if="load.status === 'loading'" class="loading">
      <div class="loading-icon small"></div>
    </div>
  </transition>
  <div v-if="load.status === 'failed'">{{load.failedInfo}}</div>
    
</div>
</template>

<style scoped>
.load-status {
  position: fixed;
  z-index: 1020000;
  left: 50%;
  top: 15px;
  min-height:18px;
  transform: translate(-50%, 0); 
}
</style>