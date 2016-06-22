import Vuex from 'vuex'
import {extend,merge} from 'lodash'
// Vue.use(Vuex)
const state = {
  workspace: {
    //页面宽度，桌面960，移动400
    width: 400,
    //
    height:1600,
    //PC版页面高度，需计算
    heightPC: 1400,
    //移动版页面高度，需计算
    heightM: 1600,
    //pc为桌面版，mobile为移动版
    version: 'mobile',
    //当前页面激活的板块，将显示该板块的操作按钮，在添加页面元素时，将添加到此板块中
    currentSectionId: 0,
    //当前处于编辑状态的板块
    editingSectionId: null,
    //是否可以执行撤销操作
    undo: false,
    //是否可以执行重做操作
    redo: false,
    //编辑状态中的页面元素id
    activeElementId:""
  },

  settings: {
    'seo': {
      'pageTitle':'Hello, Juye Page!',
      'keywords':'Landing Pages, 落地页, 着陆页',
      'description':'It is an amazing tool for e-marketing!'
    },
    'conversion': {

    }
  },

  colorSet: ['#E6E2AF',"#A7A37E","#EFECCA","#046380","#002F2F"],

  sections: [
    {
      style:{background:"#333",height:"300px"},
      styleM:{background:"#333",height:"300px"},
      elements:{
       
      }
    },
    {
      style:{background:"#900",height:"200px"},
      styleM:{background:"#ccc",height:"300px"},
      elements:{
        "bifsdc":{
          type:"text",
          content:"wdfsdf<br>dksjlfjslkd jksdfs ksdfksd",
          style:{
            left:"200px",
            top:"100px",
            width:"500px",
            zIndex:100
          },
          styleM:{
            left:"100px",
            top:"100px",
            width:"200px",
            zIndex:100
          }
        },
        // "fgh24g":{
        //   type:"button",
        // },
        // "nrgs13":{
        //   type:"video",
        // },
        // "bwdkfk":{
        //   type:"form",
        // }
      },
    },
    {
      style:{background:"",height:"300px"},
      styleM:{background:"",height:"500px"},
      elements:{
        "123ghfdv":{
          type:"text",
          content:"Hello, World!",
          style:{
            left:"500px",
            top:"100px",
            width:"458px",
            zIndex:1000
          },
          styleM:{
            left:"150px",
            top:"100px",
            width:"200px",
            zIndex:100
          }
        },
        "testurltesturl":{
          type:"image",
          src:"http://www.ujumedia.com/data/link/151110/151110060506teqwje.png",
          style:{
            left:"200px",
            top:"100px",
            width:"333px",
            zIndex:101
          },
          styleM:{
            left:"50px",
            top:"150px",
            width:"120px",
            zIndex:101
          }
        },
      }
    },
    {
      style:{background:"#909",height:"300px"},
      styleM:{background:"#909",height:"200px"},
      elements:{
        "bvsdfg23":{
          type:"text",
          content:"Hello, World!",
          style:{
            left:"500px",
            top:"100px",
            width:"458px",
            zIndex:1000
          },
          styleM:{
            left:"150px",
            top:"100px",
            width:"200px",
            zIndex:2000
          }
        },
      }
    },
    {
      style:{background:"#4b6fc1",height:"300px"},
      styleM:{background:"#4b6fc1",height:"300px"},
      elements:{
       
      }
    },
  ]
}

var initstate = merge([],state.sections);

/* 页面初始状态 */
var sectionStates = [initstate];
var sectionHistoryIndex= 0;

const mutations = {

  //对sections进行操作过保存其状态，供撤销重做
  SAVE_SECTIONS_STATE (state) {
    sectionHistoryIndex += 1;
    sectionStates = sectionStates.slice(0,sectionHistoryIndex);
    sectionStates.push(merge([],state.sections));
    state.workspace.undo = true;
    state.workspace.redo = false;
  },

  //计算页面高度，在初始加载以及进行了撤销重做动作之后执行
  SUM_PAGE_HEIGHT(state){
    var heightPC  = 0;
    var heightM   = 0;
    for (var sectionId in state.sections){
      heightPC += parseInt(state.sections[sectionId].style.height);
      heightM += parseInt(state.sections[sectionId].styleM.height);
    }
    state.workspace.heightPC = heightPC;
    state.workspace.heightM = heightM;
    state.workspace.height = (state.workspace.version == 'pc') ? heightPC : heightM;
  },

  //移动板块
  MOVE_SECTION(state, dir, sectionId){
    var target = sectionId
      if (dir === 'down' && sectionId < state.sections.length-1){
        target++;
      }
      if (dir === 'up' && sectionId > 0){
        target--;
      }

      if (sectionId != target){
        state.sections[sectionId] = state.sections.splice(target, 1, state.sections[sectionId])[0];
        mutations.SAVE_SECTIONS_STATE(state);
      }
  },

  //添加板块
  ADD_SECTION(state){
    state.sections.push({
      style: {background:"",height:"200px"},
      styleM:{background:"",height:"200px"},
      elements:{}
    });
    state.workspace.height += 200;
    mutations.SAVE_SECTIONS_STATE(state);
  },

  //删除板块
  REMOVE_SECTION(state, sectionId){
    state.workspace.height  -= parseInt(state.sections[sectionId].style.height);
    state.sections.splice(sectionId,1);
    mutations.SAVE_SECTIONS_STATE(state);
  },

  //设置当前活动的页面板块
  SET_CURRENT_SECTION_ID (state,sectionId){
    state.workspace.currentSectionId = sectionId;
  },

  //设置当前处于编辑状态的元素id
  SET_ACTIVE_ELEMENT_ID(state,elementId){
    state.workspace.activeElementId = elementId;
  },

  REMOVE_ELEMENT(state, sectionId, elementId){
    //旧方案会引起sections整体刷新
    //delete state.sections[sectionId]['elements'][elementId];
    //state.sections = merge([],state.sections);

    //此方案只刷新单个section
    var section = state.sections[sectionId];
    delete section['elements'][elementId];
    state.sections.$set(sectionId, merge({},section));
    mutations.SAVE_SECTIONS_STATE(state);
  },

  //重做
  REDO(state) {
    if(sectionStates.length > sectionHistoryIndex+1){
      sectionHistoryIndex += 1;
      state.sections = merge([],sectionStates[sectionHistoryIndex]);
      
      //控制按钮是否可点击
      state.workspace.undo = true;
      if (sectionStates.length == sectionHistoryIndex+1){
        state.workspace.redo = false;
      }

      //重新计算页面高度
      mutations.SUM_PAGE_HEIGHT(state);
    }
  },

  //撤销
  UNDO(state) {
    if(sectionHistoryIndex >= 1){
      sectionHistoryIndex -= 1;
      state.sections = merge([],sectionStates[sectionHistoryIndex]);
      
      //控制按钮是否可点击
      state.workspace.redo = true;
      if (sectionHistoryIndex == 0){
        state.workspace.undo = false;
      }

      //重新计算页面高度
      mutations.SUM_PAGE_HEIGHT(state);
    }
  },

  //版本切换
  VERSION(state) {
    if (state.workspace.version == 'mobile'){
      state.workspace.version = 'pc';
      state.workspace.width = 960;
    } else {
      state.workspace.version = 'mobile';
      state.workspace.width = 400;
    }
    //重新计算页面高度
    mutations.SUM_PAGE_HEIGHT(state);
  },

  MOVE_ELEMENT(state, sectionId, elementId, positionInPage, elementHeight){    
    var sumSectionsHeight  = 0;
    var sectionHeight = 0;

    //从元素中间到页头的高度
    var elementLine = positionInPage.top + elementHeight / 2;

    //计算移动后该元素落入哪个section
    var newSectionId = -1;
    while (elementLine >= sumSectionsHeight){
      newSectionId ++;
      sectionHeight = parseInt((state.workspace.version == 'pc') ? state.sections[newSectionId].style.height : state.sections[newSectionId].styleM.height);
      sumSectionsHeight += sectionHeight;
    }

    var style = {
      top: positionInPage.top - (sumSectionsHeight - sectionHeight) + "px",
      left: positionInPage.left + "px"
    }

    //更新元素坐标，如果移到了新的section，则把另一版本的坐标重置
    var elState = state.sections[sectionId].elements[elementId];
    if (state.workspace.version == 'pc'){
      elState.style = extend({}, elState.style, style);
      if (newSectionId !== sectionId){
        //elState.styleM = extend({}, elState.styleM, {top:'0px'});
      }
    } else {
      elState.styleM= extend({}, elState.styleM, style);
      if (newSectionId !== sectionId){
        //elState.style = extend({}, elState.style, {top:'0px'});
      }
    }


    var oldSection = state.sections[sectionId];

    delete state.sections[sectionId].elements[elementId];
    state.sections[newSectionId].elements[elementId] = elState;

    var newSection = state.sections[newSectionId];

    state.sections.$set(sectionId,merge({},oldSection));
    state.sections.$set(newSectionId,merge({},newSection));
    
    // console.log(state.sections[newSectionId].elements[elementId].style.top);
    // console.log(state.sections[newSectionId].elements[elementId].styleM.top);

    mutations.SAVE_SECTIONS_STATE(state);
  },

  //修改元素
  MODIFY_ELEMENT(state, sectionId, elementId, style){
    var stateelement = state.sections[sectionId].elements[elementId];
    state.sections[sectionId].elements[elementId].style = extend({}, stateelement.style, style);
    mutations.SAVE_SECTIONS_STATE(state);
  },

  //新增元素
  ADD_ELEMENT(state, startSectionId, startelementId, endSectionId,style){
    var startsection = state.sections[startSectionId];
    var endsection = state.sections[endSectionId];
    //缓存旧的元素
    var stateelement = state.sections[startSectionId].elements[startelementId];
    stateelement.style = extend({}, stateelement.style, style);
    
    //删除旧的元素
    delete state.sections[startSectionId].elements[startelementId];
    state.sections.$set(startSectionId, merge({},startsection));

    //更新新的元素
    state.sections[endSectionId].elements[startelementId] = stateelement;
    state.sections.$set(endSectionId, merge({},endsection));

    mutations.SAVE_SECTIONS_STATE(state);
  }
}

export default new Vuex.Store({
  state,
  mutations
})
