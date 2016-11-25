<script>
import ElementCommon from './ElementCommon'
import VideoEditor from './VideoEditor'
import videoHandler from '../../utils/videoHandler'

import { mapGetters, mapActions } from 'vuex'
import { merge } from 'lodash'

export default {
  name: 'element-video',
  props: ['element', 'elementId', 'sectionId'],
  components: {
    ElementCommon,
    VideoEditor
  },
  data () {
    return {
      content: merge({}, this.element.content),
      url: '',
      buttonGroup: 'main',
      editing: false,
      videoInfo: null
    }
  },
  computed: {
    ...mapGetters({
      workspace: 'editorWorkspace'
    }),
    videoType () {
      const s = this.content.source
      if (!s) {
        return 'empty'
      } else if (this.isRaw(s)) {
        return 'raw'
      } else if (this.videoInfo !== null) {
        return 'embed'
      }
      return 'empty'
    },
    embedStyle () {
      const style = {}
      const width = this.videoInfo.width
      const height = this.videoInfo.height
      if (width) {
        style.width = width + 'px'
      }
      if (height) {
        style.height = height + 'px'
      }
      return style
    }
  },
  methods: {
    ...mapActions([
      'modifyElement',
      'setActiveElementId'
    ]),
    ...videoHandler,
    editSave (content) {
      this.content = content
    },
    edit () {
      this.editing = true
      this.buttonGroup = 'edit'
    },
    editDone () {
      this.editing = false
      this.buttonGroup = 'main'
      // console.log(this.content)
    }
  },
  watch: {
    'content.source': function (source) {
      this.videoInfo = this.parseXML(source)
    }
  }
}
</script>

<template>
<div>
  <element-common
    :element="element" 
    :section-id="sectionId" 
    :element-id="elementId"
    :button-group="buttonGroup"
    @drag-start="editDone">
    <div slot="content" class="element-video" >
      <div v-if="videoType === 'empty'" class="element-video-placeholder">
        <div><i class="glyphicon glyphicon-film"></i></div>
        <div>添加视频</div>
      </div>
      <div v-if="videoType === 'embed'" class="element-video-embed">
        <embed :src="videoInfo.src" :style="embedStyle"><embed>
      </div>
      <div v-if="videoType === 'raw'" class="element-video-raw">
        <video controls width="100%" height="auto">
          <source :src="content.source"></source>
        </video>
      </div>
    </div>
    <template slot="main-buttons-extend">
      <div class="btn btn-primary" title="编辑" @click.stop="edit">编辑</div>
    </template>
    <template slot="button-groups">
      <div v-show="buttonGroup === 'edit'" class="btn-group el-btn-group" role="group">
        <div class="btn btn-success"><span class="glyphicon glyphicon-ok"></span></div>
      </div>
    </template>
  </element-common>
  <video-editor :show="editing" v-model="content" @edit-done="editDone"></video-editor>
</div>
</template>

<style>
  .element-video {
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
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