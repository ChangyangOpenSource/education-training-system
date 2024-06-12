<template>
	<view>
		<!-- <web-view id="webview" v-if="isAss" :src="channel"></web-view> -->
		<view v-show='loginAss' class="back-tankuang">
			<login class="loginw" @guanbi='guanbi' />
		</view>
	</view>
</template>

<script>
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
				liveCourseId: ''
			}
		},
		// onUnload() {
		// 	console.log('8972')
		// 	if(this.liveCourseId){
		// 		uni.reLaunch({
		// 			url: '/pagesA/tuijian/index?liveCourseId=' +
		// 				this.liveCourseId
		// 		})
		// 	}else{
		// 		uni.reLaunch({
		// 			url: '/pages/home/home?chu=false'
		// 		})
		// 	}

		// },
		// onLoad(optios){
		// 	console.log(optios)
		// 	if(optios){
		// 		this.liveCourseId = optios.liveCourseId
		// 	}
		// },
		onShow() {
			let aaa = getCurrentPages()
			//#ifdef H5
			let thatPagese = aaa[aaa.length - 1];
			let thatPage = {
				options: {}
			}
			thatPage.options = JSON.parse(aaa[aaa.length - 1].options.query)
			//#endif
			//#ifdef MP-WEIXIN
			let thatPage = aaa[aaa.length - 1];
			//#endif
			// console.log(thatPage, 'chucu')
			if (thatPage.options.liveCourseId) {
				this.liveCourseId = thatPage.options.liveCourseId
			}

			if (uni.getStorageSync("pageArr")) {
				this.pageArr2 = uni.getStorageSync("pageArr")
				// console.log(this.pageArr2)
			} else if (thatPage.options.scene) {
				let pageArr = decodeURIComponent(thatPage.options.scene).split('=')
				// console.log(pageArr, 'pageArr')
				uni.setStorageSync('pageArr', pageArr)
			}


			// var scene = 1047; //获取场景值，判断是用哪种方式进入的小程序
			var scene = wx.getLaunchOptionsSync().scene; //获取场景值，判断是用哪种方式进入的小程序
			// console.log(scene, 123)
			// console.log(thatPage, 456)
			// console.log(aaa, 789)
			if (scene == 1007 || scene == 1008 || scene == 1044 || scene == 1036 || scene == 1047 || scene == 1048) {
				if (thatPage.options.chu == 'false') {
					uni.reLaunch({
						url: '/pages/index/home?chu=false'
					})
				} else {
					var token = wx.getStorageSync('token')
					if (token) {
						// console.log(9879)
						uni.navigateTo({
							url: '/pages/webView1/webView?scene=' + thatPage.options.scene
						})
					} else {
						// let shareUrl = "/pages/webView/webView?"
						// if (thatPage.options.scene) shareUrl += 'channel=' + thatPage.options.scene + '&'
						// uni.setStorageSync('shareUrl', shareUrl)
						this.loginAss = true
					}
				}
			} else {
				// console.log(aaa, 23)
				// console.log(thatPage, 23)
				if (thatPage.options.chu == 'false') {
					var length = 0
					var learnlength = 0
					var livelength = 0
					var lives = 0
					var livewsw = 0
					aaa.forEach((res) => {
						if (res.route == 'pagesA/audit-course-list/index') {
							length += 1
						}
						if (res.route == 'pagesA/audit-live-list/index') {
							livelength += 1
						}
						if (res.route == 'pages/learn/index') {
							learnlength += 1
						}
						if (res.route == 'pages-learn/courseDetail/courseDetail') {
							lives += 1
						}
						if (res.route == 'pagesA/curriculumDetail/index') {
							livewsw += 1
						}
					})
					if (length >= 1) {
						uni.reLaunch({
							url: '/pagesA/audit-course-list/index'
						})
					} else if (livelength >= 1) {
						uni.reLaunch({
							url: '/pagesA/audit-live-list/index'
						})
					} else if (lives >= 1) {
						// aaa.forEach((res) => {
						// 	if (res.route == 'pages-learn/courseDetail/courseDetail') {
						uni.navigateBack({
							delta: 1,
						});
						// 	}
						// })
					} else if (learnlength >= 1) {
						aaa.forEach((res) => {
							if (res.route == 'pages/webView/webView') {
								if (res.options.activemenu == '2') {
									//直播计划
									uni.reLaunch({
										url: '/pages/learn/index?activemenu=2'
									})
								} else {
									uni.navigateBack({
										delta: 1,
									});
								}
							}
						})
					} else {
						uni.reLaunch({
							url: '/pages/index/home?chu=false'
						})
					}
				} else {
					// console.log(thatPage.options, 23)
					uni.navigateTo({
						url: `/pages/webView1/webView?channel=${thatPage.options.channel}&videoId=${thatPage.options.videoId}&liveCourseId=${thatPage.options.liveCourseId}`
					})
				}
				// aaa.forEach((res) => {
				// 	if (res.route == 'pagesA/audit-course-list/index') {
				// 		uni.reLaunch({
				// 			url: '/pagesA/audit-course-list/index'
				// 		})
				// 	}
				// })
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
		}
	}
</script>

<style scoped lang="scss">
	#webview {
		max-width: 100%;
		max-height: 100%;
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
