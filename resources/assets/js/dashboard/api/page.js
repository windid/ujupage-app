let pageList = [
  {"id": 1, "name": "Test"},
  {"id": 2, "name": "测试页面"},
]

let newPageId = 3;

export default {
  getPageList: function(groupId, projectId, success, error){
    success(pageList);
  },

  createPage: function(groupId, projectId, pageName, success, error){
    pageList.push({"id":newPageId, name:pageName});
    success(newPageId);
    newPageId ++ ;
  },

  removePage: function(pageId){

  },

  modifyPage: function(pageId){

  }

}