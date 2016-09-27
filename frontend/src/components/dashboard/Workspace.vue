<script>
import PageItem from './PageItem.vue'
import PageGroup from './PageGroup.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    PageItem,
    PageGroup
  },
  computed: mapGetters({
    pages: 'allPages',
    pageGroups: 'allPageGroups',
    currentProject: 'currentProject',
    currentPageGroup: 'currentPageGroup',
    defaultPageGroup: 'defaultPageGroup'
  }),
  methods: {
    createPageGroup () {
      const pageGroup = {
        name: '新建文件夹',
        projectId: this.currentProject.id
      }
      this.$store.dispatch('createPageGroup', pageGroup)
    },
    goToDefault () {
      this.$store.dispatch('switchPageGroup', this.defaultPageGroup)
    },
    createPage () {
      this.$store.dispatch('getInput', {
        header: '请输入页面名称',
        onConfirm: (val) => {
          const page = {
            name: val || '未命名页面',
            group_id: this.currentPageGroup.id
          }
          this.$store.dispatch('createPage', page)
        }
      })
    }
  }
}
</script>

<template>
  <div id="workspace">
    <div>
      <div class="workspace-nav">
        <div class="btn btn-primary" @click="createPage">新建着陆页 <span class="glyphicon glyphicon-file"></span></div>
        <div v-show="currentPageGroup.is_default === 1" class="btn btn-default" title="新建文件夹" @click="createPageGroup"><span class="glyphicon glyphicon-plus"></span> <span class="glyphicon glyphicon-folder-open"></span></div>
        <div v-show="currentPageGroup.name !== 'default'" class="btn btn-default" @click="goToDefault()"><span class="glyphicon glyphicon-level-up"></span> 返回上层</div>
      </div>
      <transition-group name="page-list" mode="out-in" tag="div">
      <template v-if="currentPageGroup.is_default === 1">
        <page-group v-for="pageGroup in pageGroups" :key="pageGroup.id" :page-group="pageGroup" class="page-list-item"></page-group>
      </template>
        <page-item v-for="pageItem in pages" :key="pageItem.id" :page-item="pageItem" class="page-list-item"></page-item>
      </transition-group>
    </div>
  </div>
</template>

<style>
#workspace {
  position: relative;
  min-height: 600px;
  margin-left: 240px;
  padding: 15px;
}

.workspace-nav > .btn {
  margin: 10px;
}

.page-list-item {
  transition: all .4s;
  display: inline-block;
}

.page-list-enter, .page-list-leave-active {
  opacity: 0;
  transform: translateY(-30px);
}

.page-list-leave-active {
  position: absolute;
}

</style>