(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6866581f"],{1148:function(e,t,n){"use strict";var i=n("a691"),r=n("1d80");e.exports="".repeat||function(e){var t=String(r(this)),n="",o=i(e);if(o<0||o==1/0)throw RangeError("Wrong number of repetitions");for(;o>0;(o>>>=1)&&(t+=t))1&o&&(n+=t);return n}},"404a":function(e,t,n){},"408a":function(e,t,n){var i=n("c6b6");e.exports=function(e){if("number"!=typeof e&&"Number"!=i(e))throw TypeError("Incorrect invocation");return+e}},4802:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"recommend"},[n("HomeTitle",[e._v("推荐歌单")]),n("ul",{staticClass:"recommend-card"},e._l(e.recommendSongSheet,(function(t,i){return n("Recommend-card",{key:i,attrs:{item:t},on:{goSongSheetList:function(t){return e.toSongSheetList(t)}}})})),1),n("HomeTitle",[e._v("最新音乐")]),n("ul",{staticClass:"recommend-new"},e._l(e.newMusic,(function(t,i){return n("Recommend-new",{key:i,attrs:{newItem:t},on:{"translate-currentid":function(t){return e.$emit("translate-currentid",t)}}})})),1)],1)},r=[],o=(n("404a"),n("e3fe")),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",{on:{click:function(t){return e.getSongSheetList(e.item.id)}}},[n("div",{staticClass:"card-thumb"},[n("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.item.picUrl,expression:"item.picUrl"}],staticClass:"auto-img",attrs:{alt:""}}),n("span",[e._v(e._s(e.translatePlayCount(e.item.playCount)))])]),n("p",{staticClass:"desc"},[e._v(e._s(e.item.name))])])},s=[],c=(n("a9e3"),n("b680"),{props:{item:Object},methods:{translatePlayCount:function(e){return e>99999999?Number(e/1e8).toFixed(2)+"亿":e>9999?Number(e/1e4).toFixed(1)+"万":void 0},getSongSheetList:function(e){this.$emit("goSongSheetList",e)}}}),u=c,l=n("2877"),m=Object(l["a"])(u,a,s,!1,null,"0ab6effc",null),d=m.exports,f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",{on:{click:function(t){return e.setCurrentSongId(e.newItem.id)}}},[n("div",{staticClass:"recommend-new-box"},[n("div",{staticClass:"recommend-new-box2"},[n("div",{staticClass:"recommend-new-title one-text"},[e._v(e._s(e.newItem.name))]),n("div",{staticClass:"recommend-singer-box one-text"},[n("div",[e.newItem.song.hMusic?n("i",{staticClass:"recommend-new-singer"}):e._e(),e._v(" "+e._s(e.newItem.song.artists[0].name)+" - "+e._s(e.newItem.name)+" ")])])]),e._m(0)])])},h=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"recommend-new-play"},[n("span",{staticClass:"recommend-playbtn"})])}],g={props:["newItem"],methods:{setCurrentSongId:function(e){this.$emit("translate-currentid",{songId:e})}}},p=g,v=Object(l["a"])(p,f,h,!1,null,"52504238",null),w=v.exports,S={name:"Recommend",components:{HomeTitle:o["a"],RecommendCard:d,RecommendNew:w},data:function(){return{recommendSongSheet:[],newMusic:[]}},created:function(){this.getRecommendSongSheet(),this.getnewMusic()},methods:{getRecommendSongSheet:function(){var e=this;this.recommendSongSheet=[],this.$toast.loading({message:"加载中...",forbidClick:!0,duration:0,loadingType:"spinner"}),this.axios({method:"GET",url:"http://musicapi.leanapp.cn/personalized?limit=6"}).then((function(t){e.$toast.clear(),200==t.data.code&&(e.recommendSongSheet=t.data.result)})).catch((function(t){e.$toast.clear()}))},getnewMusic:function(){var e=this;this.newMusic=[],this.axios({method:"GET",url:"http://musicapi.leanapp.cn/personalized/newsong"}).then((function(t){200==t.data.code&&(e.newMusic=t.data.result)})).catch((function(t){e.$toast.clear()}))},toSongSheetList:function(e){this.$router.push({name:"Songsheetlist",query:{id:e}})}}},_=S,b=Object(l["a"])(_,i,r,!1,null,"d833cc44",null);t["default"]=b.exports},b680:function(e,t,n){"use strict";var i=n("23e7"),r=n("a691"),o=n("408a"),a=n("1148"),s=n("d039"),c=1..toFixed,u=Math.floor,l=function(e,t,n){return 0===t?n:t%2===1?l(e,t-1,n*e):l(e*e,t/2,n)},m=function(e){var t=0,n=e;while(n>=4096)t+=12,n/=4096;while(n>=2)t+=1,n/=2;return t},d=c&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!s((function(){c.call({})}));i({target:"Number",proto:!0,forced:d},{toFixed:function(e){var t,n,i,s,c=o(this),d=r(e),f=[0,0,0,0,0,0],h="",g="0",p=function(e,t){var n=-1,i=t;while(++n<6)i+=e*f[n],f[n]=i%1e7,i=u(i/1e7)},v=function(e){var t=6,n=0;while(--t>=0)n+=f[t],f[t]=u(n/e),n=n%e*1e7},w=function(){var e=6,t="";while(--e>=0)if(""!==t||0===e||0!==f[e]){var n=String(f[e]);t=""===t?n:t+a.call("0",7-n.length)+n}return t};if(d<0||d>20)throw RangeError("Incorrect fraction digits");if(c!=c)return"NaN";if(c<=-1e21||c>=1e21)return String(c);if(c<0&&(h="-",c=-c),c>1e-21)if(t=m(c*l(2,69,1))-69,n=t<0?c*l(2,-t,1):c/l(2,t,1),n*=4503599627370496,t=52-t,t>0){p(0,n),i=d;while(i>=7)p(1e7,0),i-=7;p(l(10,i,1),0),i=t-1;while(i>=23)v(1<<23),i-=23;v(1<<i),p(1,1),v(2),g=w()}else p(0,n),p(1<<-t,0),g=w()+a.call("0",d);return d>0?(s=g.length,g=h+(s<=d?"0."+a.call("0",d-s)+g:g.slice(0,s-d)+"."+g.slice(s-d))):g=h+g,g}})},e3fe:function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"recommend-title"},[n("h3",[e._t("default")],2)])},r=[],o={},a=o,s=n("2877"),c=Object(s["a"])(a,i,r,!1,null,"2d81c866",null);t["a"]=c.exports}}]);
//# sourceMappingURL=chunk-6866581f.b0a6fbee.js.map