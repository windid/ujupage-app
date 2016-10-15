<script>
import AppHeader from '../common/AppHeader.vue'
import Navbar from './Navbar.vue'
import Workspace from './Workspace.vue'

export default {
  components: {
    AppHeader,
    Navbar,
    Workspace
  },
  mounted () {
    document.title = '控制面板 - 聚页'
  }
}

</script>

<template>
  <div>
    <navbar></navbar>
    <workspace></workspace>
  </div>
</template>