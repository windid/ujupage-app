<script>
import { mapActions } from 'vuex'

export default {
  name: 'image-picker',
  props: {
    'value': {
      required: true
    },
    'id': {
      required: false
    }
  },
  data: function () {
    return {
      image: this.value
    }
  },
  methods: {
    ...mapActions([
      'getImage'
    ]),
    selectImage () {
      this.$emit('before-pick')
      this.getImage([(image) => {
        if (image && this.image && image.url === this.image.url) {
          return
        }
        this.image = image
        this.$emit('image-change', image, this.id)
        this.$emit('after-pick')
      }])
    },
    deleteImage () {
      this.image = null
      this.$emit('image-change', null, this.id)
    }
  },
  watch: {
    'value': function (val) {
      this.image = val
    }
  }
}
</script>

<template>
<div class="image-picker" @click="selectImage">
  <div v-if="image && image.url" class="image-thumbnail-wrapper">
    <img :src="image.url" class="image-thumbnail"/>
    <div class="image-thumbnail-action">
      <div @click.stop="selectImage">更换</div>
      <div @click.stop="deleteImage">删除</div>
    </div>
  </div>
  <span v-else>图片背景</span>
</div>
</template>

<style scoped>
  .image-picker {
    position: relative;
    width: 120px;
    height: 120px;
    /* border: 1px dashed #444; */
    background-color: #eee;
    cursor: pointer;
    border-radius: 3px;
    overflow: hidden;
  }
  .image-thumbnail-wrapper {
    height: 100%;
    display: table-cell;
    vertical-align: middle;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .image-thumbnail {
    max-width: 100%;
    max-height: 100%;
    height: auto;
  }
  .image-thumbnail-action {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: #333;
    color: #fff;
    flex-direction: column;
    display: none;
  }
  .image-picker:hover .image-thumbnail-action {
    display: flex;
  }
  .image-thumbnail-action div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .image-thumbnail-action div:hover {
    background-color: #444;
  }
</style>