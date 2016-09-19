<script>
import Modal from '../ui/Modal.vue'
import { mapGetters } from 'vuex'
import { merge } from 'lodash'

export default {
  components: {
    Modal
  },
  props: {
    show: {
      type: Boolean,
      require: true
    }
  },
  data () {
    return {
      currentTab: 'seo',
      settings: {},
      goals: []
    }
  },
  computed: {
    ...mapGetters({
      editorSettings: 'editorSettings'
    })
  },
  created () {
    this.settings = merge({}, this.editorSettings)
  }
}

</script>

<template>
<modal :show="show" @close="$emit('close')" :width="'800px'" :height="'500px'" >
  <div slot="header">
    <ul class="nav nav-pills">
      <li :class="{active: currentTab === 'seo'}"><a href="javascript:;" @click="currentTab = 'seo'">页面设置</a></li>
      <li :class="{active: currentTab === 'goal'}"><a href="javascript:;" @click="currentTab = 'goal'">转化目标</a></li>
      <li :class="{active: currentTab === 'code'}"><a href="javascript:;" @click="currentTab = 'code'">Javascript</a></li>
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
              <option value="">请选择转化目标</option>
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
  </div>
</modal>
</template>

<style>
.settings-body{
  width: 95%;
}
</style>