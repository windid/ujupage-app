<script>
import Sidebar from '../ui/Sidebar'

export default {
  name: 'video-editor',
  components: {
    Sidebar
  },
  props: ['show', 'value'],
  data () {
    return {
      video: null
    }
  }
}

</script>

<template>
  <sidebar v-if="show" :show="show" @close="$emit('edit-done')">
    <div slot="header" class="video-editor-header">
      <div class="btn btn-success" @click="$emit('edit-done')">完成</div>
    </div>
    <div slot="body" class="video-editor-body">
      <div class="form-group">
        <label>视频播放地址</label>
        <textarea class="form-control video-source" placeholder="请输入视频播放地址或者代码" v-model="value.source">
      </div>
    </div>
  </sidebar>
</template>

<style>
.video-editor-body {
  
}
.video-editor-body label {
  font-size: 15px;
  font-weight: normal;
}
textarea.video-source {
  height: 180px;
}
</style>