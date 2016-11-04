<script>
export default {

}
</script>

<template>
<div id="header-wrapper">
  <div class="header">
      <router-link to="/" class="logo"></router-link>
      <!-- <ol class="breadcrumb fl">
        <li><router-link to="/"><span class="glyphicon glyphicon-home"></span></router-link></li>
        <li><router-link to="/project">Wendell的项目 <span class="caret"></span></router-link></li>
        <li>Data</li>
      </ol> -->
      <ul class="nav nav-pills header-nav">
        <li><router-link to="/help">帮助</router-link></li>
        <li><router-link to="/account">我的帐号</router-link></li>
        <li><router-link to="/logout">退出登陆</router-link></li>
      </ul>
    </template>
  </div>
</div>
</template>

<style>
#header-wrapper {
  height: 50px;
  top: 0;
  width: 100%;
  z-index: 1000000;
  position: fixed;
  box-shadow: 0 3px 8px #eee;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}

.header {
  position: relative;
  width: 100%;
  background: #f9f9f9;
  height: 48px;
  transition: all .5s;
  z-index: 1000001;
  overflow: hidden;
}

.header > .breadcrumb {
  margin: 6px 0 0 80px;
  background: transparent;
}

.logo {
  display: inline-block;
  height: 20px;
  width: 70px;
  float: left;
  margin: 14px 20px;
  background-image: url("../../assets/img/logo.png");
}

.header-nav {
  margin: 5px 20px;
  float: right;  
}
</style>
