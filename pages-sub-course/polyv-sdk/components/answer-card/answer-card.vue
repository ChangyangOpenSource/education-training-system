<template>
<uni-shadow-root class="polyv-sdk-components-answer-card-answer-card"><view :class="'plv-mp-answer-card-wrap '+(isShow ? 'show' : '')">
  
  <view v-if="status === 'option' || status === 'result' || status === 'score_result'" class="plv-mp-answer-card-question">
    <view class="plv-mp-answer-card-question__top">
    
      <image class="plv-mp-answer-card-question__top__back" src="../../assets/images/icon-back.png" v-if="status === 'result' && !showResultTip && !isVote && !isScore" @click="handleClickBack"></image>
      <text class="plv-mp-answer-card-question__top__text">{{ title }}</text>
      
      <image @click="closePanel" class="plv-mp-answer-card-question__top__close" src="../../assets/images/interact-btn-close.png"></image>
    </view>
    <view class="plv-mp-answer-card-question__middle" v-if="(!(status === 'result' && showResultTip && !isVote && status !== 'score_result'))">
      
      <scroll-view v-if="itemType === 0" scroll-y :style="questionScrollH">
        <view class="plv-mp-answer-card-question__middle__wrap" v-if="status !== 'score_result'">
          <text class="plv-mp-answer-card-question__middle__title">{{ answersContent }}</text>
          <text class="plv-mp-answer-card-question__middle__multiTips">{{ multiContent }}</text>
          <view>
            <block v-for="(item,index) in (answersOption)">
              
              <view class="plv-mp-answer-card-choice">
                <view :id="item.index" :data-index="item.index" :data-letter="item.letter" @click="choiceTap" :class="'plv-mp-answer-card-question__middle__choice '+(isVote ? '' : item.style)">
                  <view v-if="isVote && status==='result'" class="plv-mp-answer-card-question__middle__choice__vote" :style="'width:'+(voteResult[item.index])+'%'"></view>
                  <view v-if="isVote && status==='result'" class="plv-mp-answer-card-question__middle__choice__num"><view class="plv-mp-answer-card-question__middle__choice__num__text">{{singleResult[item.index]}}</view>人</view>
                  <view class="plv-mp-answer-card-question__middle__choice__text">{{ item.choice }}{{isScore&&item.tips?(' ('+item.tips+')'):''}}</view>
                </view>
                <image v-if="(!isVote && !!item.choiceClass)" class="plv-mp-answer-card-choice-icon" :src="'../../assets/images/icon-'+(item.choiceClass)+'.png'"></image>
              </view>
            </block>
          </view>
        </view>
        <view v-else class="plv-mp-answer-card-score">
          <image class="plv-mp-answer-card-score__icon" src="../../assets/images/icon-tip.png"></image>
          <view class="plv-mp-answer-card-score__tip">评分已截止</view>
          <view class="plv-mp-answer-card-score__title">{{scoreContent}}</view>
          <view class="plv-mp-answer-card-score__score">平均得分<view class="plv-mp-answer-card-score__score__num">{{averageNum}}</view>分</view>
        </view>
      </scroll-view>
      
      <view v-else class="plv-mp-answer-card-question__middle__quick">
        <block v-for="(item,index) in (answersOption)">
          <view :id="item.index" :data-index="item.index" :data-letter="item.letter" @click="choiceTap" :class="'plv-mp-answer-card-question__middle__quick__choice '+(item.style)">
            {{ item.letter }}
          </view>
        </block>
      </view>
    </view>
    <view v-else class="plv-mp-answer-card-question-result-tip">
      <image class="plv-mp-answer-card-question-result-tip__icon" :src="'../../assets/images/icon-'+(answerResult.icon)+'.png'"></image>
      <view class="plv-mp-answer-card-question-result-tip__tip">
        {{answerResult.tip}}
      </view>
      <view class="plv-mp-answer-card-question-result-tip__btn" @click="checkResult">
        查看答案
      </view>
    </view>
    
    <view v-if="status === 'option' || status === 'score_result'" :class="'plv-mp-answer-card-question__bottom '+(hasChoice? 'active' : '')">
      <view @click="submitTap" class="plv-mp-answer-card-question__bottom__btn">
        {{ submit }}
        <view v-if="(!!duration && status !== 'score_result')" class="plv-mp-answer-card-question__bottom__btn__duration">
          <image class="plv-mp-answer-card-question__bottom__btn__duration__icon" src="../../assets/images/icon-duration.png"></image>
          <view class="plv-mp-answer-card-question__bottom__btn__duration__time">{{duration}}s</view>
        </view>
        
      </view>
      
    </view>
  </view>
  
  
</view>
 

<view v-if="status === 'submit' || status === 'cut_off'">
  <modal id="answerModal" class="plv-mp-answer-card-modal" :modalData="modalData" @onModalHide="onModalHide">
  </modal>
</view></uni-shadow-root>


</template><script>
import Modal from '../modal/modal.vue'
global['__wxVueOptions'] = {components:{'modal': Modal}}

global['__wxRoute'] = 'polyv-sdk/components/answer-card/answer-card'
import store from"../../store/index";import Event from"../../common/chat/eventTypes";import AnswerCard from"../../common/answerCard/index";import LANGUAGE from"../../common/answerCard/Language";import regeneratorRuntime from"../../common/regenerator-runtime/runtime-module";Component({properties:{answerCardSize:{type:Object,observer(t){const{width:e,height:s}=this.answerCardSize=t;e&&s&&this.resize({width:e,height:s})}}},data:{title:LANGUAGE.TITLE,submit:LANGUAGE.SUBMIT,submitDone:LANGUAGE.SUBMIT_DONE,cutOff:LANGUAGE.CUT_OFF,average:LANGUAGE.AVERAGE,hasChoice:!1,topTextClass:"",STATUS:{OPTION:"option",RESULT:"result",SCORE_RESULT:"score_result",SUBMIT:"submit",CUT_OFF:"cut_off",NONE:"none",SUBMIT_CLOSE:LANGUAGE.IKNOW},status:"",isShow:!1,scroeTips:"",averageNum:0,duration:0,useTime:0,isVote:!1,singleResult:[],answerTotal:0,voteResult:[],showResultTip:!0,answerResult:{}},lifetimes:{created(){this.chatEvent=this.getChatEvent(),this.chat=null,this.answerRetryTime=3,this.answerCard=new AnswerCard},attached(){this.unsub=store.get({"main.chat":t=>{this.chat=t,t&&this.bindEvent(this.chatEvent)}})},ready(){this.answerModal=this.selectComponent("#answerModal")}},methods:{bindEvent(t){const e=this.chat;e&&Object.keys(t).forEach(s=>{e.on(s,t[s])})},getChatEvent(){const t=this,{STATUS:e}=this.data;return{[Event.GET_TEST_QUESTION_CONTENT](s,a){console.log("GET_TEST_QUESTION_CONTENT:",a),t.clearAnswerTimeoutClock(),t.answerCard.getQuestionContent(a,(s,a,i)=>{t.setData(s),t.setData({title:a,topTextClass:i,status:e.OPTION,isShow:!0,isVote:!1})}),t.resizeScroll(),t.toShow(!0),t.getChatEvent.startTime=Date.now(),t.getDuration(a.duration)},[Event.GET_TEST_QUESTION_RESULT](s,a){if(console.log("GET_TEST_QUESTION_RESULT",a),t.clearAnswerTimeoutClock(),t.answerCard.getIsScore())return t.answerCard.getQuestionScoreResult(a,({name:s,integer:a,decimalPoint:i,average:o})=>{t.setData({scoreContent:s,integer:a,isShow:!0,averageNum:Number(o).toFixed(1),decimalPoint:i,status:e.SCORE_RESULT,title:"答题结果",submit:e.SUBMIT_CLOSE})}),t.resizeScroll(),void t.toShow(!0);t.answerCard.getQuestionResult(a,({answersOption:s,topTextClass:a,singleResult:i,type:o,isRight:r})=>{const n=i.reduce((t,e)=>parseInt(t)+parseInt(e)),h=i.map(t=>Math.ceil(t/n*100));let l=r?"answer-right":"answer-wrong",T=r?"恭喜你答对了":"抱歉您答错了",c="答题结果";t.answerCard.getIsSubmitted()||(l="tip",c=T="未作答"),t.setData({answersOption:s,title:c,topTextClass:a,status:e.RESULT,isVote:"V"===o,singleResult:i,voteResult:h,answerTotal:n,answerResult:{icon:l,tip:T},showResultTip:!0,isShow:!0}),t.toShow(!0)}),t.resizeScroll()},[Event.STOP_TEST_QUESTION](s,a){console.log("STOP_TEST_QUESTION",a),t.clearAnswerTimeoutClock(),t.answerCard.getLatestQusetionId(),a.questionId,t.answerCard.getIsSubmitted()||(t.setData({status:e.CUT_OFF,modalData:t.getModalData(0)}),t.selectComponent("#answerModal").show())}}},getDuration(t){let e=parseInt(t);if(isNaN(e))return;clearInterval(this.getDuration.interval);const s=()=>new Promise(t=>this.chat.getTestQuestionDuration(t));this.setData({duration:e}),this.getDuration.interval=setInterval(async()=>{if(0===e)return clearInterval(this.getDuration.interval),void this.submitTap();const t=await s();e=t.data.time,this.setData({duration:e})},1e3)},choiceTap(t){const{status:e,STATUS:s}=this.data,{index:a,letter:i}=t.currentTarget.dataset;e===s.OPTION&&this.answerCard.choiceTap(a,i,(t,e,s)=>{this.setData({hasChoice:t,answersOption:e,scoreTips:s})})},submitTap(){const{STATUS:t}=this.data;if("score_result"===this.data.status)return this.toShow(!1),void this.setData({submit:t.SUBMIT});this.answerCard.getHasChoice()&&(this.setData({isShow:!1}),this.clearAnswerTimeoutClock(),this.answerRetryTime=3,this.submitHandle())},submitHandle(){this.answerCard.toSendAnswer(this.chat,t=>{let e;this.clearAnswerTimeoutClock();try{e=JSON.parse(t).code}catch(t){e=400}const s={200:LANGUAGE.SUBMIT_DONE,310:LANGUAGE.IGNORE,302:LANGUAGE.ANSWER_END,303:LANGUAGE.ANSWER_SUBMITED,400:LANGUAGE.SUBMIT_FAILED}[e]||LANGUAGE.SUBMIT_FAILED;this.setData({status:this.data.STATUS.SUBMIT,modalData:this.getModalData(200===e?1:e,s)}),this.selectComponent("#answerModal").show()});const t=Date.now()-this.getChatEvent.startTime;this.setData({useTime:(t/1e3).toFixed(1)}),this.answerTimeout=setTimeout(()=>{this.answerRetryTime-=1,this.toShow(!1),this.answerRetryTime<0?(this.setData({status:"submit",modalData:this.getModalData(400,LANGUAGE.SUBMIT_FAILED)}),this.selectComponent("#answerModal").show()):this.submitHandle()},5e3)},clearAnswerTimeoutClock(){this.answerTimeout&&clearTimeout(this.answerTimeout)},closePanel(){this.toShow(!1)},resize({width:t,height:e}){const{status:s,STATUS:a}=this.data;let i=0;i=s===a.RESULT?e-96:e-96-140,this.setData({questionScrollH:`height:${i}rpx`})},resizeScroll(){const{width:t,height:e}=this.answerCardSize;t&&e&&this.resize({width:t,height:e})},onModalHide(){this.toShow(!1)},getModalData(t,e=""){const{submitDone:s,cutOff:a}=this.data;let i={};return i=1===t?{imgSrc:"../../assets/images/interact-submit-success.png",modalText:s}:{imgSrc:"../../assets/images/interact-cut-off.png",modalText:0===t?a:e}},toShow(t){this.triggerEvent("onAnswerCardShow",{isShow:t})},checkResult(){this.setData({showResultTip:!1})},handleClickBack(){this.setData({showResultTip:!0})}},options:{addGlobalClass:!0}});
export default global['__wxComponents']['polyv-sdk/components/answer-card/answer-card']
</script>
<style platform="mp-weixin">
@font-face{font-family:iconfont;src:url(//at.alicdn.com/t/font_1204021_al4fs65ukh6.eot);src:url(//at.alicdn.com/t/font_1204021_al4fs65ukh6.eot#iefix) format("embedded-opentype"),url(//at.alicdn.com/t/font_1204021_al4fs65ukh6.woff2) format("woff2"),url(//at.alicdn.com/t/font_1204021_al4fs65ukh6.woff) format("woff"),url(//at.alicdn.com/t/font_1204021_al4fs65ukh6.ttf) format("truetype"),url(//at.alicdn.com/t/font_1204021_al4fs65ukh6.svg#iconfont) format("svg")}.iconfont{font-family:iconfont!important;font-size:16px;font-style:normal;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.icon_right:before{content:"\e62f"}.icon_error:before{content:"\ed1e"}.plv-mp-answer-card-wrap{color:#5c5c5c;font-size:32rpx;box-sizing:border-box;font-family:Helvetica,sans-serif;display:none}.plv-mp-answer-card-question,.plv-mp-answer-card-wrap{height:100%;border-top-left-radius:16rpx;border-top-right-radius:16rpx}.plv-mp-answer-card-question{position:absolute;width:100%;bottom:0;background-color:#fff;overflow:hidden}.plv-mp-answer-card-question__top{position:relative;height:98rpx;vertical-align:middle;line-height:98rpx;border-bottom:2rpx solid #ededef;overflow:hidden}.plv-mp-answer-card-question__top__text{font-size:32rpx;color:#333;text-align:center;display:block}.plv-mp-answer-card-question__top__close{position:absolute;width:46rpx;height:46rpx;right:32rpx;top:50%;transform:translateY(-50%)}.plv-mp-answer-card-question__top__back{position:absolute;width:56rpx;height:56rpx;top:49rpx;margin-top:-28rpx;margin-left:32rpx}.plv-mp-answer-card-question__top .ansResult{padding:10rpx 20rpx;color:#fff;border-radius:44rpx;letter-spacing:2rpx}.plv-mp-answer-card-question__top .noAnswer{background:#c1c1c1}.plv-mp-answer-card-question__top .correctAnswer{background:#61d3b7}.plv-mp-answer-card-question__top .wrongAnswer{background:#ff5c69}.plv-mp-answer-card-question__middle__wrap{padding:38rpx 48rpx}.plv-mp-answer-card-question__middle__title{color:#333;font-size:32rpx;letter-spacing:2rpx;font-weight:600}.plv-mp-answer-card-question__middle__multiTips{padding-left:16rpx}.plv-mp-answer-card-question__middle__choice{border-radius:40rpx;padding:16rpx 32rpx;border:2rpx solid #cfd8dc;letter-spacing:2rpx;color:#333;font-size:28rpx;box-sizing:border-box}.plv-mp-answer-card-question__middle__choice__vote{position:absolute;left:0;bottom:0;height:80rpx;border-radius:40rpx;width:50%;background-color:#c0e3ff}.plv-mp-answer-card-question__middle__choice__num{position:absolute;bottom:0;right:40rpx}.plv-mp-answer-card-question__middle__choice__num__text{color:#3082fe;display:inline}.plv-mp-answer-card-question__middle__result{border:none;background-color:#edf1f7}.plv-mp-answer-card-question__middle__arrow{width:0;height:0;border-left:30px solid transparent;border-right:30px solid transparent;border-bottom:30px solid #fff}.plv-mp-answer-card-question__middle__score{display:flex;justify-content:center;padding:30rpx 0}.plv-mp-answer-card-question__middle__score__choice{display:inline-block;width:92rpx;height:92rpx;text-align:center;vertical-align:middle;line-height:92rpx;border:1px solid #eaeaea;border-radius:20rpx;margin:0 24rpx}.plv-mp-answer-card-question__middle__score__tips{padding-top:10px}.plv-mp-answer-card-question__middle__quick{display:flex;justify-content:space-around;padding:88rpx 0}.plv-mp-answer-card-question__middle__quick__choice{width:88rpx;height:88rpx;text-align:center;vertical-align:middle;line-height:88rpx;border:2rpx solid #eaeaea;border-radius:44rpx}.plv-mp-answer-card-question__middle .icon_choice{position:absolute;display:none;top:54rpx;right:20rpx}.plv-mp-answer-card-question__middle .choiceRight{color:#3082fe;background-color:#c0e3ff}.plv-mp-answer-card-question__middle .choiceIconRight{display:block;color:#fff}.plv-mp-answer-card-question__middle .choiceWrong{color:#e45b5b;background-color:#ffe3e3}.plv-mp-answer-card-question__middle .choiceIconWrong{display:block;color:#ff5c69}.plv-mp-answer-card-question__bottom{padding:16rpx 48rpx 28rpx}.plv-mp-answer-card-question .plv-mp-answer-card-choice{position:relative;overflow:hidden;margin-top:40rpx}.plv-mp-answer-card-question .plv-mp-answer-card-choice-icon{width:32rpx;height:32rpx;position:absolute;right:32rpx;top:50%;transform:translateY(-50%)}.plv-mp-answer-card-question__bottom__btn{background-color:#3082fe;color:#ccc;font-size:32rpx;overflow:visible;height:96rpx;line-height:96rpx;border-radius:48rpx;text-align:center;border:2rpx solid #ededef;position:relative;opacity:.6}.plv-mp-answer-card-question__bottom__btn__duration{position:absolute;right:48rpx;top:0;height:100%;overflow:hidden}.plv-mp-answer-card-question__bottom__btn__duration__icon{width:32rpx;height:32rpx;opacity:.8;display:inline-block;margin:32rpx 0}.plv-mp-answer-card-question__bottom__btn__duration__time{float:right;color:#fff;opacity:.8;font-size:28rpx;height:28rpx;line-height:28rpx;margin:34rpx 0 34rpx 16rpx}.active>.plv-mp-answer-card-question__bottom__btn{background-color:#3082fe;color:#fff;opacity:1}.choiceActive{border:2rpx solid #3082fe}.plv-mp-answer-card-score{text-align:center}.plv-mp-answer-card-score__icon{width:120rpx;height:120rpx;margin-top:40rpx}.plv-mp-answer-card-score__tip{color:#333;font-size:32rpx;margin-top:40rpx}.plv-mp-answer-card-score__title{color:#666;font-size:28rpx;margin-top:40rpx}.plv-mp-answer-card-score__score{color:#333;font-size:32rpx;margin-top:16rpx;overflow:hidden}.plv-mp-answer-card-score__score__num{color:#3082fe;font-size:48rpx;display:inline-block;position:relative;font-weight:700}.score{display:inline-block;color:#fff}.plv-mp-answer-card-modal{position:absolute;width:100%;height:100%;z-index:9999;top:0}.show{display:block}.line{height:1px;background:rgba(0,0,0,.1)}.plv-mp-answer-card-question-result-tip{text-align:center;font-size:32rpx;position:relative}.plv-mp-answer-card-question-result-tip__icon{width:120rpx;height:120rpx;margin-top:166rpx}.plv-mp-answer-card-question-result-tip__tip{color:#333;margin-top:46rpx;font-size:32rpx}.plv-mp-answer-card-question-result-tip__btn{width:654rpx;height:96rpx;position:fixed;left:50%;bottom:40rpx;border-radius:48rpx;margin-left:-327rpx;background-color:#3082fe;color:#fff;line-height:96rpx}
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