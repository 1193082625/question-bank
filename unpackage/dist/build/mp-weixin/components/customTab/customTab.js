(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/customTab/customTab"],{2054:function(t,n,e){"use strict";e.r(n);var a=e("7517"),o=e.n(a);for(var c in a)["default"].indexOf(c)<0&&function(t){e.d(n,t,(function(){return a[t]}))}(c);n["default"]=o.a},"3d7e":function(t,n,e){"use strict";var a=e("505f"),o=e.n(a);o.a},"505f":function(t,n,e){},"6e83":function(t,n,e){"use strict";e.r(n);var a=e("77e2"),o=e("2054");for(var c in o)["default"].indexOf(c)<0&&function(t){e.d(n,t,(function(){return o[t]}))}(c);e("3d7e");var u=e("f0c5"),i=Object(u["a"])(o["default"],a["b"],a["c"],!1,null,"3f9641b2",null,!1,a["a"],void 0);n["default"]=i.exports},7517:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={name:"customTab",data:function(){return{scrollTop:0,navIndex:0}},props:{tabDatas:{type:Array,default:[]},needSwiper:{type:Boolean,default:!1}},methods:{checkIndex:function(t){this.navIndex=t,this.$emit("categoryChanged",this.tabDatas[t]._id)},scroll:function(t){console.log(t),this.old.scrollTop=t.detail.scrollTop},tabChange:function(t){var n=t.detail.current;this.navIndex=n}}};n.default=a},"77e2":function(t,n,e){"use strict";e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){}));var a=function(){var t=this.$createElement,n=(this._self._c,this.tabDatas.length);this.$mp.data=Object.assign({},{$root:{g0:n}})},o=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/customTab/customTab-create-component',
    {
        'components/customTab/customTab-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("6e83"))
        })
    },
    [['components/customTab/customTab-create-component']]
]);
