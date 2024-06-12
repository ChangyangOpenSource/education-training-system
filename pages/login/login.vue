<template>
	<view class="zai-box">
		<view class="tankuang" v-if="phoneisAss">
			<view class="tishi"> 请先授权登录 </view>
			<view class="footer_tip1">
				<text @click="bannerGoto(1,'注册协议')">《注册协议》</text>
				<text @click="bannerGoto(2,'隐私保护政策')">《隐私保护政策》</text>
			</view>
			<view class="loginFlex">
				<view class="quxiao" @click="guanbi">
					<view class="quxiao2"> 取消 </view>
				</view>
				<view class="autiosn" @click="appLoginWx">
					<view class="autiosn2"> 确认 </view>
				</view>
			</view>
		</view>
		<mobilePhone v-if="phisAss" @guanbi2='guanbi2' @guanbi3='guanbi3' :unionids='unionids' :openids='openids'
			:sessionKeys='sessionKeys' :codes='code' :infos='infos'></mobilePhone>
	</view>
</template>
<script>
	import {
		wxLogin,
		bindinMajor,
		loginRecord
	} from "@/api/login.js";
	import {
		getMajor
	} from "@/api/professionalChoice.js";
	import {
		setUserInfo,
		setToken,
		getMajorInfo,
		setMajorInfo,
		getMajorInfo2,
		setMajorInfo2
	} from "@/common/util/index.js";

	export default {
		data() {
			return {
				imageUrl: getApp().globalData.imageUrl,
				shape: "",
				code: "",
				isLoading: false,
				majorArr: '',
				phoneisAss: true,
				phisAss: false,
				infos: {},
				unionids: '',
				openids: '',
				sessionKeys: '',
				loginAss: getApp().globalData.loginAss,
			};
		},

		mounted() {
			if (uni.getStorageSync('shareUrl')) {
				this.shareUrl = uni.getStorageSync('shareUrl')
			}
		},
		methods: {
			bannerGoto(type, title) {
				let registrationAgreement = JSON.stringify(uni.getStorageSync('registrationAgreement'));
				let privacyAgreement = JSON.stringify(uni.getStorageSync('privacyAgreement'));
				if (type == 1) {
					uni.navigateTo({
						url: `/pagesA/nav/bannerInfo/xiangqiang?data=${encodeURIComponent(registrationAgreement)}&title=${title}`
					})
				} else {
					uni.navigateTo({
						url: `/pagesA/nav/bannerInfo/xiangqiang?data=${encodeURIComponent(privacyAgreement)}&title=${title}`
					})
				}

			},
			guanbi3(value) {
				console.log(value)
				this.phisAss = false
			},
			guanbi2(value) {
				this.phisAss = value
				this.phoneisAss = true
				this.$emit('guanbi', false)
			},
			guanbi() {
				this.$emit('guanbi', false)
			},
			getQueryVariable(variable) {
				var query = window.location.search.substring(1);
				var vars = query.split("&");
				for (var i = 0; i < vars.length; i++) {
					var pair = vars[i].split("=");
					if (pair[0] == variable) {
						return pair[1];
					}
				}
				return false;
			},
			// 第一步
			async login(data) {
				console.log(data, 852)
				const val = await wxLogin({
					code: this.code, //用户微信CODE
				});
				console.log(val, '登录')
				if (val.result.userInfo) {
					if (val.result.userInfo.majorId) {
						const res = await getMajor({
							type: 0, //  0首页，1题库
						});
						res.result.forEach((rest) => {
							rest.wdResourcesMajorList.forEach((item) => {
								if (item.id == val.result.userInfo.majorId) {
									console.log(item)
									setMajorInfo(item)
								}
							})
						})
						const resde = await getMajor({
							type: 1, //  0首页，1题库
						});
						setMajorInfo2(resde.result[0].wdResourcesMajorList[0])
					}
				}

				if (val.result.token) {
					uni.setStorageSync('touristLogin', false)
					setToken(val.result.token);
					setUserInfo(val.result.userInfo);
					loginRecord({
						type: 3
					}).then(res => {}).catch(err => {})
					if (getMajorInfo().id) {
						console.log(1)

						let shareUrl = ''
						try {
							shareUrl = uni.getStorageSync('shareUrl')
						} catch (err) {}
						if (shareUrl) {
							console.log(shareUrl)
							uni.reLaunch({
								url: shareUrl
							})
						} else {
							var page = getCurrentPages().pop(); //当前页面
							console.log(page)
							if (page.route == "pagesA/videoRoom/videoRoom") {
								if (page.options.q) {
									var arr = decodeURIComponent(
										page.options.q
									)
									console.log(arr)
									let splitURL = arr.split("?")[1].split("&");

									for (var i = 0; i < splitURL.length; i++) {
										var searchkey = "";
										// 按照具体的参数字段查找
										if (splitURL[i].indexOf("isAss=") != -1) {
											this.isAss = splitURL[i].split("isAss=")[1];
											console.log(this.isAss, '0990')
										}
										if (splitURL[i].indexOf("resources=") != -1) {
											this.resources = splitURL[i].split("resources=")[1];
											console.log(this.resources)
										}
										if (splitURL[i].indexOf("resourcesType=") != -1) {
											this.resourcesType = splitURL[i].split("resourcesType=")[1];
											console.log(this.resourcesType)
										}
										if (splitURL[i].indexOf("template=") != -1) {
											this.template = splitURL[i].split("template=")[1];
											console.log(this.template)
										}
										if (splitURL[i].indexOf("mediaId=") != -1) {
											this.mediaId = splitURL[i].split("mediaId=")[1];
											console.log(this.mediaId)
										}

									}
									let obj = {
										resources: this.resources,
										isAss: this.isAss,
										resourcesType: this.resourcesType,
										template: this.template,
										mediaId: this.mediaId
									}

									uni.setStorageSync('resourLogin', obj)
									uni.reLaunch({
										url: `/${page.route}`
									})
								} else {
									uni.reLaunch({
										url: `${page.$page.fullPath}`
									})
								}

							} else {
								uni.reLaunch({
									url: `${page.$page.fullPath}`
								})
							}

							console.log(page.$page.fullPath)
						}

						// uni.navigateBack()
					} else {
						let shareUrl = ''
						try {
							shareUrl = uni.getStorageSync('shareUrl')
						} catch (err) {}
						if (shareUrl) {
							console.log(123)
							uni.reLaunch({
								url: shareUrl
							})
						} else {
							var page = getCurrentPages().pop(); //当前页面
							console.log(page)
							if (page.route == "pagesA/videoRoom/videoRoom") {
								if (page.options.q) {
									var arr = decodeURIComponent(
										page.options.q
									)
									console.log(arr)
									let splitURL = arr.split("?")[1].split("&");

									for (var i = 0; i < splitURL.length; i++) {
										var searchkey = "";
										// 按照具体的参数字段查找
										if (splitURL[i].indexOf("isAss=") != -1) {
											this.isAss = splitURL[i].split("isAss=")[1];
											console.log(this.isAss, '0990')
										}
										if (splitURL[i].indexOf("resources=") != -1) {
											this.resources = splitURL[i].split("resources=")[1];
											console.log(this.resources)
										}
										if (splitURL[i].indexOf("resourcesType=") != -1) {
											this.resourcesType = splitURL[i].split("resourcesType=")[1];
											console.log(this.resourcesType)
										}
										if (splitURL[i].indexOf("template=") != -1) {
											this.template = splitURL[i].split("template=")[1];
											console.log(this.template)
										}
										if (splitURL[i].indexOf("mediaId=") != -1) {
											this.mediaId = splitURL[i].split("mediaId=")[1];
											console.log(this.mediaId)
										}

									}
									let obj = {
										resources: this.resources,
										isAss: this.isAss,
										resourcesType: this.resourcesType,
										template: this.template,
										mediaId: this.mediaId
									}

									uni.setStorageSync('resourLogin', obj)
									uni.reLaunch({
										url: `/${page.route}`
									})
								} else {
									uni.reLaunch({
										url: `${page.$page.fullPath}`
									})
								}

							} else {
								uni.navigateTo({
									url: "/pagesA/setUpMajor/setUpMajor",
								});
							}
							// uni.navigateTo({
							// 	url: "/pagesA/setUpMajor/setUpMajor",
							// });
						}

					}
				} else {
					this.$emit('guanbi', true)
					// this.$nextTick(function() {
					this.phoneisAss = false
					this.phisAss = true
					// const pages = getCurrentPages(); //获取页面栈
					// console.log(pages, 141414)
					// pages[0].$vm.loginAss = true;
					// })
					// this.$set(this.phisAss,false, true)
					this.unionids = val.result.unionId
					this.openids = val.result.openId
					this.sessionKeys = val.result.sessionKey
					// uni.navigateTo({
					// 	url: `/pages/mobilePhone/mobilePhone?unionid=${val.result.unionid}&openid=${
					// 	val.result.openid
					//   }&sessionKey=${val.result.session_key}&info=${JSON.stringify(
					// 	data.userInfo
					//   )}`,
					// });
				}
				this.isLoading = false
			},
			// 授权
			async appLoginWx() {
				this.$emit('guanbi', false)
				// #ifdef H5
				uni.setStorageSync("ipfit", 1);
				const pages = getCurrentPages().pop(); //获取页面栈
				console.log(pages)
				console.log(inviteCode);
				let appid = this.$appid;
				let inviteCode = this.getQueryVariable("inviteCode") || "";
				let distributorId = this.getQueryVariable("id") || "";

				let redirect_uri =
					// `https%3A%2F%2Fwww.yanjiuchacha.com%2Fapi%2Fh53.0%2Findex.html%23%2F${encodeURIComponent(pages.route)}`
					"https%3A%2F%2Feducation.changyangdt.com%2FeducationH5%2F1.0%2Findex.html"

				//下面是第二种方式  如果上面的用不了就在试下面这个方式
				let url =
					"https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
					appid +
					"&redirect_uri=" +
					redirect_uri +
					"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
				let curUrl = url.replace(/#/g, `&v=${new Date().getTime()}#`);

				window.location.href = curUrl;

				//#endif
				//#ifdef MP-WEIXIN
				uni.setStorageSync("ipfit", 2);
				const that = this;
				if (this.isLoading == false) {
					this.isLoading = true
					uni.login({
						provider: "weixin",
						success: (res2) => {
							console.log(res2)
							that.code = res2.code;
						},
						fail: () => {
							uni.showToast({
								title: "微信登录授权失败",
								icon: "none",
							});
							that.isLoading = false
						},
					});
					uni.getUserProfile({
						desc: "正在获取", //不写不弹提示框
						success: function(res) {
							// 我的页面头像和名字在这里保存的，手机号授权页面的请求也会用到微信名和头像
							console.log(res, "正在获取");
							that.login(res);
						},
						fail: function(err) {
							uni.showToast({
								title: "微信登录授权失败",
								icon: "none",
							});
							that.isLoading = false
						},
					});
				}
				//#endif
			},
		},
	};
</script>

<style scoped lang="scss">
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
		padding-top: 100rpx;
	}

	/* 	.back-tankuang {
		width: 100%;
		height: 100%;
		background: rgba(51, 51, 51, 0.5);
	} */

	.autiosn {
		width: 50%;
		border-left: 1rpx solid #f1f1f1;
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
		/* text-align: center; */
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
		width: 611rpx;
		margin: 0 auto;
		border-bottom: 1rpx solid #f1f1f1;
		text-align: center;
		font-size: 36rpx;
		font-weight: 500;
		color: #999999;
		line-height: 110rpx;
		padding: 0 69rpx;
		margin-bottom: 40rpx;
	}

	.loginFlex {
		height: 110rpx;
		display: flex;
		align-items: center;
		/* margin-top: 50rpx; */
		/* justify-content: center; */
		/* border-top: 1rpx solid #f1f1f1; */
	}

	.action {
		position: absolute;
		top: 50%;
		left: 20rpx;
		transform: translate(0, -50%);
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
		/* padding: 0 20rpx; */
		padding-top: 70rpx;
		position: relative;
		width: 100%;
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

	.footer_tip1 {
		text-align: center;
		font-size: 24rpx;
		// color: #0191A0;
		color: $uni-primary;
	}
</style>