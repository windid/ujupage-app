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
      video: this.value.source
    }
  },
  methods: {
    save () {
      if (this.video !== this.value.source) {
        this.$emit('edit-change', this.video)
      }
    },
    clear () {
      this.video = ''
      this.$emit('edit-change', this.video)
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
        <textarea class="form-control video-source" placeholder="请输入视频播放地址或者代码" v-model="video"></textarea>
      </div>
      <div style="text-align: right;">
        <button class="btn btn-danger" @click.stop="clear">清除</button>
        <button class="btn btn-primary" @click.stop="save">确定</button>
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