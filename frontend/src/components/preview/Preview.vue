<script>
import PreviewHeader from './PreviewHeader'
import API from '../../API'
import '../../style/devices.min.css'

export default {
  components: {
    PreviewHeader
  },
  data () {
    return {
      page: {},
      variations: [],
      currentVariation: null,
      loading: true,
      version: 'mobile'
    }
  },
  methods: {
    switchVersion (ver) {
      this.version = ver
    }
  },
  watch: {
    '$route.params.variationId': function (variationId) {
      this.currentVariation = this.variations.find(v => v.id === parseInt(variationId))
    }
  },
  created () {
    API.page.get({ id: this.$route.params.pageId }).then(response => {
      this.page = response.data
      document.title = this.page.name + ' - 预览 - 聚页'
      API.variation.get({ pageId: this.$route.params.pageId }).then(response => {
        this.variations = response.data
        this.currentVariation = this.variations.find(v => v.id === parseInt(this.$route.params.variationId))
        this.loading = false
      })
    })
  }
}
</script>
<template>
<div>
  <preview-header v-if="!loading" :current-variation="currentVariation" :variations="variations" :page="page" :version="version" @switch-version="switchVersion"></preview-header>

  <iframe v-if="version === 'pc' && !loading" class="pc-iframe" :src="'/api/pages/' + page.id + '/variations/' + currentVariation.id + '/preview'" frameborder="0"></iframe>
  <div v-if="version === 'mobile' && !loading" class="mobile-preview">           
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
        <iframe class="mobile-iframe" :src="'/api/pages/' + page.id + '/variations/' + currentVariation.id + '/preview'" frameborder="0"></iframe>
    </div>
  </div>
</div>
</template>

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