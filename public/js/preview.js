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
	
	var _preview = __webpack_require__(2);
	
	var _preview2 = _interopRequireDefault(_preview);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Vue.use(VueResource);
	// Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
	// Vue.http.options.root = '/dashboard';
	
	var vm = new Vue({
	  el: '#page',
	  render: function render(h) {
	    return h(_preview2.default);
	  }
	}); // import VueResource from 'vue-resource'

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(3)
	__vue_script__ = __webpack_require__(7)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources/assets/js/preview/components/preview.vue: named exports in *.vue files are ignored.")}
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
	  var id = "./preview.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../node_modules/css-loader/index.js?sourceMap!./../../../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./preview.vue", function() {
				var newContent = require("!!./../../../../../node_modules/css-loader/index.js?sourceMap!./../../../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./preview.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n#header{\n  z-index: 100;\n  height:45px;\n  padding:4px 20px;\n  width:100%;\n  min-width:960px;\n  position:relative;\n  border-top:1px solid #ddd;\n  border-bottom:1px solid #ddd;\n  background:#f9f9f9;\n  box-shadow: 0 0 8px #ddd;\n}\n\n.version-switch{\n  margin-left:20px;\n}\n\n.pc-iframe{\n  position: absolute;\n  top:45px;\n  bottom:0;\n  width:100%;\n  height:calc(100% - 45px);\n}\n.mobile-preview{\n  position: relative;\n  top:20px;\n  width: 100%;\n  text-align:center;\n}\n.mobile-iframe{\n  overflow-x: hidden;\n  overflow-y: scroll;\n  z-index: 3;\n  display: block;\n  border: none;\n  height: 667px;\n  width: 375px;\n  position: absolute;\n  margin: auto;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n\n\n", "", {"version":3,"sources":["/./resources/assets/js/preview/components/preview.vue?a6b13bec"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAwEA;EACA,aAAA;EACA,YAAA;EACA,iBAAA;EACA,WAAA;EACA,gBAAA;EACA,kBAAA;EACA,0BAAA;EACA,6BAAA;EACA,mBAAA;EACA,yBAAA;CACA;;AAEA;EACA,iBAAA;CACA;;AAEA;EACA,mBAAA;EACA,SAAA;EACA,SAAA;EACA,WAAA;EACA,yBAAA;CACA;AACA;EACA,mBAAA;EACA,SAAA;EACA,YAAA;EACA,kBAAA;CACA;AACA;EACA,mBAAA;EACA,mBAAA;EACA,WAAA;EACA,eAAA;EACA,aAAA;EACA,cAAA;EACA,aAAA;EACA,mBAAA;EACA,aAAA;EACA,OAAA;EACA,SAAA;EACA,UAAA;EACA,QAAA;CACA","file":"preview.vue","sourcesContent":["<script>\nimport dropdown from '../../ui/dropdown.vue'\n\nexport default {\n  components: {\n    dropdown,\n  },\n  data(){\n    return {\n      variations:[],\n      currentVariation: {},\n      version: 'mobile',\n      show: false\n    }\n  },\n  methods: {\n    init(){\n      this.variations = [\n        {id: 130, name: '版本 A'},\n        {id: 134, name: '版本 B'}\n      ];\n      this.currentVariation = this.variations[0];\n    }\n  },\n  created (){\n    this.init();\n  }\n}\n</script>\n\n<template>\n  <div id=\"page\">\n    <div id=\"header\">\n      <dropdown :show=\"show\" @toggle=\"show = !show\">\n        <div class=\"btn btn-default btn dropdown-toggle\" data-toggle=\"dropdown\">\n          {{currentVariation.name}} &nbsp; <span class=\"caret\"></span>\n        </div>\n        <ul slot=\"dropdown-menu\" class=\"dropdown-menu\">\n          <li v-for=\"variation in variations\">\n            <a href=\"#\" class=\"variation-name\" @click=\"currentVariation = variation\">{{variation.name}}</a>\n          </li>\n        </ul>\n      </dropdown>\n      <div class=\"btn-group version-switch\">\n        <div class=\"btn btn-default\" v-bind:class=\"{'active':version=='pc'}\" @click=\"version = 'pc'\">桌面版 <span class=\"glyphicon glyphicon-blackboard\"></span></div>\n        <div class=\"btn btn-default\" v-bind:class=\"{'active':version=='mobile'}\" @click=\"version = 'mobile'\">移动版 <span class=\"glyphicon glyphicon-phone\"></span></div>\n      </div>\n    </div>\n    <div id=\"main\">\n      <iframe v-show=\"version === 'pc'\" class=\"pc-iframe\" :src=\"'/editor/preview/variation/'+currentVariation.id\" frameborder=\"0\"></iframe>\n      <div v-show=\"version === 'mobile'\" class=\"mobile-preview\">\n                  \n<div class=\"marvel-device iphone6 silver\">\n    <div class=\"top-bar\"></div>\n    <div class=\"sleep\"></div>\n    <div class=\"volume\"></div>\n    <div class=\"camera\"></div>\n    <div class=\"sensor\"></div>\n    <div class=\"speaker\"></div>\n    <div class=\"screen\"></div>\n    <div class=\"home\"></div>\n    <div class=\"bottom-bar\"></div>\n    <iframe class=\"mobile-iframe\" :src=\"'/editor/preview/variation/'+currentVariation.id\" frameborder=\"0\"></iframe>\n</div>\n\n          \n      </div>\n    </div>\n  </div>\n</template>\n\n<style>\n#header{\n  z-index: 100;\n  height:45px;\n  padding:4px 20px;\n  width:100%;\n  min-width:960px;\n  position:relative;\n  border-top:1px solid #ddd;\n  border-bottom:1px solid #ddd;\n  background:#f9f9f9;\n  box-shadow: 0 0 8px #ddd;\n}\n\n.version-switch{\n  margin-left:20px;\n}\n\n.pc-iframe{\n  position: absolute;\n  top:45px;\n  bottom:0;\n  width:100%;\n  height:calc(100% - 45px);\n}\n.mobile-preview{\n  position: relative;\n  top:20px;\n  width: 100%;\n  text-align:center;\n}\n.mobile-iframe{\n  overflow-x: hidden;\n  overflow-y: scroll;\n  z-index: 3;\n  display: block;\n  border: none;\n  height: 667px;\n  width: 375px;\n  position: absolute;\n  margin: auto;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n\n\n</style>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 5 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if (media) {
			styleElement.setAttribute("media", media);
		}
	
		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _dropdown = __webpack_require__(8);
	
	var _dropdown2 = _interopRequireDefault(_dropdown);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  components: {
	    dropdown: _dropdown2.default
	  },
	  data: function data() {
	    return {
	      variations: [],
	      currentVariation: {},
	      version: 'mobile',
	      show: false
	    };
	  },
	
	  methods: {
	    init: function init() {
	      this.variations = [{ id: 130, name: '版本 A' }, { id: 134, name: '版本 B' }];
	      this.currentVariation = this.variations[0];
	    }
	  },
	  created: function created() {
	    this.init();
	  }
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(9)
	__vue_script__ = __webpack_require__(11)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources/assets/js/ui/dropdown.vue: named exports in *.vue files are ignored.")}
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
	  var id = "./dropdown.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(10);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./dropdown.vue", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./dropdown.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.dropdown-enter-active, .dropdown-leave-active {\n  -webkit-transition: all .3s ease;\n  transition: all .3s ease;\n  overflow: hidden;\n}\n.dropdown-enter, .dropdown-leave-active {\n  opacity: 0\n}\n", "", {"version":3,"sources":["/./resources/assets/js/ui/dropdown.vue?65748fa1"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AA4CA;EACA,iCAAA;EAAA,yBAAA;EACA,iBAAA;CACA;AACA;EACA,UAAA;CACA","file":"dropdown.vue","sourcesContent":["<script>\n  import eventHandler from '../utils/eventHandler'\n  export default {\n    props: {\n      show: Boolean,\n\n      //向上还是向下弹出菜单，默认向下，向上用up\n      dir:{\n        type: String,\n        default:'down'\n      }\n    },\n    methods: {\n      toggleDropdown(e) {\n        e.preventDefault()\n        this.$emit('toggle')\n      }\n    },\n    mounted() {\n      const el = this.$el\n      const toggle = el.querySelector('[data-toggle=\"dropdown\"]')\n      if (toggle){\n        toggle.addEventListener('click', this.toggleDropdown)\n      }\n      this._closeEvent = eventHandler.listen(window, 'click', (e)=> {\n        if (!el.contains(e.target) && this.show){\n          this.toggleDropdown(e);\n        }\n      })\n    },\n    beforeDestroy() {\n      if (this._closeEvent) this._closeEvent.remove()\n    }\n  }\n</script>\n\n<template>\n  <div class=\"btn-group\" v-bind:class=\"{open:show,dropup:(dir === 'up')}\">\n    <slot></slot>\n    <slot name=\"dropdown-menu\"></slot>\n  </div>\n</template>\n\n<style>\n  .dropdown-enter-active, .dropdown-leave-active {\n    transition: all .3s ease;\n    overflow: hidden;\n  }\n  .dropdown-enter, .dropdown-leave-active {\n    opacity: 0\n  }\n</style>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _eventHandler = __webpack_require__(12);
	
	var _eventHandler2 = _interopRequireDefault(_eventHandler);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  props: {
	    show: Boolean,
	
	    dir: {
	      type: String,
	      default: 'down'
	    }
	  },
	  methods: {
	    toggleDropdown: function toggleDropdown(e) {
	      e.preventDefault();
	      this.$emit('toggle');
	    }
	  },
	  mounted: function mounted() {
	    var _this = this;
	
	    var el = this.$el;
	    var toggle = el.querySelector('[data-toggle="dropdown"]');
	    if (toggle) {
	      toggle.addEventListener('click', this.toggleDropdown);
	    }
	    this._closeEvent = _eventHandler2.default.listen(window, 'click', function (e) {
	      if (!el.contains(e.target) && _this.show) {
	        _this.toggleDropdown(e);
	      }
	    });
	  },
	  beforeDestroy: function beforeDestroy() {
	    if (this._closeEvent) this._closeEvent.remove();
	  }
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var eventHandler = {
	  /**
	   * Listen to DOM events during the bubble phase.
	   *
	   * @param {DOMEventTarget} target DOM element to register listener on.
	   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
	   * @param {function} callback Callback function.
	   * @return {object} Object with a `remove` method.
	   */
	
	  listen: function listen(target, eventType, callback) {
	    if (target.addEventListener) {
	      target.addEventListener(eventType, callback, false);
	      return {
	        remove: function remove() {
	          target.removeEventListener(eventType, callback, false);
	        }
	      };
	    } else if (target.attachEvent) {
	      target.attachEvent('on' + eventType, callback);
	      return {
	        remove: function remove() {
	          target.detachEvent('on' + eventType, callback);
	        }
	      };
	    }
	  }
	};
	
	exports.default = eventHandler;

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<div class=\"btn-group\" v-bind:class=\"{open:show,dropup:(dir === 'up')}\">\n  <slot></slot>\n  <slot name=\"dropdown-menu\"></slot>\n</div>\n";

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n  <div id=\"page\">\n    <div id=\"header\">\n      <dropdown :show=\"show\" @toggle=\"show = !show\">\n        <div class=\"btn btn-default btn dropdown-toggle\" data-toggle=\"dropdown\">\n          {{currentVariation.name}} &nbsp; <span class=\"caret\"></span>\n        </div>\n        <ul slot=\"dropdown-menu\" class=\"dropdown-menu\">\n          <li v-for=\"variation in variations\">\n            <a href=\"#\" class=\"variation-name\" @click=\"currentVariation = variation\">{{variation.name}}</a>\n          </li>\n        </ul>\n      </dropdown>\n      <div class=\"btn-group version-switch\">\n        <div class=\"btn btn-default\" v-bind:class=\"{'active':version=='pc'}\" @click=\"version = 'pc'\">桌面版 <span class=\"glyphicon glyphicon-blackboard\"></span></div>\n        <div class=\"btn btn-default\" v-bind:class=\"{'active':version=='mobile'}\" @click=\"version = 'mobile'\">移动版 <span class=\"glyphicon glyphicon-phone\"></span></div>\n      </div>\n    </div>\n    <div id=\"main\">\n      <iframe v-show=\"version === 'pc'\" class=\"pc-iframe\" :src=\"'/editor/preview/variation/'+currentVariation.id\" frameborder=\"0\"></iframe>\n      <div v-show=\"version === 'mobile'\" class=\"mobile-preview\">\n                  \n<div class=\"marvel-device iphone6 silver\">\n    <div class=\"top-bar\"></div>\n    <div class=\"sleep\"></div>\n    <div class=\"volume\"></div>\n    <div class=\"camera\"></div>\n    <div class=\"sensor\"></div>\n    <div class=\"speaker\"></div>\n    <div class=\"screen\"></div>\n    <div class=\"home\"></div>\n    <div class=\"bottom-bar\"></div>\n    <iframe class=\"mobile-iframe\" :src=\"'/editor/preview/variation/'+currentVariation.id\" frameborder=\"0\"></iframe>\n</div>\n\n          \n      </div>\n    </div>\n  </div>\n";

/***/ }
/******/ ]);
//# sourceMappingURL=preview.js.map