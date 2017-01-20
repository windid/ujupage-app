<script>
import TemplateHeader from './TemplateHeader'
import Previewer from '../common/Previewer'
import VersionSwitcher from '../common/VersionSwitcher'
import { mapActions } from 'vuex'
import API from '../../API'

export default {
  components: {
    TemplateHeader,
    VersionSwitcher,
    Previewer
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
    },
    url () {
      return '/api/hub/template/preview/' + this.$route.params.templateId + '?color=' + this.colors
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
    <template-header :version="version" @switch-version="switchVersion" @update-colors="updateColors" @use-template="useTemplate">
      <version-switcher slot="versionSwitcher" :version="version" @change="switchVersion"></version-switcher>
    </template-header>
    <previewer :version="version" :url="url"></previewer>
  </div>
</template>

<style>
  
</style>
