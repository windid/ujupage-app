<script>
import Dropdown from '../ui/Dropdown.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'DashboardProjects',
  components: {
    Dropdown
  },
  data () {
    return {
      showProjects: false
    }
  },
  computed: {
    ...mapGetters({
      projects: 'allProjects',
      currentProject: 'currentProject',
      members: 'projectMembers',
      invited: 'projectMembersInvited'
    })
  },
  methods: {
    createProject () {
      this.$store.dispatch('getInput', {
        header: '请输入新项目名称',
        onConfirm: (val) => {
          const project = {
            name: val || '未命名项目'
          }
          this.$store.dispatch('createProject', project)
        }
      })
    },
    switchProject (project) {
      this.$store.dispatch('switchProject', [project])
      this.showProjects = false
    },
    invite () {
      this.$store.dispatch('getInput', {
        header: '请输入新成员的邮箱地址',
        onConfirm: (email) => {
          const member = {
            email: email
          }
          this.$store.dispatch('inviteMember', member)
        }
      })
    }
  }
}
</script>

<template>
  <div class="projects">
    <dropdown :show="showProjects" @toggle="showProjects = !showProjects">
      <slot>
        <div class="btn btn-default current-project">{{currentProject.name}}</div>
        <div data-toggle="dropdown" class="btn btn-default dropdown-toggle">
          <span class="caret"></span>
        </div>
      </slot>
      <ul slot="dropdown-menu" class="dropdown-menu projects-menu">
        <li v-for="project in projects"><a href="javascript:;" @click="switchProject(project)">{{project.name}}</a></li>
        <li role="separator" class="divider"></li>
        <li v-if="$store.state.user.current.id == 2"><a href="javascript:;" @click="createProject"> <span class="glyphicon glyphicon-plus"></span> 新建项目</a></li>
      </ul>
    </dropdown>
    <div class="member-item" v-for="member in members" >
      <div class="member-name"><span class="badge">{{member.pivot.role === 'admin' ? '管理员' : '成员'}}</span> {{member.name}} </div>
      <div class="member-email">{{member.email}}</div>
    </div>
    <div class="member-item" v-for="member in invited">
      <div class="member-name"><span class="badge">已邀请</span> </div>
      <div class="member-email">{{member.email}}</div>
    </div>
    <div class="btn btn-default" @click="invite"><span class="glyphicon glyphicon-plus"></span> 邀请新成员</div>
  </div>
</template>

<style>

.projects{
  height:90%;
  padding:20px;
  overflow-y: auto;
}

.projects > .btn-group{
  margin: 5px 0;
}

.current-project{
  width: 154px;
}

 .projects-menu{
  width: 180px;
 }

.member-item{
  width: 100%;
  border:1px solid #ddd;
  border-radius: 4px;
  padding:6px 12px;
  margin:5px 0;
}

.member-email{
  color:#bbb;
  font-size:12px;
}

</style>