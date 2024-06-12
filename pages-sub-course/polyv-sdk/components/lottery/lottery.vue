<template>
<uni-shadow-root class="polyv-sdk-components-lottery-lottery"><view class="plv-mp-lottery" :style="'z-index: '+(zIndex)" v-if="lotteryShow">
  <view class="plv-mp-lottery__head">
    <image @click="handleClick" v-if="lotteryStatus === 'list' || lotteryStatus === 'submit'" data-type="back" class="plv-lottery-head-image plv-mp-lottery__back" src="https://livestatic.videocc.net/assets/wimages/lottery-btn-return@2x.png"></image>
    <image @click="handleClick" data-type="close" class="plv-lottery-head-image plv-mp-lottery__clear" src="https://livestatic.videocc.net/assets/wimages/lottery-btn-close@2x.png"></image>
    <text class="plv-lottery-head__text">{{ headText }}</text>
  </view>
  <view class="plv-mp-lottery__start" v-if="lotteryStatus === 'start'">
    <image class="plv-lottery-start__image" src="https://livestatic.videocc.net/assets/wimages/gift.gif"></image>
  </view>
  <view class="plv-mp-lottery__result result-win" v-if="lotteryStatus === 'win'">
    <image class="plv-mp-lottery__result__image" src="https://livestatic.videocc.net/assets/wimages/icon-lottery-zj@2x.png"></image>
    <text class="plv-mp-lottery__result__text">恭喜您抽中“{{ prize }}”</text>
    <view class="plv-mp-lottery__code">兑换码为:<text class="lottery-code__text">{{ winnerCode }}</text></view>
    <view v-if="handleList.length > 0" class="plv-mp-lottery__check__list" @click="handleClick" data-type="list">查看中奖名单</view>
    <button class="plv-lottery__result__btn result-win__button" @click="handleClick" data-type="submit">填写联系信息</button>
  </view>
  <view class="plv-mp-lottery__result result-submit" v-if="lotteryStatus === 'submit'">
    <text class="result-submit__text">请填写以下信息，后续会有工作人员与您联系</text>
    <view class="plv-mp-lottery__input__content">
      <input class="result-submit__input input-content" type="text" placeholder="请输入您的姓名" @blur="getName" auto-focus></input>
      <input class="result-submit__input input-content" type="number" @blur="checkPhone" maxlength="11" placeholder="请输入您的手机号码"></input>
      <block v-for="(item,index) in (customInfo)" :key="item.index">
        <input class="result-submit__input input-content" @blur="getCustom" :data-index="index" type="text" :placeholder="item.tips"></input>
      </block>
    </view>
    <button class="plv-lottery__result__btn result-submit__btn" @click="submitInfo">提交</button>
  </view>
  <view class="plv-mp-lottery__result result-list" v-if="lotteryStatus === 'list'">
    <view class="plv-mp-lottery__list__content">
      <scroll-view scroll-y style="height: 100%" class="plv-mp-chatroom-scroll-view" :scroll-top="scrollTop" @scrolltolower="getListWinners">
          <view v-for="(li,index) in (handleList)" :key="li.index" class="plv-lottery-list__view">
            <text v-for="(item,index) in (li)" :key="item" class="plv-mp-lottery__result__text list__view__text">{{ item }}</text>
          </view>
      </scroll-view>
    </view>
    <button class="plv-lottery__result__btn result-list__btn" @click="handleClick" data-type="back">返回</button>
  </view>
  <view class="plv-mp-lottery__result result-thx" v-if="lotteryStatus === 'notWin'">
    <image class="plv-mp-lottery__result__image" src="https://livestatic.videocc.net/assets/wimages/icon-lottery-wzj@2x.png"></image>
    <text class="plv-mp-lottery__result__text">很遗憾您未中奖，谢谢参与</text>
    <view v-if="handleList.length > 0" class="plv-mp-lottery__check__list" @click="handleClick" data-type="list">查看中奖名单</view>
    <button class="plv-lottery__result__btn result-thx__btn" @click="handleClick" data-type="close">我知道了</button>
  </view>
</view></uni-shadow-root>


</template><script>

global['__wxRoute'] = 'polyv-sdk/components/lottery/lottery'
import Event from"../../common/chat/eventTypes";import store from"../../store/index";import api from"../../common/api/index";let customAry=[];Component({data:{channelId:"",lotteryStatus:"list",winnerCode:"dIRxUGGk",prize:"特等奖",headText:"正在抽奖",handleList:[],lotteryShow:!1,collectInfo:[],customInfo:[],lotteryId:"",sessionId:""},properties:{zIndex:{type:Number,default:2e3}},lifetimes:{created(){this.chatEvent=this.getChatEvent(),this.chat=null,this.page=1,this.totalPages=null,this.lotteryWinner=!1,this.winnerList=[]},attached(){this.unsub=store.get({"main.chat":t=>{this.chat=t,t&&this.bindEvent(this.chatEvent)}}),this.handelWinnerList(this.winnerList)},detached(){if(this.unsub(),clearInterval(this.signTimer),!this.chat)return;const t=this.chatEvent;Object.keys(t).forEach(e=>{this.chat.off(e,t[e])}),this.chat=null}},methods:{bindEvent(t){const e=this.chat;e&&Object.keys(t).forEach(s=>{e.on(s,t[s])})},getChatEvent(){const t=this;return{[Event.LOTTERY_START](e,s){t.startHandle(s)},[Event.ON_LOTTERY](e,s){t.startHandle(s)},[Event.LOTTERY_END](e,s){t.winnerList=[],t.totalPages=null,t.page=1,t.allowRequestList=!0,t.lotteryWinner=!1,t.endHandle(s),t.getListWinners()}}},startHandle(t){this.setData({lotteryStatus:"start",headText:this.updateHeadText("start"),lotteryShow:!0})},endHandle(t){const e=t.data[0];this.setData({sessionId:t.sessionId,lotteryId:t.lotteryId}),e?(this.winnerHandle(t,e),this.lotteryWinner=!0):(this.setData({lotteryStatus:"notWin",headText:this.updateHeadText("win")}),this.lotteryWinner=!1)},getListWinners(){const{page:t,totalPages:e}=this,{lotteryId:s}=this.data;null!=e&&t>e||!this.allowRequestList||(this.allowRequestList=!1,api.getListWinners({page:t,lotteryId:s}).then(t=>{this.allowRequestList=!0;const e=t.data.data;this.totalPages=e.totalPages,this.page+=1,this.winnerList=[...this.winnerList,...e.contents],this.getWinnerNick(this.winnerList),this.lotterying=!1}).catch(()=>this.allowRequestList=!0))},winnerHandle(t,e){this.setData({channelId:e.channelId,lotteryStatus:"win",headText:this.updateHeadText("win"),winnerCode:e.winnerCode,lotteryShow:!0,prize:t.prize,collectInfo:JSON.parse(t.collectInfo)}),this.handleCustomInfo(this.data.collectInfo)},getName(t){customAry[0]=t.detail.value},checkPhone(t){/^1[3456789]\d{9}$/.test(t.detail.value)?customAry[1]=t.detail.value:this.lotteryToast("手机号码格式错误")},getCustom(t){const e=t.detail.value,s=t.target.dataset.index+2;customAry[s]=e},submitInfo(){const{channelId:t,sessionId:e,lotteryId:s,winnerCode:i}=this.data,{userId:a}=this.chat,n=JSON.parse(JSON.stringify(this.data.collectInfo));n.map((t,e)=>{delete t.tips,t.value=customAry[e]}),n.some(t=>!t.value)?this.lotteryToast("请提交完整信息"):(api.addReceiveInfo({channelId:t,sessionId:e,lotteryId:s,viewerId:a,winnerCode:i,receiveInfo:JSON.stringify(n)}).then(t=>{200===t.data.code?(this.lotteryToast("提交成功"),this.setData({lotteryShow:!1})):this.lotteryToast("提交失败，请稍后重试")}).catch(()=>this.lotteryToast("网络错误，请稍后重试")).finally(()=>this.triggerEvent("showPptPaint")),this.setData({receiveInfo:n}))},lotteryToast(t){wx.showToast({title:t,icon:"none",duration:2e3})},updateHeadText:t=>({list:"中奖名单",submit:"填写联系信息",start:"正在抽奖",win:"中奖结果",notWin:"中奖结果"})[t]||"中奖结果",handleClick(t){const{type:e}=t.currentTarget.dataset;switch(e){case"list":this.clickSetData(e);break;case"submit":customAry=[],this.clickSetData(e);break;case"back":this.clickSetData(this.lotteryWinner?"win":"notWin");break;case"close":this.setData({lotteryShow:!1}),this.triggerEvent("showPptPaint")}},clickSetData(t){this.setData({lotteryStatus:t,headText:this.updateHeadText(t)})},getWinnerList(){const{channelId:t,lotteryId:e}=this.data;api.getWinnerList({channelId:t,lotteryId:e,timestamp:Date.now()}).then(t=>{const e=t.data.data.map(t=>t.nick);this.handelWinnerList(e)})},handleCustomInfo(t){const e=JSON.parse(JSON.stringify(t));0!==e.length&&this.setData({customInfo:e.splice(2)})},getWinnerNick(t=[]){if(0===t.length)return void this.setData({handleList:[]});const e=t.map(t=>t.viewerName);this.handelWinnerList(e)},handelWinnerList(t=[],e=3){if(0===!t.length)return void this.setData({handleList:[]});const s=t.length,i=s%e==0?s/e:Math.floor(s/e+1),a=[];for(let s=0;s<i;s++){const i=t.slice(s*e,s*e+e);a.push(JSON.parse(JSON.stringify(i)))}this.setData({handleList:a})}}});
export default global['__wxComponents']['polyv-sdk/components/lottery/lottery']
</script>
<style platform="mp-weixin">
.plv-mp-lottery{position:absolute;bottom:0;left:0;width:100%;background:#fff;border-radius:8px 8px 0 0;z-index:2000}.plv-mp-lottery .plv-mp-lottery__head{height:49px;border-radius:8px 8px 0 0;border-bottom:1px solid #ededef;text-align:center;position:relative;overflow:hidden}.plv-mp-lottery .plv-mp-lottery__head .plv-lottery-head-image{position:absolute;width:28px;height:28px;top:50%;transform:translateY(-50%)}.plv-mp-lottery .plv-mp-lottery__head .plv-mp-lottery__clear{right:16px}.plv-mp-lottery .plv-mp-lottery__head .plv-mp-lottery__back{left:16px}.plv-mp-lottery .plv-mp-lottery__head .plv-lottery-head__text{font-size:16px;color:#333;line-height:49px}.plv-mp-lottery .plv-mp-lottery__start>.plv-lottery-start__image{width:314px;height:201px;margin:24px auto;display:block}.plv-mp-lottery .plv-mp-lottery__result .plv-mp-lottery__result__text{font-size:18px;color:#333;text-align:center;display:block}.plv-mp-lottery .plv-mp-lottery__result .plv-mp-lottery__result__image{width:60px;height:60px;display:block;margin:25px auto 23px}.plv-mp-lottery .plv-mp-lottery__result .plv-lottery__result__btn{width:160px;height:48px;margin:24px auto;color:#fff;border-radius:24px;border:none;outline:none}.plv-mp-lottery .plv-mp-lottery__result .plv-mp-lottery__code{color:#333;font-size:14px;text-align:center;margin-top:8px}.plv-mp-lottery .plv-mp-lottery__result .plv-mp-lottery__code .lottery-code__text{color:#d66842;display:inline-block;font-size:14px}.plv-mp-lottery .plv-mp-lottery__result .plv-mp-lottery__check__list{font-size:16px;color:#3082fe;margin-top:24px;display:block;text-align:center}.plv-mp-lottery .result-thx .result-thx__btn{background:#3082fe}.plv-mp-lottery .result-win .result-win__button{background:#ff5722}.plv-mp-lottery .result-submit{position:static}.plv-mp-lottery .result-submit .result-submit__text{display:block;margin:24px auto;color:#333;font-size:14px;text-align:center}.plv-mp-lottery .result-submit .result-submit__input{width:296px;height:48px;display:block;margin:0 auto 16px;padding:0 18px;background:#f6f6f6;border-radius:24px;border:none;outline:none}.plv-mp-lottery .result-submit .result-submit__btn{background:#ff5722}.plv-mp-lottery .result-submit .result-submit__text:last-child{margin-bottom:0}.plv-mp-lottery .result-submit .plv-mp-lottery__input__content{max-height:160px;overflow:auto}.plv-mp-lottery .result-submit .plv-mp-lottery__input__content .input-content{color:#333;font-size:16px}.plv-mp-lottery .result-list .result-list__btn{background-color:#3082fe}.plv-mp-lottery .plv-mp-lottery__list__content{height:192px;overflow:auto}.plv-mp-lottery .plv-mp-lottery__list__content .plv-lottery-list__view{display:block;background-color:#fff;height:48px;overflow:hidden}.plv-mp-lottery .plv-mp-lottery__list__content .plv-lottery-list__view .list__view__text{display:inline-block;width:33.33%;color:#333;font-size:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;line-height:48px}.plv-mp-lottery .plv-mp-lottery__list__content>.plv-lottery-list__view:nth-child(2n){background-color:#f8f8fb}
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