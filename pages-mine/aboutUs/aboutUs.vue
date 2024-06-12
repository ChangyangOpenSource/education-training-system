<template>
	<view>
		<view class="aboutUs-body">
			<view class="logo">
				<image :src="imageUrl + '/xing/logo.png'" style="width: 161rpx; height: 161rpx"/>
			</view>
			<view class="wendu">畅阳教培</view>
			<!-- #ifdef MP-WEIXIN -->
			<view class="edition">{{version_number || '1.0.0'}}</view>
			<!-- #endif -->
			<view class="website" @click="goto('https://changyangdt.com')">
				<view class="left">畅阳官网</view>
				<view class="right">
					<text class="wendu-url">www.changyangdt.com</text>
				</view>
			</view>
		</view>
		<view class="aboutUs-footer">
			<view classs="about-Info">
				<view class="afb">
					<view class="top">
						<text class="tips" @click="bannerGoto(data.registrationAgreement,'注册协议')">《注册协议》</text>
						<text class="tips" @click="bannerGoto(data.privacyAgreement,'隐私保护政策')">《隐私保护政策》</text>
					</view>
					<view class="bottom">洛阳畅阳网络科技提供技术支持</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		componentInfoBrief,
		getBrief
	} from '@/api/mine/about.js'
	export default {
		data() {
			return {
				loginAss: getApp().globalData.loginAss,
				imageUrl: getApp().globalData.imageUrl,
				// #ifdef MP-WEIXIN
				version_number: ''
				// #endif
			};
		},
		onLoad() {
			//#ifdef MP-WEIXIN
			const accountInfo = wx.getAccountInfoSync();
			this.version_number = accountInfo.miniProgram.version
			//#endif
		},
		onShow() {
			this.get_componentInfoBrief()
		},
		methods: {
			get_componentInfoBrief() {
				componentInfoBrief().then((res) => {
					this.data = res.result;
				})
			},
			bannerGoto(data, title) {
				let datas = JSON.stringify(data)
				uni.navigateTo({
					url: `/pagesA/nav/bannerInfo/xiangqiang?data=${encodeURIComponent(datas)}&title=${title}`
				})
			},
			goto(url) {
				uni.setClipboardData({
					data: url,
					success: function() {
						uni.showToast({
							title: '复制成功',
							icon:'none'
						})
					}
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	// 主体部
	.aboutUs-body {
		width: 100%;
		box-sizing: border-box;
		padding: 0 30rpx;
		height: calc(100vh - (var(--window-top)));
		background-color: #fff;

		.logo {
			width: 100%;
			height: 300rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.wendu {
			font-size: 46rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
			text-align: center;
			margin-bottom: 23rpx;
		}

		.edition {
			font-size: 34rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #999999;
			text-align: center;
		}

		.website {
			width: 100%;
			height: 106rpx;
			background: #ffffff;
			border-radius: 20rpx;
			margin-top: 93rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			padding: 0 20rpx;

			.left {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				margin-right: 36rpx;
			}

			.right {
				.wendu-url {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #999999;
					padding-right: 6rpx;
				}
			}
		}
	}

	.bgbgbg {
		position: absolute;
		width: 100%;
		height: 270rpx;
		bottom: 0;
	}

	// 底部
	.aboutUs-footer {
		width: 100%;
		height: 270rpx;
		position: absolute;
		bottom: 0;

		.about-Info {
			height: 100%;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.afb {
			margin-top: 140rpx;
		}

		.top {
			margin-bottom: 20rpx;
			text-align: center;

			.tips {
				color: $uni-primary;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
			}
		}

		.bottom {
			text-align: center;
			font-size: 22rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #000;
			text-align: center;
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
	}
</style>