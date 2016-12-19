<script>
import TemplateHeader from './TemplateHeader'

export default {
  components: {
    TemplateHeader
  },
  data () {
    return {
      version: 'mobile'
    }
  },
  methods: {
    switchVersion (version) {
      this.version = version
    }
  }
}
</script>

<template>
  <div>
    <template-header :version="version" @switch-version="switchVersion"></template-header>
  </div>
</template>

<style>
  
</style>
