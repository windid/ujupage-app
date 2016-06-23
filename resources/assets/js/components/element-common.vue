<template>
  <div :style="(workspace.version == 'pc') ? element.style : element.styleM" class="element" @click="showToolbar">
    <!-- Todo:这里要对输出的html进行过滤以防xss漏洞 -->
    <div class="el-content" id="element-{{elementId}}" v-bind:class="{'outline':workspace.activeElementId === elementId}">
      <slot name="content"></slot>
    </div>
    <div v-if="workspace.activeElementId === elementId" transition="fade" class="el-toolbar {{elToolbarPosition}}">
      <div v-show="buttonGroup == 'main'" class="btn-group" role="group">
        <slot name="main-buttons-extend"></slot>
        <button type="button" class="btn btn-default" title="复制一个"><span class="glyphicon glyphicon-duplicate"></span></button>
        <button type="button" class="btn btn-default" title="移到顶层"><span class="glyphicon glyphicon-circle-arrow-up"></span></button>
        <button type="button" class="btn btn-default" title="移到底层"><span class="glyphicon glyphicon-circle-arrow-down"></span></button>
        <button type="button" class="btn btn-default" title="删除" @click="removeElement(sectionId,elementId)"><span class="glyphicon glyphicon-trash"></span></button>
      </div>
      <div v-show="buttonGroup == 'position'" class="btn-group" role="group">
        <button type="button" class="btn btn-success">X: {{elPositionInPage.left}} &nbsp; Y: {{elPositionInPage.top}}</span></button>
      </div>
      <slot name="button-groups"></slot>
    </div>
  </div>
</template>
<script>
import draggabilly from 'draggabilly'

import { setActiveElementId,removeElement,moveElement}  from '../store/actions'
import { getWorkspaceData } from '../store/getters'



export default {
  name: 'elementCommon',
  //接受父组件传参，element元素属性, sectionId:板块ID, elementId:元素ID
  props:['element','sectionId','elementId','buttonGroup'],
  vuex: {
    actions: {
      setActiveElementId,
      removeElement,
      moveElement
    },
    getters: {
      workspace: getWorkspaceData,
    }
  },
  data (){
    return {
      elToolbarPosition: 'top',
      elPositionInPage: {left:0,top:0},
      clickOnThisElement: false
    }
  },
  methods:{
    showToolbar: function(event){
      //event.stopPropagation();
      this.setActiveElementId(this.elementId);
      this.clickOnThisElement = true;
      let viewTop = getElementTop(this.$el) - document.documentElement.scrollTop;
      if ( viewTop < 95){
        this.elToolbarPosition = 'bottom';
      } else {
        this.elToolbarPosition = 'top';
      }
    }
  },
  events:{
    'body-click': function(event){
      if (this.clickOnThisElement){
        this.clickOnThisElement = false;
      } else if(this.workspace.activeElementId === this.elementId) {
        this.setActiveElementId('')
      }
    }
  },
  ready: function(){

    window.addEventListener('resize', this.handleResize)

    let draggie = new draggabilly( this.$el, {
          containment:'#content-area'
    });
    let startTop = 0;
    let that = this;

    draggie.on('dragEnd', function( event ) {
      that.buttonGroup = 'main';
      let position = $(this.element).position();
      that.elPositionInPage.left = position.left;
      that.elPositionInPage.top  = startTop + position.top;
      that.moveElement(that.sectionId,that.elementId,that.elPositionInPage,that.$el.offsetHeight);
      // let $this = $(this.element);
      // let boerderheight = 0;
      // //自身高度
      // let height =($this.height() + boerderheight);
      // //自身一半高度
      // let halfheight = height / 2;
      // let position = $this.position();
      // //绝对相对高度
      // let abstop = Math.abs(position.top);
      // //区域高度
      // let sectionheight = $this.parent().height();
      // //剩余高度
      // let remainingheight = height + position.top;
      // //区域最大高度
      // let maxheight = sectionheight + halfheight;
      // //偏移高度
      // let offsetheight = that.elPositionInPage.top + halfheight;
      // //坐标
      // let style ={
      //   left: position.left + 'px',
      // }
      // //当前区域移动
      // if(height - remainingheight < halfheight && remainingheight < maxheight){
      //   style.top = position.top +'px';
      //   that.modifyElement(that.sectionId,that.elementId,style);
      // }
      // //向下方向移动 || 向上方向移动
      // else if(remainingheight > maxheight || abstop > halfheight)
      // {
      //   let endSectionId = getCurrentSectionIndex(offsetheight);
      //   let $editablearea  = $('.editable-area').eq(endSectionId);
      //   style.top = (($editablearea.height() + $editablearea.offset().top - 45) - that.elPositionInPage.top);
      //   // debugger;
      //   // //向下
      //   // if(remainingheight > maxheight)
      //   // {
      //   //   style.top = ($editablearea.height() - style.top + 1) + 'px';
      //   // }
      //   // else
      //   // //向上
      //   // if(abstop > halfheight)
      //   // {
      //   //   style.top = ($editablearea.height() - style.top - 1) + 'px';
      //   // }
      //   style.top = ($editablearea.height() - style.top) + 'px';
      //   that.addElement(that.sectionId,that.elementId,endSectionId,style)
      // }
    });

    draggie.on('dragStart', function( event ) {
      that.showToolbar(event);
      startTop = getElementTop(that.$el) - 45 - that.$el.offsetTop;
    })
    
    draggie.on('dragMove', function( event ) {
      that.buttonGroup = 'position';
      let position = $(this.element).position();
      that.elPositionInPage.left = position.left;
      that.elPositionInPage.top  = startTop + position.top;
    });
    // this.elToolbarButtons = this.mainButtonGroup;
  }
}

// //获取当前section索引
// let getCurrentSectionIndex = function(moveElementTop){
//   let index;
//   $('.editable-area').each(function(i){
//      let $this = $(this);
//      let offsetheight = ($this.offset().top - 45) + $this.height();
//      if(offsetheight >= moveElementTop){
//         index = i;
//         return false;
//      }
//   });
//   return index;
// }

//获取元素到页面顶部的距离
function getElementTop(element){
　let actualTop = element.offsetTop;
　let current = element.offsetParent;

　while (current !== null){
　　actualTop += current.offsetTop;
　　current = current.offsetParent;
　}

　return actualTop;
} 
</script>