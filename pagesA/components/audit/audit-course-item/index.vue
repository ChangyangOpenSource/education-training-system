
<template>
	<view class="list-item" @click="gotoCourseVideo(dataInfo)">
		<view class="item-top">
			<image class="head" :src="dataInfo.courseImgPath"></image>
			<image class="play" :src="imageUrl + '/static/learn/homeLive/功能.png'"></image>
			<view class="play-desc2">
				<image :src="imageUrl+'/xing/bfs.png'"   />
				{{ dataInfo.playCount ? dataInfo.playCount : '0'  }}次
			</view>
		</view>
		<view class="item-bottom one-row">
			{{ dataInfo.courseName }}
			
			<view class="flsow">
				<view class="div">
					<image class="image"  :src="imageUrl+'/xing/sp.png'"  mode=""></image>
					<view class="zhib">
						视频
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
		props: ["dataInfo"],
		data() {
			//这里存放数据
			return {
				imageUrl: getApp().globalData.imageUrl
			};
		},
		computed: {},
		watch: {},
		mounted() {
			console.log(this.dataInfo,'试听直播组件获取')
		},
		//方法集合
		methods: {
			gotoCourseVideo(data) {
				console.log(data, 'qweqweqweqwe')
				if(data.vid){
					uni.setStorageSync('materials', data.materials)
					uni.navigateTo({
						url: "/pages/videoRoom/videoRoom?vid=" + data.vid + "&unitId=" + data.id + "&videoId=" + data
							.id + '&courseName=' + data.courseName + '&sourceType='+data.sourceType,
					});
				}else {
					uni.showToast({
						title:'课程不存在',
						icon:'none'
					})
				}
				
			},
		},
	};
</script>
<style lang='scss' scoped>
	.list-item {
		width: 338rpx;
		height: 316rpx;
		margin-top: 20rpx;
		background: #ffffff;
		/* box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1); */
		border-radius: 10rpx;
		border-radius: 10rpx;
		overflow: hidden;
		/* border: 1px solid #E5E5E5; */

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
				height: 208rpx;
			}
		}

		.item-bottom {
			font-size: 28rpx;
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

	.flsow {
		display: flex;
		margin-top: 14rpx;
	}

	.list-box {
		padding: 0 30rpx;
		padding-bottom: 20rpx;
		display: flex;
		flex-wrap: wrap;

	}


	.list-item {
		margin-top: 20rpx;
		position: relative;

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

	.imagesize {
		width: 40rpx;
		height: 40rpx;
		margin-bottom: 16rpx;
	}

	.tianjia {
		width: 749rpx;
		height: 825rpx;
		background: #FFFFFF;
		position: fixed;
		bottom: 0rpx;
		z-index: 9999;
		padding-top: 56rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 50rpx 50rpx 0 0;
	}

	.tianjia-top {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
	}

	.tianjia-image {
		width: 134rpx;
		height: 134rpx;
		border-radius: 10rpx;
		margin-top: 39rpx;
	}

	.tianjia-top2 {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		margin-top: 22rpx;
	}

	.tianjia-top3 {
		width: 321rpx;
		height: 63rpx;
		background: #FE7D36;
		border-radius: 31rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		text-align: center;
		line-height: 63rpx;
		margin-top: 38rpx;
	}


	.tianjia-input {
		width: 545rpx;
		height: 101rpx;
		background: #E0E0E0;
		opacity: 0.6;
		border-radius: 20rpx;
		margin-top: 47rpx;
		font-size: 28px;
		font-family: PingFang SC;
		font-weight: 500;
		color: #2C2C2C;
		line-height: 101rpx;
		text-align: center;
	}

	.tianjia-top4 {
		width: 500rpx;
		height: 80rpx;
		background: #3B7BFF;
		border-radius: 40rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 80rpx;
		text-align: center;
		margin-top: 40rpx;
	}

	.quxia-tanjia {
		font-family: PingFang SC;
		font-weight: 500;
		color: #929292;
		font-size: 32rpx;
		text-align: center;
		height: 118rpx;
		width: 100%;
		border-top: 2px solid #EAEAEA;
		margin-top: 45rpx;
		line-height: 118rpx;
	}


	.bottom-fengxiang {
		width: 749rpx;
		height: 480rpx;
		background: #FFFFFF;
		position: fixed;
		bottom: 0rpx;
		z-index: 9999;
	}

	.quxiao {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #929292;
		text-align: center;
		margin-top: 29rpx;
	}

	.fengxiang-center-left {
		// margin-left: 164rpx;
		text-align: center;
		background: none;

		image {
			width: 102rpx;
			height: 102rpx;
		}

		.center-right-text {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			margin-top: 29rpx;
		}
	}

	.fengxiang-center-right {
		margin-right: 134rpx;
		text-align: center;
		background: none;

		image {
			width: 102rpx;
			height: 102rpx;
		}

		.center-right-text {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			margin-top: 29rpx;
		}
	}

	.bottom-fengxiang-center {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 280rpx;
		width: 690rpx;
		border-bottom: 1rpx solid #EAEAEA;
		margin: 0 auto;
	}

	.bottom-fengxiang-top {
		width: 690rpx;
		height: 100rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		margin: 0 auto;
		padding-top: 35rpx;
		border-bottom: 1px solid #EAEAEA;
		text-align: center;
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


	.zhib {
		font-size: 20rpx;
		font-weight: bold;
		color: rgba(55, 135, 255, 1);
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
		background: rgba(222, 240, 255, 1);
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.image {
		width: 23rpx;
		height: 17rpx;
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
			width: 12rpx;
			height: 15rpx;
			margin-right: 10rpx;
		}
	}

	.list-item {
		width: 268rpx;
		height: 342rpx;
		margin-top: 20rpx;
		background: #ffffff;
		/* box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1); */
		border-radius: 20rpx;
		overflow: hidden;

		.item-top {
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			width: 100%;
			height: 220rpx;
			border-bottom-left-radius: 10rpx;
			border-bottom-right-radius: 10rpx;
			background: #FFFFFF;

			// background: url("") center top / 100% 100%;
			.play {
				position: absolute;
				z-index: 10;
				width: 51rpx;
				height: 51rpx;
			}

			.head {
				position: absolute;
				width: 240rpx;
				height: 220rpx;
				border-radius: 15rpx;
				margin-top: 20rpx;
			}


			.head2 {
				position: absolute;
				width: 240rpx;
				border-radius: 15rpx;
				height: 220rpx;
				margin-top: 20rpx;
				-webkit-filter: blur(10rpx);
				-moz-filter: blur(10rpx);
				-o-filter: blur(10rpx);
				-ms-filter: blur(10rpx);
				filter: blur(10rpx)
			}
		}

		.item-bottom {
			font-size: 28rpx;
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
