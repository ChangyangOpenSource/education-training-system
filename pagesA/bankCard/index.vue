<template>
	<view class="">
		<view class="barnk">
			<view class="view-input">
				<view class="input margin-right">
					<text>*</text>
					<view class="input-view">
						银行：
					</view>
				</view>
				<view class="barnk-input">
					<input type="text" v-model="obj.bankName" placeholder="请输入银行名称" value="" />
				</view>
			</view>
			<view class="view-input">
				<view class="input margin-right2">
					<text>*</text>
					<view class="input-view">
						开户行：
					</view>
				</view>
				<view class="barnk-input">
					<input type="text" v-model="obj.bankBranchName" placeholder="请输入银行开户行" value="" />
				</view>
			</view>
			<view class="view-input">
				<view class="input margin-right">
					<text>*</text>
					<view class="input-view">
						卡号：
					</view>
				</view>
				<view class="barnk-input">
					<input type="number" v-model="obj.bankNumber" @input="checkNum($event)" placeholder="请输入银行卡号"
						value="" />
				</view>
			</view>
			<view class="view-input">
				<view class="input margin-right4">
					<text>*</text>
					<view class="input-view">
						持卡人名称：
					</view>
				</view>
				<view class="barnk-input">
					<input type="text" v-model="obj.bankReceiveName" placeholder="请输入持卡人名称" value="" />
				</view>
			</view>
			<view class="view-input">
				<view class="input margin-right2">
					<text>*</text>
					<view class="input-view">
						手机号：
					</view>
				</view>
				<view class="barnk-input">
					<input type="text" v-model="obj.bankPhone" placeholder="请输入手机号" value="" />
				</view>
			</view>
			<view class="complete" @click="bind">
				完成绑定
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
				obj: {
					loginAss: getApp().globalData.loginAss,
					bankName: '',
					bankBranchName: '',
					bankNumber: '',
					bankReceiveName: '',
					bankPhone: '',
				}
			}
		},
		mounted() {
			NET.request(API.bank, {}, 'get').then(res => {
				console.log(res)
				if (res.code == 200) {
					this.obj.bankName = res.result.bankName
					this.obj.bankBranchName = res.result.bankBranchName
					this.obj.bankNumber = res.result.bankNumber
					this.obj.bankReceiveName = res.result.bankReceiveName
					this.obj.bankPhone = res.result.bankPhone
				}
			})
		},
		methods: {
			guanbi(value) {
				this.loginAss = value
			},
			checkNum(e) {
				const o = e.target;
				const inputRule = /[^\d]/g //修改inputRule 的值
				this.$nextTick(function() {
					this.obj.number = o.value.replace(inputRule, '');
				})
			},
			bind() {
				let regs = /^(1)\d{10}$/
				if (this.obj.bankName == ''||this.obj.bankName == null) {
					uni.showToast({
						title: '请输入银行名称',
						icon: "none"
					})
				} else if (this.obj.bankBranchName == '' || this.obj.bankBranchName == null) {
					uni.showToast({
						title: '请输入开户行名称',
						icon: "none"
					})
				} else if (this.obj.bankNumber == '' ||this.obj.bankNumber == null) {
					uni.showToast({
						title: '请输入卡号',
						icon: "none"
					})
				} else if (this.obj.bankReceiveName == ''||this.obj.bankReceiveName == null) {
					uni.showToast({
						title: '请输入持卡人名称',
						icon: "none"
					})
				} else if (this.obj.bankPhone == '' ||this.obj.bankPhone == null) {
					uni.showToast({
						title: '请输入手机号',
						icon: "none"
					})
				}else if(!regs.test(this.obj.bankPhone)){
					uni.showToast({
						title: '手机号格式错误',
						icon: "none"
					})
				} else {
					NET.request(API.bank, this.obj, 'post').then(res => {
						console.log(res)
						if (res.code == 200) {
							uni.showToast({
								title: '银行卡绑定成功',
								icon: "none"
							})
							setTimeout(() => {
								uni.navigateTo({
									url: '/pagesA/withdrawal/index'
								})
							},1000)
						}
					})
				}

			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF;
	}

	.barnk {
		padding: 54rpx 25rpx 0 30rpx;
	}

	.input {
		display: flex;

		// margin-right: 83rpx;
		text {
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #3D7DFF;
		}

		.input-view {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: bold;
			margin-left: 5rpx;
			color: #333333;
			white-space: nowrap;
		}
	}

	.view-input {
		display: flex;
		align-items: center;
		margin-bottom: 54rpx;
	}

	.barnk-input {
		input {
			width: 511rpx;
			height: 64rpx;
			background: #F4F4F4;
			border: 1rpx solid #DCDCDC;
			border-radius: 8rpx;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 300;
			color: #000000;
			line-height: 64rpx;
			text-align: left;
			padding-left: 24rpx;
		}
	}

	.margin-right {
		margin-right: 90rpx;
	}

	.margin-right2 {
		margin-right: 65rpx;
	}

	.margin-right4 {
		margin-right: 13rpx;
	}

	.complete {
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
