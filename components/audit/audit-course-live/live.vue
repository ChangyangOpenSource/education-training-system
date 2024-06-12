
<template>
	<view class="list-item" @click="gotoCourseVideo(dataInfo,index)">
		<view class="item-top">
			<image
				:class="{head2:dataInfo.unlock.unlockType!=9 && dataInfo.unlock.isUnLock == 0,head:dataInfo.unlock.isUnLock != 0}"
				:src="dataInfo.teacherImagePhoto">
			</image>
			<view @click.stop="onIsAss(dataInfo)" v-if="dataInfo.unlock.unlockType!=9 && dataInfo.unlock.isUnLock == 0"
				class="live-boxs remind-box">
				<image class="imagesize" :src="imageUrl+'/static/learn/homeLive/锁.png'" mode=""></image>
				解锁后观看
			</view>
			<image v-else class="play" :src="imageUrl+'/static/learn/homeLive/功能.png'"></image>
			<view class="play-desc2">

				<image :src="imageUrl+'/xing/yanj.png'"   />
				{{ dataInfo.playCount }}次
			</view>


			<view class="div2s">
				<!-- <image class="image" src="@/static/直播.png" mode=""></image> -->
				<image class="imgs2" :src="imageUrl+'/xing/zgsw.png'"  mode=""></image>
			</view>
		</view>

		<view class="item-bottom two-row">
			<view class="heis">
				{{ dataInfo.liveClassroomName }}
			</view>
			<!-- <view class="play-desc"> {{ dataInfo.playCount }}次播放 </view> -->
			<view class="flsow">
				<view class="div">
					<image class="image" :src="imageUrl+'/xing/zhibo.png'"  mode=""></image>
					<view class="zhib">
						直播
					</view>
				</view>
				<view class="div2" v-if="dataInfo.teacherName">
					{{dataInfo.teacherName}}
				</view>
			</view>

		</view>

	</view>


</template>
<script>
	export default {
		components: {},
		//接收参数
		props: ["dataInfo", 'index'],
		data() {
			//这里存放数据
			return {
				imageUrl: getApp().globalData.imageUrl,
			};
		},
		computed: {},
		watch: {},
		mounted() {
			console.log(this.dataInfo, 85)
		},
		//方法集合
		methods: {
			onIsAss(data) {
				this.$emit('onERnd', data)
			},
			async gotoCourseVideo(data, index) {
				console.log(data)
				if (data.unlock.unlockType != 9 && data.unlock.isUnLock == 0) {
					this.$emit('onERnd', data)
				} else {
					uni.setStorageSync('materials', data.materials)

					if (data.liveClassroomStatus == 1) {
						let token = uni.getStorageSync('token')
						if (!token) {
							this.loginAss = true

							return
						}
						//未开播，可设置提醒（微信订阅消息）
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
							uni.navigateTo({
								url: '/pages/webView/webView?channel=' + data.channel + '&videoId=' + data.id +
									'&liveCourseId=' + data.id
							})
						}
					} else if (data.liveClassroomStatus == 2 && data.channel) {
						//在线中，进入观看

						uni.setStorageSync('materials', data.materials)
						uni.navigateTo({
							url: '/pages/webView/webView?channel=' + data.channel + '&videoId=' + data.id +
								'&liveCourseId=' + data.id
						})
					} else if (data.liveClassroomStatus == 4) {
						//在线结束可回放
						uni.navigateTo({
							url: '/pages/webView/webView?channel=' + data.channel + '&videoId=' + data.id +
								'&liveCourseId=' + data.id
						})

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
								uni.navigateTo({
									url: '/pages/webView/webView?channel=' + data.channel +
										'&videoId=' + data.id + '&liveCourseId=' + data.id
								})
							})
						} else {
							//待在线，进入观看
							uni.setStorageSync('materials', data.materials)
							uni.navigateTo({
								url: '/pages/webView/webView?channel=' + data.channel + '&videoId=' + data
									.id + '&liveCourseId=' + data.id
							})
						}
					},
					fail() {
						//待在线，进入观看
						uni.setStorageSync('materials', data.materials)
						uni.navigateTo({
							url: '/pages/webView/webView?channel=' + data.channel + '&videoId=' + data.id +
								'&liveCourseId=' + data.id
						})
					}
				})
			},

		},
	};
</script>
<style lang='scss' scoped>
	.heis {
		height: 70rpx;
	}

	.zhib {
		font-size: 20rpx;
		font-weight: bold;
		color: rgba(241, 89, 42, 1);
		margin-left: 4rpx;
	}

	.div2 {
		width: 107rpx;
		height: 34rpx;
		background: rgba(86, 212, 198, 0.42);
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 22rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #0CD8C2;
		margin-left: 14rpx;
	}

	.div {
		width: 107rpx;
		height: 34rpx;
		background: #FFECE3;
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.image {
		width: 22rpx;
		height: 14rpx;
	}

	.flsow {
		display: flex;
		margin-top: 10rpx;
	}

	.play-desc2 {
		padding: 5rpx 10rpx;
		position: absolute;
		bottom: 5rpx;
		background: rgba(49, 49, 49, 0.6);

		border-radius: 18rpx;
		right: 27rpx;
		font-size: 20rpx;
		font-weight: bold;
		color: #FFFFFF;

		image {
			width: 19rpx;
			height: 15rpx;
			margin-right: 10rpx;
		}
	}

	.imagesize {
		width: 40rpx;
		height: 40rpx;
		margin-bottom: 16rpx;
	}

	.live-boxs {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 208rpx;
		/* margin-left: -60rpx; */
		/* margin-top: -20rpx; */
		font-size: 24rpx;
		font-weight: bold;
		color: #FFFFFF;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}



	.div2s {
		width: 41rpx;
		height: 41rpx;
		position: absolute;
		top: 15rpx;
		left: 16rpx;

		.imgs2{
			width: 41rpx;
			height: 41rpx;

		}
	}




	.list-item {
		width: 338rpx;
		height: 350rpx;
		margin-top: 20rpx;
		background: #ffffff;
		/* box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1); */
		border-radius: 10rpx;
		border-radius: 10rpx;
		overflow: hidden;

		.item-top {
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			width: 100%;
			height: 208rpx;
			border-bottom-left-radius: 10rpx;
			border-bottom-right-radius: 10rpx;

			// background: url("") center top / 100% 100%;
			.play {
				position: absolute;
				z-index: 10;
				width: 51rpx;
				height: 51rpx;
			}

			.head {
				position: absolute;
				width: 208rpx;
				height: 208rpx;
			}

			.head2 {
				position: absolute;
				width: 208rpx;
				height: 208rpx;
				-webkit-filter: blur(10rpx);
				-moz-filter: blur(10rpx);
				-o-filter: blur(10rpx);
				-ms-filter: blur(10rpx);
				filter: blur(10rpx)
			}
		}

		.item-bottom {
			font-size: 26rpx;
			color: #282828;
			font-weight: bold;
			padding: 20rpx 10rpx 5rpx;

			.play-desc {
				font-size: 24rpx;
				color: #666666;
				font-weight: normal;
				margin-top: 5rpx;
			}
		}

		.play-desc {
			font-size: 24rpx;
			color: #666666;
			font-weight: normal;
			padding-left: 10rpx;
			margin-top: 7rpx;
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
