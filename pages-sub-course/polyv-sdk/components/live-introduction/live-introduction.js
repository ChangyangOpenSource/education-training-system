Component({data:{days:0,hours:0,minutes:0,seconds:0,startTime:"",liveStatusText:"",showCountDown:!1,imgPath:""},properties:{channelDetail:{type:Object,observer(t){}},skin:{type:String,value:"black",observer(t){"black"!==t&&"white"!==t&&this.setData({skin:"black"})}},liveType:{type:String,observer(t){let e="";e="live"===t?"正在在线":this.data.startTime&&new Date(this.data.startTime).getTime()>(new Date).getTime()?"等待在线中":"暂无在线",this.setData({liveStatusText:e})}}},lifetimes:{ready(){this.setLiveStatusText(),this.countDown()}},methods:{setLiveStatusText(){let t="";t="Y"===this.data.channelDetail.status?"正在在线":this.data.startTime&&new Date(this.data.startTime).getTime()>(new Date).getTime()?"等待在线中":"暂无在线",this.setData({liveStatusText:t})},countDown(){if(!this.data.startTime)return;const t=new Date(this.data.startTime),e=new Date;if(e.getTime()>=t.getTime())return;this.setData({showCountDown:!0});let a=Math.round((t.getTime()-e.getTime())/1e3);const s=a%60,i=(a=Math.floor(a/60))%60,n=(a=Math.floor(a/60))%24,o=Math.floor(a/24);this.setData({days:o,hours:n,minutes:i,seconds:s});let r=setTimeout(()=>{clearTimeout(r),r=null,this.countDown()},1e3)}}});