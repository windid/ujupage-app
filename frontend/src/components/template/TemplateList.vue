<script>
  import API from '../../API'
  import { mapActions } from 'vuex'
  import { Checkbox } from 'element-ui'

  export default {
    name: 'TemplatesList',
    components: {
      ElCheckbox: Checkbox
    },
    data () {
      return {
        loading: true,
        templates: [],
        pageGroupId: null,
        pageId: null,
        isCompat: false
      }
    },
    methods: {
      ...mapActions(['getInput', 'createPage', 'createEmptyVariation']),
      getData () {
        API.template.get({ is_compat: Number(this.isCompat) }).then(response => {
          this.templates = response.data
          this.loading = false
        }, response => {
          console.log(response)
        })
      },
      createEmptyPage () {
        if (this.pageId) {
          this.createEmptyVariation([this.pageId, (variation) => {
            this.$router.push('/editor/' + this.pageId + '/' + variation.id)
          }])
        } else if (this.pageGroupId) {
          this.getInput({
            header: '请输入页面名称',
            inputAddon: '<span class="glyphicon glyphicon-file"></span>',
            onConfirm: (val) => {
              const page = {
                name: val || '未命名页面',
                group_id: this.pageGroupId,
                is_compat: Number(this.isCompat)
              }
              this.createPage([page, (page) => {
                this.$router.push('/editor/' + page.id)
              }])
            }
          })
        }
      }
    },
    mounted () {
      document.title = '选择模板 - 聚页'
      this.pageGroupId = this.$route.query.gid || null
      this.pageId = this.$route.query.pid || null
      this.getData()
    }
  }
</script>

<template>
  <div>
    <div class="content-header">
      <h4 class="title">选择模板</h4>
      <el-checkbox v-model="isCompat" @change="getData">兼容桌面端</el-checkbox>
      <!-- <ul class="nav nav-pills" style="float: right">
        <router-link tag="li" active-class="active" :to="{ name: 'templates', params: { tag: 'all' }, query: $route.query }"><a>全部</a></router-link>
        <router-link tag="li" active-class="active" :to="{ name: 'templates', params: { tag: 'leads' }, query: $route.query }"><a>线索收集</a></router-link>
        <router-link tag="li" active-class="active" :to="{ name: 'templates', params: { tag: 'app' }, query: $route.query }"><a>应用下载</a></router-link>
        <router-link tag="li" active-class="active" :to="{ name: 'templates', params: { tag: 'retail' }, query: $route.query }"><a>电子商务</a></router-link>
      </ul> -->
    </div>
    <div class="content-body" v-loading="loading">
      <p class="text-muted">所有的模板都是响应式的，同时支持PC和移动。每个模板都支持多达30种配色方案。</p>
      <div>
        <div class="template empty-page" @click="createEmptyPage">空白页</div>
        <router-link tag="div" v-for="template in templates" :to="{ name: 'template', params: { templateId: template.id }, query: $route.query }" class="template">
          <img :src="template.image_url + '@300w.png'" alt="">
        </router-link>
        <div style="clear: both;"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  margin-right: 30px;
}
.template {
  position: relative;
  transition: all .3s;
  top: 0;
  border-radius: 4px;
  float: left;
  width: 300px;
  height: 240px;
  margin: 0 25px 24px 0;
  box-shadow: 0 1px 6px #ccc;
  cursor: pointer;
  overflow: hidden;
}

.template:hover {
  top: -5px;
  box-shadow: 0 3px 10px #ccc;
}

.empty-page {
  text-align: center;
  line-height: 240px;
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
