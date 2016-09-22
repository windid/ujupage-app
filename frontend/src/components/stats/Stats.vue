<script>
import AppHeader from '../common/AppHeader'
import Navbar from './Navbar'
import Overview from './Overview'
import Conversion from './Conversion'

export default {
  name: 'Stats',
  components: {
    AppHeader,
    Navbar,
    Overview,
    Conversion
  },
  data () {
    return {
      modules: ['overview', 'conversion']
    }
  },
  computed: {
    module () {
      return this.modules.indexOf(this.$route.params.module) > 0 ? this.$route.params.module : 'overview'
    }
  }
}

</script>

<template>
  <div>
    <navbar></navbar>
    <transition name="fade" mode="out-in">
      <component :is="module" class="workspace"></component>
    </transition>
  </div>
</template>

<style scoped>
.workspace{
  position:relative;
  min-height:600px;
  margin-left:240px;
}
</style>