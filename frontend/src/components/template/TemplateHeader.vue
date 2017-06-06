<script>
import Dropdown from '../ui/Dropdown'
import ColorSchemes from '../ui/ColorSchemes'

export default {
  components: {
    Dropdown,
    ColorSchemes
  },
  data () {
    return {
    }
  },
  methods: {
    updateColors (colorScheme) {
      this.$emit('update-colors', colorScheme)
    }
  }
}
</script>

<template>
  <div class="fixed-header template-header">
    <div class="home">
      <router-link tag="div" :to="{ name: 'templates', params: { tag: 'all' }, query: $route.query }" class="home-link">
        <span class="glyphicon glyphicon-chevron-left"></span> 返回模板列表
      </router-link>
    </div>
    <slot name="versionSwitcher"></slot>
    <div class="btn-toolbar fr">
      <!-- <div class="btn-group">
        <div class="btn btn-default">
          <span class="glyphicon glyphicon-question-sign"></span>
        </div>
      </div> -->

      <color-schemes @update-colors="updateColors"></color-schemes>

      <div class="btn-group">
        <div class="btn btn-primary" @click="$emit('use-template')">
          使用这个模板
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.template-header{
  border-top: none;
  .home {
    width: 150px;
  }
  .home-link {
    font-size: 14px;
    text-align: center;
    line-height: 49px;
    cursor: pointer;
  }
  .btn-group{
    margin: 8px;
  }
}
</style>