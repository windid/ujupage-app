webpackJsonp([6,10],{113:function(t,r,e){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(r,"__esModule",{value:!0});var a=e(4),s=o(a),n=e(30),i=o(n),u=e(3);r.default={components:{Auth:i.default},data:function(){return{error:""}},methods:(0,s.default)({},(0,u.mapActions)(["register"]),{formSubmit:function(t){var r=this,e=t.target.name.value,o=t.target.email.value,a=t.target.password.value,s=t.target.password_confirmation.value;if(this.error="",!e)return void(this.error="请输入您的姓名！");if(e.length>20)return void(this.error="姓名长度不能超过20个字符");var n=/^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z0-9]{2,5}$/;if(!n.test(o))return void(this.error="邮箱地址格式不正确。");if(a.length<6)return void(this.error="密码长度至少要6位。");if(a!==s)return void(this.error="两次输入的密码不一致。");var i={name:e,email:o,password:a};this.register([i,function(){r.$router.replace(r.$route.query.redirect||"/")},function(t){return 422===t.status?void(r.error="您输入的邮箱已经注册过了。"):void(r.error="注册失败，请稍后再试。")}])}}),mounted:function(){document.title="注册 - 聚页"}}},304:function(t,r,e){var o,a;o=e(113);var s=e(379);a=o=o||{},"object"!=typeof o.default&&"function"!=typeof o.default||(a=o=o.default),"function"==typeof a&&(a=a.options),a.render=s.render,a.staticRenderFns=s.staticRenderFns,t.exports=o},379:function(t,r){t.exports={render:function(){var t=this;return t._h("auth",[t._h("span",{slot:"title"},["注册"])," ",t._h("div",{slot:"content"},[t._h("form",{attrs:{action:"",method:"post"},on:{submit:function(r){r.preventDefault(),t.formSubmit(r)}}},[t._h("div",{staticClass:"form-group"},[t._h("input",{staticClass:"form-control input-lg",attrs:{type:"text",name:"name",placeholder:"姓名"}})])," ",t._h("div",{staticClass:"form-group"},[t._h("input",{staticClass:"form-control input-lg",attrs:{type:"text",name:"email",placeholder:"电子邮箱"}})])," ",t._h("div",{staticClass:"form-group"},[t._h("input",{staticClass:"form-control input-lg",attrs:{type:"password",name:"password",placeholder:"密码"}})])," ",t._h("div",{staticClass:"form-group"},[t._h("input",{staticClass:"form-control input-lg",attrs:{type:"password",name:"password_confirmation",placeholder:"确认密码"}})])," ",t._h("p",{directives:[{name:"show",rawName:"v-show",value:!!t.error,expression:"!!error"}],staticClass:"auth-error bg-danger"},[t._s(t.error)])," ",t._h("div",{staticClass:"form-group"},[t._h("input",{staticClass:"btn btn-primary btn-lg form-control input-lg",attrs:{type:"submit",value:"注册"}})])])])," ",t._h("p",{slot:"extra"},["\n    已经有聚页账户？\n    ",t._h("router-link",{attrs:{to:"/login"}},["登陆"])])])},staticRenderFns:[]}}});
//# sourceMappingURL=6.53fef50494dd1d158ea2.js.map