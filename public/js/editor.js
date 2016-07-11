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

	//Avalon采用外部引入，不打包
	var avalon = __webpack_require__(2)
	//Avalon Ajax模块
	__webpack_require__(3);
	
	//全局VM
	__webpack_require__(5);
	
	//编辑器头部
	__webpack_require__(6);
	
	//组件栏
	__webpack_require__(9);
	
	//编辑区
	__webpack_require__(12);
	
	//布局模板
	avalon.templateCache['layout'] = __webpack_require__(18);
	avalon.vmodels.editor.tpl = "layout";


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = avalon;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//=========================================
	//  数据交互模块 by 司徒正美
	//  版本: 1.0.0
	//  最近更新: 2015/4/30
	//==========================================
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function(avalon) {
	    var global = window
	    var DOC = global.document
	    var encode = encodeURIComponent
	    var decode = decodeURIComponent
	
	    var rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/
	    var rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg
	    var rnoContent = /^(?:GET|HEAD)$/
	    var rprotocol = /^\/\//
	    var rhash = /#.*$/
	    var rquery = /\?/
	    var rjsonp = /(=)\?(?=&|$)|\?\?/
	    var r20 = /%20/g
	    var radd = /\+/g
	    var r5b5d = /%5B(.*?)%5D$/;
	
	    var originAnchor = document.createElement("a")
	    originAnchor.href = location.href
	    //告诉WEB服务器自己接受什么介质类型，*/* 表示任何类型，type/* 表示该类型下的所有子类型，type/sub-type。
	    var accepts = {
	        xml: "application/xml, text/xml",
	        html: "text/html",
	        text: "text/plain",
	        json: "application/json, text/javascript",
	        script: "text/javascript, application/javascript",
	        "*": ["*/"] + ["*"] //避免被压缩掉
	    }
	
	    function IE() {
	        if (window.VBArray) {
	            var mode = document.documentMode
	            return mode ? mode : window.XMLHttpRequest ? 7 : 6
	        } else {
	            return 0
	        }
	    }
	    var useOnload = IE() === 0 || IE() > 8
	
	    function parseJS(code) {
	        var indirect = eval
	        code = code.trim()
	        if (code) {
	            if (code.indexOf("use strict") === 1) {
	                var script = document.createElement("script")
	                script.text = code;
	                head.appendChild(script).parentNode.removeChild(script)
	            } else {
	                indirect(code)
	            }
	        }
	    }
	
	    if (!String.prototype.startsWith) {
	        String.prototype.startsWith = function(searchString, position) {
	            position = position || 0;
	            return this.lastIndexOf(searchString, position) === position;
	        }
	    }
	
	    var head = DOC.getElementsByTagName("head")[0] //HEAD元素
	    var isLocal = false
	    try {
	        //在IE下如果重置了document.domain，直接访问window.location会抛错，但用document.URL就ok了
	        //http://www.cnblogs.com/WuQiang/archive/2012/09/21/2697474.html
	        isLocal = rlocalProtocol.test(location.protocol)
	    } catch (e) {
	    }
	
	    new function() {
	        //http://www.cnblogs.com/rubylouvre/archive/2010/04/20/1716486.html
	        var s = ["XMLHttpRequest",
	            "ActiveXObject('MSXML2.XMLHTTP.6.0')",
	            "ActiveXObject('MSXML2.XMLHTTP.3.0')",
	            "ActiveXObject('MSXML2.XMLHTTP')",
	            "ActiveXObject('Microsoft.XMLHTTP')"
	        ]
	        s[0] = IE() < 8 && IE() !== 0 && isLocal ? "!" : s[0] //IE下只能使用ActiveXObject
	        for (var i = 0, axo; axo = s[i++];) {
	            try {
	                if (eval("new " + axo)) {
	                    avalon.xhr = new Function("return new " + axo)
	                    break;
	                }
	            } catch (e) {
	            }
	        }}
	    var supportCors = "withCredentials" in avalon.xhr()
	
	
	
	
	    function parseXML(data, xml, tmp) {
	        try {
	            var mode = document.documentMode
	            if (window.DOMParser && (!mode || mode > 8)) { // Standard
	                tmp = new DOMParser()
	                xml = tmp.parseFromString(data, "text/xml")
	            } else { // IE
	                xml = new ActiveXObject("Microsoft.XMLDOM") //"Microsoft.XMLDOM"
	                xml.async = "false";
	                xml.loadXML(data)
	            }
	        } catch (e) {
	        xml = void  0
	        }
	        if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
	            avalon.error("Invalid XML: " + data)
	        }
	        return xml
	    }
	
	    //ajaxExtend是一个非常重要的内部方法，负责将用法参数进行规整化
	    //1. data转换为字符串
	    //2. type转换为大写
	    //3. url正常化，加querystring, 加时间戮
	    //4. 判定有没有跨域
	    //5. 添加hasContent参数
	    var defaults = {
	        type: "GET",
	        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	        async: true,
	        jsonp: "callback"
	    }
	    function ajaxExtend(opts) {
	        opts = avalon.mix({}, defaults, opts)
	        opts.type = opts.type.toUpperCase()
	        var querystring = typeof opts.data === "string" ? opts.data : avalon.param(opts.data)
	        opts.querystring = querystring || ""
	        opts.url = opts.url.replace(rhash, "").replace(rprotocol, location.protocol + "//")
	
	        if (typeof opts.crossDomain !== "boolean") { //判定是否跨域
	            var urlAnchor = document.createElement("a");
	            // Support: IE6-11+
	            // IE throws exception if url is malformed, e.g. http://example.com:80x/
	            try {
	                urlAnchor.href = opts.url;
	                // in IE7-, get the absolute path
	                var absUrl = !"1"[0] ? urlAnchor.getAttribute("href", 4) : urlAnchor.href;
	                urlAnchor.href = absUrl
	                opts.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
	            } catch (e) {
	            opts.crossDomain = true;
	            }
	        }
	        opts.hasContent = !rnoContent.test(opts.type) //是否为post请求
	        if (!opts.hasContent) {
	            if (querystring) { //如果为GET请求,则参数依附于url上
	                opts.url += (rquery.test(opts.url) ? "&" : "?") + querystring;
	            }
	            if (opts.cache === false) { //添加时间截
	                opts.url += (rquery.test(opts.url) ? "&" : "?") + "_time=" + (new Date() - 0)
	            }
	        }
	        return opts;
	    }
	    /**
	     * 伪XMLHttpRequest类,用于屏蔽浏览器差异性
	     * var ajax = new(self.XMLHttpRequest||ActiveXObject)("Microsoft.XMLHTTP")
	     * ajax.onreadystatechange = function(){
	     *   if (ajax.readyState==4 && ajax.status==200){
	     *        alert(ajax.responseText)
	     *   }
	     * }
	     * ajax.open("POST", url, true) 
	     * ajax.send("key=val&key1=val2") 
	     */
	    var XHRMethods = {
	        setRequestHeader: function(name, value) {
	            this.requestHeaders[name] = value;
	            return this;
	        },
	        getAllResponseHeaders: function() {
	            return this.readyState === 4 ? this.responseHeadersString : null;
	        },
	        getResponseHeader: function(name, match) {
	            if (this.readyState === 4) {
	                while ((match = rheaders.exec(this.responseHeadersString))) {
	                    this.responseHeaders[match[1]] = match[2];
	                }
	                match = this.responseHeaders[name];
	            }
	            return match === undefined ? null : match;
	        },
	        overrideMimeType: function(type) {
	            this.mimeType = type;
	            return this;
	        },
	        // 中止请求
	        abort: function(statusText) {
	            statusText = statusText || "abort";
	            if (this.transport) {
	                this.respond(0, statusText)
	            }
	            return this;
	        },
	        /**
	         * 用于派发success,error,complete等回调
	         * http://www.cnblogs.com/rubylouvre/archive/2011/05/18/2049989.html
	         * @param {Number} status 状态码
	         * @param {String} statusText 对应的扼要描述
	         */
	        dispatch: function(status, nativeStatusText) {
	            var statusText = nativeStatusText
	            // 只能执行一次，防止重复执行
	            if (!this.transport) { //2:已执行回调
	                return
	            }
	            this.readyState = 4
	            var isSuccess = status >= 200 && status < 300 || status === 304
	            if (isSuccess) {
	                if (status === 204) {
	                    statusText = "nocontent"
	                } else if (status === 304) {
	                    statusText = "notmodified"
	                } else {
	                    //如果浏览器能直接返回转换好的数据就最好不过,否则需要手动转换
	                    if (typeof this.response === "undefined") {
	                        var dataType = this.options.dataType || this.options.mimeType
	                        if (!dataType && this.responseText || this.responseXML) { //如果没有指定dataType，则根据mimeType或Content-Type进行揣测
	                            dataType = this.getResponseHeader("Content-Type") || ""
	                            dataType = dataType.match(/json|xml|script|html/i) || ["text"]
	                            dataType = dataType[0].toLowerCase()
	                        }
	                        var responseText = this.responseText || '',
	                            responseXML = this.responseXML || ''
	                        try {
	                            this.response = avalon.ajaxConverters[dataType].call(this, responseText, responseXML)
	                        } catch (e) {
	                        isSuccess = false
	                        this.error = e
	                        statusText = "parsererror"
	                        }
	                    }
	                }
	            }
	            this.status = status;
	            this.statusText = statusText + ""
	            if (this.timeoutID) {
	                clearTimeout(this.timeoutID)
	                delete this.timeoutID
	            }
	            this._transport = this.transport
	
	            /**
	             * global event handler
	             */
	            var that = this
	
	            // 到这要么成功，调用success, 要么失败，调用 error, 最终都会调用 complete
	            if (isSuccess) {
	                this._resolve([this.response, statusText, this])
	                /**
	                 * global event handler
	                 */
	                window.setTimeout(function() {
	                    avalon.ajaxGlobalEvents.success(that, that.options, that.response)
	                }, 0)
	            } else {
	                this._reject([this, statusText, this.error])
	                /**
	                 * global event handler
	                 */
	                window.setTimeout(function() {
	                    avalon.ajaxGlobalEvents.error(that, that.options, statusText)
	                }, 0)
	            }
	            delete this.transport
	
	            /**
	             * global event handler
	             */
	            ajaxActive--
	
	            window.setTimeout(function() {
	                avalon.ajaxGlobalEvents.complete(that, that.options)
	            }, 0)
	
	            if (ajaxActive === 0) {
	                // 最后一个
	                window.setTimeout(function() {
	                    avalon.ajaxGlobalEvents.stop()
	                }, 0)
	            }
	
	        }
	    }
	    /**
	     * global event handler
	     */
	    // 记录当前活跃的 ajax 数
	    var ajaxActive = 0
	
	    //ajax主函数
	    avalon.ajax = function(opts, promise) {
	        if (!opts || !opts.url) {
	            avalon.error("参数必须为Object并且拥有url属性")
	        }
	        opts = ajaxExtend(opts) //处理用户参数，比如生成querystring, type大写化
	        //创建一个伪XMLHttpRequest,能处理complete,success,error等多投事件
	        var XHRProperties = {
	            responseHeadersString: "",
	            responseHeaders: {},
	            requestHeaders: {},
	            querystring: opts.querystring,
	            readyState: 0,
	            uniqueID: ("" + Math.random()).replace(/0\./, ""),
	            status: 0
	        }
	        var _reject, _resolve
	        var promise = new avalon.Promise(function(resolve, reject) {
	            _resolve = resolve
	            _reject = reject
	        })
	
	        promise.options = opts
	        promise._reject = _reject
	        promise._resolve = _resolve
	
	        var doneList = [],
	            failList = []
	
	        Array("done", "fail", "always").forEach(function(method) {
	            promise[method] = function(fn) {
	                if (typeof fn === "function") {
	                    if (method !== "fail")
	                        doneList.push(fn)
	                    if (method !== "done")
	                        failList.push(fn)
	                }
	                return this
	            }
	        })
	
	        var isSync = opts.async === false
	        if (isSync) {
	            avalon.log("warnning:与jquery1.8一样,async:false这配置已经被废弃")
	            promise.async = false
	        }
	
	
	        avalon.mix(promise, XHRProperties, XHRMethods)
	
	        promise.then(function(value) {
	            value = Array.isArray(value) ? value : value === void 0 ? [] : [value]
	            for (var i = 0, fn; fn = doneList[i++];) {
	                fn.apply(promise, value)
	            }
	            return value
	        }, function(value) {
	            value = Array.isArray(value) ? value : value === void 0 ? [] : [value]
	            for (var i = 0, fn; fn = failList[i++];) {
	                fn.apply(promise, value)
	            }
	            return value
	        })
	
	
	        promise.done(opts.success).fail(opts.error).always(opts.complete)
	
	        var dataType = opts.dataType //目标返回数据类型
	        var transports = avalon.ajaxTransports
	
	        if ((opts.crossDomain && !supportCors || rjsonp.test(opts.url)) && dataType === "json" && opts.type === "GET") {
	            dataType = opts.dataType = "jsonp"
	        }
	        var name = opts.form ? "upload" : dataType
	        var transport = transports[name] || transports.xhr
	        avalon.mix(promise, transport) //取得传送器的request, respond, preproccess
	        if (promise.preproccess) { //这用于jsonp upload传送器
	            dataType = promise.preproccess() || dataType
	        }
	        //设置首部 1、Content-Type首部
	        if (opts.contentType) {
	            promise.setRequestHeader("Content-Type", opts.contentType)
	        }
	        //2.处理Accept首部
	        promise.setRequestHeader("Accept", accepts[dataType] ? accepts[dataType] + ", */*; q=0.01" : accepts["*"])
	        for (var i in opts.headers) { //3. 处理headers里面的首部
	            promise.setRequestHeader(i, opts.headers[i])
	        }
	        // 4.处理超时
	        if (opts.async && opts.timeout > 0) {
	            promise.timeoutID = setTimeout(function() {
	                promise.abort("timeout")
	                promise.dispatch(0, "timeout")
	            }, opts.timeout)
	        }
	
	        /**
	         * global event handler
	         */
	        if (ajaxActive === 0) {
	            // 第一个
	            avalon.ajaxGlobalEvents.start()
	        }
	        avalon.ajaxGlobalEvents.send(promise, opts)
	        ajaxActive++
	
	
	
	        promise.request()
	        return promise
	    };
	    "get,post".replace(avalon.rword, function(method) {
	        avalon[method] = function(url, data, callback, type) {
	            if (typeof data === "function") {
	                type = type || callback
	                callback = data
	                data = void 0
	            }
	            return avalon.ajax({
	                type: method,
	                url: url,
	                data: data,
	                success: callback,
	                dataType: type
	            })
	        };
	    })
	    function ok(val) {
	        return val
	    }
	    function ng(e) {
	        throw e
	    }
	    avalon.getScript = function(url, callback) {
	        return avalon.get(url, null, callback, "script")
	    }
	    avalon.getJSON = function(url, data, callback) {
	        return avalon.get(url, data, callback, "json")
	    }
	    avalon.upload = function(url, form, data, callback, dataType) {
	        if (typeof data === "function") {
	            dataType = callback;
	            callback = data;
	            data = void 0;
	        }
	        return avalon.ajax({
	            url: url,
	            type: "post",
	            dataType: dataType,
	            form: form,
	            data: data,
	            success: callback
	        });
	    }
	
	
	    /**
	     * global event handler
	     */
	    avalon.ajaxGlobalEvents = {};
	
	    ["start", "stop", "complete", "error", "success", "send"].forEach(function(method) {
	        avalon.ajaxGlobalEvents[method] = avalon.noop
	    })
	
	    avalon.ajaxConverters = { //转换器，返回用户想要做的数据
	        text: function(text) {
	            // return text || "";
	            return text;
	        },
	        xml: function(text, xml) {
	            return xml !== void 0 ? xml : parseXML(text)
	        },
	        html: function(text) {
	            return avalon.parseHTML(text) //一个文档碎片,方便直接插入DOM树
	        },
	        json: function(text) {
	            if (!avalon.parseJSON) {
	                avalon.log("avalon.parseJSON不存在,请升级到最新版")
	            }
	            return avalon.parseJSON(text)
	        },
	        script: function(text) {
	            parseJS(text)
	            return text;
	        },
	        jsonp: function() {
	            var json, callbackName;
	            if (this.jsonpCallback.startsWith('avalon.')) {
	                callbackName = this.jsonpCallback.replace(/avalon\./, '')
	                json = avalon[callbackName]
	                delete avalon[callbackName]
	            } else {
	                json = window[this.jsonpCallback]
	            }
	            return json;
	        }
	    }
	
	    var rbracket = /\[\]$/
	    avalon.param = function(obj) {
	        var prefix,
	            s = [],
	            add = function(key, value) {
	                // If value is a function, invoke it and return its value
	                value = typeof value === "function" ? value() : (value == null ? "" : value);
	                s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
	        }
	        // 处理数组与类数组的jquery对象
	        if (Array.isArray(obj)) {
	            // Serialize the form elements
	            avalon.each(obj, add)
	
	        } else {
	            for (prefix in obj) {
	                paramInner(prefix, obj[prefix], add);
	            }
	        }
	
	        // Return the resulting serialization
	        return s.join("&").replace(r20, "+");
	    }
	
	    function paramInner(prefix, obj, add) {
	        var name;
	        if (Array.isArray(obj)) {
	            // Serialize array item.
	            avalon.each(obj, function(i, v) {
	                if (rbracket.test(prefix)) {
	                    // Treat each array item as a scalar.
	                    add(prefix, v);
	                } else {
	                    // Item is non-scalar (array or object), encode its numeric index.
	                    paramInner(
	                        prefix + "[" + (typeof v === "object" ? i : "") + "]",
	                        v,
	                        add);
	                }
	            });
	        } else if (avalon.isPlainObject(obj)) {
	            // Serialize object item.
	            for (name in obj) {
	                paramInner(prefix + "[" + name + "]", obj[name], add);
	            }
	
	        } else {
	            // Serialize scalar item.
	            add(prefix, obj);
	        }
	    }
	    //将一个字符串转换为对象
	    function tryDecodeURIComponent(value) {
	        try {
	            return decodeURIComponent(value);
	        } catch (e) {
	        return value
	        }
	    }
	
	
	    //a%5B0%5D%5Bvalue%5D a%5B1%5D%5B%5D
	    function addSubObject(host, text, value) {
	        var match = text.match(r5b5d)
	        if (!match) {
	            return true
	        }
	
	        var steps = []
	        var first = true
	        var step, index, key
	        while (index = text.lastIndexOf("%5B")) {
	            if (index === -1) {
	                break
	            }
	            key = text.slice(index).slice(3, -3)
	            text = text.slice(0, index)
	            if (key === "") {
	                steps.unshift({
	                    action: "pushArrayElement"
	                })
	            } else if ((key >>> 0) + "" === key) {
	                steps.unshift({
	                    action: "setSubArray",
	                    value: key
	                })
	            } else {
	                if (first) {
	                    steps.unshift({
	                        action: "setObjectProperty",
	                        value: tryDecodeURIComponent(key)
	                    })
	                } else {
	                    steps.unshift({
	                        action: "setSubObjet",
	                        value: tryDecodeURIComponent(key)
	                    })
	                }
	            }
	            first = false
	        }
	        first = true
	        while (step = steps.shift()) {
	            var isObject = /Object/.test(step.action)
	            if (first) {
	                if (!(text in host)) {
	                    host[text] = isObject ? {} : []
	                }
	                first = false
	                host = host[text]
	            }
	            switch (step.action) {
	                case "pushArrayElement":
	                    host.push(value)
	                    break
	                case "setObjectProperty":
	                    host[step.value] = value
	                    break
	                case "setSubObjet":
	                    if (!(step.value in host)) {
	                        host[step.value] = {}
	                    }
	                    host = host[step.value]
	                    break
	                case "setSubArray":
	                    if (!(step.value in host)) {
	                        host[step.value] = []
	                    }
	                    host = host[step.value]
	                    break
	            }
	        }
	    }
	    //  function add
	    avalon.unparam = function(qs, sep, eq) {
	        sep = sep || '&';
	        eq = eq || '=';
	        var obj = {};
	        if ((typeof qs !== "string") || qs.length === 0) {
	            return obj;
	        }
	        if (qs.indexOf("?") !== -1) {
	            qs = qs.split("?").pop()
	        }
	        var array = qs.split(sep);
	        for (var i = 0, el; el = array[i++];) {
	            var arr = el.split("=")
	            if (arr.length === 1) { //处理只有键名没键值的情况
	                obj[arr[0]] = ""
	            } else {
	                var key = arr[0].replace(radd, '%20')
	                var v = tryDecodeURIComponent(arr.slice(1).join("=").replace(radd, ' '));
	                if (addSubObject(obj, key, v)) { //处理存在中括号的情况
	                    var k = tryDecodeURIComponent(key) //处理不存在中括号的简单的情况
	                    if (!Object.prototype.hasOwnProperty.call(obj, k)) {
	                        obj[k] = v;
	                    } else if (Array.isArray(obj[k])) {
	                        obj[k].push(v);
	                    } else {
	                        obj[k] = [obj[k], v];
	                    }
	                }
	            }
	        }
	
	        return obj
	    }
	    var rinput = /select|input|button|textarea/i
	    var rcheckbox = /radio|checkbox/
	    var rline = /\r?\n/g
	    function trimLine(val) {
	        return val.replace(rline, "\r\n")
	    }
	    //表单元素变字符串, form为一个元素节点
	    avalon.serialize = function(form) {
	        var json = {};
	        // 不直接转换form.elements，防止以下情况：   <form > <input name="elements"/><input name="test"/></form>
	        Array.prototype.filter.call(form.getElementsByTagName("*"), function(el) {
	            if (rinput.test(el.nodeName) && el.name && !el.disabled) {
	                return rcheckbox.test(el.type) ? el.checked : true //只处理拥有name并且没有disabled的表单元素
	            }
	        }).forEach(function(el) {
	            var val = avalon(el).val()
	            val = Array.isArray(val) ? val.map(trimLine) : trimLine(val)
	            var name = el.name
	            if (name in json) {
	                if (Array.isArray(val)) {
	                    json[name].push(val)
	                } else {
	                    json[name] = [json[name], val]
	                }
	            } else {
	                json[name] = val
	            }
	        })
	        return avalon.param(json, false) // 名值键值对序列化,数组元素名字前不加 []
	    }
	
	    var transports = avalon.ajaxTransports = {
	        xhr: {
	            //发送请求
	            request: function() {
	                var self = this;
	                var opts = this.options;
	                var transport = this.transport = new avalon.xhr;
	                transport.open(opts.type, opts.url, opts.async, opts.username, opts.password)
	                if (this.mimeType && transport.overrideMimeType) {
	                    transport.overrideMimeType(this.mimeType)
	                }
	                //IE6下，如果transport中没有withCredentials，直接设置会报错
	                if (opts.crossDomain && "withCredentials" in transport) {
	                    transport.withCredentials = true
	                }
	
	                /*
	                 * header 中设置 X-Requested-With 用来给后端做标示：
	                 * 这是一个 ajax 请求。
	                 *
	                 * 在 Chrome、Firefox 3.5+ 和 Safari 4+ 下，
	                 * 在进行跨域请求时设置自定义 header，会触发 preflighted requests，
	                 * 会预先发送 method 为 OPTIONS 的请求。
	                 *
	                 * 于是，如果跨域，禁用此功能。
	                 */
	                if (!opts.crossDomain) {
	                    this.requestHeaders["X-Requested-With"] = "XMLHttpRequest"
	                }
	
	                for (var i in this.requestHeaders) {
	                    transport.setRequestHeader(i, this.requestHeaders[i] + "")
	                }
	
	                /*
	                 * progress
	                 */
	                if (opts.progressCallback) {
	                    // 判断是否 ie6-9
	                    var isOldIE = document.all && !window.atob;
	                    if (!isOldIE) {
	                        transport.upload.onprogress = opts.progressCallback
	                    }
	                }
	
	                var dataType = opts.dataType
	                if ("responseType" in transport && /^(blob|arraybuffer|text)$/.test(dataType)) {
	                    transport.responseType = dataType
	                    this.useResponseType = true
	                }
	                //必须要支持 FormData 和 file.fileList 的浏览器 才能用 xhr 发送
	                //标准规定的 multipart/form-data 发送必须用 utf-8 格式， 记得 ie 会受到 document.charset 的影响
	                transport.send(opts.hasContent && (this.formdata || this.querystring) || null)
	                //在同步模式中,IE6,7可能会直接从缓存中读取数据而不会发出请求,因此我们需要手动发出请求
	
	                if (!opts.async || transport.readyState === 4) {
	                    this.respond()
	                } else {
	                    if (useOnload) { //如果支持onerror, onload新API
	                        transport.onload = transport.onerror = function(e) {
	                            this.readyState = 4 //IE9+
	                            this.status = e.type === "load" ? 200 : 500
	                            self.respond()
	                        }
	                    } else {
	                        transport.onreadystatechange = function() {
	                            self.respond()
	                        }
	                    }
	                }
	            },
	            //用于获取原始的responseXMLresponseText 修正status statusText
	            //第二个参数为1时中止清求
	            respond: function(event, forceAbort) {
	                var transport = this.transport
	                if (!transport) {
	                    return
	                }
	                // by zilong：避免abort后还继续派发onerror等事件
	                if (forceAbort && this.timeoutID) {
	                    clearTimeout(this.timeoutID);
	                    delete this.timeoutID
	                }
	                try {
	                    var completed = transport.readyState === 4
	                    if (forceAbort || completed) {
	                        transport.onreadystatechange = avalon.noop
	                        if (useOnload) { //IE6下对XHR对象设置onerror属性可能报错
	                            transport.onerror = transport.onload = null
	                        }
	                        if (forceAbort) {
	                            if (!completed && typeof transport.abort === "function") { // 完成以后 abort 不要调用
	                                transport.abort()
	                            }
	                        } else {
	                            var status = transport.status
	                            //设置responseText
	                            var text = transport.responseText
	
	                            this.responseText = typeof text === "string" ? text : void 0
	                            //设置responseXML
	                            try {
	                                //当responseXML为[Exception: DOMException]时，
	                                //访问它会抛“An attempt was made to use an object that is not, or is no longer, usable”异常
	                                var xml = transport.responseXML
	                                this.responseXML = xml.documentElement
	                            } catch (e) {
	                            }
	                            //设置response
	                            if (this.useResponseType) {
	                                this.response = transport.response
	                            }
	                            //设置responseHeadersString
	                            this.responseHeadersString = transport.getAllResponseHeaders()
	
	                            try { //火狐在跨城请求时访问statusText值会抛出异常
	                                var statusText = transport.statusText
	                            } catch (e) {
	                            this.error = e
	                            statusText = "firefoxAccessError"
	                            }
	                            //用于处理特殊情况,如果是一个本地请求,只要我们能获取数据就假当它是成功的
	                            if (!status && isLocal && !this.options.crossDomain) {
	                                status = this.responseText ? 200 : 404
	                            //IE有时会把204当作为1223
	                            } else if (status === 1223) {
	                                status = 204
	                            }
	                            this.dispatch(status, statusText)
	                        }
	                    }
	                } catch (err) {
	                // 如果网络问题时访问XHR的属性，在FF会抛异常
	                // http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
	                if (!forceAbort) {
	                this.dispatch(500, err)
	                }
	                }
	            }
	        },
	        jsonp: {
	            preproccess: function() {
	                var opts = this.options;
	                var name = this.jsonpCallback = opts.jsonpCallback || "avalon.jsonp" + setTimeout("1")
	                if (rjsonp.test(opts.url)) {
	                    opts.url = opts.url.replace(rjsonp, "$1" + name)
	                } else {
	                    opts.url = opts.url + (rquery.test(opts.url) ? "&" : "?") + opts.jsonp + "=" + name
	                }
	                //将后台返回的json保存在惰性函数中
	                if (name.startsWith('avalon.')) {
	                    name = name.replace(/avalon\./, '')
	                    avalon[name] = function(json) {
	                        avalon[name] = json
	                    }
	                } else {
	                    window[name] = function(json) {
	                        window[name] = json
	                    }
	                }
	                return "script"
	            }
	        },
	        script: {
	            request: function() {
	                var opts = this.options;
	                var node = this.transport = DOC.createElement("script")
	                if (opts.charset) {
	                    node.charset = opts.charset
	                }
	                var self = this;
	                node.onerror = node[useOnload ? "onload" : "onreadystatechange"] = function() {
	                    self.respond()
	                };
	                node.src = opts.url
	                head.insertBefore(node, head.firstChild)
	            },
	            respond: function(event, forceAbort) {
	                var node = this.transport
	                if (!node) {
	                    return
	                }
	                // by zilong：避免abort后还继续派发onerror等事件
	                if (forceAbort && this.timeoutID) {
	                    clearTimeout(this.timeoutID);
	                    delete this.timeoutID
	                }
	                var execute = /loaded|complete|undefined/i.test(node.readyState)
	                if (forceAbort || execute) {
	                    node.onerror = node.onload = node.onreadystatechange = null
	                    var parent = node.parentNode;
	                    if (parent) {
	                        parent.removeChild(node)
	                    }
	                    if (!forceAbort) {
	                        var args;
	                        if (this.jsonpCallback) {
	                            var jsonpCallback = this.jsonpCallback.startsWith('avalon.') ? avalon[this.jsonpCallback.replace(/avalon\./, '')] : window[this.jsonpCallback]
	                            args = typeof jsonpCallback === "function" ? [500, "error"] : [200, "success"]
	                        } else {
	                            args = [200, "success"]
	                        }
	
	                        this.dispatch.apply(this, args)
	                    }
	                }
	            }
	        },
	        upload: {
	            preproccess: function() {
	                var opts = this.options, formdata
	                if (typeof opts.form.append === "function") { //简单判断opts.form是否为FormData
	                    formdata = opts.form;
	                    opts.contentType = '';
	                } else {
	                    formdata = new FormData(opts.form) //将二进制什么一下子打包到formdata
	                }
	                avalon.each(opts.data, function(key, val) {
	                    formdata.append(key, val) //添加客外数据
	                })
	                this.formdata = formdata
	            }
	        }
	    }
	
	
	    avalon.mix(transports.jsonp, transports.script)
	    avalon.mix(transports.upload, transports.xhr)
	
	    if (!window.FormData) {
	        var str = 'Function BinaryToArray(binary)\r\n\
	                 Dim oDic\r\n\
	                 Set oDic = CreateObject("scripting.dictionary")\r\n\
	                 length = LenB(binary) - 1\r\n\
	                 For i = 1 To length\r\n\
	                     oDic.add i, AscB(MidB(binary, i, 1))\r\n\
	                 Next\r\n\
	                 BinaryToArray = oDic.Items\r\n\
	              End Function'
	        execScript(str, "VBScript");
	        avalon.fixAjax = function() {
	            avalon.ajaxConverters.arraybuffer = function() {
	                var body = this.tranport && this.tranport.responseBody
	                if (body) {
	                    return new VBArray(BinaryToArray(body)).toArray();
	                }
	            };
	            function createIframe(ID) {
	                var iframe = avalon.parseHTML("<iframe " + " id='" + ID + "'" +
	                    " name='" + ID + "'" + " style='position:absolute;left:-9999px;top:-9999px;'/>").firstChild;
	                return (DOC.body || DOC.documentElement).insertBefore(iframe, null);
	            }
	            function addDataToForm(form, data) {
	                var ret = [],
	                    d, isArray, vs, i, e;
	                for (d in data) {
	                    isArray = Array.isArray(data[d]);
	                    vs = isArray ? data[d] : [data[d]];
	                    // 数组和原生一样对待，创建多个同名输入域
	                    for (i = 0; i < vs.length; i++) {
	                        e = DOC.createElement("input");
	                        e.type = 'hidden';
	                        e.name = d;
	                        e.value = vs[i];
	                        form.appendChild(e);
	                        ret.push(e);
	                    }
	                }
	                return ret;
	            }
	            //https://github.com/codenothing/Pure-Javascript-Upload/blob/master/src/upload.js
	            avalon.ajaxTransports.upload = {
	                request: function() {
	                    var self = this;
	                    var opts = this.options;
	                    var ID = "iframe-upload-" + this.uniqueID;
	                    var form = opts.form;
	                    var iframe = this.transport = createIframe(ID);
	                    //form.enctype的值
	                    //1:application/x-www-form-urlencoded   在发送前编码所有字符（默认）
	                    //2:multipart/form-data 不对字符编码。在使用包含文件上传控件的表单时，必须使用该值。
	                    //3:text/plain  空格转换为 "+" 加号，但不对特殊字符编码。
	                    var backups = {
	                        target: form.target || "",
	                        action: form.action || "",
	                        enctype: form.enctype,
	                        method: form.method
	                    };
	                    var fields = opts.data ? addDataToForm(form, opts.data) : [];
	                    //必须指定method与enctype，要不在FF报错
	                    //表单包含文件域时，如果缺少 method=POST 以及 enctype=multipart/form-data，
	                    // 设置target到隐藏iframe，避免整页刷新
	                    form.target = ID;
	                    form.action = opts.url;
	                    form.method = "POST";
	                    form.enctype = "multipart/form-data";
	                    this.uploadcallback = avalon.bind(iframe, "load", function(event) {
	                        self.respond(event);
	                    });
	                    form.submit();
	                    //还原form的属性
	                    for (var i in backups) {
	                        form[i] = backups[i];
	                    }
	                    //移除之前动态添加的节点
	                    fields.forEach(function(input) {
	                        form.removeChild(input);
	                    });
	                },
	                respond: function(event) {
	                    var node = this.transport, child
	                    // 防止重复调用,成功后 abort
	                    if (!node) {
	                        return;
	                    }
	                    if (event && event.type === "load") {
	                        var doc = node.contentWindow.document;
	                        this.responseXML = doc;
	                        if (doc.body) { //如果存在body属性,说明不是返回XML
	                            this.responseText = doc.body.innerHTML;
	                            //当MIME为'application/javascript' 'text/javascript",浏览器会把内容放到一个PRE标签中
	                            if ((child = doc.body.firstChild) && child.nodeName.toUpperCase() === 'PRE' && child.firstChild) {
	                                this.responseText = child.firstChild.nodeValue;
	                            }
	                        }
	                        this.dispatch(200, "success");
	                    }
	                    this.uploadcallback = avalon.unbind(node, "load", this.uploadcallback);
	                    delete this.uploadcallback;
	                    setTimeout(function() { // Fix busy state in FF3
	                        node.parentNode.removeChild(node);
	                    });
	                }
	            };
	            delete avalon.fixAjax;
	        };
	        avalon.fixAjax()
	    }
	    return avalon
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	/**
	 * 
	 2011.8.31
	 将会传送器的abort方法上传到avalon.XHR.abort去处理
	 修复serializeArray的bug
	 对XMLHttpRequest.abort进行try...catch
	 2012.3.31 v2 大重构,支持XMLHttpRequest Level2
	 2013.4.8 v3 大重构 支持二进制上传与下载
	 http://www.cnblogs.com/heyuquan/archive/2013/05/13/3076465.html
	 2014.12.25  v4 大重构 
	 2015.3.2   去掉mmPromise
	 2015.3.13  使用加强版mmPromise
	 2015.3.17  增加 xhr 的 onprogress 回调
	 2015.12.10 处理全局对象BUG               
	 */


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (avalon) {
	//chrome36的原生Promise还多了一个defer()静态方法，允许不通过传参就能生成Promise实例，
	//另还多了一个chain(onSuccess, onFail)原型方法，意义不明
	//目前，firefox24, opera19也支持原生Promise(chrome32就支持了，但需要打开开关，自36起直接可用)
	//本模块提供的Promise完整实现ECMA262v6 的Promise规范
	//2015.3.12 支持async属性
	    function ok(val) {
	        return val
	    }
	    function ng(e) {
	        throw e
	    }
	
	    function done(onSuccess) {//添加成功回调
	        return this.then(onSuccess, ng)
	    }
	    function fail(onFail) {//添加出错回调
	        return this.then(ok, onFail)
	    }
	    function defer() {
	        var ret = {};
	        ret.promise = new this(function (resolve, reject) {
	            ret.resolve = resolve
	            ret.reject = reject
	        });
	        return ret
	    }
	    var msPromise = function (executor) {
	        this._callbacks = []
	        var me = this
	        if (typeof this !== "object")
	            throw new TypeError("Promises must be constructed via new")
	        if (typeof executor !== "function")
	            throw new TypeError("not a function")
	
	        executor(function (value) {
	            _resolve(me, value)
	        }, function (reason) {
	            _reject(me, reason)
	        })
	    }
	    function fireCallbacks(promise, fn) {
	        if (typeof promise.async === "boolean") {
	            var isAsync = promise.async
	        } else {
	            isAsync = promise.async = true
	        }
	        if (isAsync) {
	            window.setTimeout(fn, 0)
	        } else {
	            fn()
	        }
	    }
	//返回一个已经处于`resolved`状态的Promise对象
	    msPromise.resolve = function (value) {
	        return new msPromise(function (resolve) {
	            resolve(value)
	        })
	    }
	//返回一个已经处于`rejected`状态的Promise对象
	    msPromise.reject = function (reason) {
	        return new msPromise(function (resolve, reject) {
	            reject(reason)
	        })
	    }
	
	    msPromise.prototype = {
	//一个Promise对象一共有3个状态：
	//- `pending`：还处在等待状态，并没有明确最终结果
	//- `resolved`：任务已经完成，处在成功状态
	//- `rejected`：任务已经完成，处在失败状态
	        constructor: msPromise,
	        _state: "pending",
	        _fired: false, //判定是否已经被触发
	        _fire: function (onSuccess, onFail) {
	            if (this._state === "rejected") {
	                if (typeof onFail === "function") {
	                    onFail(this._value)
	                } else {
	                    throw this._value
	                }
	            } else {
	                if (typeof onSuccess === "function") {
	                    onSuccess(this._value)
	                }
	            }
	        },
	        _then: function (onSuccess, onFail) {
	            if (this._fired) {//在已有Promise上添加回调
	                var me = this
	                fireCallbacks(me, function () {
	                    me._fire(onSuccess, onFail)
	                });
	            } else {
	                this._callbacks.push({onSuccess: onSuccess, onFail: onFail})
	            }
	        },
	        then: function (onSuccess, onFail) {
	            onSuccess = typeof onSuccess === "function" ? onSuccess : ok
	            onFail = typeof onFail === "function" ? onFail : ng
	            var me = this//在新的Promise上添加回调
	            var nextPromise = new msPromise(function (resolve, reject) {
	                me._then(function (value) {
	                    try {
	                        value = onSuccess(value)
	                    } catch (e) {
	                        // https://promisesaplus.com/#point-55
	                        reject(e)
	                        return
	                    }
	                    resolve(value)
	                }, function (value) {
	                    try {
	                        value = onFail(value)
	                    } catch (e) {
	                        reject(e)
	                        return
	                    }
	                    resolve(value)
	                })
	            })
	            for (var i in me) {
	                if (!personal[i]) {
	                    nextPromise[i] = me[i]
	                }
	            }
	            return nextPromise
	        },
	        "done": done,
	        "catch": fail,
	        "fail": fail
	    }
	    var personal = {
	        _state: 1,
	        _fired: 1,
	        _value: 1,
	        _callbacks: 1
	    }
	    function _resolve(promise, value) {//触发成功回调
	        if (promise._state !== "pending")
	            return;
	        if (value && typeof value.then === "function") {
	//thenable对象使用then，Promise实例使用_then
	            var method = value instanceof msPromise ? "_then" : "then"
	            value[method](function (val) {
	                _transmit(promise, val, true)
	            }, function (reason) {
	                _transmit(promise, reason, false)
	            });
	        } else {
	            _transmit(promise, value, true);
	        }
	    }
	    function _reject(promise, value) {//触发失败回调
	        if (promise._state !== "pending")
	            return
	        _transmit(promise, value, false)
	    }
	//改变Promise的_fired值，并保持用户传参，触发所有回调
	    function _transmit(promise, value, isResolved) {
	        promise._fired = true;
	        promise._value = value;
	        promise._state = isResolved ? "fulfilled" : "rejected"
	        fireCallbacks(promise, function () {
	            promise._callbacks.forEach(function (data) {
	                promise._fire(data.onSuccess, data.onFail);
	            })
	        })
	    }
	    function _some(any, iterable) {
	        iterable = Array.isArray(iterable) ? iterable : []
	        var n = 0, result = [], end
	        return new msPromise(function (resolve, reject) {
	            // 空数组直接resolve
	            if (!iterable.length)
	                resolve(result)
	            function loop(a, index) {
	                a.then(function (ret) {
	                    if (!end) {
	                        result[index] = ret//保证回调的顺序
	                        n++
	                        if (any || n >= iterable.length) {
	                            resolve(any ? ret : result)
	                            end = true
	                        }
	                    }
	                }, function (e) {
	                    end = true
	                    reject(e)
	                })
	            }
	            for (var i = 0, l = iterable.length; i < l; i++) {
	                loop(iterable[i], i)
	            }
	        })
	    }
	
	    msPromise.all = function (iterable) {
	        return _some(false, iterable)
	    }
	    msPromise.race = function (iterable) {
	        return _some(true, iterable)
	    }
	    msPromise.defer = defer
	
	
	
	    avalon.Promise = msPromise
	    var nativePromise = window.Promise
	    if (/native code/.test(nativePromise)) {
	        nativePromise.prototype.done = done
	        nativePromise.prototype.fail = fail
	        if (!nativePromise.defer) { //chrome实现的私有方法
	            nativePromise.defer = defer
	        }
	    }
	    return window.Promise = nativePromise || msPromise
	
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	//https://github.com/ecomfe/er/blob/master/src/Deferred.js
	//http://jser.info/post/77696682011/es6-promises


/***/ },
/* 5 */
/***/ function(module, exports) {

	avalon.define({
	    $id: "editor",
	    tpl: ''
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(7);
	
	avalon.templateCache['header'] = __webpack_require__(8);
	avalon.vmodels.header.tpl = "header";


/***/ },
/* 7 */
/***/ function(module, exports) {

	avalon.define({
	    $id: "header",
	    tpl: "",
	});

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "<ul class=\"header-holder list-inline fl\">\n\t<li class=\"go-to-dashboard\"><a href=\"./dashboard\"><span class=\"glyphicon glyphicon-home\"></span></a></li>\n\t<li><a>创建一个A/B测试</a></li>\n</ul>\n<div class=\"btn-group btn-group-sm version-switch\" role=\"group\" aria-label=\"...\">\n\t\t<button type=\"button\" class=\"btn btn-default\">桌面 <span class=\"glyphicon glyphicon-blackboard\"></span></button>\n\t\t<button type=\"button\" class=\"btn btn-default active\">移动 <span class=\"glyphicon glyphicon-phone\"></span></button>\n\t</div>\n\n<ul class=\"header-holder list-inline fr\">\n\t<li><span class=\"glyphicon glyphicon-question-sign\"></span></li>\n\t<li><span class=\"glyphicon glyphicon-share-alt flipx\"></span></li>\n\t<li><span class=\"glyphicon glyphicon-share-alt\"></span></li>\n\t<li>设置 <span class=\"glyphicon glyphicon-cog\"></span></li>\n\t<li>保存 <span class=\"glyphicon glyphicon-floppy-disk\"></span></li>\n\t<li>预览 <span class=\"glyphicon glyphicon-eye-open\"></span></li>\n\t<li class=\"publish\">发布 <span class=\"glyphicon glyphicon-send\"></span></li>\n</ul>"

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(10);
	
	avalon.templateCache['toolbar'] = __webpack_require__(11);
	avalon.vmodels.toolbar.tpl = "toolbar";


/***/ },
/* 10 */
/***/ function(module, exports) {

	avalon.define({
	    $id: "toolbar",
	    tpl: "",
	    tools:[
	    	{
	    		name:'版块',
	    		style:'modal-window',
	    		action:function(){
	    			avalon.vmodels.page.add_section();
	    		}
	    	},
	    	{
	    		name:'图片',
	    		style:'picture',
	    		action:function(){
	                avalon.vmodels.page.add_element("image");
	    		}
	    	},
	    	{
	    		name:'文字',
	    		style:'font',
	    		action:function(){
	                avalon.vmodels.page.add_element("text");
	    		}
	    	},
	    	{
	    		name:'按钮',
	    		style:'expand',
	    		action:function(){
	                avalon.vmodels.page.add_element("button");
	    		}
	    	},
	    	{
	    		name:'视频',
	    		style:'facetime-video',
	    		action:function(){
	                avalon.vmodels.page.add_element("video");
	    		}
	    	},
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
	    		action:function(){
	                avalon.vmodels.page.add_element("form");
	    		}
	    	}
	    ],
	});

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = "<div class=\"toolbar-header\">组件</div>\n<div class=\"toolbar-body\">\n\t<div ms-repeat-el=\"tools\" class=\"tool\" ms-click=\"el.action\">\n\t\t<span class=\"glyphicon\" ms-class=\"glyphicon-{{el.style}}\"></span>\n\t\t<div class=\"tool-name\">{{el.name}}</div>\n\t</div>\n</div>"

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(13);
	__webpack_require__(15);
	__webpack_require__(16);
	
	avalon.templateCache['workspace'] = __webpack_require__(17);
	avalon.vmodels.workspace.tpl = "workspace";


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(14)], __WEBPACK_AMD_DEFINE_RESULT__ = function(avalon) {
	
	
	    var draggable = avalon.bindingHandlers.draggable;
	    var resizable = avalon.bindingHandlers.resizable = function(data, vmodels) {
	        var args = data.value.match(avalon.rword) || ["$", "resizable"]
	        var ID = args[0].trim(), opts = args[1], model, vmOptions;
	        if (ID && ID != "$") {
	            model = avalon.vmodels[ID]//如果指定了此VM的ID
	            if (!model) {
	                return
	            }
	        }
	
	        if (!model) {//如果使用$或绑定值为空，那么就默认取最近一个VM，没有拉倒
	            model = vmodels.length ? vmodels[0] : null
	        }
	        var fnObj = model || {}
	        if (model && typeof model[opts] === "object") {//如果指定了配置对象，并且有VM
	            vmOptions = model[opts]
	            if (vmOptions.$model) {
	                vmOptions = vmOptions.$model
	            }
	            fnObj = vmOptions
	        }
	        var element = data.element
	        element.removeAttribute("ms-resizable")
	        var options = avalon.mix({}, resizable.defaults, vmOptions || {}, avalon.getWidgetData(element, "resizable"));
	        //修正drag,stop为函数
	        "stop,start,resize,drag".replace(avalon.rword, function(name) {
	            var method = options[name]
	            if (typeof method === "string") {
	                if (typeof fnObj[method] === "function") {
	                    options[name] = fnObj[method]
	                } else {
	                    options[name] = avalon.noop
	                }
	            }
	        })
	        options.handles = options.handles.match(avalon.rword) || ["all"];
	        options._aspectRatio = typeof options.aspectRatio === "number"
	
	        var target = avalon(element)
	        target.bind("mousemove", function(e) {
	            if (options.started)
	                return;
	
	            var dir = getDirection(e, target, options)
	            options._cursor = target.css("cursor"); //保存原来的光标样式
	            if (dir === "") {
	                target.css("cursor", "default");
	            } else {
	                target.css("cursor", dir + "-resize");
	            }
	        })
	
	        target.bind("mouseleave", function(e) {
	            target.css("cursor", options._cursor); //还原光标样式
	            delete options._cursor
	        })
	        var _drag = options.drag || avalon.noop
	        var body = document.body
	        //在dragstart回调中,我们通过draggable已经设置了
	        //data.startPageX = event.pageX;    data.startPageY = event.pageY;
	        //data.originalX = offset.left; data.originalY = offset.top;
	        options.beforeStart = function(event, data) {
	            var target = data.$element;
	            if(_drag === avalon.noop){
	                data.dragX = data.dragY = false
	            }
	            var dir = getDirection(event, target, data);
	            if (dir === "")
	                return;
	            avalon.mix(data, {
	                dir: dir,
	                startResizeLeft: getCssValue(target, "left"),
	                startResizeTop: getCssValue(target, "top"),
	                startResizeWidth: target.width(),
	                startResizeHeight: target.height()
	            })
	            //开始缩放时的位置大小
	            "startResizeLeft,startResizeTop,startResizeWidth,startResizeHeight".replace(avalon.rword, function(word) {
	                data[word.replace("startR", "r")] = data[word];
	            })
	            //等比例缩放
	            data.aspectRatio = data._aspectRatio ? data.aspectRatio : ((data.startResizeWidth / data.startResizeHeight) || 1);
	            event.type = "resizestart";
	            //data.start.call(target[0], event, data); //触发用户回调
	
	            if(dir){
	                data.dragX = data.dragY = false
	            }
	            avalon(body).css('cursor', dir + '-resize');
	        }
	        options.drag = function(event, data) {
	            if (data.dir) {
	                refresh(event, data.$element, data);
	                event.type = "resize";
	                data.resize.call(data.element, event, data); //触发用户回调
	            }else if ("_cursor" in options) {
	                _drag.call(data.element, event, data); //触发用户回调
	            }
	        }
	        options.beforeStop = function(event, data) {
	            if (data.dir) {
	                var target = data.$element;
	                refresh(event, target, data);
	                delete data.dir;
	                event.type = "resizeend";
	                //   data.stop.call(target[0], event, data); //触发用户回调
	                avalon(body).css("cursor", "default");
	            }
	        }
	        data.value = ""
	        data.draggable = options
	
	        draggable(data, vmodels)
	
	    }
	    resizable.defaults = {
	        handles: "n,e,s,w,ne,se,sw,nw",
	        maxHeight: 10000,
	        maxWidth: 10000,
	        minHeight: 10,
	        minWidth: 10,
	        cursor: false,
	        edge: 5,
	        start: avalon.noop,
	        resize: avalon.noop,
	        stop: avalon.noop
	    }
	    /**
	     * 用于修正拖动元素靠边边缘的区域的鼠标样式
	     * @param {Event} e
	     * @param {Mass} target
	     * @param {Object} data 经过处理的配置对象
	     */
	
	    function getDirection(e, target, data) {
	        var dir = "";
	        var offset = target.offset();
	        var width = target[0].offsetWidth;
	        var height = target[0].offsetHeight;
	        var edge = data.edge;
	        if (e.pageY > offset.top && e.pageY < offset.top + edge) {
	            dir += "n";
	        } else if (e.pageY < offset.top + height && e.pageY > offset.top + height - edge) {
	            dir += "s";
	        }
	        if (e.pageX > offset.left && e.pageX < offset.left + edge) {
	            dir += "w";
	        } else if (e.pageX < offset.left + width && e.pageX > offset.left + width - edge) {
	            dir += "e";
	        }
	        for (var i = 0, handle; handle = data.handles[i++]; ) {
	            if (handle === "all" || handle === dir) {
	                return dir;
	            }
	        }
	        return "";
	    }
	
	    function getCssValue(el, css) { //对样式值进行处理,强制转数值
	        var val = parseInt(el.css(css), 10);
	        if (isNaN(val)) {
	            return 0;
	        } else {
	            return val;
	        }
	    }
	
	    function refresh(event, target, data) { //刷新缩放元素
	        var b = data
	        if (data._aspectRatio || event.shiftKey) {
	            var aspest = true,
	                    pMinWidth = b.minHeight * data.aspectRatio,
	                    pMinHeight = b.minWidth / data.aspectRatio,
	                    pMaxWidth = b.maxHeight * data.aspectRatio,
	                    pMaxHeight = b.maxWidth / data.aspectRatio;
	
	            if (pMinWidth > b.minWidth) {
	                b.minWidth = pMinWidth;
	            }
	            if (pMinHeight > b.minHeight) {
	                b.minHeight = pMinHeight;
	            }
	            if (pMaxWidth < b.maxWidth) {
	                b.maxWidth = pMaxWidth;
	            }
	            if (pMaxHeight < b.maxHeight) {
	                b.maxHeight = pMaxHeight;
	            }
	        }
	
	
	        if (data.dir.indexOf("e") !== -1) {
	            var width = data.startResizeWidth + event.pageX - data.startPageX;
	            width = Math.min(Math.max(width, b.minWidth), b.maxWidth);
	            data.resizeWidth = width;
	            if (aspest) {
	                data.resizeHeight = data.startResizeHeight + (event.pageX - data.startPageX) / data.aspectRatio;
	            }
	        }
	        if (data.dir.indexOf("s") !== -1) {
	            var height = data.startResizeHeight + event.pageY - data.startPageY;
	            height = Math.min(Math.max(height, b.minHeight), b.maxHeight);
	            data.resizeHeight = height;
	            if (aspest) {
	                data.resizeWidth = data.startResizeWidth + (event.pageY - data.startPageY) * data.aspectRatio;
	            }
	        }
	        if (data.dir.indexOf("w") !== -1) {
	            data.resizeWidth = data.startResizeWidth - event.pageX + data.startPageX;
	            if (data.resizeWidth >= b.minWidth && data.resizeWidth <= b.maxWidth) {
	                data.resizeLeft = data.startResizeLeft + event.pageX - data.startPageX;
	                if (aspest) {
	                    data.resizeHeight = data.startResizeHeight - (event.pageX - data.startPageX) / data.aspectRatio;
	
	                    if(data.dir.indexOf("s") === -1) {
	                        data.resizeTop = data.startResizeTop + (event.pageX - data.startPageX) / data.aspectRatio;
	                    }
	                }
	            }
	        }
	        if (data.dir.indexOf("n") !== -1) {
	            data.resizeHeight = data.startResizeHeight - event.pageY + data.startPageY;
	            if (data.resizeHeight >= b.minHeight && data.resizeHeight <= b.maxHeight) {
	                data.resizeTop = data.startResizeTop + event.pageY - data.startPageY;
	                if (aspest) {
	                    data.resizeWidth = data.startResizeWidth - (event.pageY - data.startPageY) * data.aspectRatio;
	
	                    if(data.dir.indexOf("e") === -1){
	                        data.resizeLeft = data.startResizeLeft + (event.pageY - data.startPageY) * data.aspectRatio;
	                    }
	                }
	            }
	        }
	
	        var obj = {
	            left: data.resizeLeft,
	            top: data.resizeTop,
	            width: data.resizeWidth,
	            height: data.resizeHeight
	        }
	        for (var i in obj) {
	            target.css(i, obj[i])
	        }
	    }
	    return avalon
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(avalon) {
	    var defaults = {
	        ghosting: false,
	        //是否影子拖动，动态生成一个元素，拖动此元素，当拖动结束时，让原元素到达此元素的位置上,
	        delay: 0,
	        axis: 'xy',
	        started: true,
	        start: avalon.noop,
	        beforeStart: avalon.noop,
	        drag: avalon.noop,
	        beforeStop: avalon.noop,
	        stop: avalon.noop,
	        scrollPlugin: true,
	        scrollSensitivity: 20,
	        scrollSpeed: 20
	    };
	
	    var styleEl = document.getElementById('avalonStyle');
	    //拖动时禁止文字被选中，禁止图片被拖动
	    var cssText = '.ui-helper-global-drag *{ -webkit-touch-callout: none;' + '-khtml-user-select: none;' + '-moz-user-select: none;' + '-ms-user-select: none;' + 'user-select: none;}' + '.ui-helper-global-drag img{-webkit-user-drag:none; ' + 'pointer-events:none;}';
	    try {
	        styleEl.innerHTML += cssText;
	    } catch (e) {
	        styleEl.styleSheet.cssText += cssText;
	    }
	    var body;
	    var ua = navigator.userAgent;
	    var isAndroid = /Android/i.test(ua);
	    var isBlackBerry = /BlackBerry/i.test(ua);
	    var isWindowPhone = /IEMobile/i.test(ua);
	    var isIOS = /iPhone|iPad|iPod/i.test(ua);
	    var isMobile = isAndroid || isBlackBerry || isWindowPhone || isIOS;
	    if (!isMobile) {
	        var dragstart = 'mousedown';
	        var drag = 'mousemove';
	        var dragstop = 'mouseup';
	    } else {
	        dragstart = 'touchstart';
	        drag = 'touchmove';
	        dragstop = 'touchend';
	    }
	
	    function getOptions(opts, vmodels) {
	        var i = 0, l = vmodels.length;
	        for (; i < l; i++) {
	            if (typeof vmodels[i][opts] === 'object') {
	                return vmodels[i];
	            }
	        }
	        return vmodels[0];
	    }
	
	    var draggable = avalon.bindingHandlers.draggable = function (data, vmodels) {
	            var args = data.value.match(avalon.rword) || [];
	            var ID = args[0] || '$';
	            var opts = args[1] || 'draggable';
	            var model, vmOptions, optionsData;
	            if (ID != '$') {
	                model = avalon.vmodels[ID];
	                //如果指定了此VM的ID
	                if (!model) {
	                    return;
	                }
	            }
	            data.element.removeAttribute('ms-draggable');
	
	            if (!model) {
	                //如果使用$或绑定值为空，那么就默认取最近一个VM，没有拉倒
	                // model = vmodels.length ? vmodels[0] : null;
	                model = vmodels.length ? getOptions(opts, vmodels) : null;
	            }
	            var fnObj = model || {};
	            if (model && typeof model[opts] === 'object') {
	                //如果指定了配置对象，并且有VM
	                vmOptions = model[opts];
	                if (vmOptions.$model) {
	                    vmOptions = vmOptions.$model;
	                }
	                fnObj = vmOptions;
	            }
	            var element = data.element;
	            var $element = avalon(element);
	            var options = avalon.mix({}, defaults, vmOptions || {}, data[opts] || {}, avalon.getWidgetData(element, 'draggable'));
	            //修正drag,stop为函数
	            'drag,stop,start,beforeStart,beforeStop'.replace(avalon.rword, function (name) {
	                var method = options[name];
	                if (typeof method === 'string') {
	                    if (typeof fnObj[method] === 'function') {
	                        options[name] = fnObj[method];
	                    }
	                }
	            });
	            if (options.axis !== '' && !/^(x|y|xy)$/.test(options.axis)) {
	                options.axis = 'xy';
	            }
	            body = document.body;
	            //因为到这里时，肯定已经domReady
	            $element.bind(dragstart, function (e) {
	                stopPropagation(e)
	
	                var data = avalon.mix({}, options, {
	                        element: element,
	                        $element: $element,
	                        pageX: getPosition(e, 'X'),
	                        //相对于页面的坐标, 会改动
	                        pageY: getPosition(e, 'Y'),
	                        //相对于页面的坐标，会改动
	                        marginLeft: parseFloat($element.css('marginLeft')) || 0,
	                        marginTop: parseFloat($element.css('marginTop')) || 0
	                    });
	                data.startPageX = data.pageX;
	                //一次拖放只赋值一次
	                data.startPageY = data.pageY;
	                //一次拖放只赋值一次
	                options.axis.replace(/./g, function (a) {
	                    data['drag' + a.toUpperCase()] = true;
	                });
	                if (!data.dragX && !data.dragY) {
	                    data.started = false;
	                }
	                //在处理手柄拖动前做些事情
	                if (typeof options.beforeStart === 'function') {
	                    options.beforeStart.call(data.element, e, data);
	                }
	                if (data.handle && fnObj) {
	                    // 实现手柄拖动
	                    var handle = fnObj[data.handle];
	                    handle = typeof handle === 'function' ? handle : data.handle;
	                    if (typeof handle === 'function') {
	                        var checked = handle.call(element, e, data);
	                        //要求返回一节点
	                        if (checked && checked.nodeType === 1) {
	                            if (!element.contains(checked)) {
	                                return;    // 不能返回 false，这会阻止文本被选择
	                            }
	                        } else {
	                            return;
	                        }
	                    }
	                }
	                fixUserSelect();
	                var position = $element.css('position');
	                //如果原元素没有被定位
	                if (!/^(?:r|a|f)/.test(position)) {
	                    element.style.position = 'relative';
	                    element.style.top = '0px';
	                    element.style.left = '0px';
	                }
	                if (options.delay && isFinite(options.delay)) {
	                    data.started = false;
	                    setTimeout(function () {
	                        data.started = true;
	                    }, options.delay);
	                }
	                var startOffset = $element.offset();
	                if (options.ghosting) {
	                    var clone = element.cloneNode(true);
	                    avalon(clone).css('opacity', 0.7).width(element.offsetWidth).height(element.offsetHeight);
	                    data.clone = clone;
	                    if (position !== 'fixed') {
	                        clone.style.position = 'absolute';
	                        clone.style.top = startOffset.top - data.marginTop + 'px';
	                        clone.style.left = startOffset.left - data.marginLeft + 'px';
	                    }
	                    body.appendChild(clone);
	                }
	                var target = avalon(data.clone || data.element);
	                //拖动前相对于offsetParent的坐标
	                data.startLeft = parseFloat(target.css('left'));
	                data.startTop = parseFloat(target.css('top'));
	                //拖动后相对于offsetParent的坐标
	                //如果是影子拖动，代理元素是绝对定位时，它与原元素的top, left是不一致的，因此当结束拖放时，不能直接将改变量赋给原元素
	                data.endLeft = parseFloat($element.css('left')) - data.startLeft;
	                data.endTop = parseFloat($element.css('top')) - data.startTop;
	                data.clickX = data.pageX - startOffset.left;
	                //鼠标点击的位置与目标元素左上角的距离
	                data.clickY = data.pageY - startOffset.top;
	                //鼠标点击的位置与目标元素左上角的距离
	                setContainment(options, data);
	
	                // 处理containment滚动
	                if(data.originContainment === "parent"){
	                    var container = elem = data.element.parentNode
	                    data.scrollOffsetTop = avalon(container).offset().top
	                }
	
	                //修正containment
	                draggable.dragData = data;
	                //决定有东西在拖动
	                'start,drag,beforeStop,stop'.replace(avalon.rword, function (name) {
	                    //console.log(options[name])
	                    draggable[name] = [options[name]];
	                });
	                draggable.plugin.call('start', e, data);
	            });
	        };
	    var xy2prop = {
	            'X': 'Left',
	            'Y': 'Top'
	        };
	    //插件系统
	    draggable.dragData = {};
	    draggable.start = [];
	    draggable.drag = [];
	    draggable.stop = [];
	    draggable.beforeStop = [];
	    draggable.plugin = {
	        add: function (name, set) {
	            for (var i in set) {
	                var fn = set[i];
	                if (typeof fn === 'function' && Array.isArray(draggable[i])) {
	                    fn.isPlugin = true;
	                    fn.pluginName = name + 'Plugin';
	                    draggable[i].push(fn);
	                }
	            }
	        },
	        call: function (name, e, data) {
	            var array = draggable[name];
	            if (Array.isArray(array)) {
	                array.forEach(function (fn) {
	                    //用户回调总会执行，插件要看情况
	                    if (typeof fn.pluginName === 'undefined' ? true : data[fn.pluginName]) {
	                        fn.call(data.element, e, data);
	                    }
	                });
	            }
	            if (name === 'stop') {
	                for (var i in draggable) {
	                    array = draggable[i];
	                    if (Array.isArray(array)) {
	                        array.forEach(function (fn) {
	                            if (!fn.isPlugin) {
	                                // 用户回调都是一次性的，插件的方法永远放在列队中
	                                avalon.Array.remove(array, fn);
	                            }
	                        });
	                    }
	                }
	            }
	        }
	    };
	    //统一处理拖动的事件
	    var lockTime = new Date() - 0, minTime = document.querySelector ? 12 : 30;
	    avalon(document).bind(drag, function (e) {
	        stopPropagation(e)
	
	        var time = new Date() - lockTime;
	        if (time > minTime) {
	            //减少调用次数，防止卡死IE6-8
	            lockTime = time;
	            var data = draggable.dragData;
	            if (data.started === true) {
	                //fix touchmove bug;
	                //IE 在 img 上拖动时默认不能拖动（不触发 mousemove，mouseup 事件，mouseup 后接着触发 mousemove ...）
	                //防止 html5 draggable 元素的拖放默认行为 (选中文字拖放)
	                e.preventDefault();
	                //使用document.selection.empty()来清除选择，会导致捕获失败
	                var element = data.clone || data.element;
	                setPosition(e, element, data, 'X');
	                setPosition(e, element, data, 'Y');
	                draggable.plugin.call('drag', e, data);
	            }
	        }
	    });
	
	    //统一处理拖动结束的事件
	    avalon(document).bind(dragstop, function (e) {
	        stopPropagation(e)
	
	        var data = draggable.dragData;
	        if (data.started === true) {
	            restoreUserSelect();
	            var element = data.element;
	            draggable.plugin.call('beforeStop', e, data);
	            if (data.dragX) {
	                setPosition(e, element, data, 'X', true);
	            }
	            if (data.dragY) {
	                setPosition(e, element, data, 'Y', true);
	            }
	            if (data.clone) {
	                body.removeChild(data.clone);
	            }
	            draggable.plugin.call('stop', e, data);
	            draggable.dragData = {};
	        }
	    });
	    function getPosition(e, pos) {
	        var page = 'page' + pos;
	        return isMobile ? e.changedTouches[0][page] : e[page];
	    }
	    function setPosition(e, element, data, pos, end) {
	        var page = getPosition(e, pos);
	        if (data.containment) {
	            var min = pos === 'X' ? data.containment[0] : data.containment[1];
	            var max = pos === 'X' ? data.containment[2] : data.containment[3];
	            var check = page - (pos === 'X' ? data.clickX : data.clickY);
	            if (check < min) {
	                page += Math.abs(min - check);
	            } else if (check > max) {
	                page -= Math.abs(max - check);
	            }
	        }
	
	        // 处理containment滚动
	        if(data.originContainment === "parent" && pos === "Y"){
	            var container = elem = data.element.parentNode
	            page -= avalon(container).offset().top - data.scrollOffsetTop
	        }
	
	        data['page' + pos] = page;
	        //重设pageX, pageY
	        var Prop = xy2prop[pos];
	        var prop = Prop.toLowerCase();
	        var number = data['start' + Prop] + page - data['startPage' + pos] + (end ? data['end' + Prop] : 0);
	        data[prop] = number;
	        if (data['drag' + pos]) {
	            //保存top, left
	            element.style[prop] = number + 'px';
	        }
	    }
	    var rootElement = document.documentElement;
	    var fixUserSelect = function () {
	        avalon(rootElement).addClass('ui-helper-global-drag');
	    };
	    var restoreUserSelect = function () {
	        avalon(rootElement).removeClass('ui-helper-global-drag');
	    };
	    if (window.VBArray && !('msUserSelect' in rootElement.style)) {
	        var _ieSelectBack;
	        //fix IE6789
	        function returnFalse() {
	            var e = window.event || {};
	            e.returnValue = false;
	        }
	        fixUserSelect = function () {
	            _ieSelectBack = body.onselectstart;
	            body.onselectstart = returnFalse;
	        };
	        restoreUserSelect = function () {
	            body.onselectstart = _ieSelectBack;
	        };
	    }
	    function setContainment(o, data) {
	        if (!o.containment) {
	            if (Array.isArray(data.containment)) {
	                return;
	            }
	            data.containment = null;
	            return;
	        }
	        var elemWidth = data.$element.width();
	        var elemHeight = data.$element.height();
	        if (o.containment === 'window') {
	            var $window = avalon(window);
	            //左， 上， 右， 下
	            data.containment = [
	                $window.scrollLeft(),
	                $window.scrollTop(),
	                $window.scrollLeft() + $window.width() - data.marginLeft - elemWidth,
	                $window.scrollTop() + $window.height() - data.marginTop - elemHeight
	            ];
	            return;
	        }
	        if (o.containment === 'document') {
	            data.containment = [
	                0,
	                0,
	                avalon(document).width() - data.marginLeft,
	                avalon(document).height() - data.marginTop
	            ];
	            return;
	        }
	        if (Array.isArray(o.containment)) {
	            var a = o.containment;
	            data.containment = [
	                a[0],
	                a[1],
	                a[2] - elemWidth,
	                a[3] - elemHeight
	            ];
	            return;
	        }
	        if (o.containment === 'parent' || o.containment.charAt(0) === '#') {
	            var elem;
	            if (o.containment === 'parent') {
	                data.originContainment = 'parent'
	                elem = data.element.parentNode;
	            } else {
	                elem = document.getElementById(o.containment.slice(1));
	            }
	            if (elem) {
	                var $offset = avalon(elem).offset();
	                data.containment = [
	                    $offset.left + data.marginLeft,
	                    //如果元素设置了marginLeft，设置左边界时需要考虑它
	                    $offset.top + data.marginTop,
	                    $offset.left + elem.offsetWidth - data.marginLeft - elemWidth,
	                    $offset.top + elem.offsetHeight - data.marginTop - elemHeight
	                ];
	            }
	        }
	    }
	
	    function stopPropagation(event) {
	    	if (event.stopPropagation) {
	    		event.stopPropagation();
	    	} else if (event.cancelBubble !== undefined && event.cancelBubble !== true) {
	    		event.cancelBubble = true;
	    	}
	    }
	
	    return avalon
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(13)], __WEBPACK_AMD_DEFINE_RESULT__ = function(avalon){
	    //var draggable = avalon.bindingHandlers.draggable;
	    var resizable = avalon.bindingHandlers.resizable;
	    var pageitem = avalon.bindingHandlers.pageitem = function(data, vmodels) {
	        var element = data.element;
	        var target = avalon(data.element);
	        console.log(element.id);
	        target.bind("click",function(e){
	            target.css("outline","1px solid #ccc");
	        });
	        resizable(data,vmodels);
	    }
	    return avalon;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 16 */
/***/ function(module, exports) {

	avalon.define({
	    $id: "workspace",
	    tpl: "",
	});
	
	var page = avalon.define({
	    $id: "page",
	    
	    //页面板块，待Ajax加载进来
	    sections:[],
	    
	    //页面板块的resizable配置
	    $section_resizable:{
	        handles:"s",
	        minHeight:30,
	        edge:15,
	        stop:function(){
	            page['sections'][this.id]['style']['height'] = this.style.height;
	        }
	    },
	    
	    //鼠标移入板块时显示操作按钮，移出时隐藏
	    section_operation_toggle: function(section_id){
	        //console.log(page['sections'].first());
	    },
	
	    //添加页面板块
	    add_section: function(){
	        //temp = page.sections;
	        //console.log(temp);
	        page_data.push({
	            style:{"background":"#990","height":"100px"},
	            elements:{}
	        });
	        page.sections = page_data;
	    },
	
	    //添加页面元素
	    add_element: function(type, options){
	        page.sections = {
	            "bid":{
	                style:{"background":"#900","height":"500px"},
	            }
	        }
	        console.log(page.sections);
	    }
	});
	
	var page_data = [
	    {
	        style:{"background":"#900","height":"200px"},
	        elements:{
	            "bifsdc":{
	                type:"text",
	                content:"wdfsdf",
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
	        style:{"background-color":"red","height":"300px"},
	        elements:{
	
	        },
	    },
	
	    {
	        style:{"background-color":"red","height":"300px"},
	        elements:{
	
	        },
	    }
	];
	
	page.sections = page_data;
	


/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = "<div ms-controller=\"page\">\n\t<div ms-repeat-section=\"sections\" ms-mouseenter=\"section_operation_toggle($index)\" ms-mouseleave=\"section_operation_toggle($index)\" ms-attr-id=\"$index\" style=\"top:0px; border-bottom:1px dashed #ccc;\" ms-css-height=\"{{section.style.height}}\" ms-css-background=\"{{section.style.background}}\" ms-resizable=\"page,$section_resizable\" >\n\t\t<div class=\"editable-area\">\n\t\t\t{{section.style.height}}\n\t\t\t<div ms-repeat-el=\"section.elements\" ms-attr-id=\"$index+'-'+$key\" class=\"page-item\" ms-pageitem=\"\">{{$val.content}}</div>\n\t\t</div>\n\t</div>\n</div>\n\n"

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "<div ms-controller=\"header\" class=\"header\" ms-include-src=\"tpl\"></div>\n<div class=\"main\">\n\t<div ms-controller=\"toolbar\" class=\"toolbar\" ms-include-src=\"tpl\"></div>\n\t<div ms-controller=\"workspace\" class=\"workspace\" ms-include-src=\"tpl\"></div>\n</div>"

/***/ }
/******/ ]);
//# sourceMappingURL=editor.js.map