<template>
	<view class="zai-box">
		<view class="tankuang">
			<view class="tishi"> 需微信手机号授权 </view>
			<view class="titlese">
				为了更好的为您服务，在官方网站或者APP登录使用时，同步用户信息，需要您授权手机号
			</view>
			<view class="loginFlex">
				<view class="quxiao" @click="guanbi">
					<view class="quxiao2"> 取消 </view>
				</view>
				<button class="autiosn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
					<view class="autiosn2"> 确认 </view>
				</button>
			</view>
		</view>
	</view>


</template>
<script>
	import {
		decodeUserInfo,
		bindinMajor
	} from "@/api/login.js";
	import {
		setUserInfo,
		setToken,
		getMajorInfo
	} from "@/common/util/index.js";
	export default {
		props: ["unionids", "openids", "sessionKeys", "infos", 'codes'],
		data() {
			return {
				imageUrl: getApp().globalData.imageUrl,
				shape: "",
				openid: "",
				sessionKey: "",
				username: "",
				userImg: "",
				unionid: '',
				location: '',
				shareUrl: ''
			};
		},
		onLoad(val) {
			let that = this;
			uni.getLocation({
				type: 'wgs84',
				success: function(res) {
					that.location = res.longitude + ',' + res.latitude
				},
				fail: function(err) {
					console.log(err)
				}
			});
		},
		mounted() {
			if (uni.getStorageSync('shareUrl')) {
				this.shareUrl = uni.getStorageSync('shareUrl')
			}
		},
		methods: {
			guanbi() {
				that.$emit('guanbi2', false)
			},
			// 最后一步
			async lastStep(e) {
				let appId = uni.getAccountInfoSync().miniProgram.appId
				const res = await decodeUserInfo({
					encryptedData: e.encryptedData,
					iv: e.iv,
					openId: this.openids,
					sessionKey: this.sessionKeys,
					unionId: this.unionids,
					location: this.location,
					code: this.codes
				});
				uni.setStorageSync('touristLogin', false)
				setToken(res.result.token);
				setUserInfo(res.result.userInfo);
				// const valdsa = bindinMajor({
				// 	majorId: getMajorInfo().id
				// });
				// let shareUrl = ''
				// try {
				// 	shareUrl = uni.getStorageSync('shareUrl')
				// } catch (err) {}
				// if (shareUrl) {
				// 	uni.reLaunch({
				// 		url: shareUrl
				// 	})
				// } else {
				// 	uni.navigateTo({
				// 		url: "/pagesA/setUpMajor/setUpMajor",
				// 	});
				// }
				this.$emit('guanbi2', false)
				var page = getCurrentPages().pop(); //当前页面
				console.log(page)
				uni.reLaunch({
					url: `${page.$page.fullPath}`
				})
			},
			getPhoneNumber(e) {
				this.$emit('guanbi3', false)
				if (e.detail.errMsg === "getPhoneNumber:ok") {
					uni.login({
						provider: "weixin",
						success: (res) => {
							this.sessionKey = this.sessionKeys;
							this.openid = this.openids;
							this.unionid = this.unionids;
							this.lastStep(e.detail);

						},
						fail: () => {
							uni.showToast({
								title: "微信登录授权失败",
								icon: "none",
							});
						},
					});
				} else {
					uni.showToast({
						title: "获取手机授权失败",
						icon: "none",
					});
				}
			},
		},
	};
</script>

<style scoped lang="scss">
	.titlese {
		font-size: 28rpx;
		color: #B2B9BA;
		padding: 0 50rpx;
		line-height: 50rpx;
		text-align: center;
	}

	.chucuno {
		position: absolute;
		top: 50%;
		margin-top: -150rpx;
		z-index: 99999;
		left: 50%;
		margin-left: -325rpx;
		width: 100%;
	}

	.tankuang {
		width: 100%;
		height: 400rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		padding-top: 60rpx;
	}

	/* 	.back-tankuang {
		width: 100%;
		height: 100%;
		background: rgba(51, 51, 51, 0.5);
	} */

	.autiosn {
		width: 50%;
		border-left: 1rpx solid #f1f1f1;
		background: none;
		display: flex;
		align-items: center;
		justify-content: center;
	}


	.autiosn2 {
		width: 200rpx;
		height: 80rpx;
		background: linear-gradient(92deg, #FF5B00 0%, #FF823D 100%);
		border-radius: 20rpx;
		font-size: 36rpx;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 80rpx;
		text-align: center;
	}


	.quxiao {
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.quxiao2 {
		width: 200rpx;
		height: 80rpx;
		background: #FFEFEA;
		border-radius: 20rpx;
		font-size: 36rpx;
		font-weight: bold;
		color: #F37955;
		line-height: 80rpx;
		text-align: center;
	}

	.tishi {
		height: 80rpx;
		font-size: 38rpx;
		line-height: 80rpx;
		text-align: center;
		font-weight: bold;
		/* border-bottom: 1rpx solid #f1f1f1; */
	}

	.tishititle {
		height: 110rpx;
		/* border-bottom: 1rpx solid #f1f1f1; */
		text-align: center;
		font-size: 36rpx;
		color: #999999;
		line-height: 110rpx;
	}

	.loginFlex {
		height: 110rpx;
		display: flex;
		align-items: center;
		/* justify-content: center; */
		/* border-top: 1rpx solid #f1f1f1; */
		margin-top: 25rpx;
	}

	.page {
		padding-top: 160rpx;
	}

	.cu-custom {
		width: 100%;
		height: 45rpx;
	}

	.cu-bar {
		height: 45rpx;
		background-color: #f1f1f1;
		width: 100%;
		text-align: center;
		padding: 0 !important;
		position: relative;
	}

	.contents {
		font-size: 38rpx;
		font-weight: bold;
		position: absolute;
		width: 100%;
		text-align: center;
	}

	.tips {
		text-align: center;
		font-size: 26rpx;
		font-family: PingFang SC;
		color: #999999;
	}

	.sys_btn {
		background-color: #3d7dff;
		border-radius: 40rpx;
		height: 80rpx !important;
		line-height: 80rpx !important;
		font-size: 32rpx;
		font-family: PingFang SC;
		color: #FFFFFF;
	}

	.login-paddingtop {
		padding-top: 100rpx;
	}

	.zai-box {
		/* width: 100%; */
		/* height: 100%; */
		/* padding: 0 20rpx; */
		padding-top: 70rpx;
		position: relative;
	}

	.zai-logo {
		width: 150rpx;
		height: 150rpx;
	}

	.zai-title {
		padding-top: 25rpx;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
	}

	.input-placeholder,
	.zai-input {
		color: #94afce;
	}

	.zai-label {
		padding: 60rpx 0;
		text-align: center;
		font-size: 30rpx;
		color: #a7b6d0;
	}

	.zai-btn {
		background: #ff65a3;
		color: #fff;
		border: 0;
		border-radius: 100rpx;
		font-size: 36rpx;
	}

	.zai-btn:after {
		border: 0;
	}

	/*按钮点击效果*/
	.zai-btn.button-hover {
		transform: translate(1rpx, 1rpx);
	}

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
	}
</style>