<script>
import { undo,redo,toggleVersion }  from '../store/actions'
import { getWorkspaceData, getPage } from '../store/getters'
import editorSettings from './editor-settings.vue'
import colorSchemes from './color-schemes.vue'
// import getParameter from '../utils/getParameter'
// import tooltip from '../libs/vue-strap/src/tooltip.vue'

export default {
  components: {
    editorSettings,
    colorSchemes,
    // tooltip
  },
  vuex: {
    actions: {
      undo,
      redo,
      toggleVersion
    },
    getters: {
      workspace: getWorkspaceData,
      page: getPage
    }
  },
  data (){
    return {
      showSettings: false,
      saveStatus: 'saved'
    }
  },
  methods:{
    save: function(){
      if (this.saveStatus !== 'unsaved') return;
      
      let variationId = 1;
      this.saveStatus = 'saving';
      this.$http.post('/editor/page/save?id=' + variationId, {htmljson: JSON.stringify(this.page)}).then(function(response){
        this.saveStatus = 'saved'
      },function(response){
        console.log(response.json())
        this.saveStatus = 'unsaved'
      });
    }
  },
  watch:{
    'page': {
      deep: true,
      handler: function(){
        this.saveStatus = 'unsaved'
      }
    }
  }
}
</script>

<template>
  <div class="header">
    <ul class="header-holder list-inline fl">
      <li class="go-to-dashboard"><a href="./dashboard"><span class="glyphicon glyphicon-home"></span></a></li>
      <li>创建A/B测试</li>
    </ul>
    <div class="btn-group btn-group-sm version-switch" role="group" aria-label="...">
      <div class="btn btn-default" v-bind:class="{'active':workspace.version=='pc'}" @click="toggleVersion">桌面版 <span class="glyphicon glyphicon-blackboard"></span></div>
      <div class="btn btn-default" v-bind:class="{'active':workspace.version=='mobile'}" @click="toggleVersion">移动版 <span class="glyphicon glyphicon-phone"></span></div>
    </div>

    <ul class="header-holder list-inline fr">
      <li><span class="glyphicon glyphicon-question-sign"></span></li>
      <!-- <tooltip placement="bottom" content="撤销"> -->
        <li @click="undo" v-bind:class="{'button-disabled':workspace.undo === false}"><span class="glyphicon glyphicon-share-alt flipx"></span></li>
      <!-- </tooltip> -->
      <!-- <tooltip placement="bottom" content="重做"> -->
        <li @click="redo" v-bind:class="{'button-disabled':workspace.redo === false}"><span class="glyphicon glyphicon-share-alt"></span></li>
      <!-- </tooltip> -->
      <color-schemes><li data-toggle="dropdown">配色 <span class="glyphicon glyphicon-th-large"></span></li></color-schemes>
      <li @click.stop="showSettings=true">设置 <span class="glyphicon glyphicon-cog"></span></li>
      <li @click="save" :class="{'button-disabled':saveStatus !== 'unsaved'}">
        <span v-show="saveStatus === 'unsaved'">保存</span>
        <span v-show="saveStatus === 'saving'">保存中</span>
        <span v-show="saveStatus === 'saved'">已保存</span>
        <span class="glyphicon glyphicon-floppy-disk"></span>
      </li>
      <li>预览 <span class="glyphicon glyphicon-eye-open"></span></li>
      <li class="publish">发布 <span class="glyphicon glyphicon-send"></span></li>
    </ul>
    <editor-settings v-if="showSettings" :show.sync="showSettings"></editor-settings>
  </div>
</template>