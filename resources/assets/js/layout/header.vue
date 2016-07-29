<script>
  
</script>

<template>
  <div id="header">
    <a href="/dashboard" class="logo fl"></a>
    <ul class="nav nav-pills fr">
    <li><a href="/account">我的帐号</a></li>
    <li><a href="/auth/logout">退出登陆</a></li>
    </ul>
  </div>
</template>

<style lang="sass" scoped>
@import "../../sass/config";

#header{
  position:fixed;
  z-index:1;
  background:#f9f9f9;
  width:100%;
  top:0;
  height:55px;
  border-top:1px solid $main-block-border-color;
  border-bottom:1px solid $main-block-border-color;
  box-shadow: 0 3px 8px #eee;
}

.logo{
  outline: 0;
  display: inline-block;
  height: 32px;
  width: 100px;
  float: left;
  margin: 11px 0 11px 20px;
  background-image: url($assets-server+"/img/juye-logo.png");
}

#header .nav{
  margin:7px 20px;
}
</style>