<!-- 自定义顶部导航【带返回】 -->
<template>
	<view class="bg">
		<view class="top_nav_return">
			<view class="imgbox" @click="backPage()">
				<image :src="imageUrl+'/icon/arrow_l_white.png'" mode=""></image>
			</view>
			<view class="top_nav_title"> 历年真题 </view>
			<view class="imgbox"> </view>
		</view>
		<view class="" v-if="lnzt_list && lnzt_list.length > 0">
			<view class="content">
				<view class="list" v-for="(item,index) in lnzt_list" :key="index" @click="onParsing(item)">
					<view class="list_l">
						<view class="text"> {{item.paperName}} </view>
						<view class="tip" v-if="item.isLastHole == 1"> 继续做 </view>
					</view>
					<view class="list_r">
						<text class="text1">
							<text v-if="item.doNumber == null">0</text>
							<text v-else-if="item.doNumber == 0">{{item.doNumber != null ? item.doNumber : ''}}</text>
							<text style="color:#0191A0;"
								v-else-if="item.doNumber > 0 && item.doNumber < item.allNumber">{{item.doNumber != null ? item.doNumber : ''}}</text>
							<text v-else>{{item.doNumber != null ? item.doNumber : ''}}</text>
							/
							<text>{{item.allNumber != null ? item.allNumber : ''}}</text>
						</text>
						<image :src="imageUrl+'/icon/arrow_r_1.png'" />
					</view>
				</view>
			</view>
			<view class="list_end"> —— 到底了 —— </view>
		</view>
		<image :src="imageUrl+'/icon/question_nodata.png'" class="nodata_tip" v-else />
		<view v-show='loginAss' class="back-tankuang">
			<login class="loginw" @guanbi='guanbi' />
		</view>
	</view>
</template>

<script>
	import {
		get_lnzt_list,
		get_lnzt_listById
	} from '@/api/index/lnzt.js'
	import {
		getToken,
		getMajorInfo2,
		setlistById,
		getlistById,
		setchapter,
		getchapter,
		setpaper,
		setUserInfo,
		getUserInfo
	} from '@/common/util/index.js'
	import {
		checkLoginState
	} from '@/api/login2.js'
	export default {
		data() {
			return {
				lnzt_list: [],
				loginAss: getApp().globalData.loginAss,
				imageUrl: getApp().globalData.imageUrl,
				viewFlg: 0,
				viewFlgTip: '激活会员即可体验',
			}
		},
		onLoad() {
			this.get_lnzt_list()
		},
		onShow() {
			if (getUserInfo().majorIdStr.indexOf(getMajorInfo2().id) == -1) {
				this.viewFlg = 0
			} else {
				this.viewFlg = 1
			}
		},
		methods: {
			guanbi(value) {
				this.loginAss = value
			},
			onParsing(item) {
				if (!getToken()) {
					this.loginAss = true
				} else {
					if (this.viewFlg == 0) {
						uni.showToast({
							title: this.viewFlgTip,
							icon: 'none'
						})
					} else {
						checkLoginState().then((res) => {
							setpaper(item)
							uni.navigateTo({
								url: '/pagesB/answerSheet/answerSheet?sourceType=2'
							})
						}).catch((err) => {
							if (err.data.code == 401 && err.data.message == "账号在其他设备登录") {
								this.loginAss = true;
							}
						})
					}

				}
			},
			get_lnzt_list() {
				get_lnzt_list({
					majorId: getMajorInfo2().id
				}).then((res) => {
					this.lnzt_list = res.result
				})
			},
			backPage() {
				// uni.navigateBack();
				uni.reLaunch({
					url: `/pages/index/home?tabbarIndex=3`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nodata_tip {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 600rpx;
		height: 600rpx;
	}

	.list_end {
		padding: 50rpx 0;
		// padding-bottom: 50rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		color: #ccc;
		font-size: 30rpx;
	}

	.bg {
		// overflow: hidden;
		box-sizing: border-box;
		padding-top: 200rpx;
		min-height: 100vh;
		background: #fafafa;
	}

	.list {
		margin: 0 30rpx;
		padding: 40rpx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid #EEEEEE;
	}

	.list_l {
		display: flex;
		align-items: center;

		.text {
			margin-right: 30rpx;
			max-width: 350rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: bold;
		}

		.tip {
			width: 99rpx;
			height: 35rpx;
			text-align: center;
			line-height: 35rpx;
			color: #fff;
			font-size: 22rpx;
			font-family: PingFang SC;
			font-weight: 500;
			background-image: url($fileBaseUrl + '/icon/doing.png');
			background-size: cover;
		}
	}

	.list_r {
		font-size: 28rpx;
		font-family: Bahnschrift;
		font-weight: normal;
		display: flex;
		align-items: center;

		.text1 {
			margin-right: 40rpx;

			text {
				margin-right: 3rpx;
			}
		}

		image {
			width: 16rpx;
			height: 28rpx;
		}
	}

	.content {
		overflow: hidden;
		margin: 0 30rpx;
		background: #fff;
		border-radius: 20rpx;
	}

	.returnbox {
		position: absolute;
		top: -15rpx;
		left: -15rpx;
		height: 60rpx;
		width: 70rpx;
	}

	.top_nav_return {
		position: fixed;
		z-index: 10;
		top: 0;
		left: 0;
		width: 100%;
		padding-top: 110rpx;
		padding-bottom: 30rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		background-color: $uni-primary;

		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.top_nav_title {
		position: relative;
		text-align: center;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #fff;


	}

	.imgbox {
		width: 59rpx;

		image {
			height: 36rpx;
			width: 19rpx;
		}
	}
</style>