<template>
<uni-shadow-root class="polyv-sdk-components-quiz-quiz"><view :class="'plv-mp-chatroom-wrap plv-mp-skin__'+(skin)">
  <scroll-view class="plv-mp-chatroom-scroll-view" :scroll-top="scrollTop" scroll-y>
    <chat-list id="quizList" :chat-list="quizList" :skin="skin"></chat-list>
  </scroll-view>
  <chat-edit isAsk="true" :skin="skin" @sengmsg="handleSendMsg"></chat-edit>
</view></uni-shadow-root>


</template><script>
import ChatList from '../chat-list/chat-list.vue'
import ChatEdit from '../chat-edit/chat-edit.vue'
global['__wxVueOptions'] = {components:{'chat-list': ChatList,'chat-edit': ChatEdit}}

global['__wxRoute'] = 'polyv-sdk/components/quiz/quiz'
import Event from"../../common/chat/eventTypes";import util from"../../common/utils/utils";import store from"../../store/index";Component({data:{quizList:[],scrollTop:0},properties:{skin:{type:String,value:"black",observer(t){"black"!==t&&"white"!==t&&this.setData({skin:"black"})}}},lifetimes:{created(){this.notJoinLists=[],this.clock=null,this.chat=null,this.chatEvent=this.getChatEvent()},attached(){store.get({"main.chat":t=>{this.chat=t,t&&(this.handleSocketEvent(),this.chat.getQuestionHistoryMessage(),this.initQuizListQueue())}})},detached(){clearInterval(this.clock),this.handleSocketEvent(!1)}},methods:{handleSendMsg(t){const i=t.detail.chatTitle;this.chat.sendQuiz(i)},handleSocketEvent(t=!0){const i=this.chat,s=this.chatEvent;i&&Object.keys(s).forEach(e=>{i[t?"on":"off"](e,s[e])})},getChatEvent(){const t=this;return{[Event.UPDATE_QUESTION_HISTROY](i,s){t.gotHistory||(t.gotHistory=!0,t.notJoinLists=[...s,...t.notJoinLists])},[Event.S_QUESTION](i,s){t.notJoinLists.push(s)},[Event.T_ANSWER](i,s){t.notJoinLists.push(s)},[Event.SYSTEM_MESSAGE](i,s){t.notJoinLists.push(s)}}},initQuizListQueue(){this.clock=setInterval(()=>{this.notJoinLists.length&&(this.setData({quizList:[...this.data.quizList,...this.notJoinLists]}),this.notJoinLists=[],wx.nextTick(()=>{this.scrollToBottom()}))},300)},scrollToBottom(){util.getDomRect("#quizList",this).then(({height:t})=>{this.setData({scrollTop:t})})}}});
export default global['__wxComponents']['polyv-sdk/components/quiz/quiz']
</script>
<style platform="mp-weixin">
.plv-mp-chatroom-wrap{position:relative;height:100%;padding-bottom:100rpx;box-sizing:border-box;background:#44434f}.plv-mp-chatroom-scroll-view{height:100%}.plv-mp-skin__white{background:#f5f9fa}
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