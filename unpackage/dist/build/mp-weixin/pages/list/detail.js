(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/list/detail"],{"0400":function(t,n,e){},"0e3e":function(t,n,e){"use strict";(function(t,n){var i=e("4ea4");e("6ed0"),e("a9ff");i(e("66fd"));var o=i(e("a660"));t.__webpack_require_UNI_MP_PLUGIN__=e,n(o.default)}).call(this,e("bc2e")["default"],e("543d")["createPage"])},"30f5":function(t,n,e){"use strict";var i=e("0400"),o=e.n(i);o.a},9192:function(t,n,e){"use strict";e.r(n);var i=e("fc9b"),o=e.n(i);for(var a in i)["default"].indexOf(a)<0&&function(t){e.d(n,t,(function(){return i[t]}))}(a);n["default"]=o.a},a660:function(t,n,e){"use strict";e.r(n);var i=e("d1cd"),o=e("9192");for(var a in o)["default"].indexOf(a)<0&&function(t){e.d(n,t,(function(){return o[t]}))}(a);e("30f5");var u=e("f0c5"),s=Object(u["a"])(o["default"],i["b"],i["c"],!1,null,"70e21ec2",null,!1,i["a"],void 0);n["default"]=s.exports},d1cd:function(t,n,e){"use strict";e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return i}));var i={unicloudDb:function(){return Promise.all([e.e("common/vendor"),e.e("node-modules/@dcloudio/uni-cli-shared/components/unicloud-db")]).then(e.bind(null,"960d"))},uniList:function(){return e.e("uni_modules/uni-list/components/uni-list/uni-list").then(e.bind(null,"cf89"))},uniListItem:function(){return e.e("uni_modules/uni-list/components/uni-list-item/uni-list-item").then(e.bind(null,"f637"))},uniRate:function(){return e.e("uni_modules/uni-rate/components/uni-rate/uni-rate").then(e.bind(null,"a3f3"))},uniDateformat:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat")]).then(e.bind(null,"18f8"))},uniIcons:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(e.bind(null,"7756"))},uniPopup:function(){return e.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(e.bind(null,"82bd"))}},o=function(){var t=this,n=t.$createElement,e=(t._self._c,Number(t.qIndex)),i=t.$hasSSP("b863f3a6-1"),o=i?!t.$getSSP("b863f3a6-1","default")["loading"]&&t.$getSSP("b863f3a6-1","default")["data"]:null,a=i&&o?t.$getSSP("b863f3a6-1","default"):null,u=t.$getSSP("b863f3a6-1","default"),s=t.$getSSP("b863f3a6-1","default"),l=i&&o&&t.isShowAnalysis?t.$getSSP("b863f3a6-1","default"):null;t.$mp.data=Object.assign({},{$root:{m0:e,m1:i,m2:o,m3:a,m4:u,m5:s,m6:l}})},a=[]},fc9b:function(t,n,e){"use strict";(function(t,e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=t.database(),o=i.collection("read-questions-log"),a={data:function(){return{id:"",qIndex:0,title:"title",field:"user_id.nickname,user_id._id,last_modify_date,comment_count,like_count,title,content,difficulty,answer,answer_analysis,is_choice,answer_options",formData:{noData:'<p style="text-align:center;color:#666">详情加载中...</p>'},isShowAnalysis:!1,readMode:0}},computed:{uniStarterConfig:function(){return getApp().globalData.config},where:function(){return'_id =="'.concat(this.id,'"')}},onLoad:function(t){var n=this;t.id&&(this.id=t.id),t.qIndex&&(this.qIndex=t.qIndex),t.title&&(this.title=t.title,e.setNavigationBarTitle({title:t.title})),e.getStorage({key:"question-readMode",success:function(t){n.isShowAnalysis=1===t.data,n.readMode=t.data}})},onReady:function(){this.id?this.$refs.detail.loadData():e.showToast({icon:"none",title:this.$t("listDetail.newsErr")})},onNavigationBarButtonTap:function(t){"share"==t.type&&this.shareClick()},methods:{$log:function(){for(var t,n=arguments.length,e=new Array(n),i=0;i<n;i++)e[i]=arguments[i];(t=console).log.apply(t,["args"].concat(e,[this.id]))},showAnalysis:function(){this.isShowAnalysis=!0},goPrev:function(){var t=this;e.getStorage({key:"question-lists",success:function(n){var i=n.data,o=Number(t.qIndex)-1,a=i[o];a?(t.qIndex=o,t.title=a.title,t.id=a.id,t.$refs.detail.loadData()):e.showToast({title:"已经是第一条数据了！"})},fail:function(){console.log("获取缓存失败")}})},goNext:function(){var t=this;e.getStorage({key:"question-lists",success:function(n){var i=n.data,o=Number(t.qIndex)+1,a=i[o];a?(t.qIndex=o,t.title=a.title,t.id=a.id,t.$refs.detail.loadData()):e.showToast({title:"已经是最后一条数据了！"})},fail:function(){console.log("获取缓存失败")}})},changeMode:function(t){var n=0===t?1:0;e.setStorage({key:"question-readMode",data:n}),this.isShowAnalysis=1===n,this.readMode=n,this.$refs.popup.close()},openPopup:function(){this.$refs.popup.open("bottom")},closePopup:function(){this.$refs.popup.close()},setReadQuestionsLog:function(){var t={question_id:this.id,last_time:Date.now()},n=e.getStorageSync("readQuestionsLog")||[],i=-1;n.forEach((function(n,e){var o=n.question_id;o==t.question_id&&(i=e)})),-1===i?n.push(t):n.splice(i,1,t),e.setStorageSync("readQuestionsLog",n)},setFavorite:function(){var t=this.id,n=Date.now();console.log({question_id:t,last_time:n}),o.where('"question_id" == "'.concat(t,'" && "user_id"==$env.uid')).update({last_time:n}).then((function(n){var i=n.result.updated;console.log("updated",i),i||o.add({question_id:t}).then((function(t){console.log(t),e.showToast({title:"收藏成功"})})).catch((function(t){e.showToast({title:"收藏失败"})}))})).catch((function(t){console.log(t)}))},loadData:function(t){""==this.title&&t[0].title&&(this.title=t[0].title,e.setNavigationBarTitle({title:t[0].title})),this.setReadQuestionsLog()},followClick:function(){e.showToast({title:this.$t("listDetail.follow"),icon:"none"})}}};n.default=a}).call(this,e("a9ff")["default"],e("543d")["default"])}},[["0e3e","common/runtime","common/vendor"]]]);