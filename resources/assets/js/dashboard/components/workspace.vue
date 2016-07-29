<script>
import pageItem from './pageItem.vue'

export default {
  components: {
    pageItem
  },
  methods: {
    
  }
}
</script>

<template>
  <div id="workspace">
    <page-item v-for="pageItem in [0,1,2,3,4,5,6,7,8,9,10]"></page-item>
  </div>
</template>

<style>
#workspace{
  position:relative;
  margin-left:240px;
  padding:15px;
}
</style>