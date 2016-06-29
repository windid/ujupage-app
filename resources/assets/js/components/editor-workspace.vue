<template>
  <div class="workspace">
    <div id="content-area" :style="{height: workspace.height + 'px', width: (workspace.width-2) + 'px', marginLeft:(-workspace.width/2 + 1) +'px'}"></div>
    <div v-for="(sectionId, section) in sections" 
      class="page-section" 
      :style="{
        height:section.style[workspace.version]['height'],
        backgroundColor:getColor(section.style[workspace.version]['background-color']),
        borderColor:getColor(section.style[workspace.version]['border-color']),
        borderWidth:'0',
        borderTopWidth:section.style[workspace.version]['border-width'] + 'px',
        borderBottomWidth:section.style[workspace.version]['border-width'] + 'px',
        borderStyle:'solid'
      }"  
      v-on:mouseover="setCurrentSectionId(sectionId)">
      <div class="editable-area" :style="{width: workspace.width + 'px'}">
        <!-- 页面元素组件 -->
        <component v-for="(elementId,element) in section.elements" :is="'element-' + element.type" :element="element" :section-id="sectionId" :element-id="elementId"></component>
        <!-- 板块操作按钮组 -->
        <div class="btn-group-vertical page-section-operation" role="group" v-show="workspace.currentSectionId==sectionId" transition="fade" :style="{left: workspace.width + 5 + 'px'}">
          <template v-if="workspace.activeSectionId === sectionId">
            <button type="button" class="btn btn-success" title="完成" @click="sectionEditDone"><span class="glyphicon glyphicon-ok"></span></button>
          </template>
          <template v-if="(workspace.activeSectionId !== sectionId)">
            <button type="button" class="btn btn-primary" title="修改" @click="editSection(sectionId)"><span class="glyphicon glyphicon-pencil"></span></button>
            <button type="button" class="btn btn-default" title="上移" @click="moveSection('up',sectionId)"><span class="glyphicon glyphicon-chevron-up"></span></button>
            <button type="button" class="btn btn-default" title="下移" @click="moveSection('down',sectionId)"><span class="glyphicon glyphicon-chevron-down"></span></button>
            <button type="button" class="btn btn-default" title="删除" @click="removeSection(sectionId)"><span class="glyphicon glyphicon-trash"></span></button>
          </template>
        </div>
      </div>
      <section-edit v-if="workspace.activeSectionId === sectionId" :section-id="sectionId" ></section-edit>
      <div class="resize-line"></div>
      <div class="resize-line-wrap"></div>
    </div>
    
  </div>
</template>
<script>
import { setCurrentSectionId,setActiveSectionId,moveSection,removeSection,setActiveElementId,modifySection }  from '../store/actions'
import { getWorkspaceData,getSections } from '../store/getters'
import elementText from './element-text.vue'
import elementImage from './element-image.vue'
import sectionEdit from './section-edit.vue'
import {max} from 'lodash'
import colorMixin from '../mixins/colorMixin.js'

export default {
  name:'editorWorkspace',
  mixins: [colorMixin],
  components: {
    elementText,
    elementImage,
    sectionEdit
  },
  data (){
    return {
      sectionEditing: false,
      activeSectionId: null
    }
  },
  methods:{
    editSection: function(sectionId){
      this.sectionEditing = true;
      this.activeSectionId = sectionId;
      this.setActiveSectionId(sectionId);
    },
    sectionEditDone: function(){
      this.activeSectionId = null;
      this.sectionEditing = false;
      this.setActiveSectionId(null);
    }
  },
  vuex: {
    actions: {
      setActiveElementId,
      setCurrentSectionId,
      setActiveSectionId,
      removeSection,
      moveSection,
      modifySection
    },
    getters: {
      workspace: getWorkspaceData,
      sections: getSections,
    }
  },
  ready:function() {
    resizeEvent(this)
  }
}

var resizeEvent = function(vue){
  //区域最小高度
  let sectionminheight=30, 
  startY, startHeight, toolbarh = 45, strheight = 'height', strpx = "px" , strbody ='body';
  
  let setSectionHeight =function(height){
    if(height > sectionminheight)
    {
      window.$section.css(strheight, height + strpx);
    }
  }

  $(strbody).on('mousedown click', '.resize-line', function (e) {
    //区域元素
    window.$section = $(e.target).parent();
    startY = e.clientY - toolbarh;
    var $parent = $(this).parent()
    startHeight = $parent.height();
    //定义最高,预防无法触发事件
    $parent.find('.resize-line-wrap').css('z-index', 99999)
    vue.setActiveElementId("");

    $(strbody).mousemove(function (e) {
      //元素相对(浏览器)坐标
      let clientY = e.clientY - toolbarh;
      let $this = $(e.target);
      let allelement = [];

      window.$section.find('.element').each(function (e) {
        let h = $(this).height() + $(this).position().top;
        allelement.push(h);
      });
      //元素最大高度
      window.elmaxheight = max(allelement);
      //区域最大高度
      let sectionmaxheight = window.$section.height();
      //最新高度
      let newheight = startHeight + clientY - startY;
      //判断是否存在元素
      if (allelement.length >= 1) {
        //区域元素高度 > 最大元素高度 && 最新高度 > 最大元素高度 || 最新高度 > 最大元素高度
        if (sectionmaxheight > elmaxheight && newheight > elmaxheight || newheight > elmaxheight) {
           setSectionHeight(newheight)
        }
      }
      //最新高度 > 区域最大高度
      else if (newheight > sectionmaxheight) {
        setSectionHeight(newheight)
      }
      else {
        setSectionHeight(newheight)
      }
    });

    //预防丢失鼠标移出无法重新定义高度
    $(strbody).mouseout(function (e) {
      let allelement = [];
      window.$section.find('.element').each(function (e) {
        //元素相对高度
        let h = $(this).parent().offset().top - 45 + $(this).position().top + $(this).height() + $('.main').scrollTop();
        allelement.push(h);
      });
      //元素坐标 < 最大元素相对高度 将区域元素设为 elmaxheight
      if (e.clientY < max(allelement)) {
        setSectionHeight(elmaxheight)
      }
    });
  });

  $(strbody).off('mouseup').mouseup(function () {
    if (window.$section) {
      //移除样式(z-index)避免触发事件
      $('.resize-line-wrap').removeAttr('style');
      let style = {
        height: window.$section.height() + strpx
      }
      vue.modifySection($('.page-section').index(window.$section), style);
      window.$section = null;
    }
    $(this).off('mousemove mouseout click');
  });
}

</script>