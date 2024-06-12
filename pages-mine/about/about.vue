<template>
	<view class="bg">
		<view class="logo">
			<image :src="data.logoUrl" />
		</view>
		<view class="title"> {{data.title || ''}} </view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="v"> {{version_number || '1.0.0'}} </view>
		<!-- #endif -->
		<view class="text" v-html="htmlText"> </view>
		<view class="footer">
			<view class="footer_tip1">
				<text @click="bannerGoto(data.registrationAgreement,'注册协议')">《注册协议》</text>
				<text @click="bannerGoto(data.privacyAgreement,'隐私保护政策')">《隐私保护政策》</text>
			</view>
			<view class="footer_tip2">
				<image :src="imageUrl + '/xing/cy_logo_grey.png'" />洛阳畅阳网络科技有限公司提供技术支持
			</view>
		</view>
	</view>
</template>

<script>
	import {
		componentInfoBrief,
	} from '@/api/mine/about.js'
	import {
		getToken,
		getMajorInfo
	} from '@/common/util/index.js'
	export default {
		data() {
			return {
				data: {},
				imageUrl: getApp().globalData.imageUrl,
				topNavTitle: '关于我们',
				htmlText: "",
				// #ifdef MP-WEIXIN
				version_number: ''
				// #endif
			}
		},
		onLoad() {
			//#ifdef MP-WEIXIN
			const accountInfo = uni.getAccountInfoSync();
			this.version_number = accountInfo.miniProgram.version // 小程序 版本号
			//#endif
		},
		onShow() {
			this.get_componentInfoBrief()
		},
		methods: {
			bannerGoto(data, title) {
				let datas = JSON.stringify(data)
				uni.navigateTo({
					url: `/pagesA/nav/bannerInfo/xiangqiang?data=${encodeURIComponent(datas)}&title=${title}`
				})
			},
			get_componentInfoBrief() {
				componentInfoBrief().then((res) => {
					this.data = res.result;
					if (this.data.description) {
						this.htmlText = this.data.description.replace(/\<img/g,
							'<image style="max-width: 100% !important;height:auto;display:block"');
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.bg {
		padding-top: 50rpx;
	}

	.logo {
		width: 180rpx;
		height: 180rpx;
		margin: 80rpx auto 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 20rpx;

		image {
			width: 100rpx;
			height: 100rpx;
		}
	}

	.title {
		margin-top: 20rpx;
		text-align: center;
		font-size: 40rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #132B2E;
	}

	.v {
		text-align: center;
		margin-top: 25rpx;
		font-size: 34rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
	}

	.text {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
		margin: 60rpx 55rpx 0 55rpx;
	}

	.footer {
		position: fixed;
		bottom: 0;
		left: 50%;
		width: 500rpx;
		transform: translateX(-50%);
		font-family: PingFang-SC-Medium;
		font-weight: 500;

		.footer_tip1 {
			text-align: center;
			font-size: 24rpx;
			color: $uni-primary;
		}

		.footer_tip2 {
			margin-top: 20rpx;
			margin-bottom: 45rpx;
			text-align: center;
			font-size: 20rpx;
			color: #B2B9BA;
			display: flex;
			align-items: center;
			justify-content: center;

			image {
				width: 25rpx;
				height: 25rpx;
				margin-right: 13rpx;
			}
		}
	}
</style>