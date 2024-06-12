<template>
<uni-shadow-root class="polyv-sdk-components-player-player"><view class="plv-player">
  
  <plv-live-player id="plv-live-player" v-if="mode === 'live'" :skin="skin" :videoOption="videoOption" :menuType="menuType" :isSwitched="isSwitched" :usePlayerSkin="usePlayerSkin" :allowDanmu="allowDanmu" :skinAlwaysShow="skinAlwaysShow" @onLiveStorageProgress="onLiveStorageProgress" @onLiveVodEnd="onLiveVodEnd" @onLiveStatusChange="onLiveStatusChange"></plv-live-player>
  
  <view class="plv-mp-vod-player-box" v-else>
    <video class="plv-mp-vod-player-box-video" id="plvVodPlayer" :src="vodSrc" :muted="muted" autoplay :enable-danmu="true" object-fit="contain" @click="showSetControl" @timeupdate="onVodTimeUpdate" @play="onVodPlay" @pause="onVodPause" @waiting="onVodWaiting" @ended="onVodEnded" @error="onVodError">
      <cover-image v-if="isCamClosed === 1" src="https://playertest.polyv.net/player2/test/nong/nocamera_ppt.jpg"></cover-image>
      <cover-image @click="setting" v-if="usePlayerSkin && showSettingBtn" class="plv-control-setting-playback" src="../../assets/images/setting.png"></cover-image>
      <cover-view class="plv-control-setting-content" @click="hideSettingContent" v-if="settingShow">
        <cover-view class="plv-setting-head">
          <cover-view class="head-item" @click="danmuSwitch">
            <cover-image class="setting-content__image" :src="'../../assets/images/'+(danmuEnabled ? 'selected' : 'unselect')+'.png'"></cover-image>
            <button class="setting-content__btn">弹幕</button>
          </cover-view>
        </cover-view>
        <cover-view class="plv-control-setting-detail control-rate">
          <cover-view class="setting-detail-item">倍速</cover-view>
          <cover-view v-for="(item,index) in (['0.5x', '1.0x', '1.25x', '1.5x', '2.0'])" :key="item.index" @click="changeRate" :data-index="index" :class="'setting-item-btn setting-btn-rate '+(currentRate === index ? 'btn-selected' : '')">{{ item }}</cover-view>
        </cover-view>
      </cover-view>
    </video>
  </view>
</view></uni-shadow-root>


</template><script>
import PlvLivePlayer from '../live-player/live-player.vue'
global['__wxVueOptions'] = {components:{'plv-live-player': PlvLivePlayer}}

global['__wxRoute'] = 'polyv-sdk/components/player/player'
import Polyv from"../../common/player/polyv";Component({properties:{videoOption:{type:Object,observer(t){if(0===Object.keys(t).length)return;const{mode:e,vodVid:a,vodsrc:i}=t;t.liveMode=t.liveMode>=0?t.liveMode:1,this.setData(t),i&&this.setData({vodsrc:i}),"vod"===e&&this.changeVid(a)}},vodSeek:{type:Number,value:0,observer(t){t>-1&&this.seek(t)}},skin:{type:String,value:"black",observer(t){"black"!==t&&"white"!==t&&this.setData({skin:"black"})}},danmuText:{type:String,value:"",observer(t){if("live"==this.data.mode)this.selectComponent("#plvLivePlayerComp").sendDanmu(t);else{if(!this.data.danmuEnabled||!this.data.allowDanmu)return;this.vodContext.sendDanmu({text:t})}}},usePlayerSkin:{type:Boolean,value:!0},menuType:{type:String,value:""},isSwitched:{type:Boolean,value:!1},allowDanmu:{type:Boolean,value:!0},skinAlwaysShow:{type:Boolean,value:!1}},data:{uid:"",cid:"",mode:"",statistics:{},vodsrc:"",vodVid:"",vodSrc:"",isCamClosed:!1,settingShow:!1,showSettingBtn:!0,currentRate:1,danmuEnabled:!0,danmuList:[]},lifetimes:{attached(){this.vodContext=wx.createVideoContext("plvVodPlayer",this),this.hideSettingBtn()},detached(){}},methods:{changeVid(t){const{statistics:e}=this.data;this.vodPlayer&&this.vodPlayer.destroy&&this.vodPlayer.destroy(),this.vodPlayer=Polyv.getVideo({vid:t,params:{param1:e.param1||"",param2:e.param2||"",param4:e.param4||"",param5:e.param5||""},sid:e.param1||"",callback:t=>{const{type:e,src:a}=t;"error"===e?(console.log("error",t),this.triggerEvent("onError",t)):(console.log("###",a),this.setData({vodSrc:a[0]}))}})},seek(t){if("live"===this.data.mode){this.selectComponent("#plvLivePlayerComp").liveVodVideoContext.seek(t)}else this.vodContext.seek(t)},resumeStats(t){const{mode:e}=this.data;if("live"===e){this.selectComponent("#plvLivePlayerComp").resumeStats(t)}},onVodTimeUpdate(t){const e=t.detail.currentTime;this.triggerEvent("onVodProgress",{currentTime:e}),this.vodPlayer&&this.vodPlayer.timeUpdate&&this.vodPlayer.timeUpdate(t)},onVodPlay(){},onVodPause(){},onVodWaiting(){},onVodEnded(){this.triggerEvent("onVodEnd",{curVodVid:this.data.vodVid})},onVodError(){},onLiveVodEnd(){this.triggerEvent("onLiveVodEnd",{curVodVid:this.data.vodsrc})},onLiveStorageProgress(t){this.triggerEvent("onLiveStorageProgress",t.detail)},onLiveStatusChange(t){this.triggerEvent("onLiveStatusChange",t.detail)},hideSettingContent(){this.setData({settingShow:!1})},setting(){const{settingShow:t}=this.data;this.setData({settingShow:!t})},changeRate(t){const{index:e}=t.currentTarget.dataset,a=[.5,1,1.25,1.5,2][e];this.setData({currentRate:e}),this.vodContext.playbackRate(a)},showSetControl(){this.setData({showSettingBtn:!0}),this.hideSettingBtn()},hideSettingBtn(){this.data.setTimer&&clearTimeout(this.data.setTimer),this.data.setTimer=setTimeout(()=>{this.setData({showSettingBtn:!1})},3e3)},danmuSwitch(){this.setData({danmuEnabled:!this.data.danmuEnabled})}}});
export default global['__wxComponents']['polyv-sdk/components/player/player']
</script>
<style platform="mp-weixin">
.plv-player,.plv-player-live,.plv-player-live__player{width:100%;height:100%}.plv-player-live__player__tips{position:absolute;bottom:20rpx;left:10rpx;font-size:14px}.plv-player-vod{width:100%;display:none}.plv-mp-vod-player-box,.plv-mp-vod-player-box-video{width:100%;height:100%}.plv-control-setting-content{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.8)}.plv-control-setting-content .setting-content__btn{outline:none;background:none;border:none;display:inline-block;vertical-align:middle;font-size:14px;color:#fff}.plv-control-setting-content .setting-content__image{display:inline-block}.plv-control-setting-content .plv-setting-head{height:48px;width:100%;background:rgba(0,0,0,.2);text-align:left}.plv-control-setting-content .plv-setting-head .head-item{width:33.33%;text-align:center;line-height:48px}.plv-control-setting-content .plv-setting-head .setting-content__image{width:16px;height:16px;margin-right:8px;vertical-align:middle}.plv-control-setting-content .plv-control-setting-detail{padding-left:20px;box-sizing:border-box;height:32px;margin-top:16px}.plv-control-setting-content .plv-control-setting-detail .setting-detail-item{margin-right:16px;width:44px;display:inline-block;line-height:32px;vertical-align:top;text-align:justify;text-align-last:justify}.plv-control-setting-content .plv-control-setting-detail .setting-item-btn{height:32px;line-height:32px;width:64px;margin-right:8px;text-align:center;display:inline-block;box-sizing:border-box;vertical-align:top}.plv-control-setting-content .plv-control-setting-detail .setting-item-btn.btn-selected{line-height:30px;border:1px solid #fff;border-radius:20px}.plv-control-setting-content .plv-control-setting-detail .setting-btn-rate{width:48px}.plv-control-setting-playback{position:absolute;width:32px;height:32px;top:50%;transform:translateY(-50%);right:10px}
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