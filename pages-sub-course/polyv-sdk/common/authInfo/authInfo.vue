<template>
<uni-shadow-root class="polyv-sdk-common-authInfo-authInfo"><template v-if="wxTemplateName === 'authInfo'">
  <view class="plv-auth-info" v-if="type === 'name'">
    {{ name }}
    <input type="text" :data-index="index" @input="_$self.$parent.$parent[('infoInput')]($event)" :placeholder="placeholder"></input>
  </view>
  <view class="plv-auth-info" v-if="type === 'number'">
    {{ name }}
    <input type="digit" :data-index="index" @input="_$self.$parent.$parent[('infoInput')]($event)" :placeholder="placeholder"></input>
  </view>
  <view class="plv-auth-info" v-if="type === 'text'">
    {{ name }}
    <input type="text" :data-index="index" @input="_$self.$parent.$parent[('infoInput')]($event)" :placeholder="placeholder"></input>
  </view>
  <view class="plv-auth-info" v-if="type === 'mobile'">
    {{ name }}
    <input @input="_$self.$parent.$parent[('telInput')]($event)" type="number" :placeholder="placeholder"></input>
  </view>
  <view v-if="type === 'mobile' && sms === 'Y'">
    <view class="plv-auth-info">
      <input @input="_$self.$parent.$parent[('kaptchaInput')]($event)" placeholder="请输入验证码"></input>
      <image @click="_$self.$parent.$parent[('getInfoImage')]($event)" :src="infoImage"></image>
    </view>
    <view class="plv-auth-info">
      <input @input="_$self.$parent.$parent[('msgInput')]($event)" placeholder="短信验证码"></input>
      <button @click="_$self.$parent.$parent[('getInfoMsg')]($event)" plain :class="'plv-info__get__msg '+(disable ? 'btn-disabled' : '')">{{ smsBtnText }}</button>
    </view>
  </view>
  <view class="plv-auth-info" v-if="type === 'option'">
    <text>{{ name }}</text>
    <picker @change="_$self.$parent.$parent[('bindPickerChange')]($event)" :data-index="index" :value="infoParams[index]" :range="options">
      <view class="picker">
        {{ options[infoParams[index]] }}
      </view>
    </picker>
  </view>
</uni-shadow-root>


</template><script>

global['__wxRoute'] = 'polyv-sdk/common/authInfo/authInfo'

export default global['__wxComponents']['polyv-sdk/common/authInfo/authInfo']
</script>
<style platform="mp-weixin">
.plv-auth-info{display:flex;color:#333;height:50px;margin:0;padding:0;margin-left:40rpx;align-items:center;border-bottom:1px solid #f0f0f0;position:relative}.plv-auth-info>input{padding:0 10px;font-size:15px;border:none;flex:1}.plv-auth-info>picker{width:50%;margin-left:10px}.plv-auth-info>image{width:148px;height:36px}.plv-auth-info .plv-info__get__msg{margin-right:20rpx;font-size:15px;height:36px;line-height:36px;text-align:center;width:120px;border:none;background:0 0;outline:0;border-left:1px solid #f0f0f0;color:#999}.plv-auth-info .btn-disabled{border-left:none;background:#bbb;color:#fff}
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