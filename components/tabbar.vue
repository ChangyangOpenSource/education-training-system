<template>
	<view class="tabbar-bg">
		<view class="item" v-if="courseState == true" @click="goPage(1)" style="padding-right: 30rpx;">
			<image src="@/static/tabBarIcon/home.png" v-show="index != 1" />
			<image src="@/static/tabBarIcon/home-h.png" v-show="index == 1" />
			<view class="text" :class="{'active-text' : index == 1}">
				课程
			</view>
		</view>
		<view class="item" v-if="courseState == true" @click="goPage(2)" style="padding:0 30rpx;">
			<image src="@/static/tabBarIcon/learn.png" v-show="index != 2" />
			<image src="@/static/tabBarIcon/learn-h.png" v-show="index == 2" />
			<view class="text" :class="{'active-text' : index == 2}">
				学习
			</view>
		</view>
		<view class="item" v-if="questionState == true" @click="goPage(3)" style="padding:0 30rpx;">
			<image src="@/static/tabBarIcon/tiku1.png" v-show="index != 3" />
			<image src="@/static/tabBarIcon/tiku2.png" v-show="index == 3" />
			<view class="text" :class="{'active-text' : index == 3}">
				题库
			</view>
		</view>
		<view class="item" @click="goPage(4)" style="padding-left: 30rpx;">
			<image src="@/static/tabBarIcon/mine.png" v-show="index != 4" />
			<image src="@/static/tabBarIcon/mine-h.png" v-show="index == 4" />
			<view class="text" :class="{'active-text' : index == 4}">
				我的
			</view>
		</view>
	</view>
</template>

<script>
	import {
		findDistributionl
	} from '@/api/homeAudition.js'
	export default {
		props: {
			index: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				questionState: uni.getStorageSync('questionState'), // 小程序题库权限
				courseState: uni.getStorageSync('courseState'), // 小程序课程权限
			}
		},
		created() {
			findDistributionl().then((res) => {
				console.log('获取权限和开课模式', res)
				if (res.code == 200) {
					// 小程序课程价格是否显示,false不显示价格
					if (res.result.isDisplayPrice === true || res.result.isDisplayPrice === false) {
						console.log(res.result.isDisplayPrice, '存储是否显示价格')
						uni.setStorageSync('isDisplayPrice', res.result.isDisplayPrice)
						this.isDisplayPrice = res.result.isDisplayPrice
					}
					// 小程序是否能继续使用，0不能使用
					if (res.result.validityFlg === 0 || res.result.validityFlg === 1) {
						console.log(res.result.validityFlg, '存储小程序是否能使用，0不能，1能')
						uni.setStorageSync('validityFlg', res.result.validityFlg)
						this.validityFlg = res.result.validityFlg
					}
					// 开课模式
					if (res.result.courseControl) {
						console.log(res.result.courseControl, '存储开课方式')
						uni.setStorageSync('courseControl', res.result.courseControl)
					}
					// 机构权限
					if (res.result.authority) {
						if (res.result.authority.indexOf('question') != -1) {
							this.questionState = true
							uni.setStorageSync('questionState', true)
						}
						if (res.result.authority.indexOf('course') != -1) {
							this.courseState = true
							uni.setStorageSync('courseState', true)
						}
					}
				}
			})
		},
		methods: {
			/**
			 * 切换tabbar
			 * @param {Object} num
			 */
			goPage(num) {
				if (num != this.index) {
					this.$emit('changeTabbarIndex', num)
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.tabbar-bg {
		background: #fff;
		position: fixed;
		z-index: 50;
		left: 0;
		bottom: 0;
		box-sizing: border-box;
		width: 100%;
		padding: 13rpx 0 50rpx 0;
		display: flex;
		justify-content: space-around;
		box-shadow: 0rpx 0rpx 7rpx 0rpx rgba(0, 0, 0, 0.2);



		.item {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			image {
				width: 46rpx;
				height: 43rpx;
			}

			.text {
				margin-top: 9rpx;
				text-align: center;
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #666666;
			}

			.active-text {
				color: $uni-primary;
			}

		}
	}
</style>