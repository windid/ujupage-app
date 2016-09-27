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

    }
  }
}

</script>

<template>
  <div>
    <navbar></navbar>
    <transition name="fade" mode="out-in">
      <component :is="$route.params.module" class="workspace"></component>
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