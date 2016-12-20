<script>
import AppHeader from '../common/AppHeader.vue'
import Workspace from './Workspace.vue'
import ProjectList from './ProjectList'
import ProjectMembers from './ProjectMembers'

export default {
  name: 'Dashboard',
  components: {
    AppHeader,
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
      </h4>
      <project-members></project-members>
    </div>
    <workspace></workspace>
  </div>
</template>