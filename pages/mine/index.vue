<template>
	<view class="bg" style="width: 100%;height: 100%;">
		<view class="mine-top">
			<view class="my">我的</view>
		</view>
		<view class="body">
			<!-- 背景图 -->
			<view class="bgimg-bottom"> </view>
			<image :src="imageUrl+'/xing/beijing.png'" class="bgimg" />
			<!-- 登录头 -->
			<view class="userlogin">
				<view class="user-content" @click="toLogin">
					<view class="userloginLeft">
						<div class="user-img-box">
							<image :src="userInfo.headimgurl || imageUrl+'/static/avatar_boy.png'" class="user-img">
							</image>
						</div>
						<view class="login-register">{{ userInfo.stuName || "未登录" }}</view>
					</view>
				</view>
			</view>
			<!-- 选项列表 -->
			<view class="option-setUp">
				<view class="option-list">
					<view class="option-item" @click="goto('/pages-mine/vip/vip')" v-if="questionState">
						<view class="right">
							<image :src="imageUrl+'/home/uni18.png'" class="option-icon" />
							<view class="option-text">题库兑换</view>
						</view>
						<u-icon size="30" name="arrow-right" color="rgb(192, 192, 192)" />
					</view>
					<view class="border" v-if="questionState"> </view>

					<view class="option-item" @click="goto('/pages-mine/courseOrder/courseOrder')" v-if="courseState">
						<view class="right">
							<image :src="imageUrl+'/xing/book.png'" class="option-icon" />
							<view class="option-text">课程订单</view>
						</view>
						<u-icon size="30" name="arrow-right" color="rgb(192, 192, 192)" />
					</view>
					<view class="border" v-if="courseState"> </view>

					<view class="option-item" @click="goto('/pages-mine/receivingAddress/receivingAddress')"
						v-if="courseState">
						<view class="right">
							<image :src="imageUrl+'/xing/home.png'" class="option-icon"
								style="width: 36rpx;height: 33rpx;" />
							<view class="option-text">收货地址</view>
						</view>
						<u-icon size="30" name="arrow-right" color="rgb(192, 192, 192)" />
					</view>
					<view class="border" v-if="courseState"> </view>
					<view class="option-item" @click="goto('/pages-mine/aboutUs/aboutUs')" v-if="myProgram">
						<view class="right">
							<image :src="imageUrl+'/xing/mine.png'" class="option-icon2" />
							<view class="option-text">关于我们</view>
						</view>
						<u-icon size="30" name="arrow-right" color="rgb(192, 192, 192)" />
					</view>
					<view class="border" v-if="myProgram"> </view>
					<view class="option-item" @click="goto('/pages-mine/about/about')" v-if="!myProgram">
						<view class="right">
							<image :src="imageUrl+'/xing/mine.png'" class="option-icon2" />
							<view class="option-text">关于我们</view>
						</view>
						<u-icon size="30" name="arrow-right" color="rgb(192, 192, 192)" />
					</view>
					<view class="border" v-if="!myProgram"> </view>
					<view class="option-item" @click="goto('/pages-mine/feedback/feedback')">
						<view class="right">
							<image :src="imageUrl+'/xing/mail.png'" class="option-icon3" />
							<view class="option-text">意见反馈</view>
						</view>
						<u-icon size="30" name="arrow-right" color="rgb(192, 192, 192)" />
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		getUserInfo,
		getToken
	} from "@/common/util/index.js";
	import baseConfig from "@/baseConfig";
	export default {
		name: "Mines",
		props: {
			userInfo: { // 当前用户信息
				type: Object,
				default: () => {
					return {}
				},
			},
			myProgram: { // 当前appid是否是自己的
				type: Boolean,
				default: false,
			},
			questionState: { // 题库权限
				type: Boolean,
				default: false,
			},
			courseState: { // 课程权限
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {
				imageUrl: getApp().globalData.imageUrl,
			};
		},
		mounted() {},
		methods: {
			goto(url) {
				uni.navigateTo({
					url,
				});
			},
			// 登录
			toLogin() {
				if (!getToken()) {
					this.$emit('toLogin')
				}
			},
		},
	};
</script>

<style scoped lang="scss">
	.border {
		width: 631rpx;
		border-top: 1rpx solid #fafafa;
		margin: 0 auto;
	}

	.mine-top {
		width: 100%;
		z-index: 2;

		.my {
			// box-sizing: border-box;
			position: absolute;
			top: 100rpx;
			// width: 100%;
			margin-bottom: 51rpx;
			z-index: 1000;
			font-size: 38rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #fff;
			margin-left: 23rpx;
		}
	}

	.body {
		position: relative;
		width: 100%;
		z-index: 2;

		.bgimg-bottom {
			position: absolute;
			z-index: 1;
			top: 415rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 100%;
			height: 30rpx;
			border-top-left-radius: 30rpx;
			border-top-right-radius: 30rpx;
			background: #fafafa;
		}

		//   <!-- 背景图 -->
		.bgimg {
			width: 100%;
			position: absolute;
			height: 442rpx;
			z-index: -1;
		}

		//   <!-- 登录头 -->
		.userlogin {
			width: 100%;
			height: 442rpx;
			box-sizing: border-box;
			padding: 0 26rpx;
			display: flex;
			align-items: center;

			.user-content {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;

				.userloginLeft {
					display: flex;
					align-items: center;

					.user-img-box {
						width: 120rpx;
						height: 121rpx;
						background: #FFFFFF;
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius: 50%;
					}

					.user-img {
						width: 87rpx;
						height: 87rpx;
						border-radius: 50%;
					}

					.login-register {
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #ffffff;
						margin-left: 35rpx;
					}
				}

				.backIcon {
					width: 19rpx;
					height: 34rpx;
				}
			}
		}

		.option-setUp {
			width: 100%;
			box-sizing: border-box;
			padding: 0 30rpx;
			position: absolute;
			top: 330rpx;
			z-index: 5;

			//   <!-- 选项列表 -->
			.option-list {
				width: 100%;
				border-radius: 20rpx;
				background-color: #fff;
				box-shadow: 0px 0px 10px 0px rgba(127, 126, 126, 0.2);

				.option-item {
					box-sizing: border-box;
					height: 102rpx;
					width: 100%;
					// border-bottom: 1px solid #ecebeb;
					padding: 0 19rpx 0 23rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.right {
						display: flex;
						justify-content: flex-start;
						align-items: center;
					}

					.option-icon {
						width: 35rpx;
						height: 34rpx;
					}

					.option-icon2 {
						width: 30rpx;
						height: 35rpx;
					}

					.option-icon3 {
						width: 34rpx;
						height: 28rpx;
					}

					.option-icon32 {
						width: 36rpx;
						height: 31rpx;
					}

					.option-icon33 {
						width: 40rpx;
						height: 30rpx;
					}

					.option-text {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
						line-height: 28rpx;
						padding-left: 15rpx;
					}

					&:last-of-type {
						border: none;
					}
				}
			}
		}
	}
</style>