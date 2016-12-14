<script>
import AppHeader from '../common/AppHeader.vue'
import Navbar from './Navbar.vue'
import Workspace from './Workspace.vue'
import ProjectList from './ProjectList'
import ProjectMembers from './ProjectMembers'

export default {
  name: 'Dashboard',
  components: {
    AppHeader,
    Navbar,
    Workspace,
    ProjectList,
    ProjectMembers
  },
  mounted () {
    document.title = '控制面板 - 聚页'
  }
}

</script>

<template>
  <div>
    <div class="content-header">
      <h4>
        <project-list></project-list>
        <project-members></project-members>
      </h4>
    </div>
    <!-- <navbar></navbar> -->
    <workspace></workspace>
  </div>
</template>