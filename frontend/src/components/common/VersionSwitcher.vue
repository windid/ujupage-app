<template>
  <div class="btn-group">
    <div class="btn btn-default" v-if="showAll" :class="{ active: !version }" @click="onSwitch('')">全部</div>
    <div class="btn btn-default" :class="{ active: version === 'pc' }" @click="onSwitch('pc')">
      桌面版 <span class="glyphicon glyphicon-blackboard"></span>
    </div>
    <div class="btn btn-default" :class="{ active: version === 'mobile' }" @click="onSwitch('mobile')">
      移动版 <span class="glyphicon glyphicon-phone"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showAll: {
      type: Boolean,
      default: false
    },
    version: String
  },
  methods: {
    onSwitch (ver) {
      this.$emit('change', ver)
    }
  }
}
</script>