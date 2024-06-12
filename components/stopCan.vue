<template>
	<view class="">
		<view class="stopCanBox">
			<view class="centerBox">
				<view class="title">
					提示
				</view>
				<image :src="imageUrl+'/home/stopCan.png'" mode=""></image>
				<view class="text">
					运营维护中
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		// props:['']
		data() {
			return {
				imageUrl: getApp().globalData.imageUrl,
			}
		},
	}
</script>

<style scoped lang="scss">
	.stopCanBox {
		position: fixed;
		z-index: 99999999;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(49, 49, 49, 0.1);

		.centerBox {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			// display: flex;
			// justify-content: center;
			// align-items: center;
			width: 488rpx;
			height: 523rpx;
			background: #FFFFFF;
			border-radius: 20rpx;
			background: #fff;

			.title {
				margin: 40rpx auto 0;
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				text-align: center;
			}

			image {
				margin: 17rpx auto 0;
				display: block;
				width: 396rpx;
				height: 260rpx;
			}

			.text {
				margin: 50rpx auto 0;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				text-align: center;
			}
		}
	}
</style>
