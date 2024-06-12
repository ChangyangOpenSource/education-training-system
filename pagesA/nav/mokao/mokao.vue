<template>
	<view class="bg">
		<view class="top_nav_return">
			<view class="top_nav_title">
				{{topNavTitle}}
				<view class="imgbox">
					<image :src="imageUrl+'/icon/arrow_l_white.png'" mode=""></image>
					<view class="returnbox" @click="goLastPage()"></view>
				</view>
			</view>
		</view>
		<image :src="imageUrl+'/questionBank/static/image/mokaobg.png'"  class="imgbg" />
		<view class="text1">
			欢迎来到模拟机考
		</view>
		<view class="text2">
			请选择考试类型
		</view>
		<view class="btn1 btn" @click="goLastPage()">
			护理
		</view>
		<view class="btn1 btn" @click="goLastPage()">
			医师
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				topNavTitle: '',
				imageUrl: getApp().globalData.imageUrl,
			}
		},
		methods: {
			goLastPage() {
				uni.navigateBack()
			}
		}
	}
</script>

<style scoped lang="scss">
	.bg {
		height: 100%;
		width: 100%;
		overflow: hidden;
	}

	.imgbg {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		z-index: -1;
		height: 103%;
		width: 103%;
	}

	.text1 {
		overflow: hidden;
		margin-top: 226rpx;
		text-align: center;
		white-space: nowrap;
		font-size: 56rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		text-shadow: 0px 3rpx 7rpx rgba(130, 130, 130, 0.35);
	}

	.text2 {
		margin: 70rpx auto 0 auto;
		width: auto;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		text-align: center;
	}

	.btn {
		width: 578rpx;
		height: 99rpx;
		line-height: 99rpx;
		text-align: center;
		background: #FFFFFF;
		opacity: 0.95;
		border-radius: 10px;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #0191A0;
	}

	.btn1 {
		margin: 0 auto;
		margin-top: 90rpx;

	}

	.btn2 {
		margin: 0 auto;
		margin-top: 45rpx;
	}
	
	.returnbox {
		position: absolute;
		top: -15rpx;
		left: -15rpx;
		height: 60rpx;
		width: 70rpx;
		// border:1px red solid;
	}
	.top_nav_return {
		position: fixed;
		z-index: 10;
		top: 0;
		left: 0;
		width: 100vw;
		padding-top: 90rpx;
		padding-bottom: 30rpx;
		background-color: #178895;
		color: #fff;
	}
	
	.top_nav_title {
		position: relative;
		text-align: center;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
	}
	
	.imgbox {
		position: absolute;
		z-index: 10;
		top: 0;
		left: 30rpx;
		height: 36rpx;
		display: flex;
		justify-content: start;
	
		image {
			height: 36rpx;
			width: 19rpx;
		}
	}
</style>
