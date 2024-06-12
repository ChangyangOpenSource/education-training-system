import Event from"../../common/chat/eventTypes";import store from"../../store/index";Component({data:{disabled:!1,message:"各位同学签到成功了",buttonMsg:"签到",limitTime:0,showSign:!1,signTimer:null,success:!1,checkinId:null},lifetimes:{created(){this.chatEvent=this.getChatEvent(),this.chat=null,this.signTimes=3},attached(){this.unsub=store.get({"main.chat":t=>{this.chat=t,t&&this.bindEvent(this.chatEvent)}})},detached(){if(this.unsub(),clearInterval(this.signTimer),!this.chat)return;const t=this.chatEvent;Object.keys(t).forEach(i=>{this.chat.off(i,t[i])}),this.chat=null}},methods:{bindEvent(t){const i=this.chat;i&&Object.keys(t).forEach(s=>{i.on(s,t[s])})},startCountDown(t){const i=(new Date).getTime();this.signTimer=setInterval(()=>{const s=(new Date).getTime()-i,e=t-parseInt(s/1e3,10);this.setData({limitTime:e}),e<1&&this.stopSign()},500)},hideSign(){clearInterval(this.signTimer),this.setData({showSign:!1})},stopSign(t="签到已截止"){clearInterval(this.signTimer),this.setData({buttonMsg:t,disabled:!0}),setTimeout(()=>{this.setData({showSign:!1}),this.triggerEvent("onSignShow",!1)},3e3)},clearSignTimeoutClock(){this.signTimeout&&clearTimeout(this.signTimeout)},toSignin(){this.clearSignTimeoutClock(),this.hideSign(),this.chat.toSign(this.data.checkinId,t=>{let i;this.clearSignTimeoutClock();try{i=JSON.parse(t).code}catch(t){i=400}this.signTips(i)}),this.signTimeout=setTimeout(()=>{this.signTimes-=1,this.signTimes<0?(this.signTips(400),this.clearSignTimeoutClock()):this.toSignin()},5e3)},signTips(t){const i={301:"请登录后再签到",302:"签到已结束",303:"已签到",400:"签到失败",200:"签到成功"}[t]||"签到失败";this.stopSign(i),this.setData({success:200===t,showModal:!0,modalData:{imgSrc:`../../assets/images/${200===t?"interact-submit-success.png":"interact-cut-off.png"}`,modalText:i}}),this.selectComponent("#answerModal").show()},onModalHide(){this.setData({showModal:!1})},getChatEvent(){const t=this;return{[Event.SIGN_IN](i,s){const{limitTime:e,message:n,checkinId:a}=s.data;t.signTimes=3,t.setData({showSign:!0,limitTime:e,message:n,checkinId:a,buttonMsg:"签到",disabled:!1,success:!1}),t.clearSignTimeoutClock(),t.startCountDown(e),t.triggerEvent("onSignShow",!0)},[Event.STOP_SIGN_IN](i,s){t.data.showSign&&(t.clearSignTimeoutClock(),t.stopSign())}}}}});