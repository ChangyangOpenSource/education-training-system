import regeneratorRuntime from"../../common/regenerator-runtime/runtime-module";import util from"../../common/utils/utils";import EventType from"../../common/chat/eventTypes";import api from"../../common/api/index";import store from"../../store/index";const MENU_TYPE={DOC:"doc",DESC:"desc",CHAT:"chat",QUIZ:"quiz",TEXT:"text",IFRAME:"iframe",CHAPTER:"chapter",PLAYBACK:"previous",TUWEN:"tuwen",QA:"qa"},DefaultMenuName={DOC:"文档",VIDEO:"视频",CHAPTER:"课程章节",PLAYBACK:"往期"},FORCE_VIDEO_DELAY_TIME=15e3,NOMAL_DELAY_TIME=5e3,componentConfig={data:{channelDetail:null,menuList:[],wrapWidth:0,menuIndex:0,curMenuData:{},watchThemeModel:{},videoOption:{},vodPlayerProgress:0,nextVod:"",MENU_TYPE:MENU_TYPE,showConcatApply:!1,applyData:{show:!0,txt:"申请连线",type:"apply"},aspect:"3:4",seekTime:-1,iPhoneX:!1,windowSize:{},pptSize:{},chatOvertime:!1,chatInit:!1,chapterList:[],videoId:"",videoPoolId:"",pptDelayTime:5e3,isForceVideo:!1,togglePaint:!0,skinType:"",hasBulletin:!1,isShowBulletin:!1,bulletin:"当前暂无公告",isBanOrdinaryStatus:!0,isBanned:!1,pptInFullScreen:!1,showSwitch:!1,isSwitched:!1,showQuestion:!0,hasNewQuiz:!1,zIndex:2e3,questionIndex:2e3,lotteryIndex:2e3,bulletinIndex:2e3,answerCardIndex:2e3,questionnaireResultZindex:2e3,scene:"alone"},properties:{requestUrl:{type:String,value:"https://api.polyv.net/live/v3/channel/chat/"},hasAnswerCard:{type:Boolean,value:!1},allowDanmu:{type:Boolean,value:!0},skinAlwaysShow:{type:Boolean,value:!1},usePlayerSkin:{type:Boolean,value:!0}},lifetimes:{created(){this.chat=null,this.chatEvent=this.getChatEvent()},attached(){this.unsub=store.get({"main.userInfo":e=>{e&&(this.userInfo=e,this.setData({plvInsideUse:e.plvInsideUse||!1}))},"main.channelDetail":e=>{this.initDetail(e)},"main.chat":e=>{this.chat=e,this.bindEvent(this.chatEvent)},"main.pptDelayTime":e=>{const t=parseInt(e);isNaN(t)||this.setData({pptDelayTime:t})},"app.userId":e=>{this.userId=e},"main.screenType":e=>{this.setData({togglePaint:"half"===e})}}),wx.setKeepScreenOn({keepScreenOn:!0})},ready(){},detached(){this.unsub(),this.chat=null,clearInterval(this.statusTimer),this.statusTimer=null,clearInterval(this.checkPhoneTimer),this.checkPhoneTimer=null}},methods:{initDetail(e){if(!e.channelId)return;const{name:t,isPPT:a,playbackList:i=[],watchThemeModel:n,playbackOrigin:s,scene:o}=e;if(wx.setNavigationBarTitle({title:t}),this.setData({scene:o}),a||this.ordinaryStatusChange(e.stream),e.useVideo||e.forceVideo){if("stop"===this.data.applyData.type)return;this.setData({pptDelayTime:15e3,isForceVideo:!0})}if(this.likeCount=e.likes,this.watchCount=e.pageView,this.setData({watchThemeModel:n,channelDetail:e}),this.updateMenuBar(e),a&&null!==e.recordFileSimpleModel&&this.updateChapterOption(e.recordFileSimpleModel.fileId,"record"),i.length){const{videoPoolId:t,videoId:n,fileUrl:s,channelSessionId:o}=i[0];this.updateVideoOption({detail:e,vod:this.getVodInfo()}),a&&(this.updatePPTVideoId(n),this.updateChapterOption(n)),this.changeVideoId({videoPoolId:t,videoId:n})}else this.updateVideoOption({detail:e});this.handleResize(),this.initConcatData(),this.authPhoneHandle(),this.userInfo.plvInsideUse&&this.authPhoneHandle()},authPhoneHandle(){const{authSettings:e,channelId:t}=this.data.channelDetail;if(!e||0===e.length)return;const a=wx.getStorageSync("plvAuthType");e.some(e=>"phone"===e.authType)&&"phone"===a&&(this.checkPhoneTimer=setInterval(()=>{api.phoneVerify(t).then(e=>{"success"!==e.data.data&&this.handleVerifyFaild()}).catch(()=>{this.handleVerifyFaild()})},15e3))},handleVerifyFaild(){wx.removeStorage("cookieKey"),wx.showToast({title:"账号在异地登录，您将被退出观看",icon:"none",duration:2e3}),setTimeout(()=>{wx.switchTab({url:"/pages/home/home"})},2e3)},initConcatData(){const e=this.data.channelDetail;if(e&&"Y"===e.status){let t="3:4";e.resolutionHeight/e.resolutionWidth==.5625&&(t="9:16"),this.setData({aspect:t})}},bindEvent(e){const t=this.chat;t&&Object.keys(e).forEach(a=>{t.on(a,e[a].bind(this))})},getChatEvent(){const e=this;return{[EventType.SLICESTART](t,a){const i=e.data.channelDetail;e.setData({"channelDetail.status":"Y",menuIndex:0},()=>{e.switchToLive({forceData:{mode:"live",uid:i.userId,cid:i.channelId,forceVideo:e.data.isForceVideo,muted:i.muted||!1}})})},[EventType.SLICEID](e,t){"Y"===this.data.channelDetail.status&&this.switchPlayPpt(t.data.pptAndVedioPosition)},[EventType.SLICECONTROL](e,t){},[EventType.CONNECT](){e.setData({chatInit:!0,chatOvertime:!1})},[EventType.BAN_USER_ROOM](){e.setData({isBanned:!0}),e.triggerEvent("userBanned")},[EventType.OVERTIMECONNECT](){e.setData({chatOvertime:!0,chatInit:!1})},[EventType.RECONNECT_ATTEMPT](){e.setData({chatOvertime:!0,chatInit:!1})},[EventType.BULLETIN](t,a){const i=e.data.zIndex+1;e.dealShowBulletin({hasBulletin:!0,isShowBulletin:!0,bulletin:a.content,zIndex:i,bulletinIndex:i})},[EventType.REMOVE_BULLETIN](){e.dealShowBulletin({hasBulletin:!1,isShowBulletin:!1,bulletin:"当前暂无公告"})},[EventType.LOGIN](){e.watchCount+=1,setTimeout(()=>{e.setData({"channelDetail.pageView":e.watchCount})},700)},[EventType.LIKES](t,a){e.likeCount+=a.count,setTimeout(()=>{e.setData({"channelDetail.likes":e.likeCount})},500)},[EventType.SPEAK](e,t){this.setData({danmuText:t.content})},[EventType.SEND_MESSAGE](e,t){this.setData({danmuText:t.content})},[EventType.START_QUESTIONNAIRE](){const t=e.data.zIndex+1;e.setData({zIndex:t,questionIndex:t,togglePaint:!1})},[EventType.LOTTERY_START](){const t=e.data.zIndex+1;e.setData({zIndex:t,lotteryIndex:t,togglePaint:!1})},[EventType.ON_LOTTERY](){const t=e.data.zIndex+1;e.setData({zIndex:t,lotteryIndex:t,togglePaint:!1})},[EventType.LOTTERY_END](){const t=e.data.zIndex+1;e.setData({zIndex:t,lotteryIndex:t,togglePaint:!1})},[EventType.GET_TEST_QUESTION_CONTENT](){const t=e.data.zIndex+1;e.setData({zIndex:t,answerCardIndex:t,togglePaint:!1})},[EventType.GET_TEST_QUESTION_RESULT](){const t=e.data.zIndex+1;e.setData({zIndex:t,answerCardIndex:t,togglePaint:!1})},[EventType.QUESTIONNAIRE_ACHIEVEMENT](){const t=e.data.zIndex+1;e.setData({zIndex:t,questionnaireResultZindex:t,togglePaint:!1})},[EventType.CHANGE_VIDEO_AND_PPT_POSITION](e,t){this.switchPlayPpt(t.status)},[EventType.LAUNCH_A](){e.setData({hasNewQuiz:!0})},[EventType.ALLOW_MICROPHONE](e,t){api.agoraRelation({channelId:this.data.channelDetail.channelId,viewerId:this.chat.userId,uid:t.micId,timestamp:Date.now()})}}},dealShowBulletin(e){this.setData({...e,togglePaint:this.dealTogglePaint("bulletin",!e.isShowBulletin)})},dealTogglePaint(e,t){const{answerShow:a,isShowBulletin:i}=this.data;return"bulletin"===e?!a&&t:"answerCard"===e?!i&&t:void 0},updateChapterOption(e,t="playback"){const a={id:e,type:t};this.getChapterList(a)},changeVideoId(e){this.setData(e)},getChapterList(e){const{channelId:t}=this.data.channelDetail,a={...e,channelId:t};api.getChapterRecords(a).then(e=>{200===e.data.code&&this.setData({chapterList:e.data.data})})},updateMenuBar(e){const t=[...e.channelMenus];t.sort(util.comparison("ordered")),t[0]&&t[0].menuType===MENU_TYPE.TUWEN&&t.splice(0,1);const{scene:a,status:i,playbackEnabled:n,hasPlayback:s,recordFileSimpleModel:o,sectionEnabled:d}=e,l="Y"===i,h="ppt"===a;if(h&&(s||o||l)){const e={menuType:MENU_TYPE.DOC,name:DefaultMenuName.DOC};t.unshift(e)}if(l){let e=-1;t.some((t,a)=>t.menuType===MENU_TYPE.PLAYBACK&&(e=a,!0)),e>=0&&t.splice(e,1)}else{h&&"Y"===n&&(s||o)&&"Y"===d&&t.push({menuType:MENU_TYPE.CHAPTER,name:DefaultMenuName.CHAPTER})}const{menuType:r}=this.data.curMenuData,c=l&&(r===MENU_TYPE.CHAPTER||r===MENU_TYPE.PLAYBACK)?0:this.data.menuIndex,p=this.data.plvInsideUse?["tuwen","iframe"]:["tuwen","iframe","qa"];this.setData({menuList:t.filter(e=>-1===p.findIndex(t=>t===e.menuType)),menuIndex:c,curMenuData:t[c]||{}})},handleChangeMenu(e){const t=e.detail.activeIndex,{menuList:a}=this.data,i=a.length;if(t<0||i<=0||t>i-1)return;const n=a[t];n&&("quiz"===n.menuType&&this.setData({hasNewQuiz:!1}),this.setData({menuIndex:t,curMenuData:n}))},handleApply(){this.selectComponent(".plv-mp-concat").apply()},handleRefreshStatus(e){this.setData({showConcatApply:e.detail.show,applyData:e.detail});let t=this.data.isForceVideo?15e3:5e3;"stop"===e.detail.type&&(t=0),this.setData({pptDelayTime:t})},playerError(e){const t=e.detail;this.triggerEvent("onError",t)},playerVodProgress(e){const{currentTime:t}=e.detail;this.setData({vodPlayerProgress:t})},playerVodEnd(e){console.log("playerVodEnd",e),this.setData({nextVod:e.detail.curVodVid})},playerLiveStorageProgress(e){const{currentTime:t}=e.detail;this.setData({vodPlayerProgress:t})},playerLiveStatusChange(e){const{status:t}=e.detail;this.handleVideoStatus(t),this.setData({liveType:t})},ordinaryStatusChange(e){this.statusTimer=setInterval(()=>{this.data.isBanOrdinaryStatus||api.getOrdinaryLiveStatus(e).then(e=>{this.handleVideoStatus(e.data.trim())})},1e4)},handleVideoStatus(e){const{channelDetail:t}=this.data;(e="end"===e?"N":"Y")!=t.status&&(this.setData({"channelDetail.status":e},()=>{"Y"!==e?this.updateVideoOption({detail:t,vod:this.getVodInfo()}):this.switchToLive({detail:t})}),this.updateMenuBar(t))},switchToLive(e){const{channelDetail:t}=this.data;api.getLatestSessionId({channelId:t.channelId}).then(a=>{this.changeSessionId(a.data),this.updateVideoOption(e),this.updateMenuBar(t)})},updateVideoOption({detail:e,vod:t,forceData:a}){let i={};if(a)return i=a,void this.setVideoOption(i);const n="Y"===e.status,s="Y"===e.playbackEnabled&&e.hasPlayback,o={mode:"live",uid:e.userId,cid:e.channelId,forceVideo:this.data.isForceVideo,muted:e.muted||!1};if(!n)return s&&t?("vod"===e.playbackOrigin&&(i={mode:"vod",vodVid:t}),"playback"===e.playbackOrigin&&(i={...o,liveMode:2,vodsrc:t})):e.recordFileSimpleModel?(i={...o,liveMode:2,vodsrc:e.recordFileSimpleModel.mp4||e.recordFileSimpleModel.m3u8},this.changeSessionId(e.recordFileSimpleModel.channelSessionId)):i={...o},void this.setVideoOption(i);i={...o},this.setVideoOption(i)},setVideoOption(e){const{sessionId:t,globalInterval:a}=this.data.channelDetail;e.globalInterval=a,e.statistics={param1:this.userInfo.viewerId||this.userInfo.userId||this.userId||this.userInfo.openId,param2:this.userInfo.userName,param4:this.userInfo.param4||"",param5:this.userInfo.param5||"",session_id:t},this.setData({videoOption:e}),this.data.isBanOrdinaryStatus="live"===e.mode},changeSessionId(e){this.data.channelDetail.sessionId=e},getVodInfo(){const{playbackList:e=[],playbackOrigin:t,status:a}=this.data.channelDetail;if(!e.length||"N"!==a)return"";const{videoPoolId:i,fileUrl:n,channelSessionId:s}=e[0];return this.changeSessionId(s),"vod"===t?i:n},handleStop(e){e.detail||this.selectComponent(".plv-mp-concat").stop()},handleShowAnswerCard(e){const{isShow:t}=e.detail;this.setData({answerShow:t?"show":"",togglePaint:!t})},showPptPaint(){this.setData({togglePaint:!0})},updatePPTVideoId(e){this.setData({videoId:e})},handleResize(){wx.getSystemInfo({success:({model:e,windowHeight:t,windowWidth:a})=>{if(!this.data.channelDetail)return;const{isPPT:i,resolutionHeight:n,resolutionWidth:s}=this.data.channelDetail;if(i){this.selectComponent("#plvMpWatchPPTBar").happenResize({windowHeight:t,windowWidth:a})}const o=n/s,d=i?o||.75:9/16,l=a*d;let h=this.data.isSwitched?.5625*a:t-l-37;this.data.pptInFullScreen&&(h=t);const r=t-a*d;this.setData({iPhoneX:util.isPhoneX(e),windowSize:{height:t,width:a},pptSize:{width:750,height:750*h/a},answerCardSize:{width:750,height:750*r/a},isPPTNormal:i&&.75===o})}})},handleSignShow(e){this.setData({togglePaint:!e.detail})},handlePlayback(e){const{videoPoolId:t,videoId:a,fileUrl:i,channelSessionId:n,muted:s=!1}=e.detail,{isPPT:o,playbackOrigin:d,userId:l,channelId:h}=this.data.channelDetail;o&&this.updateChapterOption(a),this.changeVideoId({videoPoolId:t,videoId:a}),this.changeSessionId(n);const r="playback"===d?{mode:"live",liveMode:2,uid:l,cid:h,vodsrc:i,forceVideo:this.data.isForceVideo,muted:s}:{mode:"vod",vodVid:t};this.updateVideoOption({forceData:r})},handleChangeChapter(e){this.setData({seekTime:e.detail.chapter.timeStamp})},handleShowBulletin(){this.dealShowBulletin({isShowBulletin:!0})},handleHideBulletin(){this.dealShowBulletin({isShowBulletin:!1})},handleClickFullBtn(e){this.setData({pptInFullScreen:e.detail}),this.handleResize()},handleClickPrevBtn(){this.selectComponent("#plvMpWatchPPT").handleTapPreBtn()},handleClickNextBtn(){this.selectComponent("#plvMpWatchPPT").handleTapNextBtn()},handleClickBackPageBtn(){this.selectComponent("#plvMpWatchPPT").toCurrentTeacherOp()},handlePptPageChange(e){this.selectComponent("#plvMpWatchPPTBar").pptPageChange(e.detail)},handleClickPPT(){this.selectComponent("#plvMpWatchPPTBar").toggleBar(),this.data.pptInFullScreen||(this.setData({showSwitch:!0}),clearTimeout(this.handleClickPPT.timeout),this.handleClickPPT.timeout=setTimeout(()=>{this.setData({showSwitch:!1})},1500))},switchPlayPpt(e){if("number"===typeof e){const{isSwitched:t}=this.data;if(1===e&&t||0===e&&!t)return;this.setData({isSwitched:1===e})}else this.setData({isSwitched:!this.data.isSwitched});this.handleResize()}}};Component(componentConfig);