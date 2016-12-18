<script>
  import API from '../../API'

  export default {
    name: 'TemplatesList',
    data () {
      return {
        loading: true,
        templates: [
          { name: '1', id: 1, snapshot: '' },
          { name: '2', id: 2, snapshot: '' },
          { name: '3', id: 3, snapshot: '' },
          { name: '4', id: 4, snapshot: '' },
          { name: '5', id: 5, snapshot: '' },
          { name: '6', id: 6, snapshot: '' },
          { name: '7', id: 7, snapshot: '' },
          { name: '8', id: 8, snapshot: '' }
        ]
      }
    },
    mounted () {
      document.title = '选择模板 - 聚页'
      console.log(API)
      API.template.get().then(response => {
        console.log(response)
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
        <router-link tag="li" active-class="active" :to="{ name: 'templates', params: { tag: 'all' } }"><a>全部</a></router-link>
        <router-link tag="li" active-class="active" :to="{ name: 'templates', params: { tag: 'leads' } }"><a>线索收集</a></router-link>
        <router-link tag="li" active-class="active" :to="{ name: 'templates', params: { tag: 'app' } }"><a>应用下载</a></router-link>
        <router-link tag="li" active-class="active" :to="{ name: 'templates', params: { tag: 'retail' } }"><a>电子商务</a></router-link>
      </ul> -->
    </div>
    <div class="content-body" v-loading="loading">
      <div class="template empty-page">空白页</div>
      <div v-for="template in templates" class="template"></div>
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
    box-shadow: 0 1px 5px #ccc;
    cursor: pointer;
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
