<template>
<uni-shadow-root class="polyv-sdk-components-menu-bar-menu-bar"><view id="plvMenuBar" :class="'plv-mp-menubar-wrap '+(isLessTab ? 'plv-mp-menubar-wrap__less' : '')+' plv-mp-skin__'+(skin)" @click="changeMenu">
  <view v-for="(item,index) in (menuList)" :key="item.index" :class="'plv-mp-menubar-item '+(index === activeIndex ? 'plv-mp-menubar-item__on' : '')+' '+(item.menuType === 'qa' && hasNewQuiz && index !== activeIndex ? 'plv-mp-quiz__tips' : '')" :data-index="index">
    {{ item.name }}
  </view>
</view></uni-shadow-root>


</template><script>

global['__wxRoute'] = 'polyv-sdk/components/menu-bar/menu-bar'
Component({data:{isLessTab:!1,pageSkin:"",showQa:!0,realShowList:[]},properties:{menuList:{type:Array,value:[],observer(e){e.length<=0||(this.setData({isLessTab:!1}),wx.nextTick(()=>{const e=wx.createSelectorQuery().in(this);e.selectAll(".plv-mp-menubar-item").boundingClientRect(),e.exec(e=>{const t=e[0];let a=0;t.forEach(e=>{a+=e.width}),this.setData({isLessTab:a<=this.data.wrapWidth})})}))}},skin:{type:String,value:"black",observer(e){"black"!==e&&"white"!==e&&this.setData({skin:"black"})}},activeIndex:{type:Number,value:0},wrapWidth:{type:Number,value:0},hasNewQuiz:{type:Boolean,value:!1},plvInsideUse:{type:Boolean,value:!1,observer(e){e||this.setData({showQa:!1})}}},lifetimes:{ready(){}},methods:{changeMenu(e){let t=e.target.dataset.index;void 0!==t&&(t=parseInt(t,10),this.triggerEvent("changeMenu",{activeIndex:t}))}}});
export default global['__wxComponents']['polyv-sdk/components/menu-bar/menu-bar']
</script>
<style platform="mp-weixin">
.plv-mp-menubar-wrap{font-size:0;text-align:left;box-shadow:0 6rpx 10rpx 0 rgba(0,0,0,.05);box-sizing:border-box;white-space:nowrap;overflow:auto;width:100%;-webkit-overflow-scrolling:touch;background:#44434e}.plv-mp-menubar-item{display:inline-block;line-height:74rpx;font-size:26rpx;color:#bfbfbf;letter-spacing:0;padding:0 10rpx;text-align:center;overflow:hidden}.plv-mp-menubar-item__on{color:#fff;box-shadow:inset 0 -4rpx #fff}.plv-mp-menubar-wrap__less{display:flex;justify-content:center}.plv-mp-menubar-wrap__less>.plv-mp-menubar-item{flex-grow:1;text-align:center}.plv-mp-menubar-wrap__less .plv-mp-quiz__tips{position:relative}.plv-mp-menubar-wrap__less .plv-mp-quiz__tips:after{content:"";position:absolute;width:8px;height:8px;background:#f24453;border-radius:4px;top:16px;margin-left:4px}.plv-mp-skin__white{box-shadow:0 10rpx 20rpx 0 rgba(4,0,0,.15)}.plv-mp-skin__white>.plv-mp-menubar-item{color:#212121;background:#fff}.plv-mp-skin__white>.plv-mp-menubar-item__on{color:#009aff}
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