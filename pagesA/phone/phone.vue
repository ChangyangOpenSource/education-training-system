<template>
	<view style="padding: 140rpx 45rpx 0">
		<view class="phonebox">
			<input type="number" maxlength="11" v-model="phone" class="phone"
				placeholder-style="font-size: 32rpx;color: #B0B0B0;" placeholder="请输入手机号" />
			<text></text>
			<view @click="getCode">{{isSend ? codeNum+'秒后重新发送' : codeText}}</view>
		</view>

		<view class="phonebox">
			<input type="number" maxlength="6" v-model="code" class="code"
				placeholder-style="font-size: 32rpx;color: #B0B0B0;" placeholder="请输入验证码" />
		</view>

		<view class="bindphone" @click="bindphone">绑定手机号</view>

		<view class="radio" style="padding-top: 40rpx;">
			<radio color="#F5565A" class="defult" :checked="radio" @click="radioChange()" />

			<view style="line-height: 40rpx;">首次登录会自动创建新账号，并同意<text style="color: #F5565A;">用户服务协议</text>和<text
					style="color: #F5565A;">隐私政策</text></view>
		</view>
	</view>
</template>

<script>
	import {
		gzhBindPhone,
		gzhBindPhonesms
	} from "@/api/report.js";
	import {
		setUserInfo,
		setToken,
		getMajorInfo
	} from "@/common/util/index.js";
	export default {
		data() {
			return {
				phone: '',
				code: '',
				radio: false,
				codeText: '获取验证码',
				codeNum: 60,
				isSend: false,

			}
		},
		created() {
			console.log(uni.getStorageSync('userInfo'))
		},
		methods: {
			bindphone() {
				if (!this.radio) {
					return uni.showToast({
						title: '请阅读并勾选用户服务协议与隐私政策',
						icon: 'none'
					})
				}
				if (/^(?:13\d|14\d|15\d|16\d|17\d|18\d|19\d)\d{5}(\d{3}|\*{3})$/.test(this.phone)) {
					if (this.code.length < 6) {
						return uni.showToast({
							title: '请填写验证码',
							icon: 'none'
						})
					} else {
						let openid = uni.getStorageSync('openids')
						let unionid = uni.getStorageSync('unionids')
						gzhBindPhone({
							stuPhone: this.phone,
							code: this.code,
							openId: openid,
							unionId: unionid
						}).then((res) => {
							console.log(res)
							setToken(res.result.token);
							setUserInfo(res.result.userInfo);
							// uni.switchTab({
							// 	url: '/pages/index/home',
							// })
							if(res.result.userInfo.majorId==null){
								uni.redirectTo({
									url: '/pagesA/setUpMajor/setUpMajor',
								})
							}
						})

					}
				} else {
					uni.showToast({
						title: '请填写正确的手机号',
						icon: 'none'
					})
				}
			},
			radioChange(e) {
				this.radio = !this.radio
			},
			getCode() {
				if (!this.isSend) {
					if (!this.radio) {
						return uni.showToast({
							title: '请阅读并勾选用户服务协议与隐私政策',
							icon: 'none'
						})
					}
					if (/^(?:13\d|14\d|15\d|16\d|17\d|18\d|19\d)\d{5}(\d{3}|\*{3})$/.test(this.phone)) {
						gzhBindPhonesms({
							mobile: this.phone
						}).then((res) => {
							if (res.code == 200) {
								uni.showToast({
									title: '发送成功'
								})
								this.isSend = true
								let time = setInterval(() => {
									if (this.codeNum < 1) {
										this.codeNum = 60
										this.isSend = false
										clearInterval('time')
									} else {
										this.codeNum--
									}
								}, 1000)

							}
						})

					} else {
						uni.showToast({
							title: '请填写正确的手机号',
							icon: 'none'
						})
					}
				}

			}
		}
	}
</script>

<style scoped lang="scss">
	radio::before {
		right: 0.3vw !important;
		margin-top: -0.8vw !important;
		font-size: 24rpx !important;
	}

	.phonebox {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 40rpx 0;
		border-bottom: 1px solid #DDDDDD;
	}

	.phonebox .phone {
		width: 50%;
		padding-left: 60rpx;
		/* background-image: url(../../static/phone.png); */
		background-repeat: no-repeat;
		background-size: 32rpx 32rpx;
		background-position: 6rpx center;
		font-size: 32rpx;
	}

	.phonebox .code {
		width: 60%;
		padding-left: 60rpx;
		/* background-image: url(../../static/code.png); */
		background-repeat: no-repeat;
		background-size: 32rpx 32rpx;
		background-position: 6rpx center;
		font-size: 32rpx;
	}

	.phonebox>text {
		display: inline-block;
		width: 1px;
		height: 32rpx;
		background-color: #DDDDDD;
		margin: 0 40rpx;
	}

	.phonebox>view {
		font-size: 32rpx;
		font-weight: bold;
		color: #F5565A;
	}

	.bindphone {
		width: 100%;
		height: 88rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(90deg, #F4464A, #EE6E28);
		font-size: 32rpx;
		font-weight: bold;
		color: #FFFFFF;
		border-radius: 44rpx;
		margin-top: 60rpx;
	}

	.radio {
		display: flex;
		align-items: flex-start;
	}
</style>
