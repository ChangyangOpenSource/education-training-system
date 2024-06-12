<template>
	<view class="container">
		<!-- 	<view class="texts">
			<image :src="imageUrl + '/ykstatic/fsdownload/5.png" mode=""></image>
			畅阳助学
		</view> -->
		<view class="tip1">
			<image v-if="Activity.wdHelpStu.headimgurl" :src="Activity.wdHelpStu.headimgurl"  class="userimg_tip" />
			<image v-else :src="imageUrl+'/static/helpStuImg/img/user_pink.png'"  class="userimg_tip" />
			<view class="message_tip"> 我正在参加畅阳百万助学计划， 请你帮我助力~ </view>
		</view>
		<view class="list" v-if="isAss == 1">
			<view class="list-biaoti">
			</view>
			<view class="img3_box animation-qianbao">
				<!-- <image class="img3 animation-qianbao" :src="imageUrl+'/static/helpStuImg/img/img3.png'"  /> -->
				<view class="text10">
					<!-- 239.99 -->
					{{Activity.amount}}
				</view>
			</view>
			<view class="button-list" @click="onZhuli">
				为他助力
			</view>
		</view>
		<view class="list" v-if="isAss == 2">
			<view class="list-biaoti">
			</view>
			<view class="money">
				{{Activity.amount}}
			</view>
			<view class="xiaomoney">
				+{{Activity.wdHelpStuRecord.amount}}元
			</view>
			<image :class="{'damoney':true,'animation-lidai':isSaa==true}" :src="imageUrl+'/static/fsdownload/14.png'" mode=""></image>
			<view class="correct">
				<image class='correct-image' :src="imageUrl+'/static/fsdownload/13.png'" mode=""></image>
				<text>助力成功</text>
			</view>
			<view class="money-bottm">
				你的助力为他获得了<text>{{Activity.wdHelpStuRecord.amount}}</text>助学金
			</view>
		</view>
		<view class="list" v-if="isAss == 3">
			<view class="list-biaoti">
			</view>
			<view class="money">
				{{onmoub.amountAll}}
			</view>
			<view class="xiaomoney">
				+{{onmoub.amount}}元
			</view>
			<image :class="{'damoney':true,'animation-lidai':isSaa==true}" :src="imageUrl+'/static/fsdownload/14.png'" mode=""></image>
			<view class="correct">
				<image class='correct-image' :src="imageUrl+'/static/fsdownload/13.png'" mode=""></image>
				<text>助力成功</text>
			</view>
			<view class="money-bottm">
				你的助力为他获得了<text>{{onmoub.amount}}</text>助学金
			</view>
		</view>
		<view class="renshu">
			{{amount.peopleAll}}人正在参与计划
		</view>
		<div class="animate">
			<div class="in" :style="{'animation-duration':animationDuration+'s'}" v-for="(i,d) in 1" :key="i">
				<div class="row">
					<div class="point" v-for="(item,index) in userList.slice(0, Math.floor(userList.length / 5)* 1)"
						:key="index">
						<image class="headImg" v-if="item.headimgurl==''" :src="imageUrl+'/static/fsdownload/组40.png'" mode=""></image>
						<image class="headImg" v-else :src="item.headimgurl" mode=""></image>
						<text class="name">{{item.strContent}}</text>
						<!-- <text class="text">获得{{item.totalNumber}}助学金</text> -->
					</div>
				</div>
				<div class="row" style='padding-left: 50px;'>
					<div class="point"
						v-for='(item,index) in userList.slice(Math.floor(userList.length / 5)* 3,Math.floor(userList.length / 5)* 4)'
						:key="index">
						<image class="headImg" v-if="item.headimgurl==''" :src="imageUrl+'/static/fsdownload/组40.png'" mode=""></image>
						<image class="headImg" v-else :src="item.headimgurl" mode=""></image>
						<text class="name">{{item.strContent}}</text>
						<!-- <text class="text">获得{{item.totalNumber}}助学金</text> -->
					</div>
				</div>
				<div class="row" style='padding-left: 10px;'>
					<div class="point"
						v-for='(item,index) in userList.slice(Math.floor(userList.length / 5)* 4,Math.floor(userList.length / 5)* 5)'
						:key="index">
						<image class="headImg" v-if="item.headimgurl==''" :src="imageUrl+'/static/fsdownload/组40.png'" mode=""></image>
						<image class="headImg" v-else :src="item.headimgurl" mode=""></image>
						<text class="name">{{item.strContent}}</text>
						<!-- <text class="text">获得{{item.totalNumber}}助学金</text> -->
					</div>
				</div>
			</div>
		</div>
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

		</view>

		<view class="tanchu" v-if="hezi">
			<view class="hezi">
				<image class="guanbi" @click="hezi=false" :src="imageUrl+'/static/live/chufanhuijian.png'" mode=""></image>
				<view class="hezi-text">
					感谢你为我助力，关注公众号!<br />
					掌握医考第一资讯！
				</view>
				<image class="hezi-image" :src="amount.qrCode" mode=""></image>
				<view class="hezi-tishi">
					点击下方添加，保存二维码
				</view>
				<view class="hezi-button" v-if="onCodes==false" @click="onCode">
					添加
				</view>
				<view class="hezi-button" v-if="onCodes==true" @click="onGuanbi">
					已添加
				</view>
			</view>
		</view>
		<view v-show='loginAss' class="back-tankuang">
			<login class="loginw" @guanbi='guanbi' />
		</view>
		<view class="button" @click="onWon">
			我要报名计划
		</view>
	</view>


</template>
<script>
	import mpHtml from '@/components/mp-html/index'
	import {
		assistance,
		findByOthersActivity,
		findByActivity,
	} from "@/api/zhuli.js";
	export default {
		data() {
			return {
				loginAss: getApp().globalData.loginAss,
				animationDuration: 0,
				isAss: 0,
				isSaa: false,
				hezi: false,
				amount: {
					peopleAll: 0
				},
				userList: [],
				entityId: '',
				onmoub: '',
				showDay: false,
				onINSK: false,
				time: '',
				onCodes: false,
				imageUrl: getApp().globalData.imageUrl,
				isAsson: false,
				Activity: {
					amount: 0,
				},
				content: ''
			}
		},

		onLaunch(e) {
			console.log(e, 'onLaunch')
		},
		onUnload() {
			console.log('销毁1')
			uni.removeStorageSync('entityId')
			uni.removeStorageSync('shareUrl')
		},
		onLoad(opotios) {
			let aaa = getCurrentPages()
			//#ifdef H5
			let thatPage = {
				options: {}
			}
			thatPage.options = JSON.parse(aaa[aaa.length - 1].options.query)
			//#endif
			//#ifdef MP-WEIXIN
			let thatPage = aaa[aaa.length - 1];
			//#endif




			console.log(thatPage, 856)
			var token = wx.getStorageSync('token')
			if (thatPage.options.entityId) {
				console.log(123213)
				this.entityId = thatPage.options.entityId
				uni.setStorageSync('entityId', this.entityId)
				if (!token) {
					if (thatPage.options.entityId) {
						this.setShareUrl({
							entityId: thatPage.options.entityId
						})
					}
					return
				}
				this.findByRecord()
				this.queryByStudent()

			} else {
				this.entityId = uni.getStorageSync("entityId");
				console.log(456456)
				this.findByRecord()
				this.queryByStudent()
			}
			// this.animationDuration = Math.ceil(this.userList.length / 5) * 4

		},
		watch: {},
		methods: {
			setShareUrl(options) {
				try {
					let shareUrl = '/pagesA/fenxiang/fenxiang?';
					if (options.entityId) shareUrl += 'entityId=' + options.entityId
					uni.setStorageSync('shareUrl', shareUrl)
					console.log('新登录')
					this.loginAss = true
				} catch (e) {
					// error
				}
			},
			guanbi(value) {
				this.loginAss = value
			},
			onCode() {
				this.onCodes = true
				uni.showLoading({
					title: '图片保存中...'
				})
				uni.getImageInfo({
					src: this.imageUrl + '/static/fsdownload/15.jpg',
					success: function(image) {
						uni.saveImageToPhotosAlbum({
							filePath: image.path,
							success: function() {
								uni.hideLoading()
								uni.showToast({
									title: '图片保存成功'
								});
								this.hezi = false;
							},
							fail: function() {
								uni.hideLoading()
								uni.showModal({
									title: '图片保存失败',
									content: '请确认是否已开启授权',
									confirmText: '开启授权',
									success(res) {
										if (res.confirm) {
											uni.openSetting({
												success(settingdata) {
													if (settingdata.authSetting[
															"scope.writePhotosAlbum"
														]) {
														uni.showToast({
															title: '授权成功，请重试哦~',
															icon: "none"
														});
													} else {
														uni.showToast({
															title: '请确定已打开保存权限',
															icon: "none"
														});
													}
												}
											})
										}
									}
								})
							},
						});
					},
					fail() {}
				});
			},
			findByRecord() {
				findByActivity({
					helpStuId: this.entityId
				}).then(res => {
					console.log(res)
					this.amount = res.result
					this.content = this.amount.helpContent.replace(/\<img/gi,
						'<image style="width:100% !important;height:auto !important"');
					this.userList = res.result.recordList.slice(0, 100)
					this.animationDuration = Math.ceil(this.userList.length / 5) * 2
				})
			},

			onZhuli() {
				assistance({
					helpStuId: this.entityId
					// helpStuId: this.entityId
				}).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.isAss = 3
						this.isSaa = true
						this.onmoub = res.result
						setTimeout(() => {
							this.hezi = true
						}, 1000)
					} else {
						this.queryByStudent()
						uni.showModal({
							title: '温馨提示',
							content: res.message
						});
					}

				})
			},

			onGuanbi() {
				this.hezi = false
			},
			queryByStudent() {
				findByOthersActivity({
					// helpId: this.entityId
					helpStuId: this.entityId
				}).then(res => {
					this.isAss = res.result.flg
					console.log(res)
					this.Activity = res.result
				})
			},
			onWon() {
				uni.reLaunch({
					url: '/pagesA/index/index'
				})
			}
			// 	// uni.reLaunch({
			// 	// 	url: "../index/index"
			// 	// })

			// 	if (this.isAsson == false) {
			// 		this.isAsson = true
			// 		uni.showLoading({
			// 			mask: true,
			// 			title: '加载中'
			// 		})
			// 		queryByStudent().then(res => {
			// 			console.log(res)
			// 			this.amount = res.result
			// 			if (res.result.flg == 0) { //进行中
			// 				// this.findByRecord()
			// 				uni.hideLoading()
			// 				this.isAsson = false
			// 				planJoin().then(res => {
			// 					console.log(res)
			// 					if (res.code == 200) {
			// 						uni.reLaunch({
			// 							url: "../zhuxue/zhuxue"
			// 						})
			// 					}

			// 				})
			// 			} else if (res.result.flg == 1) { //进行中
			// 				setTimeout(() => {
			// 					uni.hideLoading()
			// 					this.isAsson = false
			// 					uni.reLaunch({
			// 						url: "../zhuxue/zhuxue"
			// 					})
			// 				}, 1000)
			// 			} else if (res.result.flg == 2) { //结束
			// 				uni.hideLoading()
			// 				this.isAsson = false
			// 				planJoin().then(res => {
			// 					console.log(res)
			// 					if (res.code == 200) {
			// 						uni.reLaunch({
			// 							url: "../zhuxue/zhuxue"
			// 						})
			// 					}

			// 				})
			// 			} else if (res.result.flg == 3) { //结束
			// 				uni.hideLoading()
			// 				this.isAsson = false
			// 				planJoin().then(res => {
			// 					console.log(res)
			// 					if (res.code == 200) {
			// 						uni.reLaunch({
			// 							url: "../zhuxue/zhuxue"
			// 						})
			// 					}

			// 				})
			// 			} else if (res.result.flg == 4) { //结束
			// 				uni.hideLoading()
			// 				this.isAsson = false
			// 				planJoin().then(res => {
			// 					console.log(res)
			// 					if (res.code == 200) {
			// 						uni.reLaunch({
			// 							url: "../zhuxue/zhuxue"
			// 						})
			// 					}

			// 				})
			// 			}

			// 		})
			// 	}
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.img5 {
		margin-top: 32rpx;
		width: 100%;
		height: 676rpx;
	}

	.img3_box {
		background: url($fileBaseUrl + '/zixun/img/img3.png');
		background-repeat: no-repeat;
		background-size: 100%;
		position: absolute;
		top: 146rpx;
		left: 148rpx;
		width: 394rpx;
		height: 317rpx;

		.img3 {
			width: 100%;
			height: 100%;
		}

		.text10 {
			position: absolute;
			top: 190rpx;
			left: 50%;
			transform: translateX(-50%);
			font-size: 50rpx;
			font-family: HYYaKuHeiW;
			font-weight: 400;
			color: #FFFFFF;
			text-shadow: 0px 0px 13px rgba(125, 31, 41, 0.39);
		}
	}


	.tip1 {
		margin: 50rpx 30rpx 0 27rpx;
		display: flex;
		align-items: center;

		.userimg_tip {
			width: 95rpx;
			height: 95rpx;
			margin-right: 16rpx;
			border-radius: 50rpx;
		}

		.message_tip {
			width: 445rpx;
			height: 114rpx;
			padding-left: 50rpx;
			padding-right: 25rpx;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			background-image: url($fileBaseUrl + '/zixun/img/message_bg.png');
			background-size: cover;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
		}
	}

	.guanbi {
		position: absolute;
		right: 20rpx;
		top: 20rpx;
		width: 35rpx;
		height: 35rpx;
		z-index: 9999;
	}

	page {
		// width: 10%;
		min-height: 100%;
		height: 100%;
	}

	@keyframes toleft {
		from {
			left: 100%;
		}

		to {
			left: -1300%;
		}
	}

	@keyframes leftRigt {
		0% {
			transform: rotate(0deg);
		}

		25% {
			transform: rotate(7deg);
		}

		50% {
			transform: rotate(-7deg);
		}

		100% {
			transform: rotate(0deg);
		}
	}



	@keyframes zhaRigt {
		from {
			transform: scale(0.5);
		}

		to {
			transform: scale(1.2);
		}

	}

	.tanchu {
		overflow-y: hidden;
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		background: rgba(39, 39, 39, 0.9);
		z-index: 3;
	}

	.hezi {
		width: 616upx;
		height: 681upx;
		background: #FFFFFF;
		border-radius: 20upx;
		margin-top: 443upx;
		margin-left: 65upx;
		padding-top: 53upx;
		position: relative;
	}

	.hezi-text {
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #0E0E0E;
		// margin-left: 93upx;
		text-align: center;
		line-height: 55upx;
	}

	.hezi-image {
		width: 301upx;
		height: 301upx;
		margin-top: 44upx;
		margin-left: 150upx;
	}

	.hezi-tishi {
		font-size: 22upx;
		font-family: PingFang SC;
		font-weight: 300;
		color: #696969;
		text-align: center;
		margin-top: 19upx;
	}

	.hezi-button {
		width: 329upx;
		height: 80upx;
		background: #FF2121;
		border-radius: 39upx;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: 500;
		margin-top: 24upx;
		margin-left: 143upx;
		text-align: center;
		line-height: 80upx;
		color: #FFFFFF;
	}

	.container {
		background: url($fileBaseUrl + '/ykstatic/fsdownload/3.png');
		width: 100%;
		min-height: 100%;
		// height: 100%;
		background-size: 100%;
		padding-top: 50upx;
		padding-bottom: 30rpx;
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
		margin-top: 40rpx;
		margin-right: 409rpx;
		padding-left: 36rpx;
		width: 341rpx;
		height: 70rpx;
		// text-align: center;
		line-height: 70rpx;
		background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
		font-size: 24rpx;
		font-family: Bahnschrift;
		font-weight: bold;
		color: #FFFFFF;
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
					align-items: center;
					padding: 10upx 20upx;
					background: linear-gradient(0deg, #F78A9E 0%, #F56F87 50%, #FE988B 100%);
					border-radius: 38upx;

					.headImg {
						width: 61upx;
						height: 61upx;
						border-radius: 50%;
						margin-right: 20upx;
					}

					.name {
						padding-right: 22upx;
						font-size: 24upx;
						color: #FFFFFF;
						font-family: FZCuYuan-M03S;
						font-weight: 400;
						text-shadow: 0px 0px 8px rgba(114, 114, 114, 0.13);
					}

					.text {
						font-size: 24upx;
						color: #FFFFFF;
					}

					.get_money {
						margin-left: 20upx;
						color: red;
					}

					text {
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
		margin-top: 50upx;
	}

	.jieshao2 {
		width: 687upx;
		height: 336upx;
		background: #FFFFFF;
		border-radius: 30upx;
		margin-left: 32upx;
		margin-top: 63upx;
		position: relative;
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

	.tetx-div {
		width: 574upx;
		height: 838upx;
		margin-left: 58upx;
		margin-top: 16upx;
	}

	.tetx-divs {
		width: 574upx;
		height: 838upx;
		margin-left: 58upx;
		margin-top: 16upx;
		overflow: hidden;
		overflow-y: scroll;
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
		// width: 611upx;
		// height: 91upx;
		margin: 0 auto;
		background-image: url($fileBaseUrl + '/zixun/img/img7.png');
		background-size: cover;
		width: 621rpx;
		heihgt: 100rpx;
		background-size: 100%;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 91upx;
		text-align: center;
		// margin-left: 45upx;
		// margin-top: 50upx;
		position: fixed;
		bottom: 100rpx;
		left: 50%;
		margin-left: -310rpx;
	}

	.height {
		height: 35upx;
	}

	.zhankai {
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #7C7C7C;
		position: absolute;
		bottom: 10upx;
		left: 300upx;
	}

	.list {
		width: 687upx;
		height: 675upx;
		// min-height: 750upx;
		background: url($fileBaseUrl + '/zixun/img/beijinimg5.png');
		background-size: 100%;
		margin-left: 31upx;
		margin-top: 39upx;
		padding-top: 36upx;
		position: relative;
		border-radius: 50upx;
	}


	.list-biaoti {
		// font-size: 40upx;
		// font-family: FZCuYuan-M03S;
		// font-weight: 600;
		// color: #915645;
		// margin: 0 auto;
		// margin-left: 205upx;
		margin: 0 auto;
		width: 319rpx;
		height: 56rpx;
		background-image: url($fileBaseUrl + '/zixun/img/jilei.png');
		background-size: cover;
	}

	.lidai {
		width: 706upx;
		height: 429upx;
		margin-top: 44rpx;
		position: absolute;
		z-index: 1;
	}

	.qianbao {
		width: 383upx;
		height: 389upx;
		background: url($fileBaseUrl + '/ykstatic/fsdownload/9.png');
		background-size: 100%;
		position: absolute;
		top: 125upx;
		left: 163upx;
		z-index: 0;
	}

	.animation-qianbao {
		animation: leftRigt 2s infinite ease;
	}

	.animation-lidai {
		animation: zhaRigt 1s 1 linear;
	}

	.mony {
		font-size: 50upx;
		font-family: FZCuYuan-M03S;
		font-weight: bold;
		color: #83341D;
		margin-top: 84upx;
		// margin-left: 116upx;
		text-align: center;
	}

	.shijian {
		position: absolute;
		top: 490rpx;
		left: 50%;
		transform: translateX(-50%);
		font-size: 24upx;
		font-family: FZCuYuan-M03S;
		font-weight: 400;
		color: #A33818;
		// margin-top: 120upx;
		// margin-left: 80upx;
		display: flex;
		justify-content: center;
	}

	.jinbi {
		width: 681upx;
		height: 1040upx;
		background: url($fileBaseUrl + '/ykstatic/fsdownload/8.png');
		background-size: 100%;
		margin-top: 233upx;
	}

	.list-ui {
		padding: 0 22upx 0 22upx;
		height: auto;
		position: absolute;
		top: 546upx;
	}

	.list-text {
		font-size: 26upx;
		font-family: FZCuYuan-M03S;
		font-weight: 600;
		color: #915645;
		margin-bottom: 20upx;
	}

	.list-li {
		width: 639upx;
		height: 84upx;
		background: #FFFFFF;
		box-shadow: 0px 0px 20upx 4upx rgba(166, 166, 166, 0.15);
		border-radius: 20upx;
		display: flex;
		align-items: center;
		margin-top: 15upx;
	}

	.li-left {
		font-size: 30upx;
		font-family: FZCuYuan-M03S;
		font-weight: 400;
		color: #B5B5B5;
		margin-left: 28upx;
	}

	.li-image {
		width: 52upx;
		height: 52upx;
		margin-left: 24upx;
		border-radius: 50upx;
	}

	.li-name {
		font-size: 24upx;
		font-family: FZCuYuan-M03S;
		font-weight: 600;
		color: #DB7209;
		margin-left: 23upx;
	}

	.li-jif {
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 600;
		color: #666666;
		margin-left: 165upx;
	}


	.li-mony {
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 600;
		color: rgba(255, 89, 33, 1);
	}

	.button-list {
		width: 329upx;
		height: 80upx;
		background: #FF2121;
		border-radius: 40upx;
		line-height: 80upx;
		text-align: center;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		background: url($fileBaseUrl + '/ykstatic/fsdownload/11.png');
		background-size: 100%;
		position: absolute;
		bottom: 59upx;
		left: 181upx;
	}

	.toxiang {
		width: 103upx;
		height: 103upx;
		border-radius: 50upx;
		margin-left: 30upx;
	}

	.qipaotangkuang {
		background: url($fileBaseUrl + '/ykstatic/fsdownload/12.png') no-repeat;
		background-size: 100%;
		width: 451upx;
		height: 138upx;
		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 53upx;
		color: #494949;
		padding-left: 55rpx;
		margin-left: 14upx;
	}

	.dingbu {
		display: flex;
		// margin-top: 82upx;
		margin-bottom: 51upx;
	}

	.money {
		font-size: 70upx;
		font-family: FZCuYuan-M03S;
		font-weight: 600;
		color: #FF2121;
		margin-top: 65upx;
		// margin-left: 237upx;		
		text-align: center;
	}

	.xiaomoney {
		font-size: 28upx;
		font-family: FZCuYuan-M03S;
		font-weight: 600;
		color: #FF2121;
		position: absolute;
		top: 147upx;
		left: 487upx;
	}

	.damoney {
		width: 335upx;
		height: 247upx;
		margin-left: 178upx;
		// margin-top: 26upx;
	}

	.correct {
		display: flex;
		align-items: center;
		margin-left: 257upx;
		margin-top: 35upx;

		text {
			font-size: 35upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #FF2121;
			margin-left: 12upx;
		}
	}

	.correct-image {
		width: 37upx;
		height: 37upx;
	}

	.money-bottm {
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #212121;
		margin-left: 172upx;
		margin-top: 40upx;

		text {
			color: rgba(243, 107, 64, 1);
		}
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
	}
</style>
