<script>
import TemplateHeader from './TemplateHeader'
import { mapActions } from 'vuex'
import API from '../../API'

export default {
  components: {
    TemplateHeader
  },
  data () {
    return {
      version: 'mobile',
      colorSet: []
    }
  },
  computed: {
    colors () {
      return encodeURIComponent(this.colorSet.toString())
    }
  },
  methods: {
    ...mapActions(['getInput']),
    switchVersion (version) {
      this.version = version
    },
    updateColors (colorScheme) {
      this.colorSet = colorScheme
    },
    useTemplate () {
      const templateId = this.$route.params.templateId
      const groupId = this.$route.query.gid || null
      const pageId = this.$route.query.pid || null
      if (groupId) {
        const newPage = {
          id: templateId,
          // page_name: val || '未命名页面',
          group_id: groupId
        }
        if (this.colors.length > 0) {
          newPage.color = this.colorSet.toString()
        }
        this.getInput({
          header: '请输入页面标题',
          inputAddon: '<span class="glyphicon glyphicon-file"></span>',
          onConfirm: (val) => {
            newPage.page_name = val || '未命名页面'
            API.template.copy(newPage).then(response => {
              this.$router.push('/editor/' + response.data.page_id + '/' + response.data.variation_id)
            })
          }
        })
      } else if (pageId) {
        const newPage = {
          id: templateId,
          page_id: pageId
        }
        if (this.colors.length > 0) {
          newPage.color = this.colorSet.toString()
        }
        API.template.copy(newPage).then(response => {
          this.$router.push('/editor/' + response.data.page_id + '/' + response.data.variation_id)
        })
      }
    }
  }
}
</script>

<template>
  <div>
    <template-header :version="version" @switch-version="switchVersion" @update-colors="updateColors" @use-template="useTemplate"></template-header>

    <iframe v-if="version === 'pc'" class="pc-iframe" :src="'/api/hub/template/preview/' + $route.params.templateId + '?color=' + colors" frameborder="0"></iframe>
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
          <iframe class="mobile-iframe" :src="'/api/hub/template/preview/' + $route.params.templateId + '?color=' + colors" frameborder="0"></iframe>
      </div>
    </div>
  </div>
</template>

<style>
  
</style>
