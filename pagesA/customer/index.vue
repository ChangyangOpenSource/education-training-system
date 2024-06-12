<template>
	<view class="dIstribution">
		<!-- <view class="topo-LOging">
			<view class="top">
				<image @click="onFanhui" class="fanhui" src="@/static/黑返回键.png" mode=""></image>
				<view class="tuiguang">
					累计客户
				</view>
			</view>
		</view> -->
		<view class="theNumber">
			<view class="blue"></view>
			<text>客户人数:{{order.total}}</text>
		</view>
		<view class="information" v-for="(item,index) in records" :key="index">
			<view class="character">
				<image v-if="item.avatarUrl" :src="item.avatarUrl" mode=""></image>
				<image v-else :src="imageUrl+'/static/live/组40.png'" mode=""></image>
				<view class="">
					<view class="text">
						{{item.name}}
					</view>
					<view class="text2">
						绑定时间：{{item.bindTime}}
					</view>
				</view>
			</view>
		</view>
		<view v-show='loginAss' class="back-tankuang">
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
				totalPage: 0,
				records: [],
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
				NET.request(API.customer, {
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
		margin: 15rpx auto;
		width: 690rpx;
	}

	.character {
		width: 690rpx;
		height: 148rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 22rpx 5rpx rgba(200, 200, 200, 0.1);
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		margin-bottom: 11rpx;

		image {
			width: 118rpx;
			height: 118rpx;
			border-radius:100rpx;
			margin-right: 25rpx;
			margin-left: 25rpx;
		}
	}

	.text {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		margin-bottom: 25rpx;
	}

	.text2 {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #A2A2A2;
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
	}</style>
