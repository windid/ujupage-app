<style>

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

</style>

<template>
  <modal :show.sync="show" :width="'800px'" :height="'400px'" >
    <div slot="header">
      <ul class="nav nav-pills">
        <li role="presentation"><a href="#">我的图片库</a></li>
        <!-- <li role="presentation" :class="{active: currentTab === 'store'}"><a href="#" @click="currentTab = 'store'">图片商店</a></li> -->
      </ul>
    </div>
    
    <div slot="body">
      <div v-show="loading" class="loading"></div>
      <div v-else>
        <div v-for="(imageId,image) in images" class="image-item" v-bind:class="{selected: imageId === currentImageId}" @click="currentImageId = imageId" @dblclick="pickImage(imageId)">
          <img :src="image.thumb" alt="{{image.alt}}" style="max-width:140px;max-height:140px">
        </div>
      </div>
    </div>
    <div slot="footer">
      <!-- <button class="btn btn-default btn-sm" @click="show = false">关闭</button> -->
      <button class="btn btn-primary btn-sm fl" @click="">上传图片</button>
      <span v-if="currentImageId !== null">
        名称:{{images[currentImageId].name}} &nbsp;
        Alt:{{images[currentImageId].alt}} &nbsp;
        尺寸:{{images[currentImageId].width}} X {{images[currentImageId].height}} &nbsp;
        <span class="btn btn-default btn-sm">查看 <span class="glyphicon glyphicon-zoom-in"></span></span>
      </span> &nbsp; 
      <div class="btn btn-success btn-sm" v-bind:class="{disabled:currentImageId === null}" @click="pickImage(currentImageId)">选定这张图片</div>
    </div>
  </modal>
</template>

<script>
import {  } from '../store/actions'
import {  } from '../store/getters'
import modal from './modal.vue'

export default {
  components: {
    modal
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
    loadImages: function(){
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
        1527: {
          name:"test", 
          alt:"",
          url:  "http://img9.dzdwl.com/img/234114120527677151.jpg", 
          thumb:"http://img9.dzdwl.com/img/234114120527677151.jpg", 
          width:"913", 
          height:"571"},
        6689: {
          name:"test2", 
          alt:"",
          url:  "http://i.donglimall.com/news/UpFiles/bizhi/201505/16/20140527032929367.jpg", 
          thumb:"http://i.donglimall.com/news/UpFiles/bizhi/201505/16/20140527032929367.jpg", 
          width:"750", 
          height:"1344"},
        9535: {
          name:"test3", 
          alt:"",
          url:  "http://bcs.kuaiapk.com/rbpiczy/Wallpaper/2013/2/17/907466d282b1431f915b62b861abc026-3.jpg", 
          thumb:"http://bcs.kuaiapk.com/rbpiczy/Wallpaper/2013/2/17/907466d282b1431f915b62b861abc026-3.jpg", 
          width:"2048", 
          height:"2048"},
        7363: {
          name:"test4", 
          alt:"",
          url:  "http://img9.dzdwl.com/img/2012081210373.jpg", 
          thumb:"http://img9.dzdwl.com/img/2012081210373.jpg", 
          width:"3000", 
          height:"1916"},
        6256: {
          name:"test", 
          alt:"",
          url:  "http://img9.dzdwl.com/img/234114120527677151.jpg", 
          thumb:"http://img9.dzdwl.com/img/234114120527677151.jpg", 
          width:"913", 
          height:"571"},
        8902: {
          name:"test2", 
          alt:"",
          url:  "http://i.donglimall.com/news/UpFiles/bizhi/201505/16/20140527032929367.jpg", 
          thumb:"http://i.donglimall.com/news/UpFiles/bizhi/201505/16/20140527032929367.jpg", 
          width:"750", 
          height:"1344"},
        9455: {
          name:"test3", 
          alt:"",
          url:  "http://bcs.kuaiapk.com/rbpiczy/Wallpaper/2013/2/17/907466d282b1431f915b62b861abc026-3.jpg", 
          thumb:"http://bcs.kuaiapk.com/rbpiczy/Wallpaper/2013/2/17/907466d282b1431f915b62b861abc026-3.jpg", 
          width:"2048", 
          height:"2048"},
        2864: {
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
    this.loadImages();
  }
}
</script>