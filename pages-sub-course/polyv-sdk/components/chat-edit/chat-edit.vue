<template>
<uni-shadow-root class="polyv-sdk-components-chat-edit-chat-edit"><view :class="'plv-mp-chat-edit-wrap '+(showMore)+' plv-mp-skin__'+(skin)" :style="iPhoneX ? 'bottom: 32px' : '0'">
  <view class="plv-mp-chat-edit-input">
    <view class="plv-mp-chat-edit-input-left">
      <image @click="tapEmoji" class="plv-mp-chat-edit-input__icon" :src="'../../assets/images/'+(skin)+'/chatroom-icon-emoji.png'"></image>
    </view>
    <input @input="chatInputChange" :value="chatTitle" class="plv-mp-chat-edit-ipt" placeholder="我也来聊几句..." maxlength="200"></input>
    <view class="plv-mp-chat-edit-input-right">
      <image v-if="(!chatTitle.length && !isAsk)" @click="tapMore" class="plv-mp-chat-edit-input__icon plv-mp-chat-edit-input__add" :src="'../../assets/images/'+(skin)+'/'+(showMore ? 'chatroom-icon-keyboard.png' : 'chatroom-icon-more.png')"></image>
      <view v-else @click="tapSend" class="plv-mp-send-btn">发送</view>
    </view>
  </view>
  <view class="plv-mp-chat-edit-more">
    <view class="plv-mp-emotion-list" v-if="showEmotionList">
      <view v-for="(emotionItem,index) in (emotionslist)" :key="emotionItem.url" @click="tapEmotionIcon" :data-title="emotionItem.title" class="plv-mp-emotion-item">
        <view class="plv-mp-emotion-item__icon" :style="'background-position: '+(emotionItem.position)"></view>
      </view>
    </view>
    <view class="plv-mp-chat-edit-plus" v-if="showMore">
      <view @click="tapOnlyHost" class="plv-mp-chat-edit-plus-item">
        <image class="plv-mp-chat-edit-host-icon" :src="isOnlyHost ? '../../assets/images/more-icon-host.png' : '../../assets/images/more-icon-host-off.png'"></image>
        <text class="plv-mp-chat-edit-host-title">{{ isOnlyHost ? '查看全部' : '只看主持人' }}</text>
      </view>
      <view v-if="showSendImg" class="plv-mp-chat-edit-plus-item">
        <image class="plv-mp-chat-edit-host-icon" src="../../assets/images/more-icon-host.png"></image>
        <text class="plv-mp-chat-edit-host-title">发送图片</text>
      </view>
      
      
      <view @click="tapBulletin" class="plv-mp-chat-edit-plus-item">
        <image class="plv-mp-chat-edit-host-icon" src="../../assets/images/more-bulletin-icon.png"></image>
        <text class="plv-mp-chat-edit-host-title">公告</text>
      </view>
    </view>
  </view>
</view></uni-shadow-root>


</template><script>

global['__wxRoute'] = 'polyv-sdk/components/chat-edit/chat-edit'
import{emotionslist}from"../../common/chat/emotions";Component({properties:{isAsk:{type:Boolean,value:!1},showSendImg:{type:Boolean,value:!1},showBulletin:{type:Boolean,value:!1},skin:{type:String,value:"black",observer(t){"black"!==t&&"white"!==t&&this.setData({skin:"black"})}},iPhoneX:{type:Boolean,value:!1}},data:{showMore:!1,emotionslist:emotionslist,isOnlyHost:!1,showEmotionList:!1,chatTitle:""},methods:{tapOnlyHost(){const t=!this.data.isOnlyHost;this.setData({isOnlyHost:t}),this.triggerEvent("onlyhost",{isOnlyHost:t})},tapEmoji(){this.setData({showEmotionList:!this.data.showEmotionList,showMore:!1})},tapMore(){this.setData({showMore:!this.data.showMore,showEmotionList:!1})},chatInputChange(t){const s=t.detail.value;this.setData({chatTitle:s})},tapSend(){const{chatTitle:t}=this.data;t&&t.replace(/\s/g,"")&&(this.triggerEvent("sengmsg",{chatTitle:t}),this.setData({chatTitle:"",showEmotionList:!1}))},tapEmotionIcon(t){const s=t.currentTarget.dataset.title;this.setData({chatTitle:`${this.data.chatTitle}[${s}]`})},tapBulletin(){this.triggerEvent("showbulletin")}}});
export default global['__wxComponents']['polyv-sdk/components/chat-edit/chat-edit']
</script>
<style platform="mp-weixin">
.plv-mp-chat-edit-wrap{position:absolute;left:0;right:0;bottom:0;background:#44434f}.plv-mp-chat-edit-input{height:100rpx;box-sizing:border-box;display:flex;padding:0 20rpx}.plv-mp-chat-edit-input-left{height:100%;display:flex;align-items:center}.plv-mp-chat-edit-ipt{flex:1;font-size:26rpx;border-radius:8rpx;border:none;background:#212121;color:#fff;padding-left:10rpx;height:60rpx;margin:20rpx 0;text-align:left}.plv-mp-chat-edit-input-right{height:100%;display:flex;align-items:center;margin-left:10rpx}.plv-mp-send-btn{color:#fff;font-size:28rpx;line-height:40rpx}.plv-mp-chat-edit-input__icon{width:40rpx;height:40rpx;margin-right:20rpx}.plv-mp-chat-edit-input__add{margin-right:0}.plv-mp-emotion-list{height:200rpx;padding:20rpx 40rpx;display:flex;flex-wrap:wrap;overflow-y:scroll;-webkit-overflow-scrolling:touch;box-sizing:border-box}.plv-mp-emotion-item{width:12%;text-align:center;font-size:0;overflow:hidden}.plv-mp-emotion-item__icon{display:inline-block;margin:-10rpx 0 0 -10rpx;width:48px;height:48px;transform:scale(.64);background:url(//livestatic.polyv.net/assets/images/em/default.png) no-repeat}.plv-mp-chat-edit-plus{height:200rpx;padding:20rpx 40rpx;overflow-y:scroll;-webkit-overflow-scrolling:touch;box-sizing:border-box}.plv-mp-chat-edit-plus-item{width:25%;display:inline-flex;flex-direction:column;justify-content:center;align-items:center;margin-bottom:20rpx}.plv-mp-chat-edit-host-icon{width:90rpx;height:90rpx;margin-bottom:20rpx}.plv-mp-chat-edit-host-title{color:#fff;font-size:24rpx}.plv-mp-skin__white{background:#fff}.plv-mp-skin__white .plv-mp-chat-edit-ipt{background:#fafafa;color:#000}.plv-mp-skin__white .plv-mp-chat-edit-host-title,.plv-mp-skin__white .plv-mp-send-btn{color:#757575}
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