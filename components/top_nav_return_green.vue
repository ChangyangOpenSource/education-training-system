<template>
	<view class="top_nav_return">
		<view class="top_nav_title">
			<view class="imgbox" @click="backPage()">
				<image :src="imageUrl+'/icon/arrow_l_white.png'" mode=""></image>
			</view>
			<view class="">
				{{topNavTitle}}
			</view>
			<view class="imgbox">
				<!-- 占位，不要删除 -->
			</view>

		</view>
	</view>
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
				console.log(this.router)
				let pages = getCurrentPages(); //获取所有页面栈实例列表
				let nowPage = pages[pages.length - 1]; //当前页页面实例
				let prevPage = pages[pages.length - 2]; //上一页页面实例
				// prevPage.$vm.type = that
				// .stype; //修改上一页data里面的参数值
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
		padding-top: 110rpx;
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
		width: 59rpx;

		image {
			height: 36rpx;
			width: 19rpx;
		}
	}
</style>
