<template>
	<view class="dIstribution">
		<view class="tabe">
			<view class="tabe-left">
				<view v-for="(item,index) in tabList" class="boxList" :class="{activeCss:activeIndex-1==index}"
					:key="index">
					<text class="lonser" @click="clickTab(index+1)">{{item.name}}</text>
				</view>
			</view>
			<view class="tab-right">
				<!-- <image src="@/static/形状%203%20拷贝%204.png" mode=""></image> -->
				<!-- <view class="tab-right-text">
					自定义时间
				</view> -->
				<view class="example-body">
					<uni-datetime-picker v-model="single" type="daterange" @change="changeLog" @maskClick="maskClick" />
					<!-- 	<uni-datetime-picker type="date" :clear-icon="false" v-model="single" @change="changeLog"
						@maskClick="maskClick" /> -->
				</view>
			</view>
		</view>
		<view class="active">
			<view class="active-left">
				<text class="tetxt">已结算金额</text>
				<text class="moyn">{{allOrderPrice.alreadySettlement}}</text>
			</view>
			<view class="active-right">
				<text class="tetxt2">未结算金额</text>
				<text class="moyn1">{{allOrderPrice.notSettlement}}</text>
			</view>
		</view>
		<view class="center">
			<view class="center1">
				<text class="center1-text">累计订单数</text>
				<text class="center1-stext">{{allOrderPrice.orderNum}}</text>
			</view>
			<view class="center2">
				<text class="center1-text2">累计订单总额</text>
				<text class="center1-stext2">{{allOrderPrice.allOrderPrice}}</text>
			</view>
			<view class="center3">
				<text class="center1-text3">累计收益</text>
				<text class="center1-stext3">{{allOrderPrice.statisticIncome}}</text>
			</view>
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
							<view v-if="item.type==1" class="">
								直接收益
							</view>
							<view v-if="item.type==2" class="">
								间接收益
							</view>
							：￥{{(item.commission*1).toFixed(0)}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-show='loginAss' class="back-tankuang">
			<login class="loginw" @guanbi='guanbi' />
		</view>
	</view>


</template>
<script>
	const NET = require("@/uview-ui/request");
	const API = require("@/api/tuiguang");
	export default {
		data() {
			return {				
				loginAss: getApp().globalData.loginAss,
				activeIndex: '1',
				imageUrl: getApp().globalData.imageUrl,
				single: '',
				allOrderPrice: {
					allOrderPrice: 0,
					alreadySettlement: 0,
					notSettlement: 0,
					orderNum: 0,
					statisticIncome: 0
				},
				page: 1,
				pageSize: 10,
				totalPage: 0,
				records: [],
				tabList: [{
						name: "全部",
						number: 1,
					},
					{
						name: "今日",
						number: 2,
					},
					{
						name: "昨日",
						number: 3,
					},
					{
						name: "近七日",
						number: 4,
					},
				],
			}
		},
		onLoad() {
			this.statistic()
			this.teamList()
		},
		onPullDownRefresh() {
			console.log(123)
			this.page = 1
			this.pageSize = 10
			this.totalPage = 0
			this.records = []
			this.statistic()
			this.teamList()
			this.activeIndex = '1'
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
				if (this.single) {
					this.statistic(this.single);
					this.teamList(this.single)
				} else {
					this.statistic();
					this.teamList()
				}

			}
		},
		methods: {
			guanbi(value) {
				this.loginAss = value
			},

			clickTab(index) {
				this.page = 1
				this.pageSize = 10
				this.totalPage = 0
				this.records = []
				this.activeIndex = index;
				this.statistic()
				this.teamList()
				this.single = ''
			},
			changeLog(item) {
				console.log(item)
				this.single = item
				this.statistic(item)
				this.teamList(item)
				this.activeIndex = 1;
			},
			statistic(item) {
				uni.showLoading({
					mask: true,
					title: '加载中'
				})
				if (item) {
					NET.request(API.statistic, {
						type: this.activeIndex,
						startTime: item[0] + ' ' + '00:00:00',
						endTime: item[1] + ' ' + '23:59:59',

					}, 'get').then(res => {
						console.log(res)
						uni.hideLoading()
						if (res.code == 200) {
							this.allOrderPrice = res.result
							this.totalPage = res.result.pages
						}

					})
				} else {
					NET.request(API.statistic, {
						type: this.activeIndex,
					}, 'get').then(res => {
						console.log(res)
						uni.hideLoading()
						if (res.code == 200) {
							this.allOrderPrice = res.result
							this.totalPage = res.result.pages
						}
					})
				}

			},
			teamList(item) {
				uni.showLoading({
					mask: true,
					title: '加载中'
				})
				if (item) {
					this.records = []
					NET.request(API.teamList, {
						type: this.activeIndex,
						startTime: item[0] + ' ' + '00:00:00',
						endTime: item[1] + ' ' + '23:59:59',
						page: this.page,
						pageSize: this.pageSize
					}, 'get').then(res => {
						console.log(res)
						uni.hideLoading()
						if (res.code == 200) {
							// this.records = res.result
							this.totalPage = res.result.pages
							for (var i = 0; i < res.result.records.length; i++) {
								this.records.push(res.result.records[i])
							}
							console.log(this.records)
						}

					})
				} else {
					NET.request(API.teamList, {
						type: this.activeIndex,
						page: this.page,
						pageSize: this.pageSize
					}, 'get').then(res => {
						console.log(res)
						uni.hideLoading()
						if (res.code == 200) {
							// this.records = res.result
							this.totalPage = res.result.pages
							for (var i = 0; i < res.result.records.length; i++) {
								this.records.push(res.result.records[i])
							}
							console.log(this.records)
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F3F3F3;
	}

	.lonser {
		width: auto;
		height: auto;
		white-space: nowrap;
	}

	.dIstribution {
		padding: 0rpx 0rpx 50rpx;
	}

	.tabe {
		width: 750rpx;
		height: 90rpx;
		background-color: #FFFFFF;
		border-top: 1rpx solid RGBA(243, 243, 243, 1);
		display: flex;
	}

	.tabe-left {
		display: flex;
		width: 449rpx;
		justify-content: space-between;
		padding-left: 31rpx;
	}

	.tab-right {
		display: flex;
		align-items: center;
		margin-left: 40rpx;
		margin-right: 20rpx;

		image {
			height: 32rpx;
			width: 32rpx;
		}
	}

	.tab-right-text {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		margin-left: 11rpx;
	}

	.active-left {
		background: url($fileBaseUrl + '/xcxImg2/static/live/已2结算.png');
		background-size: 100%;
		width: 332rpx;
		height: 211rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-right: 26rpx;
	}

	.active-right {
		background: url($fileBaseUrl + '/xcxImg2/static/live/未结算.png');
		background-size: 100%;
		width: 332rpx;
		height: 211rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-right: 26rpx;
	}

	.tetxt {
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		margin-bottom: 40rpx;
	}

	.moyn {
		font-size: 38rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
	}

	.tetxt2 {
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;

		color: #5F5C5C;
		margin-bottom: 40rpx;
	}

	.moyn1 {
		font-size: 38rpx;
		font-family: PingFang SC;
		font-weight: bold;

		color: #5F5C5C;
	}

	.active {
		display: flex;
		padding-left: 30rpx;
		margin-top: 19rpx;
	}

	.center {
		width: 100%;
		background: #FFFFFF;
		height: 176rpx;
		margin-top: 25rpx;
		display: flex;
		// align-items: center;
		padding-top: 31rpx;
		justify-content: center;
	}

	.center1 {
		width: 217rpx;
		height: 122rpx;
		background: rgba(61, 125, 255, 0.1);
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		// padding-top: 22rpx;
	}

	.center1-text {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: RGBA(61, 125, 255, 1);
		margin-bottom: 28rpx;
	}

	.center1-stext {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: RGBA(61, 125, 255, 1);
	}

	.center2 {
		width: 217rpx;
		height: 122rpx;
		background: rgba(252, 183, 87, 0.1);
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		// padding-top: 22rpx;
		justify-content: center;
		margin-left: 20rpx;
		margin-right: 20rpx;
	}

	.center1-text2 {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(252, 183, 87, 1);
		margin-bottom: 28rpx;
	}

	.center1-stext2 {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(252, 183, 87, 1);
	}

	.center3 {
		width: 217rpx;
		height: 122rpx;
		background: rgba(252, 183, 87, 0.1);
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		// padding-top: 22rpx;
	}

	.center1-text3 {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(250, 99, 43, 1);
		margin-bottom: 28rpx;
	}

	.center1-stext3 {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(250, 99, 43, 1);
	}

	.information {
		margin-top: 26rpx;
	}

	.character {
		width: 690rpx;
		height: 280rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 22rpx 5rpx rgba(200, 200, 200, 0.1);
		border-radius: 20rpx;
		// margin-bottom: 11rpx;
		padding-top: 27rpx;
		margin: 0 auto 16rpx;
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
		width: 400rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.left-center {
		font-size: 26rpx;
		font-family: PingFang SC;
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
		margin-top: 25rpx;
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
			height: 101rpx;
			margin-bottom: 31rpx;
			margin-top: 5rpx;
		}
	}

	.shouyi {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(61, 125, 255, 1);
		margin-right: 36rpx;
		display: flex;
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



	.switchHead {
		height: 35rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		color: #FFFFFF;
		background-color: #13D1BE;
	}

	.boxList {
		height: 100%;
		line-height: 90rpx;
		text-align: center;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		overflow: hidden;
	}


	.activeCss {
		border-bottom: 2rpx solid rgba(61, 125, 255, 1);
		color: rgba(61, 125, 255, 1);
	}
</style>
