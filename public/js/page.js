!function(t){function e(n){if(i[n])return i[n].exports;var r=i[n]={exports:{},id:n,loaded:!1};return t[n].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var i={};return e.m=t,e.c=i,e.p="",e(0)}([function(t,e,i){t.exports=i(1)},function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}var r=i(2),s=(n(r),i(4)),a=(n(s),{init:function(){a.parseFrom(),$(".msg-close").click(function(){$(".msg-mask").hide()})},parseFrom:function(){$("form").each(function(){var t=$(this);t.validate({submitHandler:function(){$.ajax({url:"http://www.juyepage.com/post",dataType:"jsonp",jsonpCallback:"callback",data:t.serialize(),success:function(e){var i=t.attr("redirect");i?window.location=i:a.showMsg(t.attr("msg"))},error:function(t){a.showMsg("表单提交失败，请稍后再试。")}})}});var e=t.find(".label-inside");e.each(function(){var t=$(this),e=$("#"+t.attr("for"));e.focus(function(){t.hide()}),e.blur(function(){0===this.value.length&&t.show()})})})},showMsg:function(t){var e=$(".msg-mask"),i=$(".msg-body");i.html(t),e.show()}});$(document).ready(function(){a.init()}),function(){function t(){this.expireDateTime=null,this.trackUrl="http://ujupage.cn-hangzhou.sls.aliyuncs.com/logstores/stats/track.gif?APIVersion=0.6.0",this.commonParams={}}function e(){var t=s.get("uju_cid");return t||(t=i(16),s.set("uju_cid",t,365)),t}function i(t){for(var e="0123456789abcdefghijklmnopqrstuvwxyz",i="",n=0;n<t;n++)i+=e.charAt(Math.ceil(1e8*Math.random())%e.length);return i}function n(t,e,i){t.attachEvent?(t["e"+e+i]=i,t[e+i]=function(){t["e"+e+i](window.event)},t.attachEvent("on"+e,t[e+i])):t.addEventListener&&t.addEventListener(e,i,!1)}function r(){var t="";try{t=window.top.document.referrer}catch(e){if(window.parent)try{t=window.parent.document.referrer}catch(i){t=""}}return""===t&&(t=document.referrer),t}t.prototype={init:function(t,i){this.commonParams.pid=t,this.commonParams.vid=i,this.commonParams.cid=e(),this.trackPageView(),this.trackLinks(),n(window,"beforeunload",this.beforeUnloadHandler)},trackPageView:function(){var t=arguments.length<=0||void 0===arguments[0]?"":arguments[0],e=arguments.length<=1||void 0===arguments[1]?"":arguments[1];this.commonParams.url=t||window.location.href,this.commonParams.rf=e||r();var i={};i.ua=navigator.userAgent,i.sr=window.screen.width+"*"+window.screen.height,i.bw=Math.max(document.documentElement.clientWidth,window.innerWidth||0),i.bh=Math.max(document.documentElement.clientHeight,window.innerHeight||0),i.ce=navigator.cookieEnabled?1:0,i.type="pageview",this.commonParams.ver=i.bw>620?"pc":"mobile",this.sendRequest(i)},trackLinks:function(){var t=document.links;if(t){var e={type:"link"},i=this;for(var r in t)t[r].hostname&&n(t[r],"click",function(){e.goal=1,e.target=this.href,i.sendRequest(e,200)})}},trackEvent:function(t){var e=arguments.length<=1||void 0===arguments[1]?0:arguments[1],i={};i.c=t[0]||"",i.a=t[1]||"",i.l=t[2]||"",i.v=t[3]||"",i.n=t[4]||"",i.type="event",i.goal=e,this.sendRequest(i)},sendRequest:function(t){var e=arguments.length<=1||void 0===arguments[1]?null:arguments[1],i=this.trackUrl;for(var n in this.commonParams)i+="&"+n+"="+encodeURIComponent(this.commonParams[n]);for(var r in t)i+="&"+r+"="+encodeURIComponent(t[r]);if(i+="&r="+String(Math.random()).slice(2,8),e){var s=new Date;this.expireDateTime=s.getTime()+e}var a=new window.Image(1,1);a.onload=function(){},a.src=i},beforeUnloadHandler:function(){var t;if(window.JuyeTracker.expireDateTime)do t=new Date;while(t.getTime()<window.JuyeTracker.expireDateTime)}},window.JuyeTracker||(window.JuyeTracker=new t);var s={get:function(t){var e=document.cookie.match(new RegExp("(^| )"+t+"=([^;]*)(;|$)"));return null!=e?unescape(e[2]):null},set:function(t,e,i){var n="";if(i){var r=new Date;r.setTime(r.getTime()+24*i*60*60*1e3),n="; expires="+r.toGMTString()}document.cookie=t+"="+e+n+"; path=/"}}}()},function(t,e,i){var n,r,s;/*!
	 * jQuery Validation Plugin v1.15.1
	 *
	 * http://jqueryvalidation.org/
	 *
	 * Copyright (c) 2016 Jörn Zaefferer
	 * Released under the MIT license
	 */
!function(a){r=[i(3)],n=a,s="function"==typeof n?n.apply(e,r):n,!(void 0!==s&&(t.exports=s))}(function(t){t.extend(t.fn,{validate:function(e){if(!this.length)return void(e&&e.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));var i=t.data(this[0],"validator");return i?i:(this.attr("novalidate","novalidate"),i=new t.validator(e,this[0]),t.data(this[0],"validator",i),i.settings.onsubmit&&(this.on("click.validate",":submit",function(e){i.settings.submitHandler&&(i.submitButton=e.target),t(this).hasClass("cancel")&&(i.cancelSubmit=!0),void 0!==t(this).attr("formnovalidate")&&(i.cancelSubmit=!0)}),this.on("submit.validate",function(e){function n(){var n,r;return!i.settings.submitHandler||(i.submitButton&&(n=t("<input type='hidden'/>").attr("name",i.submitButton.name).val(t(i.submitButton).val()).appendTo(i.currentForm)),r=i.settings.submitHandler.call(i,i.currentForm,e),i.submitButton&&n.remove(),void 0!==r&&r)}return i.settings.debug&&e.preventDefault(),i.cancelSubmit?(i.cancelSubmit=!1,n()):i.form()?i.pendingRequest?(i.formSubmitted=!0,!1):n():(i.focusInvalid(),!1)})),i)},valid:function(){var e,i,n;return t(this[0]).is("form")?e=this.validate().form():(n=[],e=!0,i=t(this[0].form).validate(),this.each(function(){e=i.element(this)&&e,e||(n=n.concat(i.errorList))}),i.errorList=n),e},rules:function(e,i){var n,r,s,a,o,l,h=this[0];if(null!=h&&null!=h.form){if(e)switch(n=t.data(h.form,"validator").settings,r=n.rules,s=t.validator.staticRules(h),e){case"add":t.extend(s,t.validator.normalizeRule(i)),delete s.messages,r[h.name]=s,i.messages&&(n.messages[h.name]=t.extend(n.messages[h.name],i.messages));break;case"remove":return i?(l={},t.each(i.split(/\s/),function(e,i){l[i]=s[i],delete s[i],"required"===i&&t(h).removeAttr("aria-required")}),l):(delete r[h.name],s)}return a=t.validator.normalizeRules(t.extend({},t.validator.classRules(h),t.validator.attributeRules(h),t.validator.dataRules(h),t.validator.staticRules(h)),h),a.required&&(o=a.required,delete a.required,a=t.extend({required:o},a),t(h).attr("aria-required","true")),a.remote&&(o=a.remote,delete a.remote,a=t.extend(a,{remote:o})),a}}}),t.extend(t.expr[":"],{blank:function(e){return!t.trim(""+t(e).val())},filled:function(e){var i=t(e).val();return null!==i&&!!t.trim(""+i)},unchecked:function(e){return!t(e).prop("checked")}}),t.validator=function(e,i){this.settings=t.extend(!0,{},t.validator.defaults,e),this.currentForm=i,this.init()},t.validator.format=function(e,i){return 1===arguments.length?function(){var i=t.makeArray(arguments);return i.unshift(e),t.validator.format.apply(this,i)}:void 0===i?e:(arguments.length>2&&i.constructor!==Array&&(i=t.makeArray(arguments).slice(1)),i.constructor!==Array&&(i=[i]),t.each(i,function(t,i){e=e.replace(new RegExp("\\{"+t+"\\}","g"),function(){return i})}),e)},t.extend(t.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",pendingClass:"pending",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:t([]),errorLabelContainer:t([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(t){this.lastActive=t,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,t,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(t)))},onfocusout:function(t){this.checkable(t)||!(t.name in this.submitted)&&this.optional(t)||this.element(t)},onkeyup:function(e,i){var n=[16,17,18,20,35,36,37,38,39,40,45,144,225];9===i.which&&""===this.elementValue(e)||t.inArray(i.keyCode,n)!==-1||(e.name in this.submitted||e.name in this.invalid)&&this.element(e)},onclick:function(t){t.name in this.submitted?this.element(t):t.parentNode.name in this.submitted&&this.element(t.parentNode)},highlight:function(e,i,n){"radio"===e.type?this.findByName(e.name).addClass(i).removeClass(n):t(e).addClass(i).removeClass(n)},unhighlight:function(e,i,n){"radio"===e.type?this.findByName(e.name).removeClass(i).addClass(n):t(e).removeClass(i).addClass(n)}},setDefaults:function(e){t.extend(t.validator.defaults,e)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",equalTo:"Please enter the same value again.",maxlength:t.validator.format("Please enter no more than {0} characters."),minlength:t.validator.format("Please enter at least {0} characters."),rangelength:t.validator.format("Please enter a value between {0} and {1} characters long."),range:t.validator.format("Please enter a value between {0} and {1}."),max:t.validator.format("Please enter a value less than or equal to {0}."),min:t.validator.format("Please enter a value greater than or equal to {0}."),step:t.validator.format("Please enter a multiple of {0}.")},autoCreateRanges:!1,prototype:{init:function(){function e(e){!this.form&&this.hasAttribute("contenteditable")&&(this.form=t(this).closest("form")[0]);var i=t.data(this.form,"validator"),n="on"+e.type.replace(/^validate/,""),r=i.settings;r[n]&&!t(this).is(r.ignore)&&r[n].call(i,this,e)}this.labelContainer=t(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||t(this.currentForm),this.containers=t(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var i,n=this.groups={};t.each(this.settings.groups,function(e,i){"string"==typeof i&&(i=i.split(/\s/)),t.each(i,function(t,i){n[i]=e})}),i=this.settings.rules,t.each(i,function(e,n){i[e]=t.validator.normalizeRule(n)}),t(this.currentForm).on("focusin.validate focusout.validate keyup.validate",":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable]",e).on("click.validate","select, option, [type='radio'], [type='checkbox']",e),this.settings.invalidHandler&&t(this.currentForm).on("invalid-form.validate",this.settings.invalidHandler),t(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},form:function(){return this.checkForm(),t.extend(this.submitted,this.errorMap),this.invalid=t.extend({},this.errorMap),this.valid()||t(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var t=0,e=this.currentElements=this.elements();e[t];t++)this.check(e[t]);return this.valid()},element:function(e){var i,n,r=this.clean(e),s=this.validationTargetFor(r),a=this,o=!0;return void 0===s?delete this.invalid[r.name]:(this.prepareElement(s),this.currentElements=t(s),n=this.groups[s.name],n&&t.each(this.groups,function(t,e){e===n&&t!==s.name&&(r=a.validationTargetFor(a.clean(a.findByName(t))),r&&r.name in a.invalid&&(a.currentElements.push(r),o=a.check(r)&&o))}),i=this.check(s)!==!1,o=o&&i,i?this.invalid[s.name]=!1:this.invalid[s.name]=!0,this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),t(e).attr("aria-invalid",!i)),o},showErrors:function(e){if(e){var i=this;t.extend(this.errorMap,e),this.errorList=t.map(this.errorMap,function(t,e){return{message:t,element:i.findByName(e)[0]}}),this.successList=t.grep(this.successList,function(t){return!(t.name in e)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){t.fn.resetForm&&t(this.currentForm).resetForm(),this.invalid={},this.submitted={},this.prepareForm(),this.hideErrors();var e=this.elements().removeData("previousValue").removeAttr("aria-invalid");this.resetElements(e)},resetElements:function(t){var e;if(this.settings.unhighlight)for(e=0;t[e];e++)this.settings.unhighlight.call(this,t[e],this.settings.errorClass,""),this.findByName(t[e].name).removeClass(this.settings.validClass);else t.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(t){var e,i=0;for(e in t)t[e]&&i++;return i},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(t){t.not(this.containers).text(""),this.addWrapper(t).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{t(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(e){}},findLastActive:function(){var e=this.lastActive;return e&&1===t.grep(this.errorList,function(t){return t.element.name===e.name}).length&&e},elements:function(){var e=this,i={};return t(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function(){var n=this.name||t(this).attr("name");return!n&&e.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.hasAttribute("contenteditable")&&(this.form=t(this).closest("form")[0]),!(n in i||!e.objectLength(t(this).rules()))&&(i[n]=!0,!0)})},clean:function(e){return t(e)[0]},errors:function(){var e=this.settings.errorClass.split(" ").join(".");return t(this.settings.errorElement+"."+e,this.errorContext)},resetInternals:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=t([]),this.toHide=t([])},reset:function(){this.resetInternals(),this.currentElements=t([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(t){this.reset(),this.toHide=this.errorsFor(t)},elementValue:function(e){var i,n,r=t(e),s=e.type;return"radio"===s||"checkbox"===s?this.findByName(e.name).filter(":checked").val():"number"===s&&"undefined"!=typeof e.validity?e.validity.badInput?"NaN":r.val():(i=e.hasAttribute("contenteditable")?r.text():r.val(),"file"===s?"C:\\fakepath\\"===i.substr(0,12)?i.substr(12):(n=i.lastIndexOf("/"),n>=0?i.substr(n+1):(n=i.lastIndexOf("\\"),n>=0?i.substr(n+1):i)):"string"==typeof i?i.replace(/\r/g,""):i)},check:function(e){e=this.validationTargetFor(this.clean(e));var i,n,r,s=t(e).rules(),a=t.map(s,function(t,e){return e}).length,o=!1,l=this.elementValue(e);if("function"==typeof s.normalizer){if(l=s.normalizer.call(e,l),"string"!=typeof l)throw new TypeError("The normalizer should return a string value.");delete s.normalizer}for(n in s){r={method:n,parameters:s[n]};try{if(i=t.validator.methods[n].call(this,l,e,r.parameters),"dependency-mismatch"===i&&1===a){o=!0;continue}if(o=!1,"pending"===i)return void(this.toHide=this.toHide.not(this.errorsFor(e)));if(!i)return this.formatAndAdd(e,r),!1}catch(h){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+e.id+", check the '"+r.method+"' method.",h),h instanceof TypeError&&(h.message+=".  Exception occurred when checking element "+e.id+", check the '"+r.method+"' method."),h}}if(!o)return this.objectLength(s)&&this.successList.push(e),!0},customDataMessage:function(e,i){return t(e).data("msg"+i.charAt(0).toUpperCase()+i.substring(1).toLowerCase())||t(e).data("msg")},customMessage:function(t,e){var i=this.settings.messages[t];return i&&(i.constructor===String?i:i[e])},findDefined:function(){for(var t=0;t<arguments.length;t++)if(void 0!==arguments[t])return arguments[t]},defaultMessage:function(e,i){"string"==typeof i&&(i={method:i});var n=this.findDefined(this.customMessage(e.name,i.method),this.customDataMessage(e,i.method),!this.settings.ignoreTitle&&e.title||void 0,t.validator.messages[i.method],"<strong>Warning: No message defined for "+e.name+"</strong>"),r=/\$?\{(\d+)\}/g;return"function"==typeof n?n=n.call(this,i.parameters,e):r.test(n)&&(n=t.validator.format(n.replace(r,"{$1}"),i.parameters)),n},formatAndAdd:function(t,e){var i=this.defaultMessage(t,e);this.errorList.push({message:i,element:t,method:e.method}),this.errorMap[t.name]=i,this.submitted[t.name]=i},addWrapper:function(t){return this.settings.wrapper&&(t=t.add(t.parent(this.settings.wrapper))),t},defaultShowErrors:function(){var t,e,i;for(t=0;this.errorList[t];t++)i=this.errorList[t],this.settings.highlight&&this.settings.highlight.call(this,i.element,this.settings.errorClass,this.settings.validClass),this.showLabel(i.element,i.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(t=0;this.successList[t];t++)this.showLabel(this.successList[t]);if(this.settings.unhighlight)for(t=0,e=this.validElements();e[t];t++)this.settings.unhighlight.call(this,e[t],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return t(this.errorList).map(function(){return this.element})},showLabel:function(e,i){var n,r,s,a,o=this.errorsFor(e),l=this.idOrName(e),h=t(e).attr("aria-describedby");o.length?(o.removeClass(this.settings.validClass).addClass(this.settings.errorClass),o.html(i)):(o=t("<"+this.settings.errorElement+">").attr("id",l+"-error").addClass(this.settings.errorClass).html(i||""),n=o,this.settings.wrapper&&(n=o.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(n):this.settings.errorPlacement?this.settings.errorPlacement.call(this,n,t(e)):n.insertAfter(e),o.is("label")?o.attr("for",l):0===o.parents("label[for='"+this.escapeCssMeta(l)+"']").length&&(s=o.attr("id"),h?h.match(new RegExp("\\b"+this.escapeCssMeta(s)+"\\b"))||(h+=" "+s):h=s,t(e).attr("aria-describedby",h),r=this.groups[e.name],r&&(a=this,t.each(a.groups,function(e,i){i===r&&t("[name='"+a.escapeCssMeta(e)+"']",a.currentForm).attr("aria-describedby",o.attr("id"))})))),!i&&this.settings.success&&(o.text(""),"string"==typeof this.settings.success?o.addClass(this.settings.success):this.settings.success(o,e)),this.toShow=this.toShow.add(o)},errorsFor:function(e){var i=this.escapeCssMeta(this.idOrName(e)),n=t(e).attr("aria-describedby"),r="label[for='"+i+"'], label[for='"+i+"'] *";return n&&(r=r+", #"+this.escapeCssMeta(n).replace(/\s+/g,", #")),this.errors().filter(r)},escapeCssMeta:function(t){return t.replace(/([\\!"#$%&'()*+,.\/:;<=>?@\[\]^`{|}~])/g,"\\$1")},idOrName:function(t){return this.groups[t.name]||(this.checkable(t)?t.name:t.id||t.name)},validationTargetFor:function(e){return this.checkable(e)&&(e=this.findByName(e.name)),t(e).not(this.settings.ignore)[0]},checkable:function(t){return/radio|checkbox/i.test(t.type)},findByName:function(e){return t(this.currentForm).find("[name='"+this.escapeCssMeta(e)+"']")},getLength:function(e,i){switch(i.nodeName.toLowerCase()){case"select":return t("option:selected",i).length;case"input":if(this.checkable(i))return this.findByName(i.name).filter(":checked").length}return e.length},depend:function(t,e){return!this.dependTypes[typeof t]||this.dependTypes[typeof t](t,e)},dependTypes:{"boolean":function(t){return t},string:function(e,i){return!!t(e,i.form).length},"function":function(t,e){return t(e)}},optional:function(e){var i=this.elementValue(e);return!t.validator.methods.required.call(this,i,e)&&"dependency-mismatch"},startRequest:function(e){this.pending[e.name]||(this.pendingRequest++,t(e).addClass(this.settings.pendingClass),this.pending[e.name]=!0)},stopRequest:function(e,i){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[e.name],t(e).removeClass(this.settings.pendingClass),i&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(t(this.currentForm).submit(),this.formSubmitted=!1):!i&&0===this.pendingRequest&&this.formSubmitted&&(t(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(e,i){return i="string"==typeof i&&i||"remote",t.data(e,"previousValue")||t.data(e,"previousValue",{old:null,valid:!0,message:this.defaultMessage(e,{method:i})})},destroy:function(){this.resetForm(),t(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur")}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(e,i){e.constructor===String?this.classRuleSettings[e]=i:t.extend(this.classRuleSettings,e)},classRules:function(e){var i={},n=t(e).attr("class");return n&&t.each(n.split(" "),function(){this in t.validator.classRuleSettings&&t.extend(i,t.validator.classRuleSettings[this])}),i},normalizeAttributeRule:function(t,e,i,n){/min|max|step/.test(i)&&(null===e||/number|range|text/.test(e))&&(n=Number(n),isNaN(n)&&(n=void 0)),n||0===n?t[i]=n:e===i&&"range"!==e&&(t[i]=!0)},attributeRules:function(e){var i,n,r={},s=t(e),a=e.getAttribute("type");for(i in t.validator.methods)"required"===i?(n=e.getAttribute(i),""===n&&(n=!0),n=!!n):n=s.attr(i),this.normalizeAttributeRule(r,a,i,n);return r.maxlength&&/-1|2147483647|524288/.test(r.maxlength)&&delete r.maxlength,r},dataRules:function(e){var i,n,r={},s=t(e),a=e.getAttribute("type");for(i in t.validator.methods)n=s.data("rule"+i.charAt(0).toUpperCase()+i.substring(1).toLowerCase()),this.normalizeAttributeRule(r,a,i,n);return r},staticRules:function(e){var i={},n=t.data(e.form,"validator");return n.settings.rules&&(i=t.validator.normalizeRule(n.settings.rules[e.name])||{}),i},normalizeRules:function(e,i){return t.each(e,function(n,r){if(r===!1)return void delete e[n];if(r.param||r.depends){var s=!0;switch(typeof r.depends){case"string":s=!!t(r.depends,i.form).length;break;case"function":s=r.depends.call(i,i)}s?e[n]=void 0===r.param||r.param:(t.data(i.form,"validator").resetElements(t(i)),delete e[n])}}),t.each(e,function(n,r){e[n]=t.isFunction(r)&&"normalizer"!==n?r(i):r}),t.each(["minlength","maxlength"],function(){e[this]&&(e[this]=Number(e[this]))}),t.each(["rangelength","range"],function(){var i;e[this]&&(t.isArray(e[this])?e[this]=[Number(e[this][0]),Number(e[this][1])]:"string"==typeof e[this]&&(i=e[this].replace(/[\[\]]/g,"").split(/[\s,]+/),e[this]=[Number(i[0]),Number(i[1])]))}),t.validator.autoCreateRanges&&(null!=e.min&&null!=e.max&&(e.range=[e.min,e.max],delete e.min,delete e.max),null!=e.minlength&&null!=e.maxlength&&(e.rangelength=[e.minlength,e.maxlength],delete e.minlength,delete e.maxlength)),e},normalizeRule:function(e){if("string"==typeof e){var i={};t.each(e.split(/\s/),function(){i[this]=!0}),e=i}return e},addMethod:function(e,i,n){t.validator.methods[e]=i,t.validator.messages[e]=void 0!==n?n:t.validator.messages[e],i.length<3&&t.validator.addClassRules(e,t.validator.normalizeRule(e))},methods:{required:function(e,i,n){if(!this.depend(n,i))return"dependency-mismatch";if("select"===i.nodeName.toLowerCase()){var r=t(i).val();return r&&r.length>0}return this.checkable(i)?this.getLength(e,i)>0:e.length>0},email:function(t,e){return this.optional(e)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(t)},url:function(t,e){return this.optional(e)||/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[\/?#]\S*)?$/i.test(t)},date:function(t,e){return this.optional(e)||!/Invalid|NaN/.test(new Date(t).toString())},dateISO:function(t,e){return this.optional(e)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(t)},number:function(t,e){return this.optional(e)||/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)},digits:function(t,e){return this.optional(e)||/^\d+$/.test(t)},minlength:function(e,i,n){var r=t.isArray(e)?e.length:this.getLength(e,i);return this.optional(i)||r>=n},maxlength:function(e,i,n){var r=t.isArray(e)?e.length:this.getLength(e,i);return this.optional(i)||r<=n},rangelength:function(e,i,n){var r=t.isArray(e)?e.length:this.getLength(e,i);return this.optional(i)||r>=n[0]&&r<=n[1]},min:function(t,e,i){return this.optional(e)||t>=i},max:function(t,e,i){return this.optional(e)||t<=i},range:function(t,e,i){return this.optional(e)||t>=i[0]&&t<=i[1]},step:function(e,i,n){var r,s=t(i).attr("type"),a="Step attribute on input type "+s+" is not supported.",o=["text","number","range"],l=new RegExp("\\b"+s+"\\b"),h=s&&!l.test(o.join()),u=function(t){var e=(""+t).match(/(?:\.(\d+))?$/);return e&&e[1]?e[1].length:0},d=function(t){return Math.round(t*Math.pow(10,r))},c=!0;if(h)throw new Error(a);return r=u(n),(u(e)>r||d(e)%d(n)!==0)&&(c=!1),this.optional(i)||c},equalTo:function(e,i,n){var r=t(n);return this.settings.onfocusout&&r.not(".validate-equalTo-blur").length&&r.addClass("validate-equalTo-blur").on("blur.validate-equalTo",function(){t(i).valid()}),e===r.val()},remote:function(e,i,n,r){if(this.optional(i))return"dependency-mismatch";r="string"==typeof r&&r||"remote";var s,a,o,l=this.previousValue(i,r);return this.settings.messages[i.name]||(this.settings.messages[i.name]={}),l.originalMessage=l.originalMessage||this.settings.messages[i.name][r],this.settings.messages[i.name][r]=l.message,n="string"==typeof n&&{url:n}||n,o=t.param(t.extend({data:e},n.data)),l.old===o?l.valid:(l.old=o,s=this,this.startRequest(i),a={},a[i.name]=e,t.ajax(t.extend(!0,{mode:"abort",port:"validate"+i.name,dataType:"json",data:a,context:s.currentForm,success:function(t){var n,a,o,h=t===!0||"true"===t;s.settings.messages[i.name][r]=l.originalMessage,h?(o=s.formSubmitted,s.resetInternals(),s.toHide=s.errorsFor(i),s.formSubmitted=o,s.successList.push(i),s.invalid[i.name]=!1,s.showErrors()):(n={},a=t||s.defaultMessage(i,{method:r,parameters:e}),n[i.name]=l.message=a,s.invalid[i.name]=!0,s.showErrors(n)),l.valid=h,s.stopRequest(i,h)}},n)),"pending")}}});var e,i={};t.ajaxPrefilter?t.ajaxPrefilter(function(t,e,n){var r=t.port;"abort"===t.mode&&(i[r]&&i[r].abort(),i[r]=n)}):(e=t.ajax,t.ajax=function(n){var r=("mode"in n?n:t.ajaxSettings).mode,s=("port"in n?n:t.ajaxSettings).port;return"abort"===r?(i[s]&&i[s].abort(),i[s]=e.apply(this,arguments),i[s]):e.apply(this,arguments)})})},function(t,e){t.exports=jQuery},function(t,e,i){var n,r,s;!function(a){r=[i(3),i(2)],n=a,s="function"==typeof n?n.apply(e,r):n,!(void 0!==s&&(t.exports=s))}(function(t){t.extend(t.validator.messages,{required:"这是必填字段",remote:"请修正此字段",email:"请输入有效的电子邮件地址",url:"请输入有效的网址",date:"请输入有效的日期",dateISO:"请输入有效的日期 (YYYY-MM-DD)",number:"请输入有效的数字",digits:"只能输入数字",creditcard:"请输入有效的信用卡号码",equalTo:"你的输入不相同",extension:"请输入有效的后缀",maxlength:t.validator.format("最多可以输入 {0} 个字符"),minlength:t.validator.format("最少要输入 {0} 个字符"),rangelength:t.validator.format("请输入长度在 {0} 到 {1} 之间的字符串"),range:t.validator.format("请输入范围在 {0} 到 {1} 之间的数值"),max:t.validator.format("请输入不大于 {0} 的数值"),min:t.validator.format("请输入不小于 {0} 的数值")})})}]);