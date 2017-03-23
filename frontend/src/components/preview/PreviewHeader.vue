<script>
import Dropdown from '../ui/Dropdown'

export default {
  components: {
    Dropdown
  },
  props: {
    variations: {
      type: Array,
      default: []
    },
    currentVariation: {
      type: Object,
      defualt: {}
    }
  },
  data () {
    return {
      showVariations: false
    }
  }
}
</script>

<template>
  <div class="preview-header">
    <div class="home">
      <router-link :to="'/editor/' + $route.params.pageId + '/' + $route.params.variationId" class="home-link">
        <span class="glyphicon glyphicon-chevron-left"></span>
      </router-link>
    </div>

    <dropdown :show="showVariations" @toggle="showVariations=!showVariations">
      <div class="btn btn-default dropdown-toggle" data-toggle="dropdown">
        <div>
          <span>{{currentVariation.name}}</span>&nbsp; <span class="caret"></span>
        </div>
      </div>
      <ul slot="dropdown-menu" class="dropdown-menu variations-menu">
        <li v-for="variation in variations" :class="{ active: variation.id === currentVariation.id }">
          <router-link :to="'/preview/' + $route.params.pageId + '/' + variation.id">{{variation.name}}</router-link>
        </li>
      </ul>
    </dropdown>
    <slot name="versionSwitcher"></slot>
    <div class="btn-toolbar fr">
      <!-- <div class="btn-group">
        <div class="btn btn-default">
          <span class="glyphicon glyphicon-question-sign"></span>
        </div>
      </div> -->
    </div>
  </div>
</template>

<style scoped>
.preview-header{
  position: fixed;
  top: 0;
  height:50px;
  width:100%;
  z-index: 1000001;
  background: #fff;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 0 8px #ddd;
}

.home {
  float: left;
  width: 50px;
  margin-right:12px;
  background: #f9f9f9;
  border-right:1px solid #ddd;
}

.home:hover {
  background: #f5f5f5;
}

.home-link {
  display: block;
  font-size:20px;
  text-align: center;
  line-height: 48px;
}

.preview-header .btn-group{
  margin:7px;
}

</style>
