<script>
import { mapActions } from 'vuex'

export default {
  name: 'image-picker',
  props: {
    'value': {
      twoWay: true,
      required: true
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
        this.image = image
        this.$emit('image-change', image)
        this.$emit('after-pick')
      }])
    },
    deleteImage () {
      this.image = null
      this.$emit('image-change', null)
    }
  }
}
</script>

<template>
<div class="button-background-selector" @click="selectImage">
  <div v-if="image && image.url" class="button-background-thumbnail-wrapper">
    <img :src="image.url" class="button-background-thumbnail"/>
    <div class="button-background-thumbnail-action">
    <div @click.stop="selectImage">更换</div>
    <div @click.stop="deleteImage">删除</div>
    </div>
  </div>
  <span v-else>图片背景</span>
</div>
</template>

<style>
  .button-background-selector {
    position: relative;
    width: 120px;
    height: 120px;
    /* border: 1px dashed #444; */
    background-color: #eee;
    cursor: pointer;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    border-radius: 3px;
    overflow: hidden;
  }
  .button-background-thumbnail {
    max-width: 100%;
    max-height: 100%;
    height: auto;
  }
  .button-background-thumbnail-action {
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
  .button-background-selector:hover .button-background-thumbnail-action {
    display: flex;
  }
  .button-background-thumbnail-action div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .button-background-thumbnail-action div:hover {
    background-color: #444;
  }
</style>