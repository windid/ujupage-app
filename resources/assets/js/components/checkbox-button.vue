<template>
  <div @click="toggleValue"
  class="btn"
  v-bind:class="{
    'active':value,
    'btn-success':type == 'success',
    'btn-warning':type == 'warning',
    'btn-info':type == 'info',
    'btn-danger':type == 'danger',
    'btn-default':type == 'default',
    'btn-primary':type == 'primary'
  }">

    <slot></slot>
  </div>
</template>

<script>

  export default {
    props: {
      value: {
        type: Boolean,
        twoWay: true
      },
      type: {
        type: String,
        default: 'default'
      }
    },
    methods: {
      toggleValue() {
        this.value = !this.value
      }
    }
  }
</script>
