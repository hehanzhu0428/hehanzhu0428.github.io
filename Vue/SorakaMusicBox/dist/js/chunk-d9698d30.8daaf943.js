(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d9698d30"],{"6b01":function(t,s,i){"use strict";i.r(s);var a=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"artist"},[a("div",{staticClass:"header",on:{click:t.back}},[a("img",{staticClass:"auto-img",attrs:{src:i("dbfa"),alt:""}})]),t.artistData.artist?a("div",{staticClass:"hd"},[a("img",{staticClass:"auto-img",attrs:{src:t.artistData.artist.picUrl}}),a("div",{staticClass:"artist-info"},[a("p",{staticClass:"name"},[t._v(t._s(t.artistData.artist.name))])])]):t._e(),a("HomeTitle",[t._v("歌手简介")]),t.artistData.artist?a("div",{staticClass:"intro"},[a("p",{class:{fthide2:t.isShowf},staticStyle:{color:"#666"}},[t._v(t._s(t.artistData.artist.briefDesc))]),t.isShow?a("div",{staticClass:"full",on:{click:t.clickShow}},[t._v(" 收起 "),a("i",{staticClass:"arrow",class:{arrowup:t.isShow}})]):a("div",{staticClass:"full",on:{click:t.clickShow}},[t._v(" 完整歌手介绍 "),a("i",{staticClass:"arrow",class:{arrowup:t.isShow}})])]):t._e(),a("HomeTitle",[t._v("热门单曲")]),a("ul",{staticClass:"hot-item"},t._l(t.artistData.hotSongs,(function(s,i){return a("Songsheetlistitem",{key:i,attrs:{item:s,number:i},on:{"translate-currentid":function(s){return t.$emit("translate-currentid",s)}}})})),1)],1)},e=[],r=(i("e85a"),i("e3fe")),c=i("df54"),o={name:"Artist",components:{HomeTitle:r["a"],Songsheetlistitem:c["a"]},data:function(){return{id:"",artistData:[],isShow:!1,isShowf:!0}},created:function(){this.id=this.$route.query.id,this.getArtistData(this.id)},methods:{back:function(){this.$router.go(-1)},getArtistData:function(t){var s=this;this.artistData=[],this.$toast.loading({message:"加载中...",forbidClick:!0,duration:0,loadingType:"spinner"}),this.axios({method:"GET",url:"http://music.kele8.cn/artists?id="+t}).then((function(t){s.$toast.clear(),200==t.data.code&&(s.artistData=t.data)})).catch((function(t){s.$toast.clear()}))},clickShow:function(){this.isShow=!this.isShow,this.isShowf=!this.isShowf}}},n=o,l=i("2877"),u=Object(l["a"])(n,a,e,!1,null,"88e96df4",null);s["default"]=u.exports},e3fe:function(t,s,i){"use strict";var a=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"recommend-title"},[i("h3",[t._t("default")],2)])},e=[],r={},c=r,o=i("2877"),n=Object(o["a"])(c,a,e,!1,null,"2d81c866",null);s["a"]=n.exports},e85a:function(t,s,i){}}]);
//# sourceMappingURL=chunk-d9698d30.8daaf943.js.map