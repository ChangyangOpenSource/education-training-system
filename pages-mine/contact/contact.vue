<template>
	<view class="main">
		<image :src="imageUrl+'/home/uni17.png'" mode="aspectFit"></image>
		<view class="text">畅阳教培考试在线客服为您服务</view>
		<button type="default" open-type="contact">立即咨询</button>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				loginAss: getApp().globalData.loginAss,
				imageUrl: getApp().globalData.imageUrl,
			};
		}
	}
</script>

<style scoped lang="scss">
	.main {
		width: 100%;
		height: 100vh;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 100rpx;
	}

	image {
		width: 70%;
	}

	view {
		font-size: 28rpx;
		color: #333333;
		padding: 40rpx 0 12rpx;
	}

	button {
		width: 70%;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 40rpx;
		color: #ffffff;
		font-size: 32rpx;
		background: #ff6108;
	}
</style>
