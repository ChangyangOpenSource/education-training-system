// home首页的组件
<template>
	<view class="major-box" @click="goto">
		<view class="major-box2">
			{{ name }}
		</view> 
		<image class="major-icon" :src="imageUrl+'/xing/right.png'" ></image>
	</view>



</template>
<script>
	export default {
		name: "major-select",
		props: ["name"],
		data() {
			return {
				imageUrl: getApp().globalData.imageUrl
			};
		},
		methods: {
			goto() {
				this.$emit("goto");
			},
		},
	};
</script>

<style scoped lang="scss">
	.major-box {
		display: flex;
		align-items: center;
		font-size: 28rpx;

		color: #FFFFFF;
	}

	.major-box2 {
		min-height: 40rpx;
		background-color: RGBA(255, 93, 3, 1);
		border-radius: 10rpx 0 0rpx 10rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
		display: flex;
		align-items: center;
	}

	.major-icon {
		width: 47rpx;
		height: 40rpx;
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
