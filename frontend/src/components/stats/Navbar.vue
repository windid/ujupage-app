<script>
export default {

}
</script>

<template>
  <div class="navbar">
    <ul class="nav nav-pills nav-stacked">
      <li><router-link to="/stats/19">概览</router-link></li>
      <li><router-link to="/stats/19/conversion">转化详情</router-link></li>
      <li><router-link to="/stats/19/source">流量来源</router-link></li>
    </ul>
  </div>
</template>

<style>
.navbar{
  position:fixed;
  width:240px;
  top:50px;
  height:calc(100% - 50px);
  bottom:0;
  border-right:1px solid #ddd;
  box-shadow: 0 0 8px #ddd;
  background: #f5f5f5;
}
</style>