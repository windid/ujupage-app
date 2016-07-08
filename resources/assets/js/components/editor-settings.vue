<style>

.settings-body {
  width:95%;
}

</style>

<template>
  <modal :show.sync="show" :width="'800px'" :height="'80%'" >
    <div slot="header">
      <ul class="nav nav-pills">
        <li role="presentation" :class="{active: currentTab === 'seo'}"><a href="#" @click="currentTab = 'seo'">SEO设置</a></li>
        <li role="presentation" :class="{active: currentTab === 'goal'}"><a href="#" @click="currentTab = 'goal'">转化目标</a></li>
        <li role="presentation" :class="{active: currentTab === 'color'}"><a href="#" @click="currentTab = 'color'">配色方案</a></li>
        <li role="presentation" :class="{active: currentTab === 'background'}"><a href="#" @click="currentTab = 'background'">页面背景</a></li>
        <li role="presentation" :class="{active: currentTab === 'font'}"><a href="#" @click="currentTab = 'font'">字体字号</a></li>
        <li role="presentation" :class="{active: currentTab === 'data'}"><a href="#" @click="currentTab = 'data'">数据跟踪</a></li>
        <li role="presentation" :class="{active: currentTab === 'editor'}"><a href="#" @click="currentTab = 'editor'">编辑器设置</a></li>
      </ul>
    </div>
    
    <div slot="body" class="settings-body">
      <div v-show="currentTab === 'seo'">
        <form class="form-horizontal">
          <div class="form-group">
            <label for="settings-page-title" class="col-sm-2 control-label">网页标题</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="settings-page-title" v-model="settings.seo.pageTitle" placeholder="网页标题">
            </div>
          </div>
          <div class="form-group">
            <label for="settings-keywords" class="col-sm-2 control-label">网页关键词</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="settings-keywords" v-model="settings.seo.keywords" placeholder="多个关键词用英文逗号隔开">
            </div>
          </div>
          <div class="form-group">
            <label for="settings-description" class="col-sm-2 control-label">页面描述</label>
            <div class="col-sm-10">
              <textarea class="form-control" id="settings-description" rows="3"  v-model="settings.seo.description"></textarea>
            </div>
          </div>
          <div class="form-group">
            <label for="settings-favicon" class="col-sm-2 control-label">页面图标</label>
            <div class="col-sm-10">
               <button class="btn btn-default btn-sm" id="settings-favicon">上传</button> 扩展名为ico的Favicon图标
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <div class="checkbox">
                <label>
                  <input type="checkbox"> 禁止搜索引擎索引此页面
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div v-show="currentTab === 'goal'">
        {{currentTab}}
      </div>
      <div v-show="currentTab === 'color'">
        {{currentTab}}
      </div>
      <div v-show="currentTab === 'background'">
        {{currentTab}}
      </div>
      <div v-show="currentTab === 'font'">
        {{currentTab}}
      </div>
      <div v-show="currentTab === 'data'">
        <form class="form-horizontal">
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <div class="checkbox">
                <label>
                  <input type="checkbox"> 开启外链和下载跟踪
                </label>
              </div>
            </div>
          </div>
          <hr style="border-bottom:1px doshed #ccc">
          <h4>第三方数据跟踪API</h4>
          <div class="form-group">
            <label for="settings-ga-id" class="col-sm-2 control-label">GA跟踪ID</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="settings-ga-id" placeholder="如：UA-88888888-8">
            </div>
          </div>
        </form>
      </div>
      <div v-show="currentTab === 'editor'">
        {{currentTab}}
      </div>
    </div>
    <div slot="footer">
      <button class="btn btn-success btn-sm" @click="saveSettings">保存更改</button>
    </div>
  </modal>
</template>

<script>
import {  }  from '../store/actions'
import { getWorkspaceData, getSettings } from '../store/getters'
import modal from './modal.vue'

export default {
  components: {
    modal
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      twoWay: true    
    }
  },
  data (){
    return {
      currentTab: 'seo'
    }
  },
  methods:{
    saveSettings: function(){
      console.log('Todo:用Ajax保存设置')
    }
  },
  vuex: {
    actions: {
      
    },
    getters: {
      workspace: getWorkspaceData,
      settings: getSettings
    }
  }
}
</script>