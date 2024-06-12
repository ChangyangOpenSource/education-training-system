<template>
	<cover-view class="top_nav_return">
		<cover-view class="top_nav_title">
			<cover-view class="imgbox">
				<cover-image :src="imageUrl+'/icon/arrow_l_white.png'" mode="" class="img-return"></cover-image>
				<cover-view class="returnbox" @click="backPage()"></cover-view>
			</cover-view>
			<cover-view class="">
				{{topNavTitle}}
			</cover-view>
			<cover-view class="">
				<!-- 占位，不要删除 -->
			</cover-view>

		</cover-view>
	</cover-view>
</template>

<script>
	export default {
		//	topNavTitle	导航标题
		props: ['topNavTitle'],
		data() {
			return {
				imageUrl: getApp().globalData.imageUrl,
			}
		},
		methods: {
			backPage() {
				let pages = getCurrentPages(); //获取所有页面栈实例列表
				let nowPage = pages[pages.length - 1]; //当前页页面实例
				let prevPage = pages[pages.length - 2]; //上一页页面实例
				uni.navigateBack({ //uni.navigateTo跳转的返回，默认1为返回上一级
					delta: 1
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.returnbox {
		position: absolute;
		top: -15rpx;
		left: -15rpx;
		height: 60rpx;
		width: 70rpx;
	}

	.top_nav_return {
		position: fixed;
		z-index: 10;
		top: 0;
		left: 0;
		width: 100vw;
		padding-top: 90rpx;
		padding-bottom: 30rpx;
		background-color: $uni-primary;
		color: #fff;
	}

	.top_nav_title {
		position: relative;
		text-align: center;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.imgbox {
		position: relative;
		display: flex;
		align-items: center;
		.img-return{
			height: 36rpx;
			width: 19rpx;
		}
		// image {
		// 	height: 36rpx;
		// 	width: 19rpx;
		// }
	}
</style>
