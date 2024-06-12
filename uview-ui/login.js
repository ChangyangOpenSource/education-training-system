import {
	wxLogin,
	bindinMajor
} from "@/api/login.js";
import {
	getMajor
} from "@/api/professionalChoice.js";
import {
	setUserInfo,
	setToken,
	getMajorInfo,
	setMajorInfo
} from "@/common/util/index.js";
var codes = ''


export function appLoginWx() {
	uni.login({
		provider: "weixin",
		success: (res2) => {
			console.log(res2)
			codes = res2.code;
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
			wxLogin({
				code: codes,
				type: "1",
			}).then((val) => {
				console.log(val, '登录')
				if (val.result.userInfo) {
					if (val.result.userInfo.majorId) {
						getMajor().then((res) => {
							res.result.forEach((rest) => {
								rest.wdResourcesMajorList.forEach((item) => {
									if (item.id == val.result.userInfo
										.majorId) {
										console.log(item)
										setMajorInfo(item)

										if (val.result.token) {
											setToken(val.result.token);
											setUserInfo(val.result
											.userInfo);
											if (getMajorInfo().id) {

												let shareUrl = ''
												try {
													shareUrl = uni
														.getStorageSync(
															'shareUrl')
												} catch (err) {}
												if (shareUrl) {
													uni.reLaunch({
														url: shareUrl
													})
												} else {

													var page =
														getCurrentPages()
														.pop(); //当前页面
													uni.reLaunch({
														url: `/${page.route}`
													})
													console.log(page.route)

												}
											} else {
												let shareUrl = ''
												try {
													shareUrl = uni
														.getStorageSync(
															'shareUrl')
												} catch (err) {}
												if (shareUrl) {
													console.log(123)
													uni.reLaunch({
														url: shareUrl
													})
												} else {
													uni.navigateTo({
														url: "/pagesA/setUpMajor/setUpMajor",
													});
												}

											}
										} else {
											// uni.showModal({
											// 	title: '提示',
											// 	content: '为了给您提供更好的服务,需授权手机号',
											// 	success: function(res) {
											// 		if (res.confirm) {
											// 			console.log(res);
											// 			appLoginWx()
											// 		} else if (res.cancel) {
											// 			console.log('用户点击取消');
											// 		}
											// 	}
											// });
											// uni.navigateTo({
											// 	url: `/pages/mobilePhone/mobilePhone?unionid=${val.result.unionid}&openid=${val.result.openid}&sessionKey=${val.result.session_key}&info=${JSON.stringify(data.userInfo)}`,
											// });
										}
									}
								})
							})
						})

					}
				}
			})


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


// // 登录
// 			getPhoneNumber(e) {
// 				this.$emit('guanbi', false)
// 				// const that = this;
// 				if (e.detail.errMsg === "getPhoneNumber:ok") {
// 					uni.login({
// 						provider: "weixin",
// 						success: (res) => {
// 							console.log(e)
// 							this.lastStep(e.detail);

// 						},
// 						fail: () => {
// 							uni.showToast({
// 								title: "微信登录授权失败",
// 								icon: "none",
// 							});
// 						},
// 					});
// 				} else {
// 					uni.showToast({
// 						title: "获取手机授权失败",
// 						icon: "none",
// 					});
// 				}
// 			},
