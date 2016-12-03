<script>
import Dropdown from '../ui/Dropdown'

export default {
  name: 'BorderStyle',
  components: {
    Dropdown
  },
  props: {
    value: {
      required: true,
      default: 'solid'
    }
  },
  data () {
    return {
      show: false,
      borderStyles: ['solid', 'dotted', 'dashed', 'double']
    }
  },
  methods: {
    setBorderStyle (borderStyle) {
      this.$emit('input', borderStyle)
      this.show = false
    }
  }
}
</script>

<template>
  <dropdown :show="show" @toggle="show=!show">
    <div class="btn btn-default dropdown-toggle" data-toggle="dropdown" title="边框样式">
      <div class="border-sample" style="top: 8px" :style="{ borderBottomStyle: value }"></div>
    </div>
    <ul slot="dropdown-menu" class="dropdown-menu">
      <li v-for="borderStyle in borderStyles" @click="setBorderStyle(borderStyle)" class="border-inline" :class="{'selected':value === borderStyle}">
        <div class="border-sample" :style="{ borderBottomStyle: borderStyle }"></div>
      </li>
    </ul>
  </dropdown>
</template>

<style scoped>
.btn {
  width: 100%;
  height: 34px;
  vertical-align: middle;
  overflow: hidden;
}

.border-sample {
  position: relative;
  height: auto;
  border-bottom-width: 3px;
  border-color: #333;
}

.border-inline {
  padding: 10px;
  cursor: pointer;
}

.border-inline:hover {
  background: #eee;
}
</style>