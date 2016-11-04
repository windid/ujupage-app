<script>
import Modal from '../ui/Modal.vue'
import { mapActions, mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters({
      editorSettings: 'editorSettings',
      elements: 'editorElements'
    })
  },
  data () {
    return {
      currentTab: 'seo',
      settings: merge({}, this.$store.getters.editorSettings),
      goals: []
    }
  },
  methods: {
    ...mapActions(['saveSettings']),
    save () {
      this.saveSettings(this.settings)
      this.$emit('close')
    }
  },
  created () {
    let formsInPage = false
    for (const elementId in this.elements) {
      if (this.elements[elementId].type === 'form') {
        formsInPage = true
      }
      if (this.elements[elementId].link && this.elements[elementId].link.url) {
        this.goals.push(this.elements[elementId].link.url)
      }
    }
    if (formsInPage) {
      this.goals.push('form')
    }
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
          <div class="col-sm-offset-1 col-sm-10" v-for="(goal, index) in goals">
            <input type="checkbox" :id="'goal-' + index" :value="goal" v-model="settings.goals">
            <label v-if="goal === 'form'" :for="'goal-' + index">表单提交成功</label>          
            <label v-if="goal !== 'form'" :for="'goal-' + index">链接：{{goal}}</label>          
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
  <div slot="footer">
    <button class="btn btn-success btn-sm" @click="save">完成</button>
  </div>
</modal>
</template>

<style>
.settings-body{
  width: 95%;
}
</style>