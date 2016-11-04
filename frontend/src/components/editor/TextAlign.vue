<script>
import Dropdown from '../ui/Dropdown'

export default {
  components: {
    Dropdown
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
  <dropdown :show="show" @toggle="show=!show">
    <div class="btn btn-default dropdown-toggle" data-toggle="dropdown" title="对齐">
      <span :class="'glyphicon glyphicon-align-' + value"></span> <span class="caret"></span>
    </div>
    <ul slot="dropdown-menu" class="dropdown-menu dropdown-menu-narrow">
      <li v-for="position in textPositions" @click="setValue(position)" :class="{'selected':value == position}">
        <span :class="'glyphicon glyphicon-align-' + position"></span>
      </li>
    </ul>
  </dropdown>
</template>

<style>

</style>