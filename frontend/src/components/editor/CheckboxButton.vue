<template>
  <div @click="toggleValue"
  class="btn"
  v-bind:class="{
    'active':value == values[1],
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
        twoWay: true
      },
      values: {
        default: function () {
          return [false, true]
        }
      },
      type: {
        type: String,
        default: 'default'
      }
    },
    methods: {
      toggleValue () {
        const value = (this.values[1] === this.value) ? this.values[0] : this.values[1]
        this.$emit('input', value)
      }
    }
  }
</script>
