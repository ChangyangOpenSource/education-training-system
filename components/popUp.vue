<template>
	<!-- 弹出框 -->
	<u-popup v-model="show" mode="bottom" :border-radius="20" :mask-close-able="false">
		<view class="dialog">
			<view class="dialog-head">
				<text class="choice">选择</text>
				<u-icon size="30" name="close" class="closes" @click="hideDialog"></u-icon>
			</view>
			<view class="dialog-main" v-for="(item, i) in model" :key="i"
				:style="{ display: i === isactive ? '' : 'none' }">
				<view class="course-amount" >
					<image :src="coverImg" class="course-img"></image>
					<!-- <view class="xinhezi"> -->
					<view class="course-money" v-if="isDisplayPrice == true">￥{{ item.fficialPrice | amounts }}</view>
					<view class="course-money2" v-if="item.lineFficialPrice!=0 && isDisplayPrice == true">
						￥{{ item.lineFficialPrice | amounts }}</view>
					<!-- </view> -->

				</view>
				<view class="courseBtn">
					<button :class="[isactive == j ? 'activebtn' : 'blurbtn', 'btns']" @click="btnActive(btn, j)"
						v-for="(btn, j) in model" :key="btn.id">
						{{ btn.classesTypeName }}
					</button>
				</view>
				<view class="tips" v-if="item.instructions">
					<image :src="imageUrl + '/static/lessonDetail/tipsicon.png'
            " class="tipsIcon"></image>
					<text>{{ item.instructions }}</text>
				</view>
			</view>
			<view class="dialog-foot">
				<button class="now-buy btn" @click="footHandleChange" v-if="isBuy && defaultVal.fficialPrice == 0">
					免费领取
				</button>
				<button class="now-buy btn" @click="footHandleChange"
					v-if="isBuy && defaultVal.fficialPrice != 0 && courseControl == 'pay'">
					立即购买
				</button>
				<button class="now-buy btn" @click="footHandleChange"
					v-if="isBuy && defaultVal.fficialPrice != 0 && courseControl == 'open'">
					立即开课
				</button>
				<!-- 调起微信客服 -->
				<button class="now-view btn" open-type="contact" show-message-card session-from send-message-path
					send-message-title @click="footHandleChange" v-else>
					<image style="width: 47rpx; height: 47rpx; margin-right: 20rpx" :src="imageUrl + '/home/uni10.png' ">
					</image>
					立即咨询
				</button>
			</view>
		</view>
		<view v-show='loginAss' class="back-tankuang">
			<login class="loginw" @guanbi='guanbi' />
		</view>
	</u-popup>


</template>
<script>
	import {
		getToken
	} from "@/common/util/index.js";
	export default {
		data() {
			return {
				isactive: 0,
				defaultVal: "",
				imageUrl: getApp().globalData.imageUrl,
				loginAss: getApp().globalData.loginAss,
				isDisplayPrice:''
			};
		},
		props: {
			show: {
				type: Boolean,
				default: false,
			},
			isBuy: {
				type: Boolean,
				default: true,
			},
			model: {
				type: Array,
				default: [],
			},
			coverImg: {
				type: String,
				default: "",
			},
			courseControl: {
				type: String,
				default: "pay", // pay购买，open开课
			}
		},
		mounted() {
			console.log(this.courseControl,'popUp 获取开课方式')
			this.isDisplayPrice = uni.getStorageSync('isDisplayPrice')
			
		},
		methods: {
			guanbi(value) {
				this.loginAss = value
			},
			setData() {
				if (this.model.length > 0) this.defaultVal = this.model[0]
			},
			hideDialog() {
				this.$emit("hideDialog");
			},
			btnActive(val, index) {
				this.$emit("handleChange", val);
				this.defaultVal = val;
				this.isactive = index;
			},
			footHandleChange() {
				const token = getToken();
				if (token) {
					if (!this.defaultVal) {
						this.defaultVal = this.model[0];
					}
					this.$emit("footHandleChange", this.defaultVal);
				} else {
					// uni.navigateTo({
					// 	url: "/pages/login/login",
					// });
					this.loginAss = true
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	button::after {
		margin: 0 !important;
		padding: 0 !important;
		border: 0 !important;
	}

	.xinhezi {
		// display: flex;
		// flex-direction: column;
	}

	.dialog {
		// height: 680rpx;
		position: relative;
		width: 100%;
		box-sizing: border-box;
		padding: 30rpx;
		height: 700rpx;

		.dialog-head {
			width: 100%;
			text-align: center;
			position: relative;
			padding-bottom: 39rpx;
			border-bottom: 2rpx solid #eaeaea;

			.choice {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			}

			.closes {
				position: absolute;
				top: 8rpx;
				right: 0;
			}
		}

		.dialog-main {
			margin-top: 41rpx;

			.course-amount {
				display: flex;
				justify-content: flex-start;
				align-items: center;

				.course-img {
					width: 270rpx;
					height: 154rpx;
				}

				.course-money {
					font-size: 40rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #fa632b;
					margin-left: 48rpx;
				}

				.course-money2 {
					font-size: 32rpx;
					text-decoration: line-through;
					color: #999999;
					margin-left: 48rpx;
					text-align: center;
					margin-left: 28rpx;
				}
			}

			.courseBtn {
				display: flex;
				align-items: center;
				justify-content: flex-start;
				margin-top: 52rpx;
				flex-wrap: wrap;

				.btns {
					// width: 199rpx;
					padding: 0 20rpx;
					height: 60rpx;
					border-radius: 29rpx;
					line-height: 2;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					margin: 0 20rpx 20rpx 0;

					::after {
						border: none;
					}
				}

				.activebtn {
					background-color: #ffebe0;
					border: 2rpx solid #fa632b;
					color: #fa632b;
				}

				.blurbtn {
					border: 2rpx solid #dddddd;
					background-color: #fff;
					color: #333333;
				}
			}

			.tips {
				margin-top: 20rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;

				.tipsIcon {
					width: 26rpx;
					height: 26rpx;
					margin-right: 10rpx;
				}

				text {
					flex: 1;

				}
			}
		}

		.dialog-foot {
			padding: 0 30rpx;
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			// margin-top: 50rpx;
			// margin-bottom: 30rpx;
			// width: 749rpx;
			height: 122rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(108, 108, 108, 0.3);

			.btn {
				width: 100%;
				height: 80rpx;
				border-radius: 40rpx;
				color: #fff;
				// width: 126rpx;
				// height: 31rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: bold;

				// color: #FFFFFF;
				// line-height: 36rpx;
				::after {
					border: none;
				}
			}

			.now-buy {
				line-height: 80rpx;
				background-color: #fa632b;
			}

			.now-view {
				display: flex;
				align-items: center;
				justify-content: center;
				// background-color: #3d7dff;
				background-color: #fa632b;
			}
		}
	}

	.chucuno {
		position: absolute;
		top: 50%;
		margin-top: -150rpx;
		z-index: 9999;
		left: 50%;
		margin-left: -325rpx;
	}

	.back-tankuang {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 9999;
		height: 100%;
		background: rgba(51, 51, 51, 0.5);
	}
</style>
