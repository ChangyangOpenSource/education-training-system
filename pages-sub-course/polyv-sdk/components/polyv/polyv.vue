<template>
<uni-shadow-root class="polyv-sdk-components-polyv-polyv"><view v-if="(!isBanned)" :class="'plv-mp-watch-page '+(iPhoneX ? 'plv-mp-watch-page__x' : '')+' '+(isPPTNormal ? 'plv-mp-watch-page__ppt' : '')" :style="'width: '+(windowSize.width)+'px; height: '+(windowSize.height)+'px'">
  <view :class="'plv-mp-watch-top '+(isSwitched ? 'plv-mp-watch_switch' : '')">
    <view class="plv-mp-watch__player" :style="'z-index: '+(!isSwitched || curMenuData.menuType === MENU_TYPE.DOC ? 1001 : -1)">
      
      <player v-if="applyData.type !== 'stop'" class="plv-mp-watch-player" :videoOption="videoOption" :vodSeek="seekTime" :skin="watchThemeModel.pageSkin" :danmuText="danmuText" :menuType="curMenuData.menuType" :isSwitched="isSwitched" :allowDanmu="allowDanmu" :skinAlwaysShow="skinAlwaysShow" :usePlayerSkin="usePlayerSkin" @onLiveStatusChange="playerLiveStatusChange" @onLiveStorageProgress="playerLiveStorageProgress" @onVodProgress="playerVodProgress" @onVodEnd="playerVodEnd" @onError="playerError" @onLiveVodEnd="playerVodEnd"></player>
      
      <concat v-if="chatInit && channelDetail.status === 'Y'" class="plv-mp-concat" :channelDetail="channelDetail" :aspect="aspect" :applyData="applyData" @refreshStatus="handleRefreshStatus" @stop="handleStop" :skin="watchThemeModel.pageSkin"></concat>
    </view>
    <view :class="'plv-mp-watch__ppt '+(pptInFullScreen ? 'ppt-full-screen' : '')" :style="'z-index:'+(curMenuData.menuType === MENU_TYPE.DOC || isSwitched ? 99 : -1)">
      <view :style="'display:'+(curMenuData.menuType === MENU_TYPE.DOC || isSwitched ?'block':'none')" class="plv-ppt-content">
        <image @click="switchPlayPpt" mode="aspectFit" :style="'z-index: '+(!showSwitch || pptInFullScreen ? -1 : 101)" class="plv-mp-btn_switch" src="../../assets/images/change-position.png"></image>
        <ppt v-if="scene === 'ppt'" id="plvMpWatchPPT" :chatData="channelDetail" :videoId="videoId" :vidCurrentTime="vodPlayerProgress" :pptSize="pptSize" :pptDelayTime="pptDelayTime" :togglePaint="togglePaint" :skin="watchThemeModel.pageSkin" @pptPageChange="handlePptPageChange" @click.native="handleClickPPT" :requestUrl="requestUrl"></ppt>
        <ppt-bar v-if="scene === 'ppt'" id="plvMpWatchPPTBar" @clickFullBtn="handleClickFullBtn" @clickPrevBtn="handleClickPrevBtn" @clickNextBtn="handleClickNextBtn" @clickBackPageBtn="handleClickBackPageBtn" :showFullBtn="(!isSwitched)" :iPhoneX="iPhoneX"></ppt-bar>
      </view>
    </view>
  </view>
  <view class="plv-mp-watch-content">
    <view :class="'plv-mp-watch-content__inner plv-skin-'+(watchThemeModel.pageSkin)">
      <view :class="'plv-mp-watch-middle '+(showConcatApply ? 'plv-mp-watch-middle__concat' : '')" :style="'z-index:'+(pptInFullScreen ? 88 : 99)">
        <menu-bar v-if="menuList.length" class="plv-mp-watch-menu" :menuList="menuList" :skin="watchThemeModel.pageSkin" :activeIndex="menuIndex" :wrapWidth="windowSize.width" :hasNewQuiz="hasNewQuiz" :plvInsideUse="plvInsideUse" @changeMenu="handleChangeMenu"></menu-bar>
          <view :class="'plv-mp-concat-apply '+(applyData.type === 'apply' ? ''  : 'plv-mp-concat-apply-red')" @click="handleApply">
            <view class="plv-concat-apply__view">{{ applyData.txt }}</view>
          </view>
      </view>
      <view class="plv-mp-watch-content__menu">

        <block v-if="curMenuData.menuType === MENU_TYPE.CHAT">
          <chatroom class="plv-mp-watch-chatroom" :showBulletin="hasBulletin" :skin="watchThemeModel.pageSkin" :channelDetail="channelDetail" @onTapBulletin="handleShowBulletin"></chatroom>
        </block>

        <block v-if="curMenuData.menuType === MENU_TYPE.QUIZ">
          <quiz :skin="watchThemeModel.pageSkin"></quiz>
        </block>

        <block v-if="curMenuData.menuType === MENU_TYPE.QA && plvInsideUse">
          <new-ask :liveType="liveType" :skin="watchThemeModel.pageSkin" :iPhoneX="iPhoneX"></new-ask>
        </block>

        <block v-if="curMenuData.menuType === MENU_TYPE.DESC">
          <live-introduction :skin="watchThemeModel.pageSkin" :liveType="liveType" :channelDetail="channelDetail"></live-introduction>
        </block>

        <block v-if="curMenuData.menuType === MENU_TYPE.TEXT">
          <menu-custom :skin="watchThemeModel.pageSkin" :parseHtml="curMenuData.content"></menu-custom>
        </block>

        <block v-if="curMenuData.menuType === MENU_TYPE.CHAPTER">
          <chapter @onTapChapter="handleChangeChapter" :skin="watchThemeModel.pageSkin" :vodCurTime="vodPlayerProgress" :chapterList="chapterList"></chapter>
        </block>

        <sign-in v-if="'false'" @onSignShow="handleSignShow"></sign-in>

      
        <play-back :class="curMenuData.menuType === MENU_TYPE.PLAYBACK ? '' : 'hide'" :skin="watchThemeModel.pageSkin" :playbackList="channelDetail.playbackList" :nextVod="nextVod" :liveStatus="channelDetail.status" @onTapPlayback="handlePlayback"></play-back>
      
      </view>
      
      <view class="plv-mp-watch-chat-overtime" v-if="chatOvertime">
        <view class="plv-mp-watch-chat-overtime__title">
          <view>聊天室连接失败</view>
          <view>请尝试刷新解决</view>
          <view>如无法解决请联系管理员</view>
        </view>
      </view>
      
      <answer-card v-if="hasAnswerCard" :class="'plv-mp-watch-answer-card '+(answerShow)" :style="'z-index: '+(answerCardIndex)" :answerCardSize="answerCardSize" @onAnswerCardShow="handleShowAnswerCard"></answer-card>
     
      
      <bulletin v-if="'false'" :show="isShowBulletin" :bulletinStr="bulletin" @onClose="handleHideBulletin" :zIndex="bulletinIndex"></bulletin>

      <lottery :zIndex="lotteryIndex" v-if="plvInsideUse" @showPptPaint="showPptPaint"></lottery>
      
      <question :zIndex="questionIndex" @showPptPaint="showPptPaint"></question>
      
      <questionnaire-result :zIndex="questionnaireResultZindex" @showPptPaint="showPptPaint"></questionnaire-result>
    </view>
  </view>
</view>
<view v-else class="plv-mp-watch-page plv-mp-watch-page__banned"></view></uni-shadow-root>


</template><script>
import Player from '../player/player.vue'
import Chatroom from '../chatroom/chatroom.vue'
import LiveIntroduction from '../live-introduction/live-introduction.vue'
import MenuBar from '../menu-bar/menu-bar.vue'
import Concat from '../concat/concat.vue'
import Ppt from '../ppt/ppt.vue'
import PptBar from '../ppt-bar/ppt-bar.vue'
import Chapter from '../chapter/chapter.vue'
import Quiz from '../quiz/quiz.vue'
import MenuCustom from '../menu-custom/menu-custom.vue'
import PlayBack from '../playback/playback.vue'
import SignIn from '../sign-in/sign.vue'
import Bulletin from '../bulletin/bulletin.vue'
import AnswerCard from '../answer-card/answer-card.vue'
import Lottery from '../lottery/lottery.vue'
import Question from '../question/question.vue'
import NewAsk from '../new-ask/new-ask.vue'
import QuestionnaireResult from '../questionnaire-result/questionnaire-result.vue'
global['__wxVueOptions'] = {components:{'player': Player,'chatroom': Chatroom,'live-introduction': LiveIntroduction,'menu-bar': MenuBar,'concat': Concat,'ppt': Ppt,'ppt-bar': PptBar,'chapter': Chapter,'quiz': Quiz,'menu-custom': MenuCustom,'play-back': PlayBack,'sign-in': SignIn,'bulletin': Bulletin,'answer-card': AnswerCard,'lottery': Lottery,'question': Question,'new-ask': NewAsk,'questionnaire-result': QuestionnaireResult}}

global['__wxRoute'] = 'polyv-sdk/components/polyv/polyv'
import regeneratorRuntime from"../../common/regenerator-runtime/runtime-module";import util from"../../common/utils/utils";import EventType from"../../common/chat/eventTypes";import api from"../../common/api/index";import store from"../../store/index";const MENU_TYPE={DOC:"doc",DESC:"desc",CHAT:"chat",QUIZ:"quiz",TEXT:"text",IFRAME:"iframe",CHAPTER:"chapter",PLAYBACK:"previous",TUWEN:"tuwen",QA:"qa"},DefaultMenuName={DOC:"文档",VIDEO:"视频",CHAPTER:"课程章节",PLAYBACK:"往期"},FORCE_VIDEO_DELAY_TIME=15e3,NOMAL_DELAY_TIME=5e3,componentConfig={data:{channelDetail:null,menuList:[],wrapWidth:0,menuIndex:0,curMenuData:{},watchThemeModel:{},videoOption:{},vodPlayerProgress:0,nextVod:"",MENU_TYPE:MENU_TYPE,showConcatApply:!1,applyData:{show:!0,txt:"申请连线",type:"apply"},aspect:"3:4",seekTime:-1,iPhoneX:!1,windowSize:{},pptSize:{},chatOvertime:!1,chatInit:!1,chapterList:[],videoId:"",videoPoolId:"",pptDelayTime:5e3,isForceVideo:!1,togglePaint:!0,skinType:"",hasBulletin:!1,isShowBulletin:!1,bulletin:"当前暂无公告",isBanOrdinaryStatus:!0,isBanned:!1,pptInFullScreen:!1,showSwitch:!1,isSwitched:!1,showQuestion:!0,hasNewQuiz:!1,zIndex:2e3,questionIndex:2e3,lotteryIndex:2e3,bulletinIndex:2e3,answerCardIndex:2e3,questionnaireResultZindex:2e3,scene:"alone"},properties:{requestUrl:{type:String,value:"https://api.polyv.net/live/v3/channel/chat/"},hasAnswerCard:{type:Boolean,value:!1},allowDanmu:{type:Boolean,value:!0},skinAlwaysShow:{type:Boolean,value:!1},usePlayerSkin:{type:Boolean,value:!0}},lifetimes:{created(){this.chat=null,this.chatEvent=this.getChatEvent()},attached(){this.unsub=store.get({"main.userInfo":e=>{e&&(this.userInfo=e,this.setData({plvInsideUse:e.plvInsideUse||!1}))},"main.channelDetail":e=>{this.initDetail(e)},"main.chat":e=>{this.chat=e,this.bindEvent(this.chatEvent)},"main.pptDelayTime":e=>{const t=parseInt(e);isNaN(t)||this.setData({pptDelayTime:t})},"app.userId":e=>{this.userId=e},"main.screenType":e=>{this.setData({togglePaint:"half"===e})}}),wx.setKeepScreenOn({keepScreenOn:!0})},ready(){},detached(){this.unsub(),this.chat=null,clearInterval(this.statusTimer),this.statusTimer=null,clearInterval(this.checkPhoneTimer),this.checkPhoneTimer=null}},methods:{initDetail(e){if(!e.channelId)return;const{name:t,isPPT:a,playbackList:i=[],watchThemeModel:n,playbackOrigin:s,scene:o}=e;if(wx.setNavigationBarTitle({title:t}),this.setData({scene:o}),a||this.ordinaryStatusChange(e.stream),e.useVideo||e.forceVideo){if("stop"===this.data.applyData.type)return;this.setData({pptDelayTime:15e3,isForceVideo:!0})}if(this.likeCount=e.likes,this.watchCount=e.pageView,this.setData({watchThemeModel:n,channelDetail:e}),this.updateMenuBar(e),a&&null!==e.recordFileSimpleModel&&this.updateChapterOption(e.recordFileSimpleModel.fileId,"record"),i.length){const{videoPoolId:t,videoId:n,fileUrl:s,channelSessionId:o}=i[0];this.updateVideoOption({detail:e,vod:this.getVodInfo()}),a&&(this.updatePPTVideoId(n),this.updateChapterOption(n)),this.changeVideoId({videoPoolId:t,videoId:n})}else this.updateVideoOption({detail:e});this.handleResize(),this.initConcatData(),this.authPhoneHandle(),this.userInfo.plvInsideUse&&this.authPhoneHandle()},authPhoneHandle(){const{authSettings:e,channelId:t}=this.data.channelDetail;if(!e||0===e.length)return;const a=wx.getStorageSync("plvAuthType");e.some(e=>"phone"===e.authType)&&"phone"===a&&(this.checkPhoneTimer=setInterval(()=>{api.phoneVerify(t).then(e=>{"success"!==e.data.data&&this.handleVerifyFaild()}).catch(()=>{this.handleVerifyFaild()})},15e3))},handleVerifyFaild(){wx.removeStorage("cookieKey"),wx.showToast({title:"账号在异地登录，您将被退出观看",icon:"none",duration:2e3}),setTimeout(()=>{wx.switchTab({url:"/pages/home/home"})},2e3)},initConcatData(){const e=this.data.channelDetail;if(e&&"Y"===e.status){let t="3:4";e.resolutionHeight/e.resolutionWidth==.5625&&(t="9:16"),this.setData({aspect:t})}},bindEvent(e){const t=this.chat;t&&Object.keys(e).forEach(a=>{t.on(a,e[a].bind(this))})},getChatEvent(){const e=this;return{[EventType.SLICESTART](t,a){const i=e.data.channelDetail;e.setData({"channelDetail.status":"Y",menuIndex:0},()=>{e.switchToLive({forceData:{mode:"live",uid:i.userId,cid:i.channelId,forceVideo:e.data.isForceVideo,muted:i.muted||!1}})})},[EventType.SLICEID](e,t){"Y"===this.data.channelDetail.status&&this.switchPlayPpt(t.data.pptAndVedioPosition)},[EventType.SLICECONTROL](e,t){},[EventType.CONNECT](){e.setData({chatInit:!0,chatOvertime:!1})},[EventType.BAN_USER_ROOM](){e.setData({isBanned:!0}),e.triggerEvent("userBanned")},[EventType.OVERTIMECONNECT](){e.setData({chatOvertime:!0,chatInit:!1})},[EventType.RECONNECT_ATTEMPT](){e.setData({chatOvertime:!0,chatInit:!1})},[EventType.BULLETIN](t,a){const i=e.data.zIndex+1;e.dealShowBulletin({hasBulletin:!0,isShowBulletin:!0,bulletin:a.content,zIndex:i,bulletinIndex:i})},[EventType.REMOVE_BULLETIN](){e.dealShowBulletin({hasBulletin:!1,isShowBulletin:!1,bulletin:"当前暂无公告"})},[EventType.LOGIN](){e.watchCount+=1,setTimeout(()=>{e.setData({"channelDetail.pageView":e.watchCount})},700)},[EventType.LIKES](t,a){e.likeCount+=a.count,setTimeout(()=>{e.setData({"channelDetail.likes":e.likeCount})},500)},[EventType.SPEAK](e,t){this.setData({danmuText:t.content})},[EventType.SEND_MESSAGE](e,t){this.setData({danmuText:t.content})},[EventType.START_QUESTIONNAIRE](){const t=e.data.zIndex+1;e.setData({zIndex:t,questionIndex:t,togglePaint:!1})},[EventType.LOTTERY_START](){const t=e.data.zIndex+1;e.setData({zIndex:t,lotteryIndex:t,togglePaint:!1})},[EventType.ON_LOTTERY](){const t=e.data.zIndex+1;e.setData({zIndex:t,lotteryIndex:t,togglePaint:!1})},[EventType.LOTTERY_END](){const t=e.data.zIndex+1;e.setData({zIndex:t,lotteryIndex:t,togglePaint:!1})},[EventType.GET_TEST_QUESTION_CONTENT](){const t=e.data.zIndex+1;e.setData({zIndex:t,answerCardIndex:t,togglePaint:!1})},[EventType.GET_TEST_QUESTION_RESULT](){const t=e.data.zIndex+1;e.setData({zIndex:t,answerCardIndex:t,togglePaint:!1})},[EventType.QUESTIONNAIRE_ACHIEVEMENT](){const t=e.data.zIndex+1;e.setData({zIndex:t,questionnaireResultZindex:t,togglePaint:!1})},[EventType.CHANGE_VIDEO_AND_PPT_POSITION](e,t){this.switchPlayPpt(t.status)},[EventType.LAUNCH_A](){e.setData({hasNewQuiz:!0})},[EventType.ALLOW_MICROPHONE](e,t){api.agoraRelation({channelId:this.data.channelDetail.channelId,viewerId:this.chat.userId,uid:t.micId,timestamp:Date.now()})}}},dealShowBulletin(e){this.setData({...e,togglePaint:this.dealTogglePaint("bulletin",!e.isShowBulletin)})},dealTogglePaint(e,t){const{answerShow:a,isShowBulletin:i}=this.data;return"bulletin"===e?!a&&t:"answerCard"===e?!i&&t:void 0},updateChapterOption(e,t="playback"){const a={id:e,type:t};this.getChapterList(a)},changeVideoId(e){this.setData(e)},getChapterList(e){const{channelId:t}=this.data.channelDetail,a={...e,channelId:t};api.getChapterRecords(a).then(e=>{200===e.data.code&&this.setData({chapterList:e.data.data})})},updateMenuBar(e){const t=[...e.channelMenus];t.sort(util.comparison("ordered")),t[0]&&t[0].menuType===MENU_TYPE.TUWEN&&t.splice(0,1);const{scene:a,status:i,playbackEnabled:n,hasPlayback:s,recordFileSimpleModel:o,sectionEnabled:d}=e,l="Y"===i,h="ppt"===a;if(h&&(s||o||l)){const e={menuType:MENU_TYPE.DOC,name:DefaultMenuName.DOC};t.unshift(e)}if(l){let e=-1;t.some((t,a)=>t.menuType===MENU_TYPE.PLAYBACK&&(e=a,!0)),e>=0&&t.splice(e,1)}else{h&&"Y"===n&&(s||o)&&"Y"===d&&t.push({menuType:MENU_TYPE.CHAPTER,name:DefaultMenuName.CHAPTER})}const{menuType:r}=this.data.curMenuData,c=l&&(r===MENU_TYPE.CHAPTER||r===MENU_TYPE.PLAYBACK)?0:this.data.menuIndex,p=this.data.plvInsideUse?["tuwen","iframe"]:["tuwen","iframe","qa"];this.setData({menuList:t.filter(e=>-1===p.findIndex(t=>t===e.menuType)),menuIndex:c,curMenuData:t[c]||{}})},handleChangeMenu(e){const t=e.detail.activeIndex,{menuList:a}=this.data,i=a.length;if(t<0||i<=0||t>i-1)return;const n=a[t];n&&("quiz"===n.menuType&&this.setData({hasNewQuiz:!1}),this.setData({menuIndex:t,curMenuData:n}))},handleApply(){this.selectComponent(".plv-mp-concat").apply()},handleRefreshStatus(e){this.setData({showConcatApply:e.detail.show,applyData:e.detail});let t=this.data.isForceVideo?15e3:5e3;"stop"===e.detail.type&&(t=0),this.setData({pptDelayTime:t})},playerError(e){const t=e.detail;this.triggerEvent("onError",t)},playerVodProgress(e){const{currentTime:t}=e.detail;this.setData({vodPlayerProgress:t})},playerVodEnd(e){console.log("playerVodEnd",e),this.setData({nextVod:e.detail.curVodVid})},playerLiveStorageProgress(e){const{currentTime:t}=e.detail;this.setData({vodPlayerProgress:t})},playerLiveStatusChange(e){const{status:t}=e.detail;this.handleVideoStatus(t),this.setData({liveType:t})},ordinaryStatusChange(e){this.statusTimer=setInterval(()=>{this.data.isBanOrdinaryStatus||api.getOrdinaryLiveStatus(e).then(e=>{this.handleVideoStatus(e.data.trim())})},1e4)},handleVideoStatus(e){const{channelDetail:t}=this.data;(e="end"===e?"N":"Y")!=t.status&&(this.setData({"channelDetail.status":e},()=>{"Y"!==e?this.updateVideoOption({detail:t,vod:this.getVodInfo()}):this.switchToLive({detail:t})}),this.updateMenuBar(t))},switchToLive(e){const{channelDetail:t}=this.data;api.getLatestSessionId({channelId:t.channelId}).then(a=>{this.changeSessionId(a.data),this.updateVideoOption(e),this.updateMenuBar(t)})},updateVideoOption({detail:e,vod:t,forceData:a}){let i={};if(a)return i=a,void this.setVideoOption(i);const n="Y"===e.status,s="Y"===e.playbackEnabled&&e.hasPlayback,o={mode:"live",uid:e.userId,cid:e.channelId,forceVideo:this.data.isForceVideo,muted:e.muted||!1};if(!n)return s&&t?("vod"===e.playbackOrigin&&(i={mode:"vod",vodVid:t}),"playback"===e.playbackOrigin&&(i={...o,liveMode:2,vodsrc:t})):e.recordFileSimpleModel?(i={...o,liveMode:2,vodsrc:e.recordFileSimpleModel.mp4||e.recordFileSimpleModel.m3u8},this.changeSessionId(e.recordFileSimpleModel.channelSessionId)):i={...o},void this.setVideoOption(i);i={...o},this.setVideoOption(i)},setVideoOption(e){const{sessionId:t,globalInterval:a}=this.data.channelDetail;e.globalInterval=a,e.statistics={param1:this.userInfo.viewerId||this.userInfo.userId||this.userId||this.userInfo.openId,param2:this.userInfo.userName,param4:this.userInfo.param4||"",param5:this.userInfo.param5||"",session_id:t},this.setData({videoOption:e}),this.data.isBanOrdinaryStatus="live"===e.mode},changeSessionId(e){this.data.channelDetail.sessionId=e},getVodInfo(){const{playbackList:e=[],playbackOrigin:t,status:a}=this.data.channelDetail;if(!e.length||"N"!==a)return"";const{videoPoolId:i,fileUrl:n,channelSessionId:s}=e[0];return this.changeSessionId(s),"vod"===t?i:n},handleStop(e){e.detail||this.selectComponent(".plv-mp-concat").stop()},handleShowAnswerCard(e){const{isShow:t}=e.detail;this.setData({answerShow:t?"show":"",togglePaint:!t})},showPptPaint(){this.setData({togglePaint:!0})},updatePPTVideoId(e){this.setData({videoId:e})},handleResize(){wx.getSystemInfo({success:({model:e,windowHeight:t,windowWidth:a})=>{if(!this.data.channelDetail)return;const{isPPT:i,resolutionHeight:n,resolutionWidth:s}=this.data.channelDetail;if(i){this.selectComponent("#plvMpWatchPPTBar").happenResize({windowHeight:t,windowWidth:a})}const o=n/s,d=i?o||.75:9/16,l=a*d;let h=this.data.isSwitched?.5625*a:t-l-37;this.data.pptInFullScreen&&(h=t);const r=t-a*d;this.setData({iPhoneX:util.isPhoneX(e),windowSize:{height:t,width:a},pptSize:{width:750,height:750*h/a},answerCardSize:{width:750,height:750*r/a},isPPTNormal:i&&.75===o})}})},handleSignShow(e){this.setData({togglePaint:!e.detail})},handlePlayback(e){const{videoPoolId:t,videoId:a,fileUrl:i,channelSessionId:n,muted:s=!1}=e.detail,{isPPT:o,playbackOrigin:d,userId:l,channelId:h}=this.data.channelDetail;o&&this.updateChapterOption(a),this.changeVideoId({videoPoolId:t,videoId:a}),this.changeSessionId(n);const r="playback"===d?{mode:"live",liveMode:2,uid:l,cid:h,vodsrc:i,forceVideo:this.data.isForceVideo,muted:s}:{mode:"vod",vodVid:t};this.updateVideoOption({forceData:r})},handleChangeChapter(e){this.setData({seekTime:e.detail.chapter.timeStamp})},handleShowBulletin(){this.dealShowBulletin({isShowBulletin:!0})},handleHideBulletin(){this.dealShowBulletin({isShowBulletin:!1})},handleClickFullBtn(e){this.setData({pptInFullScreen:e.detail}),this.handleResize()},handleClickPrevBtn(){this.selectComponent("#plvMpWatchPPT").handleTapPreBtn()},handleClickNextBtn(){this.selectComponent("#plvMpWatchPPT").handleTapNextBtn()},handleClickBackPageBtn(){this.selectComponent("#plvMpWatchPPT").toCurrentTeacherOp()},handlePptPageChange(e){this.selectComponent("#plvMpWatchPPTBar").pptPageChange(e.detail)},handleClickPPT(){this.selectComponent("#plvMpWatchPPTBar").toggleBar(),this.data.pptInFullScreen||(this.setData({showSwitch:!0}),clearTimeout(this.handleClickPPT.timeout),this.handleClickPPT.timeout=setTimeout(()=>{this.setData({showSwitch:!1})},1500))},switchPlayPpt(e){if("number"===typeof e){const{isSwitched:t}=this.data;if(1===e&&t||0===e&&!t)return;this.setData({isSwitched:1===e})}else this.setData({isSwitched:!this.data.isSwitched});this.handleResize()}}};Component(componentConfig);
export default global['__wxComponents']['polyv-sdk/components/polyv/polyv']
</script>
<style platform="mp-weixin">
.plv-mp-watch-page{color:#fff;height:100%;display:flex;flex-direction:column;overflow:hidden;position:relative}.plv-mp-watch-page__banned{background:#ccc}.plv-mp-watch-top{position:absolute;width:100%;height:100%;overflow:hidden}.plv-mp-watch-top .plv-mp-watch__player{position:absolute;padding-top:56.25%;height:0;width:100%;z-index:100}.plv-mp-watch-top .plv-mp-watch__player .plv-mp-watch-player{position:absolute;width:100%;height:100%;top:0;left:0}.plv-mp-watch-top .plv-mp-watch__ppt{position:absolute;padding-top:56.25%;margin-top:74rpx;height:100%;width:100%;z-index:99;overflow:hidden}.plv-mp-watch-top .plv-ppt-content{position:absolute;width:100%}.plv-mp-btn_switch{position:absolute;width:44px;height:44px;top:10px;right:10px;z-index:101}.plv-mp-watch_switch .plv-mp-watch__player{top:50%}.plv-mp-watch_switch .plv-mp-watch__ppt{top:0;height:0;margin-top:0}.plv-mp-watch_switch .plv-mp-watch__ppt .plv-ppt-content{top:0}.plv-mp-watch-middle{position:absolute;top:0;left:0;right:0;z-index:999;box-shadow:0 10rpx 20rpx 4rpx rgba(85,85,85,.15)}.plv-mp-watch-middle__concat{padding-right:124rpx}.plv-mp-watch-middle__concat .plv-mp-concat-apply{display:block}.plv-mp-watch-menu{width:100%}.plv-mp-concat-apply{display:none;position:absolute;top:0;right:0;width:124rpx;background-color:green;color:#fff;font-size:26rpx;line-height:31px;height:100%;text-align:center;z-index:1001;overflow:hidden}.plv-mp-concat-apply-red{background-color:red}.plv-mp-concat-apply-show{display:block}.plv-mp-concat-apply>.plv-concat-apply__view{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:100%;overflow:hidden;font-size:26rpx}.plv-mp-concat-show{height:100%}.plv-mp-watch-content{padding-top:56.25%;height:100%;box-sizing:border-box;position:relative}.plv-mp-watch-page__ppt .plv-mp-watch-top{padding-bottom:75%}.plv-mp-watch-page__ppt .plv-mp-watch-content,.plv-mp-watch-page__ppt .plv-mp-watch-top .plv-mp-watch__player,.plv-mp-watch-page__ppt .plv-mp-watch-top .plv-mp-watch__ppt{padding-top:75%}.plv-mp-watch-page__x .plv-mp-watch-content__inner{padding-bottom:68rpx;box-sizing:border-box}.plv-mp-watch-content__inner{position:relative;height:100%}.plv-mp-watch-content__menu{height:100%;padding-top:74rpx;box-sizing:border-box;overflow:auto}.hide{display:none}.plv-mp-watch-chat-overtime{position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.3);z-index:9999;display:flex;justify-content:center;align-items:center}.plv-mp-watch-chat-overtime__title{width:680rpx;background:#000;color:#fff;font-size:24rpx;text-align:center;line-height:38rpx;padding:40rpx 0}.plv-mp-watch-answer-card{position:absolute;display:none;width:100%;height:100%;left:0;top:0;z-index:1000}.show{display:block}.plv-skin-white{background:#fff}.plv-mp-watch-top .ppt-full-screen{position:fixed;top:0;left:0;z-index:2000!important;height:100%;width:100%;padding-top:0;margin-top:0}.plv-mp-watch-top .ppt-full-screen .plv-ppt-content{height:100%}
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