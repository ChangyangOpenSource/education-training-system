<template>
	<view class="">
		<view class="typeCon typeCon-1" v-if="item.learningPhase == '1'">{{item.learningPhaseText}}阶段</view>
		<view class="typeCon typeCon-2" v-else-if="item.learningPhase == '2'">{{item.learningPhaseText}}阶段</view>
		<view class="typeCon typeCon-3" v-else-if="item.learningPhase == '3'">{{item.learningPhaseText}}阶段</view>
		<view class="typeCon typeCon-4" v-else-if="item.learningPhase == '4'">{{item.learningPhaseText}}阶段</view>
		<view class="typeCon typeCon-5" v-else-if="item.learningPhase == '5'">{{item.learningPhaseText}}阶段</view>
		<view class="typeCon typeCon-6" v-else-if="item.learningPhase == '6'">{{item.learningPhaseText}}阶段</view>
		<view class="typeCon typeCon-6" v-else-if="item.learningPhase == '6'">{{item.learningPhaseText}}阶段</view>
	</view>
</template>

<script>
	export default {
		props: ['item']
	}
</script>

<style scoped lang="scss">
	.typeCon-1 {
		background: linear-gradient(0deg, #DBA17A 0%, #C89181 100%);
		color: #FFFFFF;
	}

	.typeCon-2 {}

	.typeCon-3 {}

	.typeCon-4 {}

	.typeCon-5 {}

	.typeCon-6 {}

	.typeCon {
		// width: 106rpx;
		padding: 0 10rpx;
		height: 34rpx;
		line-height: 34rpx;
		background: linear-gradient(0deg, #DBA17A 0%, #C89181 100%);
		border-radius: 8rpx;
		font-size: 22rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}
</style>
