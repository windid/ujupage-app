<script>
import AppHeader from '../common/AppHeader.vue'
import Navbar from './Navbar.vue'
import Workspace from './Workspace.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    AppHeader,
    Navbar,
    Workspace
  },
  computed: mapGetters({
    projects: 'allProjects'
  }),
  created () {
    if (this.projects.length === 0) {
      this.$store.dispatch('init')
    }
  }
}

</script>

<template>
  <div>
    <navbar></navbar>
    <workspace></workspace>
  </div>
</template>