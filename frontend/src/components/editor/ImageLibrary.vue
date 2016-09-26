<script>
import Modal from '../ui/Modal'
import imageAPI from '../../api/imageAPI'
import API from '../../API'
import { mapGetters, mapActions } from 'vuex'
import { merge } from 'lodash'
// import eventHandler from '../../utils/eventHandler'

export default {
  components: {
    Modal
  },
  data () {
    return {
      currentTab: 'project',
      mainStatus: 'loading',
      currentImageId: null,
      images: [],
      folders: [],
      viewingImage: {},
      currentFolder: {}
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
      getInput: 'getInput'
    }),
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
            vm.folders.push(response.data)
          })
        }
      })
    },
    uploadImage (e) {
      const files = e.target.files
      const data = new window.FormData()
      const folder = '默认文件夹'
      data.append('file', files[0])
      data.append('folder', folder)
      data.append('project_id', this.page.projectId)
      API.image.save({}, data).then(response => {
        console.log(response.data)
      })
      // imageAPI.upload(this.page.projectId, data, image => {
      //   this.images.push(image)
      //   this.mainStatus = 'imageList'
      // })
    },
    pickImage (index) {
      if (index !== null && this.images[index]) {
        this.imageLibrary.onSelect(this.images[index])
        this.closeImageLibrary()
      }
    },
    selectImage (index) {
      this.currentImageId = index
    },
    viewImage (index) {
      this.viewingImage = merge({}, this.images[index])
      this.mainStatus = 'view'
    },
    modifyImage (e) {
      var image = new window.FormData(e.target)
      imageAPI.modify(image, data => {
        this.images[this.currentImageId] = merge(this.images[this.currentImageId], image)
      })
    },
    removeImage () {
      this.confirm({
        header: '确定删除？',
        content: '图片删除后将不可恢复。',
        onConfirm: () => {
          const imageId = this.images[this.currentImageId].id
          imageAPI.remove(this.page.projectId, imageId, data => {
            const tmpIndex = this.currentImageId
            this.currentImageId = null
            this.images.splice(tmpIndex, 1)
            this.mainStatus = 'imageList'
          })
        }
      })
    }
  },
  watch: {
    'imageLibrary.show': function (show) {
      if (show) {
        // this.mainStatus = 'loading'
        // API.imageFolder.get({ project_id: 9 }).then(response => {
        //   this.folders = response.data
        //   console.log(response)
        //   this.currentFolder = this.folders.find(f => f.is_default === 1)
        //   this.loadImages(this.currentFolder.id)
        // })
        this.switchTab(this.currentTab)
      }
    }
  }
}

</script>

<template>
  <modal :show="imageLibrary.show" @close="close" width="880px" height="600px">
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
              <span class="glyphicon glyphicon-folder-close"></span> &nbsp; {{folder.dirname}}
              <span class="badge">15</span>
            </a>
          </div>
          <div class="btn btn-default" @click="addFolder">新建文件夹 + </div>
        </div>
        <div class="images-content">
          <div v-for="(image, index) in images" class="image-item" v-bind:class="{selected: currentImageId === index}" @click="selectImage(index)" @dblclick="pickImage(index)">
            <img :src="image.url+'@140w_140h'" :alt="image.alt" style="max-width:140px;max-height:140px">
            <div v-show="currentImageId === index" class="image-item-operation">
              <div class="btn btn-primary btn-sm fl" @click="pickImage(index)">&nbsp; 选择 &nbsp;</div>
              <div class="btn btn-default btn-sm fr" @click="viewImage(index)"><span class="glyphicon glyphicon-zoom-in"></span></div>
            </div>
          </div>
          <div v-if="images.length === 0">这个文件夹中暂时还没有图片。</div>
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
      <span v-if="currentImageId !== null">
        名称: {{images[currentImageId].name}} &nbsp;
        尺寸: {{images[currentImageId].width}} X {{images[currentImageId].height}} &nbsp;
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
  left: 10px;
  width: 540px;
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

.list-group-item {
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

</style>