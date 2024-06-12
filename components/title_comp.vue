<template>
	<view>
		<view class="title-item" v-if="type === 1">
			<text class="two-row">{{ title }}</text>
		</view>

		<view class="title-item" v-else-if="type === 2">
			<text class="two-row">{{ title }}</text>
		</view>

		<view class="title-item" v-else-if="type === 3">
			<text class="two-row">{{ title }}</text>
		</view>
		<view class="title-item2" v-else-if="type === 4">
			<view class="two-row2">{{ title }}</view>
		</view>

		<view class="title-item" v-else>
			<text class="two-row">{{ title }}</text>
		</view>
	</view>


</template><script>
	export default {
		props: ["title", "type"],
	};
</script>

<style scoped lang="scss">
	.mars{
		margin-right: 17rpx;
	}
	.title-item {
		position: relative;
		width: 100%;
		height: 48rpx;
		font-size: 34rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		// text-indent: 20rpx;
		// margin-bottom: 21rpx;

		.title_img {
			position: absolute;
			width: 146rpx;
			height: 38rpx;
			bottom: 0;
			left: 0;
		}
	}

	.title-item2 {
		position: relative;
		width: 500rpx;
		// height: 48rpx;
		font-size: 32rpx;
		
		font-weight: bold;
		color: #333333;
		// text-indent: 20rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		// margin-bottom: 21rpx;

		.title_img {
			position: absolute;
			// width: 146rpx;
			width: 500rpx;
			height: 38rpx;
			bottom: 0;
			left: 0;
		}

		.two-row2 {
			width: 500rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
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
	}</style>
