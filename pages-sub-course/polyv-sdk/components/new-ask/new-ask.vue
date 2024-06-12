<template>
<uni-shadow-root class="polyv-sdk-components-new-ask-new-ask"><view :class="'plv-mp-ask-wrap plv-mp-skin__'+(skin)">
  <scroll-view id="scrollContent" scroll-y style="height: 100%" class="plv-mp-chatroom-scroll-view" :scroll-top="scrollToTop" @scrolltoupper="scrollToUpper" @scrolltolower="scrollToLower" @scroll="viewScroll">
    <view id="askContent">
      <view class="plv-mp-ask__head">
        <picker @change="bindPickerChange" :value="pickIndex" :range="pickList">
          <view class="plv-mp-ask__picker">
            {{ pickIndex === 0 ? '全部' : pickList[pickIndex] }}
          </view>
        </picker>
      </view>
      <view class="plv-mp-ask-list" :style="showEdit ? 'padding-bottom: 54px' : ''">
        <view v-for="(item,index) in (listData)" :key="item.index" :id="'QAContent'+(index)" class="plv-mp-ask-list__item" v-if="(!(item.answers.length === 0 && item.question.userId !== userId))">
          <view class="plv-mp-ask-body ask-question">
            <view class="plv-mp-ask-list__conent">问：
              <content-parser class="plv-mp-ask-component__content" :content="item.question.content"></content-parser>
            </view>
            <text class="plv-mp-ask-list__text">{{ item.question.user.nick }}</text>
            <text class="plv-mp-ask-list__text">提问：{{ item.question.timestamp }}</text>
            <text v-if="userId === item.question.userId && item.answers.length > 0" class="plv-mp-ask-list__me">@我</text>
          </view>
          <view v-for="(i,idx) in (item.answers)" :key="i.id" class="plv-mp-ask-body ask-answer" :id="'answer'+(i.id)">
            <view class="plv-mp-ask-list__conent">{{ idx === 0 ? '答' : '追加' }}：
              <content-parser class="plv-mp-ask-component__content" :content="i.content"></content-parser>
            </view>
            <text class="plv-mp-ask-list__text">{{ i.user.nick }}</text>
            <text class="plv-mp-ask-list__text">回复{{ i.timestamp }}</text>
          </view>
        </view>
        <view v-if="listData.length > 0 && (listData.length < 10 || noMoreMessage)" class="plv-mp-ask__empty__answer plv-mp-ask__lower">已经到最底啦~</view>
        <view class="plv-mp-ask__empty__answer" v-if="listData.length === 0">暂无数据哦~</view>
        <view @click="chatEditShow" :style="iPhoneX ? 'bottom: 96px' : '64px'" :class="'plv-mp-ask-edit '+(liveType === 'end' ? 'edit-end' : '')">
          <image class="plv-mp-ask-edit__img" src="../../assets/images/edit.png"></image>
        </view>
        <button v-if="showMoreTips" @click="showReply" class="plv-mp-ask__new__msg">{{ btnTips }}</button>
      </view>
    </view>
  </scroll-view>
  <chat-edit v-if="showEdit" isAsk="true" :skin="skin" :iPhoneX="iPhoneX" @sengmsg="handleSendMsg"></chat-edit>
</view></uni-shadow-root>


</template><script>
import ChatEdit from '../chat-edit/chat-edit.vue'
import ContentParser from '../chat-list/content-parser/content-parser.vue'
global['__wxVueOptions'] = {components:{'chat-edit': ChatEdit,'content-parser': ContentParser}}

global['__wxRoute'] = 'polyv-sdk/components/new-ask/new-ask'
import regeneratorRuntime from"../../common/regenerator-runtime/runtime-module";import Event from"../../common/chat/eventTypes";import util from"../../common/utils/utils";import store from"../../store/index";import api from"../../common/api/index";Component({data:{quizList:[],scrollTop:0,answerNumber:3,pickIndex:0,pickList:["查看全部","与我相关"],listData:[],showEdit:!1,showMoreTips:!1,noMoreMessage:!1,btnTips:"",scrollView:""},properties:{skin:{type:String,value:"black",observer(t){"black"!==t&&"white"!==t&&this.setData({skin:"black"})}},liveType:{type:String,observer(t){"live"!==t&&this.setData({showEdit:!1})}},iPhoneX:{type:Boolean,value:!1}},lifetimes:{created(){this.notJoinLists=[],this.clock=null,this.chat=null,this.askContent=0,this.newMessageIndex=-1,this.currentNotReadId="",this.notReadIdList=new Array,this.couldGetList=!0,this.scrollTop=0,this.recentlyId=0,this.needScrollToTop=0,this.initGetListEnabled(),this.windowHeight=wx.getSystemInfoSync().windowHeight,this.chatEvent=this.getChatEvent()},async attached(){store.get({"main.chat":t=>{this.chat=t,t&&this.handleSocketEvent()},"app.userId":t=>{this.setData({userId:t})},"main.channelDetail":t=>{this.setData({channelDetail:t}),this.getQAList().then(t=>{this.setData({listData:t}),t.length<10&&this.setData({noMoreMessage:!0}),this.getScrollViewHeight()})}})},detached(){clearInterval(this.clock),this.handleSocketEvent(!1)}},methods:{bindPickerChange(t){const e=t.detail.value;this.setData({pickIndex:e}),this.getQAList().then(t=>{this.setData({listData:t,scrollTop:0}),this.initGetListEnabled()})},async scrollToUpper(){if(!this.couldGetList||!this.upperGetList)return;this.couldGetList=!1;const{listData:t}=this.data,e=t[t.length-1].question.id,s=await this.getQAList({id:e,order:1});this.setData({listData:[...t,...s]}),s.length<10&&(this.upperGetList=!1)},async scrollToLower(){if(!this.couldGetList||!this.lowerGetList)return;this.couldGetList=!1;const{listData:t}=this.data,e=t[0].question.id,s=await this.getQAList({id:e,order:0});this.setData({listData:[...s,...t]}),s.length<10&&(this.lowerGetList=!1,this.setData({noMoreMessage:!0}))},getQAList(t={}){const{roomId:e,sessionId:s}=this.data.channelDetail,{userId:i,pickIndex:a}=this.data,o=Object.assign({roomId:e,sessionId:s,userId:i,getSelf:a,size:10},t);return new Promise(t=>{api.getQAList(o).then(e=>{if(this.couldGetList=!0,200!==e.data.code)return void this.askToast(e.data.message);const s=JSON.parse(JSON.stringify(e.data.data));0===s.length&&t([]),s.forEach((t,e,s)=>{s[e].question.user=JSON.parse(t.question.user),s[e].question.timestamp=util.returnTime(t.question.timestamp),t.answers.forEach((t,e,s)=>{s[e].user=JSON.parse(t.user),s[e].timestamp=util.returnTime(t.timestamp)})}),t(s)}).catch(t=>{this.couldGetList=!0,this.askToast("网络错误，清稍后重试")})})},handleSendMsg(t){const e=t.detail.chatTitle,{listData:s}=this.data;this.chat.sendQuestion(e,t=>{const e=JSON.parse(t);200===e.code&&(s.push({answers:[],question:{content:e.data.content,id:e.data.questionId,timestamp:util.returnTime(e.data.timestamp),userId:e.data.user.userId,user:e.data.user}}),this.setData({listData:s}))})},chatEditShow(){"live"===this.data.liveType&&this.setData({showEdit:!this.data.showEdit})},viewScroll(t){this.scrollTop=t.detail.scrollTop},showReply(){const{currentNotReadId:t,newMessageIndex:e}=this;-1===e?t&&this.getQAList({id:t,getSelf:0,order:1,getCurrent:1}).then(e=>{this.setData({listData:e,pickIndex:0,showMoreTips:!1}),this.chatScrollToBottom(),e.length<10&&this.getQAList({id:t,getSelf:0,order:0,getCurrent:0,size:10-e.length}).then(t=>{this.setData({listData:[...t,...this.data.listData],scrollTop:0})})}):this.setData({showMoreTips:!1,scrollToTop:this.needScrollToTop})},handleSocketEvent(t=!0){const e=this.chat,s=this.chatEvent;e&&Object.keys(s).forEach(i=>{e[t?"on":"off"](i,s[i])})},moreTipsBtnShow(t,e){const s=t===e?"@我有新回复":"有新问答信息";this.setData({showMoreTips:!0,btnTips:s})},getChatEvent(){const t=this;return{[Event.LAUNCH_A](e,s){const{listData:i,userId:a}=t.data,o=JSON.parse(JSON.stringify(s));o.timestamp=util.returnTime(o.timestamp);const{questionId:n,id:r,questionerId:h}=s,l=i.findIndex(t=>t.question.id===n);if(t.recentlyId=r,t.newMessageIndex=l,-1===l)return t.notReadIdList.push({answerId:r,questionId:n}),t.currentNotReadId=n,void t.moreTipsBtnShow(h,a);i[l].answers.push(o),t.setData({listData:i},function(){util.getDomRect(`#answer${t.recentlyId}`,t).then(e=>{const{top:s,height:i}=e,{otherHeight:o,windowHeight:n,scrollTop:r,viewHeight:l}=t,d=s+i;s>0&&o<d&&d<n||(t.moreTipsBtnShow(h,a),t.needScrollToTop=s<0?Math.abs(r-o+d):d<o?r-s:r+l+s-n)})})},[Event.DELETE_QA_ANSWER](e,s){const{listData:i}=t.data;if(0===i.legnth)return;let a=!0;const o=JSON.parse(JSON.stringify(s));for(let e=0;e<i.length;e++)for(let s=0;s<i[e].answers.length;s++)if(i[e].answers[s].id===o.id){i[e].answers.splice(s,1),t.setData({listData:i}),a=!1;break}if(a){const e=t.notReadIdList.findIndex(t=>t.answerId===o.id);-1!==e&&(t.notReadIdList.splice(e,1),t.currentNotReadId="",t.setData({showMoreTips:!1}))}}}},chatScrollToBottom(){util.getDomRect("#askContent",this).then(({height:t})=>{this.setData({scrollToTop:t})})},getScrollViewHeight(){util.getDomRect("#scrollContent",this).then(({height:t})=>{this.viewHeight=t,this.otherHeight=this.windowHeight-t})},initGetListEnabled(){this.lowerGetList=!0,this.upperGetList=!0},askToast(t){wx.showToast({title:t,icon:"none",duration:2e3})}}});
export default global['__wxComponents']['polyv-sdk/components/new-ask/new-ask']
</script>
<style platform="mp-weixin">
.plv-mp-ask-wrap{width:100%;height:100%;background:#1a1b1f;overflow-y:auto}.plv-mp-ask-wrap .plv-mp-ask-component__content{display:inline-block}.plv-mp-ask-wrap .plv-mp-ask__head{height:40px;padding:0 28px 0 16px;font-size:14px;display:flex;justify-content:flex-end;align-items:center;color:#adadc0;position:fixed;right:0}.plv-mp-ask-wrap .plv-mp-ask__picker{position:relative}.plv-mp-ask-wrap .plv-mp-ask__picker:after,.plv-mp-ask-wrap .plv-mp-ask__picker:before{position:absolute;right:-12px;top:8px;content:"";border-top:5px dashed #1a1b1f;border-left:5px dashed transparent;border-right:5px dashed transparent;border-bottom:5px solid transparent}.plv-mp-ask-wrap .plv-mp-ask__picker:before{border-top:5px solid #adadc0}.plv-mp-ask-wrap .plv-mp-ask__picker:after{top:6px;border-top:5px solid #1a1b1f}.plv-mp-ask-wrap .plv-mp-ask-list{display:flex;flex-direction:column-reverse;padding-top:40px}.plv-mp-ask-wrap .plv-mp-ask__empty__answer{text-align:center;color:#595a66;font-size:14px;margin-top:16px}.plv-mp-ask-wrap .plv-mp-ask__lower{position:absolute;width:100%;margin-top:32px}.plv-mp-ask-wrap .plv-mp-ask-list__item:not(:first-child){margin-bottom:16px}.plv-mp-ask-wrap .plv-mp-ask-body{padding:24px 16px;font-size:14px;color:#adadc0;background:#22232a}.plv-mp-ask-wrap .plv-mp-ask-body .plv-mp-ask-list__text{display:inline-block;margin:16px 8px 0 0;font-size:12px;color:#595a66}.plv-mp-ask-wrap .plv-mp-ask-body .plv-mp-ask-list__me{color:#a45461}.plv-mp-ask-wrap .ask-question{margin-bottom:1px;font-size:16px}.plv-mp-ask-wrap .ask-answer{padding:24px 16px}.plv-mp-ask-wrap .ask-answer:not(:last-child){border-bottom:1px dashed #1a1b1f}.plv-mp-ask-wrap .plv-mp-ask__new__msg{position:fixed;bottom:64px;left:50%;transform:translateX(-50%);height:32px;line-height:32px;margin:0 auto;color:#fff;background:#3082fe;border-radius:16px;opacity:.8;font-size:14px;z-index:1000}.plv-mp-ask-wrap .plv-mp-ask-edit{position:fixed;bottom:64px;right:16px;width:64px;height:64px;background:#3082fe;border-radius:32px;display:flex;justify-content:center;align-items:center}.plv-mp-ask-wrap .plv-mp-ask-edit .plv-mp-ask-edit__img{width:24px;height:24px}.plv-mp-ask-wrap .edit-end{background:#999}.plv-mp-skin__white{background-color:#eef0f6}.plv-mp-skin__white .plv-mp-ask__head{color:#333}.plv-mp-skin__white .plv-mp-ask__picker:after,.plv-mp-skin__white .plv-mp-ask__picker:before{position:absolute;right:-12px;top:8px;content:"";border-top:5px dashed #eef0f6;border-left:5px dashed transparent;border-right:5px dashed transparent;border-bottom:5px solid transparent}.plv-mp-skin__white .plv-mp-ask__picker:before{border-top:5px solid #aeacb7}.plv-mp-skin__white .plv-mp-ask__picker:after{top:6px;border-top:5px solid #eef0f6}.plv-mp-skin__white .plv-mp-ask-body{color:#333;background:#f6f8ff}.plv-mp-skin__white .plv-mp-ask-body .plv-mp-ask-list__text{color:#888}.plv-mp-skin__white .plv-mp-ask-body .plv-mp-ask-list__me{color:#a45461}.plv-mp-skin__white .ask-answer:not(:last-child){border-bottom:1px dashed #eef0f6}.plv-mp-skin__white .edit-end{background:#999}.plv-mp-watch-page__x .plv-mp-ask-wrap .plv-mp-ask-edit{bottom:96px}
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