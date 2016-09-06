<script>
import Modal from '../ui/Modal'
import imageAPI from '../../api/imageAPI'
import { mapGetters, mapActions } from 'vuex'
import { merge } from 'lodash'
// import eventHandler from '../../utils/eventHandler'

export default {
  components: {
    Modal
  },
  data () {
    return {
      currentTab: 'my',
      loadStatus: 'loading',
      currentImageId: null,
      images: [],
      viewingImage: {}
    }
  },
  computed: {
    ...mapGetters({
      'imageLibrary': 'imageLibrary',
      'page': 'editingPage'
    })
  },
  methods: {
    ...mapActions({
      close: 'colseImageLibrary'
    }),
    load (folder) {
      this.loadStatus = 'loading'
      imageAPI.list(this.page.projectId, folder, data => {
        this.images = data.images
        if (this.images.length === 0) {
          this.loadStatus = 'empty'
        } else {
          this.loadStatus = 'loaded'
        }
      }, data => {
        this.loadStatus = 'failed'
      })
    },
    pickImage (index) {
      if (index !== null && this.images[index]) {
        this.imageLibrary.onSelect(this.images[index])
        this.close()
      }
    },
    selectImage (index) {
      this.currentImageId = index
    },
    viewImage (index) {
      this.viewingImage = merge({}, this.images[index])
      this.loadStatus = 'view'
    },
    removeImage () {
      const imageId = this.images[this.currentImageId].id
      imageAPI.remove(this.projectId, imageId, data => {
        const tmpIndex = this.currentImageId
        this.currentImageId = null
        this.images.splice(tmpIndex, 1)
        this.loadStatus = 'loaded'
      })
    }
  },
  watch: {
    'imageLibrary.show': function (show) {
      if (show) {
        this.load('default')
      }
    }
  }
  // mounted () {
  //   this.load([this.page.projectId, 'default'])
  // }
}

</script>

<template>
  <modal :show="imageLibrary.show" @close="close" :width="'800px'" :height="'500px'">
    <div slot="header">
      <ul class="nav nav-pills">
        <li><a href="#">我的图片库</a></li>
        <!-- <li :class="{active: currentTab === 'store'}"><a href="#" @click="currentTab = 'store'">图片商店</a></li> -->
      </ul>
    </div>
    <div slot="body" class="images-wrapper">
      <transition-group name="fade" mode="out-in">
        <div v-show="loadStatus === 'loading'" class="loading" key="loading">
          <div class="loading-icon"></div>
        </div>
        <div v-show="loadStatus === 'empty'" class="image-load-info" key="empty">
          <p>您的图片库目前还是空的，您可以尝试上传一些。</p>
        </div>

        <div v-show="loadStatus === 'loaded'" class="loaded" key="loaded">
          <div v-for="(image, index) in images" class="image-item" v-bind:class="{selected: currentImageId === index}" @click="selectImage(index)" @dblclick="pickImage(index)">
            <img :src="image.url+'@140w_140h'" :alt="image.alt" style="max-width:140px;max-height:140px">
            <div v-show="currentImageId === index" class="image-item-operation">
              <div class="btn btn-primary btn-sm fl" @click="pickImage(index)">&nbsp; 选择 &nbsp;</div>
              <div class="btn btn-default btn-sm fr" @click="viewImage(index)"><span class="glyphicon glyphicon-zoom-in"></span></div>
            </div>
          </div>
        </div>

        <!-- 大图查看&修改 -->
        <div v-show="loadStatus === 'view'" style="height:100%" key="view">
          <div class="images-sidebar">
            <div @click="loadStatus = 'loaded'" class="btn btn-default btn-sm">返回</div>
            <form action="" method="post" @submit.prevent="modifyImage">
              <div class="modify-image-input">
                <p>名称</p>
                <p><input type="text" class="form-control" name="name" v-model="viewingImage.name"></p>
              </div>
              <div class="modify-image-input">
                <p>Alt</p>
                <p><input type="text" class="form-control" name="alt" v-model="viewingImage.alt"></p>
              </div>
              <div class="modify-image-input">
                <input type="hidden" name="project_id" :value="page.projectId">
                <input type="hidden" name="id" :value="viewingImage.id">
                <input type="hidden" name="folder" value="default">
                <button type="submit" class="btn btn-success">保存修改</button> &nbsp; 
                <div class="btn btn-danger" @click="removeImage">删除图片</div>
              </div>
            </form>
          </div>
          <div class="images-content">
            <img :src="viewingImage.url" style="max-width:540px;">
          </div>
        </div>
      </transition-group>

    </div>
  </modal>
</template>


<style>

.images-wrapper{
  max-height:400px;
  overflow-y: auto;
}

.images-sidebar{
  float:left;
  border-right:1px solid #ccc;
  padding-right:15px;
  width: 200px;
  height:100%;
}

.images-content{
  left: 10px;
  width: 560px;
  height: 100%;
  position: relative;
  overflow: auto;
}

.image-item{
  position: relative;
  float:left;
  width:146px;
  padding: 3px;
  margin: 2px;
  height:146px;
  text-align: center;
  cursor: pointer;
}

.image-item:hover{
  outline: 1px solid #ccc;
  background-color: #fff;
}

.image-item.selected{
  outline: 2px solid #bbb;
  background-color: #fff;
}

.image-item-operation{
  width: 140px;
  position: absolute;
  bottom: 3px;
}

.image-upload-button{
  position: relative;
  float:left;
  margin-right: 8px;
}

.image-upload-input{
  position: absolute;
  left: 0;
  top: 0;
  font-size: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.image-url-input{
  width:400px;
}

.image-load-info{
  width:600px;
  text-align: center;
  position:absolute; 
  top:50%;
  left:50%;
  transform:translate(-50%,-50%); 
}

.modify-image-input{
  margin-top:20px;
}

</style>