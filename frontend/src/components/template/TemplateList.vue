<script>
  import API from '../../API'
  import { mapActions } from 'vuex'

  export default {
    name: 'TemplatesList',
    data () {
      return {
        loading: true,
        templates: [],
        pageGroupId: null,
        pageId: null
      }
    },
    methods: {
      ...mapActions(['getInput', 'createPage', 'createEmptyVariation']),
      createEmptyPage () {
        if (this.pageGroupId) {
          this.getInput({
            header: '请输入页面名称',
            inputAddon: '<span class="glyphicon glyphicon-file"></span>',
            onConfirm: (val) => {
              const page = {
                name: val || '未命名页面',
                group_id: this.pageGroupId
              }
              this.createPage([page, (page) => {
                this.$router.push('/editor/' + page.id)
              }])
            }
          })
        } else if (this.pageId) {
          this.createEmptyVariation([this.pageId, (variation) => {
            this.$router.push('/editor/' + this.pageId + '/' + variation.id)
          }])
        }
      }
    },
    mounted () {
      document.title = '选择模板 - 聚页'
      this.pageGroupId = this.$route.query.gid || null
      this.pageId = this.$route.query.pid || null
      API.template.get().then(response => {
        this.templates = response.data
        this.loading = false
      }, response => {
        console.log(response)
      })
    }
  }
</script>

<template>
  <div>
    <div class="content-header">
      <h4>选择模板</h4>
      <!-- <ul class="nav nav-pills" style="float: right">
        <router-link tag="li" active-class="active" :to="{ name: 'templates', params: { tag: 'all' }, query: $route.query }"><a>全部</a></router-link>
        <router-link tag="li" active-class="active" :to="{ name: 'templates', params: { tag: 'leads' }, query: $route.query }"><a>线索收集</a></router-link>
        <router-link tag="li" active-class="active" :to="{ name: 'templates', params: { tag: 'app' }, query: $route.query }"><a>应用下载</a></router-link>
        <router-link tag="li" active-class="active" :to="{ name: 'templates', params: { tag: 'retail' }, query: $route.query }"><a>电子商务</a></router-link>
      </ul> -->
    </div>
    <div class="content-body" v-loading="loading">
      <div class="template empty-page" @click="createEmptyPage">空白页</div>
      <router-link tag="div" v-for="template in templates" :to="{ name: 'template', params: { templateId: template.id }, query: $route.query }" class="template">
        <img :src="template.image_url + '@300w.png'" alt="">
      </router-link>
      <div style="clear: both;"></div>
    </div>
  </div>
</template>

<style scoped>
  .template {
    transition: all .3s ease;
    border-radius: 4px;
    float: left;
    width: 300px;
    height: 400px;
    margin: 12px 25px 12px 0;
    box-shadow: 0 1px 6px #ccc;
    cursor: pointer;
    overflow: hidden;
  }

  .template:hover {
    margin-top: 5px;
    box-shadow: 0 3px 10px #ccc;
  }

  .empty-page {
    text-align: center;
    line-height: 400px;
    font-size: 32px;
    color: #bbb;
  }

  .template:nth-child(3n+1) {
    margin-left: 4px;
  }

  .template:nth-child(3n) {
    margin-right: 4px;
  }
</style>
