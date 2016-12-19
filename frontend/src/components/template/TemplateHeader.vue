<script>
import Dropdown from '../ui/Dropdown'

export default {
  components: {
    Dropdown
  },
  props: {
    version: {
      type: String,
      default: 'mobile'
    }
  },
  data () {
    return {
    }
  },
  methods: {
    switchVersion (version) {
      this.$emit('switch-version', version)
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

    <div class="btn-group">
      <div class="btn btn-default" :class="{ active: version === 'pc' }" @click="switchVersion('pc')">
        桌面版 <span class="glyphicon glyphicon-blackboard"></span>
      </div>
      <div class="btn btn-default" :class="{ active: version === 'mobile' }" @click="switchVersion('mobile')">
        移动版 <span class="glyphicon glyphicon-phone"></span>
      </div>
    </div>

    <div class="btn-toolbar fr">
      <div class="btn-group">
        <div class="btn btn-default">
          <span class="glyphicon glyphicon-question-sign"></span>
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
