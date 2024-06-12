<template>
<uni-shadow-root class="polyv-sdk-components-concat-player-concat-player"><view :class="'plv-mp-contact-layout plv-mp-skin__'+(skin)+' '+(aspect === '9:16' ? 'plv-mp-concat-layout-16-9' : '')">
  <view class="plv-mp-contact-player-list">
    <view :class="'plv-mp-contact-player-box '+(camera ? '' : 'plv-mp-contact-player-audio')+' '+(camera && muteVideo ? 'plv-mp-contact-player-box-mute-video' : '')" v-if="'pushUrl'" :style="'width:'+(widthAndTop.width)">
      <live-pusher class="plv-contact__live-pusher" :url="pushUrl" mode="RTC" :aspect="aspect" beauty="3" whiteness="3" :enable-camera="camera" autopush max-bitrate="200" @statechange="recorderStateChange"></live-pusher>
    </view>
    <view v-for="(item,index) in (pullUrl)" :key="item.uid" :class="'plv-mp-contact-player-box '+(!camera && !item.isTeacher ? 'plv-mp-contact-player-audio' : '')" :style="'width:'+(widthAndTop.width)">
      <live-player class="plv-contact__live-player" :src="item.url" mode="RTC" object-fit="fillCrop" autoplay="true"></live-player>
    </view>
  </view>
  <view class="plv-mp-contact-layout-resize" :style="'height:'+(resizeHeight)"></view>
</view></uni-shadow-root>


</template><script>

global['__wxRoute'] = 'polyv-sdk/components/concat-player/concat-player'
import Event from"../../common/chat/eventTypes";import VideoChat from"../../common/videoChat/videoChat";import regeneratorRuntime from"../../common/regenerator-runtime/runtime-module";import computedBehavior from"../../common/computed/index";Component({behaviors:[computedBehavior],data:{pushUrl:"",userNumber:0,pullUrl:[],resizeHeight:0,chatEventBindThis:{},muteVideo:!1,muteAudio:!1},properties:{getChatInstance:{type:Function,observer(t){}},initEvent:{type:Object,observer(t){}},camera:Boolean,skin:{type:String,value:"black",observer(t){"black"!==t&&"white"!==t&&this.setData({skin:"black"})}},aspect:{type:String,value:"3:4"}},computed:{widthAndTop(){const{userNumber:t}=this.data;let e="33.33%";t>0&&t<=4&&(e="50%");let i="0";return t<3?i=18.25:t>4&&t<7&&(i=12.5),{width:e,top:i+"%"}}},lifetimes:{ready(){const t=this.data.getChatInstance();if(this.chat=t,!t)return;const e=this.getChatEvent()||{};this.listenEvent(e),this.videoChat=new VideoChat({roomName:this.chat.options.roomId,micUserId:this.chat.micUserId}),this.initPushPlayer()}},methods:{getChatEvent:()=>({[Event.MICROPHONE](t,e){const i=this.videoChat;"close"!==e.status||e.userId&&e.userId/1!==i.uid||this.leave(!e.userId)},[Event.MUTE_USER_MICRO](t,e){const i=this.videoChat;e.mute?i.muteLocal(e.type):i.unmuteLocal(e.type)}}),getVideoEvent:()=>[{type:"stream-init",handler(){this.videoChat.publishStream().then(t=>{const e=t,i=this.data.userNumber+1;this.setData({pushUrl:e,userNumber:i}),setTimeout(()=>{this.computedResizeHeight(i)},1e3)})}},{type:"stream-added",handler(t){this.videoChat.subscribe(t)}},{type:"stream-subscribed",handler(t){const e=Object.assign({},t);console.info("stream-subscribed:",e),e.isTeacher=this.chat.teacherData.userId/1===t.uid;const i=this.data.userNumber+1,s=this.data.pullUrl;s.push(e),this.setData({userNumber:i}),setTimeout(()=>{this.setData({pullUrl:s})},0),setTimeout(()=>{this.computedResizeHeight(i)},1e3)}},{type:"stream-removed",handler(t){let e=this.data.pullUrl,i=this.data.userNumber;const s=t.uid[0];e.find(t=>t.uid===s)&&(i-=1),this.setData({userNumber:i}),setTimeout(()=>{e=e.filter(t=>t.uid!==s),this.setData({pullUrl:e})},0),setTimeout(()=>{this.computedResizeHeight(i)},1e3)}},{type:"mute-local",handler(t){console.info(">>>muteLocal:",t),"success"===t.status&&("video"===t.type?this.setData({muteVideo:!0}):this.setData({muteAudio:!0}))}},{type:"unmute-local",handler(t){console.info(">>>unmuteLocal:",t),"success"===t.status&&("video"===t.type?this.setData({muteVideo:!1}):this.setData({muteAudio:!1}))}}],computedResizeHeight(t){this.setData({resizeHeight:`${t%2+1}px`})},listenEvent(t={}){const e=this.chat;return!!e&&(Object.keys(t).forEach(i=>{this.data.chatEventBindThis[i]=t[i].bind(this),e.on(i,this.data.chatEventBindThis[i])}),!0)},recorderStateChange(t){t.detail.code,-1307===t.detail.code&&(this.chat.cancelJoinChannel(),this.leave())},async initPushPlayer(){const t=await this.videoChat.initClient();try{await this.videoChat.joinChannel(t)}catch(t){return void this.leave()}this.chat.joinChannelSuccess(),this.videoChat.initEvent(),this.getVideoEvent().forEach(t=>{this.videoChat.on(t.type,t.handler.bind(this))}),this.videoChat.addStream()},leave(t=!1){this.videoChat.leave(),this.triggerEvent("leave",t),this.videoChat=null,Object.keys(this.data.chatEventBindThis).forEach(t=>{this.chat.off(t,this.data.chatEventBindThis[t])})}}});
export default global['__wxComponents']['polyv-sdk/components/concat-player/concat-player']
</script>
<style platform="mp-weixin">
.plv-mp-contact-layout{position:absolute;width:100%;height:100%;left:0;top:0;background-color:#000;box-sizing:border-box;overflow:hidden}.plv-mp-contact-player-list{position:relative;width:100%;font-size:0;text-align:center;top:50%;transform:translateY(-50%)}.plv-mp-contact-player-box{margin:0 auto;background-color:#393842;display:inline-block;position:relative;background-image:url(https://router.polyv.net/proxy/livestatic.videocc.net/assets/ppt/images/video_1280x720.d7b1a9e.png);background-size:50%;background-position:50%;background-repeat:no-repeat}.plv-mp-contact-player-box:before{padding-top:75%;content:"";display:block}.plv-mp-contact-player-box>.plv-contact__live-player,.plv-mp-contact-player-box>.plv-contact__live-pusher{position:absolute;left:0;top:0;width:100%;height:100%}.plv-mp-contact-player-box .plv-mp-contact-control{position:absolute;bottom:0;left:0;width:100%;padding:0 5px;background:rgba(0,0,0,.65);box-sizing:border-box}.plv-mp-contact-player-box .plv-mp-contact-control-left{text-align:left}.plv-mp-contact-player-box .plv-mp-contact-control-icon{display:inline-block;width:18px;height:18px;margin:10px 5px}.plv-mp-contact-player-box-mute-video .plv-contact__live-player,.plv-mp-contact-player-box-mute-video .plv-contact__live-pusher{opacity:0}.plv-mp-concat-layout-16-9 .plv-mp-contact-player-box:before{padding-top:56.25%}.plv-mp-contact-player-audio>.plv-contact__live-player,.plv-mp-contact-player-audio>.plv-contact__live-pusher{height:0}.plv-mp-contact-test{position:absolute;bottom:10px;right:10px;background:#000}.plv-mp-contact-layout-resize{background-color:rgba(0,0,0,.1);opacity:0}.plv-mp-skin__white .plv-mp-contact-player-box{background:url(https://router.polyv.net/proxy/livestatic.videocc.net/assets/wimages/player/ppt/nocamera.png) 50%/100% no-repeat}
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