import PolyvLive from"../../common/player/polyvlive.min";import store from"../../store/index";Component({properties:{videoOption:{type:Object,observer(e){this.setData(e),2===e.liveMode?this.data.isVod=!0:this.data.isVod=!1,this.init()}},skin:{type:String,value:"black",observer(e){"black"!==e&&"white"!==e&&this.setData({skin:"black"})}},usePlayerSkin:{type:Boolean,value:!0},menuType:{type:String,value:"",observer(e){const{liveType:t,isSwitched:i}=this.data;this.setData({isDocTypeAndNotSwitch:!("live"===t&&i&&"doc"!==e)})}},isSwitched:{type:Boolean,value:!1,observer(e){const{liveType:t,menuType:i}=this.data;this.setData({isDocTypeAndNotSwitch:!("live"===t&&e&&"doc"!==i)})}},skinAlwaysShow:{type:Boolean,value:!1},allowDanmu:{type:Boolean,value:!0}},data:{liveMode:1,videoSrc:"",isVod:!1,statistics:{},liveType:"live",loop:!1,isWarm:!1,isAutoChange:!1,forceVideo:!1,isOffNetwork:!1,isOffLive:!1,isBrokenNet:!1,networkTips:"网络异常，请退出后重试",canWatch:!0,imgSrc:"",muted:!1,showControl:!0,lines:[],danmuEnabled:!0,currentLine:0,currentRate:1,isDocTypeAndNotSwitch:!0},lifetimes:{attached(){this.liveVideoContext=wx.createLivePlayerContext("plvLivePlayer",this),this.liveVodVideoContext=wx.createVideoContext("plvLiveVodPlayer",this),this.hidePlayControl(),wx.getSystemInfo({success:e=>{"android"===e.platform&&this.setData({skinAlwaysShow:!0})}})},detached(){this.polyvLive&&this.polyvLive.destroy()}},methods:{init(){this.polyvLive&&this.polyvLive.destroy&&this.polyvLive.destroy(),this.polyvLive=new PolyvLive,this.initLiveType(),this.initLivePlayer()},initLivePlayer(){const{uid:e,cid:t,statistics:i,isOffNetwork:s,forceVideo:o,skin:a,isVod:n,vodsrc:r,isAutoChange:d,globalInterval:l}=this.data,h="white"===a;this.polyvLive.getVideo({uid:e,vid:t,isSkinWhite:h,statistics:i,isAutoChange:d,globalInterval:l,forceSessionId:!0,vodsrc:n?r:"",success:e=>{if(e.errorCode)return void this.setData({canWatch:!1,errorCode:e.errorCode});if(1!==this.data.liveMode)return;const t=o?e.src:e.flvSrc;this.setVideoSrc(t)},onChangeType:(e,t,i)=>{const{liveMode:s,videoSrc:o,forceVideo:a}=this.data;"live"===e&&1===s||(this.setData({liveType:e}),this.setLiveType(e,t))},onNetWorkChange:e=>{s!==e&&this.setData({isOffNetwork:e}),this.showNetWorkTips()},onApiStatus:e=>{"live"===this.currentStatus&&"end"===e&&this.changeScreen({detail:"half"}),this.currentStatus=e,this.triggerEvent("onLiveStatusChange",{status:e})},onUpdateChannelJson:e=>{this.setData({lines:e.lines,closeDanmuEnable:e.closeDanmuEnable})}})},initLiveType(){this.liveType=new Map([["live",e=>{this.setLiveMode(1),this.setVideoSrc(e)}],["warmImage",e=>{this.setLiveMode(0),this.setWarmImg(e)}],["warmVideo",e=>{this.setLiveMode(2),this.setVideoSrc(e,!0,!1)}],["vod",e=>{this.setLiveMode(2),this.setVideoSrc(e)}],["default",()=>{}]])},setLiveType(e,t){this.liveType.get(e)(t)||this.liveType.get("default")()},setLiveMode(e){this.data.liveMode!==e&&this.setData({liveMode:e})},setVideoSrc(e,t=!1){this.setData({videoSrc:e,isWarm:t})},setWarmImg(e){this.setData({imgSrc:e})},onLiveTimeUpdate(e){const t=e.detail.currentTime;this.polyvLive.updateTime(t),this.triggerEvent("onLiveStorageProgress",{currentTime:t})},onLiveVodEnded(){this.triggerEvent("onLiveVodEnd")},onLiveVodError(){},onStateChange(e){const t=/-2301|-2302/i.test(e.detail.code);t&&(this.polyvLive.getReconnectSrc(e=>{this.setVideoSrc(e)}),this.setData({isOffLive:t})),2005===e.detail.code&&this.data.isBrokenNet&&this.setData({isBrokenNet:!1}),this.showNetWorkTips()},showNetWorkTips(e,t){this.data.isOffNetwork&&this.data.isOffLive&&!this.data.isBrokenNet&&this.setData({isBrokenNet:!0})},resumeStats(e){this.polyvLive.resumeStats(e)},setMuted(e){this.setData({muted:e})},hidePlayControl(){clearTimeout(this.data.controlTimer),this.data.controlTimer=setTimeout(()=>{this.setData({showControl:!1})},3e3)},showPlayControl(){this.setData({showControl:!0}),this.hidePlayControl()},changePlayStatus(e){const t=e.detail,{liveMode:i,forceVideo:s}=this.data;0!==i&&s?"pause"===t?this.liveVodVideoContext.pause():this.liveVodVideoContext.play():"pause"===t?this.liveVideoContext.pause():this.liveVideoContext.resume()},refresh(){const{liveMode:e,forceVideo:t}=this.data;0!==e&&t?this.liveVodVideoContext.play():this.liveVideoContext.resume()},changeScreen(e){const t=e.detail,i=this,{liveMode:s,forceVideo:o}=this.data;if(console.info(s,o,"====liveMode, forceVideo==="),0!==s&&o)return"full"===t?this.liveVodVideoContext.requestFullScreen({direction:90}):this.liveVodVideoContext.exitFullScreen(),this.setData({changeScreenSuccess:t}),void store.set("main.screenType",t);if("full"===t)this.liveVideoContext.requestFullScreen({direction:90,success:function(){i.setData({changeScreenSuccess:t})}});else{if("full"!==this.data.changeScreenSuccess)return;this.liveVideoContext.exitFullScreen({success:function(){i.setData({changeScreenSuccess:t})}})}store.set("main.screenType",t)},hideSettingContent(){this.setData({settingShow:!1})},setting(){const{settingShow:e}=this.data;this.setData({settingShow:!e})},changeLine(e){this.setVideoSrc(e.detail.src),this.setData({currentLine:e.detail.line})},changeRate(e){const t=e.detail,i=[.5,1,1.25,1.5,2][t];this.setData({currentRate:t}),this.liveVodVideoContext.playbackRate(i)},sendDanmu(e){const{danmuEnabled:t,allowDanmu:i}=this.data;"Y"!==this.data.closeDanmuEnable&&t&&i&&this.liveVodVideoContext.sendDanmu({text:e})},updateDanmuEnabled(e){this.setData({danmuEnabled:!e.detail})}}});