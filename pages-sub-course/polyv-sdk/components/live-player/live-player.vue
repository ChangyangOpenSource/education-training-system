<template>
<uni-shadow-root class="polyv-sdk-components-live-player-live-player"><view class="plv-player-live">
  
  <cover-view v-if="(!canWatch)" class="plv-player-live__canot__watch">
    <cover-image class="player-canot-watch__image" src="https://livestatic.videocc.net/v_84/assets/wimages/icon.png"></cover-image>
    <cover-view class="player-canot-watch__view">当前在线无法播放</cover-view>
    <cover-view class="player-canot-watch__view">
      请刷新重试或向管理员反馈{{ errorCode }}
    </cover-view>
  </cover-view>
  
  <live-player v-if="liveMode === 1 && !forceVideo" class="plv-player-live__player plv-player-live__player__live" id="plvLivePlayer" :src="videoSrc" min-cache="1" max-cache="1" autoplay="true" @click.stop.prevent="showPlayControl" @statechange="onStateChange">
    <danmu v-if="danmuEnabled && closeDanmuEnable === 'N' && isDocTypeAndNotSwitch && allowDanmu"></danmu>
    <skin v-if="(showControl || skinAlwaysShow )&& usePlayerSkin" :lines="lines" :forceVideo="forceVideo" :liveMode="liveMode" :closeDanmuEnable="closeDanmuEnable" :changeScreenSuccess="changeScreenSuccess" :currentLine="currentLine" :currentRate="currentRate" :danmuEnabled="danmuEnabled" :allowDanmu="allowDanmu" @changePlayStatus="changePlayStatus" @refresh="refresh" @changeScreen="changeScreen" @changeLine="changeLine" @updateDanmuEnabled="updateDanmuEnabled"></skin>
  </live-player>
  
  <video v-else-if="liveMode === 2 || (liveMode !== 0 && forceVideo)" class="plv-player-live__player plv-player-live__player__vod" id="plvLiveVodPlayer" :src="videoSrc" :loop="isWarm" :controls="liveMode === 2" :enable-danmu="true" autoplay @click="showPlayControl" @ended="onLiveVodEnded" @error="onLiveVodError" @timeupdate="onLiveTimeUpdate"></video>
  
  <image v-else :src="imgSrc" class="plv-player-live__player plv-player-live__player__image" mode="aspectFill"></image>
    <danmu v-if="liveMode !== 2 && forceVideo && danmuEnabled && closeDanmuEnable === 'N' && allowDanmu"></danmu>
    <skin v-if="usePlayerSkin && forceVideo && ((showControl && ((liveMode === 1) || liveMode === 2)) || skinAlwaysShow)" :liveMode="liveMode" :lines="lines" :forceVideo="forceVideo" :closeDanmuEnable="closeDanmuEnable" :changeScreenSuccess="changeScreenSuccess" :currentLine="currentLine" :currentRate="currentRate" :danmuEnabled="danmuEnabled" @changePlayStatus="changePlayStatus" @refresh="refresh" @changeScreen="changeScreen" @changeLine="changeLine" @changeRate="changeRate" @updateDanmuEnabled="updateDanmuEnabled"></skin>
</view></uni-shadow-root>


</template><script>
import Danmu from '../danmu/danmu.vue'
import Skin from '../skin/skin.vue'
global['__wxVueOptions'] = {components:{'danmu': Danmu,'skin': Skin}}

global['__wxRoute'] = 'polyv-sdk/components/live-player/live-player'
import PolyvLive from"../../common/player/polyvlive.min";import store from"../../store/index";Component({properties:{videoOption:{type:Object,observer(e){this.setData(e),2===e.liveMode?this.data.isVod=!0:this.data.isVod=!1,this.init()}},skin:{type:String,value:"black",observer(e){"black"!==e&&"white"!==e&&this.setData({skin:"black"})}},usePlayerSkin:{type:Boolean,value:!0},menuType:{type:String,value:"",observer(e){const{liveType:t,isSwitched:i}=this.data;this.setData({isDocTypeAndNotSwitch:!("live"===t&&i&&"doc"!==e)})}},isSwitched:{type:Boolean,value:!1,observer(e){const{liveType:t,menuType:i}=this.data;this.setData({isDocTypeAndNotSwitch:!("live"===t&&e&&"doc"!==i)})}},skinAlwaysShow:{type:Boolean,value:!1},allowDanmu:{type:Boolean,value:!0}},data:{liveMode:1,videoSrc:"",isVod:!1,statistics:{},liveType:"live",loop:!1,isWarm:!1,isAutoChange:!1,forceVideo:!1,isOffNetwork:!1,isOffLive:!1,isBrokenNet:!1,networkTips:"网络异常，请退出后重试",canWatch:!0,imgSrc:"",muted:!1,showControl:!0,lines:[],danmuEnabled:!0,currentLine:0,currentRate:1,isDocTypeAndNotSwitch:!0},lifetimes:{attached(){this.liveVideoContext=wx.createLivePlayerContext("plvLivePlayer",this),this.liveVodVideoContext=wx.createVideoContext("plvLiveVodPlayer",this),this.hidePlayControl(),wx.getSystemInfo({success:e=>{"android"===e.platform&&this.setData({skinAlwaysShow:!0})}})},detached(){this.polyvLive&&this.polyvLive.destroy()}},methods:{init(){this.polyvLive&&this.polyvLive.destroy&&this.polyvLive.destroy(),this.polyvLive=new PolyvLive,this.initLiveType(),this.initLivePlayer()},initLivePlayer(){const{uid:e,cid:t,statistics:i,isOffNetwork:s,forceVideo:o,skin:a,isVod:n,vodsrc:r,isAutoChange:d,globalInterval:l}=this.data,h="white"===a;this.polyvLive.getVideo({uid:e,vid:t,isSkinWhite:h,statistics:i,isAutoChange:d,globalInterval:l,forceSessionId:!0,vodsrc:n?r:"",success:e=>{if(e.errorCode)return void this.setData({canWatch:!1,errorCode:e.errorCode});if(1!==this.data.liveMode)return;const t=o?e.src:e.flvSrc;this.setVideoSrc(t)},onChangeType:(e,t,i)=>{const{liveMode:s,videoSrc:o,forceVideo:a}=this.data;"live"===e&&1===s||(this.setData({liveType:e}),this.setLiveType(e,t))},onNetWorkChange:e=>{s!==e&&this.setData({isOffNetwork:e}),this.showNetWorkTips()},onApiStatus:e=>{"live"===this.currentStatus&&"end"===e&&this.changeScreen({detail:"half"}),this.currentStatus=e,this.triggerEvent("onLiveStatusChange",{status:e})},onUpdateChannelJson:e=>{this.setData({lines:e.lines,closeDanmuEnable:e.closeDanmuEnable})}})},initLiveType(){this.liveType=new Map([["live",e=>{this.setLiveMode(1),this.setVideoSrc(e)}],["warmImage",e=>{this.setLiveMode(0),this.setWarmImg(e)}],["warmVideo",e=>{this.setLiveMode(2),this.setVideoSrc(e,!0,!1)}],["vod",e=>{this.setLiveMode(2),this.setVideoSrc(e)}],["default",()=>{}]])},setLiveType(e,t){this.liveType.get(e)(t)||this.liveType.get("default")()},setLiveMode(e){this.data.liveMode!==e&&this.setData({liveMode:e})},setVideoSrc(e,t=!1){this.setData({videoSrc:e,isWarm:t})},setWarmImg(e){this.setData({imgSrc:e})},onLiveTimeUpdate(e){const t=e.detail.currentTime;this.polyvLive.updateTime(t),this.triggerEvent("onLiveStorageProgress",{currentTime:t})},onLiveVodEnded(){this.triggerEvent("onLiveVodEnd")},onLiveVodError(){},onStateChange(e){const t=/-2301|-2302/i.test(e.detail.code);t&&(this.polyvLive.getReconnectSrc(e=>{this.setVideoSrc(e)}),this.setData({isOffLive:t})),2005===e.detail.code&&this.data.isBrokenNet&&this.setData({isBrokenNet:!1}),this.showNetWorkTips()},showNetWorkTips(e,t){this.data.isOffNetwork&&this.data.isOffLive&&!this.data.isBrokenNet&&this.setData({isBrokenNet:!0})},resumeStats(e){this.polyvLive.resumeStats(e)},setMuted(e){this.setData({muted:e})},hidePlayControl(){clearTimeout(this.data.controlTimer),this.data.controlTimer=setTimeout(()=>{this.setData({showControl:!1})},3e3)},showPlayControl(){this.setData({showControl:!0}),this.hidePlayControl()},changePlayStatus(e){const t=e.detail,{liveMode:i,forceVideo:s}=this.data;0!==i&&s?"pause"===t?this.liveVodVideoContext.pause():this.liveVodVideoContext.play():"pause"===t?this.liveVideoContext.pause():this.liveVideoContext.resume()},refresh(){const{liveMode:e,forceVideo:t}=this.data;0!==e&&t?this.liveVodVideoContext.play():this.liveVideoContext.resume()},changeScreen(e){const t=e.detail,i=this,{liveMode:s,forceVideo:o}=this.data;if(console.info(s,o,"====liveMode, forceVideo==="),0!==s&&o)return"full"===t?this.liveVodVideoContext.requestFullScreen({direction:90}):this.liveVodVideoContext.exitFullScreen(),this.setData({changeScreenSuccess:t}),void store.set("main.screenType",t);if("full"===t)this.liveVideoContext.requestFullScreen({direction:90,success:function(){i.setData({changeScreenSuccess:t})}});else{if("full"!==this.data.changeScreenSuccess)return;this.liveVideoContext.exitFullScreen({success:function(){i.setData({changeScreenSuccess:t})}})}store.set("main.screenType",t)},hideSettingContent(){this.setData({settingShow:!1})},setting(){const{settingShow:e}=this.data;this.setData({settingShow:!e})},changeLine(e){this.setVideoSrc(e.detail.src),this.setData({currentLine:e.detail.line})},changeRate(e){const t=e.detail,i=[.5,1,1.25,1.5,2][t];this.setData({currentRate:t}),this.liveVodVideoContext.playbackRate(i)},sendDanmu(e){const{danmuEnabled:t,allowDanmu:i}=this.data;"Y"!==this.data.closeDanmuEnable&&t&&i&&this.liveVodVideoContext.sendDanmu({text:e})},updateDanmuEnabled(e){this.setData({danmuEnabled:!e.detail})}}});
export default global['__wxComponents']['polyv-sdk/components/live-player/live-player']
</script>
<style platform="mp-weixin">
.plv-player-live{position:relative}.plv-player-live,.plv-player-live__player{width:100%;height:100%}.plv-player-live__player__tips{position:absolute;bottom:20rpx;left:10rpx;font-size:14px}.plv-player-live__canot__watch{position:absolute;z-index:99;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;box-sizing:border-box;color:#fff;background-color:#000}.plv-player-live__canot__watch .player-canot-watch__view{line-height:1.5}.plv-player-live__canot__watch .player-canot-watch__image{width:60px;height:60px;margin:0 auto}.plv-control-setting-playback{position:absolute;width:32px;height:32px;top:50%;transform:translateY(-50%);right:10px}
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