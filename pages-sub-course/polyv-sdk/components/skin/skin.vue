<template>
<uni-shadow-root class="polyv-sdk-components-skin-skin"><cover-view class="plv-player-control" v-if="(!settingShow && liveMode !== 2)">
  <cover-image @click.stop.prevent="changePlayStatus" class="plv-player-control__image plv-control-play-pause" :src="'../../assets/images/'+(playStatus === 'pause' ? 'play' : 'pause')+'.png'"></cover-image>
  <cover-image class="plv-player-control__image plv-control-refresh" @click="refresh" src="../../assets/images/refresh.png"></cover-image>
  <cover-image class="plv-player-control__image plv-control-screen" @click="changeScreen" :src="'../../assets/images/'+(screenStatus === 'full' ? 'half' : 'full')+'.png'"></cover-image>
  <cover-image @click="setting" class="plv-player-control__image plv-control-setting" src="../../assets/images/setting.png"></cover-image>
</cover-view>
<cover-image v-if="liveMode === 2" @click="setting" class="plv-control-setting-playback" src="../../assets/images/setting.png"></cover-image>
<cover-view class="plv-control-setting-content" @click="hideSettingContent" v-if="settingShow">
  <cover-view class="plv-setting-head">
    <cover-view class="head-item" @click="danmuSwitch" v-if="closeDanmuEnable === 'N' && allowDanmu">
      <cover-image class="plv-setting-head__image plv-control-content__image" :src="'../../assets/images/'+(danmuEnabled ? 'selected' : 'unselect')+'.png'"></cover-image>
      <button class="plv-control-content__btn">弹幕</button>
    </cover-view>
  </cover-view>
  <cover-view class="plv-control-setting-detail control-rate" v-if="liveMode !== 1">
    <cover-view class="setting-detail-item">倍速</cover-view>
    <cover-view v-for="(item,index) in (['0.5x', '1.0x', '1.25x', '1.5x', '2.0'])" :key="item.index" @click="changeRate" :data-index="index" :class="'setting-item-btn setting-btn-rate '+(currentRate === index ? 'btn-selected' : '')">{{ item }}</cover-view>
  </cover-view>
  <cover-view class="plv-control-setting-detail control-line" v-if="liveMode === 1">
    <cover-view class="setting-detail-item">线路</cover-view>
    <cover-view v-for="(item,index) in (lines)" :key="item.index" @click="changeLine" :data-line="index" :data-src="forceVideo ? item.m3u8 : item.flv" :class="'setting-item-btn '+(currentLine === index ? 'btn-selected' : '')">线路{{ index + 1 }}</cover-view>
  </cover-view>
</cover-view></uni-shadow-root>


</template><script>

global['__wxRoute'] = 'polyv-sdk/components/skin/skin'
Component({properties:{lines:{type:Array,value:[]},forceVideo:{type:Boolean,value:!1},liveMode:{type:Number,value:1},closeDanmuEnable:{type:String,value:"N"},currentLine:{type:Number,value:0},currentRate:{type:Number,value:3},danmuEnabled:{type:Boolean,value:!0},changeScreenSuccess:{type:String,observer(e){this.setData({screenStatus:e})}},allowDanmu:{type:Boolean,value:!0}},data:{settingShow:!1,screenStatus:"half",settingShow:!1,playStatus:"playing"},lifetimes:{created(){},attached(){}},methods:{changePlayStatus(){"playing"===this.data.playStatus?(this.triggerEvent("changePlayStatus","pause"),this.setData({playStatus:"pause"})):(this.triggerEvent("changePlayStatus","play"),this.setData({playStatus:"playing"}))},refresh(){this.triggerEvent("refresh"),this.setData({playStatus:"playing"})},changeScreen(){"half"===this.data.screenStatus?this.triggerEvent("changeScreen","full"):this.triggerEvent("changeScreen","half")},hideSettingContent(){this.setData({settingShow:!1})},setting(){const{settingShow:e}=this.data;this.setData({settingShow:!e})},changeLine(e){const{dataset:t}=e.currentTarget;this.triggerEvent("changeLine",{src:t.src,line:t.line})},changeRate(e){const{index:t}=e.currentTarget.dataset;this.triggerEvent("changeRate",t)},danmuSwitch(){this.triggerEvent("updateDanmuEnabled",this.data.danmuEnabled)}}});
export default global['__wxComponents']['polyv-sdk/components/skin/skin']
</script>
<style platform="mp-weixin">
.plv-control-setting-playback{position:absolute;width:32px;height:32px;top:50%;transform:translateY(-50%);right:10px;z-index:1000}.plv-player-control{position:absolute;top:100%;width:100%;padding:0 10px;margin-top:-32px;box-sizing:border-box;background-color:rgba(0,0,0,.4);z-index:999}.plv-player-control .plv-player-control__image{display:inline-block;width:32px;height:32px}.plv-player-control .plv-control-screen,.plv-player-control .plv-control-setting{float:right}.plv-control-setting-content{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.8);color:#fff;font-size:16px;z-index:1002}.plv-control-setting-content .plv-control-content__btn{outline:none;background:none;border:none;display:inline-block;vertical-align:middle;font-size:14px;color:#fff}.plv-control-setting-content .plv-control-content__image{display:inline-block}.plv-control-setting-content .plv-setting-head{height:48px;width:100%;background:rgba(0,0,0,.2);text-align:left}.plv-control-setting-content .plv-setting-head .head-item{width:33.33%;text-align:center;line-height:48px}.plv-control-setting-content .plv-setting-head .plv-setting-head__image{width:16px;height:16px;margin-right:8px;vertical-align:middle}.plv-control-setting-content .plv-control-setting-detail{padding-left:20px;box-sizing:border-box;height:32px;margin-top:16px}.plv-control-setting-content .plv-control-setting-detail .setting-detail-item{margin-right:16px;width:44px;display:inline-block;line-height:32px;vertical-align:top;text-align:justify;text-align-last:justify}.plv-control-setting-content .plv-control-setting-detail .setting-item-btn{height:32px;line-height:32px;width:64px;margin-right:8px;text-align:center;display:inline-block;box-sizing:border-box;vertical-align:top}.plv-control-setting-content .plv-control-setting-detail .setting-item-btn.btn-selected{line-height:30px;border:1px solid #fff;border-radius:20px}.plv-control-setting-content .plv-control-setting-detail .setting-btn-rate{width:48px}
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