
<template>
	<view class="item-box" @click="goto(dataInfo)">
		<view class="item-boxflex">
			<view class="imgLft">
				<image :src="dataInfo.activityImage"  />
			</view>
			<view class="">
				<view class="title">
					<view class="serr-row">
						{{dataInfo.activityName}}
					</view>
					<image class="img2s" :src="imageUrl+'/xing/remen.png'"  />
				</view>
				<view class="title1 mar">
					<image class="img2" :src="imageUrl+'/xing/huodongdd.png'"  />
					<view class="">
						{{dataInfo.activityAddress}}
					</view>
				</view>
				<view class="title1 ">
					<image class="img1" :src="imageUrl+'/xing/huodong.png'"  />
					<view class="">
						{{dataInfo.activityTime}}
					</view>
				</view>
			</view>
			<view class="buttons">
				报名
			</view>
		</view>
	</view>


</template>
<script>
	export default {
		components: {},
		//接收参数
		props: {
			showLocal: {
				// 是否显示地址
				type: Boolean,
				default: false,
			},
			// 数据
			dataInfo: {
				type: Object,
				default: {},
			},
		},
		data() {
			//这里存放数据
			return {
				imageUrl: getApp().globalData.imageUrl,
				isDisplayPrice: '',
			};
		},
		computed: {},
		watch: {},
		mounted() {
			this.isDisplayPrice = uni.getStorageSync('isDisplayPrice')
		},
		//方法集合
		methods: {
			goto(data) {
				uni.navigateTo({
					url: "/pagesA/highEndCourse/highEndCourse?dataInfo=" + encodeURIComponent(JSON.stringify(this.dataInfo))
				});
			},
		},
	};
</script>
<style lang='scss' scoped>
	.buttons {
		width: 139rpx;
		height: 48rpx;
		background: linear-gradient(151deg, #FF5C02 0%, #FF8542 100%);
		border-radius: 24rpx;
		position: absolute;
		right: 28rpx;
		bottom: 16rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
	}

	.mar {
		margin-bottom: 25rpx;
	}

	.img2s {
		width: 61rpx;
		height: 35rpx;
		margin-left: 11rpx;
	}

	.img1 {
		width: 21rpx;
		height: 21rpx;
		margin-right: 11rpx;
	}

	.img2 {
		width: 19rpx;
		height: 24rpx;
		margin-right: 11rpx;
	}

	.title {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #282828;
		margin-bottom: 34rpx;
		display: flex;
		align-items: center;
	}

	.title1 {
		font-size: 22rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
		display: flex;
		align-items: center;
	}

	.imgLft {
		width: 250rpx;
		height: 160rpx;
		margin-right: 30rpx;

		image {
			width: 250rpx;
			height: 160rpx;
		}
	}

	.item-boxflex {
		display: flex;

	}

	.item-box {
		padding: 20rpx 20rpx;
		background: #ffffff;
		border-radius: 20rpx;
		position: relative;
	}
</style>