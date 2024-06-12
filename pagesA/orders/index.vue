<template>
	<view class="dIstribution">
		<!-- <view class="topo-LOging">
			<view class="top">
				<image @click="onFanhui" class="fanhui" :src=imageUrl+"/static/live/黑返回键.png" mode=""></image>
				<view class="tuiguang">
					分销订单
				</view>
			</view>
		</view> -->
		<view class="theNumber">
			<view class="blue"></view>
			<text>订单数:{{order.total}}</text>
		</view>
		<view class="information">
			<view class="character" v-for="(item,index) in records" :key="index">
				<view class="character-top">
					<view class="top-left">
						订单号：{{item.orderId}}
					</view>
					<text class="top-right">
						{{item.transactionTime}}
					</text>
				</view>
				<view class="bottom">
					<view class="bottom-left">
						<view class="left-top">
							产品：{{item.productName}}
						</view>
						<view class="left-center">
							订单金额：￥{{item.price}}
						</view>
						<view class="left-bottom">
							<text>
								成交人：{{item.name}}
							</text>
							<image v-if="item.avatarUrl" :src="item.avatarUrl" mode=""></image>
							<image v-else :src="imageUrl+'/static/live/组40.png'" mode=""></image>
						</view>
					</view>
					<view class="bottom-right">
						<image v-if="item.orderStatus==4" :src="imageUrl+'/static/live/22.png'" mode=""></image>
						<image v-else-if="item.state==1" :src="imageUrl+'/static/live/已结算.png'" mode="">
						</image>
						<image v-else-if="item.state==0" :src="imageUrl+'/static/live/待结算.png'" mode="">
						</image>
						<view
							:class="{shouyi:item.state==0 &&item.orderStatus!=4,shouyi1:item.state==1 &&item.orderStatus!=4,shouyi2:item.orderStatus==4}">
							<view v-if="item.type==1" style="white-space: nowrap;" class="">
								直接收益
							</view>
							<view v-if="item.type==2" style="white-space: nowrap;" class="">
								间接收益
							</view>
							：￥{{(item.commission*1).toFixed(0)}}
						</view>
					</view>
				</view>
			</view>
		</view><view v-show='loginAss' class="back-tankuang">
			<login class="loginw" @guanbi='guanbi' />
		</view>
	</view>


</template><script>
	const NET = require("@/uview-ui/request");
	const API = require("@/api/tuiguang");
	export default {
		data() {
			return {				
				loginAss: getApp().globalData.loginAss,
				title: 'Hello',
				page: 1,
				pageSize: 10,
				order: {
					total: 0
				},
				records: [],
				totalPage: 0,
				imageUrl: getApp().globalData.imageUrl
			}
		},
		onLoad() {
			this.wdDistributor()
		},
		onPullDownRefresh() {
			console.log(123)
			this.page = 1
			this.pageSize = 10
			this.totalPage = 0
			this.records = []
			this.wdDistributor()
			// uni.showNavigationBarLoading(); //在当前页面显示导航条加载动画。
			setTimeout(() => {
				// uni.hideNavigationBarLoading();
				uni.stopPullDownRefresh(); //得到数据后停止下拉刷新
			}, 2000);

		},
		onReachBottom() {
			this.page++;
			if (this.page > this.totalPage) {
				uni.hideNavigationBarLoading();
				uni.showToast({
					title: '暂无更多数据'
				})
			} else {
				this.wdDistributor(this.currentPage, this.currentSize, 2);
			}
		},
		methods: {
			guanbi(value) {
				this.loginAss = value
			},
			onFanhui() {
				uni.redirectTo({
					url: "../index/index"
				})
			},
			wdDistributor() {
				NET.request(API.list, {
					page: this.page,
					pageSize: this.pageSize
				}, 'get').then(res => {
					console.log(res)
					if (res.code == 200) {
						this.order = res.result
						this.totalPage = res.result.pages
						for (var i = 0; i < res.result.records.length; i++) {
							this.records.push(res.result.records[i])
						}
						console.log(this.records)
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #F3F3F3;
	}

	@font-face {
		font-family: abc;
		src: ('../../font/苹方黑体-准-简.ttf');
	}

	.topo-LOging {
		width: 100%;
		height: 88rpx;
		position: relative;
		background: #FFFFFF;
		margin-bottom: 27rpx;
		text-align: center;
		line-height: 88rpx;

	}


	.tuiguang {
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #000000;
	}

	.shouyi1 {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(61, 125, 255, 1);
		margin-right: 36rpx;
		display: flex;
	}

	.shouyi2 {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(208, 164, 94, 1);
		margin-right: 36rpx;
		display: flex;
	}

	.shouyi3 {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(166, 166, 166, 1);
		margin-right: 36rpx;
		display: flex;
	}

	.top {
		display: flex;
		margin-left: 31rpx;
		margin-top: 100rpx;
		align-items: center;
	}

	.fanhui {
		width: 19rpx;
		height: 34rpx;
		margin-right: 250rpx;
	}

	.dIstribution {
		padding: 25rpx 0rpx 50rpx;
	}

	.theNumber {
		width: 690rpx;
		height: 91rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 22rpx 5rpx rgba(200, 200, 200, 0.1);
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		margin: 0 auto;

		text {
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
		}
	}

	.blue {
		width: 6rpx;
		height: 31rpx;
		background: #3D7DFF;
		border-radius: 3rpx;
		margin-left: 23rpx;
		margin-right: 7rpx;
	}

	.information {
		width: 690rpx;
		margin: 15rpx auto;
	}

	.character {
		width: 690rpx;
		height: 280rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 22rpx 5rpx rgba(200, 200, 200, 0.1);
		border-radius: 20rpx;
		margin-bottom: 11rpx;
		padding-top: 27rpx;
	}

	.top-left {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #A2A2A2;
	}

	.top-right {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #A2A2A2;
	}

	.left-top {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 400rpx;
	}

	.left-center {
		font-size: 26rpx;
		font-family: abc;
		font-weight: 500;
		color: #333333;
		margin-top: 35rpx;
		margin-bottom: 21rpx;
	}

	.left-bottom {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		display: flex;
		align-items: center;

		text {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			max-width: 300rpx;
		}

		image {
			width: 59rpx;
			height: 59rpx;
			margin-left: 16rpx;
			border-radius: 100rpx;
		}
	}

	.character-top {
		display: flex;
		justify-content: space-between;
		padding: 0 35rpx 0 25rpx;
	}

	.bottom {
		margin-top: 24rpx;
		margin-left: 23rpx;
		display: flex;
		justify-content: space-between;
	}

	.bottom-right {
		display: flex;
		flex-direction: column;
		align-items: center;

		image {
			width: 104rpx;
			height: 104rpx;
			margin-bottom: 31rpx;
			margin-top: 5rpx;
			border-radius: 100rpx;
		}
	}

	.shouyi {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(250, 99, 43, 1);
		margin-right: 36rpx;
		display: flex;
	}
</style>
