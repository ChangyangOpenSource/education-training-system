<template>
<uni-shadow-root class="polyv-sdk-components-concat-concat"><view :class="'plv-mp-video-player-box '+(allowContact ? '' : 'plv-mp-video-player-hide')">
  <concat-player class="plv-mp-concat-player" v-if="allowContact" :getChatInstance="getChatInstance" :initEvent="initEvent" :camera="camera" :aspect="aspect" @leave="leave" ref="contact" :skin="skin"></concat-player>
</view></uni-shadow-root>


</template><script>
import ConcatPlayer from '../concat-player/concat-player.vue'
global['__wxVueOptions'] = {components:{'concat-player': ConcatPlayer}}

global['__wxRoute'] = 'polyv-sdk/components/concat/concat'
import regeneratorRuntime from"../../common/regenerator-runtime/runtime-module";import Event from"../../common/chat/eventTypes";import VideoChat from"../../common/videoChat/videoChat";import store from"../../store/index";Component({data:{type:"apply",allowContact:!1,contactType:"video",camera:!0,chatEvent:{[Event.MICROPHONE](t,e){let a=this.data.type;if(e.teacherId){if(this.chat.teacherData.teacherId=e.teacherId/1,this.data.allowContact&&"open"===e.status)return;this.triggerEvent("refreshStatus",{show:"open"===e.status,txt:"申请连线",type:"apply"}),this.triggerEvent("show",e),a="apply"}this.setData({contactType:e.type,camera:"video"===e.type,type:a})},[Event.ALLOW_MICROPHONE](){this.setData({type:"stop",allowContact:!0}),this.triggerEvent("refreshStatus",{show:!0,txt:"挂断连线",type:"stop"})},[Event.JOIN_CHANNEL_FAIL](){this.setData({type:"apply"}),this.triggerEvent("refreshStatus",{show:!0,txt:"申请连线",type:"apply"})}},getChatInstance:()=>{},rtcType:"agora"},properties:{applyData:{type:Object,value:{show:!1,txt:"申请连线"}},skin:{type:String,value:"black",observer(t){"black"!==t&&"white"!==t&&this.setData({skin:"black"})}},aspect:{type:String,value:"3:4"},channelDetail:{type:Object,observer(t){this.setData({rtcType:t.rtcType})}}},lifetimes:{ready(){},attached(){this.unsub=store.get({"main.chat":t=>{if("agora"!==this.data.rtcType)return;if(this.chat=t,!t)return;this.setData({getChatInstance:()=>this.chat});const e=this.data.chatEvent||{};this.listenEvent(e),this.clock=this.checkCurrentStatus()}})},detached(){this.unsub(),clearInterval(this.clock),this.data.allowContact&&this.selectComponent(".plv-mp-concat-player").leave()}},methods:{getChatEvent:()=>({[Event.MICROPHONE](t,e){let a=this.data.type;if(e.teacherId){if(this.chat.teacherData.teacherId=e.teacherId/1,this.data.allowContact&&"open"===e.status)return;this.triggerEvent("refreshStatus",{show:"open"===e.status,txt:"申请连线",type:"apply"}),this.triggerEvent("show",e),a="apply"}this.setData({contactType:e.type,camera:"video"===e.type,type:a})},[Event.ALLOW_MICROPHONE](){this.setData({type:"stop",allowContact:!0}),this.triggerEvent("refreshStatus",{show:!0,txt:"挂断连线",type:"stop"})},[Event.JOIN_CHANNEL_FAIL](){this.setData({type:"apply"}),this.triggerEvent("refreshStatus",{show:!0,txt:"申请连线",type:"apply"})}}),listenEvent(t={}){const e=this.chat;return!!e&&(Object.keys(t).forEach(a=>{e.on(a,t[a].bind(this))}),!0)},checkCurrentStatus(){const t=()=>{this.chat.checkCurrentStatus().then(t=>{if(200!==t.statusCode||200!==t.data.code)return;const e=t.data.data;e.type!==this.data.contactType&&this.setData({contactType:e.type,camera:"video"===e.type});const a=e.status,s=this.data.allowContact,r=this.data.type;"open"!==a||"cancel"===r||s?"close"===a&&(s&&this.selectComponent(".plv-mp-concat-player").leave(),this.triggerEvent("refreshStatus",{show:!1,type:"apply",txt:"申请连线"})):this.triggerEvent("refreshStatus",{show:!0,type:"apply",txt:"申请连线"})}).catch(t=>{})};return t(),setInterval(t,2e4)},leave(t){this.setData({allowContact:!1,type:"apply"}),this.triggerEvent("stop",!0),setTimeout(()=>{this.triggerEvent("refreshStatus",{show:!t.detail,txt:"申请连线",type:"apply"})},0)},stop(){"agora"===this.data.rtcType&&(this.selectComponent(".plv-mp-concat-player").leave(),this.chat.cancelJoinChannel())},async apply(){if("agora"!==this.data.rtcType)return;const t=this.chat,e={show:!0};if("stop"!==this.data.type){if("cancel"===this.data.type)t.cancelJoinChannel(),e.txt="申请连线",e.type="apply";else{try{await VideoChat.requestPermissions()}catch(t){return void wx.showModal({title:"温馨提示",content:"麦克风和摄像头权限已被关闭，请到“设置”打开权限",showCancel:!1})}t.joinChannel(),e.txt="取消申请",e.type="cancel"}this.setData({type:e.type}),this.triggerEvent("refreshStatus",e)}else this.triggerEvent("stop")}}});
export default global['__wxComponents']['polyv-sdk/components/concat/concat']
</script>
<style platform="mp-weixin">
.plv-mp-concat{width:100%;height:100%}.plv-mp-video-player-hide{display:none}.plv-mp-video-player-box{overflow:hidden}
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