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
      <div class="btn-toolbar header-nav">
        <!-- <li><router-link to="/help">帮助</router-link></li> -->
        <router-link active-class="active" to="/account" tag="div" class="btn btn-default">
          帐号 <span class="glyphicon glyphicon-user"></span>
        </router-link>
        <router-link active-class="active" to="/logout" tag="div" class="btn btn-default">
          退出 <span class="glyphicon glyphicon-log-out"></span>
        </router-link>
      </div>
    </template>
  </div>
</div>
</template>

<style scoped>

#header-wrapper {
  position: relative;
  height: 50px;
  width: 100%;
  min-width: 1000px;
  background: #f9f9f9;
  box-shadow: 0 2px 3px #ddd;
}

.header {
  position: relative;
  margin:0 auto;
  width: 1000px;
  height: 50px;
  overflow: hidden;
}

/*.header > .breadcrumb {
  margin: 6px 0 0 80px;
  background: transparent;
}*/

.logo {
  display: inline-block;
  height: 30px;
  width: 80px;
  float: left;
  margin: 11px 0;
  background-image: url("../../assets/img/logo.png");
}

.header-nav {
  margin: 8px 0;
  float: right;
}

</style>
