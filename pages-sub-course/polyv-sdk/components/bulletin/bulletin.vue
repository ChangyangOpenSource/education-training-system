<template>
<uni-shadow-root class="polyv-sdk-components-bulletin-bulletin"><view :style="'z-index: '+(zIndex)" :class="'plv-mp-bulletin-wrap '+(show ? 'plv-mp-bulletin-wrap__show' : '')">
  <view class="plv-mp-bulletin-top">
    <text class="plv-mp-bulletin-title">公告</text>
    <image class="plv-bulletion-top__img" @click="tapClose" src="../../assets/images/bulletin-close-btn.png"></image>
  </view>
  
  <view class="plv-mp-bulletin-content"><wxParse v-bind="{wxParseData:content.nodes}" wx-template-name="wxParse"></wxParse></view>
  <view class="plv-mp-bulletin-bottom">
    <button @click="tapClose" class="plv-mp-bulletin-know-btn">知道了</button>
  </view>
</view></uni-shadow-root>


</template><script>

const __wxTemplateComponentProps = {"wxParse":["wxTemplateName","wxParseData"]}
import __wxTemplateComponent0 from '../../common/wxParse/wxParse.vue'
__wxTemplateComponentProps['wxParseVideo'] && __wxTemplateComponentProps['wxParseVideo'].forEach(prop => __wxTemplateComponent0.props[prop] = {type: null})
__wxTemplateComponentProps['wxParseImg'] && __wxTemplateComponentProps['wxParseImg'].forEach(prop => __wxTemplateComponent0.props[prop] = {type: null})
__wxTemplateComponentProps['WxEmojiView'] && __wxTemplateComponentProps['WxEmojiView'].forEach(prop => __wxTemplateComponent0.props[prop] = {type: null})
__wxTemplateComponentProps['WxParseBr'] && __wxTemplateComponentProps['WxParseBr'].forEach(prop => __wxTemplateComponent0.props[prop] = {type: null})
__wxTemplateComponentProps['wxParse'] && __wxTemplateComponentProps['wxParse'].forEach(prop => __wxTemplateComponent0.props[prop] = {type: null})
__wxTemplateComponentProps['wxParse0'] && __wxTemplateComponentProps['wxParse0'].forEach(prop => __wxTemplateComponent0.props[prop] = {type: null})
__wxTemplateComponentProps['wxParse1'] && __wxTemplateComponentProps['wxParse1'].forEach(prop => __wxTemplateComponent0.props[prop] = {type: null})
__wxTemplateComponentProps['wxParse2'] && __wxTemplateComponentProps['wxParse2'].forEach(prop => __wxTemplateComponent0.props[prop] = {type: null})
__wxTemplateComponentProps['wxParse3'] && __wxTemplateComponentProps['wxParse3'].forEach(prop => __wxTemplateComponent0.props[prop] = {type: null})
__wxTemplateComponentProps['wxParse4'] && __wxTemplateComponentProps['wxParse4'].forEach(prop => __wxTemplateComponent0.props[prop] = {type: null})
__wxTemplateComponentProps['wxParse5'] && __wxTemplateComponentProps['wxParse5'].forEach(prop => __wxTemplateComponent0.props[prop] = {type: null})
__wxTemplateComponentProps['wxParse6'] && __wxTemplateComponentProps['wxParse6'].forEach(prop => __wxTemplateComponent0.props[prop] = {type: null})
__wxTemplateComponentProps['wxParse7'] && __wxTemplateComponentProps['wxParse7'].forEach(prop => __wxTemplateComponent0.props[prop] = {type: null})
__wxTemplateComponentProps['wxParse8'] && __wxTemplateComponentProps['wxParse8'].forEach(prop => __wxTemplateComponent0.props[prop] = {type: null})
__wxTemplateComponentProps['wxParse9'] && __wxTemplateComponentProps['wxParse9'].forEach(prop => __wxTemplateComponent0.props[prop] = {type: null})
__wxTemplateComponentProps['wxParse10'] && __wxTemplateComponentProps['wxParse10'].forEach(prop => __wxTemplateComponent0.props[prop] = {type: null})
__wxTemplateComponentProps['wxParse11'] && __wxTemplateComponentProps['wxParse11'].forEach(prop => __wxTemplateComponent0.props[prop] = {type: null})
,'wxParseVideo' : __wxTemplateComponent0,'wxParseImg' : __wxTemplateComponent0,'WxEmojiView' : __wxTemplateComponent0,'WxParseBr' : __wxTemplateComponent0,'wxParse' : __wxTemplateComponent0,'wxParse0' : __wxTemplateComponent0,'wxParse1' : __wxTemplateComponent0,'wxParse2' : __wxTemplateComponent0,'wxParse3' : __wxTemplateComponent0,'wxParse4' : __wxTemplateComponent0,'wxParse5' : __wxTemplateComponent0,'wxParse6' : __wxTemplateComponent0,'wxParse7' : __wxTemplateComponent0,'wxParse8' : __wxTemplateComponent0,'wxParse9' : __wxTemplateComponent0,'wxParse10' : __wxTemplateComponent0,'wxParse11' : __wxTemplateComponent0}}

global['__wxRoute'] = 'polyv-sdk/components/bulletin/bulletin'
import WxParse from"../../common/wxParse/wxParse";Component({properties:{bulletinStr:{type:String,value:"",observer(e){this.htmlParser(e)}},show:{type:Boolean,value:!1},zIndex:{type:Number,default:2e3}},methods:{wxParseTagATap(e){const t=e.currentTarget.dataset.src;wx.setClipboardData({data:t,success(){wx.showToast({title:"链接已复制",icon:"none",duration:2e3})},fail(){wx.showToast({title:"链接复制失败",icon:"none",duration:2e3})}})},tapClose(){this.triggerEvent("onClose")},htmlParser(e){try{WxParse.wxParse("content","html",e,this,0)}catch(e){console.warn("kinerHtmlParser:","没有任何内容需要转换",e)}}}});
export default global['__wxComponents']['polyv-sdk/components/bulletin/bulletin']
</script>
<style platform="mp-weixin">
@charset "UTF-8";.wxParse{margin:0 5px;font-family:Helvetica,sans-serif;font-size:28rpx;color:#666;line-height:1.8}.wxParse-view{word-break:break-all;overflow:auto}.wxParse-inline{display:inline}.wxParse-div,.wxParse-inline{margin:0;padding:0}.wxParse-h1{font-size:2em;margin:.67em 0}.wxParse-h2{font-size:1.5em;margin:.75em 0}.wxParse-h3{font-size:1.17em;margin:.83em 0}.wxParse-h4{margin:1.12em 0}.wxParse-h5{font-size:.83em;margin:1.5em 0}.wxParse-h6{font-size:.75em;margin:1.67em 0}.wxParse-h1{font-size:18px;font-weight:400;margin-bottom:.9em}.wxParse-h2{font-size:16px}.wxParse-h2,.wxParse-h3{font-weight:400;margin-bottom:.34em}.wxParse-h3{font-size:15px}.wxParse-h4{font-weight:400;font-size:14px;margin-bottom:.24em}.wxParse-h5{font-weight:400;font-size:13px;margin-bottom:.14em}.wxParse-h6{font-weight:400;font-size:12px;margin-bottom:.04em}.wxParse-b,.wxParse-h1,.wxParse-h2,.wxParse-h3,.wxParse-h4,.wxParse-h5,.wxParse-h6,.wxParse-strong{font-weight:bolder}.wxParse-address,.wxParse-cite,.wxParse-em,.wxParse-i,.wxParse-var{font-style:italic}.wxParse-code,.wxParse-kbd,.wxParse-pre,.wxParse-samp,.wxParse-tt{font-family:monospace}.wxParse-pre{white-space:pre}.wxParse-big{font-size:1.17em}.wxParse-small,.wxParse-sub,.wxParse-sup{font-size:.83em}.wxParse-sub{vertical-align:sub}.wxParse-sup{vertical-align:super}.wxParse-del,.wxParse-s,.wxParse-strike{text-decoration:line-through}.wxParse-s,.wxParse-strong{display:inline}.wxParse-a{color:#00bfff;word-break:break-all;overflow:auto}.wxParse-video{text-align:center;margin:10px 0}.wxParse-video-video{width:100%}.wxParse-img{overflow:hidden}.wxParse-blockquote{margin:0;padding:10px 0 10px 5px;font-family:Courier,Calibri,宋体;background:#f5f5f5;border-left:3px solid #dbdbdb}.wxParse-code,.wxParse-wxxxcode-style{display:inline;background:#f5f5f5}.wxParse-ul{margin:20rpx 10rpx}.wxParse-li,.wxParse-li-inner{display:flex;align-items:baseline;margin:10rpx 0}.wxParse-li-text{align-items:center;line-height:20px}.wxParse-li-circle{display:inline-flex;width:5px;height:5px;background-color:#333;margin-right:5px}.wxParse-li-square{background-color:#333}.wxParse-li-ring,.wxParse-li-square{display:inline-flex;width:10rpx;height:10rpx;margin-right:5px}.wxParse-li-ring{border:2rpx solid #333;border-radius:50%;background-color:#fff}.wxParse-u{text-decoration:underline}.wxParse-hide{display:none}.WxEmojiView{align-items:center}.wxEmoji{width:16px;height:16px}.wxParse-tr{display:flex;border-right:1px solid #e0e0e0;border-bottom:1px solid #e0e0e0;border-top:1px solid #e0e0e0}.wxParse-td,.wxParse-th{flex:1;padding:5px;font-size:28rpx;border-left:1px solid #e0e0e0;word-break:break-all}.wxParse-td:last,.wxParse-th{border-top:1px solid #e0e0e0}.wxParse-th{background:#f0f0f0}.wxParse-del{display:inline}.wxParse-figure{overflow:hidden}.plv-mp-bulletin-wrap{position:absolute;top:0;left:0;right:0;bottom:0;z-index:9999;background:#fff;border-top-left-radius:32rpx;border-top-right-radius:32rpx;display:none;flex-direction:column}.plv-mp-bulletin-wrap__show{display:flex}.plv-mp-bulletin-top{height:96rpx;border-bottom:1px solid #d8d8d8;display:flex;justify-content:space-between;align-items:center;padding-left:48rpx;padding-right:32rpx}.plv-mp-bulletin-top>.plv-mp-bulletin-title{color:#5c5c5c;font-size:28rpx}.plv-mp-bulletin-top>.plv-bulletion-top__img{width:34rpx;height:34rpx}.plv-mp-bulletin-content{margin-top:32rpx;flex:1;padding:0 48rpx;overflow:scroll;-webkit-overflow-scrolling:touch;color:#2c2c2c;font-size:34rpx;font-weight:500}.wxParse-a{color:#2297f4}.plv-mp-bulletin-bottom{padding:42rpx 48rpx 80rpx}.plv-mp-bulletin-know-btn{height:92rpx;line-height:92rpx;background:#2196f3;border-radius:20rpx;color:#fff;font-size:32rpx}
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