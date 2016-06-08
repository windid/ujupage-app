<template>
<div class="workspace">
  <div id="content-area" v-bind:style="{ height: pageHeight + 'px', width: pageWidth + 'px', marginLeft: pageLeft + 'px' }"></div>
  <div ms-repeat-section="sections" ms-mouseover="setCurrentSection($index)" ms-attr-id="'section-'+$index" class="page-section" ms-css-height="{{section.style.height}}" ms-css-background="{{section.style.background}}" ms-resizable="page,$section_resizable" >
    <div class="editable-area" style="width:{{pageWidth}}px">
      <div ms-repeat-el="section.elements" ms-attr-id="$index+'-'+$key" class="page-item" ms-pageitem="" ms-draggable="page,$element_draggable" ms-tooltip="page,$element_tt_coordinates" ms-html="$val.content"></div>

      <div class="btn-group page-section-operation" role="group" aria-label="..." ms-visible="currentSection===$index" style="left:{{_width+5}}px">
        <button type="button" class="btn btn-primary" title="修改"><span class="glyphicon glyphicon-pencil"></span></button>
        <button type="button" class="btn btn-default" title="上移" ms-click="moveSection('up',$index)"><span class="glyphicon glyphicon-chevron-up"></span></button>
        <button type="button" class="btn btn-default" title="下移" ms-click="moveSection('down',$index)"><span class="glyphicon glyphicon-chevron-down"></span></button>
        <button type="button" class="btn btn-default" title="删除" ms-click="removeSection($index)"><span class="glyphicon glyphicon-remove"></span></button>
      </div>
    </div>
  </div>
</div>


</template>

<script>
export default {
  data: function() {
    return {
      pageWidth: 960,
      pageHeight: 0,
      sections:[]
    }
  },
  computed: {
    pageLeft: function(){
        return - this.pageWidth / 2 + 1
    },
  },
  methods: {
    init: function(sections){
      this.sections = sections;
      console.log('sdf');
    }
  }
}
</script>
