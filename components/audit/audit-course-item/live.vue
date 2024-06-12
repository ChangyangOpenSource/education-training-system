

<template>
	<view class="list-item" @click="gotoCourseVideo(dataInfo)">
		<view class="item-top">
			<image class="head" :src="dataInfo.courseImgPath"></image>
			<image class="play" :src="imageUrl + '/static/learn/homeLive/功能.png'"></image>
			<view class="play-desc2">
				<image :src="imageUrl+'/xing/bfs.png'"  />
				{{ dataInfo.playCount }}次
			</view>
		</view>
		<view class="item-bottom two-row">
			{{ dataInfo.courseName }}
		</view>
		<view class="flsow">
			<view class="div">
				<image class="image" :src="imageUrl+'/xing/sp.png'" mode=""></image>
				<view class="zhib">
					视频
				</view>
			</view>
			<view class="div2" v-if="dataInfo.teacherName">
				{{dataInfo.teacherName}}
			</view>
		</view>
		<!-- <view class="play-desc"> {{ dataInfo.playCount }}次播放 </view> -->

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
		mounted() {},
		//方法集合
		methods: {
			gotoCourseVideo(data) {
				console.log(data, 'qweqweqweqwe')
				uni.setStorageSync('materials', data.materials)
				uni.navigateTo({
					url: "/pages/videoRoom/videoRoom?vid=" + data.vid + "&unitId=" + data.id + "&videoId=" + data
						.id + '&courseName=' + data.courseName + '&sourceType=' + data.sourceType,
				});
			},
		},
	};
</script>
<style lang='scss' scoped>
	.zhib {
		font-size: 20rpx;
		font-weight: bold;
		color: rgba(55, 135, 255, 1);
		margin-left: 4rpx;
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

	.flsow {
		display: flex;
		margin-left: 14rpx;
		margin-top: 10rpx;
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
				height: 208rpx;
			}
		}

		.item-bottom {
			height: 70rpx;
			font-size: 26rpx;
			color: #282828;
			font-weight: bold;
			margin-top: 17rpx;
			padding: 0rpx 10rpx;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;


		}

		.play-desc {
			font-size: 24rpx;
			color: #666666;
			font-weight: normal;
			padding-left: 10rpx;
			margin-top: 13rpx;
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
