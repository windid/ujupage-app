<script>
import { mapGetters, mapActions } from '../../vendor/vuex-2.0.0'

export default {
  components: {
    
  },
  computed: mapGetters({
    projects: 'allProjects'
  }),
  methods: {
    
  }
}
</script>

<template>
  <div id="sidebar">
    
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
  box-shadow: 0 3px 8px #eee;
}
</style>