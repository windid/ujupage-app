<script>
import { addSection, addElement }  from '../store/actions'
import { getWorkspaceData }  from '../store/getters'
export default {
  vuex: {
    actions:{
      addSection,
      addElement
    },
    getters:{
      workspace: getWorkspaceData
    }
  },
  data () {
    return {
      tools: [
        {
          name:'版块',
          style:'modal-window',
          action:this.addSection
        },
        {
          name:'图片',
          style:'picture',
          action:this.addImage
        },
        {
          name:'文字',
          style:'font',
          action: this.addText
        },
        {
          name:'按钮',
          style:'expand',
          action: this.addButton
        },
        // {
        //   name:'视频',
        //   style:'facetime-video',
        //   action:function(){
            
        //   }
        // },
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
          action:this.addForm
        },
        {
          name:'HTML',
          style:'header',
          action:this.addHTML
        }
      ]
    }
  },
  methods:{
    addText: function(){
      const defaultText = {
        type:"text",
        content:"<p>双击开始编辑这段文字</p>",
        style:{
          'pc':{
            left:"380px",
            top:"10px",
            width:"200px",
            zIndex: this.workspace.zIndex.pc.max + 1
          },
          'mobile':{
            left:"80px",
            top:"10px",
            width:"200px",
            zIndex: this.workspace.zIndex.mobile.max + 1
          }
        },
        fontStyle:{
          color:"4",
          fontSize:"16px",
          lineHeight:"1.4",
          textAlign:"left"
        }
      };
      this.addElement(this.workspace.currentSectionId, defaultText);
    },

    addImage: function(e){
      const defaultImage = {
        type:"image",
        src:"",
        style:{
          'pc':{
            top:"10px",
            width:"",
            zIndex: this.workspace.zIndex.pc.max + 1
          },
          'mobile':{
            top:"10px",
            width:"",
            zIndex: this.workspace.zIndex.mobile.max + 1
          }
        }
      };
      this.addElement(this.workspace.currentSectionId, defaultImage);
    },

    addButton: function(){
      const defaultButton = {
        type:"button",
        text:"点击下载",
        props:{
          backgroundColor:'3',
          borderColor:'4',
          color:'0',
          hoverColor:'4',
          borderRadius:'5px',
          fontSize:'18px',
          borderStyle: 'none',
          boxShadow:'1px 3px 6px #888',
          fontWeight:'normal'
        },
        style:{
          'pc':{
            left:"400px",
            top:"10px",
            width:"160px",
            height:"37px",
            zIndex:this.workspace.zIndex.pc.max + 1
          },
          'mobile':{
            left:"100px",
            top:"10px",
            width:"160px",
            height:"37px",
            zIndex:this.workspace.zIndex.mobile.max + 1
          }
        }
      };
      this.addElement(this.workspace.currentSectionId, defaultButton);
    },

    addForm: function(){
      const defaultForm = {
        type:"form",
        style:{
          'pc':{
            left:"330px",
            top:"10px",
            width:"300px",
            zIndex:this.workspace.zIndex.pc.max + 1
          },
          'mobile':{
            left:"30px",
            top:"10px",
            width:"300px",
            zIndex:this.workspace.zIndex.mobile.max + 1
          }
        },
        props:{
          labelInside:true,
          // innerShadow:false,
          boxShadow:'',
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
          }
        ],
        button:{
          text:"提交",
          props:{
            backgroundColor:'3',
            borderColor:'4',
            color:'0',
            hoverColor:'4',
            borderRadius:'5px',
            fontSize:'18px',
            borderStyle: 'none',
            boxShadow:'1px 3px 6px #888',
            fontWeight:'normal'
          }
        }
      };
      this.addElement(this.workspace.currentSectionId, defaultForm);
    },

    addHTML: function(){
      const defaultHTML = {
        type:"html",
        content:"",
        style:{
          'pc':{
            left:"330px",
            top:"10px",
            width:"300px",
            height:"150px",
            zIndex:this.workspace.zIndex.pc.max + 1
          },
          'mobile':{
            left:"50px",
            top:"10px",
            width:"300px",
            height:"150px",
            zIndex:this.workspace.zIndex.mobile.max + 1
          }
        }
      };
      this.addElement(this.workspace.currentSectionId, defaultHTML);
    }

  }
}
</script>

<template>
  <div class="toolbar shadow">
    <div class="toolbar-header">组件</div>
    <div class="toolbar-body">
      <div v-for="tool in tools" class="tool shadow" @click.stop="tool.action">
        <span class="glyphicon glyphicon-{{tool.style}}"></span>
        <div class="tool-name">{{tool.name}}</div>
      </div>
    </div>
  </div>
</template>