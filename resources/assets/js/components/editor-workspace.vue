<template>
  <div class="workspace">
    <div id="content-area" :style="{height: workspace.height + 'px', width: (workspace.width-2) + 'px', marginLeft:(-workspace.width/2 + 1) +'px'}"></div>
    <div v-for="(sectionId, section) in sections" class="page-section" :style="(workspace.version == 'pc') ? section.style : section.styleM"  v-on:mouseover="setCurrentSectionId(sectionId)">
      <div class="editable-area" :style="{width: workspace.width + 'px'}">
        <!-- 页面元素组件 -->
        <component v-for="(elementId,element) in section.elements" :is="'element-' + element.type" :element="element" :section-id="sectionId" :element-id="elementId"></component>
        <!-- 板块操作按钮组 -->
        <div class="btn-group page-section-operation" role="group" v-show="workspace.currentSectionId==sectionId" transition="fade" :style="{left: workspace.width + 5 + 'px'}">
          <template v-if="sectionEditing">
            <button type="button" class="btn btn-success" title="完成" @click="closeSidebar"><span class="glyphicon glyphicon-ok"></span></button>
          </template>
          <template v-if="(!sectionEditing)">
            <button type="button" class="btn btn-primary" title="修改" @click="editSection"><span class="glyphicon glyphicon-pencil"></span></button>
            <button type="button" class="btn btn-default" title="上移" @click="moveSection('up',sectionId)"><span class="glyphicon glyphicon-chevron-up"></span></button>
            <button type="button" class="btn btn-default" title="下移" @click="moveSection('down',sectionId)"><span class="glyphicon glyphicon-chevron-down"></span></button>
            <button type="button" class="btn btn-default" title="删除" @click="removeSection(sectionId)"><span class="glyphicon glyphicon-trash"></span></button>
          </template>
        </div>
      </div>
      <div class="resize-line"></div>
      <div class="resize-line-wrap"></div>
    </div>
    <div style="height:60px;"></div>
    <section-edit :show.sync="sectionEditing"></section-edit>
  </div>
</template>
<script>
import { setCurrentSectionId,setActiveSectionId,moveSection,removeSection,setActiveElementId,modifySection }  from '../store/actions'
import { getWorkspaceData,getSections,getColorSet } from '../store/getters'
import elementText from './element-text.vue'
import elementImage from './element-image.vue'
import sectionEdit from './section-edit.vue'
import {max} from 'lodash'

export default {
  name:'editorWorkspace',
  components: {
    "element-text": elementText,
    "element-image": elementImage,
    "section-edit" : sectionEdit
  },
  data (){
    return {
      sectionEditing: false
    }
  },
  methods:{
    editSection: function(sectionId){
      this.sectionEditing = true;
      this.setActiveSectionId(sectionId);
    },
    closeSidebar: function(){
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
      colorSet: getColorSet
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