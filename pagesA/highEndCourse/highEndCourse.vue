<!-- 高端面授班详情 -->
<template>
	<view class="bg">
		<view class="top">
			<image :src="isDisplayPrice.activityImage"  />
		</view>
		<view class="center">
			<view class="flexs">
				<view class="title">
					{{isDisplayPrice.activityName}}
				</view>
				<image class="img2s" :src="imageUrl+'/xing/remen.png'"  />
			</view>
			<view class="title1">
				{{isDisplayPrice.activityTitle}}
			</view>
			<view class="flexs">
				<view class="flexs">
					<image class="img1" :src="imageUrl+'/xing/huodong.png'"  />
					<view class="title2">
						{{isDisplayPrice.activityTime}}
					</view>
				</view>
				<view class="flexs mar">
					<image class="img2" :src="imageUrl+'/xing/huodongdd.png'"  />
					<view class="title2">
						{{isDisplayPrice.activityAddress}}
					</view>
				</view>
			</view>
		</view>


		<!-- 头部 -->
		<view class="header_d">
			<!-- 富文本star -->
			<rich-text :nodes="isDisplayPrice.activityDetail"></rich-text>
		</view>

		<view class="footerCon">
			<view class="myBtn" @click="onErwm(1)"> 开始报名 </view>
		</view>



		<!-- open，扫码开课模式弹窗 op -->
		<div class="popup-buy" v-if="popupBuyState == true">
			<div class="popup-buy-bg"></div>
			<div class="popup-buy-img">
				<!-- <div class="title">该课程暂未解锁</div> -->
				<div class="qrcode">
					<image :show-menu-by-longpress="true" :src="popupBuyInfo.qrCode"></image>
				</div>
				<div class="text"> 请长按识别二维码联系老师开课 </div>
				<image :src="imageUrl +'/home/uni15.png'"  class="close-icon" @click="onErwm(2)" />
			</div>
		</div>
		<view v-show='loginAss' class="back-tankuang">
			<login class="loginw" @guanbi='guanbi' />
		</view>
	</view>


</template>
<script>
	import DialogView from "@/pagesA/components/popUp.vue";
	import {
		componentInfoBrief
	} from '@/api/mine/about.js'
	export default {
		components: {
			DialogView,
		},
		data() {
			return {
				loginAss: getApp().globalData.loginAss,
				imageUrl: getApp().globalData.imageUrl,
				popupBuyState: false,
				classesDetailObj: {},
				courseId: "",
				isDisplayPrice: '',
				popupBuyInfo: {}, // 开课弹窗返回信息
			};
		},
		// 上个页面传下来的值，小程序不能用$route获取参数
		onLoad(props) {
			console.log(props, "传参");
			if (props.dataInfo) {
				let data= decodeURIComponent(props.dataInfo)
				this.isDisplayPrice =JSON.parse(data)
				console.log(this.isDisplayPrice, "传参");
				this.isDisplayPrice.activityDetail = this.isDisplayPrice.activityDetail.replace(/\<img/g,
					'<image style="max-width: 100% !important;height:auto;display:block"');
			}
		},
		mounted() {
			this.onSHOWS()
		},
		methods: {
			onSHOWS() {
				componentInfoBrief().then((res) => {
					console.log('机构信息返回值:', res);
					if (res.code == 200) {
						this.popupBuyInfo = res.result;
					}
				})
			},
			onErwm(val) {
				if (val == 1) {
					this.popupBuyState = true
				} else {
					this.popupBuyState = false
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.popup-buy {
		.popup-buy-bg {
			position: fixed;
			z-index: 990; //99999
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
			// background: #ccc;
			background-image: url($fileBaseUrl + '/home/uni14.png');
			// background-image: url($fileBaseUrl + '/home/uni21.png');
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
				margin: 260rpx auto 0;
				width: 230rpx;
				height: 230rpx;
				background: #FFFFFF;
				border-radius: 10rpx;

				image {
					width: 100%;
					height: 100%;
				}

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

	.mar {
		margin-left: 41rpx;
	}

	.title {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 800;
		color: #282828;
	}

	.title1 {
		margin-top: 34rpx;
		margin-bottom: 33rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #555555;

	}

	.title2 {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
	}

	.center {
		width: 100%;
		background: #FFFFFF;
		box-shadow: 0rpx 4rpx 19rpx 2rpx rgba(214, 214, 214, 0.17);
		border-radius: 20rpx;
		padding: 28rpx 0 23rpx 27rpx;
	}

	.flexs {
		display: flex;
		align-items: center;
	}

	.top {
		width: 709rpx;
		height: 300rpx;
		margin-bottom: 21rpx;

		image {
			width: 709rpx;
			height: 300rpx;
		}
	}

	.img2s {
		width: 61rpx;
		height: 35rpx;
		margin-left: 11rpx;
	}

	.img1 {
		width: 21rpx;
		height: 21rpx;
		margin-right: 11rpx;
	}

	.img2 {
		width: 19rpx;
		height: 24rpx;
		margin-right: 11rpx;
	}

	.bg {
		background: #fafafa;
		padding: 24rpx 20rpx 200rpx;
	}

	.CourseItemBox {
		padding: 20rpx 0;
		background: #ffffff;
		box-shadow: 0rpx 2rpx 8rpx 0rpx rgba(0, 0, 0, 0.2);
		border-radius: 20rpx;
	}

	.mar-botom {
		margin-top: 30rpx;
	}

	.leftCon {

		padding: 20rpx;
		width: 110rpx;
		border-left: 1rpx solid #f3f3f3;
		border-right: 1rpx solid #f3f3f3;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #ffffff;
		margin: 0;

		.phoneImg {
			width: 47rpx;
			height: 47rpx;
		}
	}

	.price2 {
		font-size: 28rpx;
		text-decoration: line-through;
		color: #999999;
		text-align: center;
		margin-left: 16rpx;
	}

	.fuwenben {
		width: 100%;
	}

	// 头部 富文本 -->
	.header_d {
		position: relative;
		margin-top: 25rpx;
		// height: 430rpx;
		width: 100%;

		.rowFlex {
			position: fixed;
			top: 20rpx;
			z-index: 10;
			width: 100%;
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.title {
				color: #ffffff;
				font-size: 36rpx;
				font-weight: bold;
				margin-left: 30%;
			}
		}

		.fenxiang {
			width: 46rpx;
			height: 46rpx;
			margin: 30rpx 20rpx 20rpx;
		}

		.lunbotu {
			width: 100%;
			height: 100%;
		}
	}

	.contents {
		box-sizing: border-box;
		padding: 10rpx 30rpx 150rpx;
		background-color: #fff;

		.teacher-list {
			.swiper-item {
				width: 100%;
				height: 220rpx;
				background: #ffffff;
				border: 1px solid #f2f2f2;
				box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(0, 0, 0, 0.2) inset;
				border-radius: 20rpx;
				margin-top: 30rpx;

				.item-content {
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 100%;
					height: 100%;
					box-sizing: border-box;
					padding: 20rpx;

					.item-left {
						height: 132rpx;
						width: 132rpx;

						.item-left-img {
							width: 100%;
							border-radius: 50%;
							height: 100%;
						}
					}

					.item-right {
						width: 500rpx;
						text-align: left;

						.teacher-name {
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: bold;
							margin-bottom: 22rpx;

							.t1 {
								color: #333333;
								margin-right: 20rpx;
							}

							.t2 {
								color: #666666;
							}
						}

						.teacher-detail {
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #999999;
						}
					}
				}
			}
		}

		.booksCon {
			margin-bottom: 130rpx;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.bookCard {
				width: 334rpx;
				height: 460rpx;
				margin-bottom: 30rpx;
				background: #ffffff;
				box-shadow: 0rpx 2rpx 8rpx 0rpx rgba(0, 0, 0, 0.2);
				border-radius: 10rpx;

				.bookBottomCon {
					width: 100%;
					padding: 15rpx;
					height: 126rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: flex-start;

					.bookTitle {
						font-size: 28rpx;
						font-weight: bold;
						color: #333333;
					}

					.bookPrice {
						font-size: 32rpx;
						font-weight: bold;
						color: #fa642c;
					}
				}

				.bookTopCon {
					width: 334rpx;
					height: 334rpx;
					border-bottom: 1rpx dashed #999999;
					position: relative;

					.bookImg {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}

	.footerCon {
		width: 100%;
		height: 120rpx;
		background-color: #ffffff;
		box-shadow: 0rpx 2rpx 8rpx 0rpx rgba(0, 0, 0, 0.2);
		// padding: 0 40rpx;
		padding: 10rpx 40rpx 30rpx 40rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.leftCon {
			padding: 20rpx;
			width: 100%;
			border-left: 1rpx solid #f3f3f3;
			border-right: 1rpx solid #f3f3f3;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.phoneImg {
				width: 47rpx;
				height: 47rpx;
			}
		}

		.priceCon {
			font-size: 30rpx;
			font-weight: bold;
			color: #333333;

			.price {
				margin-right: 10rpx;
				font-size: 40rpx;
				color: #fa642c;
			}
		}

		.myBtn {
			width: 100%;
			height: 80rpx;
			border-radius: 40rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 32rpx;
			font-weight: bold;
			color: #ffffff;
			background-color: #3d7dff;
			background: linear-gradient(89deg, #FF8849 0%, #FF5E04 100%);
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