require('../../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uni-id-pages/pages/userinfo/change_pwd/change_pwd"],{"3ca6":function(e,n,t){"use strict";t.r(n);var o=t("b73d"),r=t.n(o);for(var u in o)["default"].indexOf(u)<0&&function(e){t.d(n,e,(function(){return o[e]}))}(u);n["default"]=r.a},"535e":function(e,n,t){"use strict";(function(e,n){var o=t("4ea4");t("6ed0"),t("a9ff");o(t("66fd"));var r=o(t("9160"));e.__webpack_require_UNI_MP_PLUGIN__=t,n(r.default)}).call(this,t("bc2e")["default"],t("543d")["createPage"])},9160:function(e,n,t){"use strict";t.r(n);var o=t("f411"),r=t("3ca6");for(var u in r)["default"].indexOf(u)<0&&function(e){t.d(n,e,(function(){return r[e]}))}(u);t("95ac");var s=t("f0c5"),i=Object(s["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],void 0);n["default"]=i.exports},"95ac":function(e,n,t){"use strict";var o=t("c76f"),r=t.n(o);r.a},b73d:function(e,n,t){"use strict";(function(e,o){var r=t("4ea4");Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=r(t("9523")),s=r(t("5fb2")),i=r(t("87ef"));function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){(0,u.default)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var f=e.importObject("uni-id-co",{customUI:!0}),d={mixins:[s.default],data:function(){return{focusOldPassword:!1,focusNewPassword:!1,focusNewPassword2:!1,formData:{oldPassword:"",newPassword:"",newPassword2:""},rules:c({oldPassword:{rules:[{required:!0,errorMessage:"请输入新密码"},{pattern:/^.{6,20}$/,errorMessage:"密码为6 - 20位"}]}},i.default.getPwdRules("newPassword","newPassword2")),logo:"/static/logo.png"}},onReady:function(){this.$refs.form.setRules(this.rules)},onShow:function(){},methods:{submit:function(){var e=this;this.$refs.form.validate().then((function(n){var t=e.formData,r=t.oldPassword,u=t.newPassword;f.updatePwd({oldPassword:r,newPassword:u}).then((function(e){o.removeStorageSync("uni_id_token"),o.setStorageSync("uni_id_token_expired",0),o.redirectTo({url:"/uni_modules/uni-id-pages/pages/login/login-withpwd"})})).catch((function(e){o.showModal({content:e.message,showCancel:!1})}))})).catch((function(n){var t=n[0].key;t=t.replace(t[0],t[0].toUpperCase()),e["focus"+t]=!0}))}}};n.default=d}).call(this,t("a9ff")["default"],t("543d")["default"])},c76f:function(e,n,t){},f411:function(e,n,t){"use strict";t.d(n,"b",(function(){return r})),t.d(n,"c",(function(){return u})),t.d(n,"a",(function(){return o}));var o={uniForms:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uni-forms/components/uni-forms/uni-forms")]).then(t.bind(null,"5186"))},uniFormsItem:function(){return t.e("uni_modules/uni-forms/components/uni-forms-item/uni-forms-item").then(t.bind(null,"5cee"))},uniEasyinput:function(){return t.e("uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput").then(t.bind(null,"9346"))}},r=function(){var e=this,n=e.$createElement;e._self._c;e._isMounted||(e.e0=function(n){e.focusOldPassword=!1},e.e1=function(n){e.focusNewPassword=!1},e.e2=function(n){e.focusNewPassword2=!1})},u=[]}},[["535e","common/runtime","common/vendor","uni_modules/uni-id-pages/pages/common/vendor"]]]);