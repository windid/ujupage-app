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
      <div>
        <ul>
          <li v-for="(image, index) in this.swiperElement.data.images">
            <img src="image">
          </li>
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
  :images="swiperElement.data.images"></swiper-editor>
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
</style>