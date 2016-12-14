<script>
import Dropdown from '../ui/Dropdown.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProjectsList',
  components: {
    Dropdown
  },
  data () {
    return {
      show: false
    }
  },
  computed: {
    ...mapGetters({
      projects: 'allProjects',
      currentProject: 'currentProject'
    })
  },
  methods: {
    ...mapActions(['getInput', 'createProject', 'switchProject']),
    createProject () {
      this.getInput({
        header: '请输入新项目名称',
        onConfirm: (val) => {
          const project = {
            name: val || '未命名项目'
          }
          this.createProject([project])
        }
      })
    }
  }
}
</script>

<template>
  <dropdown :show="show" @toggle="show = !show">
    <slot>
      <div class="btn btn-default project-name">{{currentProject.name}}</div>
      <div data-toggle="dropdown" class="btn btn-default dropdown-toggle">
        <span class="caret"></span>
      </div>
    </slot>
    <ul slot="dropdown-menu" class="dropdown-menu projects-menu">
      <li v-for="project in projects"><a href="javascript:;" @click="switchProject([project])">{{project.name}}</a></li>
      <li role="separator" class="divider"></li>
      <li v-if="$store.state.user.current.id == 2"><a href="javascript:;" @click="createProject"> <span class="glyphicon glyphicon-plus"></span> 新建项目</a></li>
    </ul>
  </dropdown>
</template>

<style scoped>
  .project-name {
    min-width: 154px;
  }
</style>