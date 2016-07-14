<script>
import { modifyElement }  from '../store/actions'
import { getWorkspaceData } from '../store/getters'
import elementCommon from './element-common.vue'
import imageLibrary from './image-library.vue'
import linkEdit from './link-edit.vue'
import { merge } from 'lodash'

export default {
  //接受父组件传参，element元素属性，sectionId:板块ID，elementId:元素ID
  props:['element','sectionId','elementId'],
  components: {
    elementCommon,
    imageLibrary,
    linkEdit
  },
  vuex: {
    actions: {
      modifyElement
    },
    getters: {
      workspace: getWorkspaceData,
    }
  },
  data (){
    return {
      buttonGroup:'main',
      showImageLibary: false,
      imageObj: {},
      linkObj: merge({}, this.element.link)
    }
  },
  methods: {
    edit: function(){
      this.showImageLibary = true;
    }
  },
  computed: {
    draggable: function(){
      return this.buttonGroup !== 'link';
    }
  },
  events:{
    'link-edit-done':function(changed, linkObj){
      if (changed){
        this.linkObj = merge({}, linkObj);
        const newPropsObj = {link:linkObj};
        this.modifyElement(this.sectionId, this.elementId, newPropsObj); 
      }
      this.buttonGroup = 'main';
    }
  },
  watch: {
    'imageObj': function(newImage){
      let newPropsObj = new Object;
      newPropsObj.src = newImage.url;

      if (!this.element.style.pc.width){
        const pcWidth     = (newImage.width > 960) ? 960 : newImage.width;
        const mobileWidth = (newImage.width > 400) ? 400 : newImage.width;
        const pcLeft      = (960 - pcWidth) / 2;
        const mobileLeft  = (400 - mobileWidth) /2;

        newPropsObj.style = {
          'pc': {
            width: pcWidth + 'px',
            left: pcLeft + 'px'
          },
          'mobile': {
            width: mobileWidth + 'px',
            left: mobileLeft + 'px'
          }
        }
      }
      this.modifyElement(this.sectionId, this.elementId, newPropsObj);
    }
  }
}
</script>

<template>
  <element-common :element="element" :section-id="sectionId" :element-id="elementId" :button-group.sync="buttonGroup" :draggable.sync="draggable">
    <div slot="content" @dblclick="edit">
      <img v-bind:src="element.src" :style="{width:element.style[workspace.version].width,height:'auto'}">
    </div>
    <template slot="main-buttons-extend">
      <div class="btn btn-primary" title="更换图片" @click.stop="edit">更换图片</div>
      <div class="btn btn-default" title="链接" @click="buttonGroup='link'"><span class="glyphicon glyphicon-link"></span></div>
    </template>
    <template slot="button-groups">
      <link-edit v-show="buttonGroup === 'link'" :link-editing="buttonGroup === 'link'" :link-obj="linkObj"></link-edit>
    </template>
  </element-common>
  <image-library v-if="showImageLibary" :show.sync="showImageLibary" :image-obj.sync="imageObj"></image-library>
</template>
