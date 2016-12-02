<script>
import Sidebar from '../ui/Sidebar'

export default {
  name: 'swiper-editor',
  props: ['images', 'show'],
  components: {
    Sidebar
  },
  data () {
    return {
      imageList: []
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
    <div style="text-align: right;">
        <button class="swiper-add-image-btn">+ 添加图片</button>
    </div>
    <div>
        <ul>
            <li v-for="(image, index) in imageList">
                <img src="image">
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
</style>