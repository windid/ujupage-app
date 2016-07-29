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
	
	var _vueResource = __webpack_require__(2);
	
	var _vueResource2 = _interopRequireDefault(_vueResource);
	
	var _dashboard = __webpack_require__(3);
	
	var _dashboard2 = _interopRequireDefault(_dashboard);
	
	var _store = __webpack_require__(126);
	
	var _store2 = _interopRequireDefault(_store);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	Vue.use(_vueResource2.default);
	Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
	
	var vm = new Vue({
	  el: '#page',
	  store: _store2.default,
	  render: function render(h) {
	    return h(_dashboard2.default);
	  }
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	/*!
	 * vue-resource v0.9.1
	 * https://github.com/vuejs/vue-resource
	 * Released under the MIT License.
	 */
	
	'use strict';
	
	/**
	 * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
	 */
	
	var RESOLVED = 0;
	var REJECTED = 1;
	var PENDING = 2;
	
	function Promise$2(executor) {
	
	    this.state = PENDING;
	    this.value = undefined;
	    this.deferred = [];
	
	    var promise = this;
	
	    try {
	        executor(function (x) {
	            promise.resolve(x);
	        }, function (r) {
	            promise.reject(r);
	        });
	    } catch (e) {
	        promise.reject(e);
	    }
	}
	
	Promise$2.reject = function (r) {
	    return new Promise$2(function (resolve, reject) {
	        reject(r);
	    });
	};
	
	Promise$2.resolve = function (x) {
	    return new Promise$2(function (resolve, reject) {
	        resolve(x);
	    });
	};
	
	Promise$2.all = function all(iterable) {
	    return new Promise$2(function (resolve, reject) {
	        var count = 0,
	            result = [];
	
	        if (iterable.length === 0) {
	            resolve(result);
	        }
	
	        function resolver(i) {
	            return function (x) {
	                result[i] = x;
	                count += 1;
	
	                if (count === iterable.length) {
	                    resolve(result);
	                }
	            };
	        }
	
	        for (var i = 0; i < iterable.length; i += 1) {
	            Promise$2.resolve(iterable[i]).then(resolver(i), reject);
	        }
	    });
	};
	
	Promise$2.race = function race(iterable) {
	    return new Promise$2(function (resolve, reject) {
	        for (var i = 0; i < iterable.length; i += 1) {
	            Promise$2.resolve(iterable[i]).then(resolve, reject);
	        }
	    });
	};
	
	var p$1 = Promise$2.prototype;
	
	p$1.resolve = function resolve(x) {
	    var promise = this;
	
	    if (promise.state === PENDING) {
	        if (x === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }
	
	        var called = false;
	
	        try {
	            var then = x && x['then'];
	
	            if (x !== null && typeof x === 'object' && typeof then === 'function') {
	                then.call(x, function (x) {
	                    if (!called) {
	                        promise.resolve(x);
	                    }
	                    called = true;
	                }, function (r) {
	                    if (!called) {
	                        promise.reject(r);
	                    }
	                    called = true;
	                });
	                return;
	            }
	        } catch (e) {
	            if (!called) {
	                promise.reject(e);
	            }
	            return;
	        }
	
	        promise.state = RESOLVED;
	        promise.value = x;
	        promise.notify();
	    }
	};
	
	p$1.reject = function reject(reason) {
	    var promise = this;
	
	    if (promise.state === PENDING) {
	        if (reason === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }
	
	        promise.state = REJECTED;
	        promise.value = reason;
	        promise.notify();
	    }
	};
	
	p$1.notify = function notify() {
	    var promise = this;
	
	    nextTick(function () {
	        if (promise.state !== PENDING) {
	            while (promise.deferred.length) {
	                var deferred = promise.deferred.shift(),
	                    onResolved = deferred[0],
	                    onRejected = deferred[1],
	                    resolve = deferred[2],
	                    reject = deferred[3];
	
	                try {
	                    if (promise.state === RESOLVED) {
	                        if (typeof onResolved === 'function') {
	                            resolve(onResolved.call(undefined, promise.value));
	                        } else {
	                            resolve(promise.value);
	                        }
	                    } else if (promise.state === REJECTED) {
	                        if (typeof onRejected === 'function') {
	                            resolve(onRejected.call(undefined, promise.value));
	                        } else {
	                            reject(promise.value);
	                        }
	                    }
	                } catch (e) {
	                    reject(e);
	                }
	            }
	        }
	    });
	};
	
	p$1.then = function then(onResolved, onRejected) {
	    var promise = this;
	
	    return new Promise$2(function (resolve, reject) {
	        promise.deferred.push([onResolved, onRejected, resolve, reject]);
	        promise.notify();
	    });
	};
	
	p$1.catch = function (onRejected) {
	    return this.then(undefined, onRejected);
	};
	
	var PromiseObj = window.Promise || Promise$2;
	
	function Promise$1(executor, context) {
	
	    if (executor instanceof PromiseObj) {
	        this.promise = executor;
	    } else {
	        this.promise = new PromiseObj(executor.bind(context));
	    }
	
	    this.context = context;
	}
	
	Promise$1.all = function (iterable, context) {
	    return new Promise$1(PromiseObj.all(iterable), context);
	};
	
	Promise$1.resolve = function (value, context) {
	    return new Promise$1(PromiseObj.resolve(value), context);
	};
	
	Promise$1.reject = function (reason, context) {
	    return new Promise$1(PromiseObj.reject(reason), context);
	};
	
	Promise$1.race = function (iterable, context) {
	    return new Promise$1(PromiseObj.race(iterable), context);
	};
	
	var p = Promise$1.prototype;
	
	p.bind = function (context) {
	    this.context = context;
	    return this;
	};
	
	p.then = function (fulfilled, rejected) {
	
	    if (fulfilled && fulfilled.bind && this.context) {
	        fulfilled = fulfilled.bind(this.context);
	    }
	
	    if (rejected && rejected.bind && this.context) {
	        rejected = rejected.bind(this.context);
	    }
	
	    return new Promise$1(this.promise.then(fulfilled, rejected), this.context);
	};
	
	p.catch = function (rejected) {
	
	    if (rejected && rejected.bind && this.context) {
	        rejected = rejected.bind(this.context);
	    }
	
	    return new Promise$1(this.promise.catch(rejected), this.context);
	};
	
	p.finally = function (callback) {
	
	    return this.then(function (value) {
	        callback.call(this);
	        return value;
	    }, function (reason) {
	        callback.call(this);
	        return PromiseObj.reject(reason);
	    });
	};
	
	var debug = false;
	var util = {};
	var array = [];
	function Util (Vue) {
	    util = Vue.util;
	    debug = Vue.config.debug || !Vue.config.silent;
	}
	
	function warn(msg) {
	    if (typeof console !== 'undefined' && debug) {
	        console.warn('[VueResource warn]: ' + msg);
	    }
	}
	
	function error(msg) {
	    if (typeof console !== 'undefined') {
	        console.error(msg);
	    }
	}
	
	function nextTick(cb, ctx) {
	    return util.nextTick(cb, ctx);
	}
	
	function trim(str) {
	    return str.replace(/^\s*|\s*$/g, '');
	}
	
	var isArray = Array.isArray;
	
	function isString(val) {
	    return typeof val === 'string';
	}
	
	function isBoolean(val) {
	    return val === true || val === false;
	}
	
	function isFunction(val) {
	    return typeof val === 'function';
	}
	
	function isObject(obj) {
	    return obj !== null && typeof obj === 'object';
	}
	
	function isPlainObject(obj) {
	    return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
	}
	
	function isFormData(obj) {
	    return typeof FormData !== 'undefined' && obj instanceof FormData;
	}
	
	function when(value, fulfilled, rejected) {
	
	    var promise = Promise$1.resolve(value);
	
	    if (arguments.length < 2) {
	        return promise;
	    }
	
	    return promise.then(fulfilled, rejected);
	}
	
	function options(fn, obj, opts) {
	
	    opts = opts || {};
	
	    if (isFunction(opts)) {
	        opts = opts.call(obj);
	    }
	
	    return merge(fn.bind({ $vm: obj, $options: opts }), fn, { $options: opts });
	}
	
	function each(obj, iterator) {
	
	    var i, key;
	
	    if (typeof obj.length == 'number') {
	        for (i = 0; i < obj.length; i++) {
	            iterator.call(obj[i], obj[i], i);
	        }
	    } else if (isObject(obj)) {
	        for (key in obj) {
	            if (obj.hasOwnProperty(key)) {
	                iterator.call(obj[key], obj[key], key);
	            }
	        }
	    }
	
	    return obj;
	}
	
	var assign = Object.assign || _assign;
	
	function merge(target) {
	
	    var args = array.slice.call(arguments, 1);
	
	    args.forEach(function (source) {
	        _merge(target, source, true);
	    });
	
	    return target;
	}
	
	function defaults(target) {
	
	    var args = array.slice.call(arguments, 1);
	
	    args.forEach(function (source) {
	
	        for (var key in source) {
	            if (target[key] === undefined) {
	                target[key] = source[key];
	            }
	        }
	    });
	
	    return target;
	}
	
	function _assign(target) {
	
	    var args = array.slice.call(arguments, 1);
	
	    args.forEach(function (source) {
	        _merge(target, source);
	    });
	
	    return target;
	}
	
	function _merge(target, source, deep) {
	    for (var key in source) {
	        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
	            if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
	                target[key] = {};
	            }
	            if (isArray(source[key]) && !isArray(target[key])) {
	                target[key] = [];
	            }
	            _merge(target[key], source[key], deep);
	        } else if (source[key] !== undefined) {
	            target[key] = source[key];
	        }
	    }
	}
	
	function root (options, next) {
	
	    var url = next(options);
	
	    if (isString(options.root) && !url.match(/^(https?:)?\//)) {
	        url = options.root + '/' + url;
	    }
	
	    return url;
	}
	
	function query (options, next) {
	
	    var urlParams = Object.keys(Url.options.params),
	        query = {},
	        url = next(options);
	
	    each(options.params, function (value, key) {
	        if (urlParams.indexOf(key) === -1) {
	            query[key] = value;
	        }
	    });
	
	    query = Url.params(query);
	
	    if (query) {
	        url += (url.indexOf('?') == -1 ? '?' : '&') + query;
	    }
	
	    return url;
	}
	
	/**
	 * URL Template v2.0.6 (https://github.com/bramstein/url-template)
	 */
	
	function expand(url, params, variables) {
	
	    var tmpl = parse(url),
	        expanded = tmpl.expand(params);
	
	    if (variables) {
	        variables.push.apply(variables, tmpl.vars);
	    }
	
	    return expanded;
	}
	
	function parse(template) {
	
	    var operators = ['+', '#', '.', '/', ';', '?', '&'],
	        variables = [];
	
	    return {
	        vars: variables,
	        expand: function (context) {
	            return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
	                if (expression) {
	
	                    var operator = null,
	                        values = [];
	
	                    if (operators.indexOf(expression.charAt(0)) !== -1) {
	                        operator = expression.charAt(0);
	                        expression = expression.substr(1);
	                    }
	
	                    expression.split(/,/g).forEach(function (variable) {
	                        var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
	                        values.push.apply(values, getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
	                        variables.push(tmp[1]);
	                    });
	
	                    if (operator && operator !== '+') {
	
	                        var separator = ',';
	
	                        if (operator === '?') {
	                            separator = '&';
	                        } else if (operator !== '#') {
	                            separator = operator;
	                        }
	
	                        return (values.length !== 0 ? operator : '') + values.join(separator);
	                    } else {
	                        return values.join(',');
	                    }
	                } else {
	                    return encodeReserved(literal);
	                }
	            });
	        }
	    };
	}
	
	function getValues(context, operator, key, modifier) {
	
	    var value = context[key],
	        result = [];
	
	    if (isDefined(value) && value !== '') {
	        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
	            value = value.toString();
	
	            if (modifier && modifier !== '*') {
	                value = value.substring(0, parseInt(modifier, 10));
	            }
	
	            result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
	        } else {
	            if (modifier === '*') {
	                if (Array.isArray(value)) {
	                    value.filter(isDefined).forEach(function (value) {
	                        result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
	                    });
	                } else {
	                    Object.keys(value).forEach(function (k) {
	                        if (isDefined(value[k])) {
	                            result.push(encodeValue(operator, value[k], k));
	                        }
	                    });
	                }
	            } else {
	                var tmp = [];
	
	                if (Array.isArray(value)) {
	                    value.filter(isDefined).forEach(function (value) {
	                        tmp.push(encodeValue(operator, value));
	                    });
	                } else {
	                    Object.keys(value).forEach(function (k) {
	                        if (isDefined(value[k])) {
	                            tmp.push(encodeURIComponent(k));
	                            tmp.push(encodeValue(operator, value[k].toString()));
	                        }
	                    });
	                }
	
	                if (isKeyOperator(operator)) {
	                    result.push(encodeURIComponent(key) + '=' + tmp.join(','));
	                } else if (tmp.length !== 0) {
	                    result.push(tmp.join(','));
	                }
	            }
	        }
	    } else {
	        if (operator === ';') {
	            result.push(encodeURIComponent(key));
	        } else if (value === '' && (operator === '&' || operator === '?')) {
	            result.push(encodeURIComponent(key) + '=');
	        } else if (value === '') {
	            result.push('');
	        }
	    }
	
	    return result;
	}
	
	function isDefined(value) {
	    return value !== undefined && value !== null;
	}
	
	function isKeyOperator(operator) {
	    return operator === ';' || operator === '&' || operator === '?';
	}
	
	function encodeValue(operator, value, key) {
	
	    value = operator === '+' || operator === '#' ? encodeReserved(value) : encodeURIComponent(value);
	
	    if (key) {
	        return encodeURIComponent(key) + '=' + value;
	    } else {
	        return value;
	    }
	}
	
	function encodeReserved(str) {
	    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
	        if (!/%[0-9A-Fa-f]/.test(part)) {
	            part = encodeURI(part);
	        }
	        return part;
	    }).join('');
	}
	
	function template (options) {
	
	    var variables = [],
	        url = expand(options.url, options.params, variables);
	
	    variables.forEach(function (key) {
	        delete options.params[key];
	    });
	
	    return url;
	}
	
	/**
	 * Service for URL templating.
	 */
	
	var ie = document.documentMode;
	var el = document.createElement('a');
	
	function Url(url, params) {
	
	    var self = this || {},
	        options = url,
	        transform;
	
	    if (isString(url)) {
	        options = { url: url, params: params };
	    }
	
	    options = merge({}, Url.options, self.$options, options);
	
	    Url.transforms.forEach(function (handler) {
	        transform = factory(handler, transform, self.$vm);
	    });
	
	    return transform(options);
	}
	
	/**
	 * Url options.
	 */
	
	Url.options = {
	    url: '',
	    root: null,
	    params: {}
	};
	
	/**
	 * Url transforms.
	 */
	
	Url.transforms = [template, query, root];
	
	/**
	 * Encodes a Url parameter string.
	 *
	 * @param {Object} obj
	 */
	
	Url.params = function (obj) {
	
	    var params = [],
	        escape = encodeURIComponent;
	
	    params.add = function (key, value) {
	
	        if (isFunction(value)) {
	            value = value();
	        }
	
	        if (value === null) {
	            value = '';
	        }
	
	        this.push(escape(key) + '=' + escape(value));
	    };
	
	    serialize(params, obj);
	
	    return params.join('&').replace(/%20/g, '+');
	};
	
	/**
	 * Parse a URL and return its components.
	 *
	 * @param {String} url
	 */
	
	Url.parse = function (url) {
	
	    if (ie) {
	        el.href = url;
	        url = el.href;
	    }
	
	    el.href = url;
	
	    return {
	        href: el.href,
	        protocol: el.protocol ? el.protocol.replace(/:$/, '') : '',
	        port: el.port,
	        host: el.host,
	        hostname: el.hostname,
	        pathname: el.pathname.charAt(0) === '/' ? el.pathname : '/' + el.pathname,
	        search: el.search ? el.search.replace(/^\?/, '') : '',
	        hash: el.hash ? el.hash.replace(/^#/, '') : ''
	    };
	};
	
	function factory(handler, next, vm) {
	    return function (options) {
	        return handler.call(vm, options, next);
	    };
	}
	
	function serialize(params, obj, scope) {
	
	    var array = isArray(obj),
	        plain = isPlainObject(obj),
	        hash;
	
	    each(obj, function (value, key) {
	
	        hash = isObject(value) || isArray(value);
	
	        if (scope) {
	            key = scope + '[' + (plain || hash ? key : '') + ']';
	        }
	
	        if (!scope && array) {
	            params.add(value.name, value.value);
	        } else if (hash) {
	            serialize(params, value, key);
	        } else {
	            params.add(key, value);
	        }
	    });
	}
	
	function xdrClient (request) {
	    return new Promise$1(function (resolve) {
	
	        var xdr = new XDomainRequest(),
	            handler = function (event) {
	
	            var response = request.respondWith(xdr.responseText, {
	                status: xdr.status,
	                statusText: xdr.statusText
	            });
	
	            resolve(response);
	        };
	
	        request.abort = function () {
	            return xdr.abort();
	        };
	
	        xdr.open(request.method, request.getUrl(), true);
	        xdr.timeout = 0;
	        xdr.onload = handler;
	        xdr.onerror = handler;
	        xdr.ontimeout = function () {};
	        xdr.onprogress = function () {};
	        xdr.send(request.getBody());
	    });
	}
	
	var ORIGIN_URL = Url.parse(location.href);
	var SUPPORTS_CORS = 'withCredentials' in new XMLHttpRequest();
	
	function cors (request, next) {
	
	    if (!isBoolean(request.crossOrigin) && crossOrigin(request)) {
	        request.crossOrigin = true;
	    }
	
	    if (request.crossOrigin) {
	
	        if (!SUPPORTS_CORS) {
	            request.client = xdrClient;
	        }
	
	        delete request.emulateHTTP;
	    }
	
	    next();
	}
	
	function crossOrigin(request) {
	
	    var requestUrl = Url.parse(Url(request));
	
	    return requestUrl.protocol !== ORIGIN_URL.protocol || requestUrl.host !== ORIGIN_URL.host;
	}
	
	function body (request, next) {
	
	    if (request.emulateJSON && isPlainObject(request.body)) {
	        request.body = Url.params(request.body);
	        request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	    }
	
	    if (isFormData(request.body)) {
	        delete request.headers['Content-Type'];
	    }
	
	    if (isPlainObject(request.body)) {
	        request.body = JSON.stringify(request.body);
	    }
	
	    next(function (response) {
	
	        var contentType = response.headers['Content-Type'];
	
	        if (isString(contentType) && contentType.indexOf('application/json') === 0) {
	
	            try {
	                response.data = response.json();
	            } catch (e) {
	                response.data = null;
	            }
	        } else {
	            response.data = response.text();
	        }
	    });
	}
	
	function jsonpClient (request) {
	    return new Promise$1(function (resolve) {
	
	        var name = request.jsonp || 'callback',
	            callback = '_jsonp' + Math.random().toString(36).substr(2),
	            body = null,
	            handler,
	            script;
	
	        handler = function (event) {
	
	            var status = 0;
	
	            if (event.type === 'load' && body !== null) {
	                status = 200;
	            } else if (event.type === 'error') {
	                status = 404;
	            }
	
	            resolve(request.respondWith(body, { status: status }));
	
	            delete window[callback];
	            document.body.removeChild(script);
	        };
	
	        request.params[name] = callback;
	
	        window[callback] = function (result) {
	            body = JSON.stringify(result);
	        };
	
	        script = document.createElement('script');
	        script.src = request.getUrl();
	        script.type = 'text/javascript';
	        script.async = true;
	        script.onload = handler;
	        script.onerror = handler;
	
	        document.body.appendChild(script);
	    });
	}
	
	function jsonp (request, next) {
	
	    if (request.method == 'JSONP') {
	        request.client = jsonpClient;
	    }
	
	    next(function (response) {
	
	        if (request.method == 'JSONP') {
	            response.data = response.json();
	        }
	    });
	}
	
	function before (request, next) {
	
	    if (isFunction(request.before)) {
	        request.before.call(this, request);
	    }
	
	    next();
	}
	
	/**
	 * HTTP method override Interceptor.
	 */
	
	function method (request, next) {
	
	    if (request.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(request.method)) {
	        request.headers['X-HTTP-Method-Override'] = request.method;
	        request.method = 'POST';
	    }
	
	    next();
	}
	
	function header (request, next) {
	
	    request.method = request.method.toUpperCase();
	    request.headers = assign({}, Http.headers.common, !request.crossOrigin ? Http.headers.custom : {}, Http.headers[request.method.toLowerCase()], request.headers);
	
	    next();
	}
	
	/**
	 * Timeout Interceptor.
	 */
	
	function timeout (request, next) {
	
	    var timeout;
	
	    if (request.timeout) {
	        timeout = setTimeout(function () {
	            request.cancel();
	        }, request.timeout);
	    }
	
	    next(function (response) {
	
	        clearTimeout(timeout);
	    });
	}
	
	function xhrClient (request) {
	    return new Promise$1(function (resolve) {
	
	        var xhr = new XMLHttpRequest(),
	            handler = function (event) {
	
	            var response = request.respondWith('response' in xhr ? xhr.response : xhr.responseText, {
	                status: xhr.status === 1223 ? 204 : xhr.status, // IE9 status bug
	                statusText: xhr.status === 1223 ? 'No Content' : trim(xhr.statusText),
	                headers: parseHeaders(xhr.getAllResponseHeaders())
	            });
	
	            resolve(response);
	        };
	
	        request.abort = function () {
	            return xhr.abort();
	        };
	
	        xhr.open(request.method, request.getUrl(), true);
	        xhr.timeout = 0;
	        xhr.onload = handler;
	        xhr.onerror = handler;
	
	        if (request.progress) {
	            if (request.method === 'GET') {
	                xhr.addEventListener('progress', request.progress);
	            } else if (/^(POST|PUT)$/i.test(request.method)) {
	                xhr.upload.addEventListener('progress', request.progress);
	            }
	        }
	
	        if (request.credentials === true) {
	            xhr.withCredentials = true;
	        }
	
	        each(request.headers || {}, function (value, header) {
	            xhr.setRequestHeader(header, value);
	        });
	
	        xhr.send(request.getBody());
	    });
	}
	
	function parseHeaders(str) {
	
	    var headers = {},
	        value,
	        name,
	        i;
	
	    each(trim(str).split('\n'), function (row) {
	
	        i = row.indexOf(':');
	        name = trim(row.slice(0, i));
	        value = trim(row.slice(i + 1));
	
	        if (headers[name]) {
	
	            if (isArray(headers[name])) {
	                headers[name].push(value);
	            } else {
	                headers[name] = [headers[name], value];
	            }
	        } else {
	
	            headers[name] = value;
	        }
	    });
	
	    return headers;
	}
	
	function Client (context) {
	
	    var reqHandlers = [sendRequest],
	        resHandlers = [],
	        handler;
	
	    if (!isObject(context)) {
	        context = null;
	    }
	
	    function Client(request) {
	        return new Promise$1(function (resolve) {
	
	            function exec() {
	
	                handler = reqHandlers.pop();
	
	                if (isFunction(handler)) {
	                    handler.call(context, request, next);
	                } else {
	                    warn('Invalid interceptor of type ' + typeof handler + ', must be a function');
	                    next();
	                }
	            }
	
	            function next(response) {
	                when(response, function (response) {
	
	                    if (isFunction(response)) {
	
	                        resHandlers.unshift(response);
	                    } else if (isObject(response)) {
	
	                        resHandlers.forEach(function (handler) {
	                            handler.call(context, response);
	                        });
	
	                        resolve(response);
	
	                        return;
	                    }
	
	                    exec();
	                });
	            }
	
	            exec();
	        }, context);
	    }
	
	    Client.use = function (handler) {
	        reqHandlers.push(handler);
	    };
	
	    return Client;
	}
	
	function sendRequest(request, resolve) {
	
	    var client = request.client || xhrClient;
	
	    resolve(client(request));
	}
	
	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	
	/**
	 * HTTP Response.
	 */
	
	var Response = function () {
	    function Response(body, _ref) {
	        var url = _ref.url;
	        var headers = _ref.headers;
	        var status = _ref.status;
	        var statusText = _ref.statusText;
	        classCallCheck(this, Response);
	
	
	        this.url = url;
	        this.body = body;
	        this.headers = headers || {};
	        this.status = status || 0;
	        this.statusText = statusText || '';
	        this.ok = status >= 200 && status < 300;
	    }
	
	    Response.prototype.text = function text() {
	        return this.body;
	    };
	
	    Response.prototype.blob = function blob() {
	        return new Blob([this.body]);
	    };
	
	    Response.prototype.json = function json() {
	        return JSON.parse(this.body);
	    };
	
	    return Response;
	}();
	
	var Request = function () {
	    function Request(options) {
	        classCallCheck(this, Request);
	
	
	        this.method = 'GET';
	        this.body = null;
	        this.params = {};
	        this.headers = {};
	
	        assign(this, options);
	    }
	
	    Request.prototype.getUrl = function getUrl() {
	        return Url(this);
	    };
	
	    Request.prototype.getBody = function getBody() {
	        return this.body;
	    };
	
	    Request.prototype.respondWith = function respondWith(body, options) {
	        return new Response(body, assign(options || {}, { url: this.getUrl() }));
	    };
	
	    return Request;
	}();
	
	/**
	 * Service for sending network requests.
	 */
	
	var CUSTOM_HEADERS = { 'X-Requested-With': 'XMLHttpRequest' };
	var COMMON_HEADERS = { 'Accept': 'application/json, text/plain, */*' };
	var JSON_CONTENT_TYPE = { 'Content-Type': 'application/json;charset=utf-8' };
	
	function Http(options) {
	
	    var self = this || {},
	        client = Client(self.$vm);
	
	    defaults(options || {}, self.$options, Http.options);
	
	    Http.interceptors.forEach(function (handler) {
	        client.use(handler);
	    });
	
	    return client(new Request(options)).then(function (response) {
	
	        return response.ok ? response : Promise$1.reject(response);
	    }, function (response) {
	
	        if (response instanceof Error) {
	            error(response);
	        }
	
	        return Promise$1.reject(response);
	    });
	}
	
	Http.options = {};
	
	Http.headers = {
	    put: JSON_CONTENT_TYPE,
	    post: JSON_CONTENT_TYPE,
	    patch: JSON_CONTENT_TYPE,
	    delete: JSON_CONTENT_TYPE,
	    custom: CUSTOM_HEADERS,
	    common: COMMON_HEADERS
	};
	
	Http.interceptors = [before, timeout, method, body, jsonp, header, cors];
	
	['get', 'delete', 'head', 'jsonp'].forEach(function (method) {
	
	    Http[method] = function (url, options) {
	        return this(assign(options || {}, { url: url, method: method }));
	    };
	});
	
	['post', 'put', 'patch'].forEach(function (method) {
	
	    Http[method] = function (url, body, options) {
	        return this(assign(options || {}, { url: url, method: method, body: body }));
	    };
	});
	
	function Resource(url, params, actions, options) {
	
	    var self = this || {},
	        resource = {};
	
	    actions = assign({}, Resource.actions, actions);
	
	    each(actions, function (action, name) {
	
	        action = merge({ url: url, params: params || {} }, options, action);
	
	        resource[name] = function () {
	            return (self.$http || Http)(opts(action, arguments));
	        };
	    });
	
	    return resource;
	}
	
	function opts(action, args) {
	
	    var options = assign({}, action),
	        params = {},
	        body;
	
	    switch (args.length) {
	
	        case 2:
	
	            params = args[0];
	            body = args[1];
	
	            break;
	
	        case 1:
	
	            if (/^(POST|PUT|PATCH)$/i.test(options.method)) {
	                body = args[0];
	            } else {
	                params = args[0];
	            }
	
	            break;
	
	        case 0:
	
	            break;
	
	        default:
	
	            throw 'Expected up to 4 arguments [params, body], got ' + args.length + ' arguments';
	    }
	
	    options.body = body;
	    options.params = assign({}, options.params, params);
	
	    return options;
	}
	
	Resource.actions = {
	
	    get: { method: 'GET' },
	    save: { method: 'POST' },
	    query: { method: 'GET' },
	    update: { method: 'PUT' },
	    remove: { method: 'DELETE' },
	    delete: { method: 'DELETE' }
	
	};
	
	function plugin(Vue) {
	
	    if (plugin.installed) {
	        return;
	    }
	
	    Util(Vue);
	
	    Vue.url = Url;
	    Vue.http = Http;
	    Vue.resource = Resource;
	    Vue.Promise = Promise$1;
	
	    Object.defineProperties(Vue.prototype, {
	
	        $url: {
	            get: function () {
	                return options(Vue.url, this, this.$options.url);
	            }
	        },
	
	        $http: {
	            get: function () {
	                return options(Vue.http, this, this.$options.http);
	            }
	        },
	
	        $resource: {
	            get: function () {
	                return Vue.resource.bind(this);
	            }
	        },
	
	        $promise: {
	            get: function () {
	                var _this = this;
	
	                return function (executor) {
	                    return new Vue.Promise(executor, _this);
	                };
	            }
	        }
	
	    });
	}
	
	if (typeof window !== 'undefined' && window.Vue) {
	    window.Vue.use(plugin);
	}
	
	module.exports = plugin;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(4)
	__vue_script__ = __webpack_require__(8)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources/assets/js/dashboard/components/dashboard.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(125)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./dashboard.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(5);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../node_modules/css-loader/index.js?sourceMap!./../../../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./dashboard.vue", function() {
				var newContent = require("!!./../../../../../node_modules/css-loader/index.js?sourceMap!./../../../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./dashboard.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n#main{\n  position:relative;\n  top:55px;\n}\n", "", {"version":3,"sources":["/./resources/assets/js/dashboard/components/dashboard.vue?5fd1c0f4"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAoCA;EACA,kBAAA;EACA,SAAA;CACA","file":"dashboard.vue","sourcesContent":["<script>\n\nimport commonHeader from '../../layout/header.vue'\nimport sidebar from './sidebar.vue'\nimport workspace from './workspace.vue'\nimport { mapGetters, mapActions } from '../../vendor/vuex-2.0.0'\n\nexport default {\n  components: {\n    commonHeader,\n    sidebar,\n    workspace\n  },\n  computed: {\n\n  },\n  methods: mapActions([\n    'init'\n  ]),\n  created (){\n    // this.init();\n  }\n}\n</script>\n\n<template>\n  <div id=\"page\">\n    <common-header></common-header>\n    <div id=\"main\" @click=\"init\">\n      <sidebar></sidebar>\n      <workspace></workspace>\n    </div> \n  </div>\n</template>\n\n<style>\n  #main{\n    position:relative;\n    top:55px;\n  }\n</style>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 6 */
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
/* 7 */
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _header = __webpack_require__(9);
	
	var _header2 = _interopRequireDefault(_header);
	
	var _sidebar = __webpack_require__(14);
	
	var _sidebar2 = _interopRequireDefault(_sidebar);
	
	var _workspace = __webpack_require__(19);
	
	var _workspace2 = _interopRequireDefault(_workspace);
	
	var _vuex = __webpack_require__(29);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  components: {
	    commonHeader: _header2.default,
	    sidebar: _sidebar2.default,
	    workspace: _workspace2.default
	  },
	  computed: {},
	  methods: (0, _vuex.mapActions)(['init']),
	  created: function created() {}
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(10)
	__vue_script__ = __webpack_require__(12)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources/assets/js/layout/header.vue: named exports in *.vue files are ignored.")}
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
	  var id = "./header.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(11);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-4f2d1f09&scoped=true!./../../../../node_modules/sass-loader/index.js!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./header.vue", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-4f2d1f09&scoped=true!./../../../../node_modules/sass-loader/index.js!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./header.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports
	
	
	// module
	exports.push([module.id, "#header[_v-4f2d1f09] {\n  position: fixed;\n  z-index: 1;\n  background: #f9f9f9;\n  width: 100%;\n  top: 0;\n  height: 55px;\n  border-top: 1px solid #e6e6e6;\n  border-bottom: 1px solid #e6e6e6;\n  box-shadow: 0 3px 8px #eee; }\n\n.logo[_v-4f2d1f09] {\n  outline: 0;\n  display: inline-block;\n  height: 32px;\n  width: 100px;\n  float: left;\n  margin: 11px 0 11px 20px;\n  background-image: url(\"//s1.ujustatic.com/ujupage-assets/img/juye-logo.png\"); }\n\n#header .nav[_v-4f2d1f09] {\n  margin: 7px 20px; }\n", "", {"version":3,"sources":["/./resources/assets/js/layout/header.vue"],"names":[],"mappings":"AAAA;EACE,gBAAgB;EAChB,WAAW;EACX,oBAAoB;EACpB,YAAY;EACZ,OAAO;EACP,aAAa;EACb,8BAA8B;EAC9B,iCAAiC;EACjC,2BAA2B,EAAE;;AAE/B;EACE,WAAW;EACX,sBAAsB;EACtB,aAAa;EACb,aAAa;EACb,YAAY;EACZ,yBAAyB;EACzB,6EAA6E,EAAE;;AAEjF;EACE,iBAAiB,EAAE","file":"header.vue","sourcesContent":["#header {\n  position: fixed;\n  z-index: 1;\n  background: #f9f9f9;\n  width: 100%;\n  top: 0;\n  height: 55px;\n  border-top: 1px solid #e6e6e6;\n  border-bottom: 1px solid #e6e6e6;\n  box-shadow: 0 3px 8px #eee; }\n\n.logo {\n  outline: 0;\n  display: inline-block;\n  height: 32px;\n  width: 100px;\n  float: left;\n  margin: 11px 0 11px 20px;\n  background-image: url(\"//s1.ujustatic.com/ujupage-assets/img/juye-logo.png\"); }\n\n#header .nav {\n  margin: 7px 20px; }\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n<div id=\"header\" _v-4f2d1f09=\"\">\n  <a href=\"/dashboard\" class=\"logo fl\" _v-4f2d1f09=\"\"></a>\n  <ul class=\"nav nav-pills fr\" _v-4f2d1f09=\"\">\n  <li _v-4f2d1f09=\"\"><a href=\"/account\" _v-4f2d1f09=\"\">我的帐号</a></li>\n  <li _v-4f2d1f09=\"\"><a href=\"/auth/logout\" _v-4f2d1f09=\"\">退出登陆</a></li>\n  </ul>\n</div>\n";

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(15)
	__vue_script__ = __webpack_require__(17)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources/assets/js/dashboard/components/sidebar.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(18)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./sidebar.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(16);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../node_modules/css-loader/index.js?sourceMap!./../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-5e490617&scoped=true!./../../../../../node_modules/sass-loader/index.js!./../../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./sidebar.vue", function() {
				var newContent = require("!!./../../../../../node_modules/css-loader/index.js?sourceMap!./../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-5e490617&scoped=true!./../../../../../node_modules/sass-loader/index.js!./../../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./sidebar.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports
	
	
	// module
	exports.push([module.id, "#sidebar[_v-5e490617] {\n  position: fixed;\n  width: 240px;\n  top: 55px;\n  height: calc(100% - 55px);\n  bottom: 0;\n  border-right: 1px solid #e6e6e6;\n  box-shadow: 0 3px 8px #eee; }\n", "", {"version":3,"sources":["/./resources/assets/js/dashboard/components/sidebar.vue"],"names":[],"mappings":"AAAA;EACE,gBAAgB;EAChB,aAAa;EACb,UAAU;EACV,0BAA0B;EAC1B,UAAU;EACV,gCAAgC;EAChC,2BAA2B,EAAE","file":"sidebar.vue","sourcesContent":["#sidebar {\n  position: fixed;\n  width: 240px;\n  top: 55px;\n  height: calc(100% - 55px);\n  bottom: 0;\n  border-right: 1px solid #e6e6e6;\n  box-shadow: 0 3px 8px #eee; }\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  components: {},
	  methods: {}
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "\n<div id=\"sidebar\" _v-5e490617=\"\">\n  \n</div>\n";

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(20)
	__vue_script__ = __webpack_require__(22)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources/assets/js/dashboard/components/workspace.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(28)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./workspace.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(21);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../node_modules/css-loader/index.js?sourceMap!./../../../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./workspace.vue", function() {
				var newContent = require("!!./../../../../../node_modules/css-loader/index.js?sourceMap!./../../../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./workspace.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n#workspace{\n  position:relative;\n  margin-left:240px;\n  padding:15px;\n}\n", "", {"version":3,"sources":["/./resources/assets/js/dashboard/components/workspace.vue?acea6b7a"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;AAoBA;EACA,kBAAA;EACA,kBAAA;EACA,aAAA;CACA","file":"workspace.vue","sourcesContent":["<script>\nimport pageItem from './pageItem.vue'\n\nexport default {\n  components: {\n    pageItem\n  },\n  methods: {\n    \n  }\n}\n</script>\n\n<template>\n  <div id=\"workspace\">\n    <page-item v-for=\"pageItem in [0,1,2,3,4,5,6,7,8,9,10]\"></page-item>\n  </div>\n</template>\n\n<style>\n#workspace{\n  position:relative;\n  margin-left:240px;\n  padding:15px;\n}\n</style>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _pageItem = __webpack_require__(23);
	
	var _pageItem2 = _interopRequireDefault(_pageItem);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  components: {
	    pageItem: _pageItem2.default
	  },
	  methods: {}
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(24)
	__vue_script__ = __webpack_require__(26)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources/assets/js/dashboard/components/pageItem.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(27)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./pageItem.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(25);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../node_modules/css-loader/index.js?sourceMap!./../../../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./pageItem.vue", function() {
				var newContent = require("!!./../../../../../node_modules/css-loader/index.js?sourceMap!./../../../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./pageItem.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.page-item{\n  width: 200px;\n  border: 1px solid #ddd;\n  border-radius: 6px;\n  height: 240px;\n  box-shadow: 0 0 8px #ddd;\n  float:left;\n  margin:10px;\n}\n\n.page-item-header{\n  position:relative;\n  padding:11px;\n  font-weight:bold;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.page-item-name{\n  max-width: 150px;\n}\n\n.page-item-body{\n  clear:both;\n  height:150px;\n  background:#f9f9f9;\n  border-top:1px solid #eee;\n  border-bottom:1px solid #eee;\n}\n\n.page-item-footer{\n  padding:7px;\n}\n", "", {"version":3,"sources":["/./resources/assets/js/dashboard/components/pageItem.vue?777552c0"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;AAqBA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,cAAA;EACA,yBAAA;EACA,WAAA;EACA,YAAA;CACA;;AAEA;EACA,kBAAA;EACA,aAAA;EACA,iBAAA;EACA,iBAAA;EACA,wBAAA;EACA,oBAAA;CACA;;AAEA;EACA,iBAAA;CACA;;AAEA;EACA,WAAA;EACA,aAAA;EACA,mBAAA;EACA,0BAAA;EACA,6BAAA;CACA;;AAEA;EACA,YAAA;CACA","file":"pageItem.vue","sourcesContent":["<script>\n\t\n</script>\n\n<template>\n  <div class=\"page-item\">\n    <div class=\"page-item-header\">\n      <a href=\"./editor\">这是一个测试用的页面名称啊</a>\n    </div>\n    <div class=\"page-item-body\"></div>\n    <div class=\"page-item-footer\">\n      <div class=\"btn-group fr\">\n        <div class=\"btn btn-default btn-sm\">商机 <span class=\"glyphicon glyphicon-user\"></span></div>\n        <div class=\"btn btn-default btn-sm\">分析 <span class=\"glyphicon glyphicon-signal\"></span></div>\n        <div class=\"btn btn-default btn-sm\"><span class=\"glyphicon glyphicon-cog\"></span> <span class=\"caret\"></span></div>\n      </div>\n    </div>\n  </div>\n</template>\n\n<style>\n.page-item{\n  width: 200px;\n  border: 1px solid #ddd;\n  border-radius: 6px;\n  height: 240px;\n  box-shadow: 0 0 8px #ddd;\n  float:left;\n  margin:10px;\n}\n\n.page-item-header{\n  position:relative;\n  padding:11px;\n  font-weight:bold;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.page-item-name{\n  max-width: 150px;\n}\n\n.page-item-body{\n  clear:both;\n  height:150px;\n  background:#f9f9f9;\n  border-top:1px solid #eee;\n  border-bottom:1px solid #eee;\n}\n\n.page-item-footer{\n  padding:7px;\n}\n</style>"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 26 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n<div class=\"page-item\">\n  <div class=\"page-item-header\">\n    <a href=\"./editor\">这是一个测试用的页面名称啊</a>\n  </div>\n  <div class=\"page-item-body\"></div>\n  <div class=\"page-item-footer\">\n    <div class=\"btn-group fr\">\n      <div class=\"btn btn-default btn-sm\">商机 <span class=\"glyphicon glyphicon-user\"></span></div>\n      <div class=\"btn btn-default btn-sm\">分析 <span class=\"glyphicon glyphicon-signal\"></span></div>\n      <div class=\"btn btn-default btn-sm\"><span class=\"glyphicon glyphicon-cog\"></span> <span class=\"caret\"></span></div>\n    </div>\n  </div>\n</div>\n";

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n<div id=\"workspace\">\n  <page-item v-for=\"pageItem in [0,1,2,3,4,5,6,7,8,9,10]\"></page-item>\n</div>\n";

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	var _create = __webpack_require__(30);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _promise = __webpack_require__(66);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _defineProperty = __webpack_require__(101);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	var _iterator = __webpack_require__(104);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(107);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _keys = __webpack_require__(120);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _typeof3 = __webpack_require__(124);
	
	var _typeof4 = _interopRequireDefault(_typeof3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*!
	 * Vuex v2.0.0-rc.3
	 * (c) 2016 Evan You
	 * Released under the MIT License.
	 */
	(function (global, factory) {
	  ( false ? 'undefined' : (0, _typeof4.default)(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.Vuex = factory();
	})(undefined, function () {
	  'use strict';
	
	  var devtoolHook = typeof window !== 'undefined' && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
	
	  function devtoolPlugin(store) {
	    if (!devtoolHook) return;
	
	    store._devtoolHook = devtoolHook;
	
	    devtoolHook.emit('vuex:init', store);
	
	    devtoolHook.on('vuex:travel-to-state', function (targetState) {
	      store.replaceState(targetState);
	    });
	
	    store.subscribe(function (mutation, state) {
	      devtoolHook.emit('vuex:mutation', mutation, state);
	    });
	  }
	
	  function applyMixin(Vue) {
	    var version = Number(Vue.version.split('.')[0]);
	
	    if (version >= 2) {
	      var usesInit = Vue.config._lifecycleHooks.indexOf('init') > -1;
	      Vue.mixin(usesInit ? { init: vuexInit } : { beforeCreate: vuexInit });
	    } else {
	      (function () {
	        // override init and inject vuex init procedure
	        // for 1.x backwards compatibility.
	        var _init = Vue.prototype._init;
	        Vue.prototype._init = function () {
	          var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	          options.init = options.init ? [vuexInit].concat(options.init) : vuexInit;
	          _init.call(this, options);
	        };
	      })();
	    }
	
	    /**
	     * Vuex init hook, injected into each instances init hooks list.
	     */
	
	    function vuexInit() {
	      var options = this.$options;
	      // store injection
	      if (options.store) {
	        this.$store = options.store;
	      } else if (options.parent && options.parent.$store) {
	        this.$store = options.parent.$store;
	      }
	    }
	  }
	
	  function mapState(map) {
	    var res = {};
	    (0, _keys2.default)(map).forEach(function (key) {
	      var fn = map[key];
	      res[key] = function mappedState() {
	        return fn.call(this, this.$store.state, this.$store.getters);
	      };
	    });
	    return res;
	  }
	
	  function mapMutations(mutations) {
	    var res = {};
	    normalizeMap(mutations).forEach(function (_ref) {
	      var key = _ref.key;
	      var val = _ref.val;
	
	      res[key] = function mappedMutation() {
	        var _$store;
	
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }
	
	        return (_$store = this.$store).commit.apply(_$store, [val].concat(args));
	      };
	    });
	    return res;
	  }
	
	  function mapGetters(getters) {
	    var res = {};
	    normalizeMap(getters).forEach(function (_ref2) {
	      var key = _ref2.key;
	      var val = _ref2.val;
	
	      res[key] = function mappedGetter() {
	        if (!(val in this.$store.getters)) {
	          console.error("[vuex] unknown getter: " + val);
	        }
	        return this.$store.getters[val];
	      };
	    });
	    return res;
	  }
	
	  function mapActions(actions) {
	    var res = {};
	    normalizeMap(actions).forEach(function (_ref3) {
	      var key = _ref3.key;
	      var val = _ref3.val;
	
	      res[key] = function mappedAction() {
	        var _$store2;
	
	        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	          args[_key2] = arguments[_key2];
	        }
	
	        return (_$store2 = this.$store).dispatch.apply(_$store2, [val].concat(args));
	      };
	    });
	    return res;
	  }
	
	  function normalizeMap(map) {
	    return Array.isArray(map) ? map.map(function (key) {
	      return { key: key, val: key };
	    }) : (0, _keys2.default)(map).map(function (key) {
	      return { key: key, val: map[key] };
	    });
	  }
	
	  var _typeof = typeof _symbol2.default === "function" && (0, _typeof4.default)(_iterator2.default) === "symbol" ? function (obj) {
	    return typeof obj === 'undefined' ? 'undefined' : (0, _typeof4.default)(obj);
	  } : function (obj) {
	    return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === 'undefined' ? 'undefined' : (0, _typeof4.default)(obj);
	  };
	
	  var classCallCheck = function classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	      throw new TypeError("Cannot call a class as a function");
	    }
	  };
	
	  var createClass = function () {
	    function defineProperties(target, props) {
	      for (var i = 0; i < props.length; i++) {
	        var descriptor = props[i];
	        descriptor.enumerable = descriptor.enumerable || false;
	        descriptor.configurable = true;
	        if ("value" in descriptor) descriptor.writable = true;
	        (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	      }
	    }
	
	    return function (Constructor, protoProps, staticProps) {
	      if (protoProps) defineProperties(Constructor.prototype, protoProps);
	      if (staticProps) defineProperties(Constructor, staticProps);
	      return Constructor;
	    };
	  }();
	
	  var Vue = void 0; // bind on install
	
	  var Store = function () {
	    function Store() {
	      var _this = this;
	
	      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	      classCallCheck(this, Store);
	
	      assert(Vue, 'must call Vue.use(Vuex) before creating a store instance.');
	      assert(typeof _promise2.default !== 'undefined', 'vuex requires a Promise polyfill in this browser.');
	
	      var _options$state = options.state;
	      var state = _options$state === undefined ? {} : _options$state;
	      var _options$modules = options.modules;
	      var modules = _options$modules === undefined ? {} : _options$modules;
	      var _options$plugins = options.plugins;
	      var plugins = _options$plugins === undefined ? [] : _options$plugins;
	      var _options$strict = options.strict;
	      var strict = _options$strict === undefined ? false : _options$strict;
	
	      // store internal state
	
	      this._options = options;
	      this._committing = false;
	      this._actions = (0, _create2.default)(null);
	      this._mutations = (0, _create2.default)(null);
	      this._subscribers = [];
	      this._pendingActions = [];
	
	      // bind commit and dispatch to self
	      var store = this;
	      var dispatch = this.dispatch;
	      var commit = this.commit;
	
	      this.dispatch = function boundDispatch(type, payload) {
	        return dispatch.call(store, type, payload);
	      };
	      this.commit = function boundCommit(type, payload) {
	        return commit.call(store, type, payload);
	      };
	
	      // init state and getters
	      var getters = extractModuleGetters(options.getters, modules);
	      initStoreState(this, state, getters);
	
	      // apply root module
	      this.module([], options);
	
	      // strict mode
	      if (strict) enableStrictMode(this);
	
	      // apply plugins
	      plugins.concat(devtoolPlugin).forEach(function (plugin) {
	        return plugin(_this);
	      });
	    }
	
	    createClass(Store, [{
	      key: 'replaceState',
	      value: function replaceState(state) {
	        this._committing = true;
	        this._vm.state = state;
	        this._committing = false;
	      }
	    }, {
	      key: 'module',
	      value: function module(path, _module, hot) {
	        var _this2 = this;
	
	        this._committing = true;
	        if (typeof path === 'string') path = [path];
	        assert(Array.isArray(path), 'module path must be a string or an Array.');
	
	        var isRoot = !path.length;
	        var state = _module.state;
	        var actions = _module.actions;
	        var mutations = _module.mutations;
	        var modules = _module.modules;
	
	        // set state
	
	        if (!isRoot && !hot) {
	          var parentState = getNestedState(this.state, path.slice(0, -1));
	          if (!parentState) debugger;
	          var moduleName = path[path.length - 1];
	          Vue.set(parentState, moduleName, state || {});
	        }
	
	        if (mutations) {
	          (0, _keys2.default)(mutations).forEach(function (key) {
	            _this2.mutation(key, mutations[key], path);
	          });
	        }
	
	        if (actions) {
	          (0, _keys2.default)(actions).forEach(function (key) {
	            _this2.action(key, actions[key], path);
	          });
	        }
	
	        if (modules) {
	          (0, _keys2.default)(modules).forEach(function (key) {
	            _this2.module(path.concat(key), modules[key], hot);
	          });
	        }
	        this._committing = false;
	      }
	    }, {
	      key: 'mutation',
	      value: function mutation(type, handler) {
	        var path = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
	
	        var entry = this._mutations[type] || (this._mutations[type] = []);
	        var store = this;
	        entry.push(function wrappedMutationHandler(payload) {
	          handler(getNestedState(store.state, path), payload);
	        });
	      }
	    }, {
	      key: 'action',
	      value: function action(type, handler) {
	        var path = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
	
	        var entry = this._actions[type] || (this._actions[type] = []);
	        var store = this;
	        var dispatch = this.dispatch;
	        var commit = this.commit;
	
	        entry.push(function wrappedActionHandler(payload, cb) {
	          var res = handler({
	            dispatch: dispatch,
	            commit: commit,
	            getters: store.getters,
	            state: getNestedState(store.state, path),
	            rootState: store.state
	          }, payload, cb);
	          if (!isPromise(res)) {
	            res = _promise2.default.resolve(res);
	          }
	          if (store._devtoolHook) {
	            return res.catch(function (err) {
	              store._devtoolHook.emit('vuex:error', err);
	              throw err;
	            });
	          } else {
	            return res;
	          }
	        });
	      }
	    }, {
	      key: 'commit',
	      value: function commit(type, payload) {
	        var _this3 = this;
	
	        // check object-style commit
	        var mutation = void 0;
	        if (isObject(type) && type.type) {
	          payload = mutation = type;
	          type = type.type;
	        } else {
	          mutation = { type: type, payload: payload };
	        }
	        var entry = this._mutations[type];
	        if (!entry) {
	          console.error('[vuex] unknown mutation type: ' + type);
	          return;
	        }
	        this._committing = true;
	        entry.forEach(function commitIterator(handler) {
	          handler(payload);
	        });
	        this._committing = false;
	        if (!payload || !payload.silent) {
	          this._subscribers.forEach(function (sub) {
	            return sub(mutation, _this3.state);
	          });
	        }
	      }
	    }, {
	      key: 'dispatch',
	      value: function dispatch(type, payload) {
	        var entry = this._actions[type];
	        if (!entry) {
	          console.error('[vuex] unknown action type: ' + type);
	          return;
	        }
	        var res = entry.length > 1 ? _promise2.default.all(entry.map(function (handler) {
	          return handler(payload);
	        })) : entry[0](payload);
	        var pending = this._pendingActions;
	        pending.push(res);
	        return res.then(function (value) {
	          pending.splice(pending.indexOf(res), 1);
	          return value;
	        });
	      }
	    }, {
	      key: 'onActionsResolved',
	      value: function onActionsResolved(cb) {
	        _promise2.default.all(this._pendingActions).then(cb);
	      }
	    }, {
	      key: 'subscribe',
	      value: function subscribe(fn) {
	        var subs = this._subscribers;
	        if (subs.indexOf(fn) < 0) {
	          subs.push(fn);
	        }
	        return function () {
	          var i = subs.indexOf(fn);
	          if (i > -1) {
	            subs.splice(i, 1);
	          }
	        };
	      }
	    }, {
	      key: 'watch',
	      value: function watch(getter, cb, options) {
	        var _this4 = this;
	
	        assert(typeof getter === 'function', 'store.watch only accepts a function.');
	        return this._vm.$watch(function () {
	          return getter(_this4.state);
	        }, cb, options);
	      }
	    }, {
	      key: 'hotUpdate',
	      value: function hotUpdate(newOptions) {
	        var _this5 = this;
	
	        this._actions = (0, _create2.default)(null);
	        this._mutations = (0, _create2.default)(null);
	        var options = this._options;
	        if (newOptions.actions) {
	          options.actions = newOptions.actions;
	        }
	        if (newOptions.mutations) {
	          options.mutations = newOptions.mutations;
	        }
	        if (newOptions.modules) {
	          for (var key in newOptions.modules) {
	            options.modules[key] = newOptions.modules[key];
	          }
	        }
	        this.module([], options, true);
	
	        // update getters
	        var getters = extractModuleGetters(newOptions.getters, newOptions.modules);
	        if ((0, _keys2.default)(getters).length) {
	          (function () {
	            var oldVm = _this5._vm;
	            initStoreState(_this5, _this5.state, getters);
	            if (_this5.strict) {
	              enableStrictMode(_this5);
	            }
	            // dispatch changes in all subscribed watchers
	            // to force getter re-evaluation.
	            _this5._committing = true;
	            oldVm.state = null;
	            _this5._committing = false;
	            Vue.nextTick(function () {
	              return oldVm.$destroy();
	            });
	          })();
	        }
	      }
	    }, {
	      key: 'state',
	      get: function get() {
	        return this._vm.state;
	      },
	      set: function set(v) {
	        assert(false, 'Use store.replaceState() to explicit replace store state.');
	      }
	    }]);
	    return Store;
	  }();
	
	  function assert(condition, msg) {
	    if (!condition) throw new Error('[vuex] ' + msg);
	  }
	
	  function initStoreState(store, state, getters) {
	    // bind getters
	    store.getters = {};
	    var computed = {};
	    (0, _keys2.default)(getters).forEach(function (key) {
	      var fn = getters[key];
	      // use computed to leverage its lazy-caching mechanism
	      computed[key] = function () {
	        return fn(store);
	      };
	      (0, _defineProperty2.default)(store.getters, key, {
	        get: function get() {
	          return store._vm[key];
	        }
	      });
	    });
	
	    // use a Vue instance to store the state tree
	    // suppress warnings just in case the user has added
	    // some funky global mixins
	    var silent = Vue.config.silent;
	    Vue.config.silent = true;
	    store._vm = new Vue({
	      data: { state: state },
	      computed: computed
	    });
	    Vue.config.silent = silent;
	  }
	
	  function extractModuleGetters() {
	    var getters = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var modules = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    var path = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
	
	    if (!path.length) {
	      wrapGetters(getters, getters, path, true);
	    }
	    if (!modules) {
	      return getters;
	    }
	    (0, _keys2.default)(modules).forEach(function (key) {
	      var module = modules[key];
	      var modulePath = path.concat(key);
	      if (module.getters) {
	        wrapGetters(getters, module.getters, modulePath);
	      }
	      extractModuleGetters(getters, module.modules, modulePath);
	    });
	    return getters;
	  }
	
	  function wrapGetters(getters, moduleGetters, modulePath, force) {
	    (0, _keys2.default)(moduleGetters).forEach(function (getterKey) {
	      var rawGetter = moduleGetters[getterKey];
	      if (getters[getterKey] && !force) {
	        console.error('[vuex] duplicate getter key: ' + getterKey);
	        return;
	      }
	      getters[getterKey] = function wrappedGetter(store) {
	        return rawGetter(getNestedState(store.state, modulePath), // local state
	        store.getters, // getters
	        store.state // root state
	        );
	      };
	    });
	  }
	
	  function enableStrictMode(store) {
	    store._vm.$watch('state', function () {
	      assert(store._committing, 'Do not mutate vuex store state outside mutation handlers.');
	    }, { deep: true, sync: true });
	  }
	
	  function isObject(obj) {
	    return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
	  }
	
	  function isPromise(val) {
	    return val && typeof val.then === 'function';
	  }
	
	  function getNestedState(state, path) {
	    return path.length ? path.reduce(function (state, key) {
	      return state[key];
	    }, state) : state;
	  }
	
	  function install(_Vue) {
	    if (Vue) {
	      console.error('[vuex] already installed. Vue.use(Vuex) should be called only once.');
	      return;
	    }
	    Vue = _Vue;
	    applyMixin(Vue);
	  }
	
	  // auto install in dist mode
	  if (typeof window !== 'undefined' && window.Vue) {
	    install(window.Vue);
	  }
	
	  var index = {
	    Store: Store,
	    install: install,
	    mapState: mapState,
	    mapMutations: mapMutations,
	    mapGetters: mapGetters,
	    mapActions: mapActions
	  };
	
	  return index;
	});

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(31), __esModule: true };

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(32);
	var $Object = __webpack_require__(35).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(33)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(48)});

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(34)
	  , core      = __webpack_require__(35)
	  , ctx       = __webpack_require__(36)
	  , hide      = __webpack_require__(38)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 34 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 35 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(37);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(39)
	  , createDesc = __webpack_require__(47);
	module.exports = __webpack_require__(43) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(40)
	  , IE8_DOM_DEFINE = __webpack_require__(42)
	  , toPrimitive    = __webpack_require__(46)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(43) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(41);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(43) && !__webpack_require__(44)(function(){
	  return Object.defineProperty(__webpack_require__(45)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(44)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(41)
	  , document = __webpack_require__(34).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(41);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 47 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(40)
	  , dPs         = __webpack_require__(49)
	  , enumBugKeys = __webpack_require__(64)
	  , IE_PROTO    = __webpack_require__(61)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(45)('iframe')
	    , i      = enumBugKeys.length
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(65).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write('<script>document.F=Object</script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(39)
	  , anObject = __webpack_require__(40)
	  , getKeys  = __webpack_require__(50);
	
	module.exports = __webpack_require__(43) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(51)
	  , enumBugKeys = __webpack_require__(64);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(52)
	  , toIObject    = __webpack_require__(53)
	  , arrayIndexOf = __webpack_require__(57)(false)
	  , IE_PROTO     = __webpack_require__(61)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 52 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(54)
	  , defined = __webpack_require__(56);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(55);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 55 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 56 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(53)
	  , toLength  = __webpack_require__(58)
	  , toIndex   = __webpack_require__(60);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(59)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 59 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(59)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(62)('keys')
	  , uid    = __webpack_require__(63);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(34)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 63 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 64 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(34).document && document.documentElement;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(67), __esModule: true };

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(68);
	__webpack_require__(69);
	__webpack_require__(80);
	__webpack_require__(84);
	module.exports = __webpack_require__(35).Promise;

/***/ },
/* 68 */
/***/ function(module, exports) {



/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(70)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(71)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(59)
	  , defined   = __webpack_require__(56);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(72)
	  , $export        = __webpack_require__(33)
	  , redefine       = __webpack_require__(73)
	  , hide           = __webpack_require__(38)
	  , has            = __webpack_require__(52)
	  , Iterators      = __webpack_require__(74)
	  , $iterCreate    = __webpack_require__(75)
	  , setToStringTag = __webpack_require__(76)
	  , getPrototypeOf = __webpack_require__(78)
	  , ITERATOR       = __webpack_require__(77)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 72 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(38);

/***/ },
/* 74 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(48)
	  , descriptor     = __webpack_require__(47)
	  , setToStringTag = __webpack_require__(76)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(38)(IteratorPrototype, __webpack_require__(77)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(39).f
	  , has = __webpack_require__(52)
	  , TAG = __webpack_require__(77)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(62)('wks')
	  , uid        = __webpack_require__(63)
	  , Symbol     = __webpack_require__(34).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(52)
	  , toObject    = __webpack_require__(79)
	  , IE_PROTO    = __webpack_require__(61)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(56);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(81);
	var global        = __webpack_require__(34)
	  , hide          = __webpack_require__(38)
	  , Iterators     = __webpack_require__(74)
	  , TO_STRING_TAG = __webpack_require__(77)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(82)
	  , step             = __webpack_require__(83)
	  , Iterators        = __webpack_require__(74)
	  , toIObject        = __webpack_require__(53);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(71)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 82 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 83 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(72)
	  , global             = __webpack_require__(34)
	  , ctx                = __webpack_require__(36)
	  , classof            = __webpack_require__(85)
	  , $export            = __webpack_require__(33)
	  , isObject           = __webpack_require__(41)
	  , anObject           = __webpack_require__(40)
	  , aFunction          = __webpack_require__(37)
	  , anInstance         = __webpack_require__(86)
	  , forOf              = __webpack_require__(87)
	  , setProto           = __webpack_require__(91).set
	  , speciesConstructor = __webpack_require__(94)
	  , task               = __webpack_require__(95).set
	  , microtask          = __webpack_require__(97)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;
	
	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(77)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();
	
	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};
	
	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(98)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(76)($Promise, PROMISE);
	__webpack_require__(99)(PROMISE);
	Wrapper = __webpack_require__(35)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(100)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(55)
	  , TAG = __webpack_require__(77)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 86 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(36)
	  , call        = __webpack_require__(88)
	  , isArrayIter = __webpack_require__(89)
	  , anObject    = __webpack_require__(40)
	  , toLength    = __webpack_require__(58)
	  , getIterFn   = __webpack_require__(90)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(40);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(74)
	  , ITERATOR   = __webpack_require__(77)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(85)
	  , ITERATOR  = __webpack_require__(77)('iterator')
	  , Iterators = __webpack_require__(74);
	module.exports = __webpack_require__(35).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(41)
	  , anObject = __webpack_require__(40);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(36)(Function.call, __webpack_require__(92).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(93)
	  , createDesc     = __webpack_require__(47)
	  , toIObject      = __webpack_require__(53)
	  , toPrimitive    = __webpack_require__(46)
	  , has            = __webpack_require__(52)
	  , IE8_DOM_DEFINE = __webpack_require__(42)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(43) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 93 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(40)
	  , aFunction = __webpack_require__(37)
	  , SPECIES   = __webpack_require__(77)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(36)
	  , invoke             = __webpack_require__(96)
	  , html               = __webpack_require__(65)
	  , cel                = __webpack_require__(45)
	  , global             = __webpack_require__(34)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(55)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 96 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(34)
	  , macrotask = __webpack_require__(95).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(55)(process) == 'process';
	
	module.exports = function(){
	  var head, last, notify;
	
	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };
	
	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }
	
	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(38);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(34)
	  , core        = __webpack_require__(35)
	  , dP          = __webpack_require__(39)
	  , DESCRIPTORS = __webpack_require__(43)
	  , SPECIES     = __webpack_require__(77)('species');
	
	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(77)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(102), __esModule: true };

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(103);
	var $Object = __webpack_require__(35).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(33);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(43), 'Object', {defineProperty: __webpack_require__(39).f});

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(105), __esModule: true };

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(69);
	__webpack_require__(80);
	module.exports = __webpack_require__(106).f('iterator');

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(77);

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(108), __esModule: true };

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(109);
	__webpack_require__(68);
	__webpack_require__(118);
	__webpack_require__(119);
	module.exports = __webpack_require__(35).Symbol;

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(34)
	  , has            = __webpack_require__(52)
	  , DESCRIPTORS    = __webpack_require__(43)
	  , $export        = __webpack_require__(33)
	  , redefine       = __webpack_require__(73)
	  , META           = __webpack_require__(110).KEY
	  , $fails         = __webpack_require__(44)
	  , shared         = __webpack_require__(62)
	  , setToStringTag = __webpack_require__(76)
	  , uid            = __webpack_require__(63)
	  , wks            = __webpack_require__(77)
	  , wksExt         = __webpack_require__(106)
	  , wksDefine      = __webpack_require__(111)
	  , keyOf          = __webpack_require__(112)
	  , enumKeys       = __webpack_require__(113)
	  , isArray        = __webpack_require__(115)
	  , anObject       = __webpack_require__(40)
	  , toIObject      = __webpack_require__(53)
	  , toPrimitive    = __webpack_require__(46)
	  , createDesc     = __webpack_require__(47)
	  , _create        = __webpack_require__(48)
	  , gOPNExt        = __webpack_require__(116)
	  , $GOPD          = __webpack_require__(92)
	  , $DP            = __webpack_require__(39)
	  , $keys          = __webpack_require__(50)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(117).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(93).f  = $propertyIsEnumerable;
	  __webpack_require__(114).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(72)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);
	
	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(38)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(63)('meta')
	  , isObject = __webpack_require__(41)
	  , has      = __webpack_require__(52)
	  , setDesc  = __webpack_require__(39).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(44)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(34)
	  , core           = __webpack_require__(35)
	  , LIBRARY        = __webpack_require__(72)
	  , wksExt         = __webpack_require__(106)
	  , defineProperty = __webpack_require__(39).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(50)
	  , toIObject = __webpack_require__(53);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(50)
	  , gOPS    = __webpack_require__(114)
	  , pIE     = __webpack_require__(93);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 114 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(55);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(53)
	  , gOPN      = __webpack_require__(117).f
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(51)
	  , hiddenKeys = __webpack_require__(64).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(111)('asyncIterator');

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(111)('observable');

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(121), __esModule: true };

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(122);
	module.exports = __webpack_require__(35).Object.keys;

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(79)
	  , $keys    = __webpack_require__(50);
	
	__webpack_require__(123)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(33)
	  , core    = __webpack_require__(35)
	  , fails   = __webpack_require__(44);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(104);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(107);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 125 */
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<div id=\"page\">\n  <common-header></common-header>\n  <div id=\"main\" @click=\"init\">\n    <sidebar></sidebar>\n    <workspace></workspace>\n  </div> \n</div>\n";

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _vuex = __webpack_require__(29);
	
	var _vuex2 = _interopRequireDefault(_vuex);
	
	var _pages = __webpack_require__(127);
	
	var _pages2 = _interopRequireDefault(_pages);
	
	var _projects = __webpack_require__(128);
	
	var _projects2 = _interopRequireDefault(_projects);
	
	var _actions = __webpack_require__(129);
	
	var actions = _interopRequireWildcard(_actions);
	
	var _getters = __webpack_require__(133);
	
	var getters = _interopRequireWildcard(_getters);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Vue.use(Vuex)
	Vue.config.debug = true;
	// import Vue from 'vue'
	
	
	exports.default = new _vuex2.default.Store({
	  actions: actions,
	  getters: getters,
	  modules: {
	    pages: _pages2.default,
	    projects: _projects2.default
	  }
	});

/***/ },
/* 127 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var state = {
	  pages: []
	};
	
	var mutations = {
	  LOAD_PAGE_LIST: function LOAD_PAGE_LIST(state, pageList) {
	    state.pages = pageList;
	  }
	};
	
	exports.default = {
	  state: state,
	  mutations: mutations
	};

/***/ },
/* 128 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var state = {
	  projects: []
	};
	
	var mutations = {};
	
	exports.default = {
	  state: state,
	  mutations: mutations
	};

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.init = undefined;
	
	var _page = __webpack_require__(130);
	
	var _page2 = _interopRequireDefault(_page);
	
	var _pageGroup = __webpack_require__(131);
	
	var _pageGroup2 = _interopRequireDefault(_pageGroup);
	
	var _project = __webpack_require__(132);
	
	var _project2 = _interopRequireDefault(_project);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var init = exports.init = function init(_ref) {
	  var commit = _ref.commit;
	
	  _project2.default.list(function (data) {
	    console.log(data);
	  }, function (data) {
	    errorHandler(data.err);
	  });
	};
	
	var errorHandler = function errorHandler(error) {};

/***/ },
/* 130 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	Vue.http.options.root = '/dashboard/page/';
	
	exports.default = {
	  list: function list(groupId, success, error) {
	    var url = 'list?group_id=' + groupId;
	    Vue.http.get(url).then(function (response) {
	      success(response.json());
	    }, function (response) {
	      error(response.json());
	    });
	  },
	  create: function create(groupId, name, success, error) {
	    var url = 'create';
	    var body = {
	      groupId: groupId,
	      name: name
	    };
	    Vue.http.post(url, body).then(function (response) {
	      success(response.json());
	    }, function (response) {
	      error(response.json());
	    });
	  },
	  remove: function remove(pageId, success, error) {
	    var url = 'remove?id=' + pageId;
	    Vue.http.get(url).then(function (response) {
	      success(response.json());
	    }, function (response) {
	      error(response.json());
	    });
	  },
	  rename: function rename(pageId, name, success, error) {
	    var url = 'rename?id=' + pageId + '&name=' + name;
	    Vue.http.get(url).then(function (response) {
	      success(response.json());
	    }, function (response) {
	      error(response.json());
	    });
	  }
	};

/***/ },
/* 131 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	Vue.http.options.root = '/dashboard/page/group/';
	
	exports.default = {
	  list: function list(projectId, success, error) {
	    var url = 'list?projectId=' + projectId;
	    Vue.http.get(url).then(function (response) {
	      success(response.json());
	    }, function (response) {
	      error(response.json());
	    });
	  },
	  create: function create(projectId, name, success, error) {
	    var url = 'create';
	    var body = {
	      projectId: projectId,
	      name: name
	    };
	    Vue.http.post(url, body).then(function (response) {
	      success(response.json());
	    }, function (response) {
	      error(response.json());
	    });
	  },
	  remove: function remove(groupId, success, error) {
	    var url = 'remove?id=' + groupId;
	    Vue.http.get(url).then(function (response) {
	      success(response.json());
	    }, function (response) {
	      error(response.json());
	    });
	  },
	  rename: function rename(groupId, name, success, error) {
	    var url = 'rename?id=' + groupId + '&name=' + name;
	    Vue.http.get(url).then(function (response) {
	      success(response.json());
	    }, function (response) {
	      error(response.json());
	    });
	  }
	};

/***/ },
/* 132 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	Vue.http.options.root = '/dashboard/page/project/';
	
	exports.default = {
	  list: function list(success, error) {
	    var url = 'list';
	    Vue.http.get(url).then(function (response) {
	      success(response.json());
	    }, function (response) {
	      error(response.json());
	    });
	  },
	  create: function create(name, success, error) {
	    var url = 'create';
	    var body = {
	      name: name
	    };
	    Vue.http.post(url, body).then(function (response) {
	      success(response.json());
	    }, function (response) {
	      error(response.json());
	    });
	  },
	  remove: function remove(projectId, success, error) {
	    var url = 'remove?id=' + projectId;
	    Vue.http.get(url).then(function (response) {
	      success(response.json());
	    }, function (response) {
	      error(response.json());
	    });
	  },
	  rename: function rename(projectId, name, success, error) {
	    var url = 'rename?id=' + projectId + '&name=' + name;
	    Vue.http.get(url).then(function (response) {
	      success(response.json());
	    }, function (response) {
	      error(response.json());
	    });
	  }
	};

/***/ },
/* 133 */
/***/ function(module, exports) {

	"use strict";

/***/ }
/******/ ]);
//# sourceMappingURL=dashboard.js.map