import util from"../../common/utils/utils";const compConfig={properties:{chapterList:{type:Array,value:[],observer(t){this.setData({list:t.map(t=>({...t,duration:util.formatTime(t.timeStamp)}))})}},vodCurTime:{type:Number,value:0,observer(t){this.data.chapterList.some((e,a)=>{if(t<e.timeStamp)return this.setData({curIndex:0===a?0:a-1}),!0;a===this.data.chapterList.length-1&&this.setData({curIndex:a})})}},skin:{type:String,value:"black",observer(t){"black"!==t&&"white"!==t&&this.setData({skin:"black"})}}},data:{list:[],curIndex:-1,timeList:[]},methods:{tapChapterItem(t){const e=t.currentTarget.dataset.index;this.triggerEvent("onTapChapter",{chapter:this.data.chapterList[e]})}}};Component(compConfig);