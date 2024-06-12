<template>
	<view class="bg">
		<!-- <top_nav_return :topNavTitle="topNavTitle" :returnState="true"></top_nav_return> -->
		<top_nav_return_green :topNavTitle="topNavTitle"></top_nav_return_green>
		<!-- 		<view class="contnet" v-html="info.content"> </view> -->
		<view class="contnet" v-html="html_img">

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				topNavTitle: '详情',
				info: {},
				html_img: ''
			}
		},
		onLoad(option) {
			console.log('onLoad', option)
			let data = decodeURIComponent(option.data)
			this.info = JSON.parse(data)
			if (this.info.content) {
				this.html_img = this.info.content.replace(/\<img/g,
					'<image style="max-width: 100% !important;height:auto;display:block"');
			}
			console.log('轮播图详情页接受的数据:', this.info);
		},
		methods: {
			backPage() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bg{
		background: #fafafa;
		min-height: 100%;
	}
	.contnet {
		margin-top: 170rpx;
		overflow: hidden;
		padding: 30rpx;
	}
</style>
