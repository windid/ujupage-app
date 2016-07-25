<script>
import { saveSettings }  from '../store/actions'
import { getWorkspaceData, getSettings, getElements } from '../store/getters'
import modal from './modal.vue'
import { merge } from 'lodash'

export default {
  components: {
    modal
  },
  vuex: {
    actions: {
      saveSettings
    },
    getters: {
      workspace: getWorkspaceData,
      pageSettings: getSettings,
      elements: getElements
    }
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
      currentTab: 'seo',
      changed: false,
      settings: merge({}, this.pageSettings),
      formsInPage: false,
      goals: []
    }
  },
  methods:{
    save: function(){
      if (this.changed) {
        this.saveSettings(this.settings);
        this.changed = false;
      }
      this.show = false;
    }
  },
  watch:{
    'settings': {
      deep:true,
      handler: function(val){
        this.changed = true;
      }
    }
  },
  ready: function(){
    // let vm = this;
    for (let elementId in this.elements){
      if (this.elements[elementId].type === "form"){
        this.formsInPage = true;
      }
      if (this.elements[elementId].link && this.elements[elementId].link.url){
        this.goals.push(this.elements[elementId].link.url);
      }
    }
    if (this.formsInPage){
      this.goals.push('form');
    }
  }
}
</script>

<template>
  <modal :show.sync="show" :width="'800px'" :height="'400px'" >
    <div slot="header">
      <ul class="nav nav-pills">
        <li role="presentation" :class="{active: currentTab === 'seo'}"><a href="javascript:;" @click="currentTab = 'seo'">页面设置</a></li>
        <li role="presentation" :class="{active: currentTab === 'goal'}"><a href="javascript:;" @click="currentTab = 'goal'">转化目标</a></li>
        <!-- <li role="presentation" :class="{active: currentTab === 'color'}"><a href="javascript:;" @click="currentTab = 'color'">配色方案</a></li> -->
        <li role="presentation" :class="{active: currentTab === 'code'}"><a href="javascript:;" @click="currentTab = 'code'">Javascript</a></li>
        <!-- <li role="presentation" :class="{active: currentTab === 'background'}"><a href="#" @click="currentTab = 'background'">页面背景</a></li> -->
        <!-- <li role="presentation" :class="{active: currentTab === 'font'}"><a href="#" @click="currentTab = 'font'">字体字号</a></li> -->
        <!-- <li role="presentation" :class="{active: currentTab === 'data'}"><a href="#" @click="currentTab = 'data'">数据跟踪</a></li> -->
        <!-- <li role="presentation" :class="{active: currentTab === 'editor'}"><a href="#" @click="currentTab = 'editor'">编辑器设置</a></li> -->
      </ul>
    </div>
    
    <div slot="body" class="settings-body">
      <div v-show="currentTab === 'seo'">
        <form class="form-horizontal">
          <div class="form-group">
            <label class="col-sm-2 control-label">网页标题</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="settings.seo.pageTitle" placeholder="网页标题">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">网页关键词</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="settings.seo.keywords" placeholder="多个关键词用英文逗号隔开">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">页面描述</label>
            <div class="col-sm-10">
              <textarea class="form-control" rows="3"  v-model="settings.seo.description"></textarea>
            </div>
          </div>
          
          <!-- <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <div class="checkbox">
                <label>
                  <input type="checkbox"> 禁止搜索引擎索引此页面
                </label>
              </div>
            </div>
          </div> -->
        </form>
      </div>
      <div v-show="currentTab === 'goal'">
        <form class="form-horizontal">
          <div class="form-group">
            <label class="col-sm-2 control-label">转化目标</label>
            <div class="col-sm-10">
              <select class="form-control" v-model="settings.goals.first">
                <option v-for="goal in goals" :value="goal">{{(goal === 'form') ? '表单提交' : '[链接] ' + goal}}</option>
              </select>
            </div>
          </div>
        </form>
      </div>
      <div v-show="currentTab === 'code'">
        <form class="form-horizontal">
          <div class="form-group">
            <label class="col-sm-2 control-label">&lt;header&gt;</label>
            <div class="col-sm-10">
              <textarea class="form-control" rows="4"  v-model="settings.code.header"></textarea>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">&lt;body&gt;内</label>
            <div class="col-sm-10">
              <textarea class="form-control" rows="4"  v-model="settings.code.bodyIn"></textarea>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">&lt;body&gt;外</label>
            <div class="col-sm-10">
              <textarea class="form-control" rows="4"  v-model="settings.code.bodyOut"></textarea>
            </div>
          </div>
        </form>
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

    </div>
    <div slot="footer">
      <button class="btn btn-success btn-sm" @click="save">完成</button>
    </div>
  </modal>
</template>

<style>

.settings-body {
  width:95%;
}

</style>
