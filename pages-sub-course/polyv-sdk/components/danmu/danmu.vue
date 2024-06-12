<template>
<uni-shadow-root class="polyv-sdk-components-danmu-danmu"><cover-view class="plv-danmu-content">
 <block v-for="(item,index) in (barrageList)" :key="item.unique">
  <cover-view :data-index="index" :style="'color:'+(item.color)+';left:'+(item.left)+'px;top:'+(item.top)+'px; '" class="plv-danmu-item" :animation="animationList[index]">{{item.text}}
  </cover-view>
 </block>
</cover-view></uni-shadow-root>


</template><script>

global['__wxRoute'] = 'polyv-sdk/components/danmu/danmu'
import Event from"../../common/chat/eventTypes";import store from"../../store/index";Component({data:{barrageList:[],animationList:[],finishList:[]},lifetimes:{created(){this.chatEvent=this.getChatEvent(),this.chat=null,this.unSendMsgList=[];const t=this;wx.getSystemInfo({success:e=>{t.setData({barrageWidth:e.windowWidth,barrageHeiht:.56*e.windowWidth})}})},attached(){this.unsub=store.get({"main.chat":t=>{this.chat=t,t&&this.bindEvent(this.chatEvent)}})},detached(){if(clearInterval(this.testTimer),this.unsub(),!this.chat)return;const t=this.chatEvent;Object.keys(t).forEach(e=>{this.chat.off(e,t[e])}),this.chat=null,clearInterval(this.removeTimer)}},methods:{createBarrageObj(t){const{barrageWidth:e,barrageHeiht:i,animationList:a}=this.data,s=JSON.parse(JSON.stringify(this.data.barrageList)),n={left:e,top:parseInt(150*Math.random()),color:"#fff",text:t};s.push(n),this.setData({barrageList:s}),this.animation=wx.createAnimation({duration:8e3,timingFunction:"linear"}),this.animation.translateX(-(e+2e3)).step(),a.push(this.animation.export()),this.setData({animationView:this.animation.export(),animationList:a})},bindEvent(t){const e=this.chat;e&&Object.keys(t).forEach(i=>{e.on(i,t[i])})},getChatEvent(){const t=this;return{[Event.SPEAK](e,i){t.barrageSendProxy(i.content)},[Event.SEND_MESSAGE](e,i){t.barrageSendProxy(i.content)}}},barrageSendProxy(t){const{animationList:e,barrageList:i}=this.data;if(i.length>=40){if(this.unSendMsgList.push(t),this.deleyClearBarrageTimer)return;this.deleyClearBarrageTimer=setTimeout(()=>{this.setData({animationList:[...e].slice(40),barrageList:[...i].slice(40)})},2e3)}else this.deleyClearBarrageTimer&&(clearTimeout(this.deleyClearBarrageTimer),this.deleyClearBarrageTimer=null),this.unSendMsgList.length>0&&this.unSendMsgShow(),this.createBarrageObj(t)},unSendMsgShow(){const t=[...this.unSendMsgList].slice(-10);this.unSendMsgList=[],this.unsendListTimer&&clearTimeout(this.unsendListTimer);const e=t=>new Promise(e=>{this.unsendListTimer=setTimeout(()=>e(),200*t)});t.forEach((t,i)=>e(i).then(()=>this.createBarrageObj(t)))}}});
export default global['__wxComponents']['polyv-sdk/components/danmu/danmu']
</script>
<style platform="mp-weixin">
.plv-danmu-content{position:absolute;width:100%;height:100%;top:0}.plv-danmu-content .plv-danmu-item{position:absolute}
	.chucuno {
		position: absolute;
		top: 50%;
		margin-top: -150rpx;
		z-index: 99999;
		left: 50%;
		margin-left: -325rpx;
	}

.back-tankuang {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 99999;
		height: 100%;
		background: rgba(51, 51, 51, 0.5);
	}</style>