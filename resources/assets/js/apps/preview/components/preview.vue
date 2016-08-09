<script>
import dropdown from '../../../ui/dropdown.vue'

export default {
  components: {
    dropdown,
  },
  data(){
    return {
      variations:[],
      currentVariation: {},
      version: 'mobile',
      show: false
    }
  },
  methods: {
    init(){
      this.variations = [
        {id: 130, name: '版本 A'},
        {id: 134, name: '版本 B'}
      ];
      this.currentVariation = this.variations[0];
    }
  },
  created (){
    this.init();
  }
}
</script>

<template>
  <div id="page">
    <div id="header">
      <dropdown :show="show" @toggle="show = !show">
        <div class="btn btn-default btn dropdown-toggle" data-toggle="dropdown">
          {{currentVariation.name}} &nbsp; <span class="caret"></span>
        </div>
        <ul slot="dropdown-menu" class="dropdown-menu">
          <li v-for="variation in variations">
            <a href="#" class="variation-name" @click="currentVariation = variation">{{variation.name}}</a>
          </li>
        </ul>
      </dropdown>
      <div class="btn-group version-switch">
        <div class="btn btn-default" v-bind:class="{'active':version=='pc'}" @click="version = 'pc'">桌面版 <span class="glyphicon glyphicon-blackboard"></span></div>
        <div class="btn btn-default" v-bind:class="{'active':version=='mobile'}" @click="version = 'mobile'">移动版 <span class="glyphicon glyphicon-phone"></span></div>
      </div>
    </div>
    <div id="main">
      <iframe v-show="version === 'pc'" class="pc-iframe" :src="'/editor/preview/variation/'+currentVariation.id" frameborder="0"></iframe>
      <div v-show="version === 'mobile'" class="mobile-preview">
                  
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
    <iframe class="mobile-iframe" :src="'/editor/preview/variation/'+currentVariation.id" frameborder="0"></iframe>
</div>

          
      </div>
    </div>
  </div>
</template>

<style>
#header{
  z-index: 100;
  height:45px;
  padding:4px 20px;
  width:100%;
  min-width:960px;
  position:relative;
  border-top:1px solid #ddd;
  border-bottom:1px solid #ddd;
  background:#f9f9f9;
  box-shadow: 0 0 8px #ddd;
}

.version-switch{
  margin-left:20px;
}

.pc-iframe{
  position: absolute;
  top:45px;
  bottom:0;
  width:100%;
  height:calc(100% - 45px);
}
.mobile-preview{
  position: relative;
  top:20px;
  width: 100%;
  text-align:center;
}
.mobile-iframe{
  overflow-x: hidden;
  overflow-y: scroll;
  z-index: 3;
  display: block;
  border: none;
  height: 667px;
  width: 375px;
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}


</style>