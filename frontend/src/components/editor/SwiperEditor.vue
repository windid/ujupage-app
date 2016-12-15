<script>
import Sidebar from '../ui/Sidebar'
import ImagePicker from './ImagePicker'
import { mapActions } from 'vuex'

export default {
  name: 'swiper-editor',
  props: ['id', 'images', 'value', 'show'],
  components: {
    Sidebar,
    ImagePicker
  },
  methods: {
    ...mapActions([
      'getImage'
    ]),
    selectImage () {
      this.getImage([(image) => {
        this.imageList.push(image.url)
      }])
    },
    imageRemoved (index) {
      this.imageList.splice(index, 1)
    }
  },
  computed: {
    imageList: {
      get () {
        return this.images
      },
      set (val) {
        this.$emit('images-change', val)
      }
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
    <div class="swiper-property">
      <div class="swiper-auto">
        <label><input type="checkbox" v-model="value.auto"></input> 自动播放</label>
        <label><input type="checkbox" v-model="value.button"></input> 翻页按钮</label>
      </div>
      <!-- <div class="swiper-effect">
        <label><input type="radio" value="horizontal" v-model="value.effect"> 水平滚动</label>
        <label><input type="radio" value="vertical" v-model="value.effect"> 垂直滚动</label>
        <label><input type="radio" value="fade" v-model="value.effect"> 淡入淡出</label>
      </div> -->
    </div>
    <div style="margin-bottom: 12px;">
      <div class="btn btn-primary" @click.stop="selectImage">+ 添加图片</div>
    </div>
    <div>
      <ul class="swiper-image-list">
        <li v-for="(image, index) in imageList">
          <image-picker v-model="imageList[index]" @image-removed="imageRemoved(index)"></image-picker>
        </li>
      </ul>
    </div>
  </div>
</sidebar>
</template>

<style scoped>
label {
  font-weight: normal;
  margin: 5px;
}

.swiper-image-list {
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.swiper-image-list li {
  width: 120px;
  list-style-type: none;
  padding: 0;
  margin-bottom: 12px;
}
.swiper-property {
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
  padding: 12px 0;
}
</style>