webpackJsonp([7,10],{100:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(4),a=r(o),s=n(30),i=r(s),u=n(3);e.default={components:{Auth:i.default},data:function(){return{error:"",emailSent:!1}},methods:(0,a.default)({},(0,u.mapActions)(["getPassword"]),{formSubmit:function(t){var e=this,n=t.target.email.value,r=/^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z0-9]{2,5}$/;return r.test(n)?void this.getPassword([n,function(){e.emailSent=!0},function(t){404===t.status&&(e.error="您输入的邮箱尚未注册。")}]):void(this.error="请输入正确的邮箱地址")}}),mounted:function(){document.title="密码重设 - 聚页"}}},291:function(t,e,n){var r,o;r=n(100);var a=n(383);o=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(o=r=r.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,t.exports=r},383:function(t,e){t.exports={render:function(){var t=this;return t._h("auth",[t._h("span",{slot:"title"},["密码重设"])," ",t._h("div",{slot:"content"},[t.emailSent?t._e():t._h("form",{attrs:{action:"",method:"post"},on:{submit:function(e){e.preventDefault(),t.formSubmit(e)}}},[t._m(0)," ",t._h("p",{directives:[{name:"show",rawName:"v-show",value:!!t.error,expression:"!!error"}],staticClass:"auth-error bg-danger"},[t._s(t.error)])," ",t._m(1)])," ",t.emailSent?t._h("p",{staticClass:"auth-info bg-info"},["\n      一封包含密码重置链接的验证邮件已经发送到您的注册邮箱，请按照邮件中的说明进行下一步的操作。\n    "]):t._e()])," ",t._h("p",{slot:"extra"},["\n    已经有聚页账户？\n    ",t._h("router-link",{attrs:{to:"/login"}},["登陆"])])])},staticRenderFns:[function(){var t=this;return t._h("div",{staticClass:"form-group"},[t._h("input",{staticClass:"form-control input-lg",attrs:{type:"text",name:"email",value:"",placeholder:"邮箱"}})])},function(){var t=this;return t._h("div",{staticClass:"form-group"},[t._h("input",{staticClass:"btn btn-primary btn-lg form-control input-lg",attrs:{type:"submit",value:"发送密码重设邮件"}})])}]}}});
//# sourceMappingURL=7.01a512b42d5d4465049a.js.map