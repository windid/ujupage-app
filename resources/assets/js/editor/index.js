import Vue from 'vue'
import editor from './components/editor.vue'

new Vue({
  el: 'body',
  components: { editor }
})

var pageSections = [
  {
    style:{"background":"#900","height":200},
    elements:{
      "bifsdc":{
        type:"text",
        content:"wdfsdf<br>dksjlfjslkd jksdfs",
        style:"left:200px;top:40px;width:200px",
        zindex:100
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
    },
  },

  {
    style:{"background":"","height":300},
    elements:{

    },
  },

  {
    style:{"background":"#909","height":300},
    elements:{

    },
  }
];
