<script>
import draggabilly from 'draggabilly'
import { setActiveElementId,removeElement,moveElement,resizeElement,indexElement,addElement }  from '../store/actions'
import { getWorkspaceData } from '../store/getters'
import { merge } from 'lodash'

export default {
  //接受父组件传参，element元素属性, sectionId:板块ID, elementId:元素ID
  props: {
    element: {
      type: Object,
      required: true
    },
    sectionId: {
      required: true
    },
    elementId: {
      type: String,
      required: true
    },
    buttonGroup: {
      type: String,
      twoWay: true,
      default: 'main'
    },
    draggable: {
      type: Boolean,
      default: true
    },
    resizable: {
      type: Boolean,
      default: false
    },
    resize: {
      type: Object
    }
  }, //['element','sectionId','elementId','buttonGroup','draggable'],
  vuex: {
    actions: {
      setActiveElementId,
      removeElement,
      moveElement,
      resizeElement,
      indexElement,
      addElement
    },
    getters: {
      workspace: getWorkspaceData,
    }
  },
  data (){
    return {
      // elToolbarPosition: 'top',
      toolbarPosition:'top left',
      elPositionInPage: {left:0,top:0},
      clickOnThisElement: false,
      draggie: null
    }
  },
  methods:{
    showToolbar: function(){
      // if (this.workspace.activeElementId !== this.elementId) {
      //   this.setActiveElementId(this.elementId);
      // }
      this.buttonGroup = 'main';
      
      const viewTop = getElementTop(this.$el) - document.documentElement.scrollTop;
      const toolbarPositionY = (viewTop < 95) ? 'bottom' : 'top';

      const viewRight = this.workspace.width - parseInt(this.element.style[this.workspace.version].left);
      const toolbarPositionX = (viewRight < 0) ? 'right' : 'left';

      this.toolbarPosition = toolbarPositionY + ' ' + toolbarPositionX;

      // this.resizable = true;
    },
    duplicate: function(){
      let newElement = merge({},this.element);
      //把新元素置于最顶
      newElement.style.pc.zIndex = this.workspace.zIndex.pc.max + 1;
      newElement.style.mobile.zIndex = this.workspace.zIndex.mobile.max + 1;
      //计算新元素位置
      let pcLeft = parseInt(this.element.style.pc.left);
      let pcWidth = parseInt(this.element.style.pc.width);
      if (pcLeft + pcWidth > 940){
        newElement.style.pc.left = ((pcLeft - 20) > 0 ? (pcLeft - 20) : 0) + 'px';
      } else {
        newElement.style.pc.left = (pcLeft + 20) + 'px';
      }
      let mobileLeft = parseInt(this.element.style.mobile.left);
      let mobileWidth = parseInt(this.element.style.mobile.width);
      if (mobileLeft + mobileWidth > 380){
        newElement.style.mobile.left = ((mobileLeft - 20) > 0 ? (mobileLeft - 20) : 0) + 'px';
      } else {
        newElement.style.mobile.left = (mobileLeft + 20) + 'px';
      }
      newElement.style.pc.top = (parseInt(this.element.style.pc.top) + 20) + 'px';
      newElement.style.mobile.top = (parseInt(this.element.style.mobile.top) + 20) + 'px';

      this.addElement(this.sectionId, newElement);
    },
    dragEnable: function(){
      this.draggie = new draggabilly( this.$el, {
        containment:'#content-area'
      });
      let startTop = 0;
      let vm = this;

      this.draggie.on('dragEnd', function( event ) {
        vm.buttonGroup = 'main';
        let position = $(this.element).position();
        vm.elPositionInPage.left = position.left;
        vm.elPositionInPage.top  = startTop + position.top;
        vm.moveElement(vm.sectionId,vm.elementId,vm.elPositionInPage,vm.$el.offsetHeight);
      });

      this.draggie.on('dragStart', function( event ) {
        vm.setActiveElementId(vm.elementId);
        vm.$dispatch('drag-start');
        startTop = getElementTop(vm.$el) - 45 - vm.$el.offsetTop;
      })
      
      this.draggie.on('dragMove', function( event ) {
        vm.buttonGroup = 'position';
        let position = $(this.element).position();
        vm.elPositionInPage.left = position.left;
        vm.elPositionInPage.top  = startTop + position.top;
      });
    },
    dragDisable: function(){
      this.draggie.destroy()
      this.updateStyle();
      // this.$el.style.top = this.element.style[this.workspace.version].top;
      // this.$el.style.left = this.element.style[this.workspace.version].left;
    },
    resizeInit: function(){
      let vm = this;
      let defaultResize = {
        handles: "e",
        aspectRatio: false
      };
      this.resize = merge({}, defaultResize, this.resize);
      let vmDraggable = vm.draggable;
      $(this.$el).resizable({
        handles: vm.resize.handles,
        aspectRatio: vm.resize.aspectRatio,
        containment: $('#content-area'),
        start: function(){
          vmDraggable = vm.draggable;
          vm.draggable = false;
        },
        stop: function(e, ui){
          vm.draggable = vmDraggable;
          vm.resizeElement(vm.elementId,ui.size);
          vm.updateStyle();
        }
      });
    },
    resizeEnable: function(){
      $(this.$el).resizable('enable')
    },
    resizeDisable: function(){
      $(this.$el).resizable('disable')
    },
    updateStyle: function(){
      for (let prop in this.element.style[this.workspace.version]){
        if (prop !== "zIndex"){
          this.$el.style[prop] = this.element.style[this.workspace.version][prop];
        }
      }
    }
  },
  watch: {
    'draggable': function(dragEnabled){
      (dragEnabled) ? this.dragEnable() : this.dragDisable();
    },
    'resizable': function(resizeEnabled){
      (resizeEnabled) ? this.resizeEnable() : this.resizeDisable();
    },
    'workspace.activeElementId': function(elementId){
      if (this.elementId === elementId){
        this.showToolbar();
      }
    }
  },
  ready: function(){
    this.dragEnable();
    this.resizeInit();
    this.resizable = false;
    if (this.workspace.activeElementId === this.elementId){
      this.showToolbar();
    }
  }
}

//获取元素到页面顶部的距离
let getElementTop = function( element ){
　let actualTop = element.offsetTop;
　let current = element.offsetParent;

　while (current !== null){
　　actualTop += current.offsetTop;
　　current = current.offsetParent;
　}

　return actualTop;
} 
</script>

<template>
  <div class="element" @click="setActiveElementId(elementId)" @mousedown.stop 
    :style="{
      left:element.style[workspace.version].left,
      top:element.style[workspace.version].top,
      width:element.style[workspace.version].width,
      height:element.style[workspace.version].height || 'auto'
    }"
  >
    <div class="el-content" id="element-{{elementId}}" v-el:content 
      :style="{
        zIndex:element.style[workspace.version].zIndex,
      }" 
      v-bind:class="{'outline':workspace.activeElementId === elementId}"
    >
      <slot name="content"></slot>
    </div>
    <template v-if="resizable">
      <div class="resizable-w" v-if="resize.handles && resize.handles.indexOf('w') > -1"></div>
      <div class="resizable-e" v-if="resize.handles && resize.handles.indexOf('e') > -1"></div>
      <div class="resizable-n" v-if="resize.handles && resize.handles.indexOf('n') > -1"></div>
      <div class="resizable-s" v-if="resize.handles && resize.handles.indexOf('s') > -1"></div>
    </template>
    <div v-if="workspace.activeElementId === elementId" class="el-toolbar {{toolbarPosition}}" @mousedown.stop>
      <div v-show="buttonGroup === 'main'" class="btn-group el-btn-group" role="group">
        <slot name="main-buttons-extend"></slot>
        <div class="btn btn-default" title="复制一个" @click.stop="duplicate"><span class="glyphicon glyphicon-duplicate"></span></div>
        <div class="btn btn-default" title="移到顶层" @click="indexElement(elementId, 'top')"><span class="glyphicon glyphicon-circle-arrow-up"></span></div>
        <div class="btn btn-default" title="移到底层" @click="indexElement(elementId, 'bottom')"><span class="glyphicon glyphicon-circle-arrow-down"></span></div>
        <div class="btn btn-default" title="删除" @click="removeElement(elementId)"><span class="glyphicon glyphicon-trash"></span></div>
      </div>
      <div v-show="buttonGroup === 'position'" class="btn-group el-btn-group" role="group">
        <div class="btn btn-success">X: {{elPositionInPage.left}} &nbsp; Y: {{elPositionInPage.top}}</span></div>
      </div>
      <slot name="button-groups"></slot>
    </div>
    <slot name="tools"></slot>
  </div>
</template>