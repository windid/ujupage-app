<script>
import pageItem from './pageItem.vue'
import pageGroup from './pageGroup.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    pageItem,
    pageGroup
  },
  computed: mapGetters({
    workspace: 'workspace',
    pages: 'allPages',
    pageGroups: 'allPageGroups',
    currentProject: 'currentProject',
    currentPageGroup: 'currentPageGroup',
    defaultPageGroup: 'defaultPageGroup'
  }),
  methods: {
    createPageGroup(){
      const pageGroup = {
        name: '新建文件夹',
        projectId: this.currentProject.id
      };
      this.$store.dispatch('createPageGroup', pageGroup);
    },
    goToDefault(){
      this.$store.dispatch('switchPageGroup', this.defaultPageGroup);
    },
    createPage(){
      this.$store.dispatch('getInput', {
        header: '请输入页面名称',
        onConfirm: (val) => {
          const page = {
            name: val || '未命名页面',
            group_id: this.currentPageGroup.id
          };
          this.$store.dispatch('createPage', page);
        }
      });
    }
  }
}
</script>

<template>
  <div id="workspace">
    <div v-if="workspace.loadStatus === 'loading'" class="loading"></div>
    <div v-if="workspace.loadStatus === 'failed'" class="load-failed">{{workspace.failedInfo}}</div>
    <div v-if="workspace.loadStatus === 'done'">
      <div class="workspace-nav">
        <div class="btn btn-primary" @click="createPage">新建着陆页 <span class="glyphicon glyphicon-file"></span></div>
        <div v-show="currentPageGroup.is_default === 1" class="btn btn-default" title="新建文件夹" @click="createPageGroup"><span class="glyphicon glyphicon-plus"></span> <span class="glyphicon glyphicon-folder-open"></span></div>
        <div v-show="currentPageGroup.name !== 'default'" class="btn btn-default" @click="goToDefault()"><span class="glyphicon glyphicon-level-up"></span> 返回上层</div>
      </div>
      <template v-if="currentPageGroup.is_default === 1">
        <page-group v-for="pageGroup in pageGroups" :key="pageGroup.id" :page-group="pageGroup"></page-group>
      </template>
      <page-item v-for="pageItem in pages" :key="pageItem.id" :page-item="pageItem"></page-item>
    </div>
  </div>
</template>

<style>
#workspace{
  position:relative;
  min-height:600px;
  margin-left:240px;
  padding:15px;
}

.workspace-nav > .btn{
  margin:10px;
}

</style>