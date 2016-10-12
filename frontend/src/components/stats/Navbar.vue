<script>
export default {

}
</script>

<template>
  <div class="navbar">
    <div class="list-group">
      <router-link class="list-group-item" active-class="active" :to="{ name: 'stats', params: { pageId: $route.params.pageId, module: 'overview'}, query: $route.query }">概览</router-link>
      <router-link class="list-group-item" active-class="active" :to="{ name: 'stats', params: { pageId: $route.params.pageId, module: 'conversion'}, query: $route.query }">转化详情</router-link>
      <router-link class="list-group-item" active-class="active" :to="{ name: 'stats', params: { pageId: $route.params.pageId, module: 'campaign'}, query: $route.query }">渠道分析</router-link>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  position: fixed;
  width: 240px;
  top: 50px;
  height: calc(100% - 50px);
  bottom: 0;
  border-right: 1px solid #ddd;
  box-shadow: 0 0 8px #ddd;
  background: #f5f5f5;
  padding: 15px;
}
</style>