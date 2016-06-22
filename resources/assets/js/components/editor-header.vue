<template>
  <div class="header">
    <ul class="header-holder list-inline fl">
      <li class="go-to-dashboard"><a href="./dashboard"><span class="glyphicon glyphicon-home"></span></a></li>
      <li><a>创建一个A/B测试</a></li>
    </ul>
    <div class="btn-group btn-group-sm version-switch" role="group" aria-label="...">
      <button type="button" class="btn btn-default" v-bind:class="{'active':workspace.version=='pc'}" @click="toggleVersion">桌面版 <span class="glyphicon glyphicon-blackboard"></span></button>
      <button type="button" class="btn btn-default" v-bind:class="{'active':workspace.version=='mobile'}" @click="toggleVersion">移动版 <span class="glyphicon glyphicon-phone"></span></button>
    </div>

    <ul class="header-holder list-inline fr">
      <li><span class="glyphicon glyphicon-question-sign"></span></li>
      <li @click="undo" v-bind:class="{'do-disabled':workspace.undo === false}"><span class="glyphicon glyphicon-share-alt flipx"></span></li>
      <li @click="redo" v-bind:class="{'do-disabled':workspace.redo === false}"><span class="glyphicon glyphicon-share-alt"></span></li>
      <li class="color-schemes"><color-schemes></color-schemes></li>
      <li @click="showSettings=true">设置 <span class="glyphicon glyphicon-cog"></span></li>
      <li>保存 <span class="glyphicon glyphicon-floppy-disk"></span></li>
      <li>预览 <span class="glyphicon glyphicon-eye-open"></span></li>
      <li class="publish">发布 <span class="glyphicon glyphicon-send"></span></li>
    </ul>
  </div>
  <editor-settings v-if="showSettings" :show.sync="showSettings"></editor-settings>
</template>

<script>
import { undo,redo,toggleVersion }  from '../store/actions'
import { getWorkspaceData } from '../store/getters'
import editorSettings from './editor-settings.vue'
import colorSchemes from './color-schemes.vue'

export default {
  name:'editorHeader',
  components: {
    'editor-settings':editorSettings,
    'color-schemes':colorSchemes
  },
  data (){
    return {
      showSettings: false
    }
  },
  vuex: {
    actions: {
      undo,
      redo,
      toggleVersion
    },
    getters: {
      workspace: getWorkspaceData
    }
  }
}
</script>