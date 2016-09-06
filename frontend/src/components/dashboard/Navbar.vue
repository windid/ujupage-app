<script>
import Projects from './Projects.vue'

export default {
  components: {
    Projects
  },
  methods: {

  }
}
</script>

<template>
  <div class="navbar">
    <projects></projects>
  </div>
</template>

<style>
.navbar{
  position:fixed;
  width:240px;
  top:50px;
  height:calc(100% - 50px);
  bottom:0;
  border-right:1px solid #ddd;
  box-shadow: 0 0 8px #ddd;
  background: #f5f5f5;
}
</style>