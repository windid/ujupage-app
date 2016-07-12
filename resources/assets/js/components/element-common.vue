<script>
import draggabilly from 'draggabilly'
import { setActiveElementId,removeElement,moveElement}  from '../store/actions'
import { getWorkspaceData } from '../store/getters'
import { merge } from 'lodash'

export default {
  //接受父组件传参，element元素属性, sectionId:板块ID, elementId:元素ID
  props:['element','sectionId','elementId','buttonGroup','draggable'],
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
      // elToolbarPosition: 'top',
      toolbarPosition:'top left',
      elPositionInPage: {left:0,top:0},
      clickOnThisElement: false,
      draggie: null
    }
  },
  computed: {
    elStyles: function(){
      let styles = merge({},this.element.style[this.workspace.version])
      delete styles.zIndex;
      return styles
    }
  },
  methods:{
    showToolbar: function(){
      if (this.workspace.activeElementId !== this.elementId) {
        this.setActiveElementId(this.elementId);
        this.buttonGroup = 'main';
      }
      
      const viewTop = getElementTop(this.$el) - document.documentElement.scrollTop;
      const toolbarPositionY = (viewTop < 95) ? 'bottom' : 'top';

      const viewRight = this.workspace.width - parseInt(this.elStyles.left);
      const toolbarPositionX = (viewRight < 300) ? 'right' : 'left';

      this.toolbarPosition = toolbarPositionY + ' ' + toolbarPositionX;
    },
    dragEnable: function(){
      this.draggie = new draggabilly( this.$el, {
        containment:'#content-area'
      });
      let startTop = 0;
      let that = this;

      this.draggie.on('dragEnd', function( event ) {
        that.buttonGroup = 'main';
        let position = $(this.element).position();
        that.elPositionInPage.left = position.left;
        that.elPositionInPage.top  = startTop + position.top;
        that.moveElement(that.sectionId,that.elementId,that.elPositionInPage,that.$el.offsetHeight);
      });

      this.draggie.on('dragStart', function( event ) {
        that.showToolbar();
        that.$dispatch('drag-start');
        startTop = getElementTop(that.$el) - 45 - that.$el.offsetTop;
      })
      
      this.draggie.on('dragMove', function( event ) {
        that.buttonGroup = 'position';
        let position = $(this.element).position();
        that.elPositionInPage.left = position.left;
        that.elPositionInPage.top  = startTop + position.top;
      });
    },
    dragDisable: function(){
      let left = this.$el.style.left;
      let top = this.$el.style.top;
      this.draggie.destroy()
      this.$el.style.top = top;
      this.$el.style.left = left;
    }
  },
  watch: {
    'draggable': function(status){
      if (status){
        this.dragEnable();
      } else {
        this.dragDisable();
      }
    }
  },
  ready: function(){
    this.dragEnable();
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
  <div :style="elStyles" class="element" @click="showToolbar" @mousedown.stop>
    <div class="el-content" id="element-{{elementId}}" :style="{zIndex:element.style[this.workspace.version].zIndex}" v-bind:class="{'outline':workspace.activeElementId === elementId}">
      <slot name="content"></slot>
    </div>
    <div v-if="workspace.activeElementId === elementId" class="el-toolbar {{toolbarPosition}}" @mousedown.stop>
      <div v-show="buttonGroup === 'main'" class="btn-group el-btn-group" role="group">
        <slot name="main-buttons-extend"></slot>
        <div class="btn btn-default" title="复制一个"><span class="glyphicon glyphicon-duplicate"></span></div>
        <div class="btn btn-default" title="移到顶层"><span class="glyphicon glyphicon-circle-arrow-up"></span></div>
        <div class="btn btn-default" title="移到底层"><span class="glyphicon glyphicon-circle-arrow-down"></span></div>
        <div class="btn btn-default" title="删除" @click="removeElement(sectionId,elementId)"><span class="glyphicon glyphicon-trash"></span></div>
      </div>
      <div v-show="buttonGroup === 'position'" class="btn-group el-btn-group" role="group">
        <div class="btn btn-success">X: {{elPositionInPage.left}} &nbsp; Y: {{elPositionInPage.top}}</span></div>
      </div>
      <slot name="button-groups"></slot>
    </div>
    <slot name="tools"></slot>
  </div>
</template>