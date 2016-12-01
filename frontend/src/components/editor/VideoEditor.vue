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
        <textarea class="form-control video-source" placeholder="请输入视频播放地址" v-model="video"></textarea>
      </div>
      <div style="text-align: right;">
        <button class="btn btn-danger" @click.stop="clear">清除</button>
        <button class="btn btn-primary" @click.stop="save">确定</button>
      </div>
      <div class="video-compatibility">
        <h4>注意：</h4>
        <p>浏览器对HTML5视频支持的格式存在兼容性。推荐使用mp4格式的视频。</p>
        以下是浏览器兼容性列表：
        <table>
          <thead>
            <th></th>
            <th>Chrome</th>
            <th>Firefox</th>
            <th>IE</th>
            <th>Opera</th>
            <th>Safari</th>
          </thead>
          <tbody>
            <tr>
              <td class="video-format">mp4</td>
              <td>✓</td>
              <td>✓</td>
              <td>✓</td>
              <td>✓</td>
              <td>✓</td>
            </tr>
            <tr>
              <td class="video-format">webm</td>
              <td>✓</td>
              <td>✓</td>
              <td>部分</td>
              <td>部分</td>
              <td>部分</td>
            </tr>
            <tr>
              <td class="video-format">ogg</td>
              <td>✓</td>
              <td>✓</td>
              <td>✗</td>
              <td>✓</td>
              <td>✗</td>
            </tr>
          </tbody>
        </table>
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

.video-compatibility table {
  margin-top: 14px;
}
.video-compatibility table th,
.video-compatibility table td {
  text-align: center;
}
.video-compatibility table td.video-format {
  text-align: left;
}
.video-compatibility table thead th {
  font-weight: normal;
  font-size: 12px;
  padding: 4px;
  background: #f8f8f8;
}
.video-compatibility table td {
  padding: 2px;
}
</style>