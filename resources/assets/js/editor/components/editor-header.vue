<script>
import { undo,redo,toggleVersion,pageInit }  from '../store/actions'
import { getWorkspaceData, getPage } from '../store/getters'
import editorSettings from './editor-settings.vue'
import colorSchemes from './color-schemes.vue'
import pageVariations from './page-variations.vue'
// import getParameter from '../utils/getParameter'
// import tooltip from '../libs/vue-strap/src/tooltip.vue'

export default {
  components: {
    editorSettings,
    colorSchemes,
    pageVariations,
    // tooltip
  },
  vuex: {
    actions: {
      undo,
      redo,
      toggleVersion,
      pageInit
    },
    getters: {
      workspace: getWorkspaceData,
      page: getPage
    }
  },
  data (){
    return {
      showSettings: false,
      saveStatus: 'saved',
      pageLoading: true,
      pageInfo: {},
      currentVariationId: null
    }
  },
  methods:{
    save: function(){
      if (this.saveStatus !== 'unsaved') return;
      
      let variationId = this.currentVariationId;
      this.saveStatus = 'saving';
      this.$http.post('/editor/page/variation/save?id=' + variationId, {htmljson: JSON.stringify(this.page)}).then(function(response){
        this.saveStatus = 'saved'
      },function(response){
        console.log(response.json())
        this.saveStatus = 'unsaved'
      });
    },
    loadPage: function(variationId){
      this.pageLoading = true;
      this.$http.get('/editor/page/variation/' + variationId).then(function(response){
        let page = response.json();
        this.pageInit(page);
        this.pageLoading = false;
        this.$nextTick(function(){
          this.saveStatus = 'saved';
        });
        
      },function(response){
        console.log(response.json());
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
  },
  events: {
    'variation-changed': function(variationId){
      this.currentVariationId = variationId;
      this.loadPage(variationId);
    }
  },
  created: function(){
    this.pageInfo = window._pageInfo;
    this.currentVariationId = this.pageInfo.variations[0].id;
    this.loadPage(this.currentVariationId);
  }
}
</script>

<template>
  <div class="header">
    <ul class="header-holder list-inline fl">
      <li class="dashboard-link"><a href="/dashboard"><span class="glyphicon glyphicon-home"></span></a></li>
      <li class="page-variations">
        <page-variations :page-info.sync="pageInfo" :current-variation-id="currentVariationId"></page-variations>
      </li>
    </ul>
    <div class="btn-group btn-group-sm version-switch">
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
      <li class="color-schemes"><color-schemes></color-schemes></li>
      <li @click.stop="showSettings=true">设置 <span class="glyphicon glyphicon-cog"></span></li>
      <li @click="save" :class="{'button-disabled':saveStatus !== 'unsaved'}">
        <span v-show="saveStatus === 'unsaved'">保存</span>
        <span v-show="saveStatus === 'saving'">保存中</span>
        <span v-show="saveStatus === 'saved'">已保存</span>
        <span class="glyphicon glyphicon-floppy-disk"></span>
      </li>
      <li class="preview"><a href="/editor/preview/{{pageInfo.pageId}}?vid={{currentVariationId}}" target="_blank"></a>预览 <span class="glyphicon glyphicon-eye-open"></span></li>
      <li class="publish">发布 <span class="glyphicon glyphicon-send"></span></li>
    </ul>
    <editor-settings v-if="showSettings" :show.sync="showSettings"></editor-settings>
    <div v-if="pageLoading" class="loading-wrapper">
      <div class="loading"></div>
    </div>
  </div>
</template>
<style>

</style>