/**
 * 机构二维码弹窗
 */

<template>
	<view class="popup-buy">
		<view class="popup-buy-bg"></view>
		<view class="popup-buy-img">
			<view class="title">{{title}}</view>
			<view class="qrcode">
				<image :show-menu-by-longpress="true" :src="componentInfoBriefData.qrCode" @click="previewImage" />
			</view>
			<view class="text"> {{description}} </view>
			<image class="close-icon" :src="imageUrl +'/home/uni15.png'" @click="onClose" />
		</view>
	</view>
</template>
<script>
	import {
		componentInfoBrief
	} from '@/api/mine/about.js'
	export default {
		props: {
			title: {
				type: String,
				default: '提示'
			},
			description: {
				type: String,
				default: '请长按或截图识别二维码联系老师'
			},
		},
		data() {
			return {
				imageUrl: getApp().globalData.imageUrl,
				componentInfoBriefData: {}, // 机构信息
			}
		},
		created() {
			componentInfoBrief().then((res) => {
				if (res.code == 200) {
					this.componentInfoBriefData = res.result;
				}
			})
		},
		mounted() {

		},
		methods: {
			previewImage() {
				uni.previewImage({
					urls: [this.componentInfoBriefData.qrCode]
				})
			},
			onClose() {
				this.$emit('onClose')
			},
		},
	};
</script>

<style lang="scss" scoped>
	.popup-buy {
		.popup-buy-bg {
			position: fixed;
			z-index: 990;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: rgba(61, 61, 61, 0.7);
		}

		.popup-buy-img {
			position: fixed;
			z-index: 991;
			left: 50%;
			top: 40%;
			transform: translate(-50%, -50%);
			width: 580rpx;
			height: 647rpx;
			background-image: url($fileBaseUrl + '/home/uni14.png');
			background-size: contain;
			background-position: center;
			background-repeat: no-repeat;

			.close-icon {
				position: absolute;
				bottom: -80rpx;
				left: 50%;
				transform: translateX(-50%);
				width: 55rpx;
				height: 55rpx;
			}

			.title {
				margin-top: 208rpx;
				text-align: center;
				font-size: 34rpx;
				font-family: PingFang SC;
				font-weight: 800;
				color: #FFFFFF;
				text-shadow: 0px 0px 25rpx rgba(159, 82, 47, 0.22);
			}

			.qrcode {
				margin: 36rpx auto 0;
				width: 230rpx;
				height: 230rpx;
				background: #FFFFFF;
				border-radius: 10rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.text {
				margin-top: 45rpx;
				text-align: center;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			}
		}
	}
</style>