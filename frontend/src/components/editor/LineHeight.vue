<script>
import Dropdown from '../ui/Dropdown'
import { Tooltip } from 'element-ui'
export default {
  components: {
    Dropdown,
    Tooltip
  },
  props: {
    value: {
      required: true
    }
  },
  data () {
    return {
      show: false,
      lineHeights: [1.0, 1.2, 1.4, 1.6, 1.8, 2.0]
    }
  },
  methods: {
    setLineHeight (line) {
      this.$emit('input', line)
      this.show = false
    }
  }
}
</script>

<template>
  <dropdown :show="show" @toggle="show=!show">
    <tooltip class="btn btn-default dropdown-toggle" data-toggle="dropdown" content="行高" :disabled="show">
      <div><span class="glyphicon glyphicon-text-height"></span></div>
    </tooltip>
    <ul slot="dropdown-menu" class="dropdown-menu dropdown-menu-narrow">
      <li v-for="line in lineHeights" @click="setLineHeight(line)" :class="{'selected':value == line}">{{line}}</li>
    </ul>
  </dropdown>
</template>

<style>

</style>