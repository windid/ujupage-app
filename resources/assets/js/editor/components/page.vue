<template>
<div class="workspace">
  <div id="content-area" v-bind:style="{ height: pageHeight + 'px', width: pageWidth + 'px', marginLeft: ( - pageWidth / 2 + 1 ) + 'px' }"></div>
  <div v-for="section in sections" v-bind:style="{background:section.style.background, height:section.style.height + 'px'}" v-on:mouseover="setCurrentSection($index)" id="section-{{$index}}" class="page-section">
    <div class="editable-area" v-bind:style="{width:pageWidth + 'px'}">
      <div v-for="element in section.elements" id="{{$index}}-{{$key}}" class="page-item">{{{element.content}}}</div>

      <div class="btn-group page-section-operation" role="group" aria-label="..." ms-visible="currentSection===$index" v-bind:style="{left:(pageWidth+5) + 'px', display: (currentSection===$index) ? 'block' : 'none'}">
        <button type="button" class="btn btn-primary" title="修改"><span class="glyphicon glyphicon-pencil"></span></button>
        <button type="button" class="btn btn-default" title="上移" v-on:click="moveSection('up',$index)"><span class="glyphicon glyphicon-chevron-up"></span></button>
        <button type="button" class="btn btn-default" title="下移" v-on:click="moveSection('down',$index)"><span class="glyphicon glyphicon-chevron-down"></span></button>
        <button type="button" class="btn btn-default" title="删除" v-on:click="removeSection($index)"><span class="glyphicon glyphicon-remove"></span></button>
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
      currentSection: 0,
      sections:[
        {
          style:{"background":"#900","height":200},
          elements:{
            "bifsdc":{
              type:"text",
              content:"wdfsdf<br>dksjlfjslkd jksdfs ksdfksd",
              style:"left:200px;top:40px;width:200px",
              index:100
            },
            "sdf23d":{
              type:"image",
              src:"fsd.gif",
              style:"",
              zindex:101
            },
            "fgh24g":{
              type:"button",
              style:"background:#990",
              zindex:102
            },
            "nrgs13":{
              type:"video",
              style:"",
              zindex:103
            },
            "bwdkfk":{
              type:"form",
              style:"",
              zindex:105
            }
          }
        },

        {
          style:{"background":"","height":300},
          elements:{

          }
        },

        {
          style:{"background":"#909","height":300},
          elements:{

          }
        }
      ]
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
    },

    setCurrentSection: function(section_id){
      this.currentSection = section_id;
    },

    moveSection: function(dir,section_id){
      var target = section_id
      if (dir === 'down' && section_id < this.sections.length-1){
        target++;
      }
      if (dir === 'up' && section_id > 0){
        target--;
      }

      if (section_id != target){
        this.sections[section_id] = this.sections.splice(target, 1, this.sections[section_id])[0];
      }
    },

    removeSection: function(section_id){
      this.sections.splice(section_id,1);
    }
  }
}
</script>
