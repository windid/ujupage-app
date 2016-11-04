<script>
import Vue from 'vue'
import Modal from '../ui/Modal'
import API from '../../API'
import { mapGetters, mapActions } from 'vuex'
import { merge } from 'lodash'

Vue.filter('imageThumbs', function (value) {
  const arr = value.split('.')
  const ext = arr[arr.length - 1]
  return value + '@140w_140h.' + ext
})

export default {
  components: {
    Modal
  },
  data () {
    return {
      currentTab: 'project',
      mainStatus: 'loading',
      currentImageIndex: null,
      images: [],
      folders: [],
      viewingImage: {},
      currentFolder: {},
      uploading: []
    }
  },
  computed: {
    ...mapGetters({
      'imageLibrary': 'imageLibrary',
      'page': 'editingPage'
    }),
    projectId () {
      return (this.currentTab === 'project') ? this.page.project_id : 0
    }
  },
  methods: {
    ...mapActions({
      closeImageLibrary: 'closeImageLibrary',
      confirm: 'confirm',
      getInput: 'getInput',
      warning: 'warning'
    }),
    getThumbs (imageSrc) {
      const arr = imageSrc.split('.')
      const ext = arr[arr.length - 1]
      return imageSrc + '@140w_140h.' + ext
    },
    close () {
      this.imageLibrary.onCancel && this.imageLibrary.onCancel()
      this.closeImageLibrary()
    },
    switchTab (tab) {
      this.mainStatus = 'loading'
      this.currentTab = tab
      API.imageFolder.get({ project_id: this.projectId }).then(response => {
        this.folders = response.data
        this.currentFolder = this.folders.find(f => f.is_default === 1) || this.folders[0]
        this.switchFolder(this.currentFolder)
      })
    },
    switchFolder (folder) {
      this.currentFolder = folder
      this.viewingImage = {}
      this.currentImageIndex = null
      API.image.get({ folder_id: folder.id, page: 1, page_size: 9999 }).then(response => {
        this.images = response.data.images
        this.mainStatus = 'imageList'
      }, response => {
        this.mainStatus = 'failed'
      })
    },
    addFolder () {
      const vm = this
      this.getInput({
        header: '请输入新文件夹名',
        inputAddon: '<span class="glyphicon glyphicon-folder-close"></span>',
        onConfirm (val) {
          const data = {
            dirname: val,
            project_id: vm.projectId
          }
          API.imageFolder.save({}, data).then(response => {
            const folder = response.data
            folder.total_image = 0
            vm.folders.push(folder)
          })
        }
      })
    },
    renameFolder (folder) {
      const vm = this
      this.getInput({
        header: '请输入新文件夹名',
        inputAddon: '<span class="glyphicon glyphicon-folder-close"></span>',
        content: folder.dirname,
        onConfirm (val) {
          API.imageFolder.update({ id: folder.id }, { dirname: val }).then(response => {
            folder.dirname = val
          }, response => {
            if (response.status === 422) {
              vm.warning({
                content: '文件夹名称不合法'
              })
            }
          })
        }
      })
    },
    removeFolder (folder) {
      const vm = this
      this.confirm({
        header: '确定删除？',
        content: '文件夹「' + folder.dirname + '」内的图片也将同时被全部删除。',
        onConfirm () {
          API.imageFolder.delete({ id: folder.id }).then(response => {
            vm.folders.splice(vm.folders.indexOf(folder), 1)
            vm.images = []
          })
        }
      })
    },
    uploadImage (e) {
      const files = e.target.files
      if (files.length === 0) return
      const data = new window.FormData()
      data.append('file', files[0])
      data.append('folder_id', this.currentFolder.id)
      data.append('project_id', this.projectId)
      this.uploading.push('1')
      API.image.save({}, data).then(response => {
        this.uploading.pop()
        this.images.push(response.data)
        this.currentFolder.total_image ++
      }, response => {
        this.warning({
          header: '上传失败',
          content: '图片格式不对或超过了10M'
        })
        this.uploading.pop()
      })
    },
    pickImage (index) {
      if (index !== null && this.images[index]) {
        this.imageLibrary.onSelect(this.images[index])
        this.closeImageLibrary()
      }
    },
    selectImage (index) {
      this.currentImageIndex = index
    },
    viewImage (index) {
      this.viewingImage = merge({}, this.images[index])
      this.mainStatus = 'view'
    },
    modifyImage (e) {
      const data = {
        folder_id: this.currentFolder.id,
        alt: e.target.alt.value,
        name: e.target.name.value
      }
      API.image.update({ id: this.viewingImage.id }, data).then(response => {
        this.images[this.currentImageIndex] = merge(this.images[this.currentImageIndex], data)
      })
      // imageAPI.modify(image, data => {
      //   this.images[this.currentImageIndex] = merge(this.images[this.currentImageIndex], image)
      // })
    },
    removeImage () {
      this.confirm({
        header: '确定删除？',
        content: '图片删除后将不可恢复。',
        onConfirm: () => {
          const imageId = this.images[this.currentImageIndex].id
          API.image.delete({ id: imageId }).then(response => {
            const tmpIndex = this.currentImageIndex
            this.currentImageIndex = null
            this.images.splice(tmpIndex, 1)
            this.mainStatus = 'imageList'
            this.currentFolder.total_image --
          })
        }
      })
    }
  },
  watch: {
    'imageLibrary.show': function (show) {
      if (show) {
        this.switchTab(this.currentTab)
      }
    }
  }
}

</script>

<template>
  <modal :show="imageLibrary.show" @close="close" width="1020px" height="600px">
    <div slot="header">
      <ul class="nav nav-pills">
        <li :class="{active: currentTab === 'project'}" @click="switchTab('project')"><a href="javascript:;">项目图片库</a></li>
        <li :class="{active: currentTab === 'my'}" @click="switchTab('my')"><a href="javascript:;">个人图片库</a></li>
        <!-- <li :class="{active: currentTab === 'store'}"><a href="#" @click="currentTab = 'store'">图片商店</a></li> -->
      </ul>
    </div>
    <div slot="body" class="images-wrapper">
      <div v-show="mainStatus === 'loading'" class="loading" key="loading">
        <div class="loading-icon"></div>
      </div>

      <div v-show="mainStatus === 'imageList'" class="image-list" key="image-list">
        <div class="images-sidebar">
          <div class="list-group">
            <a v-for="(folder, index) in folders" class="list-group-item" href="javascript:;" :class="{ 'selected': folder === currentFolder }" @click="switchFolder(folder)">
              &nbsp;
              <span class="folder-name"><span :class="'glyphicon glyphicon-folder-' + (folder === currentFolder ? 'open' : 'close')"></span> &nbsp; {{folder.dirname}}</span>
              <span class="badge">{{folder.total_image}}</span>
              <div class="btn-group" v-if="folder.is_default === 0">
                <div class="btn btn-default" title="重命名" @click="renameFolder(folder)"><span class="glyphicon glyphicon-pencil"></span></div>
                <div class="btn btn-danger" title="删除" @click="removeFolder(folder)"><span class="glyphicon glyphicon-trash"></span></div>
              </div>
            </a>
          </div>
          <div class="btn btn-default" @click="addFolder">新建文件夹 + </div>
        </div>
        <div class="images-content">
          <div v-for="(image, index) in images" class="image-item" v-bind:class="{selected: currentImageIndex === index}" @click="selectImage(index)" @dblclick="pickImage(index)" :key="index">
            <img :src="getThumbs(image.url)" :alt="image.alt" style="max-width:140px;max-height:140px">
            <div v-show="currentImageIndex === index" class="image-item-operation">
              <div class="btn btn-primary btn-sm fl" @click="pickImage(index)">&nbsp; 选择 &nbsp;</div>
              <div class="btn btn-default btn-sm fr" @click="viewImage(index)"><span class="glyphicon glyphicon-zoom-in"></span></div>
            </div>
          </div>
          <div v-for="item in uploading" class="image-uploading" :key="'uploading' + item">
            <div class="loading">
              <div class="loading-icon small"></div>
            </div>
            <div>图片上传中</div>
          </div>
          <div v-if="images.length === 0" key="empty">这个文件夹中暂时还没有图片。</div>
        </div>
      </div>

      <!-- 大图查看&修改 -->
      <div v-show="mainStatus === 'view'" style="height:100%" key="view">
        <div class="images-sidebar">
          <div @click="mainStatus = 'imageList'" class="btn btn-default btn-sm">&lt; 返回</div>
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
              <button type="submit" class="btn btn-success">保存修改</button> &nbsp; 
              <div class="btn btn-danger" @click="removeImage">删除图片</div>
            </div>
          </form>
        </div>
        <div class="images-content">
          <img :src="viewingImage.url" style="max-width:610px;">
        </div>
      </div>
    </div>

    <div slot="footer">
      <div class="btn btn-primary btn-sm image-upload-button">
        <span class="glyphicon glyphicon-cloud-upload"></span>
        上传图片
        <input type="file" name="files[]" class="image-upload-input" accept="image/*" @change="uploadImage">
      </div>
      <!-- <div v-el:image-url-editor class="fl">
        <div v-show="!imageUrlEditing" class="btn btn-default btn-sm" @click="inputImageUrl">
          <span class="glyphicon glyphicon-link"></span>
          粘贴网址
        </div>
        <div v-show="imageUrlEditing" class="input-group input-group-sm shadow image-url-input">
          <div class="input-group-addon"> 图片网址 </div>
          <input v-el:image-url-input type="text" class="form-control input-text-shadow">
          <div class="input-group-btn" @click="inputImageUrlDone">
            <div class="btn btn-success"><span class="glyphicon glyphicon-ok"></span></div>
          </div>
        </div>
      </div> -->
      <span v-if="currentImageIndex !== null">
        名称: {{images[currentImageIndex].name}} &nbsp;
        尺寸: {{images[currentImageIndex].width}} X {{images[currentImageIndex].height}} &nbsp;
      </span> 
    </div>
  </modal>
</template>


<style scoped>

.images-sidebar{
  float:left;
  border-right:1px solid #ccc;
  padding-right:15px;
  width: 200px;
  height:100%;
}

.images-wrapper, .image-list {
  height: 100%;
}

.images-content{
  position: relative;
  margin-left: 210px;
  width: calc(100% - 210px);
}

.image-item, .image-uploading{
  position: relative;
  float:left;
  width:146px;
  padding: 3px;
  margin: 3px;
  height:146px;
  text-align: center;
  cursor: pointer;
}

.image-item:hover, .image-uploading{
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

.folder-name {
  float: left;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.list-group-item.selected {
  background: #f6f6f6;
}

.list-group-item.selected::before {
  position: absolute;
  left: 0;
  top: 0;
  content: "";
  background: #337ab7;
  width: 8px;
  height: 100%;
}

.list-group-item > .btn-group {
  display: none;
  position: absolute;
  right: -40px;
  top: 3px;
}

.list-group-item:hover > .btn-group {
  display: block;
}

</style>