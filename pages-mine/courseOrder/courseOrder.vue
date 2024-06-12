<template>
	<view class="bg">
		<u-toast ref="uToast" />
		<view class="sticky">
			<u-tabs :list="list" :is-scroll="false" :current="current" @change="handleChange" active-color="#F1592A"
				inactive-color="#333" font-size="30" />
		</view>
		<view v-if="courseOrderList && courseOrderList.length > 0">
			<view class="course-order-list">
				<view class="course-order-list-item" v-for="item in courseOrderList" :key="item.id"
					@click="classesDetail(item)">
					<!-- 其他订单 type：1面授课程，2直播课程，3图书订单，4精品题库，5班级，6面授课程，7班级课程，8模块课程 -->
					<view class="" v-if="item.type!=8">
						<view class="course-title">
							<view
								:class="{right:item.status==1,right2:item.status==2,right1:item.status==3,right3:item.status==4}">
								{{ item.status_dictText }}
							</view>
							<view class="left">
								<view class="t-1">订单号:{{ item.id }}</view>
							</view>
						</view>
						<view class="course-info">
							<image v-if="item.classesId" :src="item.classesCover" class="course-info-img">
							</image>
							<view class="Info">
								<view class="info-1">{{ item.classesName }}</view>
								<view class="t-2">系列课程</view>
								<view class="info-2" v-if="item.gmqd != 2 && item.gmqd != 7">￥{{ item.ddje | amounts }}
								</view>
							</view>
						</view>
						<view class="course-price">
							<view class="price" v-if="item.gmqd != 2 && item.gmqd != 7">总计 :
								<text class="price-money">￥{{ item.ddje | amounts }}</text>
							</view>
							<view class="price-paid">
								<text v-if="item.gmqd != 2 && item.gmqd != 7">实付 :</text>
								<text class="price-paid-money" v-if="(item.gmqd == 2) || (item.gmqd == 7)">线下购课</text>
								<text class="price-paid-money" v-else-if="item.gmqd == 6">课程兑换</text>
								<text class="price-paid-money" v-else>￥{{ item.studentPrice | amounts }}</text>
							</view>
						</view>
						<view class="btns">
							<button class="btn btn-3" v-if="item.status == '1'" @click.stop="closeOrder(item)"> 关闭交易
							</button>
							<button class="btn btn-2" v-if="item.status == '1'" @click.stop="gotoPay(item)"> 付款
							</button>
							<button class="btn btn-2" v-if="item.status == '2' && item.classesId"
								@click.stop="viewCourse(item)">
								订单详情
							</button>
							<button class="btn btn-1" v-if="item.status == '3'" disabled> 已关闭 </button>
							<button class="btn btn-1" v-if="item.status == '4'" disabled> 已退款 </button>
							<button class="btn btn-1" v-if="item.status == '5'"> 申请退款 </button>
						</view>
					</view>
				</view>
			</view>
			<u-loadmore :status="status" />
		</view>
		<!-- 页面无数据 -->
		<no-data-page :title="'您还未加入过课程立即去“我的课程”中选择课程吧'" :noDataImg="imageUrl+'/xing/zwsj.png'" v-else />
	</view>
</template>
<script>
	import NoDataPage from "@/components/NoDataPage.vue";
	import {
		courseOrder,
		cancelById,
		orderQueryById,
		wxPay,
	} from "@/api/pay.js";
	export default {
		components: {
			NoDataPage,
		},
		data() {
			return {
				imageUrl: getApp().globalData.imageUrl,
				current: 0,
				requestData: {
					type: "",
					pageNo: 1,
					pageSize: 10,
				},
				status: "loadmore",
				total: 0,
				courseOrderList: [],
				list: [{
						name: "全部",
					},
					{
						name: "待支付",
					},
					{
						name: "已完成",
					},
					{
						name: "已关闭",
					},
					{
						name: "已退款",
					},
				],
			};
		},
		mounted() {
			this.getAll(this.requestData);
		},
		// 上拉加载更多
		onReachBottom() {
			if (this.requestData.pageSize >= this.total) return;
			this.status = "loading";
			this.requestData.pageSize += 10;
			setTimeout(() => {
				this.getAll(this.requestData);
				if (this.requestData.pageSize >= this.total) {
					this.status = "nomore";
				} else {
					this.status = "loading";
				}
			}, 300);
		},
		methods: {
			handleChange(index) {
				this.current = index;
				this.requestData.type = index == 0 ? "" : index;
				this.requestData.pageNo = 1;
				this.requestData.pageSize = 10;
				this.getAll(this.requestData);
			},
			async getAll(form) {
				const res = await courseOrder(form);
				this.courseOrderList = res.result.records || [];
				this.total = res.result.total;
				if (this.requestData.pageSize >= this.total) {
					this.status = "nomore";
				} else {
					this.status = "loading";
				}
			},
			// 关闭交易
			async closeOrder(data) {
				const res = await cancelById({
					orderId: data.id
				});
				this.$refs.uToast.show({
					title: res.message,
					type: res.success ? "success" : "error",
					position: "top",
					icon: true,
				});
				this.getAll(this.requestData);
			},
			// 付款
			async gotoPay(data) {
				const res = await orderQueryById({
					id: data.id
				});
				if (res.success) {
					this.wxPay(res.result)
				} else {
					uni.showToast({
						title: res.message,
						icon: 'none',
					})
				}
			},
			// 微信支付
			async wxPay(payInfo) {
				// #ifdef H5
				var form = {
					orderId: payInfo.id,
					type: "3",
				};

				//#endif
				// #ifdef MP-WEIXIN
				var form = {
					orderId: payInfo.id,
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
			// 查看课程
			viewCourse(data) {
				uni.navigateTo({
					url: '/pagesA/orderDetail/orderDetail?orderId=' + data.id
				})
			},
			// 查看订单详情
			classesDetail(data) {
				if (data.type != 8) {
					// 不是模块课程订单
					if (!data.paperId) {
						uni.navigateTo({
							url: `/pagesA/curriculumDetail/index?id=${data.classesId}`,
						});
					}
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.bg {
		background: #FAFAFA;
		min-height: 100%;
		overflow: hidden;
	}

	.sticky {
		width: 100%;
		position: fixed;
		top: 0;
		background-color: #fff;
		// border-top: 2rpx solid #ddd;
		z-index: 10;
		// box-shadow: 0px 1px 2px rgba(0, 0, 0, .2);
	}

	.t-2 {
		width: fit-content;
		max-width: 150rpx;
		padding: 5rpx 10rpx;
		background: linear-gradient(0deg, #E9C79A 0%, #E7BD88 100%);
		border-radius: 10rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		text-align: center;
		margin-bottom: 31rpx;
	}

	// <!-- 课程订单列表 -->
	.course-order-list {
		box-sizing: border-box;
		padding: 100rpx 30rpx 0;
		display: inline-block;
		width: 100%;
		margin-bottom: 50rpx;

		// 课程订单
		.course-order-list-item {
			width: 100%;
			// height: 510rpx;
			background: #ffffff;
			// box-shadow: 0rpx 2rpx 20rpx 0rpx rgba(165, 165, 165, 0.2);
			border-radius: 16rpx;
			margin-bottom: 20rpx;
			box-sizing: border-box;
			padding: 20rpx;

			// <!-- 头部订单号区域 -->
			.course-title {
				width: 100%;
				display: flex;
				align-items: center;

				.left {
					display: flex;
					justify-content: space-between;

					// width: 370rpx;
					.t-1 {
						font-size: 28rpx;
						// font-family: PingFang SC;
						font-weight: 500;
						color: #999999;
						margin-left: 15rpx;
					}

					.t-2 {
						padding: 5rpx 10rpx;
						background: linear-gradient(0deg, #E9C79A 0%, #E7BD88 100%);
						border-radius: 10rpx;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}

				.right {
					width: 98rpx;
					height: 36rpx;
					background: #FFEDE8;
					border-radius: 18rpx;
					font-size: 22rpx;

					font-weight: 500;
					color: rgba(241, 89, 42, 1);
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.right1 {
					width: 98rpx;
					height: 36rpx;
					background: #DEF0FF;
					border-radius: 18rpx;
					font-size: 22rpx;

					font-weight: 500;
					color: rgba(46, 160, 255, 1);
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.right2 {
					width: 98rpx;
					height: 36rpx;
					background: #ECFFFD;
					border-radius: 18rpx;
					font-size: 22rpx;

					font-weight: 500;
					color: rgba(12, 216, 194, 1);
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.right3 {
					font-size: 22rpx;

					font-weight: 500;
					color: #3d7dff;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}

			// <!-- 课程订单信息 -->
			.course-info {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				margin: 34rpx 0 33rpx;

				.course-info-img {
					width: 270rpx;
					height: 154rpx;
					border-radius: 20rpx;
				}

				.Info {
					margin-left: 22rpx;



					.info-1 {
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
						margin-bottom: 21rpx;
					}

					.info-2 {
						font-size: 40rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #fa632b;
					}
				}
			}

			.patTime {
				font-size: 26rpx;
				font-family: PingFang SC;
				color: #666666;
				text-align: right;
				margin-bottom: 20rpx;
			}

			// <!-- 课程价格 -->
			.course-price {
				height: 96rpx;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				border-top: 1rpx solid #e5e5e5;

				.price {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #666666;
					margin-right: 30rpx;
				}

				.price-paid {
					color: #000;
					font-size: 28rpx;
					font-weight: bold;

					.price-paid-money {
						color: #fa632b;
						font-weight: bold;
					}
				}
			}

			// 按钮
			.btns {
				display: flex;
				align-items: center;
				justify-content: flex-end;

				.btn {
					width: 180rpx;
					height: 66rpx;
					border: 2rpx solid #EEEEEE;
					border-radius: 33rpx;
					padding: 0;
					margin: 0;
					font-size: 28rpx;
					line-height: 66rpx;
					background: RGBA(255, 255, 255, 1);

					&::after {
						border: none;
					}
				}

				.btn-1 {
					margin-left: 30rpx;
					color: rgba(153, 153, 153, 1);
				}

				.btn-2 {
					margin-left: 30rpx;
					background: linear-gradient(-62deg, #FF5D03 0%, #FF7B32 100%);
					color: #fff;
				}

				.btn-3 {
					color: $uni-primary;
					background: #FFF1E9;
				}
			}
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
</style>