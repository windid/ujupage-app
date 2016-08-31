!function(t){function e(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return t[o].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){t.exports=n(1)},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}var r=n(2),i=o(r),s=n(3),a=o(s);Vue.use(i["default"]),Vue.http.headers.common["X-CSRF-TOKEN"]=document.querySelector('meta[name="csrf-token"]').getAttribute("content");new Vue({el:"#page",render:function(t){return t(a["default"])}})},function(t,e){/*!
	 * vue-resource v0.9.3
	 * https://github.com/vuejs/vue-resource
	 * Released under the MIT License.
	 */
"use strict";function n(t){this.state=et,this.value=void 0,this.deferred=[];var e=this;try{t(function(t){e.resolve(t)},function(t){e.reject(t)})}catch(n){e.reject(n)}}function o(t,e){t instanceof ot?this.promise=t:this.promise=new ot(t.bind(e)),this.context=e}function r(t){st=t.util,it=t.config.debug||!t.config.silent}function i(t){"undefined"!=typeof console&&it&&console.warn("[VueResource warn]: "+t)}function s(t){"undefined"!=typeof console&&console.error(t)}function a(t,e){return st.nextTick(t,e)}function u(t){return t.replace(/^\s*|\s*$/g,"")}function c(t){return"string"==typeof t}function d(t){return t===!0||t===!1}function f(t){return"function"==typeof t}function l(t){return null!==t&&"object"==typeof t}function p(t){return l(t)&&Object.getPrototypeOf(t)==Object.prototype}function h(t){return"undefined"!=typeof FormData&&t instanceof FormData}function v(t,e,n){var r=o.resolve(t);return arguments.length<2?r:r.then(e,n)}function m(t,e,n){return n=n||{},f(n)&&(n=n.call(e)),b(t.bind({$vm:e,$options:n}),t,{$options:n})}function g(t,e){var n,o;if("number"==typeof t.length)for(n=0;n<t.length;n++)e.call(t[n],t[n],n);else if(l(t))for(o in t)t.hasOwnProperty(o)&&e.call(t[o],t[o],o);return t}function b(t){var e=at.slice.call(arguments,1);return e.forEach(function(e){x(t,e,!0)}),t}function y(t){var e=at.slice.call(arguments,1);return e.forEach(function(e){for(var n in e)void 0===t[n]&&(t[n]=e[n])}),t}function w(t){var e=at.slice.call(arguments,1);return e.forEach(function(e){x(t,e)}),t}function x(t,e,n){for(var o in e)n&&(p(e[o])||ut(e[o]))?(p(e[o])&&!p(t[o])&&(t[o]={}),ut(e[o])&&!ut(t[o])&&(t[o]=[]),x(t[o],e[o],n)):void 0!==e[o]&&(t[o]=e[o])}function E(t,e){var n=e(t);return c(t.root)&&!n.match(/^(https?:)?\//)&&(n=t.root+"/"+n),n}function T(t,e){var n=Object.keys(R.options.params),o={},r=e(t);return g(t.params,function(t,e){n.indexOf(e)===-1&&(o[e]=t)}),o=R.params(o),o&&(r+=(r.indexOf("?")==-1?"?":"&")+o),r}function j(t,e,n){var o=O(t),r=o.expand(e);return n&&n.push.apply(n,o.vars),r}function O(t){var e=["+","#",".","/",";","?","&"],n=[];return{vars:n,expand:function(o){return t.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g,function(t,r,i){if(r){var s=null,a=[];if(e.indexOf(r.charAt(0))!==-1&&(s=r.charAt(0),r=r.substr(1)),r.split(/,/g).forEach(function(t){var e=/([^:\*]*)(?::(\d+)|(\*))?/.exec(t);a.push.apply(a,C(o,s,e[1],e[2]||e[3])),n.push(e[1])}),s&&"+"!==s){var u=",";return"?"===s?u="&":"#"!==s&&(u=s),(0!==a.length?s:"")+a.join(u)}return a.join(",")}return A(i)})}}}function C(t,e,n,o){var r=t[n],i=[];if(S(r)&&""!==r)if("string"==typeof r||"number"==typeof r||"boolean"==typeof r)r=r.toString(),o&&"*"!==o&&(r=r.substring(0,parseInt(o,10))),i.push(_(e,r,P(e)?n:null));else if("*"===o)Array.isArray(r)?r.filter(S).forEach(function(t){i.push(_(e,t,P(e)?n:null))}):Object.keys(r).forEach(function(t){S(r[t])&&i.push(_(e,r[t],t))});else{var s=[];Array.isArray(r)?r.filter(S).forEach(function(t){s.push(_(e,t))}):Object.keys(r).forEach(function(t){S(r[t])&&(s.push(encodeURIComponent(t)),s.push(_(e,r[t].toString())))}),P(e)?i.push(encodeURIComponent(n)+"="+s.join(",")):0!==s.length&&i.push(s.join(","))}else";"===e?i.push(encodeURIComponent(n)):""!==r||"&"!==e&&"?"!==e?""===r&&i.push(""):i.push(encodeURIComponent(n)+"=");return i}function S(t){return void 0!==t&&null!==t}function P(t){return";"===t||"&"===t||"?"===t}function _(t,e,n){return e="+"===t||"#"===t?A(e):encodeURIComponent(e),n?encodeURIComponent(n)+"="+e:e}function A(t){return t.split(/(%[0-9A-Fa-f]{2})/g).map(function(t){return/%[0-9A-Fa-f]/.test(t)||(t=encodeURI(t)),t}).join("")}function M(t){var e=[],n=j(t.url,t.params,e);return e.forEach(function(e){delete t.params[e]}),n}function R(t,e){var n,o=this||{},r=t;return c(t)&&(r={url:t,params:e}),r=b({},R.options,o.$options,r),R.transforms.forEach(function(t){n=U(t,n,o.$vm)}),n(r)}function U(t,e,n){return function(o){return t.call(n,o,e)}}function k(t,e,n){var o,r=ut(e),i=p(e);g(e,function(e,s){o=l(e)||ut(e),n&&(s=n+"["+(i||o?s:"")+"]"),!n&&r?t.add(e.name,e.value):o?k(t,e,s):t.add(s,e)})}function $(t){return new o(function(e){var n=new XDomainRequest,o=function(o){var r=t.respondWith(n.responseText,{status:n.status,statusText:n.statusText});e(r)};t.abort=function(){return n.abort()},n.open(t.method,t.getUrl(),!0),n.timeout=0,n.onload=o,n.onerror=o,n.ontimeout=function(){},n.onprogress=function(){},n.send(t.getBody())})}function V(t,e){!d(t.crossOrigin)&&L(t)&&(t.crossOrigin=!0),t.crossOrigin&&(pt||(t.client=$),delete t.emulateHTTP),e()}function L(t){var e=R.parse(R(t));return e.protocol!==lt.protocol||e.host!==lt.host}function I(t,e){t.emulateJSON&&p(t.body)&&(t.body=R.params(t.body),t.headers["Content-Type"]="application/x-www-form-urlencoded"),h(t.body)&&delete t.headers["Content-Type"],p(t.body)&&(t.body=JSON.stringify(t.body)),e(function(t){var e=t.headers["Content-Type"];if(c(e)&&0===e.indexOf("application/json"))try{t.data=t.json()}catch(n){t.data=null}else t.data=t.text()})}function N(t){return new o(function(e){var n,o,r=t.jsonp||"callback",i="_jsonp"+Math.random().toString(36).substr(2),s=null;n=function(n){var r=0;"load"===n.type&&null!==s?r=200:"error"===n.type&&(r=404),e(t.respondWith(s,{status:r})),delete window[i],document.body.removeChild(o)},t.params[r]=i,window[i]=function(t){s=JSON.stringify(t)},o=document.createElement("script"),o.src=t.getUrl(),o.type="text/javascript",o.async=!0,o.onload=n,o.onerror=n,document.body.appendChild(o)})}function D(t,e){"JSONP"==t.method&&(t.client=N),e(function(e){"JSONP"==t.method&&(e.data=e.json())})}function B(t,e){f(t.before)&&t.before.call(this,t),e()}function H(t,e){t.emulateHTTP&&/^(PUT|PATCH|DELETE)$/i.test(t.method)&&(t.headers["X-HTTP-Method-Override"]=t.method,t.method="POST"),e()}function q(t,e){t.method=t.method.toUpperCase(),t.headers=ct({},z.headers.common,t.crossOrigin?{}:z.headers.custom,z.headers[t.method.toLowerCase()],t.headers),e()}function J(t,e){var n;t.timeout&&(n=setTimeout(function(){t.abort()},t.timeout)),e(function(t){clearTimeout(n)})}function X(t){return new o(function(e){var n=new XMLHttpRequest,o=function(o){var r=t.respondWith("response"in n?n.response:n.responseText,{status:1223===n.status?204:n.status,statusText:1223===n.status?"No Content":u(n.statusText),headers:F(n.getAllResponseHeaders())});e(r)};t.abort=function(){return n.abort()},n.open(t.method,t.getUrl(),!0),n.timeout=0,n.onload=o,n.onerror=o,t.progress&&("GET"===t.method?n.addEventListener("progress",t.progress):/^(POST|PUT)$/i.test(t.method)&&n.upload.addEventListener("progress",t.progress)),t.credentials===!0&&(n.withCredentials=!0),g(t.headers||{},function(t,e){n.setRequestHeader(e,t)}),n.send(t.getBody())})}function F(t){var e,n,o,r={};return g(u(t).split("\n"),function(t){o=t.indexOf(":"),n=u(t.slice(0,o)),e=u(t.slice(o+1)),r[n]?ut(r[n])?r[n].push(e):r[n]=[r[n],e]:r[n]=e}),r}function W(t){function e(e){return new o(function(o){function a(){n=r.pop(),f(n)?n.call(t,e,u):(i("Invalid interceptor of type "+typeof n+", must be a function"),u())}function u(e){if(f(e))s.unshift(e);else if(l(e))return s.forEach(function(n){e=v(e,function(e){return n.call(t,e)||e})}),void v(e,o);a()}a()},t)}var n,r=[G],s=[];return l(t)||(t=null),e.use=function(t){r.push(t)},e}function G(t,e){var n=t.client||X;e(n(t))}function z(t){var e=this||{},n=W(e.$vm);return y(t||{},e.$options,z.options),z.interceptors.forEach(function(t){n.use(t)}),n(new mt(t)).then(function(t){return t.ok?t:o.reject(t)},function(t){return t instanceof Error&&s(t),o.reject(t)})}function K(t,e,n,o){var r=this||{},i={};return n=ct({},K.actions,n),g(n,function(n,s){n=b({url:t,params:e||{}},o,n),i[s]=function(){return(r.$http||z)(Q(n,arguments))}}),i}function Q(t,e){var n,o=ct({},t),r={};switch(e.length){case 2:r=e[0],n=e[1];break;case 1:/^(POST|PUT|PATCH)$/i.test(o.method)?n=e[0]:r=e[0];break;case 0:break;default:throw"Expected up to 4 arguments [params, body], got "+e.length+" arguments"}return o.body=n,o.params=ct({},o.params,r),o}function Y(t){Y.installed||(r(t),t.url=R,t.http=z,t.resource=K,t.Promise=o,Object.defineProperties(t.prototype,{$url:{get:function(){return m(t.url,this,this.$options.url)}},$http:{get:function(){return m(t.http,this,this.$options.http)}},$resource:{get:function(){return t.resource.bind(this)}},$promise:{get:function(){var e=this;return function(n){return new t.Promise(n,e)}}}}))}var Z=0,tt=1,et=2;n.reject=function(t){return new n(function(e,n){n(t)})},n.resolve=function(t){return new n(function(e,n){e(t)})},n.all=function(t){return new n(function(e,o){function r(n){return function(o){s[n]=o,i+=1,i===t.length&&e(s)}}var i=0,s=[];0===t.length&&e(s);for(var a=0;a<t.length;a+=1)n.resolve(t[a]).then(r(a),o)})},n.race=function(t){return new n(function(e,o){for(var r=0;r<t.length;r+=1)n.resolve(t[r]).then(e,o)})};var nt=n.prototype;nt.resolve=function(t){var e=this;if(e.state===et){if(t===e)throw new TypeError("Promise settled with itself.");var n=!1;try{var o=t&&t.then;if(null!==t&&"object"==typeof t&&"function"==typeof o)return void o.call(t,function(t){n||e.resolve(t),n=!0},function(t){n||e.reject(t),n=!0})}catch(r){return void(n||e.reject(r))}e.state=Z,e.value=t,e.notify()}},nt.reject=function(t){var e=this;if(e.state===et){if(t===e)throw new TypeError("Promise settled with itself.");e.state=tt,e.value=t,e.notify()}},nt.notify=function(){var t=this;a(function(){if(t.state!==et)for(;t.deferred.length;){var e=t.deferred.shift(),n=e[0],o=e[1],r=e[2],i=e[3];try{t.state===Z?r("function"==typeof n?n.call(void 0,t.value):t.value):t.state===tt&&("function"==typeof o?r(o.call(void 0,t.value)):i(t.value))}catch(s){i(s)}}})},nt.then=function(t,e){var o=this;return new n(function(n,r){o.deferred.push([t,e,n,r]),o.notify()})},nt["catch"]=function(t){return this.then(void 0,t)};var ot=window.Promise||n;o.all=function(t,e){return new o(ot.all(t),e)},o.resolve=function(t,e){return new o(ot.resolve(t),e)},o.reject=function(t,e){return new o(ot.reject(t),e)},o.race=function(t,e){return new o(ot.race(t),e)};var rt=o.prototype;rt.bind=function(t){return this.context=t,this},rt.then=function(t,e){return t&&t.bind&&this.context&&(t=t.bind(this.context)),e&&e.bind&&this.context&&(e=e.bind(this.context)),new o(this.promise.then(t,e),this.context)},rt["catch"]=function(t){return t&&t.bind&&this.context&&(t=t.bind(this.context)),new o(this.promise["catch"](t),this.context)},rt["finally"]=function(t){return this.then(function(e){return t.call(this),e},function(e){return t.call(this),ot.reject(e)})};var it=!1,st={},at=[],ut=Array.isArray,ct=Object.assign||w,dt=document.documentMode,ft=document.createElement("a");R.options={url:"",root:null,params:{}},R.transforms=[M,T,E],R.params=function(t){var e=[],n=encodeURIComponent;return e.add=function(t,e){f(e)&&(e=e()),null===e&&(e=""),this.push(n(t)+"="+n(e))},k(e,t),e.join("&").replace(/%20/g,"+")},R.parse=function(t){return dt&&(ft.href=t,t=ft.href),ft.href=t,{href:ft.href,protocol:ft.protocol?ft.protocol.replace(/:$/,""):"",port:ft.port,host:ft.host,hostname:ft.hostname,pathname:"/"===ft.pathname.charAt(0)?ft.pathname:"/"+ft.pathname,search:ft.search?ft.search.replace(/^\?/,""):"",hash:ft.hash?ft.hash.replace(/^#/,""):""}};var lt=R.parse(location.href),pt="withCredentials"in new XMLHttpRequest,ht=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},vt=function(){function t(e,n){var o=n.url,r=n.headers,i=n.status,s=n.statusText;ht(this,t),this.url=o,this.body=e,this.headers=r||{},this.status=i||0,this.statusText=s||"",this.ok=i>=200&&i<300}return t.prototype.text=function(){return this.body},t.prototype.blob=function(){return new Blob([this.body])},t.prototype.json=function(){return JSON.parse(this.body)},t}(),mt=function(){function t(e){ht(this,t),this.method="GET",this.body=null,this.params={},this.headers={},ct(this,e)}return t.prototype.getUrl=function(){return R(this)},t.prototype.getBody=function(){return this.body},t.prototype.respondWith=function(t,e){return new vt(t,ct(e||{},{url:this.getUrl()}))},t}(),gt={"X-Requested-With":"XMLHttpRequest"},bt={Accept:"application/json, text/plain, */*"},yt={"Content-Type":"application/json;charset=utf-8"};z.options={},z.headers={put:yt,post:yt,patch:yt,"delete":yt,custom:gt,common:bt},z.interceptors=[B,J,H,I,D,q,V],["get","delete","head","jsonp"].forEach(function(t){z[t]=function(e,n){return this(ct(n||{},{url:e,method:t}))}}),["post","put","patch"].forEach(function(t){z[t]=function(e,n,o){return this(ct(o||{},{url:e,method:t,body:n}))}}),K.actions={get:{method:"GET"},save:{method:"POST"},query:{method:"GET"},update:{method:"PUT"},remove:{method:"DELETE"},"delete":{method:"DELETE"}},"undefined"!=typeof window&&window.Vue&&window.Vue.use(Y),t.exports=Y},function(t,e,n){var o,r;n(4),o=n(8),r=n(17),t.exports=o||{},t.exports.__esModule&&(t.exports=t.exports["default"]),r&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=r)},function(t,e,n){var o=n(5);"string"==typeof o&&(o=[[t.id,o,""]]);n(7)(o,{});o.locals&&(t.exports=o.locals)},function(t,e,n){e=t.exports=n(6)(),e.push([t.id,"#header{z-index:100;height:45px;padding:4px 20px;width:100%;min-width:960px;position:relative;border-top:1px solid #ddd;border-bottom:1px solid #ddd;background:#f9f9f9;box-shadow:0 0 8px #ddd}.version-switch{margin-left:20px}.pc-iframe{position:absolute;top:45px;bottom:0;width:100%;height:calc(100% - 45px)}.mobile-preview{position:relative;top:20px;width:100%;text-align:center}.mobile-iframe{overflow-x:hidden;overflow-y:scroll;z-index:3;display:block;border:none;height:667px;width:375px;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0}",""])},function(t,e){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var n=this[e];n[2]?t.push("@media "+n[2]+"{"+n[1]+"}"):t.push(n[1])}return t.join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var o={},r=0;r<this.length;r++){var i=this[r][0];"number"==typeof i&&(o[i]=!0)}for(r=0;r<e.length;r++){var s=e[r];"number"==typeof s[0]&&o[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),t.push(s))}},t}},function(t,e,n){function o(t,e){for(var n=0;n<t.length;n++){var o=t[n],r=f[o.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](o.parts[i]);for(;i<o.parts.length;i++)r.parts.push(u(o.parts[i],e))}else{for(var s=[],i=0;i<o.parts.length;i++)s.push(u(o.parts[i],e));f[o.id]={id:o.id,refs:1,parts:s}}}}function r(t){for(var e=[],n={},o=0;o<t.length;o++){var r=t[o],i=r[0],s=r[1],a=r[2],u=r[3],c={css:s,media:a,sourceMap:u};n[i]?n[i].parts.push(c):e.push(n[i]={id:i,parts:[c]})}return e}function i(t,e){var n=h(),o=g[g.length-1];if("top"===t.insertAt)o?o.nextSibling?n.insertBefore(e,o.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),g.push(e);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(e)}}function s(t){t.parentNode.removeChild(t);var e=g.indexOf(t);e>=0&&g.splice(e,1)}function a(t){var e=document.createElement("style");return e.type="text/css",i(t,e),e}function u(t,e){var n,o,r;if(e.singleton){var i=m++;n=v||(v=a(e)),o=c.bind(null,n,i,!1),r=c.bind(null,n,i,!0)}else n=a(e),o=d.bind(null,n),r=function(){s(n)};return o(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;o(t=e)}else r()}}function c(t,e,n,o){var r=n?"":o.css;if(t.styleSheet)t.styleSheet.cssText=b(e,r);else{var i=document.createTextNode(r),s=t.childNodes;s[e]&&t.removeChild(s[e]),s.length?t.insertBefore(i,s[e]):t.appendChild(i)}}function d(t,e){var n=e.css,o=e.media,r=e.sourceMap;if(o&&t.setAttribute("media",o),r&&(n+="\n/*# sourceURL="+r.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */"),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var f={},l=function(t){var e;return function(){return"undefined"==typeof e&&(e=t.apply(this,arguments)),e}},p=l(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),h=l(function(){return document.head||document.getElementsByTagName("head")[0]}),v=null,m=0,g=[];t.exports=function(t,e){e=e||{},"undefined"==typeof e.singleton&&(e.singleton=p()),"undefined"==typeof e.insertAt&&(e.insertAt="bottom");var n=r(t);return o(n,e),function(t){for(var i=[],s=0;s<n.length;s++){var a=n[s],u=f[a.id];u.refs--,i.push(u)}if(t){var c=r(t);o(c,e)}for(var s=0;s<i.length;s++){var u=i[s];if(0===u.refs){for(var d=0;d<u.parts.length;d++)u.parts[d]();delete f[u.id]}}}};var b=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(9),i=o(r),s=n(15),a=o(s),u=n(16),c=o(u);e["default"]={components:{dropdown:i["default"]},data:function(){return{variations:[],currentVariation:!1,version:"mobile",show:!1,loadStatus:"loading"}},methods:{init:function(){var t=this,e=parseInt((0,a["default"])("pid")),n=parseInt((0,a["default"])("vid"));c["default"].list(e,function(e){t.variations=e,n&&(t.currentVariation=t.variations.filter(function(t){return t.id==n})[0]),t.currentVariation||(t.currentVariation=t.variations[0]),t.loadStatus="done"},function(){})},switchVariation:function(t){this.currentVariation=t,this.show=!1}},created:function(){this.init()}}},function(t,e,n){var o,r;n(10),o=n(12),r=n(14),t.exports=o||{},t.exports.__esModule&&(t.exports=t.exports["default"]),r&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=r)},function(t,e,n){var o=n(11);"string"==typeof o&&(o=[[t.id,o,""]]);n(7)(o,{});o.locals&&(t.exports=o.locals)},function(t,e,n){e=t.exports=n(6)(),e.push([t.id,".dropdown-enter-active,.dropdown-leave-active{-webkit-transition:all .3s ease;transition:all .3s ease;overflow:hidden}.dropdown-enter,.dropdown-leave-active{opacity:0}",""])},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(13),i=o(r);e["default"]={props:{show:Boolean,dir:{type:String,"default":"down"}},methods:{toggleDropdown:function(t){t.preventDefault(),this.$emit("toggle")}},mounted:function(){var t=this,e=this.$el,n=e.querySelector('[data-toggle="dropdown"]');n&&n.addEventListener("click",this.toggleDropdown),this._closeEvent=i["default"].listen(window,"click",function(n){!e.contains(n.target)&&t.show&&t.toggleDropdown(n)})},beforeDestroy:function(){this._closeEvent&&this._closeEvent.remove()}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={listen:function(t,e,n){return t.addEventListener?(t.addEventListener(e,n,!1),{remove:function(){t.removeEventListener(e,n,!1)}}):t.attachEvent?(t.attachEvent("on"+e,n),{remove:function(){t.detachEvent("on"+e,n)}}):void 0}};e["default"]=n},function(t,e){t.exports=" <div class=btn-group v-bind:class=\"{open:show,dropup:(dir === 'up')}\"> <slot></slot> <slot name=dropdown-menu></slot> </div> "},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(t){var e=new RegExp(t+"=([^&#]*)","i"),n=e.exec(location.href);return null==n?null:decodeURI(n[1])};e["default"]=n},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={list:function(t,e,n){var o="page/variation/list/"+t;Vue.http.get(o).then(function(t){return e(t.json().variations)},function(t){return n(t.json())})}}},function(t,e){t.exports=' <div id=page> <div id=header> <dropdown :show=show @toggle="show = !show"> <div class="btn btn-default btn dropdown-toggle" data-toggle=dropdown> {{currentVariation.name}} &nbsp; <span class=caret></span> </div> <ul slot=dropdown-menu class=dropdown-menu> <li v-for="variation in variations"> <a href=# class=variation-name @click=switchVariation(variation)>{{variation.name}}</a> </li> </ul> </dropdown> <div class="btn-group version-switch"> <div class="btn btn-default" v-bind:class="{\'active\':version==\'pc\'}" @click="version = \'pc\'">桌面版 <span class="glyphicon glyphicon-blackboard"></span></div> <div class="btn btn-default" v-bind:class="{\'active\':version==\'mobile\'}" @click="version = \'mobile\'">移动版 <span class="glyphicon glyphicon-phone"></span></div> </div> </div> <div v-if="loadStatus === \'loading\'" class=loading></div> <div v-if="loadStatus === \'done\'" id=main> <iframe v-show="version === \'pc\'" class=pc-iframe :src="\'/editor/preview/variation/\'+currentVariation.id" frameborder=0></iframe> <div v-show="version === \'mobile\'" class=mobile-preview> <div class="marvel-device iphone6 silver"> <div class=top-bar></div> <div class=sleep></div> <div class=volume></div> <div class=camera></div> <div class=sensor></div> <div class=speaker></div> <div class=screen></div> <div class=home></div> <div class=bottom-bar></div> <iframe class=mobile-iframe :src="\'/editor/preview/variation/\'+currentVariation.id" frameborder=0></iframe> </div> </div> </div> </div> '}]);