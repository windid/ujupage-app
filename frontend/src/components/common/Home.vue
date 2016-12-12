<script>
import AppHeader from './AppHeader'
import AppFooter from './AppFooter'

export default {
  name: 'Home',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<template>
  <div>
    <app-header></app-header>
    <div class="main-wrapper">
      <transition name="fade" mode="out-in">
        <router-view class="content"></router-view>
      </transition>
    </div>
    <app-footer></app-footer>
  </div>
</template>