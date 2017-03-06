<template>
  <div class="previewer">
    <iframe v-if="version === 'pc'" class="pc-iframe" :src="url" frameborder="0"></iframe>
    <div v-if="version === 'mobile'" class="mobile-preview">           
      <div class="marvel-device iphone6 silver">
          <div class="top-bar"></div>
          <div class="sleep"></div>
          <div class="volume"></div>
          <div class="camera"></div>
          <div class="sensor"></div>
          <div class="speaker"></div>
          <div class="screen"></div>
          <div class="home"></div>
          <div class="bottom-bar"></div>
          <iframe class="mobile-iframe" :src="url" frameborder="0"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    },
    version: {
      type: String,
      default: 'mobile'
    }
  }
}
</script>

<style src="../../style/devices.css"></style>
<style>
.pc-iframe{
  position: absolute;
  top:45px;
  bottom:0;
  width:100%;
  height:calc(100% - 45px);
}
.mobile-preview{
  position: relative;
  top:10px;
  width: 100%;
  text-align:center;
}
.mobile-iframe{
  overflow-x: hidden;
  overflow-y: scroll;
  z-index: 3;
  display: block;
  border: none;
  height: 640px;
  width: 360px;
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>