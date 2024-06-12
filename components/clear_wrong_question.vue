<!-- 
	消灭错题底部按钮 + 弹窗
	作用于错题页+收藏页
 -->
<template>
	<view class="">
		<view class="footer">
			<view class="footer_tip">
				不要让错题越来越多！
			</view>
			<view class="footer_btn" @tap="showDiv()">
				消灭错题
			</view>
		</view>
		
		<view>
			<view :hidden="userFeedbackHidden" class="popup_content">
				<view class="popup_title">选择题型数量</view>
				<view class="popup_option">
					单项选择
					<view class="popup_option_computed">
						<image :src="imageUrl+'/icon/del.png'"   @tap="del( 1)" />
						<text>{{ num1 >= 0 ?  num1 : 0}}</text>
						<image :src="imageUrl+'/icon/add.png'"   @tap="add( 1)" />
					</view>
				</view>
				<view class="popup_option">
					多项选择
					<view class="popup_option_computed">
						<image :src="imageUrl+'/icon/del.png'"  @tap="del( 2)" />
						<text>{{ num2 >= 0 ?  num2 : 0}}</text>
						<image :src="imageUrl+'/icon/add.png'"  @tap="add( 2)" />
					</view>
				</view>
				<view class="popup_option">
					公用题干
					<view class="popup_option_computed">
						<image :src="imageUrl+'/icon/del.png'"  @tap="del( 3)" />
						<text>{{ num3 >= 0 ?  num3 : 0}}</text>
						<image :src="imageUrl+'/icon/add.png'"  @tap="add( 3)" />
					</view>
				</view>
				<view class="popup_option">
					共用选项
					<view class="popup_option_computed">
						<image :src="imageUrl+'/icon/del.png'"  @tap="del( 4)" />
						<text>{{ num4 >= 0 ?  num4 : 0}}</text>
						<image :src="imageUrl+'/icon/add.png'"  @tap="add( 4)" />
					</view>
				</view>
				<view @click="submitFeedback()" class="popup_button">
					生成练习
				</view>
				<view class="popup_imgbox" @click="hideDiv()">
					<image :src="imageUrl+'/icon/close_a.png'"  />
				</view>
			</view>
			<view class="popup_overlay" :hidden="userFeedbackHidden" @click="hideDiv()"></view>
		</view>
	</view>
</template>
<script>
	import {
		practice_collection,
	} from '@/api/nav/shoucang.js'
	import {
		getToken,
		getMajorInfo2
	} from '@/common/util/index.js'
	export default {
		data() {
			return {
				imageUrl: getApp().globalData.imageUrl,
				//	智能组题中四种题型的数量
				num1: 5,
				num2: 5,
				num3: 5,
				num4: 5,
				//	控制‘组题弹窗’的显示隐藏状态
				userFeedbackHidden: true,
				//	feedbackContent暂时没用
				//  feedbackContent: "",
			}
		},
		methods: {
			del(num) {
				console.log('将对num' + num + '进行-1');
				if (num == 1) {
					if (this.num1 - 1 <= 0) {
						return this.num1 = 0
					} else {
						this.num1 -= 1
					}
				} else if (num == 2) {
					if (this.num2 - 1 <= 0) {
						return this.num2 = 0
					} else {
						this.num2 -= 1
					}
				} else if (num == 3) {
					if (this.num3 - 1 <= 0) {
						return this.num3 = 0
					} else {
						this.num3 -= 1
					}
				} else {
					if (this.num4 - 1 <= 0) {
						return this.num4 = 0
					} else {
						this.num4 -= 1
					}
				}
			},
			add(num) {
				console.log('将对num' + num + '进行+1');
				if (num == 1) {
					this.num1 += 1
				} else if (num == 2) {
					this.num2 += 1
				} else if (num == 3) {
					this.num3 += 1
				} else {
					this.num4 += 1
				}
			},
			showDiv() {
				//	显示组题弹窗
				this.userFeedbackHidden = false
			},
			hideDiv() {
				//	隐藏组题弹窗
				this.userFeedbackHidden = true
				this.num1 = 5
				this.num2 = 5
				this.num3 = 5
				this.num4 = 5
			},
			submitFeedback() {
				let all_num = this.num1 + this.num2 + this.num3 + this.num4
				let practiceVo = {
					dictId: '',
					majorId: getMajorInfo2().id,
					num: String(all_num),
					topicCategory: '',
				}
				console.log('提交组题数据', practiceVo);
				practice_collection([practiceVo]).then((res) => {
					console.log('智能组题成功返回值：',res);
					if (res.code == 200) {
						uni.showToast({
							title: '组题成功'
						})
					} else {
						uni.showToast({
							title: '组题失败',
							icon: 'error'
						})
					}
				}).catch((err) => {
					console.log(err);
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.footer {
		position: fixed;
		bottom: 0;
		background-color: white;
		width: 100vw;
		display: flex;
		justify-content: space-between;
		align-items: center;
	
		.footer_tip {
			margin-left: 30rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #132B2E;
		}
	
		.footer_btn {
			margin: 25rpx 30rpx 25rpx 0;
			width: 270rpx;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			background: #0191A0;
			border-radius: 10rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
		}
	}
	
	
	
	
	/* //sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss */
	
	
	
	.popup_overlay {
		position: fixed;
		top: 0%;
		left: 0%;
		z-index: 1001;
		width: 750px;
		height: 1500px;
		background: #434343;
		opacity: 0.38;
	}
	
	.popup_content {
		position: fixed;
		bottom: 0;
		z-index: 1002;
		width: 750rpx;
		background: #FFFFFF;
		border-radius: 10rpx 10rpx 0rpx 0rpx;
	}
	
	.popup_imgbox {
		position: absolute;
		top: 30rpx;
		right: 30rpx;
		width: 26rpx;
		height: 26rpx;
	
		image {
			width: 100%;
			height: 100%;
		}
	}
	
	.popup_title {
		padding: 40rpx 0;
		margin: 0 30rpx;
		border-bottom: 1rpx solid #DDDDDD;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #132B2E;
		text-align: center;
	}
	
	.popup_option {
		margin-top: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	
		.popup_option_computed {
			margin-left: 122rpx;
			display: flex;
			align-items: center;
	
			text {
				display: inline-block;
				margin: 0 45rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			}
	
			image {
				height: 54rpx;
				width: 54rpx;
			}
		}
	
	}
	
	
	.popup_button {
		margin: 90rpx 30rpx 40rpx 30rpx;
		padding: 25rpx 0;
		text-align: center;
		background: #0191A0;
		border-radius: 10rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	
	}
	
	
	
	
	
	
</style>