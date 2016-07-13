<script>
import {  } from '../store/actions'
import {  } from '../store/getters'
import modal from './modal.vue'
import dropdown from './dropdown.vue'
import eventHandler from '../utils/eventHandler'

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
      loading: true,
      currentImageId: null,
      imageUrlEditing: false,
      images: {}
    }
  },
  methods:{
    pickImage: function(imageId){
      if (imageId != null){
        this.imageObj = this.images[imageId];
        this.show = false;
      }
    },
    uploadImage: function(e){
      let files = e.target.files;
      let data = new FormData();
      let folder = '默认文件夹';
      data.append('image', files[0]);
      data.append('folder',folder);
      this.$http.post('/editor/image/upload', data).then(function(response){
        console.log('success');
      },function(response){
        console.log(response);
      });
    },
    editImageUrl: function(){
      this.currentImageId = null;
      const el = this.$els.imageUrlEditor;
      this._closeEvent = eventHandler.listen(window, 'click', (e)=> {
        if (!el.contains(e.target)) this.editImageUrlDone();
      })
      this.imageUrlEditing = true;
      var vm = this;
      Vue.nextTick(function(){
        vm.$els.imageUrlInput.focus();
      });
    },
    editImageUrlDone: function(){
      this.imageUrlEditing = false;
      if (this._closeEvent) this._closeEvent.remove();
    },
    loadImages: function(folder){
      this.$http
      this.images = {
        1567: {
          name:"test", 
          alt:"",
          url:  "http://img9.dzdwl.com/img/234114120527677151.jpg", 
          thumb:"http://img9.dzdwl.com/img/234114120527677151.jpg", 
          width:"913", 
          height:"571"},
        2522: {
          name:"test2", 
          alt:"",
          url:  "http://i.donglimall.com/news/UpFiles/bizhi/201505/16/20140527032929367.jpg", 
          thumb:"http://i.donglimall.com/news/UpFiles/bizhi/201505/16/20140527032929367.jpg", 
          width:"750", 
          height:"1344"},
        3455: {
          name:"test3", 
          alt:"",
          url:  "http://bcs.kuaiapk.com/rbpiczy/Wallpaper/2013/2/17/907466d282b1431f915b62b861abc026-3.jpg", 
          thumb:"http://bcs.kuaiapk.com/rbpiczy/Wallpaper/2013/2/17/907466d282b1431f915b62b861abc026-3.jpg", 
          width:"2048", 
          height:"2048"},
        5532: {
          name:"test4", 
          alt:"",
          url:  "http://img9.dzdwl.com/img/2012081210373.jpg", 
          thumb:"http://img9.dzdwl.com/img/2012081210373.jpg", 
          width:"3000", 
          height:"1916"},
      }
      this.loading = false;
    }
  },
  vuex: {
    actions: {
      
    },
    getters: {
      
    }
  },
  ready (){
    this.loadImages('默认文件夹');
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
      <div v-show="loading" class="loading"></div>
      <div v-else>
        <div v-for="(imageId,image) in images" class="image-item" v-bind:class="{selected: imageId === currentImageId}" @click="currentImageId = imageId" @dblclick="pickImage(imageId)">
          <img :src="image.thumb" alt="{{image.alt}}" style="max-width:140px;max-height:140px">
        </div>
      </div>
    </div>
    <div slot="footer">
      <div class="btn btn-primary btn-sm image-upload-button">
        <span class="glyphicon glyphicon-cloud-upload"></span>
        上传图片
        <input type="file" name="files[]" class="image-upload-input" accept="image/*" v-on:change="uploadImage">
      </div>
      <div v-el:image-url-editor class="fl">
        <div v-show="!imageUrlEditing" class="btn btn-default btn-sm" @click="editImageUrl">
          <span class="glyphicon glyphicon-link"></span>
          粘贴网址
        </div>
        <div v-show="imageUrlEditing" class="input-group input-group-sm shadow image-url-input">
          <div class="input-group-addon"> 图片网址 </div>
          <input v-el:image-url-input type="text" class="form-control input-text-shadow">
          <div class="input-group-btn" @click="editImageUrlDone">
            <div class="btn btn-success"><span class="glyphicon glyphicon-ok"></span></div>
          </div>
        </div>
      </div>
      <!-- <div class="fl" @click.stop>
        <dropdown :show.sync="showUploadMenu" :dir="'up'">
          <slot><div data-toggle="dropdown" class="btn btn-primary btn-sm dropdown-toggle">上传图片</div></slot>
          <ul slot="dropdown-menu" class="dropdown-menu" style="min-width:120px;">
            <li class="image-upload-option">
              <span class="glyphicon glyphicon-cloud-upload"></span>
              <span>从电脑上传</span>
              
            </li>
            <li class="image-upload-option" style="border-top:1px solid #ccc">
              <span class="glyphicon glyphicon-link"></span>
              <span>从网址上传</span>
            </li>
          </ul>
        </dropdown> 
      </div>-->
      <span v-if="currentImageId !== null">
        名称:{{images[currentImageId].name}} &nbsp;
        Alt:{{images[currentImageId].alt}} &nbsp;
        尺寸:{{images[currentImageId].width}} X {{images[currentImageId].height}} &nbsp;
      </span> 
      <span class="btn btn-default btn-sm">查看 <span class="glyphicon glyphicon-zoom-in"></span></span>
      &nbsp; 
      <div class="btn btn-success btn-sm" v-bind:class="{disabled:currentImageId === null}" @click="pickImage(currentImageId)">选定这张图片</div>
    </div>
  </modal>
</template>

<style>

.images-wrapper{
  height:400px;
  overflow-y: auto;
}

.image-item{
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

</style>