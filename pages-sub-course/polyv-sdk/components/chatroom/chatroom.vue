<template>
<uni-shadow-root class="polyv-sdk-components-chatroom-chatroom"><view :class="'plv-mp-chatroom-wrap plv-mp-skin__'+(skin)">
  <scroll-view class="plv-mp-chatroom-scroll-view" :scroll-top="scrollTop" @scroll="onChatListScroll" scroll-y>
    <chat-list id="chatList" :isOnlyHost="isOnlyHost" :chat-list="chatList" :has-more="hasMore" @seemore="handleSeeMore" :skin="skin"></chat-list>
  </scroll-view>
  <view v-if="comeMore" class="plv-mp-chatroom-more" @click="handleSeeMoreMsg">有更多新消息，点击查看</view>

  
  <view class="plv-mp-chatroom-thumb" @click="handleLike" v-if="showSendLike">
    <image src="../../assets/images/chat-icon-thumb.png" class="plv-mp-chatroom-icon__thumb"></image>
    <text class="plv-mp-chatroom-thumb__text">{{ channelDetail.likes }}</text>
  </view>

  <chat-edit :skin="skin" @like="handleLike" @sengmsg="handleSendMsg" @onlyhost="handleOnlyHost" @showbulletin="handleShowBulletin" :showBulletin="showBulletin"></chat-edit>
</view></uni-shadow-root>


</template><script>
import ChatList from '../chat-list/chat-list.vue'
import ChatEdit from '../chat-edit/chat-edit.vue'
global['__wxVueOptions'] = {components:{'chat-list': ChatList,'chat-edit': ChatEdit}}

global['__wxRoute'] = 'polyv-sdk/components/chatroom/chatroom'
import Event from"../../common/chat/eventTypes";import util from"../../common/utils/utils";import store from"../../store/index";const MAX_MSG_COUNT=200;Component({properties:{channelDetail:Object,showBulletin:{type:Boolean,value:!1},skin:{type:String,value:"black",observer(t){"black"!==t&&"white"!==t&&this.setData({skin:"black"})}}},data:{chatList:[],hasMore:!1,scrollTop:0,isOnlyHost:!1,comeMore:!1,showSendLike:!0},lifetimes:{created(){this.chatEvent=this.getChatEvent(),this.notJoinLists=[],this.clock=null,this.chat=null,this.chatTop=0,this.scrollHeight=0,this.chatListHeight=0},ready(){util.getDomRect(".plv-mp-chatroom-scroll-view",this).then(({height:t})=>{this.scrollHeight=t})},attached(){const t=this;this.unsub=store.get({"main.chat":t=>{this.chat=t,t&&(this.bindEvent(this.chatEvent),this.chat.getHistoryMessage(20,0),this.initChatListQueue())},"main.channelDetail":s=>{t.setData({showSendLike:"Y"===s.sendFlowersEnabled})}})},detached(){if(this.unsub(),clearInterval(this.clock),!this.chat)return;const t=this.chatEvent;Object.keys(t).forEach(s=>{this.chat.off(s,t[s])}),this.chat=null}},methods:{handleSeeMore(){this.chat.hasMoreHistory()&&this.chat.getHistoryMessage()},handleLike(){this.chat.sendLike(1)},handleSendMsg(t){const s=t.detail.chatTitle;this.chat.send(s),this.isSelfMsg=!0},handleOnlyHost(t){const s=t.detail.isOnlyHost;this.setData({isOnlyHost:s})},handleSeeMoreMsg(){this.setData({comeMore:!1}),this.chatScrollToBottom()},onChatListScroll(t){if(this.chatTop=t.detail.scrollTop,this.data.comeMore){this.chatTop+this.scrollHeight+10>=this.chatListHeight&&this.setData({comeMore:!1})}},handleShowBulletin(){this.triggerEvent("onTapBulletin")},bindEvent(t){const s=this.chat;s&&Object.keys(t).forEach(i=>{s.on(i,t[i])})},getChatEvent(){const t=this;return{[Event.HISTORY_MESSAGE](s,i){const e=0===t.data.chatList.length,h=[...i,...t.data.chatList];t.setData({chatList:h,hasMore:t.chat.hasMoreHistory()}),wx.nextTick(()=>{e&&t.chatScrollToBottom()})},[Event.SPEAK](s,i){let e=!1;try{t.data.chatList.forEach(t=>{if(t.id===i.id)throw e=!0,Error("same id")})}catch(t){}!e&&t.notJoinLists.push(i)},[Event.CHAT_IMG](s,i){i.content=i.values[0],t.notJoinLists.push(i)},[Event.REMOVE_HISTORY](){t.setData({chatList:[],hasMore:!1})},[Event.REMOVE_CONTENT](s,i){const e=[...t.data.chatList];e.forEach((s,h)=>{s.id===i.id&&(e.splice(h,1),t.setData({chatList:e}))})},[Event.SYSTEM_MESSAGE](s,i){t.notJoinLists.push(i)},[Event.SPEAK_ERROR](s,i){t.notJoinLists.push(i)},[Event.SEND_MESSAGE](s,i){t.setData({chatList:[...t.data.chatList,i]}),wx.nextTick(()=>{t.chatScrollToBottom()})},[Event.SPEAK_CENSOR](s,i){const e=`chatList[${t.data.chatList.length-1}].id`;t.setData({[e]:i.id})},[Event.REWARD](s,i){t.notJoinLists.push({...i,id:Math.floor(1e7*Math.random())})},[Event.LIKES](s,i){t.notJoinLists.push({...i,id:Math.floor(1e7*Math.random())})},[Event.FLOWERS](s,i){t.notJoinLists.push({...i,id:Math.floor(1e7*Math.random())})},[Event.CLOSE_ROOM](){t.notJoinLists.push({id:Math.floor(1e7*Math.random()),system:!0,content:"房间暂时关闭"})},[Event.OPEN_ROOM](){t.notJoinLists.push({id:Math.floor(1e7*Math.random()),system:!0,content:"房间已经打开"})},[Event.KICK_USER](s,i){t.notJoinLists.push({system:!0,content:`${i.user.nick}[被踢出房间]`})}}},initChatListQueue(){this.clock=setInterval(()=>{if(this.notJoinLists.length){const t=this.chatListHeight-2*this.scrollHeight<=this.chatTop;let s=[...this.data.chatList,...this.notJoinLists];s.length>200&&(s=s.slice(200)),this.setData({chatList:s}),this.notJoinLists=[],wx.nextTick(()=>{t?this.chatScrollToBottom():(util.getDomRect("#chatList",this).then(({height:t})=>{this.chatListHeight=t}),this.setData({comeMore:!this.isSelfMsg},()=>{this.isSelfMsg=!1}))})}},600)},chatScrollToBottom(){util.getDomRect("#chatList",this).then(({height:t})=>{this.chatListHeight=t,this.setData({scrollTop:t})})}}});
export default global['__wxComponents']['polyv-sdk/components/chatroom/chatroom']
</script>
<style platform="mp-weixin">
.plv-mp-chatroom-wrap{height:100%;position:relative;padding-bottom:100rpx;box-sizing:border-box;background:#44434f}.plv-mp-chatroom-scroll-view{height:100%}.plv-mp-chatroom-more{position:absolute;left:0;right:0;bottom:100rpx;height:64rpx;line-height:64rpx;color:#fff;font-size:26rpx;background:#6ebbf7;text-align:center}.plv-mp-chatroom-thumb{position:absolute;bottom:128rpx;right:32rpx;display:flex;align-items:center;justify-content:center;flex-direction:column}.plv-mp-chatroom-icon__thumb{width:92rpx;height:92rpx;margin-bottom:6rpx}.plv-mp-chatroom-thumb__text{font-size:28rpx;color:#333}.plv-mp-skin__white{background:#f5f9fa}
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