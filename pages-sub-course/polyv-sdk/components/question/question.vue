<template>
<uni-shadow-root class="polyv-sdk-components-question-question"><view :style="'z-index: '+(zIndex)" :class="'plv-mp-question-wrap '+(showQuestion ? 'show' : '')" v-if="showQuestion">
  
  <view class="plv-mp-question-panel-title">
    <text>{{ popupTitle }}</text>
    <image class="plv-mp-question-panel-title__close" src="../../assets/images/interact-btn-close.png" @click="closeQuestion"></image>
  </view>
  
  <scroll-view scroll-y class="plv-mp-question-content">
    <view class="plv-mp-question-content_container">
      
      <view class="plv-mp-question-title">{{ questionTitle }}</view>
      <block v-for="(subjectItem,subjectIndex) in (subjectList)" :key="subjectItem.subjectIndex">
        <view class="plv-mp-question-subject">
          
          <view class="plv-mp-question-subject-title">
            
            <text class="plv-mp-question-subject-title_text">【{{ subjectIndex + 1 }}】{{ subjectItem.subjectTitle }}</text>
            
            <text class="plv-mp-question-subject-title_require" v-if="subjectItem.required">*</text>
            
            <text class="plv-mp-question-subject-title_type" v-if="subjectItem.typeText">{{ subjectItem.typeText }}</text>
            
            <text class="plv-mp-question-subject-title_score" v-if="subjectItem.scoreEnabled">({{ subjectItem.score }}分)</text>
          </view>
          
          <block v-if="subjectItem.type === 'R'">
            <view v-for="(optionItem,optionIndex) in (subjectItem.subjectOptions)" :key="optionItem.optionIndex" :class="'plv-mp-question-subject-option '+(optionItem.isSelect ? 'selected' : '')" :data-subject-index="subjectIndex" :data-option-index="optionIndex" @click="selectRadio">
              <text class="plv-mp-question-subject-option_label">{{ optionItem.option }}，</text>
              <text class="plv-mp-question-subject-option_text">{{ optionItem.text }}</text>
            </view>
          </block>
          
          <block v-if="subjectItem.type === 'C'">
            <view v-for="(optionItem,optionIndex) in (subjectItem.subjectOptions)" :key="optionItem.optionIndex" :class="'plv-mp-question-subject-option '+(optionItem.isSelect ? 'selected' : '')" :data-subject-index="subjectIndex" :data-option-index="optionIndex" @click="selectCheckbox">
              <text class="plv-mp-question-subject-option_label">{{ optionItem.option }}，</text>
              <text class="plv-mp-question-subject-option_text">{{ optionItem.text }}</text>
            </view>
          </block>
          
          <block v-if="subjectItem.type === 'Q'">
            <textarea class="plv-mp-question-subject-textarea" :value="subjectItem.answerText" :data-subject-index="subjectIndex" @input="inputAnswerText"></textarea>
          </block>
        </view>
      </block>
    </view>
  </scroll-view>
  
  <view class="plv-mp-question-bottom">
    <view class="plv-mp-question-bottom_submit_btn" @click="submitQuestion">{{ submitTitle }}</view>
  </view>
</view>

<modal id="answerModal" v-if="showModal" class="plv-mp-question-modal" :modalData="modalData" @onModalHide="onModalHide">
</modal></uni-shadow-root>


</template><script>
import Modal from '../modal/modal.vue'
global['__wxVueOptions'] = {components:{'modal': Modal}}

global['__wxRoute'] = 'polyv-sdk/components/question/question'
import store from"../../store/index";import Event from"../../common/chat/eventTypes";import Question from"../../common/question/index";import LANGUAGE from"../../common/question/Language";import regeneratorRuntime from"../../common/regenerator-runtime/runtime-module";Component({data:{popupTitle:LANGUAGE.TITLE,submitTitle:LANGUAGE.SUBMIT_BTN,submitSuccess:LANGUAGE.SUBMIT_SUCCESS,cutOff:LANGUAGE.CUT_OFF,showQuestion:!1,questionTitle:"",subjectList:[],showModal:!1,modalData:{imgSrc:"",modalText:""}},properties:{zIndex:{type:Number,default:2e3}},lifetimes:{created(){this.chatEvent=this.getChatEvent(),this.chat=null,this.questionnaireRetryTime=3},attached(){this.unsub=store.get({"main.chat":t=>{this.chat=t,t&&this.bindEvent(this.chatEvent)}})}},methods:{getChatEvent(){const t=this;return{[Event.START_QUESTIONNAIRE](e,s){t.clearTimeoutClock();const i=Question.parseQuestin(s.content);t.setData({questionnaireId:i.questionnaireId,questionTitle:i.questionTitle,subjectList:i.subjectList,showQuestion:!0})},[Event.STOP_QUESTIONNAIRE](e,s){t.clearTimeoutClock(),t.data.showQuestion&&(t.setData({showQuestion:!1,modalData:{imgSrc:"../../assets/images/interact-cut-off.png",modalText:t.data.cutOff},showModal:!0}),t.selectComponent("#answerModal").show())}}},bindEvent(t){const e=this.chat;e&&Object.keys(t).forEach(s=>{e.on(s,t[s])})},closeQuestion(){this.setData({showQuestion:!1}),this.triggerEvent("showPptPaint")},selectRadio(t){const{subjectIndex:e,optionIndex:s}=t.currentTarget.dataset,i=this.data.subjectList,n=i[e].subjectOptions.map(t=>({...t,isSelect:!1}));n[s].isSelect=!0,i[e].subjectOptions=n,this.setData({subjectList:i})},selectCheckbox(t){const{subjectIndex:e,optionIndex:s}=t.currentTarget.dataset,i=this.data.subjectList,n=i[e].subjectOptions;n[s].isSelect=!n[s].isSelect,this.setData({subjectList:i})},inputAnswerText(t){const{subjectIndex:e}=t.currentTarget.dataset,{value:s}=t.detail,i=this.data.subjectList;i[e].answerText=s,this.setData({subjectList:i})},submitQuestion(){const t=Question.buildAnswerData(this.data.subjectList);"string"!=typeof t?(this.questionnaireRetryTime=3,this.clearTimeoutClock(),this.setData({showQuestion:!1}),this.submitQuestionHandle(t)):wx.showToast({title:t,icon:"none"})},submitQuestionHandle(t){this.chat.sendQuestionAnswer(t,this.data.questionnaireId,t=>{let e;this.clearTimeoutClock();try{e=JSON.parse(t).code}catch(t){e=400}this.questionnaireSubmitHandle(e)}),this.questionnaireOvertime=setTimeout(()=>{this.questionnaireRetryTime-=1,this.questionnaireRetryTime<0?this.questionnaireSubmitHandle(400):this.submitQuestionHandle(t)},5e3)},onModalHide(){this.setData({showModal:!1})},clearTimeoutClock(){this.questionnaireOvertime&&clearTimeout(this.questionnaireOvertime)},questionnaireSubmitHandle(t){const e={301:LANGUAGE.END,302:LANGUAGE.SUBMITED,200:LANGUAGE.SUBMIT_SUCCESS,400:LANGUAGE.SUBMIT_FAILED}[t]||LANGUAGE.SUBMIT_FAILED;this.setData({showModal:!0,modalData:{imgSrc:`../../assets/images/${200===t?"interact-submit-success.png":"interact-cut-off.png"}`,modalText:e}}),this.selectComponent("#answerModal").show(),this.triggerEvent("showPptPaint")}}});
export default global['__wxComponents']['polyv-sdk/components/question/question']
</script>
<style platform="mp-weixin">
.plv-mp-question-wrap{height:100%;border-radius:8px 8px 0 0;background:#fff;color:#333;font-size:32rpx}.plv-mp-question-wrap.show{position:absolute;top:0;left:0;right:0;bottom:0;z-index:2000}.plv-mp-question-panel-title{height:98rpx;border-bottom:1px solid #ededef;font-size:32rpx;display:flex;justify-content:center;align-items:center;position:relative;box-sizing:border-box}.plv-mp-question-panel-title__close{position:absolute;width:46rpx;height:46rpx;right:32rpx;top:50%;transform:translateY(-50%)}.plv-mp-question-content{position:absolute;width:100%;top:98rpx;left:0;bottom:176rpx}.plv-mp-question-content_container{padding:40rpx 48rpx}.plv-mp-question-title{font-weight:600;font-size:32rpx;text-align:center;margin-bottom:40rpx}.plv-mp-question-subject,.plv-mp-question-subject-title{margin-bottom:40rpx}.plv-mp-question-subject-title_require{color:#ff5722}.plv-mp-question-subject-title_type{color:#666}.plv-mp-question-subject-title_score{color:#3082fe}.plv-mp-question-subject-option{height:80rpx;border-radius:40rpx;border:1px solid #cfd8dc;padding:0 32rpx;display:flex;align-items:center;margin-bottom:24rpx;line-height:60rpx}.plv-mp-question-subject-option.selected{border-color:#3082fe;color:#3082fe}.plv-mp-question-subject-option:last-of-type{margin-bottom:0}.plv-mp-question-subject-textarea{height:160rpx;border-radius:8rpx;font-size:32rpx;width:100%;display:block;border:1px solid #cfd8dc;box-sizing:border-box;padding:20rpx 30rpx}.plv-mp-question-bottom{position:absolute;width:100%;height:176rpx;left:0;bottom:0;display:flex;justify-content:center;align-items:center}.plv-mp-question-bottom_submit_btn{height:96rpx;width:654rpx;border-radius:50rpx;background:#3082fe;color:#fff;font-size:32rpx;display:flex;justify-content:center;align-items:center}.plv-mp-question-modal{position:absolute;top:0;left:0;width:100%;height:100%;z-index:1000}
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