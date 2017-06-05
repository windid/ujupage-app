<script>
import { mapGetters, mapActions } from 'vuex'
import eventHandler from 'utils/eventHandler'
import mouseDrag from 'mixins/mouseDrag.js'

export default {
  name: 'editor-toolbar',
  mixins: [mouseDrag],
  props: {
    page: Object
  },
  data () {
    const basicTools = [
      { name: '图片', style: 'picture', action: 'image' },
      { name: '文字', style: 'font', action: 'text' },
      { name: '按钮', style: 'hand-up', action: 'button' },
      { name: '形状', style: 'stop', action: () => this.showShapePicker() },
      { name: '图标', style: 'comment', action: 'icon' }
    ]

    if (this.page.is_compat) {
      basicTools.unshift({
        name: '版块',
        style: 'modal-window',
        action: () => {
          this.addSection()
          this.showShapes = false
        }
      })
    }
    return {
      basicTools,
      advancedTools: [
        { name: '表单', style: 'edit', action: 'form' },
        { name: '视频', style: 'film', action: 'video' },
        { name: '地图', style: 'map-marker', action: 'map' },
        // { name: '音乐', style: 'music', action: () => this.newElement('music') },
        { name: '轮播图', style: 'transfer', action: 'swiper' },
        { name: '倒计时', style: 'time', action: () => this.comming('timer') },
        { name: 'HTML', style: 'header', action: 'html' }
      ],
      showAdvanced: false,
      showShapes: false,
      dragAction: null
    }
  },
  computed: mapGetters({
    'workspace': 'editorWorkspace'
  }),
  methods: {
    ...mapActions(['addSection', 'addElement', 'warning']),
    clickTool (tool) {
      const action = tool.action
      if (typeof action === 'function') {
        action()
      } else {
        this.newElement([action])
      }
    },
    newElement (type) {
      this.addElement(type)
      this.showShapes = false
    },
    showShapePicker () {
      this.showShapes = !this.showShapes
    },
    comming () {
      this.warning({
        content: '攻城狮们正在争分夺秒开发这个组件，等几天再来试试吧。'
      })
    },
    dragMenu (event) {
      const action = event.currentTarget.getAttribute('data-action')
      this.dragAction = action
      this.onDragBegin(event)
    },
    dragBegin () {
      const assist = document.querySelector('#main-wrapper')
      this._thumbnail = assist.querySelector('#drag-thumbnail')
      if (!this._thumbnail) {
        this._thumbnail = document.createElement('div')
        this._thumbnail.id = 'drag-thumbnail'
        assist.appendChild(this._thumbnail)
      }
      this._scrollTop = this.$ui.scrollTop()
    },
    dragMove (move, offset, options) {
      if (this.dragAction === null) {
        return
      }
      const position = {
        x: this.dragStartX + move.x,
        y: this.dragStartY + move.y
      }
      this._thumbnail.setAttribute('style', `
        left: ${position.x - 40}px;
        top: ${position.y + this._scrollTop - 40}px;
        `)
    },
    dragEnd (move, offset, options) {
      const position = {
        x: this.dragStartX + move.x,
        y: this.dragStartY + move.y
      }
      position.y += this._scrollTop
      if (this.dragAction) {
        this.addElement([this.dragAction, position])
      }
      if (this._thumbnail) {
        this._thumbnail.style.display = 'none'
      }
      this.dragAction = null
    },
    getAction (action) {
      return typeof action === 'function' ? null : action
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
  <div class="toolbar shadow" :style="{width: showAdvanced ? '166px' : '83px'}">
    <div class="toolbar-header">组件</div>
    <div class="toolbar-body">
      <div class="tool-list">
        <div class="basic-tools">
          <div v-for="tool in basicTools" class="tool shadow"
            @click.stop="clickTool(tool)"
            :data-action="getAction(tool.action)"
            @mousedown.stop.prevent="dragMenu">
            <span class="glyphicon" :class="'glyphicon-' + tool.style"></span>
            <div class="tool-name">{{tool.name}}</div>
          </div>
        </div>
        <div class="advanced-tools">
          <div v-for="tool in advancedTools" class="tool shadow"
            @click.stop="clickTool(tool)"
            :data-action="getAction(tool.action)"
            @mousedown.stop.prevent="dragMenu">
            <span class="glyphicon" :class="'glyphicon-' + tool.style"></span>
            <div class="tool-name">{{tool.name}}</div>
          </div>
        </div>
      </div>
      <div class="show-advanced-btn" @click="showAdvanced = !showAdvanced">
        <span v-if="!showAdvanced" class="glyphicon glyphicon-th"></span>
        <span v-else class="glyphicon glyphicon-minus"></span>
      </div>
    </div>
    <div v-if="showShapes" class="shape-picker">
      <div class="shape-item"
        @click.stop="clickTool({ action: 'square' })"
        data-action="square"
        @mousedown.stop.prevent="dragMenu">
        <div class="shape shape-box"></div>
        <div class="shape-name">方形</div>
      </div>
      <div class="shape-item"
        @click.stop="clickTool({ action: 'circle' })"
        data-action="circle"
        @mousedown.stop.prevent="dragMenu">
        <div class="shape shape-circle"></div>
        <div class="shape-name">圆形</div>
      </div>
      <div class="shape-item"
        @click.stop="clickTool({ action: 'line' })"
        data-action="line"
        @mousedown.stop.prevent="dragMenu">
        <div class="shape">
          <div class="shape-line"></div>
        </div>
        <div class="shape-name">横线</div>
      </div>
      <div class="shape-item"
        @click.stop="clickTool({ action: 'vline' })"
        data-action="vline"
        @mousedown.stop.prevent="dragMenu">
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
  user-select: none;
}


.toolbar-header {
  border-radius: 10px 10px 0 0;
  background-color: #555;
  line-height: 35px;
  color: #fff;
}

.toolbar-body {
  position: relative;
  overflow: hidden;
  border-radius: 0 0 10px 10px;
  border:1px solid #ccc;
  background-color:#fff;
}

.tool-list {
  display: flex;
  width: 164px;
  justify-content: space-around;
  /*float: left;*/
}

.advanced-tools {
  /*position: absolute;*/
  /*left: 80px;*/
  /*top: 0;*/
}

.show-advanced-btn {
  background: #eee;
  font-size: 16px;
  border-top: 1px solid #ccc;
  padding: 6px;
  cursor: pointer;
}

.tool {
  transition: all .3s ease;
  width: 66px;
  height: 66px;
  margin: 10px 0;
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
  box-shadow: 0 1px 10px #ccc;
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

.shape:hover, .shape-line:hover, .shape-vline:hover{
  border-color: #98CFE9;
}

</style>

<style>
#drag-thumbnail {
  position: absolute;
  z-index: 9999;
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px dashed red;
  width: 80px;
  height: 80px;
}
</style>