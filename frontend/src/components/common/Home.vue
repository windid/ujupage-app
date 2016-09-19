<script>
import AppHeader from './AppHeader'

export default {
  components: {
    AppHeader
  }
}
</script>

<template>
  <div>
    <app-header></app-header>
    <transition name="fade" mode="out-in">
      <router-view class="main-wrapper"></router-view>
    </transition>
  </div>
</template>