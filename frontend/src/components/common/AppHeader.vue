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
        <!-- <li><router-link to="/help">帮助</router-link></li> -->
        <li><router-link to="/account">我的帐号</router-link></li>
        <li><router-link to="/logout">退出登陆</router-link></li>
      </ul>
    </template>
  </div>
</div>
</template>

<style>
#header-wrapper {
  position: relative;
  height: 50px;
  top: 0;
  width: 100%;
  background: #f9f9f9;
  box-shadow: 0 3px 8px #eee;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}

.header {
  position: relative;
  margin:0 auto;
  width: 1000px;
  height: 48px;
  overflow: hidden;
}

.header > .breadcrumb {
  margin: 6px 0 0 80px;
  background: transparent;
}

.logo {
  display: inline-block;
  height: 30px;
  width: 80px;
  float: left;
  margin: 10px 0;
  background-image: url("../../assets/img/logo.png");
}

.header-nav {
  margin: 5px 0;
  float: right;  
}
</style>
