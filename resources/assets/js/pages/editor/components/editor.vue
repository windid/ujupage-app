<template>
  <controlbar></controlbar>
  <div class="main">
    <toolbar></toolbar>
    <page></page>
  </div>
</template>

<script>
import controlbar from './controlbar.vue'
import toolbar from './toolbar.vue'
import page from './page.vue'
export default {
  data () {
    return {
      message: 'test'
    }
  },
  components: {
    controlbar,
    toolbar,
    page
  }
}
</script>
