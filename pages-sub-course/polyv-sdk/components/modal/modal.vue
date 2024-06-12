<template>
<uni-shadow-root class="polyv-sdk-components-modal-modal"><view :class="'plv-mp-modal-wrap '+(showing)">
  <view class="plv-mp-modal-box">
    <image class="plv-mp-modal__img" :src="imgSrc"></image>
    <view class="plv-mp-modal__text">{{ modalText }}</view>
  </view>
</view></uni-shadow-root>


</template><script>

global['__wxRoute'] = 'polyv-sdk/components/modal/modal'
Component({properties:{modalData:{type:Object,observer(t){const{imgSrc:e,modalText:i}=t;this.setData({imgSrc:e,modalText:i})}}},data:{duration:1e3,showing:""},lifetimes:{},methods:{show(){const{duration:t}=this.data;this.setData({showing:"show"}),this.clearTimeOut(),this.showTimeOut=setTimeout(()=>{this.hide()},t)},hide(){this.clearTimeOut(),this.setData({showing:""}),this.triggerEvent("onModalHide")},clearTimeOut(){this.showTimeOut&&(clearTimeout(this.showTimeOut),this.showTimeOut=null)}}});
export default global['__wxComponents']['polyv-sdk/components/modal/modal']
</script>
<style platform="mp-weixin">
.plv-mp-modal-wrap{position:relative;display:none;width:100%;height:100%}.plv-mp-modal-box{position:absolute;width:240rpx;height:256rpx;top:0;left:0;bottom:0;right:0;margin:auto;text-align:center;background-color:#fff;border-radius:16rpx}.plv-mp-modal__img{width:120rpx;height:120rpx;padding-top:40rpx}.plv-mp-modal__text{padding:20rpx 0 34rpx;color:#000}.show{display:block}
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