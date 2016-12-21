<script>
import Modal from '../ui/Modal'
import { Tooltip } from 'element-ui'
import API from '../../API'
import { mapGetters, mapActions } from 'vuex'
import { merge, find } from 'lodash'

export default {
  name: 'ImageLibrary',
  components: {
    Modal,
    Tooltip
  },
  data () {
    return {
      currentTab: 'my',
      mainStatus: 'loading',
      currentImageIndex: null,
      images: [],
      folders: [],
      projectFolders: [],
      personalFolders: [],
      viewingImage: {},
      currentFolder: {},
      uploading: [],
      projectId: 0,
      imageUrlEditing: false,
      imageUrl: ''
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
      closeImageLibrary: 'closeImageLibrary',
      confirm: 'confirm',
      getInput: 'getInput',
      warning: 'warning'
    }),

    getThumbs (imageSrc) {
      const arr = imageSrc.split('.')
      const ext = arr[arr.length - 1] || 'jpg'
      return imageSrc + '@150w_150h.' + ext
    },

    close () {
      this.imageLibrary.onCancel && this.imageLibrary.onCancel()
      this.closeImageLibrary()
    },

    myImages () {
      this.mainStatus = 'loading'
      this.currentTab = 'my'
      API.imageFolder.get({ project_id: this.page.project_id }).then(response => {
        this.projectFolders = response.data
      })
      API.imageFolder.get({ project_id: 0 }).then(response => {
        this.personalFolders = response.data
        this.currentFolder = find(this.personalFolders, f => f.is_default === 1) || this.personalFolders[0]
        this.switchFolder(this.currentFolder)
      })
    },

    switchFolder (folder, projectId = 0) {
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

    addFolder (projectId) {
      const vm = this
      this.getInput({
        header: '请输入新文件夹名',
        inputAddon: '<span class="glyphicon glyphicon-folder-close"></span>',
        onConfirm (val) {
          const data = {
            dirname: val,
            project_id: projectId
          }
          API.imageFolder.save({}, data).then(response => {
            const folder = response.data
            folder.total_image = 0
            if (projectId === 0) {
              vm.personalFolders.push(folder)
            } else {
              vm.projectFolders.push(folder)
            }
            vm.currentFolder = folder
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

    removeFolder (folder, projectId) {
      const vm = this
      this.confirm({
        header: '确定删除？',
        content: '文件夹「' + folder.dirname + '」内的图片也将同时被全部删除。',
        onConfirm () {
          API.imageFolder.delete({ id: folder.id }).then(response => {
            if (projectId === 0) {
              vm.personalFolders.splice(vm.personalFolders.indexOf(folder), 1)
            } else {
              vm.projectFolders.splice(vm.projectFolders.indexOf(folder), 1)
            }
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

    editImageUrl () {
      this.imageUrlEditing = true
      this.$nextTick(() => {
        this.$refs.imageUrl.focus()
      })
    },

    uploadImageFromUrl () {
      if (this.imageUrl) {
        const data = new window.FormData()
        data.append('url', this.imageUrl)
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
            content: '图片地址不对或超过了10M'
          })
          this.uploading.pop()
        })
      }
      this.imageUrlEditing = false
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
  mounted () {
    this.myImages()
  }
}

</script>

<template>
  <modal :show="imageLibrary.show" @close="close" width="980px" height="560px">
    <div slot="header">
      <ul class="nav nav-pills">
        <!-- <li :class="{active: currentTab === 'project'}" @click="switchTab('project')"><a href="javascript:;">项目图片库</a></li> -->
        <li :class="{active: currentTab === 'my'}" @click="myImages"><a href="javascript:;">我的图片</a></li>
        <!-- <li :class="{active: currentTab === 'free'}"><a href="javascript:;" @click.prevent="currentTab = 'free'">免费图库</a></li> -->
      </ul>
    </div>
    <div slot="body" class="images-wrapper">
      <div v-show="mainStatus === 'loading'" class="loading" key="loading">
        <div class="loading-icon"></div>
      </div>

      <div v-show="mainStatus === 'imageList'" class="image-list" key="image-list">
        <div class="images-sidebar">
          <div class="list-group">
            <div class="list-group-item block-title">个人文件夹
              <tooltip placement="right" content="只有您自己可见"><span class="glyphicon glyphicon-question-sign"></span></tooltip>
            </div>
            <a v-for="(folder, index) in personalFolders" class="list-group-item" href="javascript:;" :class="{ 'active': folder === currentFolder }" @click="switchFolder(folder)">
              &nbsp;
              <span class="folder-name"><span :class="'glyphicon glyphicon-folder-' + (folder === currentFolder ? 'open' : 'close')"></span> &nbsp; {{folder.dirname}}</span>
              <span class="badge">{{folder.total_image}}</span>
              <div class="btn-group" v-if="folder.is_default === 0">
                <div class="btn btn-default" title="重命名" @click="renameFolder(folder)"><span class="glyphicon glyphicon-pencil"></span></div>
                <div class="btn btn-danger" title="删除" @click="removeFolder(folder, 0)"><span class="glyphicon glyphicon-trash"></span></div>
              </div>
            </a>
            <a href="javascript:;" class="list-group-item" style="text-align:center" @click="addFolder(0)"> <span class="glyphicon glyphicon-plus"></span> </a>
          </div>

          <div class="list-group">
            <div class="list-group-item block-title">项目文件夹
              <tooltip placement="right" content="参与协作的项目成员可见"><span class="glyphicon glyphicon-question-sign"></span></tooltip>
            </div>
            <a v-for="(folder, index) in projectFolders" class="list-group-item" href="javascript:;" :class="{ 'active': folder === currentFolder }" @click="switchFolder(folder, page.project_id)">
              &nbsp;
              <span class="folder-name"><span :class="'glyphicon glyphicon-folder-' + (folder === currentFolder ? 'open' : 'close')"></span> &nbsp; {{folder.dirname}}</span>
              <span class="badge">{{folder.total_image}}</span>
              <div class="btn-group" v-if="folder.is_default === 0">
                <div class="btn btn-default" title="重命名" @click="renameFolder(folder)"><span class="glyphicon glyphicon-pencil"></span></div>
                <div class="btn btn-danger" title="删除" @click="removeFolder(folder, page.project_id)"><span class="glyphicon glyphicon-trash"></span></div>
              </div>
            </a>
            <a href="javascript:;" class="list-group-item" style="text-align:center" @click="addFolder(page.project_id)"> <span class="glyphicon glyphicon-plus"></span> </a>
          </div>

        </div>

        <div class="images-content">
          <div v-for="(image, index) in images" class="image-item" v-bind:class="{selected: currentImageIndex === index}" @click="selectImage(index)" @dblclick="pickImage(index)" :key="index">
            <div class="image-item-wrapper">
              <img :src="getThumbs(image.url)" :alt="image.alt" style="max-width:150px;max-height:150px">
              <div v-show="currentImageIndex === index" class="image-item-operation">
                <div class="btn btn-primary btn-sm fl" @click="pickImage(index)">&nbsp; 选择 &nbsp;</div>
                <div class="btn btn-default btn-sm fr" @click="viewImage(index)"><span class="glyphicon glyphicon-zoom-in"></span></div>
              </div>
            </div>
          </div>
          <div v-for="item in uploading" class="image-uploading" :key="'uploading' + item">
            <div class="loading">
              <div class="loading-icon small"></div>
            </div>
            <div>图片上传中</div>
          </div>
          <div v-if="images.length === 0 && uploading.length === 0" key="empty">这个文件夹中暂时还没有图片。</div>
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
      <div class="fl">
        <div v-show="!imageUrlEditing" class="btn btn-default btn-sm" @click="editImageUrl">
          <span class="glyphicon glyphicon-link"></span>
          粘贴网址
        </div>
        <div v-show="imageUrlEditing" class="input-group input-group-sm shadow image-url-input">
          <div class="input-group-addon"> 图片网址 </div>
          <input ref="imageUrl" v-model="imageUrl" @keyup.enter="uploadImageFromUrl" type="text" class="form-control input-text-shadow">
          <div class="input-group-btn">
            <div class="btn btn-success" @click="uploadImageFromUrl"><span class="glyphicon glyphicon-ok"></span></div>
          </div>
        </div>
      </div>
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
  border-right:1px solid #eee;
  padding-right:15px;
  width: 220px;
  height:100%;
}

.images-wrapper, .image-list {
  height: 100%;
}

.images-content{
  position: relative;
  margin-left: 230px;
  width: calc(100% - 230px);
}

.image-item, .image-uploading {
  transition: all .3s ease;
  position: relative;
  float: left;
  width: 150px;
  margin: 0 13px 20px 13px;
  height: 150px;
  text-align: center;
  cursor: pointer;
  display: table;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 8px #ccc;
}

.image-item-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.image-item:hover, .image-uploading:hover{
  box-shadow: 0 2px 10px #aaa;
}

.image-item.selected{
}

.image-item-operation{
  width: 150px;
  position: absolute;
  padding: 3px;
  bottom: 0px;
  background: rgba(210, 210, 210, .4);
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

.block-title {
  background: #f6f6f6;
}

.folder-name {
  float: left;
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.list-group-item > .btn-group {
  display: none;
  position: absolute;
  right: -30px;
  top: 3px;
}

.list-group-item:hover > .btn-group {
  display: block;
}

</style>