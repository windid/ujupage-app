<script>
import elementMixin from '../../mixins/elementMixin'
import VideoEditor from './VideoEditor'
import videoHandler from '../../utils/videoHandler'

import { merge, isEqual } from 'lodash'

export default {
  name: 'element-video',
  mixins: [elementMixin],
  components: {
    VideoEditor
  },
  data () {
    return {
      url: '',
      resize: {
        handles: 'e'
      },
      urlError: false,
      videoInfo: this.element.videoInfo ? merge({}, this.element.videoInfo) : {},
      size: {
        width: null,
        height: null
      }
    }
  },
  created () {
    this.calculateSize()
  },
  computed: {
    resizable () {
      if (this.videoType === 'empty') {
        return false
      }
      return (!this.editing && this.workspace.activeElementId === this.elementId)
    },
    videoType () {
      const s = this.localElement.content.source
      if (!s) {
        return 'empty'
      } else if (this.isRaw(s)) {
        return 'raw'
      }
      return 'empty'
    },
    embedStyle () {
      let style = {}
      if (this.videoType === 'raw') {
        style = {
          width: '100%',
          height: 'auto'
        }
      } else if (this.videoType === 'embed') {
        if (this.size.width) {
          style.width = this.size.width + 'px'
          style.height = this.size.height + 'px'
        }
      }
      return style
    }
  },
  methods: {
    ...videoHandler,
    edit () {
      this.editing = true
      this.buttonGroup = 'edit'
    },
    editChange (source) {
      const el = merge({}, this.localElement)
      el.content.source = source
      this.localElement = el
      // this.videoInfo = this.parseXML(source)
      if (source.length <= 0) {
        this.urlError = false
      } else if (this.videoType === 'empty' && source.length > 0) {
        this.urlError = true
      }
      if (this.videoType !== 'empty') {
        const style = merge({}, this.localElement.style)
        style['mobile'].height = undefined
        style['pc'].height = undefined
        this.localElement.style = style
      }
      if (this.videoType === 'embed') {
        // todo: 重新生成embed
        const style = merge({}, this.localElement.style)
        style['mobile'].height = undefined
      }
      if (this.videoType === 'empty') {
        // todo: 无视频资源
      }
      this.$forceUpdate()
    },
    editDone () {
      this.editing = false
      this.buttonGroup = 'main'
      this.localElement.videoInfo = this.videoInfo
      if (!isEqual(this.element, this.localElement)) {
        this.modifyElement([this.elementId, this.localElement, true])
      }
    },
    resizing (direction, size) {
      this.size.width = size
      if (this.videoInfo && this.videoInfo.height) {
        this.size.height = Math.floor(size * this.videoInfo.height / this.videoInfo.width)
      }
    },
    calculateSize (version) {
      if (this.videoInfo === null) return
      const v = arguments.length < 1 ? this.workspace.version : version
      const size = {
        width: null,
        height: null
      }
      const width = parseInt(this.element.style[v].width)
      if (width) {
        size.width = width
        if (this.videoInfo && this.videoInfo.width) {
          size.height = Math.floor(width * this.videoInfo.height / this.videoInfo.width)
        }
      }
      this.size = size
    }
  },
  watch: {
    'workspace.version': function (v) {
      this.calculateSize(v)
    }
  }
}
</script>

<template>
  <element-common
    :element="element" 
    :section-id="sectionId" 
    :element-id="elementId"
    :button-group="buttonGroup"
    @change-button-group="changeButtonGroup"
    :resizable="resizable"
    :resize="resize"
    @resizing="resizing"
    @drag-start="editDone">
    <div slot="content" class="element-video" @dblclick="edit">
      <div v-if="videoType === 'empty'" class="element-video-placeholder">
        <div><i class="glyphicon glyphicon-film"></i></div>
        <div v-if="urlError">地址解析错误</div>
        <div v-else>添加视频</div>
      </div>
      <div v-if="videoType === 'embed'" class="element-video-embed">
        <embed :src="videoInfo.src" :style="embedStyle"><embed>
      </div>
      <div v-if="videoType === 'raw'" class="element-video-raw">
        <video controls width="100%" height="auto" ref="rawVideo">
          <source :src="localElement.content.source"></source>
        </video>
      </div>
      <div class="elmement-video-mask" v-if="videoType !== 'empty'"></div>
    </div>
    <template slot="main-buttons-extend">
      <div class="btn btn-primary" title="编辑" @click.stop="edit">编辑</div>
    </template>
    <template slot="button-groups">
      <div v-show="buttonGroup === 'edit'" class="btn-group el-btn-group" role="group">
        <div class="btn btn-success"><span class="glyphicon glyphicon-ok"></span></div>
      </div>
    </template>
    <video-editor slot="sidebar" :show="editing" v-model="localElement.content" @edit-done="editDone" @edit-change="editChange"></video-editor>
  </element-common>
</template>

<style scoped>
  .element-video {
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    position: relative;
  }
  .element-video video,
  .element-video embed {
    display: block;
  }
  .elmement-video-mask {
    background: transparent;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
  .element-video-placeholder {
    display: block;
    background-color: #f6f6f6;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #aaa;
  }
  .element-video-placeholder i {
    font-size: 24px;
    color: #337ab7;
  }
</style>