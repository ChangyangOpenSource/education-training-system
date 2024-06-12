<template>
<uni-shadow-root class="polyv-sdk-components-live-introduction-live-introduction"><view :class="'plv-mp-live-introduction-wrap plv-mp-skin__'+(skin)">
  <scroll-view scroll-y>
    <view class="plv-mp-live-introduction_top">
      <text class="plv-mp-live-introduction_top_channel_title">{{ channelDetail.name }}</text>
      <view class="plv-mp-live-introduction_top_channel_info">
        <image class="plv-mp-live-introduction_top_channel_logo" :src="channelDetail.coverImage"></image>
        <text class="plv-mp-live-introduction_top_channel_host">{{ channelDetail.publisher }}</text>
        <view class="plv-mp-live-introduction_top_channel_likes channel-info__view">
          <image class="plv-mp-live-introduction-icon" :src="'../../assets/images/'+(skin)+'/desc-icon-likes.png'"></image>
          {{ channelDetail.likes }}
        </view>
        <view class="plv-mp-live-introduction_top_channel_viewers channel-info__view">
          <image class="plv-mp-live-introduction-icon" :src="'../../assets/images/'+(skin)+'/desc-icon-viewers.png'"></image>
          {{ channelDetail.pageView }}
        </view>
      </view>
    </view>
    <view class="plv-mp-live-introduction_middle">
      <view class="plv-mp-live-introduction_middle_live_status">{{ liveStatusText }}</view>
      <view class="plv-mp-live-introduction_middle_live_time">在线时间：{{ channelDetail.startTime || '' }}</view>
      <view class="player-countdown" v-if="showCountDown">
        <view class="countdown-content">
          <view>距离在线开始还有： <text class="player-days">{{ days }}</text> 天 <text class="player-hours">{{ hours }}</text> 小时 <text class="player-minutes">{{ minutes }}</text> 分 <text class="player-seconds">{{ seconds }}</text> 秒 </view>
        </view>
      </view>
    </view>
    <view class="plv-mp-live-introduction-bottom">
      <menu-custom :skin="skin" :parseHtml="channelDetail.desc"></menu-custom>
    </view>
  </scroll-view>
</view></uni-shadow-root>


</template><script>
import MenuCustom from '../menu-custom/menu-custom.vue'
global['__wxVueOptions'] = {components:{'menu-custom': MenuCustom}}

global['__wxRoute'] = 'polyv-sdk/components/live-introduction/live-introduction'
Component({data:{days:0,hours:0,minutes:0,seconds:0,startTime:"",liveStatusText:"",showCountDown:!1,imgPath:""},properties:{channelDetail:{type:Object,observer(t){}},skin:{type:String,value:"black",observer(t){"black"!==t&&"white"!==t&&this.setData({skin:"black"})}},liveType:{type:String,observer(t){let e="";e="live"===t?"正在在线":this.data.startTime&&new Date(this.data.startTime).getTime()>(new Date).getTime()?"等待在线中":"暂无在线",this.setData({liveStatusText:e})}}},lifetimes:{ready(){this.setLiveStatusText(),this.countDown()}},methods:{setLiveStatusText(){let t="";t="Y"===this.data.channelDetail.status?"正在在线":this.data.startTime&&new Date(this.data.startTime).getTime()>(new Date).getTime()?"等待在线中":"暂无在线",this.setData({liveStatusText:t})},countDown(){if(!this.data.startTime)return;const t=new Date(this.data.startTime),e=new Date;if(e.getTime()>=t.getTime())return;this.setData({showCountDown:!0});let a=Math.round((t.getTime()-e.getTime())/1e3);const s=a%60,i=(a=Math.floor(a/60))%60,n=(a=Math.floor(a/60))%24,o=Math.floor(a/24);this.setData({days:o,hours:n,minutes:i,seconds:s});let r=setTimeout(()=>{clearTimeout(r),r=null,this.countDown()},1e3)}}});
export default global['__wxComponents']['polyv-sdk/components/live-introduction/live-introduction']
</script>
<style platform="mp-weixin">
.plv-mp-live-introduction-wrap{position:relative;height:100%;padding:20rpx;text-align:left;box-sizing:border-box;background:#44434f}.plv-mp-live-introduction-icon{width:36rpx;height:36rpx;margin-top:-6rpx;vertical-align:middle}.plv-mp-live-introduction_top{margin-bottom:10px;padding:10px 0 20px;border-bottom:1px solid #4e4c5b}.plv-mp-live-introduction_top_channel_title{display:block;font-size:36rpx;margin-bottom:10px}.plv-mp-live-introduction_top_channel_info{position:relative;padding-left:90rpx;font-size:24rpx}.plv-mp-live-introduction_top_channel_info>.channel-info__view{display:inline-block;margin-right:10rpx}.plv-mp-live-introduction_top_channel_logo{position:absolute;left:0;width:70rpx;height:70rpx;border-radius:5px}.plv-mp-live-introduction_top_channel_host{display:block;margin-bottom:5px}.plv-mp-live-introduction_middle{padding-bottom:10px;color:#546e7a;font-size:28rpx;border-bottom:1px solid #4e4c5b}.plv-mp-live-introduction_middle_live_status{float:right;color:#ff5722}.plv-mp-skin__white{color:#333;background:#f5f9fa}.plv-mp-skin__white .plv-mp-live-introduction_top{border-bottom:0}.plv-mp-skin__white .plv-mp-live-introduction_middle{border-bottom:1px solid #e0e0e0ff}.plv-mp-skin__white .plv-mp-live-introduction-icon{width:16px;height:15px}
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