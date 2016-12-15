<script>
import { mapGetters, mapActions } from 'vuex'
import eventHandler from '../../utils/eventHandler'

export default {
  name: 'editor-toolbar',
  data () {
    return {
      basicTools: [
        { name: '版块', style: 'modal-window', action: () => {
          this.addSection()
          this.showShapes = false
        } },
        { name: '图片', style: 'picture', action: () => this.newElement('image') },
        { name: '文字', style: 'font', action: () => this.newElement('text') },
        { name: '按钮', style: 'hand-up', action: () => this.newElement('button') },
        { name: '形状', style: 'stop', action: () => this.showShapePicker() }
      ],
      advancedTools: [
        { name: '表单', style: 'edit', action: () => this.newElement('form') },
        { name: '视频', style: 'film', action: () => this.newElement('video') },
        { name: '地图', style: 'map-marker', action: () => this.newElement('map') },
        // { name: '音乐', style: 'music', action: () => this.newElement('music') },
        { name: '轮播图', style: 'transfer', action: () => this.newElement('swiper') },
        // { name: '倒计时', style: 'time', action: () => this.newElement('timer') },
        { name: 'HTML', style: 'header', action: () => this.newElement('html') }
      ],
      showAdvanced: false,
      showShapes: false
    }
  },
  computed: mapGetters({
    'workspace': 'editorWorkspace'
  }),
  methods: {
    ...mapActions(['addSection', 'addElement', 'warning']),
    newElement (type) {
      this.addElement(type)
      this.showShapes = false
    },
    showShapePicker () {
      this.showShapes = !this.showShapes
    },
    comming () {
      this.warning({
        content: '工程狮们正在紧张的开发这个组件，等几天再来试试吧。'
      })
    }
  },
  mounted () {
    eventHandler.listen(window, 'click', (e) => {
      this.showShapes = false
    })
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
    <div v-if="showShapes" class="shape-picker">
      <div class="shape-item" @click.stop="newElement('square')">
        <div class="shape shape-box"></div>
        <div class="shape-name">方形</div>
      </div>
      <div class="shape-item" @click.stop="newElement('circle')">
        <div class="shape shape-circle"></div>
        <div class="shape-name">圆形</div>
      </div>
      <div class="shape-item" @click.stop="newElement('line')">
        <div class="shape">
          <div class="shape-line"></div>
        </div>
        <div class="shape-name">横线</div>
      </div>
      <div class="shape-item" @click.stop="newElement('vline')">
        <div class="shape">
          <div class="shape-vline"></div>
        </div>
        <div class="shape-name">竖线</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.toolbar {
  position: fixed;
  z-index: 1000;
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
  border-radius: 50%;
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

.shape-picker {
  position: absolute;
  width: 200px;
  border: 1px solid #ddd;
  box-shadow: 0 0 8px #ddd;
  border-radius: 5px;
  height: 60px;
  background: #fff;
  left: 80px;
  top: 353px;
}

.shape-item {
  float: left;
  margin: 10px 12px;
  cursor: pointer;
}

.shape-name {
  font-size: 12px;
  padding-top: 2px;
}

.shape {
  height: 25px;
  width: 25px;
}

.shape-box {
  border: 3px solid #BEE1F1;
}

.shape-circle {
  border: 3px solid #BEE1F1;
  border-radius: 50%;
}

.shape-line {
  height: 13px;
  border-bottom: 3px solid #BEE1F1;
}

.shape-vline {
  width: 13px;
  height: 25px;
  border-right: 3px solid #BEE1F1;
}

.shape-box:hover, .shape-circle:hover, .shape-line:hover, .shape-vline:hover {
  border-color: #98CFE9;
}

</style>