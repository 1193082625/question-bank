(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{2091:function(n,e,t){"use strict";var i=t("95c3"),u=t.n(i);u.a},"5fd2":function(n,e,t){"use strict";t.r(e);var i=t("6c32"),u=t("b620");for(var o in u)["default"].indexOf(o)<0&&function(n){t.d(e,n,(function(){return u[n]}))}(o);t("2091");var c=t("f0c5"),a=Object(c["a"])(u["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],void 0);e["default"]=a.exports},"6c32":function(n,e,t){"use strict";t.d(e,"b",(function(){return u})),t.d(e,"c",(function(){return o})),t.d(e,"a",(function(){return i}));var i={unicloudDb:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/@dcloudio/uni-cli-shared/components/unicloud-db")]).then(t.bind(null,"960d"))},uniNoticeBar:function(){return t.e("uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar").then(t.bind(null,"d395"))},uniGrid:function(){return t.e("uni_modules/uni-grid/components/uni-grid/uni-grid").then(t.bind(null,"0840"))},uniGridItem:function(){return t.e("uni_modules/uni-grid/components/uni-grid-item/uni-grid-item").then(t.bind(null,"cb84"))}},u=function(){var n=this,e=n.$createElement,t=(n._self._c,n.$hasSSP("8dd740cc-1")),i=t?n.$getSSP("8dd740cc-1","default")["loading"]||n.$getSSP("8dd740cc-1","default")["data"].length:null,u=t&&i?n.$getSSP("8dd740cc-1","default"):null,o=n.$t("grid.grid");n._isMounted||(n.e0=function(e,t){var i=arguments[arguments.length-1].currentTarget.dataset,u=i.eventParams||i["event-params"];t=u.item;return n.clickBannerItem(t)}),n.$mp.data=Object.assign({},{$root:{m0:t,m1:i,m2:u,m3:o}})},o=[]},"7c76":function(n,e,t){"use strict";(function(n,i){var u=t("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=u(t("2eee")),c=u(t("c973")),a=n.database(),r={data:function(){return{current:0,hasLogin:!1,allQuestionNums:0}},computed:{noticeText:function(){return"截止现在,已录入".concat(this.allQuestionNums,"题")}},onShow:function(){this.hasLogin=n.getCurrentUserInfo().tokenExpired>Date.now()},onLoad:function(){var n=this;return(0,c.default)(o.default.mark((function e(){var t,i;return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,a.collection("question-list").count();case 2:t=e.sent,i=t.result,n.allQuestionNums=null!==i&&void 0!==i&&i.total?i.total:0;case 5:case"end":return e.stop()}}),e)})))()},methods:{goGame:function(){i.navigateTo({url:"/pages/game/game",success:function(n){console.log("进入游戏页面",n)}})},goList:function(n){i.reLaunch({url:"/pages/list/list?category_id=".concat(n),success:function(n){var e=getCurrentPages()[0];void 0!=e&&null!=e&&e.onLoad()}})},change:function(n){i.showToast({title:this.$t("grid.clickTip")+" "+"".concat(n.detail.index+1)+" "+this.$t("grid.clickTipGrid"),icon:"none"})},onqueryload:function(n){},changeSwiper:function(n){this.current=n.detail.current},clickBannerItem:function(n){n.open_url&&(console.log("跳转公众号",n.open_url),i.navigateTo({url:"/pages/webview/webview?url=".concat(n.open_url),success:function(n){console.log("跳转成功")},fail:function(){},complete:function(){}}))}}};e.default=r}).call(this,t("a9ff")["default"],t("543d")["default"])},"95c3":function(n,e,t){},a302:function(n,e,t){"use strict";(function(n,e){var i=t("4ea4");t("6ed0"),t("a9ff");i(t("66fd"));var u=i(t("5fd2"));n.__webpack_require_UNI_MP_PLUGIN__=t,e(u.default)}).call(this,t("bc2e")["default"],t("543d")["createPage"])},b620:function(n,e,t){"use strict";t.r(e);var i=t("7c76"),u=t.n(i);for(var o in i)["default"].indexOf(o)<0&&function(n){t.d(e,n,(function(){return i[n]}))}(o);e["default"]=u.a}},[["a302","common/runtime","common/vendor"]]]);