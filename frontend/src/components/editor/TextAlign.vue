<script>
import Dropdown from '../ui/Dropdown'
import { Tooltip } from 'element-ui'

export default {
  components: {
    Dropdown,
    Tooltip
  },
  props: ['value'],
  data () {
    return {
      show: false,
      textPositions: ['left', 'center', 'right']
    }
  },
  methods: {
    setValue (position) {
      this.$emit('input', position)
      this.show = false
    }
  }
}
</script>

<template>
  <dropdown :show="show" @toggle="show = !show">
    <tooltip class="btn btn-default dropdown-toggle" data-toggle="dropdown" content="对齐" :disabled="show">
      <span :class="'glyphicon glyphicon-align-' + value"></span> <span class="caret"></span>
    </tooltip>
    <ul slot="dropdown-menu" class="dropdown-menu dropdown-menu-narrow">
      <li v-for="position in textPositions" @click="setValue(position)" :class="{'selected':value == position}">
        <span :class="'glyphicon glyphicon-align-' + position"></span>
      </li>
    </ul>
  </dropdown>
</template>

<style>

</style>