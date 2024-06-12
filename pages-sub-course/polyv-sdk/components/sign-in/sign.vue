<template>
<uni-shadow-root class="polyv-sdk-components-sign-in-sign"><view :class="'plv-mp-sign__wrap '+(showSign ? 'sign-show' : '')">
  <view class="plv-mp-sign__countdown">{{ !success ? limitTime : '' }}
    <view v-if="'success'" :class="success ? 'plv-mp-sign__success' : ''"></view>
  </view>
  <view class="plv-mp-sign__container">
    <icon type="clear" size="20" class="plv-mp-sign__close__icon" @click="hideSign"></icon>
    <text class="sign-message">{{ message }}</text>
    <view>
      <button class="plv-sign-container__btn" type="default" :disabled="disabled" @click="toSignin">{{ buttonMsg }}</button>
    </view>
  </view>
</view>
<modal id="answerModal" v-if="showModal" class="plv-mp-question-modal" :modalData="modalData" @onModalHide="onModalHide">
</modal></uni-shadow-root>


</template><script>
import Modal from '../modal/modal.vue'
global['__wxVueOptions'] = {components:{'modal': Modal}}

global['__wxRoute'] = 'polyv-sdk/components/sign-in/sign'
import Event from"../../common/chat/eventTypes";import store from"../../store/index";Component({data:{disabled:!1,message:"各位同学签到成功了",buttonMsg:"签到",limitTime:0,showSign:!1,signTimer:null,success:!1,checkinId:null},lifetimes:{created(){this.chatEvent=this.getChatEvent(),this.chat=null,this.signTimes=3},attached(){this.unsub=store.get({"main.chat":t=>{this.chat=t,t&&this.bindEvent(this.chatEvent)}})},detached(){if(this.unsub(),clearInterval(this.signTimer),!this.chat)return;const t=this.chatEvent;Object.keys(t).forEach(i=>{this.chat.off(i,t[i])}),this.chat=null}},methods:{bindEvent(t){const i=this.chat;i&&Object.keys(t).forEach(s=>{i.on(s,t[s])})},startCountDown(t){const i=(new Date).getTime();this.signTimer=setInterval(()=>{const s=(new Date).getTime()-i,e=t-parseInt(s/1e3,10);this.setData({limitTime:e}),e<1&&this.stopSign()},500)},hideSign(){clearInterval(this.signTimer),this.setData({showSign:!1})},stopSign(t="签到已截止"){clearInterval(this.signTimer),this.setData({buttonMsg:t,disabled:!0}),setTimeout(()=>{this.setData({showSign:!1}),this.triggerEvent("onSignShow",!1)},3e3)},clearSignTimeoutClock(){this.signTimeout&&clearTimeout(this.signTimeout)},toSignin(){this.clearSignTimeoutClock(),this.hideSign(),this.chat.toSign(this.data.checkinId,t=>{let i;this.clearSignTimeoutClock();try{i=JSON.parse(t).code}catch(t){i=400}this.signTips(i)}),this.signTimeout=setTimeout(()=>{this.signTimes-=1,this.signTimes<0?(this.signTips(400),this.clearSignTimeoutClock()):this.toSignin()},5e3)},signTips(t){const i={301:"请登录后再签到",302:"签到已结束",303:"已签到",400:"签到失败",200:"签到成功"}[t]||"签到失败";this.stopSign(i),this.setData({success:200===t,showModal:!0,modalData:{imgSrc:`../../assets/images/${200===t?"interact-submit-success.png":"interact-cut-off.png"}`,modalText:i}}),this.selectComponent("#answerModal").show()},onModalHide(){this.setData({showModal:!1})},getChatEvent(){const t=this;return{[Event.SIGN_IN](i,s){const{limitTime:e,message:n,checkinId:a}=s.data;t.signTimes=3,t.setData({showSign:!0,limitTime:e,message:n,checkinId:a,buttonMsg:"签到",disabled:!1,success:!1}),t.clearSignTimeoutClock(),t.startCountDown(e),t.triggerEvent("onSignShow",!0)},[Event.STOP_SIGN_IN](i,s){t.data.showSign&&(t.clearSignTimeoutClock(),t.stopSign())}}}}});
export default global['__wxComponents']['polyv-sdk/components/sign-in/sign']
</script>
<style platform="mp-weixin">
.plv-mp-sign__wrap{position:fixed;top:0;left:0;z-index:9999;width:100%;height:100%;background-color:rgba(0,0,0,.45);display:none}.plv-mp-sign__success{width:16px;height:30px;margin:16px auto 0;border-color:#33a4ff;border-style:solid;border-width:0 8px 8px 0;transform:rotate(45deg)}.plv-mp-sign__container{position:fixed;bottom:0;left:0;width:100%;height:224px;background:#fff;border-radius:18px 18px 0 0}.plv-mp-sign__container .sign-message{display:block;margin-top:70px;color:#2c2c2c;font-size:18px;text-align:center}.plv-mp-sign__container .plv-sign-container__btn{margin:40px 24px 0;line-height:46px;font-size:16px;color:#fff;background-color:#2196f3}.plv-mp-sign__container .plv-sign-container__btn:disabled{background-color:#dfdfe0;color:#999}.plv-mp-sign__countdown{position:absolute;left:50%;bottom:182px;margin-left:-42px;z-index:99;width:84px;height:84px;line-height:84px;text-align:center;background:#fff;box-shadow:0 1px 4px 0 rgba(0,0,0,.2);border:4px solid #33a4ff;border-radius:84px;color:#33a4ff;font-size:28px}.plv-mp-sign__close__icon{position:absolute;right:16px;top:16px}.sign-show{display:block}.plv-mp-question-modal{position:absolute;top:0;left:0;width:100%;height:100%;z-index:1000}
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