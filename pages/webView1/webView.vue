<template>
	<view>
		<web-view id="webview" v-if="isAss" :src="channel"></web-view>
		<view v-show='loginAss' class="back-tankuang">
			<login class="loginw" @guanbi='guanbi' />
		</view>
	</view>


</template>
<script>
	import {
		addLearn,
		getCourseIsNoBuy
	} from '@/api/learn.js';
	import {
		getLiveUrl
	} from "@/api/homeAudition.js";
	import {
		courseRecord,
		querySaleShare,
		bindinDealer
	} from "@/api/login.js";
	import {
		getToken
	} from "@/common/util/index.js";
	export default {
		data() {
			return {
				loginAss: getApp().globalData.loginAss,
				channel: '',
				classid: '',
				courseId: '',
				unitId: '',
				videoId: '',
				isAss: false,
				liveCourseId: '',
				chu: false,
				pageArr2: []
			}
		},
		onUnload(data) {
			if (this.chu == false) {
				let shareUrl = uni.getStorageSync('shareUrl')
				if (shareUrl) {
					console.log(shareUrl)
					uni.reLaunch({
						url: shareUrl
					})
				} else {
					console.log(this.chu)
					console.log('销毁1')
					uni.removeStorageSync('pageArr');
					uni.removeStorageSync('thatPage');
					uni.removeStorage('pageArr')
					let aaa = getCurrentPages()
					aaa.forEach((res) => {
						if (res.route == 'pages/webView/webView') {
							res.options.chu = 'false'
						}
					})
					// uni.reLaunch({
					// 	url: '/pages/home/home?chu=false'
					// })
				}

			} else {
				uni.removeStorageSync('pageArr');
				uni.removeStorageSync('thatPage');
				uni.removeStorage('pageArr')
				uni.reLaunch({
					url: '/pagesA/tuijian/index?liveCourseId=' +
						this.liveCourseId
				})
			}

		},
		// onLoad(options) {
		onShow() {
			let aaa = getCurrentPages()
			console.log(aaa, 1234214)
			var scene = wx.getLaunchOptionsSync().scene; //获取场景值，判断是用哪种方式进入的小程序
			// var scene = 1047; //获取场景值，判断是用哪种方式进入的小程序
			// console.log(scene)

			if (scene != 1007 || scene != 1008 || scene != 1044 || scene != 1036 || scene != 1047 || scene != 1048) {
				aaa.forEach((res, index) => {
					if (res.route == "pages/webView/webView") {
						console.log(index)
						if (index != 0) {
							uni.setStorageSync('pagest', aaa[index - 1].$page.fullPath)
						}
					}
				})
			}
			//#ifdef H5
			let thatPage = {
				options: {}
			}
			//#endif


			//#ifdef MP-WEIXIN
			let thatPage
			//#endif
			aaa.forEach((res) => {
				if (res.route == "pages/webView/webView") {
					//#ifdef H5
					thatPage.options = JSON.parse(res.options.query)
					//#endif


					//#ifdef MP-WEIXIN
					thatPage = res
					//#endif
				}
			})

			if (uni.getStorageSync("pageArr")) {
				this.pageArr2 = uni.getStorageSync("pageArr")
				console.log(this.pageArr2)
			} else if (thatPage.options.scene) {
				let pageArr = decodeURIComponent(thatPage.options.scene).split('=')
				console.log(pageArr, 'pageArr')
				uni.setStorageSync('pageArr', pageArr)
			}


			let numReg = /^[0-9]*$/
			let numRe = new RegExp(numReg)
			let that = this
			console.log(thatPage, '登录')
			if (thatPage.options.liveCourseId) {
				this.liveCourseId = thatPage.options.liveCourseId
				console.log(35)
			} else {
				console.log(35)
				if (uni.getStorageSync("pageArr")) {
					this.pageArr2 = uni.getStorageSync("pageArr")
					this.liveCourseId = this.pageArr2[0]
					console.log(this.pageArr2, 35)
				}
			}
			if (thatPage.options.scene) {
				uni.setStorageSync('thatPage', thatPage.options)
			}
			var thatPages = uni.getStorageSync('thatPage')
			console.log(thatPages, 'scwwwww')

			if (thatPages.scene != undefined) {
				thatPage.options = thatPages
				console.log(thatPage, '大声道')
			} else {
				console.log(thatPages)
			}
			// uni.showModal({
			// 	content: JSON.stringify(thatPage.options.scene)
			// })
			// return
			try {
				console.log('token')
				var token = wx.getStorageSync('token')
				if (!token) {
					if (thatPage.options.scene) {
						this.setShareUrl({
							channel: thatPage.options.scene
						})
					} else {
						this.setShareUrl(thatPage.options)
					}
					return
				}

			} catch (e) {
				if (thatPage.options.scene) {
					this.setShareUrl({
						channel: thatPage.options.scene
					})
				} else {
					this.setShareUrl(thatPage.options)
				}
				return
			}
			try {
				this.isAss = true
				console.log(this.isAss)
				if (thatPage.options) {
					let userInfo = uni.getStorageSync('userInfos')
					if (thatPage.options.classid) this.classid = thatPage.options.classid

					if (!(/^[a-zA-Z]/.test(thatPage.options.scene))) {
						// let pageArr = decodeURIComponent(thatPage.options.scene).split('=')
						console.log(this.pageArr2, 'pageArr')
						courseRecord({

							courseId: this.pageArr2[0],
							isType: 2
						}).then(res => {}).catch(err => {})
					}
					if (thatPage.options.courseId) {
						this.courseId = thatPage.options.courseId
						courseRecord({

							courseId: thatPage.options.unitId,
							isType: 2
						}).then(res => {}).catch(err => {})
					}
					if (thatPage.options.videoId) {
						courseRecord({

							courseId: thatPage.options.videoId,
							isType: 2
						}).then(res => {}).catch(err => {})
					}
					if (thatPage.options.videoId) {
						console.log(thatPage.options.videoId)
						//video视频与在线的单元ID
						this.videoId = thatPage.options.videoId
						getCourseIsNoBuy(this.videoId).then(res => {
							if (res.result.liveCode) {
								that.liveCourseId = res.result.liveCode
							}
							if (res.result.isNoBuy == 1) {
								if (thatPage.options.scene) {
									let pageArr = decodeURIComponent(thatPage.options.scene).split('=')
									getLiveUrl({
										channelId: pageArr[1],
										userid: userInfo.id
									}).then(res => {
										console.log(res)
										// this.channel = res.result.url
									})
								} else {
									if (thatPage.options.channel) {
										// this.channel = 'https://b7130a8d0b.live.polyv.cn/watch/' + thatPage.options.channel
										getLiveUrl({
											channelId: thatPage.options.channel,
											userid: userInfo.id
										}).then(res => {
											console.log(res)
											this.channel = res.result.url
										})
									}
								}

							} else {

								console.log('用户点击确定');
								console.log(that.liveCourseId)
								if (that.liveCourseId != null && that.liveCourseId !=
									undefined) {
									console.log(123)
									that.chu = true
									// that.onUnload(true)
									uni.reLaunch({
										url: '/pagesA/tuijian/index?liveCourseId=' +
											that.liveCourseId
									})
								} else {
									// uni.switchTab({
									// 	url: '/pages/index/home'
									// })
									uni.reLaunch({
										url: '/pages/index/home'
									})
								}


							}
						})
					} else {
						console.log(/^[a-zA-Z]/.test(thatPage.options.scene) && thatPage.options.scene, '213213213')
						if (/^[a-zA-Z]/.test(thatPage.options.scene) && thatPage.options.scene) {
							// let pageArr = decodeURIComponent(thatPage.options.scene).split('=')
							console.log(thatPage.options.scene, 'scene')
							let data = {
								saleShareId: thatPage.options.scene
							}
							console.log(data, 'data')
							querySaleShare(data).then((res) => {
								console.log(res.result.distributionId)
								let dasr = res.result.distributionId + ''
								let id = decodeURIComponent(res.result.channel).split('=')
								console.log(id, '视频id')
								courseRecord({
									courseId: id[0],
									isType: 2
								}).then(res => {}).catch(err => {})
								bindinDealer(data).then(res => {
									console.log(res)
								}).catch((err) => {
									console.log(err)
								})
								getLiveUrl({
									channelId: id[1],
									userid: userInfo.id
								}).then(res => {
									console.log(res.result.url, '视频地址')
									this.channel = res.result.url
								})
							}).catch((err) => {
								console.log(err)
							})
						} else if (thatPage.options.scene) {
							// if (uni.getStorageSync("pageArr")) {
							// 	let pageArr = uni.getStorageSync("pageArr")
							// } else {
							// 	let pageArr = decodeURIComponent(thatPage.options.scene).split('=')
							// }
							getCourseIsNoBuy(this.pageArr2[0]).then(res => {
								if (res.result.liveCode) {
									that.liveCourseId = res.result.liveCode
								}
								if (res.result.isNoBuy == 1) {
									// let pageArr = decodeURIComponent(thatPage.options.scene).split('=')
									getLiveUrl({
										channelId: this.pageArr2[1],
										userid: userInfo.id
									}).then(res => {
										console.log(res)
										this.channel = res.result.url
									})
								} else {

									console.log('用户点击确定');
									console.log(that.liveCourseId)
									if (that.liveCourseId != null && that.liveCourseId !=
										undefined) {
										console.log(123)
										that.chu = true
										uni.reLaunch({
											url: '/pagesA/tuijian/index?liveCourseId=' +
												that.liveCourseId
										})
									} else {
										// uni.switchTab({
										// 	url: '/pages/index/home'
										// })
										uni.reLaunch({
											url: '/pages/index/home'
										})
									}

								}
							})

						} else {
							console.log(123, '金收入')
							if (thatPage.options.channel) {
								getLiveUrl({
									channelId: thatPage.options.channel,
									userid: userInfo.id
								}).then(res => {

									this.channel = res.result.url
								})
							}
						}

					}
					if (thatPage.options.unitId) {
						this.unitId = thatPage.options.unitId
						this.addLearn()
					}
				} else {
					uni.switchTab({
						url: '../home/home'
					})
				}
			} catch (e) {}

			try {
				uni.removeStorageSync('shareUrl')
			} catch (e) {
				// error
			}
		},
		methods: {
			guanbi(value) {
				if (value != true) {
					this.loginAss = value
					this.isAss = true
				} else {
					this.loginAss = true
					this.isAss = false
				}

			},
			setShareUrl(options) {
				try {
					let shareUrl = "/pages/webView/webView?"
					if (options.channel) shareUrl += 'channel=' + options.channel + '&'
					if (options.videoId) shareUrl += 'videoId=' + options.videoId + '&'
					uni.setStorageSync('shareUrl', shareUrl)
					console.log('新deng')
					this.loginAss = true
					this.isAss = false
					return
				} catch (e) {
					// error
				}
			},
			addLearn() {
				let uid = uni.getStorageSync('userInfos');
				if (uid && uid.id) {
					let data = {
						classesId: this.classid,
						courseId: this.courseId,
						studentId: uid.id,
						unitId: this.unitId,
						learnState: 1
					};
					addLearn(data).then(res => {
						console.log(res)
					})
				}

			},
		}
	}
</script>

<style scoped lang="scss">
	#webview {
		max-width: 100%;
		max-height: 100%;
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
