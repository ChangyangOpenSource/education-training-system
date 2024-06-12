<template>
<uni-shadow-root class="polyv-sdk-components-chapter-chapter"><scroll-view scroll-y :class="'plv-mp-chapter-list plv-mp-skin__'+(skin)">
  <view v-for="(item,index) in (list)" :key="item.index" :class="'plv-mp-chapter-item '+(curIndex === index ? 'plv-mp-chapter-item-selected' : '')" @click="tapChapterItem" :data-index="index">
    <image class="plv-mp-chapter-item__icon" :src="curIndex === index ? '../../assets/images/icon-chapter-onfocus.png' : ('../../assets/images/' + skin + '/icon-chapter-normal.png')"></image>
    <view class="plv-mp-chapter-item__content">
      <text>{{ item.title }}</text>
      <text>{{ item.duration }}</text>
    </view>
  </view>
</scroll-view></uni-shadow-root>


</template><script>

global['__wxRoute'] = 'polyv-sdk/components/chapter/chapter'
import util from"../../common/utils/utils";const compConfig={properties:{chapterList:{type:Array,value:[],observer(t){this.setData({list:t.map(t=>({...t,duration:util.formatTime(t.timeStamp)}))})}},vodCurTime:{type:Number,value:0,observer(t){this.data.chapterList.some((e,a)=>{if(t<e.timeStamp)return this.setData({curIndex:0===a?0:a-1}),!0;a===this.data.chapterList.length-1&&this.setData({curIndex:a})})}},skin:{type:String,value:"black",observer(t){"black"!==t&&"white"!==t&&this.setData({skin:"black"})}}},data:{list:[],curIndex:-1,timeList:[]},methods:{tapChapterItem(t){const e=t.currentTarget.dataset.index;this.triggerEvent("onTapChapter",{chapter:this.data.chapterList[e]})}}};Component(compConfig);
export default global['__wxComponents']['polyv-sdk/components/chapter/chapter']
</script>
<style platform="mp-weixin">
.plv-mp-chapter-wrap{height:100%;overflow:hidden}.plv-mp-chapter-list{height:100%}.plv-mp-chapter-item{display:flex;align-items:center;color:#fff;font-size:28rpx;padding-left:30rpx}.plv-mp-chapter-item-selected{color:#42a5f5}.plv-mp-chapter-item__icon{width:30rpx;height:30rpx;margin-right:30rpx}.plv-mp-chapter-item__content{padding:30rpx 40rpx 30rpx 0;flex:1;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #4e4c5b}.plv-mp-skin__white{background:#f5f9fa}.plv-mp-skin__white .plv-mp-chapter-item{color:#212121}.plv-mp-skin__white .plv-mp-chapter-item__content{border-bottom:0}
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