<template>
	<view class="bg">
		<top_nav_return_green :topNavTitle="'会员激活'"></top_nav_return_green>
		<view class="header">
			<view class="header_input">
				<image :src="imageUrl+'/home/uni16.png'"  />
				激活码：<input type="text" placeholder="请输入8位数激活码" maxlength="8" v-model="code"
					placeholder-style="font-size: 26rpx;font-family: PingFang SC;font-weight: 400;color: #666666;opacity: 0.7;">
			</view>
			<view class="header_btn" @tap="submit_code()"> 确认激活 </view>
			<view class="go_cdk_box" @click="goCdk()">
				我的兑换记录 >
			</view>
		</view>
		<view class="main">
			<view class="main_code">
				<!-- <image :src="data.qrCode"  /> -->
				<image :show-menu-by-longpress="true" :src="data.qrCode"></image>
			</view>
			<view class="main_tip"> 联系老师，获取激活码 </view>
			<view class="main_phone"> 联系电话：<text @click="callUp(data.relationPhone)">{{data.relationPhone}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		componentInfoBrief
	} from '@/api/mine/about.js'
	import {
		invitationCode
	} from '@/api/mine/vip.js'
	export default {
		data() {
			return {
				code: '',
				data: {},
				imageUrl: getApp().globalData.imageUrl,
			}
		},
		onShow() {
			this.get_componentInfoBrief()
		},
		methods: {
			goCdk(){
				uni.navigateTo({
					url:'/pages-mine/exchangeRecords/index'
				})
			},
			// 打电话
			callUp(phoneNumber) {
				uni.makePhoneCall({
					phoneNumber: phoneNumber, //仅为示例
				});
			},
			// 提交激活码
			submit_code() {
				if (this.code.length != 0) {
					let data = this.code
					invitationCode(data).then((res) => {
						console.log('激活码返回值：', res);
						if (res.code == 200) {
							uni.navigateTo({
								url:'/pages-mine/exchangeRecords/index'
							})
							// uni.showToast({
							// 	title: '激活成功'
							// })
							// let pages = getCurrentPages(); //获取所有页面栈实例列表
							// let nowPage = pages[pages.length - 1]; //当前页页面实例
							// let prevPage = pages[pages.length - 2]; //上一页页面实例
							// prevPage.$vm.type = true; //修改上一页data里面的参数值
							// uni.navigateBack({ //uni.navigateTo跳转的返回，默认1为返回上一级
							// 	delta: 1
							// });
							// 激活成功清空输入框
							this.code = ''
							// setTimeout(function() {
							// 	uni.navigateBack()
							// }, 3000)
						} else {
							uni.showToast({
								title: '激活失败',
								icon: 'error'
							})
						}
					})
				} else {
					uni.showToast({
						title: '激活码不存在',
						icon: 'error'
					})
				}

			},
			// 获取机构信息
			get_componentInfoBrief() {
				componentInfoBrief().then((res) => {
					console.log('简介返回值:', res);
					this.data = res.result
				})
			},
			// 返回上一页
			backPage() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.go_cdk_box{
		margin-top: 30rpx;
		text-align: center;
		// width: 142rpx;
		// height: 23rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #666666;
	}
	.returnbox {
		position: absolute;
		top: -15rpx;
		left: 15rpx;
		height: 60rpx;
		width: 70rpx;
		// border:1px red solid;
	}

	.bg {
		min-height: 100vh;
		// background-color: #0191a0;
		background: $uni-primary;
		padding: 0 30rpx 40rpx 30rpx;
		padding-top: 20rpx;
	}

	.top_nav_return {
		position: fixed;
		z-index: 10;
		top: 0;
		left: 0;
		width: 100vw;
		padding-top: 90rpx;
		padding-bottom: 20rpx;
		// background-color: #0191a0;
		background: $uni-primary;

	}

	.top_nav_title {
		position: relative;
		text-align: center;
		;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: white;

		image {
			position: absolute;
			display: inline-block;
			left: 30rpx;
			height: 36rpx;
			width: 20rpx;
		}
	}

	.header {
		margin-top: 170rpx;
		padding-bottom: 30rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 0px 0px rgba(127, 126, 126, 0.1300);
		border-radius: 10rpx;
	}

	.header_input {
		display: flex;
		align-items: center;
		margin: 0 60rpx 0 60rpx;
		padding-top: 50rpx;
		padding-bottom: 40rpx;
		border-bottom: 1rpx #DDDDDD solid;
		// width: 100rpx;
		// height: 29rpx;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #132B2E;
		image {
			width: 41rpx;
			height: 41rpx;
		}

		input {
			width: 50%;
		}
	}

	.header_btn {
		margin: 40rpx;
		margin-bottom: 0;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		// background-color: #0191a0;
		background: $uni-primary;
		border-radius: 10rpx;
	}

	.main {
		margin-top: 30rpx;
		padding-top: 140rpx;
		// height:1000rpx;
		// background-color: white;
		// width: 690rpx;
		height: 1004rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 0px 0px rgba(127, 126, 126, 0.1300);
		border-radius: 10rpx;

		.main_code {
			margin: 0 auto;
			width: 250rpx;
			height: 250rpx;
			background-color: #eeeeee;

			image {
				width: 100%;
				height: 100%;
			}

			image {
				width: 100%;
				height: 100%;
			}
		}

		.main_tip {
			margin-top: 65rpx;
			text-align: center;
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #132B2E;
		}

		.main_phone {
			margin-top: 30rpx;
			text-align: center;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: Regular;
			color: #B2B9BA;

			text {
				color: #0191A0;
			}
		}
	}
</style>
