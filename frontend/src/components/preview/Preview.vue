<script>
import PreviewHeader from './PreviewHeader'
import Previewer from '../common/Previewer'
import API from '../../API'
import '../../style/devices.min.css'
import { find } from 'lodash'

export default {
  components: {
    PreviewHeader,
    Previewer
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
      this.currentVariation = find(this.variations, v => v.id === parseInt(variationId))
    }
  },
  computed: {
    url () {
      return '/api/pages/' + this.page.id + '/variations/' + this.currentVariation.id + '/preview'
    }
  },
  created () {
    API.page.get({ id: this.$route.params.pageId }).then(response => {
      this.page = response.data
      document.title = this.page.name + ' - 预览 - 聚页'
      API.variation.get({ pageId: this.$route.params.pageId }).then(response => {
        this.variations = response.data
        this.currentVariation = find(this.variations, v => v.id === parseInt(this.$route.params.variationId))
        this.loading = false
      })
    })
  }
}
</script>
<template>
<div>
  <preview-header v-if="!loading" :current-variation="currentVariation" :variations="variations" :page="page" :version="version" @switch-version="switchVersion"></preview-header>
  <previewer v-if="!loading" :version="version" :url="url"></previewer>
</div>
</template>
