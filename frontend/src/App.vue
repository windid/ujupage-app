<script>
import MessageBox from './components/ui/MessageBox.vue'
import Spinner from './components/ui/Spinner.vue'
import AuthDialog from './components/auth/AuthDialog'
import Vue from 'vue'
import { Loading } from 'element-ui'
Vue.use(Loading)

export default {
  name: 'App',
  components: {
    MessageBox,
    Spinner,
    AuthDialog
  }
}
</script>

<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view class="page"></router-view>
    </transition>
    <message-box></message-box>
    <spinner></spinner>
    <auth-dialog></auth-dialog>
  </div>
</template>

<style lang="scss" src="./style/bootstrap.scss"></style>
<style lang="scss" src="assets/styles/app.scss"></style>

<style>

body {
  background: #f9fbfe !important;
  overflow-y: scroll;
}
.no-scroll {
  overflow: hidden;
}
#app, .page {
  height: 100%;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}

.main-wrapper {
  /*height: calc(100% - 50px);*/
  position: relative;
  padding: 0;
}

.content {
  position: relative;
  margin: 24px auto;
  width: 1000px;
  border: 1px solid #e9e9e9;
  border-radius: 4px;
  box-shadow: 0 1px 8px #ddd;
  background: #fff;
}

.content-header {
  padding: 10px 20px;
  border-bottom: 1px solid #e9e9e9;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background: #f6f6f6;
}

.content-header h4 {
  display: inline-block;
}

.content-body {
  min-height: 300px;
  padding: 10px 20px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

a:focus {
  outline: none !important;
  text-decoration: none !important;
}

.btn-group {
  border-radius: 4px;
  box-shadow: 0px 0px 8px #ddd;
}

.btn, .nav > li > a, .dropdown-menu > li, .dropdown-menu > li > a {
  transition: all .2s ease;
}

.input-group-btn .btn {
  height: 34px;
}

.fr {
  float: right;
}

.fl {
  float: left;
}

.fade-enter-active, .fade-leave-active {
  transition: all .3s
}

.fade-enter, .fade-leave-active {
  opacity: 0
}

/* Make clicks pass-through */
#nprogress {
  pointer-events: none;
}

#nprogress .bar {
  background: #29d;
  position: fixed;
  z-index: 1001000;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
}

/* Fancy blur effect */
#nprogress .peg {
  display: block;
  position: absolute;
  right: 0px;
  width: 100px;
  height: 100%;
  box-shadow: 0 0 10px #29d, 0 0 5px #29d;
  opacity: 1.0;

  -webkit-transform: rotate(3deg) translate(0px, -4px);
      -ms-transform: rotate(3deg) translate(0px, -4px);
          transform: rotate(3deg) translate(0px, -4px);
}
</style>
