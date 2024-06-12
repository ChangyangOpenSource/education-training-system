<template>
<uni-shadow-root class="polyv-sdk-plv-plv"><template>
</uni-shadow-root>


</template><script>

global['__wxRoute'] = 'polyv-sdk/plv/plv'
import plv from"../index";Component({properties:{apiId:String,apiSecret:String,options:Object},ready(){plv.setApp({apiId:this.data.apiId,apiSecret:this.data.apiSecret,chatToken:this.data.chatToken,verifyUrl:this.data.verifyUrl}),plv.init(this.data.options).then(t=>{this.triggerEvent("inited",t)})},detached(){plv.destroy()}});
export default global['__wxComponents']['polyv-sdk/plv/plv']
</script>
<style platform="mp-weixin">

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