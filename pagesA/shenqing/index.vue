<template>
	<view class="ashne">
		<view class="status_bar">
			<view class="top">
				
				<image @click="onFanhui" class="fanhui" :src="imageUrl+'/static/live/黑返回键.png'" mode=""></image>
				<view class="tuiguang2">
					申请推广大使
				</view>
			</view>
		</view>
		<image class="imga" :src="imageUrl+'/static/live/fcb9cf899d9c4bfc352e9d61cfe2d266.png'" mode=""></image>
		<image class="text" :src="imageUrl+'/static/live/畅阳教培推广大使.png'" mode=""></image>
		<view class="tuiguang">
			推广赚金币 · 收益可提现 · 提现秒到账
		</view>
		<image class="noaps" :src="imageUrl+'/static/live/介绍.png'" mode=""></image>
		<view class="wenben">
			<view> 亲爱的用户您好：</view>
			<text>
				感谢您使用畅阳教培APP进行学习和提升，现诚邀您成为推广大使，将好课分享给朋友的同时还能赚取收益哦！
				通过畅阳教培APP，选择您认可的课程，点击至您的好友圈，您的好友通过链接购课后，您即可获取推广奖励金币，金币实时到账至您的畅阳教培账户，随时可进行提现。
				点击下方按钮，申请成为推广大师赚取收益吧！

			</text>
		</view>
		<view class="bottom-button" @click="isAss=true">
			申请成为推广大使
		</view>
		<view class="tanchu" v-if="isAss==true">
			<view class="kuang">
				<view class="guanbi" @click="isAss=false">
					x
				</view>
				<view class="kuang-top">
					<text>姓名:</text>
					<input type="text" v-model="name" placeholder='请输入姓名' value="" />
				</view>
				<view class="kuang-tops">
					<text>邀请码:</text>
					<input type="text" v-model="value" placeholder='请输入邀请码' value="" />
				</view>
				<view class="kuang-button" @click="wdDistributor">
					提交申请
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
				value: '',
				name: '',
				isAss: false,
				imageUrl: getApp().globalData.imageUrl
			}
		},
		onShow() {
			let aaa = getCurrentPages()
			console.log(aaa, 12)
			let thatPage = aaa[aaa.length - 1];
			var prevPage = pages[pages.length - 2]; // 上一个页面
			console.log(prevPage)
		},
		onLoad(optiois) {
			if (optiois.code) {
				this.isAss = true
				this.value = optiois.code
			}
		},
		onUnload() {
			console.log('销毁1')
			uni.removeStorageSync('code')
		},
		methods: {
			guanbi(value) {
				this.loginAss = value
			},

			wdDistributor() {
				if (this.name == '') {
					uni.showToast({
						title: '请输入姓名',
						icon: "none"
					})
				} else {
					NET.request(API.wdDistributor, {
						name: this.name,
						invitationCode: this.value
					}, 'post').then(res => {
						console.log(res)
						if (res.code == 200) {
							this.isAss = false
							uni.showToast({
								title: res.result,
								icon: "none",
							});
						}
						if (res.code == 500) {
							this.isAss = false
							uni.showToast({
								title: res.message,
								icon: "none",
							});
						}
					})
				}

			},
			onFanhui() {
				// uni.switchTab({
				// 	url: "/pages/index/home",
				// })
				uni.reLaunch({
					url: '/pages/index/home'
				})
			}
		}

	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.topo-LOging {
		height: var(--status-bar-height);
		width: 100%;
		position: relative;
		background: #FFFFFF;
		// margin-bottom: 27rpx;
		text-align: center;
		line-height: 88rpx;

	}


	.tuiguang2 {
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #000000;
	}

	.top {
		display: flex;
		margin-left: 31rpx;
		margin-top: 90rpx;
		align-items: center;
		padding-bottom: 20rpx;
	}

	.fanhui {
		width: 19rpx;
		height: 34rpx;
		margin-right: 230rpx;
	}

	.guanbi {
		font-size: 54rpx;
		text-align: right;
		margin-right: 22rpx;
		margin-bottom: 22rpx;
	}

	.ashne {
		width: 100%;
		height: 100%;
	}

	.imga {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.text {
		position: absolute;
		top: 182rpx;
		width: 648rpx;
		height: 90rpx;
		left: 44rpx;
	}

	.tuiguang {
		font-size: 36rpx;
		font-weight: 400;
		color: #FFFFFF;
		position: absolute;
		top: 327rpx;
		left: 71rpx;
	}

	.noaps {
		position: absolute;
		top: 414rpx;
		left: 30rpx;
		width: 688rpx;
		height: 759rpx;
	}

	.wenben {
		width: 527rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #101854;
		position: absolute;
		top: 700rpx;
		left: 108rpx;

		view {
			margin-bottom: 8rpx;
			color: rgba(16, 24, 84, 1);
		}

		text {
			line-height: 42rpx;
			color: rgba(16, 24, 84, 1);
		}
	}

	.bottom-button {
		width: 500rpx;
		height: 90rpx;
		background: linear-gradient(137deg, #F28E26, #FD644F);
		border-radius: 45rpx;
		position: absolute;
		top: 1200rpx;
		left: 113rpx;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		text-shadow: 0px 4rpx 6rpx rgba(69, 69, 69, 0.28);
		text-align: center;
		line-height: 90rpx;
	}

	.tanchu {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		background: RGBA(25, 62, 84, 0.4);
	}

	.kuang {
		width: 635rpx;
		height: 520rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		margin-top: 435rpx;
		margin-left: 56rpx;
		// padding-top: 56rpx;
	}

	.kuang-top {
		display: flex;
		align-items: center;
		margin-left: 51rpx;

		text {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #2B2B2B;
			margin-right: 56rpx;
		}

		input {
			width: 418rpx;
			height: 78rpx;
			background: #EEEEEE;
			border-radius: 20rpx;
			// text-indent:20rpx;
			padding-left: 20rpx;
		}
	}

	.kuang-tops {
		display: flex;
		align-items: center;
		margin-left: 51rpx;
		margin-top: 68rpx;

		text {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #2B2B2B;
			margin-right: 30rpx;
		}

		input {
			width: 418rpx;
			height: 78rpx;
			background: #EEEEEE;
			border-radius: 20rpx;
			// text-indent:20rpx;
			padding-left: 20rpx;
		}
	}

	.kuang-button {
		width: 500rpx;
		height: 90rpx;
		background: #3B7BFF;
		border-radius: 45rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		text-shadow: 0px 4rpx 6rpx rgba(69, 69, 69, 0.28);
		line-height: 90rpx;
		text-align: center;
		margin-top: 68rpx;
		margin-left: 79rpx;
	}
</style>
