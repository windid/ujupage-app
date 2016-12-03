<script>
import Sidebar from '../ui/Sidebar'
import ImagePicker from '../ui/ImagePicker'

import { mapActions } from 'vuex'
import { clone } from 'lodash'

export default {
  name: 'swiper-editor',
  props: ['images', 'show'],
  components: {
    Sidebar,
    ImagePicker
  },
  data () {
    return {
      imageList: clone(this.images)
    }
  },
  methods: {
    ...mapActions([
      'getImage'
    ]),
    selectImage () {
      this.getImage([(image) => {
        // todo
        this.imageList.push(image)
      }])
    },
    imageChange (image, id) {
      if (image === null) {
        this.imageList.splice(id, 1)
      }
    }
  },
  watch: {
    'imageList': function (val) {
      this.$emit('images-change', val)
    },
    'images': function (val) {
      this.imageList = clone(val)
    }
  }
}
</script>
<template>
<sidebar v-if="show" :show="show" @close="$emit('edit-done')">
  <div slot="header" class="swiper-editor-header">
    <div class="btn btn-success" @click="$emit('edit-done')">完成</div>
  </div>
  <div slot="body" class="swiper-editor-body">
    <div style="text-align: right; margin-bottom: 12px;">
      <button class="swiper-add-image-btn" @click.stop="selectImage">+ 添加图片</button>
    </div>
    <div>
      <ul class="swiper-image-list">
        <li v-for="(image, index) in imageList">
          <image-picker :value="image" @image-change="imageChange" :id="index"></image-picker>
        </li>
      </ul>
    </div>
  </div>
</sidebar>
</template>

<style>
.swiper-add-image-btn {
  -webkit-appearance: none;
  outline: none;
  background: none;
  border: none;
  padding: 0;
  font-size: 16px;
}
.swiper-add-image-btn:hover {
  color: #337ab7;
}
.swiper-image-list {
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.swiper-image-list li {
  list-style-type: none;
  padding: 0;
  margin-bottom: 12px;
}
</style>