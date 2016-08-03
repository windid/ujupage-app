<script>
import dropdown from '../../ui/dropdown.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    dropdown
  },
  data (){
    return {
      showProjects: false
    }
  },
  computed: mapGetters({
    projects: 'allProjects',
    currentProject: 'currentProject',
    members: 'projectMembers'
  }),
  methods: {
    createProject(){
      this.$store.dispatch('getInput', {
        header: '请输入新项目名称',
        onConfirm: (val) => {
          const project = {
            name: val || '未命名项目'
          }
          this.$store.dispatch('createProject', project);
        }
      });
    },
    switchProject(project){
      this.$store.dispatch('switchProject', project);
      this.showProjects = false;
    }
  },
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
        <li><a href="javascript:;" @click="createProject"> <span class="glyphicon glyphicon-plus"></span> 新建项目</a></li>
      </ul>
    </dropdown>
    <div class="member-item" v-for="member in members">
      <div class="member-name"><span class="badge">管理员</span> </span> {{member.name}} </div>
      <div class="member-email">{{member.email}}</div>
    </div>
    <div class="btn btn-default"><span class="glyphicon glyphicon-plus"></span> 邀请新成员</div>
  </div>
</template>

<style lang="sass" scoped>
@import "../../../sass/config";

.projects{
  border-bottom:1px solid $main-block-border-color;
  height:60%;
  padding:20px;
}

.projects > .btn-group{
  margin: 5px 0;
}

.current-project{
  width: 174px;
}

 .projects-menu{
  width: 200px;
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