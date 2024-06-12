<template>
	<view class="payOrder">
		<!-- 顶部 -->
		<view class="payContent">
			<!-- 课程订单信息 -->
			<view class="d-card" v-if="payInfo.classesName">
				<view class="public-title">课程内容 </view>
				<view class="course-info">
					<image :src="payInfo.classesCover" class="course-info-img"></image>
					<view class="Info">
						<view class="info-1">{{ payInfo.classesName }}</view>
						<view class="info-2" v-if="val.length!=0">￥{{ val.fficialPrice | amounts }}</view>
						<view class="info-2" v-else>￥{{ payInfo.classesTypeList[0].lineFficialPrice | amounts }}</view>
						<view class="courseBtn" v-if="val.length!=0">
							<button class="activebtn btns">
								{{ val.classesTypeName }}
							</button>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="d-card" v-if="payInfo.courseVo">
				<view class="public-title">课程内容 </view>
				<view class="course-info">
					<image :src="payInfo.courseVo.courseImg" class="course-info-img"></image>
					<view class="Info">
						<view class="info-1">{{ payInfo.courseVo.courseName }}</view>
						<view class="info-2">￥{{ payInfo.courseVo.wdCourseSale.fficialPrice | amounts }}</view>
						
					</view>
				</view>
			</view> -->
			<!-- <view class="" v-if="payInfo.discountList">
				<view class="zhulis" v-if="payInfo.discountList.length > 0">
					<view class="yagshi" style="display: flex;">
						<image class="sizeimg" :src="imageUrl+'/static/live/ActivityReduction.png'" mode=""></image>
						活动减免
					</view>
					<view class="" style="display: flex;">
						<view class="zhuxuejin">
							助学金
						</view>
						<view class="jine" v-for="(item,index) in payInfo.discountList" :key="index">
							-￥{{item.discountAmount}}
						</view>
					</view>
				</view>
			</view> -->

		</view>
		<!-- 选择优惠券 -->
		<!-- <view class="d-card">
        <view class="configure">
          <view class="to-configure publics">选择优惠券</view>
          <view>
            <text class="tg publics">暂无可使用优惠券</text>
            <view class="icon" />
          </view>
        </view>
      </view> -->
		<!-- 配送方式 -->
		<!-- <view class="d-card">
        <view class="configure">
          <text class="to-configure publics">配送方式</text>
          <text class="tg publics">快递免运费</text>
        </view>
      </view>
    </view> -->
		<!-- 助力 -->

		<!-- 底部 -->
		<view class="footer">
			<view class="">
				<view class="left-foot" v-if="val.length!=0">
					合计：<text class="money" v-if="val.length!=0">￥{{ val.fficialPrice  | amounts }}</text>
				</view>
				<view class="left-foot" v-else>
					合计：<text class="money">￥{{ payInfo.classesTypeList[0].fficialPrice  | amounts }}</text>
				</view>
				<view class="" v-if="val.length!=0">
					<view class="siwono" v-if="val.lineFficialPrice-val.fficialPrice>=0">
						已优惠：<text class="money">￥{{val.lineFficialPrice-val.fficialPrice| amounts }}</text>
					</view>
				</view>
				<view class="" v-else>
					<view class="siwono"
						v-if="payInfo.classesTypeList[0].lineFficialPrice-payInfo.classesTypeList[0].fficialPrice>=0">
						已优惠：<text
							class="money">￥{{payInfo.classesTypeList[0].lineFficialPrice-payInfo.classesTypeList[0].fficialPrice | amounts }}</text>
					</view>
				</view>

			</view>

			<view class="right-foot">
				<button class="btns" @click="getOrderId">结算</button>
			</view>
		</view>
		<view v-show='loginAss' class="back-tankuang">
			<login class="loginw" @guanbi='guanbi' />
		</view>
	</view>


</template>
<script>
	import {
		orderAdd,
		orderQueryById,
		wxPay,
		orderQueryWxPay
	} from "@/api/pay.js";
	export default {
		data() {
			return {
				loginAss: getApp().globalData.loginAss,
				imageUrl: getApp().globalData.imageUrl,
				payInfo: {},
				orderId: "",
				val: [],
				pagorder: {},
			};
		},
		onUnload(data) {
			uni.removeStorageSync('shareUrl');
		},
		onShow() {
			let aaa = getCurrentPages()
			let thatPage = aaa[aaa.length - 1];
			this.payInfo = JSON.parse(decodeURIComponent(thatPage.options.detailsArr))
			if (thatPage.options.val) {
				this.val = JSON.parse(decodeURIComponent(thatPage.options.val))
			}
			this.getAll()
		},
		mounted() {},
		methods: {
			guanbi(value) {
				this.loginAss = value
			},
			setShareUrl(options) {
				try {
					let shareUrl = '/pagesA/payOrder/payOrder?';
					if (options.orderId){
						shareUrl += 'orderId=' + options.orderId
					} 
					uni.setStorageSync('shareUrl', shareUrl)
					this.loginAss = true
				} catch (e) {
					// error
				}
			},
			async getAll() {
				let aaa = getCurrentPages()
				let thatPage = aaa[aaa.length - 1];
				try {
					var token = wx.getStorageSync('token')
					if (!token) {
						if (thatPage.options.orderId) {
							this.setShareUrl({
								orderId: thatPage.options.orderId
							})
						} else {
							this.setShareUrl(thatPage.options)
						}
					}
				} catch (err) {
					this.setShareUrl({
						orderId: thatPage.options.orderId
					})
				}
			},
			// 创建订单
			async getOrderId() {
				// 创建订单
				if (this.val != 0) {
					if (this.val.fficialPrice === 0) {
						this.generateOrder({
							classId: this.payInfo.id,
							classesTypeId: this.val.id,
							orderAreaId: "", //收货地址ID
							// paperId: "", //试卷id 试卷传此参数
							qd: "3", //渠道 官网:1,经销商:2,小程序:3,IOS:4,安卓:5
						}, 1);
					} else {
						var detail = Object.assign(this.val, {
							classesCover: this.payInfo.classesCover,
							courseName: this.payInfo.classesName,
							classId: this.payInfo.id,
							classesTypeId: this.val.id,
							payType: 1,
							qd: "3", //渠道 官网:1,经销商:2,小程序:3,IOS:4,安卓:5
						});
						this.generateOrder(detail);
					}
				} else {
					if (this.payInfo.classesTypeList[0].fficialPrice === 0) {
						this.generateOrder({
							classId: this.payInfo.id,
							classesTypeId: this.payInfo.classesTypeList[0].id,
							orderAreaId: "", //收货地址ID
							// paperId: "", //试卷id 试卷传此参数
							qd: "3", //渠道 官网:1,经销商:2,小程序:3,IOS:4,安卓:5
						}, 1);
					} else {
						var detail = Object.assign(this.payInfo.classesTypeList[0], {
							classesCover: this.payInfo.classesCover,
							courseName: this.payInfo.classesName,
							classId: this.payInfo.id,
							classesTypeId: this.payInfo.classesTypeList[0].id,
							payType: 1,
							qd: "3", //渠道 官网:1,经销商:2,小程序:3,IOS:4,安卓:5
						});
						this.generateOrder(detail);
					}
				}

			},

			// 生成订单
			async generateOrder(form, type) {
				const res = await orderAdd(form);
				if (res.code == 200) {
					this.pagorder = res.result
					if (type == 1) {
						uni.showToast({
							title: '购买成功',
						})
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages-mine/courseOrder/courseOrder'
							})
						}, 1000)
					} else {
						this.wxPay()
					}
				}
			},
			// 微信支付
			async wxPay() {
				// console.log(this.pagorder)
				// #ifdef H5
				var form = {
					orderId: this.pagorder.id,
					type: "3",
				};

				//#endif
				// #ifdef MP-WEIXIN
				var form = {
					orderId: this.pagorder.id,
					type: "2",
				};
				//#endif


				const res = await wxPay(form);
				if (res.result) {
					// #ifdef  MP-WEIXIN
					uni.requestPayment({
						provider: "wxpay",
						timeStamp: res.result.timeStamp, //时间戳
						nonceStr: res.result.nonceStr, //随机字符串
						package: res.result.package, //prepay_id
						signType: "MD5", //签名算法
						paySign: res.result.sign, //签名
						success: function(data) {
							uni.showToast({
								title: '购买成功',
								icon: 'success',
								mask: true
							})
							setTimeout(() => {
								uni.redirectTo({
									url: '/pages-mine/courseOrder/courseOrder'
								})
							}, 1000)
						},
						fail: function(err) {
							console.log("fail:" + JSON.stringify(err));
						},
					});
					//#endif
					// #ifdef H5
					WeixinJSBridge.invoke(
						'getBrandWCPayRequest', {
							"appId": res.result.appId, //公众号ID，由商户传入     
							"timeStamp": res.result.timeStamp, //时间戳，自1970年以来的秒数     
							"nonceStr": res.result.nonceStr, //随机串     
							"package": res.result.package,
							"signType": res.result.signType, //微信签名方式：     
							"paySign": res.result.sign //微信签名 
						},
						function(res) {
							console.log(res)
							if (res.err_msg == "get_brand_wcpay_request:ok") {
								// 使用以上方式判断前端返回,微信团队郑重提示：
								//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
								uni.showToast({
									title: '购买成功',
									icon: 'success',
									mask: true
								})
								setTimeout(() => {
									uni.redirectTo({
										url: '/pages-mine/courseOrder/courseOrder'
									})
								}, 1000)
							}
						});
					//#endif
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.btn-receiving {
		width: 101rpx;
		height: 42rpx;
		background: #FFFFFF;
		border: 1px solid #DCDCDC;
		border-radius: 21rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #888888;
	}

	.zhulis {
		height: 100rpx;
		background: #FFFFFF;
		box-shadow: 0px 2rpx 20rpx 0px rgba(165, 165, 165, 0.2);
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-radius: 16rpx;
		padding: 0 20rpx;
	}

	.siwono {
		font-size: 24rpx;
		font-weight: 500;
		color: #A5A5A5;
	}

	.jine {
		font-size: 28rpx;
		color: rgba(250, 99, 43, 1);
		margin-left: 15rpx;
	}

	.zhuxuejin {
		font-size: 26rpx;
		color: rgba(143, 141, 141, 1);
	}

	.yagshi {
		font-size: 28rpx;
		font-weight: bold;
		color: #333333;
	}

	.sizeimg {
		width: 34rpx;
		height: 34rpx;
		margin-right: 17rpx;
	}

	.payOrder {
		min-height: 100%;
		background: #fafafa;

		.d-card {
			box-sizing: border-box;
			width: 100%;
			padding: 23rpx 20rpx;
			border-radius: 16rpx;
			background-color: #fff;
			margin-bottom: 20rpx;
		}

		.public-title {
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
			margin-bottom: 36rpx;
			padding-left: 10rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			position: relative;

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

		.free-shipping {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #999999;
			position: absolute;
			right: 0;
		}

		.icon {
			display: inline-block;
			height: 20rpx;
			width: 20rpx;
			border-top: solid;
			border-right: solid;
			border-color: #ddd;
			border-width: 6rpx;
			transform: rotate(45deg);
			// margin-right: 10rpx;
		}

		.payContent {
			box-sizing: border-box;
			padding: 15rpx 30rpx 150rpx;
			margin-bottom: 300rpx;

			// <!-- 课程订单信息 -->
			.course-info {
				display: flex;
				justify-content: flex-start;
				align-items: center;

				.course-info-img {
					width: 270rpx;
					height: 154rpx;
					border-radius: 20rpx;
				}

				.Info {
					flex: 1;
					margin-left: 22rpx;
					display: flex;
					flex-direction: column;

					.info-1 {
						width: 100%;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
						margin-left: 17rpx;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
						margin-bottom: 7rpx;
					}

					.btns {

						height: 50rpx;
						border-radius: 25rpx;
						padding: 0 20rpx;
						line-height: 48rpx;
						font-size: 26rpx;
						font-family: PingFang SC;
						margin: 0 28rpx 0 0;

						::after {
							border: none;
						}
					}

					.activebtn {
						background-color: #ffebe0;
						border: 2rpx solid #fa632b;
						color: #fa632b;
					}

					.info-2 {
						margin-bottom: 7rpx;
						margin-left: 13rpx;
						font-size: 40rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #fa632b;
					}
				}
			}

			// tips
			.tips {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #666666;
			}

			// 收货地址
			.receiving-body {
				display: flex;
				position: relative;
				justify-content: flex-start;
				align-items: center;
				padding-left: 70rpx;

				.position-img {
					position: absolute;
					top: -33rpx;
					left: -6rpx;
					width: 61rpx;
					height: 57rpx;
				}

				.receiving-img {
					width: 45rpx;
					height: 45rpx;
				}

				.receiving-text {
					width: 570rpx;
					// margin-left: 22rpx;
					// padding-right: 10rpx;

					.t-1 {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #666666;

					}

					.t-2 {
						display: flex;
						align-items: center;
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
						margin-bottom: 19rpx;

						.t-2-1 {
							margin-right: 20rpx;
							font-size: 32rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #333333;
						}

						.t-2-2 {
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #333333;
						}
					}
				}
			}

			// 配套资料
			.course {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				box-sizing: border-box;
				padding-bottom: 39rpx;
				margin-bottom: 39rpx;
				border-bottom: 1rpx solid #eee;

				&:last-of-type {
					border: none;
					margin: 0;
				}

				.course-img {
					width: 170rpx;
					height: 170rpx;
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
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}

					.bottoml {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.b1 {
							font-size: 40rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #fa632b;
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

			// 选择优惠券------配送方式
			.configure {
				display: flex;
				justify-content: space-between;

				.publics {
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
				}

				.to-configure {
					color: #333333;
				}

				.tg {
					color: #999999;
				}
			}
		}

		// 底部
		.footer {
			position: fixed;
			bottom: 0;
			width: 100%;
			// height: 122rpx;
			background: #ffffff;
			box-sizing: border-box;
			// padding: 10rpx 30rpx 30rpx 22rpx;
			padding: 20rpx 30rpx;
			// width: 749rpx;
			height: 121rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(108, 108, 108, 0.3);
			display: flex;
			justify-content: space-between;
			align-items: center;

			.left-foot {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;

				.money {
					color: #fa642c;
				}
			}

			.right-foot {
				.btns {
					width: 270rpx;
					height: 80rpx;
					background-color: #fa632b;
					color: #fff;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: bold;
					border-radius: 50rpx;
				}
			}
		}
	}
</style>