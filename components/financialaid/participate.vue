<template>
	<view class="jieshao">
		<view class="jieshao-top">
			<image class="ren" :src="imageUrl+'/static/fsdownload/2.png'" mode=""></image>
			<image class="zi" :src="imageUrl+'/static/fsdownload/6.png'" mode=""></image>
			<view class="botton-border"></view>
		</view>
		<view class="tetx-divs">
			<mp-html :content="content"> </mp-html>
			<!-- <view class="text-jieshao">
				畅阳教培秉承学习成就未来的愿景，为助力医药卫
				生人才实现专业精进及能力提升，致力做有专业、
				有温度的教育企业，特面向全部用户开启百万助
				学“温度计划”。凡在畅阳教培APP注册学习的用户
				均可通过参与“温度计划”领取个人专属助学金，
				取得的助学金可在购买付费学习内容时直接进行
				抵扣.
			</view>
			<view class="fangshi">
				助学金获取方式:
			</view>
			<view class="guize">
				1、点击下方【我要报名计划】，参与“温度计划”。<br />
				2、点击【邀请好友助力】分享至微信朋友圈或微
				信群聊，邀请好友为助力。<br />
				3、好友点击您分享的链接进行助力后，您的账户
				即可实时获得个人助学金。<br />
				4、选择您需要购买的课程，支付时助学金将自动
				进行抵扣。
			</view>
			<view class="guize-two">
				点击下方按钮报名“温度计划”，<br class='height' />
				领取助学金开启你的学习成长之路吧！
			</view> -->
		</view>
<!-- 		<view class="button" @click="OnsignUp">
			我要报名计划
		</view> -->
	</view>
</template>

<script>
	import mpHtml from '@/components/mp-html/index'
	export default {
		props: {
			// 数据
			amount: {
				type: Object,
				default: {},
			},
		},
		data() {
			return {
				imageUrl: getApp().globalData.imageUrl,
				content:''
			}
		},
		mounted() {
			console.log()
			this.content = this.amount.activityContent.replace(/\<img/gi, '<image style="width:100% !important;height:auto !important"');
			// this.content = this.amount.activityContent.replace(/\<ul/gi, '<ul style="width:574upx;height:auto"');

		},
		methods: {
			OnsignUp() {
				this.$emit('plans', 3)
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		// width: 10%;
		// height: 100%;
	}

	@keyframes toleft {
		from {
			left: 100%;
		}

		to {
			left: -1300%;
		}
	}

	.container {
		background: url($fileBaseUrl + '/ykstatic/fsdownload/3.png');
		width: 100%;
		// height: 100%;
		background-size: 100%;
		padding-top: 50upx;
		padding-bottom: 24rpx;
	}

	.texts {
		font-size: 36upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 26upx;
		margin-left: 30upx;

		image {
			width: 19upx;
			height: 34upx;
			margin-right: 247upx;
		}
	}

	.renshu {
		background: url($fileBaseUrl + '/ykstatic/fsdownload/1.png') no-repeat;
		width: 313upx;
		height: 80upx;
		background-size: 100%;
		// margin-top: 44upx;
		// margin-left: -94upx;
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 70upx;
		text-align: right;
		padding-right: 49upx;
	}

	.animate {
		width: 100%;
		height: 360upx;
		overflow: hidden;
		display: flex;

		.in {
			position: relative;
			min-width: 200%;
			height: 100%;
			animation: toleft infinite linear;
			text-align: left;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.row {
				margin-bottom: 0.2em;
				display: flex;

				.point {
					margin-left: 80upx;
					display: flex;
					padding: 10upx 20upx;
					background: linear-gradient(0deg, #F78A9E 0%, #F56F87 50%, #FE988B 100%);
					border-radius: 38upx;

					.headImg {
						width: 40upx;
						height: 40upx;
						border-radius: 20upx;
						margin-right: 20upx;
					}

					.name {
						padding-right: 22upx;
						font-size: 24upx;
						color: #FFFFFF;
					}

					.text {
						font-size: 24upx;
						color: #FFFFFF;
					}

					.get_money {
						margin-left: 20upx;
						color: red;
					}

					span {
						white-space: nowrap;
					}
				}
			}
		}
	}

	.jieshao {
		width: 687upx;
		height: 1216upx;
		background: #FFFFFF;
		border-radius: 30upx;
		margin-left: 32upx;
		margin-top: 63upx;
	}

	.jieshao-top {
		display: flex;
		align-items: center;
		position: relative;
	}

	.ren {
		width: 147upx;
		height: 150upx;
		margin-left: 31upx;
		margin-top: 18rpx;
	}

	.zi {
		width: 346upx;
		height: 39upx;
	}

	.botton-border {
		width: 568upx;
		height: 1upx;
		border: 1upx dashed #C9C9C9;
		position: absolute;
		bottom: 30upx;
		left: 57upx;
	}

	.text-jieshao {
		font-size: 27upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #4F1A1A;
		line-height: 34upx;
		text-indent: 3upx;
	}

	.tetx-divs {
		width: 574upx;
		height: 1000upx;
		margin-left: 58upx;
		margin-top: 16upx;
		// overflow: hidden;
		overflow-y:scroll;
	}

	.fangshi {
		font-size: 28upx;
		font-family: FZCuYuan-M03S;
		font-weight: 400;
		color: #915645;
		line-height: 26upx;
		margin-top: 55upx;
	}

	.guize {
		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #4F1A1A;
		line-height: 44rpx;
		margin-top: 35upx;
	}

	.guize-two {
		margin-top: 24upx;
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 600;
		color: RGBA(79, 26, 26, 1);
	}

	.button {
		// background: url($fileBaseUrl + '/ykstatic/fsdownload/4.png');
		background-image: url($fileBaseUrl + '/zixun/img/img7.png');
		width: 611upx;
		height: 91upx;
		background-size: 100%;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 91upx;
		text-align: center;
		margin-left: 45upx;
		margin-top: 50upx;
	}

	.height {
		height: 35upx;
	}
</style>
