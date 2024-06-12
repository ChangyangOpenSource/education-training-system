<template>
<uni-shadow-root class="polyv-sdk-components-playback-playback"><view>
  <view :class="'chapter-container plv-mp-skin__'+(skin)">
    <view v-if="playBackListData.length > 0">
      <view v-for="(item,index) in (playBackListData)" :key="item.index" class="chapter-li" @click="tapPlayback" :data-idx="index">
        <view class="playback-image">
          <image mode="aspectFill" class="playback-first-image" :src="item.firstImage"></image>
          <image mode="aspectFill" class="cover-icon back-playing" :src="index === currentIndex ? currentImage[0] : '../../assets/images/icon-play-back.png'"></image>
        </view>
        <view class="playback-list-msg">
          <text :class="'charpter-text list-title '+(index === currentIndex ? 'chapter-color' : 'title-color')+' '">{{ item.title }}</text>
          <image mode="aspectFill" class="list-duration-icon" :src="index === currentIndex ? currentImage[1] : ('../../assets/images/' + skin + '/icon-duration.png')"></image>
          <text :class="'harpter-text list-time '+(index === currentIndex ? 'chapter-color' : 'title-color')">{{ item.duration }}</text>
        </view>
      </view>
    </view>
  </view>
</view></uni-shadow-root>


</template><script>

global['__wxRoute'] = 'polyv-sdk/components/playback/playback'
import utils from"../../common/utils/utils";Component({properties:{playbackList:{type:Array,value:[],observer(t){const a=t;a&&a.length>0&&(a.forEach((t,a,e)=>{e[a].firstImage=utils.imagePrefixUrlMethod(t.firstImage)}),this.setData({playBackListData:a}))}},nextVod:{type:String,value:"",observer(t,a){t&&t!==a&&this.playNext()}},skin:{type:String,value:"black",observer(t){"black"!==t&&"white"!==t&&this.setData({skin:"black"})}},liveStatus:{type:String,value:"",observer(t){"Y"===t&&this.setData({currentIndex:0})}}},data:{playBackListData:[],currentIndex:0,currentImage:["../../assets/images/icon-ing.png","../../assets/images/icon-playing.png"]},methods:{tapPlayback(t){const a=t.currentTarget.dataset.idx;this.emitPlayback(a)},playNext(){let t=0;const{playBackListData:a}=this.data;a.length<=1||(this.data.currentIndex<a.length-1&&(t=this.data.currentIndex+1),this.emitPlayback(t))},emitPlayback(t){this.setData({currentIndex:t}),this.triggerEvent("onTapPlayback",this.data.playBackListData[t])}}});
export default global['__wxComponents']['polyv-sdk/components/playback/playback']
</script>
<style platform="mp-weixin">
.chapter-container{background:#44434f}.chapter-li{height:186rpx}.chapter-li .cover-icon{position:absolute;top:50%;left:50%}.chapter-li .back-pause{margin-top:-40rpx;margin-left:-40rpx;width:80rpx;height:80rpx}.chapter-li .back-playing{margin-top:-30rpx;margin-left:-30rpx;width:60rpx;height:60rpx}.chapter-li .playback-image{position:relative;float:left;margin:22rpx 0 0 20rpx}.chapter-li .playback-first-image{width:192rpx;height:144rpx}.chapter-li .playback-list-msg{position:relative;margin-left:240rpx;border-bottom:1px solid #4d4b59;height:100%;padding:20rpx 40rpx 20rpx 24rpx;box-sizing:border-box}.chapter-li .list-title{height:88rpx;line-height:1.5;display:block;overflow:hidden;font-size:16px}.chapter-li .harpter-text{font-size:28rpx;overflow:hidden}.chapter-li .list-time{position:absolute;left:64rpx;bottom:20rpx;font-size:26rpx}.chapter-li .list-duration-icon{position:absolute;left:24rpx;bottom:24rpx;width:28rpx;height:28rpx}.chapter-li .title-color{color:#fff}.chapter-color{color:#42a5f5}.plv-mp-skin__white{background:#f5f9fa}.plv-mp-skin__white .chapter-li .title-color{color:#212121}.plv-mp-skin__white .playback-list-msg{border-bottom:0}
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