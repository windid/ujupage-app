<template>
<div class="toolbar">
  <div class="toolbar-header">组件</div>
  <div class="toolbar-body">
    <div v-for="tool in tools" class="tool" v-on:click="tool.action">
      <span class="glyphicon glyphicon-{{tool.style}}"></span>
      <div class="tool-name">{{tool.name}}</div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      tools: [
        {
          name:'版块',
          style:'modal-window',
          action:function(){
            page.addSection();
          }
        },
        {
          name:'图片',
          style:'picture',
          action:function(){
            page.addElement("image");
          }
        },
        {
          name:'文字',
          style:'font',
          action:function(){
            page.addElement("text");
          }
        },
        {
          name:'按钮',
          style:'expand',
          action:function(){
            page.addElement("button");
          }
        },
        {
          name:'视频',
          style:'facetime-video',
          action:function(){
            page.addElement("video");
          }
        },
          /*
        {
          name:'形状',
          'style':'stop',
          action:function(){

          }
        },
          */
        {
          name:'表单',
          style:'edit',
          action:function(){
            page.addElement("form");
          }
        }
      ]
    }
  }
}
</script>
