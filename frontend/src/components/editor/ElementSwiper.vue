<script>
import ElementCommon from './ElementCommon'
import SwiperEditor from './SwiperEditor'
import { mapGetters, mapActions } from 'vuex'
import { merge, isEqual } from 'lodash'

export default {
  name: 'element-swiper',
  components: {
    ElementCommon,
    SwiperEditor
  },
  props: ['element', 'elementId', 'sectionId'],
  data () {
    return {
      swiperElement: merge({}, this.element),
      buttonGroup: 'main',
      editing: false,
      resize: {
        handles: 's,e'
      }
    }
  },
  computed: {
    ...mapGetters({
      workspace: 'editorWorkspace'
    }),
    resizable: function () {
      return true
    },
    hasImages: function () {
      return this.swiperElement.data.images && this.swiperElement.data.images.length >= 1
    }
  },
  methods: {
    ...mapActions([
      'modifyElement'
    ]),
    edit () {
      this.buttonGroup = 'edit'
      this.editing = true
    },
    editDone () {
      this.buttonGroup = 'main'
      this.editing = false
      if (!isEqual(this.swiperElement, this.element)) {
        this.modifyElement([this.elementId, this.swiperElement])
      }
    },
    imagesChange (val) {
      if (!isEqual(this.swiperElement.data.images, val)) {
        this.swiperElement.data.images = val
      }
    }
  },
  watch: {
    'element': function (val) {
      this.swiperElement = merge({}, val)
    }
  }
}
</script>

<template>
<div class="element-wrapper">
<element-common
  :element="element" 
  :section-id="sectionId" 
  :element-id="elementId"
  :button-group="buttonGroup"
  :resizable="resizable"
  :resize="resize"
  @drag-start="editDone">
  <div slot="content" class="element-swiper" @dblclick.stop="edit">
    <div class="swiper-placeholder" v-if="!hasImages">
      <p>轮播组件<br><small>双击添加图片</small></p>
    </div>
    <div class="swiper-container" v-else>
      <div class="swiper-image-list">
        <ul @mousedown.prevent>
          <li v-for="(image, index) in this.swiperElement.data.images">
            <img :src="image.url">
          </li>
        </ul>
      </div>
      <div class="swiper-bullets">
        <ul>
          <li v-for="(image, index) in this.swiperElement.data.images"><li>
        </ul>
      </div>
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
<swiper-editor
  :show="editing"
  :images="swiperElement.data.images"
  @edit-done="editDone"
  @images-change="imagesChange"></swiper-editor>
</div>
</template>

<style>
.element-swiper {
  width: 100%;
  height: 100%;
}
.swiper-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  text-align: center;
}
.swiper-container,
.swiper-image-list,
.swiper-container ul {
    width: 100%;
    height: 100%;
}
.swiper-container {
  position: relative;
}
.swiper-container .swiper-image-list ul {
  margin: 0;
  padding: 0;
  position: relative;
}
.swiper-container .swiper-image-list ul li {
  list-style: none;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 0;
  margin: 0;
}
.swiper-container .swiper-image-list ul li img {
  width: 100%;
  height: 100%;
  display: block;
}
.swiper-bullets {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  height: 12px;
}
.swiper-bullets ul {
  margin: 0;
  padding: 0;
  width: 100%;
  text-align: center;
}
.swiper-bullets ul li {
  width: 10px;
  height: 10px;
  margin: 2px;
  border-radius: 50%;
  background-color: rgba(255,255,255,0.4);
  box-shadow: 0 0 2px #ddd;
  display: inline-block;
}
</style>