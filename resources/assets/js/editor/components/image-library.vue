<script>
import modal from './modal.vue'
import imageAPI from '../../api/image'
import dropdown from './dropdown.vue'
import eventHandler from '../../utils/eventHandler'
import { merge } from 'lodash'

export default {
  components: {
    modal,
    dropdown
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      twoWay: true    
    },
    imageObj:{
      type: Object,
      required: true,
      twoWay: true
    }
  },
  data (){
    return {
      currentTab: 'my',
      loadStatus: 'loading',
      currentImageId: null,
      viewingImage: {},
      imageUrlEditing: false,
      images: [],
      projectId: window._pageInfo.projectId
    }
  },
  methods:{
    pickImage: function(index){
      if (index != null){
        this.imageObj = this.images[index];
        this.show = false;
      }
    },
    selectImage: function(index){
      this.currentImageId = index;
    },
    viewImage: function(index){
      this.viewingImage = merge({},this.images[index]);
      this.loadStatus = 'view';
    },
    modifyImage: function(e){
      var image = new FormData(e.target);
      imageAPI.modify(image, data => {
        this.images[this.currentImageId] = merge(this.images[this.currentImageId], image);
      }, data => {
        console.log(data);
      })
      // this.$http.post('/editor/image/modimage',data).then(function(response){
      //   console.log(response)
      // },function(response){
      //   console.log(response)
      // });
    },
    removeImage: function(){
      const imageId = this.images[this.currentImageId].id;
      imageAPI.remove(this.projectId, imageId, data => {
        const tmpIndex = this.currentImageId;
        this.currentImageId = null;
        this.images.splice(tmpIndex, 1);
        this.loadStatus = 'loaded';
      }, data => {
        console.log(data);
      });
    },
    uploadImage: function(e){
      let files = e.target.files;
      let data = new FormData();
      let folder = '默认文件夹';
      data.append('file', files[0]);
      data.append('folder',folder);
      data.append('project_id',this.projectId);
      imageAPI.upload(this.projectId, data, image => {
        this.images.push(image);
        this.loadStatus = 'loaded';
      }, data => {
        console.log(data);
      });
    },
    inputImageUrl: function(){
      this.currentImageId = null;
      const el = this.$els.imageUrlEditor;
      this._closeEvent = eventHandler.listen(window, 'click', (e)=> {
        if (!el.contains(e.target)) this.inputImageUrlDone();
      })
      this.imageUrlEditing = true;
      this.$nextTick(function(){
        this.$els.imageUrlInput.focus();
      });
    },
    inputImageUrlDone: function(){
      this.imageUrlEditing = false;
      if (this._closeEvent) this._closeEvent.remove();
    },
    loadImages: function(folder){
      imageAPI.list(this.projectId, folder, 1, 9999, data => {
        this.images = data.images;
        if (this.images.length === 0){
          this.loadStatus = 'empty';
        } else {
          this.loadStatus = 'loaded';
        }
      }, data => {this.loadStatus = 'failed'})
    }
  },
  ready (){
    this.loadImages('default');
  }
}
</script>

<template>
  <modal :show.sync="show" :width="'800px'">
    <div slot="header">
      <ul class="nav nav-pills">
        <li role="presentation"><a href="#">我的图片库</a></li>
        <!-- <li role="presentation" :class="{active: currentTab === 'store'}"><a href="#" @click="currentTab = 'store'">图片商店</a></li> -->
      </ul>
    </div>
    
    <div slot="body" class="images-wrapper">
      <div v-show="loadStatus === 'loading'" class="loading"></div>
      <div v-show="loadStatus === 'empty'" class="image-load-info">
        <p>您的图片库目前还是空的，您可以尝试上传一些。</p>
      </div>

      <div v-show="loadStatus === 'failed'" class="image-load-info">
        <p class="text-danger">由于网络或服务器的原因，图片列表加载失败，请稍后再试。</p>
        <p class="text-muted">如果这个问题一直存在，请与我们联系。</p>
      </div>

      <div v-show="loadStatus === 'loaded'" class="loaded">
        <div v-for="(index,image) in images" class="image-item" v-bind:class="{selected: currentImageId === index}" @click="selectImage(index)" @dblclick="pickImage(index)">
          <img :src="image.url+'@140w_140h'" alt="{{image.alt}}" style="max-width:140px;max-height:140px">
          <div v-show="currentImageId === index" class="image-item-operation">
            <div class="btn btn-primary btn-sm fl" @click="pickImage(index)">&nbsp; 选择 &nbsp;</div>
            <div class="btn btn-default btn-sm fr" @click="viewImage(index)"><span class="glyphicon glyphicon-zoom-in"></span></div>
          </div>
        </div>
      </div>

      <!-- 大图查看&修改 -->
      <div v-show="loadStatus === 'view'" style="height:100%">
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
              <input type="hidden" name="project_id" :value="projectId">
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

<style>

.images-wrapper{
  height:400px;
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