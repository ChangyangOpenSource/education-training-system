<template>
	<view class="withdrawal">
		<view class="withdrawal-top">
			<view class="withdrawal1">
				<image :src="imageUrl+'/static/live/资金转出.png'" mode=""></image>
				<view class="withdrawal1-center">
					可提现金额
				</view>
				<view class="withdrawal1-bottom">
					￥{{alreadyPrice.alreadyWithdrawPrice}}
				</view>
			</view>
			<view class="withdrawal2">
				<image :src="imageUrl+'/static/live/资金基金.png'" mode=""></image>
				<view class="withdrawal1-center">
					已结算金额
				</view>
				<view class="withdrawal1-bottom">
					￥{{alreadyPrice.alreadyPrice}}
				</view>
			</view>
			<view class="withdrawal3">
				<image :src="imageUrl+'/static/live/基金、存款.png'" mode=""></image>
				<view class="withdrawal1-center">
					未结算金额
				</view>
				<view class="withdrawal1-bottom">
					￥{{alreadyPrice.notPrice}}
				</view>
			</view>
		</view>
		<view class="tixian" @click="isAss=true">
			提现
		</view>
		<view class="bankCard" @click="onBanCard">
			<view class=" bankCard-left">
				<image :src="imageUrl+'/static/live/bankCard.png'" mode="" class="bankCard-img"></image>
				<text class="bankCard-text">提现银行卡</text>
			</view>

			<image class="bankCard-img2" :src="imageUrl+'/static/live/return.png'" mode=""></image>
		</view>
		<view class="withdrawal-bottom">
			<view class="tixianjil">
				<view class="blue"></view>
				提现记录
			</view>
			<view class="liebiao" v-for="(item,index) in records" :key="index">
				<view class="shijina">
					{{item.createTimeString}}
				</view>
				<view class="moyn">
					-{{item.price}}
				</view>
				<view class="zhuntai" v-if="item.state==1">
					提现中
				</view>
				<view class="zhuntai" v-else-if="item.state==2">
					已到账
				</view>
				<view class="zhuntai" v-else-if="item.state==0">
					审核中
				</view>
				<view class="zhuntai" v-else-if="item.state==4">
					已驳回
				</view>
				<view class="zhuntai" v-else>
					提现失败
				</view>
			</view>
		</view>
		<view class="tanchu" v-if="isAss==true">
			<view class="tanchus">
				<view class="active">
					<image class="tanchuimg" :src="imageUrl+'/static/live/关闭26拷贝.png'" @click="guanbi" mode=""></image>
				</view>

				<view class="top-text">
					输入提现金额
				</view>
				<input :class="{inpot:value=='',inpot2:value!=''}" type="digit" placeholder="0.00" @input="checkNum"
					:maxlength="maxlength" v-model="value" value="" />
				<button :class="{btws:value=='',btws2:value!=''}" @click="onTixian" :disabled="disabled">
					确定
				</button>
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
				title: 'Hello',
				page: 1,
				pageSize: 10,
				order: {
					total: 0,
				},
				totalPage: 0,
				records: [],
				alreadyPrice: {
					alreadyPrice: 0,
					alreadyWithdrawPrice: 0,
					notPrice: 0
				},
				isAss: false,
				value: '',
				imageUrl: getApp().globalData.imageUrl,
				maxlength: 10,
				disabled: true,
			}
		},
		watch: {
			value(n, q) {
				if (n != '') {
					this.disabled = false
				} else {
					this.disabled = true
				}
			}
		},
		onLoad() {
			this.wdDistributor()
			this.withdrawList()
		},
		onPullDownRefresh() {
			console.log(123)
			this.page = 1
			this.pageSize = 10
			this.totalPage = 0
			this.records = []
			this.wdDistributor()
			this.withdrawList()
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
				this.withdrawList();
			}
		},
		methods: {
			guanbi(value) {
				this.loginAss = value
			},
			onBanCard() {
				uni.navigateTo({
					url: '/pagesA/bankCard/index'
				})
			},
			checkNum(e) {
				console.log(e)
				let value = e.detail.value;
				let dot = value.indexOf('.'); //包含小数点
				let reg = /^[0-9]+$/; //正整数
				if (dot > -1) {
					this.maxlength = dot + 3; //长度是小数点后两位
					if (value.length > dot + 3) {}
				}
				if (reg.test(value)) { //如果是正整数不包含小数点
					this.maxlength = 10;
				}
			},
			wdDistributor() {
				NET.request(API.withdraw, {}, 'get').then(res => {
					console.log(res)
					if (res.code == 200) {
						this.alreadyPrice = res.result
					}
				})
			},
			withdrawList() {
				NET.request(API.withdrawList, {
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
			guanbi() {
				this.isAss = false
				this.value = ''
			},
			onTixian() {
				NET.request(API.withdraw, {
					price: this.value
				}, 'post').then(res => {
					console.log(res)
					if (res.code == 200) {
						uni.showToast({
							title: '提现成功，耐心等待审核',
							icon: "none"
						})
						this.page = 1
						this.pageSize = 10
						this.totalPage = 0
						this.records = []
						this.value=''
						this.wdDistributor()
						this.withdrawList()
						this.isAss = false
					} else if (res.code == 500) {
						uni.showToast({
							title: res.message,
							icon: "none"
						})
						this.value=''
					}else if(res.code==5000){
						uni.showToast({
							title: res.message,
							icon: "none"
						})
						this.value=''
						this.isAss = false
						setTimeout(() => {
							uni.navigateTo({
								url: '/pagesA/bankCard/index'
							})
						},1000)
						
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F3F3F3;
	}

	.bankCard {
		width: 100%;
		background-color: #FFFFFF;
		height: 87rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 22rpx;
		margin-top: 31rpx;
	}

	.bankCard-left {
		margin-left: 30rpx;
	}

	.bankCard-img {
		width: 40rpx;
		height: 30rpx;
	}

	.bankCard-img2 {
		width: 13rpx;
		height: 23rpx;
		margin-right: 40rpx;
	}

	.bankCard-text {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		margin-left: 20rpx;
	}

	.withdrawal {
		padding-top: 32rpx
	}

	.withdrawal-top {
		display: flex;
		justify-content: center;
	}

	.withdrawal1 {
		width: 201rpx;
		height: 228rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 22px 5rpx rgba(200, 200, 200, 0.1);
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		image {
			width: 60rpx;
			height: 48rpx
		}
	}

	.withdrawal2 {
		width: 201rpx;
		height: 228rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 22px 5rpx rgba(200, 200, 200, 0.1);
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-left: 46rpx;
		margin-right: 42rpx;

		image {
			width: 56rpx;
			height: 59rpx
		}
	}

	.withdrawal3 {
		width: 201rpx;
		height: 228rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 22px 5rpx rgba(200, 200, 200, 0.1);
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		image {
			width: 60rpx;
			height: 57rpx
		}
	}

	.withdrawal1-center {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		margin-top: 26rpx;
		margin-bottom: 37rpx;
	}

	.withdrawal1-bottom {
		width: 180rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #3D7DFF;
		overflow: hidden;
		text-align: center;
		text-overflow:ellipsis;
	}

	.tixian {
		width: 690rpx;
		height: 80rpx;
		background: #3D7DFF;
		border-radius: 40rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 80rpx;
		text-align: center;
		margin-top: 40rpx;
		margin-left: 27rpx;
	}

	.withdrawal-bottom {
		margin-top: 34rpx;
	}

	.blue {
		width: 6rpx;
		height: 31rpx;
		background: #3D7DFF;
		border-radius: 3rpx;
		margin-left: 31rpx;
		margin-right: 10rpx;
	}

	.tixianjil {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		display: flex;
		align-items: center;
		margin-bottom: 19rpx;
	}

	.liebiao {
		width: 100%;
		height: 101rpx;
		background: #FFFFFF;
		display: flex;
		align-items: center;
	}

	.shijina {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #6C6C6C;
		margin-left: 30rpx;
	}

	.moyn {
		width: 100rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FA632B;
		margin-right: 98rpx;
		margin-left: 154rpx;
		text-align: center;
		text-overflow:ellipsis;
	}

	.zhuntai {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FA632B;
	}

	.top-text {
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		margin-bottom: 93rpx;
		text-align: center;
	}

	.btws {
		width: 500rpx;
		height: 80rpx;
		background: #C9C9C9 !important;
		border-radius: 40rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF !important;
		line-height: 80rpx;
		text-align: center;
		margin: 0 auto 0rpx;
		border: none !important;
	}


	.btws2 {
		width: 500rpx;
		height: 80rpx;
		background: rgba(61, 125, 255, 1);
		border-radius: 40rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 80rpx;
		text-align: center;
		margin: 0 auto 0rpx;
	}

	.tanchus {
		width: 690rpx;
		height: 518rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		position: absolute;
		top: 420rpx;
		left: 28rpx;
	}

	.tanchu {
		width: 100%;
		height: 100%;
		background: RGBA(138, 138, 138, 0.6);
		position: absolute;
		top: 0;
	}

	.tanchuimg {
		width: 27rpx;
		height: 27rpx;
	}

	.active {
		display: flex;
		justify-content: flex-end;
		margin-right: 35rpx;
		margin-top: 31rpx;
	}

	.inpot {
		width: 578rpx;
		border-bottom: 1px solid #A2A2A2;
		// margin-bottom: 53rpx;
		margin: 0 auto 53rpx;
		height: 145rpx;
		text-align: center;
		font-size: 100rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #B1B1B1;
	}

	.inpot2 {
		width: 578rpx;
		border-bottom: 1px solid #A2A2A2;
		// margin-bottom: 53rpx;
		margin: 0 auto 53rpx;
		height: 145rpx;
		text-align: center;
		font-size: 100rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(61, 125, 255, 1);
	}
</style>
