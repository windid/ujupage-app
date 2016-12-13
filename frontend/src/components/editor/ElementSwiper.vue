<script>
import elementMixin from '../../mixins/elementMixin'
import SwiperEditor from './SwiperEditor'
import { isEqual } from 'lodash'

export default {
  mixins: [elementMixin],
  components: {
    SwiperEditor
  },
  data () {
    return {
      resize: {
        handles: 's,e'
      },
      editing: false
    }
  },
  computed: {
    hasImages: function () {
      return this.localElement.data.images && this.localElement.data.images.length >= 1
    }
  },
  methods: {
    edit () {
      this.buttonGroup = 'edit'
      this.editing = true
    },
    editDone () {
      this.buttonGroup = 'main'
      this.editing = false
      if (!isEqual(this.localElement, this.element)) {
        this.modifyElement([this.elementId, this.localElement, true])
      }
    },
    imagesChange (val) {
      if (!isEqual(this.localElement.data.images, val)) {
        this.localElement.data.images = val
      }
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
          <li v-for="(image, index) in this.localElement.data.images">
            <img :src="image.url">
          </li>
        </ul>
      </div>
      <div class="swiper-bullets">
        <ul>
          <li v-for="(image, index) in this.localElement.data.images"><li>
        </ul>
      </div>
      <div class="swiper-buttons" v-if="localElement.data.button">
        <a class="button-prev">&#x3008;</a>
        <a class="button-next">&#x3009;</a>
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
  :id="elementId"
  :show="editing"
  :value="localElement.data"
  :images="localElement.data.images"
  @edit-done="editDone"
  @images-change="imagesChange"></swiper-editor>
</div>
</template>

<style scoped>
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
  margin: 0;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
}
.swiper-container .swiper-image-list ul li img {
  width: 100%;
  height: 100%;
  max-height: 100%;
  max-width: 100%;
  display: block;
  object-fit: contain;
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
.swiper-buttons a {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  text-decoration: none;
  background-color: rgba(232, 228, 228, 0.6);
  font-size: 12px;
}
.swiper-buttons a.button-prev {
  left: 0;
  padding: 3px 6px 3px 0;
}
.swiper-buttons a.button-next {
  right: 0;
  padding: 3px 0 3px 6px;
}
</style>