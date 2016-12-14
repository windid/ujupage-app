<script>
import { mapActions } from 'vuex'

export default {
  name: 'image-picker',
  props: {
    'value': {
      required: true
    }
  },
  computed: {
    image: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    ...mapActions([
      'getImage'
    ]),
    selectImage () {
      this.getImage([(image) => {
        if (image && this.image === image.url) {
          return
        }
        this.image = image.url
      }])
      this.$emit('image-changed', this.image)
    },
    deleteImage () {
      this.image = ''
      this.$emit('image-removed', this.image)
    }
  }
}
</script>

<template>
  <div class="image-picker" @click="selectImage">
    <div v-if="image" class="image-wrapper">
      <img class="image-thumbs" :src="image" alt="">
      <div class="image-action">
        <div @click.stop="selectImage">更换</div>
        <div @click.stop="deleteImage">删除</div>
      </div>
    </div>
    <span v-else>点选图片</span>
  </div>
</template>

<style scoped>
.image-picker {
  line-height: 120px;
  text-align: center;
  width: 100%;
  height: 120px;
  background: #eee;
  cursor: pointer;
  border-radius: 4px;
  overflow: hidden;
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.image-thumbs {
  max-width: 100%;
  max-height: 100%;
  height: auto;
}

.image-action {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #666;
  color: #fff;
  flex-direction: column;
  display: none;
}

.image-action div {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-picker:hover .image-action {
  display: flex;
}

.image-action div:hover {
  background-color: #999;
}
</style>
