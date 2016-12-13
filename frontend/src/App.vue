<script>
import MessageBox from './components/ui/MessageBox.vue'
import Spinner from './components/ui/Spinner.vue'

export default {
  name: 'App',
  components: {
    MessageBox,
    Spinner
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
  </div>
</template>

<style>

body {
  background: #f9fbfe !important;
  overflow-y: scroll;
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
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 0 8px #ddd;
  background: #fff;
}

.content-header {
  padding: 10px 20px;
  border-bottom: 1px solid #ddd;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background: #f6f6f6;
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

.fr{
  float: right;
}

.fl{
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
  z-index: 10010000;
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

/* Remove these to get rid of the spinner */
#nprogress .spinner {
  display: block;
  position: fixed;
  z-index: 10010000;
  top: 15px;
  right: 15px;
}

#nprogress .spinner-icon {
  width: 18px;
  height: 18px;
  box-sizing: border-box;

  border: solid 2px transparent;
  border-top-color: #29d;
  border-left-color: #29d;
  border-radius: 50%;

  -webkit-animation: nprogress-spinner 400ms linear infinite;
          animation: nprogress-spinner 400ms linear infinite;
}

.nprogress-custom-parent {
  overflow: hidden;
  position: relative;
}

.nprogress-custom-parent #nprogress .spinner,
.nprogress-custom-parent #nprogress .bar {
  position: absolute;
}

@-webkit-keyframes nprogress-spinner {
  0%   { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}
@keyframes nprogress-spinner {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>