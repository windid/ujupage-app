/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Vue = __webpack_require__(2);
	var editor = __webpack_require__(3);
	
	new Vue({
	  el: 'body',
	  components: { editor: editor }
	});
	
	console.log(page);
	
	var sections = [{
	  style: { "background": "#900", "height": 200 },
	  elements: {
	    "bifsdc": {
	      type: "text",
	      content: "wdfsdf<br>dksjlfjslkd jksdfs",
	      style: "left:200px;top:40px;width:200px",
	      zindex: 100
	    },
	    "sdf23d": {
	      type: "image",
	      src: "fsd.gif",
	      style: "",
	      zindex: 101
	    },
	    "fgh24g": {
	      type: "button",
	      style: "background:#990",
	      zindex: 102
	    },
	    "nrgs13": {
	      type: "video",
	      style: "",
	      zindex: 103
	    },
	    "bwdkfk": {
	      type: "form",
	      style: "",
	      zindex: 105
	    }
	  }
	}, {
	  style: { "background": "", "height": 300 },
	  elements: {}
	}, {
	  style: { "background": "#909", "height": 300 },
	  elements: {}
	}];
	
	page.init(sections);

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = Vue;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(4)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources/assets/js/pages/editor/components/editor.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(14)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./editor.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _controlbar = __webpack_require__(5);
	
	var _controlbar2 = _interopRequireDefault(_controlbar);
	
	var _toolbar = __webpack_require__(8);
	
	var _toolbar2 = _interopRequireDefault(_toolbar);
	
	var _page = __webpack_require__(11);
	
	var _page2 = _interopRequireDefault(_page);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  data: function data() {
	    return {
	      message: 'test'
	    };
	  },
	
	  components: {
	    controlbar: _controlbar2.default,
	    toolbar: _toolbar2.default,
	    page: _page2.default
	  }
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(6)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources/assets/js/pages/editor/components/controlbar.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(7)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./controlbar.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  data: function data() {
	    return {};
	  }
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "\n<<div class=\"header\">\n  <ul class=\"header-holder list-inline fl\">\n    <li class=\"go-to-dashboard\"><a href=\"./dashboard\"><span class=\"glyphicon glyphicon-home\"></span></a></li>\n    <li><a>创建一个A/B测试</a></li>\n  </ul>\n  <div class=\"btn-group btn-group-sm version-switch\" role=\"group\" aria-label=\"...\">\n    <button type=\"button\" class=\"btn btn-default\" ms-class=\"active:avalon.vmodels.page._version == 0\" ms-click=\"avalon.vmodels.page.setVersion(0)\">桌面 <span class=\"glyphicon glyphicon-blackboard\"></span></button>\n    <button type=\"button\" class=\"btn btn-default\" ms-class=\"active:avalon.vmodels.page._version == 1\" ms-click=\"avalon.vmodels.page.setVersion(1)\">移动 <span class=\"glyphicon glyphicon-phone\"></span></button>\n  </div>\n\n  <ul class=\"header-holder list-inline fr\">\n    <li><span class=\"glyphicon glyphicon-question-sign\"></span></li>\n    <li><span class=\"glyphicon glyphicon-share-alt flipx\"></span></li>\n    <li><span class=\"glyphicon glyphicon-share-alt\"></span></li>\n    <li>设置 <span class=\"glyphicon glyphicon-cog\"></span></li>\n    <li>保存 <span class=\"glyphicon glyphicon-floppy-disk\"></span></li>\n    <li>预览 <span class=\"glyphicon glyphicon-eye-open\"></span></li>\n    <li class=\"publish\">发布 <span class=\"glyphicon glyphicon-send\"></span></li>\n  </ul>\n</div>\n";

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(9)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources/assets/js/pages/editor/components/toolbar.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(10)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./toolbar.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  data: function data() {
	    return {
	      tools: [{
	        name: '版块',
	        style: 'modal-window',
	        action: function action() {
	          page.addSection();
	        }
	      }, {
	        name: '图片',
	        style: 'picture',
	        action: function action() {
	          page.addElement("image");
	        }
	      }, {
	        name: '文字',
	        style: 'font',
	        action: function action() {
	          page.addElement("text");
	        }
	      }, {
	        name: '按钮',
	        style: 'expand',
	        action: function action() {
	          page.addElement("button");
	        }
	      }, {
	        name: '视频',
	        style: 'facetime-video',
	        action: function action() {
	          page.addElement("video");
	        }
	      }, {
	        name: '表单',
	        style: 'edit',
	        action: function action() {
	          page.addElement("form");
	        }
	      }]
	    };
	  }
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"toolbar\">\n  <div class=\"toolbar-header\">组件</div>\n  <div class=\"toolbar-body\">\n    <div v-for=\"tool in tools\" class=\"tool\" v-on:click=\"tool.action\">\n      <span class=\"glyphicon glyphicon-{{tool.style}}\"></span>\n      <div class=\"tool-name\">{{tool.name}}</div>\n    </div>\n  </div>\n</div>\n";

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(12)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources/assets/js/pages/editor/components/page.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(13)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./page.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  data: function data() {
	    return {
	      pageWidth: 960,
	      pageHeight: 0,
	      sections: []
	    };
	  },
	  computed: {
	    pageLeft: function pageLeft() {
	      return -this.pageWidth / 2 + 1;
	    }
	  },
	  methods: {
	    init: function init(sections) {
	      this.sections = sections;
	      console.log('sdf');
	    }
	  }
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"workspace\">\n  <div id=\"content-area\" v-bind:style=\"{ height: pageHeight + 'px', width: pageWidth + 'px', marginLeft: pageLeft + 'px' }\"></div>\n  <div ms-repeat-section=\"sections\" ms-mouseover=\"setCurrentSection($index)\" ms-attr-id=\"'section-'+$index\" class=\"page-section\" ms-css-height=\"{{section.style.height}}\" ms-css-background=\"{{section.style.background}}\" ms-resizable=\"page,$section_resizable\" >\n    <div class=\"editable-area\" style=\"width:{{pageWidth}}px\">\n      <div ms-repeat-el=\"section.elements\" ms-attr-id=\"$index+'-'+$key\" class=\"page-item\" ms-pageitem=\"\" ms-draggable=\"page,$element_draggable\" ms-tooltip=\"page,$element_tt_coordinates\" ms-html=\"$val.content\"></div>\n\n      <div class=\"btn-group page-section-operation\" role=\"group\" aria-label=\"...\" ms-visible=\"currentSection===$index\" style=\"left:{{_width+5}}px\">\n        <button type=\"button\" class=\"btn btn-primary\" title=\"修改\"><span class=\"glyphicon glyphicon-pencil\"></span></button>\n        <button type=\"button\" class=\"btn btn-default\" title=\"上移\" ms-click=\"moveSection('up',$index)\"><span class=\"glyphicon glyphicon-chevron-up\"></span></button>\n        <button type=\"button\" class=\"btn btn-default\" title=\"下移\" ms-click=\"moveSection('down',$index)\"><span class=\"glyphicon glyphicon-chevron-down\"></span></button>\n        <button type=\"button\" class=\"btn btn-default\" title=\"删除\" ms-click=\"removeSection($index)\"><span class=\"glyphicon glyphicon-remove\"></span></button>\n      </div>\n    </div>\n  </div>\n</div>\n\n\n";

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = "\n<controlbar></controlbar>\n<div class=\"main\">\n  <toolbar></toolbar>\n  <page></page>\n</div>\n";

/***/ }
/******/ ]);
//# sourceMappingURL=editor.js.map