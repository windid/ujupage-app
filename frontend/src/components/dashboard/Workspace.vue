<script>
import PageItem from './PageItem.vue'
import PageGroup from './PageGroup.vue'
import { mapGetters, mapActions } from 'vuex'

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
    ...mapActions([
      'createPage',
      'switchPageGroup',
      'createPageGroup',
      'getInput'
    ]),
    newPageGroup () {
      const pageGroup = {
        name: '新建文件夹',
        projectId: this.currentProject.id
      }
      this.createPageGroup(pageGroup)
    },
    goToDefault () {
      this.$store.dispatch('switchPageGroup', [this.defaultPageGroup])
    }
  }
}
</script>

<template>
  <div id="workspace" class="content-body">
    <div class="workspace-nav">
      <!-- <div class="btn btn-primary" @click="newPage">新建着陆页 <span class="glyphicon glyphicon-file"></span></div> -->
      <router-link :to="'/templates/all?gid=' + currentPageGroup.id" class="btn btn-primary">新建着陆页 <span class="glyphicon glyphicon-file"></span></router-link>
      <div v-show="currentPageGroup.is_default === 1" class="btn btn-default" title="新建文件夹" @click.stop="newPageGroup"><span class="glyphicon glyphicon-plus"></span> <span class="glyphicon glyphicon-folder-open"></span></div>
      <div v-show="currentPageGroup.name !== 'default'" class="btn btn-default" @click="goToDefault()"><span class="glyphicon glyphicon-level-up"></span> 返回上层</div>
    </div>
    <transition-group name="page-list" mode="out-in" tag="div">
      <template v-if="currentPageGroup.is_default === 1">
        <page-group v-for="pageGroup in pageGroups" :key="'group' + pageGroup.id" :page-group="pageGroup" class="page-list-item"></page-group>
      </template>
      <page-item v-for="pageItem in pages" :key="'item' + pageItem.id" :page-item="pageItem" class="page-list-item"></page-item>
    </transition-group>
    <div style="clear: both"></div>
  </div>
</template>

<style scoped>
#workspace {
  position: relative;
}

.workspace-nav > .btn {
  margin: 10px 10px 20px 0;
  box-shadow: 0 0 8px #ddd;
}

.page-list-item {
  transition: all .4s;
  float: left;
  margin-right: 15px;
  margin-bottom: 15px;
  width: 228px;
  border: 1px solid #e9e9e9;
  border-radius: 4px;
  box-shadow: 0 0 8px #ddd;
}

.page-list-item:nth-child(4n) {
  margin-right: 0;
}

.page-list-enter, .page-list-leave-active {
  opacity: 0;
  transform: translateY(-30px);
}

.page-list-leave-active {
  position: absolute;
}

</style>