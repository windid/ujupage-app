<script>
import projects from './projects.vue'

export default {
  components: {
    projects
  },
  methods: {
    
  }
}
</script>

<template>
  <div id="sidebar">
    <projects></projects>
  </div>
</template>

<style lang="sass" scoped>
@import "../../../sass/config";

#sidebar{
  position:fixed;
  width:240px;
  top:55px;
  height:calc(100% - 55px);
  bottom:0;
  border-right:1px solid $main-block-border-color;
  @extend .shadow;
}
</style>