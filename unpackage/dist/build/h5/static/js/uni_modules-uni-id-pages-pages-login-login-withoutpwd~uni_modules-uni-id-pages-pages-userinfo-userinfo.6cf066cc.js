(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["uni_modules-uni-id-pages-pages-login-login-withoutpwd~uni_modules-uni-id-pages-pages-userinfo-userinfo"],{"0265":function(e,t,n){"use strict";n.r(t);var i=n("2125"),o=n.n(i);for(var a in i)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(a);t["default"]=o.a},2125:function(e,t,n){"use strict";n("7a82");var i=n("4ea4").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("a9e3");var o=i(n("8cf0")),a=n("37dc"),u=i(n("9000")),r=(0,a.initVueI18n)(u.default),l=r.t,s={name:"uniPopupDialog",mixins:[o.default],emits:["confirm","close"],props:{inputType:{type:String,default:"text"},value:{type:[String,Number],default:""},placeholder:{type:[String,Number],default:""},type:{type:String,default:"error"},mode:{type:String,default:"base"},title:{type:String,default:""},content:{type:String,default:""},beforeClose:{type:Boolean,default:!1},cancelText:{type:String,default:""},confirmText:{type:String,default:""}},data:function(){return{dialogType:"error",focus:!1,val:""}},computed:{okText:function(){return this.confirmText||l("uni-popup.ok")},closeText:function(){return this.cancelText||l("uni-popup.cancel")},placeholderText:function(){return this.placeholder||l("uni-popup.placeholder")},titleText:function(){return this.title||l("uni-popup.title")}},watch:{type:function(e){this.dialogType=e},mode:function(e){"input"===e&&(this.dialogType="info")},value:function(e){this.val=e}},created:function(){this.popup.disableMask(),"input"===this.mode?(this.dialogType="info",this.val=this.value):this.dialogType=this.type},mounted:function(){this.focus=!0},methods:{onOk:function(){"input"===this.mode?this.$emit("confirm",this.val):this.$emit("confirm"),this.beforeClose||this.popup.close()},closeDialog:function(){this.$emit("close"),this.beforeClose||this.popup.close()},close:function(){this.popup.close()}}};t.default=s},"2a85":function(e,t,n){var i=n("5e0c");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var o=n("4f06").default;o("ab59638a",i,!0,{sourceMap:!1,shadowMode:!1})},"305f":function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){}));var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"uni-popup-dialog"},[n("v-uni-view",{staticClass:"uni-dialog-title"},[n("v-uni-text",{staticClass:"uni-dialog-title-text",class:["uni-popup__"+e.dialogType]},[e._v(e._s(e.titleText))])],1),"base"===e.mode?n("v-uni-view",{staticClass:"uni-dialog-content"},[e._t("default",[n("v-uni-text",{staticClass:"uni-dialog-content-text"},[e._v(e._s(e.content))])])],2):n("v-uni-view",{staticClass:"uni-dialog-content"},[e._t("default",["checkbox"===e.inputType?n("v-uni-input",{staticClass:"uni-dialog-input",attrs:{placeholder:e.placeholderText,focus:e.focus,type:"checkbox"},model:{value:e.val,callback:function(t){e.val=t},expression:"val"}}):"radio"===e.inputType?n("input",{directives:[{name:"model",rawName:"v-model",value:e.val,expression:"val"}],staticClass:"uni-dialog-input",attrs:{placeholder:e.placeholderText,focus:e.focus,type:"radio"},domProps:{checked:e._q(e.val,null)},on:{change:function(t){e.val=null}}}):n("input",{directives:[{name:"model",rawName:"v-model",value:e.val,expression:"val"}],staticClass:"uni-dialog-input",attrs:{placeholder:e.placeholderText,focus:e.focus,type:e.inputType},domProps:{value:e.val},on:{input:function(t){t.target.composing||(e.val=t.target.value)}}})])],2),n("v-uni-view",{staticClass:"uni-dialog-button-group"},[n("v-uni-view",{staticClass:"uni-dialog-button",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.closeDialog.apply(void 0,arguments)}}},[n("v-uni-text",{staticClass:"uni-dialog-button-text"},[e._v(e._s(e.closeText))])],1),n("v-uni-view",{staticClass:"uni-dialog-button uni-border-left",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.onOk.apply(void 0,arguments)}}},[n("v-uni-text",{staticClass:"uni-dialog-button-text uni-button-color"},[e._v(e._s(e.okText))])],1)],1)],1)},o=[]},"42e5":function(e){e.exports=JSON.parse('{"uni-popup.cancel":"取消","uni-popup.ok":"確定","uni-popup.placeholder":"請輸入","uni-popup.title":"提示","uni-popup.shareTitle":"分享到"}')},"5e0c":function(e,t,n){var i=n("24fb");t=i(!1),t.push([e.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.uni-popup-dialog[data-v-56681c50]{width:300px;border-radius:11px;background-color:#fff}.uni-dialog-title[data-v-56681c50]{display:flex;flex-direction:row;justify-content:center;padding-top:25px}.uni-dialog-title-text[data-v-56681c50]{font-size:16px;font-weight:500}.uni-dialog-content[data-v-56681c50]{display:flex;flex-direction:row;justify-content:center;align-items:center;padding:20px}.uni-dialog-content-text[data-v-56681c50]{font-size:14px;color:#6c6c6c}.uni-dialog-button-group[data-v-56681c50]{display:flex;flex-direction:row;border-top-color:#f5f5f5;border-top-style:solid;border-top-width:1px}.uni-dialog-button[data-v-56681c50]{display:flex;flex:1;flex-direction:row;justify-content:center;align-items:center;height:45px}.uni-border-left[data-v-56681c50]{border-left-color:#f0f0f0;border-left-style:solid;border-left-width:1px}.uni-dialog-button-text[data-v-56681c50]{font-size:16px;color:#333}.uni-button-color[data-v-56681c50]{color:#007aff}.uni-dialog-input[data-v-56681c50]{flex:1;font-size:14px;border:1px #eee solid;height:40px;padding:0 10px;border-radius:5px;color:#555}.uni-popup__success[data-v-56681c50]{color:#4cd964}.uni-popup__warn[data-v-56681c50]{color:#f0ad4e}.uni-popup__error[data-v-56681c50]{color:#dd524d}.uni-popup__info[data-v-56681c50]{color:#909399}',""]),e.exports=t},"77de":function(e,t,n){"use strict";var i=n("2a85"),o=n.n(i);o.a},"7db8":function(e,t,n){"use strict";(function(e){n("7a82");var i=n("4ea4").default;Object.defineProperty(t,"__esModule",{value:!0}),t.store=t.mutations=void 0;var o=i(n("c7eb")),a=i(n("5530")),u=i(n("1da1"));n("b64b"),n("d3b7"),n("159b"),n("99af");var r=i(n("4dc4")),l=i(n("663d")),s=i(n("e143")),c=e.importObject("uni-id-co"),d=e.database(),p=d.collection("uni-id-users"),f=uni.getStorageSync("uni-id-pages-userInfo")||{},v={userInfo:f,hasLogin:0!=Object.keys(f).length},g={updateUserInfo:function(){var t=arguments,n=this;return(0,u.default)((0,o.default)().mark((function i(){var u,r,l,s;return(0,o.default)().wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(u=t.length>0&&void 0!==t[0]&&t[0],!u){i.next=5;break}p.where("_id==$env.uid").update(u).then((function(e){e.result.updated?(uni.showToast({title:"更新成功",icon:"none",duration:3e3}),n.setUserInfo(u)):uni.showToast({title:"没有改变",icon:"none",duration:3e3})})),i.next=20;break;case 5:return r=e.importObject("uni-id-co",{customUI:!0}),i.prev=6,i.next=9,p.where("'_id' == $cloudEnv_uid").field("mobile,nickname,username,email,avatar_file").get();case 9:return l=i.sent,i.next=12,r.getRealNameInfo();case 12:s=i.sent,n.setUserInfo((0,a.default)((0,a.default)({},l.result.data[0]),{},{realNameAuth:s})),i.next=20;break;case 16:i.prev=16,i.t0=i["catch"](6),n.setUserInfo({},{cover:!0}),console.error(i.t0.message,i.t0.errCode);case 20:case"end":return i.stop()}}),i,null,[[6,16]])})))()},setUserInfo:function(e){var t=arguments;return(0,u.default)((0,o.default)().mark((function n(){var i,a,u;return(0,o.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i=t.length>1&&void 0!==t[1]?t[1]:{cover:!1},a=i.cover,u=a?e:Object.assign(h.userInfo,e),h.userInfo=Object.assign({},u),h.hasLogin=0!=Object.keys(h.userInfo).length,uni.setStorageSync("uni-id-pages-userInfo",h.userInfo),n.abrupt("return",e);case 6:case"end":return n.stop()}}),n)})))()},logout:function(){var t=this;return(0,u.default)((0,o.default)().mark((function n(){return(0,o.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!(e.getCurrentUserInfo().tokenExpired>Date.now())){n.next=9;break}return n.prev=1,n.next=4,c.logout();case 4:n.next=9;break;case 6:n.prev=6,n.t0=n["catch"](1),console.error(n.t0);case 9:uni.removeStorageSync("uni_id_token"),uni.setStorageSync("uni_id_token_expired",0),uni.redirectTo({url:"/".concat(r.default.uniIdRouter&&r.default.uniIdRouter.loginPage?r.default.uniIdRouter.loginPage:"uni_modules/uni-id-pages/pages/login/login-withoutpwd")}),uni.$emit("uni-id-pages-logout"),t.setUserInfo({},{cover:!0});case 14:case"end":return n.stop()}}),n,null,[[1,6]])})))()},loginBack:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.uniIdRedirectUrl,n=void 0===t?"":t,i=0,o=getCurrentPages();if(o.forEach((function(e,t){"login"==o[o.length-t-1].route.split("/")[3]&&i++})),n)return uni.redirectTo({url:n,fail:function(e){uni.switchTab({url:n,fail:function(t){console.log(e,t)}})}});if("weixin"==e.loginType)return window.history.go(-3);if(i){var a=r.default.pages[0];return uni.reLaunch({url:"/".concat(a.path)})}uni.navigateBack({delta:i})},loginSuccess:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.showToast,n=void 0===t||t,i=e.toastText,o=void 0===i?"登录成功":i,a=e.autoBack,u=void 0===a||a,r=e.uniIdRedirectUrl,s=void 0===r?"":r,c=e.passwordConfirmed;if(n&&uni.showToast({title:o,icon:"none",duration:3e3}),this.updateUserInfo(),uni.$emit("uni-id-pages-login-success"),l.default.setPasswordAfterLogin&&!c)return uni.redirectTo({url:s?"/uni_modules/uni-id-pages/pages/userinfo/set-pwd/set-pwd?uniIdRedirectUrl=".concat(s,"&loginType=").concat(e.loginType):"/uni_modules/uni-id-pages/pages/userinfo/set-pwd/set-pwd?loginType=".concat(e.loginType),fail:function(e){console.log(e)}});u&&this.loginBack({uniIdRedirectUrl:s})}};t.mutations=g;var h=s.default.observable(v);t.store=h}).call(this,n("a9ff")["default"])},"8cf0":function(e,t,n){"use strict";n("7a82"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i={data:function(){return{}},created:function(){this.popup=this.getParent()},methods:{getParent:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"uniPopup",t=this.$parent,n=t.$options.name;while(n!==e){if(t=t.$parent,!t)return!1;n=t.$options.name}return t}}};t.default=i},9e3:function(e,t,n){"use strict";n("7a82");var i=n("4ea4").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=i(n("a65a")),a=i(n("b0a2")),u=i(n("42e5")),r={en:o.default,"zh-Hans":a.default,"zh-Hant":u.default};t.default=r},a65a:function(e){e.exports=JSON.parse('{"uni-popup.cancel":"cancel","uni-popup.ok":"ok","uni-popup.placeholder":"pleace enter","uni-popup.title":"Hint","uni-popup.shareTitle":"Share to"}')},b0a2:function(e){e.exports=JSON.parse('{"uni-popup.cancel":"取消","uni-popup.ok":"确定","uni-popup.placeholder":"请输入","uni-popup.title":"提示","uni-popup.shareTitle":"分享到"}')},d16a:function(e,t,n){"use strict";n.r(t);var i=n("305f"),o=n("0265");for(var a in o)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(a);n("77de");var u=n("f0c5"),r=Object(u["a"])(o["default"],i["b"],i["c"],!1,null,"56681c50",null,!1,i["a"],void 0);t["default"]=r.exports}}]);