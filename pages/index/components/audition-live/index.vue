
<template>
	<view class="">
		<view class="paddingse" v-if="auditionLiveArr.length > 0">
			<HomeTitle title="直播预告" type="6" showListen @onMore="onMore" v-if="auditionLiveArr.length > 0" />
			<view class="list-box" v-if="auditionLiveArr.length > 0">
				<view class="list-item" v-for="(item, index) in auditionLiveArr" :key="item.id"
					@click="lookLive(item, index)">
					<!-- <AuditLiveItem :dataInfo="item" /> -->
				</view>
			</view>
			<!-- <image style="width: 310rpx;height: 280rpx;margin: 40rpx auto;display: block;" v-else
				:src="imageUrl + '/oss/1_1632274541287.png'" mode="">
			</image> -->
			<view v-show='loginAss' class="back-tankuang">
				<login class="loginw" @guanbi='guanbi' />
			</view>
		</view>
	</view>
</template>
<script>
	import HomeTitle from "../home-title/indexse.vue";
	// import AuditLiveItem from "@/pagesA/components/audit/audit-live-item/index.vue";
	import {
		getAuditionLive,
		getTemplateId,
		reserveLive,
		getLiveUrl,
		findByLivePreview,
		findByNotBuyClasses
	} from "@/api/homeAudition.js";
	export default {
		props: {
			type: {
				type: Number,
				default: 1,
			},
			majorId: {
				type: [Number, String],
				default: 1,
			},
		},
		data() {
			return {
				imageUrl: getApp().globalData.imageUrl,
				loginAss: getApp().globalData.loginAss,
				auditionLiveArr: [],
				pageInfo: {
					majorId: this.majorId,
					pageNo: 1,
					pageSize: 2,
				},
			};
		},
		components: {
			HomeTitle,
			// AuditLiveItem,
		},

		mounted() {
			// this.getAll(this.pageInfo);
			// console.log(getLiveUrl)
		},
		methods: {
			guanbi(value) {
				this.loginAss = value
			},
			async lookLive(data, index) {
				console.log(data)
				if (data.unlock.unlockType != 9 && data.unlock.isUnLock == 0) {
					this.$emit('onERnd', data)
				} else {
					uni.setStorageSync('materials', data.materials)

					if (data.liveClassroomStatus == 1) {
						let token = uni.getStorageSync('token')
						if (!token) {
							this.loginAss = true
							// uni.navigateTo({
							// 	url: '/pages/login/login'
							// })
							return
						}
						//未开播，可设置提醒（微信订阅消息）
						console.log(data.isAgree != 1)
						if (data.isAgree != 1) {
							getTemplateId({
								type: 1
							}).then(res => {
								if (res.result && res.result[0]) {
									this.SubscribeMessage(res.result[0].templateId, data, index)
								} else {
									uni.showToast({
										title: '订阅失败',
										icon: 'none'
									})
								}
							})
						} else {
							//待在线，进入观看
							// uni.setStorageSync('materials', data.materials)
							uni.reLaunch({
								url: '/pages/webView/webView?channel=' + data.channel + '&videoId=' + data.id +
									'&liveCourseId=' + data.liveCourseId
							})
						}
					} else if (data.liveClassroomStatus == 2 && data.channel) {
						//在线中，进入观看
						// getLiveUrl().then(liveUrl => {
						// 	console.log(liveUrl)
						// })
						uni.setStorageSync('materials', data.materials)
						uni.navigateTo({
							url: '/pages/webView/webView?channel=' + data.channel + '&videoId=' + data.id +
								'&liveCourseId=' + data.liveCourseId
						})
					} else if (data.liveClassroomStatus == 4) {
						//在线结束可回放
						uni.navigateTo({
							url: '/pages/webView/webView?channel=' + data.channel + '&videoId=' + data.id +
								'&liveCourseId=' + data.liveCourseId
						})
						// console.log(data)
						// if (data.vid) {
						// 	uni.setStorageSync('materials', data.materials)
						// 	uni.navigateTo({
						// 		url: '/pages/videoRoom/videoRoom?vid=' + data.vid+'&videoId='+data.id+'&courseName='+data.courseName
						// 	})
						// } else {
						// 	uni.showToast({
						// 		title: '回放内容不存在',
						// 		icon: 'none'
						// 	});
						// }

					} else {
						uni.showToast({
							title: '回放未生成',
							icon: 'none'
						});
					}
				}
			},



			SubscribeMessage(tId, data, index) {
				console.log(tId, 1)
				console.log(data, 1)
				console.log(index, 1)
				const that = this;
				wx.requestSubscribeMessage({
					tmplIds: [tId],
					success(res) {
						console.log(res)
						if (res[tId] == 'accept') {
							reserveLive({
								videoId: data.id
							}).then(success => {
								if (success.code == 200) {
									wx.showToast({
										title: '预约成功',
										icon: 'none'
									})
									that.auditionLiveArr[index].isAgree = 1
								} else {
									wx.showToast({
										title: success.message,
										icon: 'none'
									})
								}
								//待在线，进入观看
								console.log(data, 999999)
								uni.setStorageSync('materials', data.materials)
								// uni.navigateTo({
								// 	url: '/pages/webView/webView?channel=' + data.channel +
								// 		'&videoId=' + data.id + '&liveCourseId=' + data.liveCourseId
								// })
							})
						} else {
							//待在线，进入观看
							uni.setStorageSync('materials', data.materials)
							uni.navigateTo({
								url: '/pages/webView/webView?channel=' + data.channel + '&videoId=' +
									data.id + '&liveCourseId=' + data.liveCourseId
							})
						}
					},
					fail() {
						//待在线，进入观看
						uni.setStorageSync('materials', data.materials)
						uni.navigateTo({
							url: '/pages/webView/webView?channel=' + data.channel + '&videoId=' + data.id +
								'&liveCourseId=' + data.liveCourseId
						})
					}
				})
			},
			onMore() {
				uni.navigateTo({
					url: "/pagesA/audit-live-list/index",
				});
			},
			async getAll() {
				let data = {
					majorId: this.pageInfo.majorId,
					pageNo: this.pageInfo.pageNo,
					pageSize: this.pageInfo.pageSize,
				}
				const res = await findByLivePreview(data);
				console.log(res.result, "执行");
				this.auditionLiveArr = res.result.records;
			},
		},
	};
</script>

<style scoped lang="scss">
	.paddingse {
		padding: 40rpx 20rpx 0;
	}

	.list-box {
		// padding: 0 30rpx;
		display: flex;
		justify-content: space-between;

		.list-item {
			// width: 100%;
			margin-top: 20rpx;
			// display: flex;
		}
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
