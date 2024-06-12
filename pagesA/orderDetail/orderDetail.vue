<!-- // 订单详情 -->
<template>
	<view class="bg">
		<!-- 顶部 -->
		<cu-custom :isBack="true" style="color: #000; background-color: #fff" :fW="'bold'">
			<block slot="content">订单详情</block>
		</cu-custom>
		<!-- 步骤 -->
		<view class="steps">
			<view class="steps-content">
				<image :src="imageUrl + '/home/uni11.png'"  class="steps-bg" />
				<view class="step-title">等待卖家发货</view>
				<view class="step-body">
					<!-- 步骤组件 -->
					<div :class="{'ed':stepIndex >= 0 }">
						<div class="step-new-1">
							<div class="step-new-2">
								<div class="step-new-3">1</div>
							</div>
						</div>
						<div class="step-text">买家付款</div>
					</div>
					<div class="step-hr" :class="{'ed':stepIndex >= 0 }"></div>
					<div :class="{'ed':stepIndex >= 1 }">
						<div class="step-new-1">
							<div class="step-new-2">
								<div class="step-new-3">2</div>
							</div>
						</div>
						<div class="step-text">等待发货</div>
					</div>
					<div class="step-hr" :class="{'ed':stepIndex >= 1 }"></div>
					<div :class="{'ed':stepIndex >= 2 }">
						<div class="step-new-1">
							<div class="step-new-2">
								<div class="step-new-3">3</div>
							</div>
						</div>
						<div class="step-text">交易完成</div>
					</div>
				</view>
			</view>
		</view>
		<!-- 主体 -->
		<view class="body-content">
			<!-- 商品信息 -->
			<view class="commodity-information">
				<view class="card">
					<view class="public-title">商品信息</view>
					<!-- ============= -->
					<view class="course">
						<image :src="orderDetail.classesEntity.classesCover" class="course-img">
						</image>
						<view class="right">
							<view class="topl">{{orderDetail.classesEntity.classesDescribe}}</view>
							<view class="bottoml" v-if="orderDetail.gmqd != 2">
								<text class="b1" v-if="orderDetail.sfje == 0">免费班</text>
								<text class="b1" v-else>￥{{orderDetail.sfje || 0.00}}</text>
							</view>
							<view class="bottoml" v-if="orderDetail.gmqd == 2">
								<text class="b1">￥{{orderDetail.classesSalesEntity.fficialPrice || 0.00}}</text>
							</view>
						</view>
					</view>
					<!-- ============= -->
				</view>
			</view>
			<!-- 收货信息 -->
			<view class="receiving-information" v-if="orderDetail.orderAreaName">
				<view class="card">
					<view class="public-title">收货信息</view>
					<view class="receiving-body">
						<view class="receiving-text">
							<view class="t-2">
								<div>收</div>
								<text class="t-2-1">{{orderDetail.orderAreaName}} </text>
								<div>
									<image :src="imageUrl + '/home/uni12.png'"  />
									<!-- <image src="@/static/home/uni12.png"  /> -->
								</div>
								<text class="t-2-2">{{orderDetail.orderAreaPhone}}</text>
							</view>
							<view class="t-1">{{orderDetail.orderAreaAddress}}</view>

						</view>
					</view>
				</view>
			</view>
			<!-- 			<view class="receiving-information" v-if="orderDetail.orderAreaName">
				<view class="card">
					<view class="public-title">收货信息</view>
					<view class="receiving-body">
						<image :src="imageUrl + '/static/mine/place.png'" class="receiving-img">
						</image>
						<view class="receiving-text">
							<view class="t-1">{{orderDetail.orderAreaAddress}}</view>
							<view class="t-2">
								<text class="t-2-1">收件人：{{orderDetail.orderAreaName}} </text>
								<text class="t-2-2">联系电话：{{orderDetail.orderAreaPhone}}</text>
							</view>
						</view>
					</view>
				</view>
			</view> -->
			<!-- 订单信息 -->
			<view class="order-information">
				<view class="card">
					<view class="public-title">订单信息</view>
					<view class="order-body">
						<!-- -------------------------------- -->
						<view class="order-item">
							<text class="order-label">订单号：</text>
							<text class="label-text">{{orderDetail.id}}</text>
						</view>
						<!-- -------------------------------- -->
						<view class="order-item">
							<text class="order-label">下单时间：</text>
							<text class="label-text">{{orderDetail.createTime}}</text>
						</view>
						<!-- -------------------------------- -->
						<!-- <view class="order-item">
							<text class="order-label">支付方式：</text>
							<text class="label-text">微信支付</text>
						</view> -->
						<!-- -------------------------------- -->
						<!-- <view class="order-item">
							<text class="order-label">订单金额：</text>
							<text class="label-text">{{orderDetail.sfje}}</text>
						</view> -->
						<!-- -------------------------------- -->
						<!-- <view class="order-item">
							<text class="order-label">订单优惠：</text>
							<text class="label-text-m">-0.00</text>
						</view> -->
						<!-- -------------------------------- -->
						<view class="order-item">
							<text class="order-label">实付金额：</text>
							<text class="label-text-m" v-if="orderDetail.gmqd == 2">线下购课</text>
							<text class="label-text-m" v-else-if="orderDetail.gmqd == 6">课程兑换</text>
							<text class="label-text-m" v-else>￥{{orderDetail.sfje || 0.00}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部 -->
		<!-- <view class="footerx">
			<button class="viewLogistics">查看物流</button>
			<button class="confirmReceipt">确认收货</button>
		</view> -->
		<view v-show='loginAss' class="back-tankuang">
			<login class="loginw" @guanbi='guanbi' />
		</view>
	</view>


</template>
<script>
	import Steps from "@/pagesA/components/u-steps/u-steps.vue";
	import {
		getOrderDetail
	} from "@/api/mine.js"
	export default {
		components: {
			Steps,
		},
		data() {
			return {
				stepIndex: 0,
				loginAss: getApp().globalData.loginAss,
				imageUrl: getApp().globalData.imageUrl,
				orderId: '',
				orderDetail: null,
				numList: [{
						name: "买家付款",
					},
					{
						name: "等待发货",
					},
					{
						name: "交易完成",
					},
				],
			};
		},
		onLoad(options) {
			this.orderId = options.orderId
			this.getOrderDetail()
		},
		methods: {
			guanbi(value) {
				this.loginAss = value
			},
			getOrderDetail() {
				getOrderDetail({
					id: this.orderId
				}).then(res => {
					console.log(res, '订单详情')
					this.orderDetail = res.result
					if (this.orderDetail.status) {
						this.stepIndex = Number(this.orderDetail.status)
					}
					console.log(this.stepIndex, '订单进行状态')
				})
			}
		},
	};
</script>

<style lang="scss" scoped>
	.ed {
		opacity: 0.6;
	}

	.bg {
		// background: #fafafa;
		// min-height: 100%;
	}

	.body-content {
		box-sizing: border-box;
		display: inline-block;
		width: 100%;
		margin-bottom: 120rpx;
		position: absolute;

	}

	// 公用标题
	.public-title {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		padding-bottom: 20rpx;
		margin-bottom: 30rpx;
		border-bottom: 1px solid #EEEEEE;

		// padding-left: 10rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;

		// &::before {
		// 	content: "";
		// 	height: 32rpx;
		// 	width: 6rpx;
		// 	background-color: #3d7dff;
		// 	border-radius: 10rpx;
		// 	display: block;
		// 	margin-right: 10rpx;
		// }
	}

	.card {
		width: 100%;
		background: #ffffff;
		box-shadow: 0rpx 2rpx 20rpx 0rpx rgba(165, 165, 165, 0.2);
		border-radius: 16rpx;
		box-sizing: border-box;
		padding: 30rpx;
	}

	// 步骤区
	.steps {
		width: 100%;
		height: 341rpx;
		// margin-bottom: 20rpx;
		position: absolute;
		// top: 176rpx;
		left: 0;

		.steps-content {
			position: relative;
			width: 100%;
			height: 100%;
			box-sizing: border-box;

			padding: 20rpx;


			.steps-bg {
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				z-index: -2;
			}

			.step-title {
				font-size: 34rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #FFFFFF;
			}

			.step-body {

				margin-top: 20rpx;
				padding: 0 55rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.step-hr {
					width: 107rpx;
					// height: 1rpx;
					border: 1px dashed #FFDCC9;
					transform: translateY(-20rpx);
				}

				.step-text {
					margin-top: 10rpx;
					text-align: center;
					// width: 94rpx;
					// height: 24rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					// opacity: 0.6;

				}

				.step-new-1 {
					width: 98rpx;
					height: 98rpx;
					border: 2px solid #FFDCC9;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;

					>div {
						width: 81rpx;
						height: 81rpx;
						background: #FFDCC9;
						border-radius: 50%;
						display: flex;
						align-items: center;
						justify-content: center;

						>div {
							display: flex;
							align-items: center;
							justify-content: center;
							width: 56rpx;
							height: 56rpx;
							background: #FFFFFF;
							box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(165, 59, 0, 0.35);
							border-radius: 50%;
							font-size: 32rpx;
							font-family: JLinXin;
							font-weight: 400;
							color: #FF8541;
						}
					}
				}
			}
		}
	}

	// 商品信息
	.commodity-information {
		// margin-top: 260rpx;
		// margin-bottom: 20rpx;
		margin: 260rpx 30rpx 20rpx;

		.course {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			box-sizing: border-box;
			padding-bottom: 30rpx;
			// margin-bottom: 39rpx;
			border-bottom: 1rpx solid #ddd;

			&:last-of-type {
				border: none;
				margin: 0;
			}

			.course-img {
				width: 270rpx;
				height: 154rpx;
				border-radius: 10rpx;
			}

			.right {
				height: 100%;
				margin-left: 37rpx;
				width: 425rpx;

				.topl {
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
					margin-bottom: 60rpx;
				}

				.bottoml {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.b1 {
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: $uni-primary;
					}


					.b2 {
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #666666;
					}
				}
			}
		}
	}

	// 收货信息
	.receiving-information {
		margin: 0 30rpx 20rpx;
		// margin-bottom: 20rpx;


		.receiving-body {
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.receiving-img {
				width: 45rpx;
				height: 45rpx;
			}

			.receiving-text {

				.t-1 {
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #666666;
					line-height: 40rpx;

				}

				.t-2 {
					display: flex;
					align-items: center;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
					margin-bottom: 24rpx;

					>div {
						margin-right: 12rpx;
						width: 46rpx;
						height: 36rpx;
						background: #FFEDE8;
						border-radius: 6rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: $uni-primary;

						>image {
							width: 20rpx;
							height: 20rpx;
						}
					}


					.t-2-1 {
						margin-right: 30rpx;
					}
				}
			}
		}
	}

	// 订单信息
	.order-information {

		margin: 0 30rpx;

		.order-body {
			.order-item:last-child {
				margin-bottom: 0 !important;
			}

			.order-item {
				// padding: 20rpx 0;
				margin-bottom: 44rpx;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 500;

				.order-label {
					color: #666;
				}

				.label-text {
					color: #333;
				}

				.label-text-m {
					color: #fa632b;
				}
			}
		}
	}

	// 底部区
	.footerx {
		width: 100%;
		height: 100rpx;
		background: #ffffff;
		box-shadow: 0 0 20rpx 0rpx rgba(0, 0, 0, 0.2);
		position: fixed;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: flex-end;

		.confirmReceipt {
			width: 180rpx;
			height: 65rpx;
			padding: 0;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
			border-radius: 32rpx;
			line-height: 2.1;
			background-color: #3d7dff;
			border: 2px solid #3d7dff;
			color: #fff;
			margin: 0 30rpx;

			&::after {
				border: none;
			}
		}

		.viewLogistics {
			width: 180rpx;
			height: 65rpx;
			padding: 0;
			margin: 0;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
			border-radius: 32rpx;
			line-height: 2.1;
			background-color: #fff;
			border: 2px solid #ddd;

			&::after {
				border: none;
			}
		}
	}
</style>
