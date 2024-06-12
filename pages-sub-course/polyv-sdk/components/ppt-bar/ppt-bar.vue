<template>
<uni-shadow-root class="polyv-sdk-components-ppt-bar-ppt-bar"><view id="pptH5SettingNav" :class="(isVer?'ppt-h5-setting-nav-right':'ppt-h5-setting-nav')+' ppt-h5-setting-nav-mobile ppt-h5-setting-nav-mobile-bottom'" :hidden="(!showBar)" @click="resetTimer">
  <view class="ppt-h5-setting-nav__ul">
    <view class="ppt-h5-setting-nav__li ppt-h5-setting-nav__prev" data-type="gotoPreviousStep" id="ppt-btn-prev" @click="handleClickPrevBtn">
      <image :src="'../../assets/images/m-btn-upage'+(disabeldPrevBtn?'-un':'')+'.png'" class="ppt-h5-setting-nav__li__icon"></image>
    </view>
    <view class="ppt-h5-setting-nav__li ppt-h5-setting-nav__next" data-type="gotoNextStep" id="ppt-btn-next" @click="handleClickNextBtn">
      <image :src="'../../assets/images/m-btn-dpage'+(disabeldNextBtn ? '-un' : '')+'.png'" class="ppt-h5-setting-nav__li__icon"></image>
    </view>
    <view class="ppt-h5-setting-nav__li ppt-h5-setting-nav__back-page" id="pptBtnBack" @click="handleClickBackPageBtn">
      <view class="ppt-h5-setting-nav__back-page__num" data-type="pptBtnBack">{{currentPPTPage+1}}</view>
    </view>
    <view class="ppt-h5-setting-nav__li ppt-h5-setting-nav__full" data-type="full" @click="handleClickFullScreen">
      <image :src="'../../assets/images/'+(inFullScreen ? 'm-btn-fscreen-un' : 'm-btn-fscreen')+'.png'" class="ppt-h5-setting-nav__li__icon"></image>
    </view>
  </view>
</view></uni-shadow-root>


</template><script>

global['__wxRoute'] = 'polyv-sdk/components/ppt-bar/ppt-bar'
Component({data:{inFullScreen:!1,currentPPTPage:0,showBar:!1,isVer:!1,disabeldPrevBtn:!1,disabeldNextBtn:!1},methods:{handleClickFullScreen(){this.setData({inFullScreen:!this.data.inFullScreen}),this.triggerEvent("clickFullBtn",this.data.inFullScreen)},handleClickPrevBtn(){this.triggerEvent("clickPrevBtn")},handleClickNextBtn(){this.triggerEvent("clickNextBtn")},handleClickBackPageBtn(){this.triggerEvent("clickBackPageBtn")},pptPageChange({page:t,maxPage:e,isLive:i}){this.setData({currentPPTPage:t}),void 0!==e&&this.setData({disabeldNextBtn:!!i&&t>=e,disabeldPrevBtn:!!i&&t<=0})},toggleBar(){this.setData({showBar:!this.data.showBar}),clearTimeout(this.toggleBar.timeout),this.data.showBar&&this.resetTimer()},resetTimer(){clearTimeout(this.toggleBar.timeout),this.toggleBar.timeout=setTimeout(()=>{this.setData({showBar:!1})},2e3)},happenResize({windowHeight:t,windowWidth:e}){this.setData({isVer:e>t})}}});
export default global['__wxComponents']['polyv-sdk/components/ppt-bar/ppt-bar']
</script>
<style platform="mp-weixin">
.ppt-h5-setting-nav{height:112rpx;width:100%;line-height:112rpx;text-align:center;background:rgba(0,0,0,.5);border-radius:4rpx;position:absolute;bottom:0;z-index:2000;font-weight:700;color:#fff;font-size:32rpx;padding:0;margin:0}.ppt-h5-setting-nav__ul{width:100%;display:flex}.ppt-h5-setting-nav__ul .ppt-h5-setting-nav__li{flex:1}.ppt-h5-setting-nav__ul .ppt-h5-setting-nav__li__icon{width:64rpx;height:64rpx;top:50%;transform:translateY(-50%);position:relative}.ppt-h5-setting-nav-right{height:100%;width:60rpx;text-align:center;background:rgba(0,0,0,.5);border-radius:4rpx;position:absolute;right:0;top:0;z-index:2000;font-weight:700;color:#fff;font-size:32rpx;padding:0;margin:0}.ppt-h5-setting-nav-right .ppt-h5-setting-nav__ul{height:100%;width:100%;display:flex;flex-direction:column}.ppt-h5-setting-nav-right .ppt-h5-setting-nav__ul .ppt-h5-setting-nav__li{flex:1;width:100%;height:25%}.ppt-h5-setting-nav-right .ppt-h5-setting-nav__ul .ppt-h5-setting-nav__li .ppt-h5-setting-nav__back-page__num{top:50%;left:50%;transform:translate(-50%,-50%);position:relative}.ppt-h5-setting-nav-right .ppt-h5-setting-nav__ul .ppt-h5-setting-nav__li .ppt-h5-setting-nav__li__icon{width:32rpx;height:32rpx;transform:rotate(90deg);-ms-transform:rotate(90deg);-moz-transform:rotate(90deg);-webkit-transform:rotate(90deg);-o-transform:rotate(90deg);position:relative;top:50%;margin-top:-16rpx}
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