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
      projectFolders: [],
      personalFolders: [],
      viewingImage: {},
      currentFolder: {},
      defaultFolder: {},
      uploading: [],
      projectId: 0,
      imageUrlEditing: false,
      imageUrl: '',
      freeImages: [
        { image: '16324.jpg', width: '1280', height: '854' },
        { image: '16330.jpg', width: '1280', height: '854' },
        { image: '16958.jpg', width: '1280', height: '854' },
        { image: '19368.jpg', width: '1280', height: '861' },
        { image: '19386.jpg', width: '1280', height: '854' },
        { image: '45530.jpg', width: '1280', height: '853' },
        { image: '45531.jpg', width: '1280', height: '855' },
        { image: '45532.jpg', width: '1280', height: '854' },
        { image: '51046.jpg', width: '1280', height: '854' },
        { image: '61109.jpg', width: '1280', height: '854' },
        { image: '66264.jpg', width: '1280', height: '854' },
        { image: '66529.jpg', width: '1280', height: '922' },
        { image: '66599.jpg', width: '1280', height: '854' },
        { image: '66609.jpg', width: '1280', height: '720' },
        { image: '66617.jpg', width: '1280', height: '845' },
        { image: '66698.jpg', width: '1280', height: '854' },
        { image: '66724.jpg', width: '1280', height: '854' },
        { image: '66794.jpg', width: '1280', height: '854' },
        { image: '66821.jpg', width: '1280', height: '854' },
        { image: '67203.jpg', width: '1280', height: '848' },
        { image: '67272.jpg', width: '1280', height: '849' },
        { image: '67281.jpg', width: '1280', height: '894' },
        { image: '67326.jpg', width: '1280', height: '779' },
        { image: '67332.jpg', width: '1280', height: '775' },
        { image: '67394.jpg', width: '1280', height: '854' },
        { image: '67396.jpg', width: '1280', height: '854' },
        { image: '67399.jpg', width: '1280', height: '854' },
        { image: '67407.jpg', width: '1280', height: '854' },
        { image: '67410.jpg', width: '1280', height: '853' },
        { image: '67414.jpg', width: '1280', height: '854' },
        { image: '67450.jpg', width: '1280', height: '854' },
        { image: '67455.jpg', width: '1280', height: '853' },
        { image: '67476.jpg', width: '1280', height: '854' },
        { image: '67566.jpg', width: '1280', height: '854' },
        { image: '67567.jpg', width: '1280', height: '645' },
        { image: '67572.jpg', width: '1280', height: '854' },
        { image: '67579.jpg', width: '1280', height: '841' },
        { image: '67583.jpg', width: '1280', height: '854' },
        { image: '67584.jpg', width: '1280', height: '854' },
        { image: '67588.jpg', width: '1280', height: '854' },
        { image: '67591.jpg', width: '1280', height: '854' },
        { image: '67603.jpg', width: '1280', height: '854' },
        { image: '67609.jpg', width: '1280', height: '854' },
        { image: '67614.jpg', width: '1280', height: '779' },
        { image: '67650.jpg', width: '1280', height: '854' },
        { image: '67663.jpg', width: '1280', height: '854' },
        { image: '67670.jpg', width: '1280', height: '854' },
        { image: '67672.jpg', width: '1280', height: '854' },
        { image: '67681.jpg', width: '1280', height: '857' },
        { image: '67686.jpg', width: '1280', height: '851' },
        { image: '67699.jpg', width: '1280', height: '854' },
        { image: '67701.jpg', width: '1280', height: '854' },
        { image: '67718.jpg', width: '1280', height: '854' },
        { image: '67720.jpg', width: '1280', height: '854' },
        { image: '67788.jpg', width: '1280', height: '960' },
        { image: '67795.jpg', width: '1280', height: '854' },
        { image: '67800.jpg', width: '1280', height: '854' },
        { image: '67832.jpg', width: '1280', height: '854' },
        { image: '67836.jpg', width: '1280', height: '853' },
        { image: '67840.jpg', width: '1280', height: '854' },
        { image: '67854.jpg', width: '1280', height: '854' },
        { image: '67855.jpg', width: '1280', height: '854' },
        { image: '67874.jpg', width: '1280', height: '848' },
        { image: '67875.jpg', width: '1280', height: '850' },
        { image: '67878.jpg', width: '1280', height: '722' },
        { image: '67889.jpg', width: '1280', height: '855' },
        { image: '67890.jpg', width: '1280', height: '854' },
        { image: '67896.jpg', width: '1280', height: '854' },
        { image: '67899.jpg', width: '1280', height: '854' },
        { image: '67903.jpg', width: '1280', height: '831' },
        { image: '67905.jpg', width: '1280', height: '854' },
        { image: '67930.jpg', width: '1280', height: '700' },
        { image: '67932.jpg', width: '1280', height: '853' },
        { image: '67934.jpg', width: '1280', height: '854' },
        { image: '67936.jpg', width: '1280', height: '707' },
        { image: '67937.jpg', width: '1280', height: '854' },
        { image: '67938.jpg', width: '1280', height: '864' },
        { image: '67946.jpg', width: '1280', height: '854' },
        { image: '67958.jpg', width: '1280', height: '854' },
        { image: '67984.jpg', width: '1280', height: '854' },
        { image: '67985.jpg', width: '1280', height: '721' },
        { image: '68041.jpg', width: '1280', height: '855' },
        { image: '68052.jpg', width: '1280', height: '724' },
        { image: '68053.jpg', width: '1280', height: '854' },
        { image: '68054.jpg', width: '1280', height: '854' },
        { image: '68061.jpg', width: '1280', height: '854' },
        { image: '68063.jpg', width: '1280', height: '854' },
        { image: '68073.jpg', width: '1280', height: '855' },
        { image: '68080.jpg', width: '1280', height: '855' },
        { image: '68092.jpg', width: '1280', height: '864' },
        { image: '68098.jpg', width: '1280', height: '853' },
        { image: '68108.jpg', width: '1280', height: '854' },
        { image: '68109.jpg', width: '1280', height: '854' },
        { image: '68111.jpg', width: '1280', height: '854' },
        { image: '68112.jpg', width: '1280', height: '854' },
        { image: '68114.jpg', width: '1280', height: '854' },
        { image: '68123.jpg', width: '1280', height: '854' },
        { image: '68128.jpg', width: '1280', height: '800' },
        { image: '68132.jpg', width: '1280', height: '854' }
      ]
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

    getFreeImages () {
      this.currentTab = 'free'
      this.currentImageIndex = null
    },

    getMyImages () {
      this.currentTab = 'my'
      this.currentImageIndex = null
      API.imageFolder.get({ project_id: this.page.project_id }).then(response => {
        this.projectFolders = response.data
      })
      if (this.personalFolders.length > 0) {
        return
      }
      this.mainStatus = 'loading'
      API.imageFolder.get({ project_id: 0 }).then(response => {
        this.personalFolders = response.data
        this.defaultFolder = find(this.personalFolders, f => f.is_default === 1) || this.personalFolders[0]
        this.currentFolder = this.defaultFolder
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
            vm.images = []
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
            vm.currentFolder = vm.defaultFolder
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
          this.imageUrl = ''
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
      if (this.currentTab === 'free' && index !== null) {
        this.imageLibrary.onSelect({
          url: '//s1.ujustatic.com/freeimg/' + this.freeImages[index].image,
          width: this.freeImages[index].width,
          height: this.freeImages[index].height
        })
        this.closeImageLibrary()
      } else if (index !== null && this.images[index]) {
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
    this.getMyImages()
  }
}

</script>

<template>
  <modal :show="imageLibrary.show" @close="close" width="980px" height="560px">
    <div slot="header">
      <ul class="nav nav-pills">
        <!-- <li :class="{active: currentTab === 'project'}" @click="switchTab('project')"><a href="javascript:;">项目图片库</a></li> -->
        <li :class="{active: currentTab === 'my'}"><a href="javascript:;" @click.prevent="getMyImages">我的图片</a></li>
        <li :class="{active: currentTab === 'free'}"><a href="javascript:;" @click.prevent="getFreeImages">免费图库</a></li>
      </ul>
    </div>
    <div slot="body" class="images-wrapper" v-if="currentTab === 'free'" style="padding: 0 25px;">
      <div v-for="(image, index) in freeImages" class="image-item" v-bind:class="{selected: currentImageIndex === index}" @click="selectImage(index)" @dblclick="pickImage(index)" :key="index">
        <div class="image-item-wrapper">
          <img :src="'//s1.ujustatic.com/freeimg/' + image.image + '@150w_150h'">
          <div v-show="currentImageIndex === index" class="image-item-operation">
            <div class="btn btn-primary btn-sm fr" @click="pickImage(index)">&nbsp; 选择 &nbsp;</div>
            <!-- <div class="btn btn-default btn-sm fr" @click="viewImage(index)"><span class="glyphicon glyphicon-zoom-in"></span></div> -->
          </div>
        </div>
      </div>
    </div>
    <div slot="body" class="images-wrapper" v-if="currentTab === 'my'">
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
              <img :src="getThumbs(image.url)" :alt="image.alt">
              <div v-show="currentImageIndex === index" class="image-item-operation">
                <div class="btn btn-default btn-sm fl" @click="viewImage(index)"><span class="glyphicon glyphicon-zoom-in"></span></div>
                <div class="btn btn-primary btn-sm fr" @click="pickImage(index)">&nbsp; 选择 &nbsp;</div>
              </div>
            </div>
          </div>
          <div v-for="item in uploading" class="image-uploading" :key="'uploading' + item">
            <div class="loading">
              <div class="loading-icon small"></div>
            </div>
            <div>图片上传中</div>
          </div>
          <div v-if="images.length === 0 && uploading.length === 0" key="empty" style="line-height: 300px;">
            <p class="text-muted">这个文件夹中暂时还没有图片。</p>
          </div>
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

    <div slot="footer" v-if="currentTab === 'my'">
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
    <div slot="footer" v-if="currentTab === 'free'">
      <span v-if="currentImageIndex !== null">
        尺寸: {{freeImages[currentImageIndex].width}} X {{freeImages[currentImageIndex].height}} &nbsp;
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
  text-align: left;
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