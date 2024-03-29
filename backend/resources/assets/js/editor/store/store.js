import Vuex from '../../vendor/vuex'
import { extend, merge, intersection, difference, union } from 'lodash'
import randomChar from '../../utils/randomChar'

// Vue.use(Vuex)
const state = {
  workspace: {
    //页面宽度，桌面960，移动360
    width: 360,
    //
    height:0,
    //PC版页面高度，需计算
    heightPC: 0,
    //移动版页面高度，需计算
    heightM: 0,
    //pc为桌面版，mobile为移动版
    version: 'mobile',
    //当前页面激活的板块，将显示该板块的操作按钮，在添加页面元素时，将添加到此板块中
    currentSectionId: 0,
    //编辑状态中的板块id
    activeSectionId: null,
    //是否可以执行撤销操作
    undo: false,
    //是否可以执行重做操作
    redo: false,
    //编辑状态中的页面元素id
    activeElementId:"",
    //元素最大最小zindex,
    zIndex: {
      'pc':{max:50000, min:50000},
      'mobile':{max:50000, min:50000}
    }
  },

  page: {}
}

let initPage = merge({},state.page);

/* 页面初始状态 */
let pageStates = [initPage];
let pageHistoryIndex= 0;

const mutations = {
  
  //页面初始加载
  PAGE_INIT (state, page) {
    if (!page.settings){
      page = {
        settings:{
          seo:{
            pageTitle: "",
            keywords: "",
            description: ""
          },
          goals:{
            first: ""
          },
          code: {
            header:"",
            bodyIn:"",
            bodyOut:""
          }
        },
        colorSet:["#FCFFF5","#D1DBBD","#91AA9D","#3E606F","#193441"],
        sections:[],
        elements:{}
      }
    }
    state.page = merge({},page);
    if (page.elements.length < 1){
      page.elements = {};
    }
    pageStates = [merge({},state.page)];
    pageHistoryIndex = 0;
    mutations.SUM_PAGE_HEIGHT(state);
    mutations.COUNT_PAGE_LAYER(state);
  },

  //对sections进行操作过后保存其状态，供撤销重做
  SAVE_PAGE_STATE (state) {
    pageHistoryIndex += 1;
    pageStates = pageStates.slice(0,pageHistoryIndex);
    pageStates.push(merge({},state.page));
    state.workspace.undo = true;
    state.workspace.redo = false;
  },

  COUNT_PAGE_LAYER(state){
    let zIndex = {
      'pc':{max:50000, min:50000},
      'mobile':{max:50000, min:50000}
    };
    for (let elementId in state.page.elements){
      zIndex.pc.max = (state.page.elements[elementId].style.pc.zIndex > zIndex.pc.max) ? state.page.elements[elementId].style.pc.zIndex : zIndex.pc.max;
      zIndex.pc.min = (state.page.elements[elementId].style.pc.zIndex < zIndex.pc.min) ? state.page.elements[elementId].style.pc.zIndex : zIndex.pc.min;
      zIndex.mobile.max = (state.page.elements[elementId].style.mobile.zIndex > zIndex.mobile.max) ? state.page.elements[elementId].style.mobile.zIndex : zIndex.mobile.max;
      zIndex.mobile.min = (state.page.elements[elementId].style.mobile.zIndex < zIndex.mobile.min) ? state.page.elements[elementId].style.mobile.zIndex : zIndex.mobile.min;
    }
    state.workspace.zIndex = zIndex;
  },

  //计算页面高度，在初始加载以及进行了撤销重做动作之后执行
  SUM_PAGE_HEIGHT(state){
    let heightPC  = 0;
    let heightM   = 0;
    state.page.sections.forEach(function(section){
      heightPC += parseInt(section.style.pc.height);
      heightM  += parseInt(section.style.mobile.height);
    });
    state.workspace.heightPC = heightPC;
    state.workspace.heightM  = heightM;
    state.workspace.height   = (state.workspace.version == 'pc') ? heightPC : heightM;
  },

  //移动板块
  MOVE_SECTION(state, dir, sectionId){
    let target = sectionId
      if (dir === 'down' && sectionId < state.page.sections.length-1){
        target++;
      }
      if (dir === 'up' && sectionId > 0){
        target--;
      }

      if (sectionId != target){
        state.page.sections[sectionId] = state.page.sections.splice(target, 1, state.page.sections[sectionId])[0];
        mutations.SAVE_PAGE_STATE(state);
      }
  },

  //添加板块
  ADD_SECTION(state){
    let sectionId = randomChar(8);
    state.page.sections.push({
      id:sectionId,
      style:{
        "pc":{"background-color":"",height:"300px"},
        "mobile":{"background-color":"",height:"300px"}
      },
      elements:{"pc":[],"mobile":[]}
    });
    state.workspace.height += 300;
    mutations.SAVE_PAGE_STATE(state);
  },

  //删除板块
  REMOVE_SECTION(state, sectionId){
    //板块内的元素
    let sectionElements = union(state.page.sections[sectionId]['elements']['pc'],state.page.sections[sectionId]['elements']['mobile']);
    //删除板块
    state.workspace.height  -= parseInt(state.page.sections[sectionId].style[state.workspace.version].height);
    state.page.sections.splice(sectionId,1);
    //其他板块所包含的所有元素
    let allElements = [];
    state.page.sections.forEach(function(section){
      allElements = union(allElements, section.elements.pc, section.elements.mobile);
    });
    //如果板块内元素已不在别的板块中，则删除
    sectionElements.forEach(function(elementId){
      if (allElements.indexOf(elementId) === -1){
        Vue.delete(state.page.elements,elementId);
      }
    });
    
    mutations.SAVE_PAGE_STATE(state);
  },

  //修改板块
  MODIFY_SECTION(state,sectionId,style){
    state.page.sections[sectionId].style = merge({}, state.page.sections[sectionId].style, style);
    mutations.SUM_PAGE_HEIGHT(state);
    mutations.SAVE_PAGE_STATE(state);
  },

  //设置当前活动的页面板块
  SET_CURRENT_SECTION_ID (state,sectionId){
    if (state.workspace.activeSectionId === null){
      state.workspace.currentSectionId = sectionId;
    }
  },

  //设置当前处于编辑状态的Section
  SET_ACTIVE_SECTION_ID(state, sectionId){
    state.workspace.activeSectionId = sectionId;
  },

  //设置当前处于编辑状态的元素id
  SET_ACTIVE_ELEMENT_ID(state,elementId){
    state.workspace.activeElementId = elementId;
  },

  //重做
  REDO(state) {
    if(pageStates.length > pageHistoryIndex+1){
      pageHistoryIndex += 1;
      state.page = merge({},pageStates[pageHistoryIndex]);
      
      //控制按钮是否可点击
      state.workspace.undo = true;
      if (pageStates.length == pageHistoryIndex+1){
        state.workspace.redo = false;
      }

      //重新计算页面高度
      mutations.SUM_PAGE_HEIGHT(state);
    }
  },

  //撤销
  UNDO(state) {
    if(pageHistoryIndex >= 1){
      pageHistoryIndex -= 1;
      state.page = merge({},pageStates[pageHistoryIndex]);
      
      //控制按钮是否可点击
      state.workspace.redo = true;
      if (pageHistoryIndex == 0){
        state.workspace.undo = false;
      }

      //重新计算页面高度
      mutations.SUM_PAGE_HEIGHT(state);
    }
  },

  // 版本切换
  VERSION(state) {
    if (state.workspace.version === 'mobile'){
      state.workspace.version = 'pc';
      state.workspace.width = 960;
    } else {
      state.workspace.version = 'mobile';
      state.workspace.width = 360;
    }
    //重新计算页面高度
    mutations.SUM_PAGE_HEIGHT(state);
  },

  //添加元素
  ADD_ELEMENT(state, sectionId, element, record = true){
    const elementId = randomChar(8);
    Vue.set(state.page.elements, elementId, element);
    if (state.page.sections.length === 0){
      mutations.ADD_SECTION(state);
      sectionId = 0;
    }
    state.page.sections[sectionId]['elements']['pc'].push(elementId);
    state.page.sections[sectionId]['elements']['mobile'].push(elementId);
    state.workspace.zIndex.pc.max     = element.style.pc.zIndex;
    state.workspace.zIndex.mobile.max = element.style.mobile.zIndex;
    state.workspace.activeElementId = elementId;
    if (record){
      mutations.SAVE_PAGE_STATE(state);
    }
  },

  //删除元素
  REMOVE_ELEMENT(state, elementId, record = true){
    state.page.sections.forEach(function(section){
      section.elements.pc.$remove(elementId);
      section.elements.mobile.$remove(elementId);
    });
    Vue.delete(state.page.elements,elementId);
    if (record){
      mutations.SAVE_PAGE_STATE(state);
    }
  },

  // 移动元素
  MOVE_ELEMENT(state, sectionId, elementId, positionInPage, elementHeight){    
    let sumSectionsHeight  = 0;
    let sectionHeight = 0;

    //从元素中间到页头的高度
    let elementLine = positionInPage.top + elementHeight / 2;

    //计算移动后该元素落入哪个section
    let newSectionId = -1;
    while (elementLine >= sumSectionsHeight){
      newSectionId ++;
      sectionHeight = parseInt(state.page.sections[newSectionId].style[state.workspace.version].height);
      sumSectionsHeight += sectionHeight;
    }

    state.page.elements[elementId].style[state.workspace.version].top = positionInPage.top - (sumSectionsHeight - sectionHeight) + "px";
    state.page.elements[elementId].style[state.workspace.version].left = positionInPage.left + "px";

    if (newSectionId !== sectionId){
      state.page.sections[sectionId]['elements'][state.workspace.version].$remove(elementId);
      state.page.sections[newSectionId]['elements'][state.workspace.version].push(elementId);
    }

    mutations.SAVE_PAGE_STATE(state);
  },

  //缩放元素
  RESIZE_ELEMENT(state, elementId, newSize){
    state.page.elements[elementId]['style'][state.workspace.version]['width'] = newSize.width + "px";
    const height = state.page.elements[elementId]['style'][state.workspace.version]['height'];
    if (height && height !== "auto"){
      state.page.elements[elementId]['style'][state.workspace.version]['height'] = newSize.height + "px";
    } else {
      state.page.elements[elementId]['style'][state.workspace.version]['height'] = "auto";      
    }
    mutations.SAVE_PAGE_STATE(state);
  },

  //修改元素层次
  INDEX_ELEMENT(state, elementId, dir){
    let zIndex = 0;
    if (dir === 'top'){
      zIndex = ++state.workspace.zIndex[state.workspace.version].max;
    } else {
      zIndex = --state.workspace.zIndex[state.workspace.version].min;      
    }
    state.page.elements[elementId]['style'][state.workspace.version]['zIndex'] = zIndex;
    mutations.SAVE_PAGE_STATE(state);    
  },

  //修改元素
  MODIFY_ELEMENT(state, elementId, newPropsObj){
    let newElement = merge({}, state.page.elements[elementId], newPropsObj);
    Vue.set(state.page.elements, elementId, newElement);
    mutations.SAVE_PAGE_STATE(state);
  },

  //修改元素的另一种方式，整体替换
  REPLACE_ELEMENT(state, elementId, newElement){
    Vue.set(state.page.elements, elementId, merge({},newElement));
    mutations.SAVE_PAGE_STATE(state);
  },

  SAVE_SETTINGS(state, settings){
    state.page.settings = merge({},settings);
    mutations.SAVE_PAGE_STATE(state);
  },

  //修改配色方案
  SET_COLOR_SET(state,colorSet){
    state.page.colorSet = colorSet;
    mutations.SAVE_PAGE_STATE(state);
  }
}

export default new Vuex.Store({
  state,
  mutations,
  strict: true
})
