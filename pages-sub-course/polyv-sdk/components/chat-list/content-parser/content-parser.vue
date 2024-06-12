<template>
<uni-shadow-root class="polyv-sdk-components-chat-list-content-parser-content-parser"><view class="plv-mp-chat-msg-content">
  <image v-if="content.type === 'chatImg'" class="plv-mp-chat-msg-img" mode="widthFix" :src="content.uploadImgUrl" :style="'width: '+(content.size.width/2)+'rpx; height: '+(content.size.height/2)+'rpx;'" @click="tapImage"></image>
  <block v-else>
    <block v-for="(item,itemIndex) in (contentArr)" :key="item.itemIndex">
      <text class="plv-mp-chat-msg-content-title" v-if="item.type === 'text'">{{ item.content }}</text>
      <image v-else :src="item.url" style="width:30px;height:30px;" mode="widthFix"></image>
    </block>
  </block>
</view></uni-shadow-root>


</template><script>

global['__wxRoute'] = 'polyv-sdk/components/chat-list/content-parser/content-parser'
import emotion from"../../../common/chat/emotionList";const emotionUrl={};emotion.forEach(t=>{emotionUrl[t.title]="https:"+t.url}),Component({properties:{content:{type:[String,Object],observer(t,e){t&&t!==e&&"string"==typeof t&&this.setData({contentArr:this.parseEmotion(t)})}}},data:{contentArr:[]},methods:{tapImage(){const t=this.data.content.uploadImgUrl;wx.previewImage({urls:[t],current:t})},parseEmotion(t){let e=t;if("string"!=typeof e||!e)return[];e=e.replace(/&lt;/g,"<").replace(/&gt;/g,">");const n=[];for(;-1!==e.indexOf("[");){const t=e.indexOf("["),o=e.indexOf("]",t+1);if(-1===o)break;n.push({type:"text",content:e.substring(0,t)});const r=e.substring(t+1,o),i={type:"em",content:r};emotionUrl[r]?i.url=emotionUrl[r]:(i.type="text",i.content=`[${r}]`),n.push(i),e=e.substring(o+1)}return n.push({type:"text",content:e}),n}}});
export default global['__wxComponents']['polyv-sdk/components/chat-list/content-parser/content-parser']
</script>
<style platform="mp-weixin">
.plv-mp-chat-msg-content{text-align:left;word-break:break-all;font-size:0;min-height:36rpx}.plv-mp-chat-msg-content-title{font-size:26rpx}.plv-mp-chat-msg-img{background-color:#ddd}
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