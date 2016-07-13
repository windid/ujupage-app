<template>
  <div @mousedown="setActiveElementId('')">
    <editor-header></editor-header>
    <div class="main">
      <editor-toolbar></editor-toolbar>
      <editor-workspace></editor-workspace>
    </div> 
  </div>
</template>
<script>
import editorHeader from './editor-header.vue'
import editorToolbar from './editor-toolbar.vue'
import editorWorkspace from './editor-workspace.vue'
import store from '../store/store'
import { setActiveElementId, pageInit }  from '../store/actions'

export default {
  name: 'editor',
  components: {
    editorHeader,
    editorToolbar,
    editorWorkspace
  },
  vuex: {
    actions: {
      setActiveElementId,
      pageInit
    }
  },
  store,
  methods: {
    loadPage: function(){
      let data = {
        page: {
          colorSet: ['#E6E2AF',"#A7A37E","#EFECCA","#046380","#002F2F"],

          sections: [
            {
              style:{
                "pc":    {"background-color":"0",height:"500px"},
                "mobile":{"background-color":"0",height:"500px"}
              },
              elements:{
                "dfgs234f":{
                  type:"image",
                  src:"http://www.ujumedia.com/data/link/151110/151110060506teqwje.png",
                  style:{
                    'pc':{
                      left:"200px",
                      top:"100px",
                      width:"",
                      zIndex:101
                    },
                    'mobile':{
                      left:"50px",
                      top:"150px",
                      width:"",
                      zIndex:101
                    }
                  }
                },
                "fgh24g":{
                  type:"button",
                  text:"点击下载",
                  props:{
                    backgroundColor:'2',
                    borderColor:'3',
                    fontColor:'4',
                    hoverColor:'2',
                    borderRadius:'5px',
                    fontSize:'18px',
                    shadow:true,
                    bold:false,
                    border:false
                  },
                  style:{
                    'pc':{
                      left:"100px",
                      top:"20px",
                      width:"160px",
                      zIndex:300
                    },
                    'mobile':{
                      left:"50px",
                      top:"20px",
                      width:"100px",
                      zIndex:300
                    }
                  },
                  link:{}
                },
                "bwdkfk":{
                  type:"form",
                  style:{
                    'pc':{
                      left:"200px",
                      top:"250px",
                      width:"300px",
                      zIndex:3000
                    },
                    'mobile':{
                      left:"50px",
                      top:"250px",
                      width:"300px",
                      zIndex:1342
                    }
                  },
                  props:{
                    labelInside:true,
                    innerShadow:true,
                    fieldColor:"#fff",
                    inputColor:"4",
                    borderColor:"#ccc",
                    labelColor:"3",
                    redirect:"",
                    thankyou:"表单提交成功，感谢！"
                  },
                  fields:[
                    {
                      label: "姓名",
                      type: "text",
                      validator: ['required'],
                    },
                    {
                      label: "手机号码",
                      type: "text",
                      validator: ['required','mobile'],
                    },
                    {
                      label: "收货地址",
                      type: "china-state",
                      validator: ['required']
                    },
                    {
                      label: "详细地址",
                      type: "textarea",
                      validator: []
                    },
                    {
                      label: "testDropdown",
                      type: "dropdown",
                      options: ["wawawa","hahaha","hehehe"]
                    },
                    {
                      label: "性别",
                      type: "radio",
                      options:['男','女'],
                      validator: ['required'],
                      optionsInLine: true,
                      hideLabel: false
                    }
                  ],
                  button:{
                    text:"提交",
                    props:{
                      backgroundColor:'2',
                      borderColor:'3',
                      fontColor:'4',
                      hoverColor:'2',
                      borderRadius:'5px',
                      fontSize:'18px',
                      shadow:true,
                      bold:false,
                      border:false
                    }
                  }
                }
              }
            },
            {
              style:{
                "pc":    {"background-color":"1",height:"300px"},
                "mobile":{"background-color":"1",height:"300px"}
              },
              elements:{
                "bifsdc":{
                  type:"text",
                  content:"<p>wdfsdf<br>dksjlfjslkd jksdfs ksdfksd</p>",
                  style:{
                    'pc':{
                      left:"200px",
                      top:"100px",
                      width:"500px",
                      zIndex:100
                    },
                    'mobile':{
                      left:"100px",
                      top:"100px",
                      width:"200px",
                      zIndex:100
                    }
                  }
                },
              },
            },
            {
              style:{
                "pc":{"background-color":"",height:"200px"},
                "mobile":{"background-color":"",height:"300px"}
              },
              elements:{
                "123ghfdv":{
                  type:"text",
                  content:"Hello, World!",
                  style:{
                    'pc': {
                      left:"500px",
                      top:"100px",
                      width:"458px",
                      zIndex:1000
                    },
                    'mobile':{
                      left:"150px",
                      top:"100px",
                      width:"200px",
                      zIndex:100
                    }
                  }
                },
                "testurltesturl":{
                  type:"image",
                  src:"http://www.ujumedia.com/data/link/151110/151110060506teqwje.png",
                  style:{
                    'pc':{
                      left:"200px",
                      top:"100px",
                      width:"333px",
                      zIndex:101
                    },
                    'mobile':{
                      left:"50px",
                      top:"150px",
                      width:"120px",
                      zIndex:101
                    }
                  }
                },
              }
            },
            {
              style:{
                "pc":{"background-color":"2",height:"300px"},
                "mobile":{"background-color":"2",height:"500px"}
              },
              elements:{
                "bvsdfg23":{
                  type:"text",
                  content:"Hello, World!",
                  style: {
                    'pc':{
                      left:"500px",
                      top:"100px",
                      width:"125px",
                      zIndex:1000
                    },
                    'mobile':{
                      left:"150px",
                      top:"100px",
                      width:"200px",
                      zIndex:2000
                    }
                  }
                },
              }
            },
            {
              style:{
                "pc":{"background-color":"0",height:"300px"},
                "mobile":{"background-color":"0",height:"300px"}
              },
              elements:{
               
              }
            },
          ] //end sections
        }//end page
      }
      this.pageInit(data);
    }
  },
  created: function(){
    this.loadPage()
  }
}
</script>

