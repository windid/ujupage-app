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
  <div class="template-header">
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

<style scoped>
.template-header{
  position: fixed;
  top: 0;
  height:50px;
  width:100%;
  z-index: 100001;
  background: #fff;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 0 8px #ddd;
}

.home {
  float: left;
  width: 150px;
  margin-right:12px;
  background: #f9f9f9;
  border-right:1px solid #ddd;
}

.home:hover {
  background: #f5f5f5;
}

.home-link {
  text-align: center;
  line-height: 49px;
  cursor: pointer;
}

.template-header .btn-group{
  margin: 8px;
}

</style>
