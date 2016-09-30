<script>
import AppHeader from '../common/AppHeader.vue'
import Navbar from './Navbar.vue'
import Workspace from './Workspace.vue'

export default {
  components: {
    AppHeader,
    Navbar,
    Workspace
  }
}

</script>

<template>
  <div>
    <navbar></navbar>
    <workspace></workspace>
  </div>
</template>