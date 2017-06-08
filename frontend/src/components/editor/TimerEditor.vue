<script>
import Sidebar from '../ui/Sidebar'
import ColorPicker from './ColorPicker'

export default {
  name: 'timer-editor',
  props: ['show', 'value'],
  components: {
    Sidebar,
    ColorPicker
  },
  data () {
    return {
      timestamp: null
    }
  }
}
</script>
<template>
<sidebar v-if="show" :show="show" @close="$emit('edit-done')">
  <div slot="header" class="timer-editor-header">
    <div class="btn btn-success" @click="$emit('edit-done')">完成</div>
  </div>
  <div slot="body" class="timer-editor-body">
    <div class="form-group">
      <el-date-picker
        v-model='value.datetime'
        type='datetime'
        placeholder="选择日期时间">
      </el-date-picker>
    </div>
    <div class="form-group">
      <label>标签颜色</label>
      <color-picker v-model="value.labelColor"></color-picker>
    </div>
    <div class="form-group">
      <label>数字颜色</label>
      <color-picker v-model="value.numberColor"></color-picker>
    </div>
    <div class="form-group">
      <label>背景颜色</label>
      <color-picker v-model="value.timerColor"></color-picker>
    </div>
  </div>
</sidebar>
</template>

<style>
.timer-editor-body {
  padding: 10px 0;
}
.timer-editor-body label {
  font-weight: normal;
  font-size: 15px;
}
</style>
