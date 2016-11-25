<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      basicTools: [
        { name: '版块', style: 'modal-window', action: () => this.addSection() },
        { name: '图片', style: 'picture', action: () => this.addElement('image') },
        { name: '文字', style: 'font', action: () => this.addElement('text') },
        { name: '按钮', style: 'expand', action: () => this.addElement('button') },
        { name: '表单', style: 'edit', action: () => this.addElement('form') }
      ],
      advancedTools: [
        { name: '形状', style: 'stop', action: () => this.addElement('shape') },
        { name: '悬浮', style: 'cloud', action: () => this.addElement('float') },
        { name: '视频', style: 'film', action: () => this.addElement('video') },
        // { name: '地图', style: 'map-marker', action: () => this.addElement('map') },
        { name: '轮播图', style: 'retweet', action: () => this.addElement('swiper') },
        // { name: '倒计时', style: 'time', action: () => this.addElement('timer') },
        { name: 'HTML', style: 'header', action: () => this.addElement('html') }
      ],
      showAdvanced: true
    }
  },
  computed: mapGetters({
    'workspace': 'editorWorkspace'
  }),
  methods: {
    ...mapActions(['addSection', 'addElement']),
    addShape () {
      console.log('shape')
    }
  }
}

</script>
<template>
  <div class="toolbar shadow" :style="{width: showAdvanced ? '166px' : '86px'}">
    <div class="toolbar-header">组件</div>
    <div class="toolbar-body">
      <div class="basic-tools">
        <div v-for="tool in basicTools" class="tool shadow" @click.stop="tool.action">
          <span class="glyphicon" :class="'glyphicon-' + tool.style"></span>
          <div class="tool-name">{{tool.name}}</div>
        </div>
      </div>
      <div class="advanced-tools">
        <div v-for="tool in advancedTools" class="tool shadow" @click.stop="tool.action">
          <span class="glyphicon" :class="'glyphicon-' + tool.style"></span>
          <div class="tool-name">{{tool.name}}</div>
        </div>
      </div>
      <div class="show-advanced-btn" @click="showAdvanced = !showAdvanced">
      <span v-if="!showAdvanced" class="glyphicon glyphicon-th"></span>
      <span v-else class="glyphicon glyphicon-minus"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.toolbar {
  position: fixed;
  z-index: 10000;
  transition: all .3s ease;
  text-align: center;
  top: 60px;
  left: 10px;
  border-radius: 10px;
  box-shadow: 0 0 8px #ddd;
  /* 禁止文本选择 */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}


.toolbar-header {
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  background-color: #555;
  line-height: 35px;
  color: #fff;
}

.toolbar-body {
  position: relative;
  overflow: hidden;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border:1px solid #ccc;
  background-color:#fff;
}

.basic-tools {
  position: relative;
}

.advanced-tools {
  position: absolute;
  left: 80px;
  top: 0;
}

.show-advanced-btn {
  background: #eee;
  font-size: 16px;
  border-top: 1px solid #ccc;
  padding: 6px;
  cursor: pointer;
}

.tool {
  width: 66px;
  height: 66px;
  margin:10px;
  padding: 4px 8px;
  border: 5px solid #BEE1F1;
  border-radius: 33px;
  cursor: pointer;
  font-size: 12px;
  color: #333;
  box-shadow: 0 0 8px #ddd;
}

.tool:hover {
  border-color: #98CFE9;
  color: #333;
}

.tool span {
  color: #337ab7;
  font-size: 24px;
}

.tool-name {
  border-top: 1px solid #BEE1F1;
  margin: 1px;
}

</style>