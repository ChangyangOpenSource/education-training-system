<template>
	<view class="container">
		<!-- <view class="texts">
			<image :src="imageUrl + '/ykstatic/fsdownload/5.png" mode=""></image>
			畅阳助学
		</view> -->
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
				<div class="row" style='padding-left: 70px;'>
					<div class="point"
						v-for='(item,index) in userList.slice(Math.floor(userList.length / 5)* 1,Math.floor(userList.length / 5)* 2)'
						:key="index">
						<image class="headImg" v-if="item.headimgurl==''" :src="imageUrl+'/static/fsdownload/组40.png'" mode=""></image>
						<image class="headImg" v-else :src="item.headimgurl" mode=""></image>
						<text class="name">{{item.strContent}}</text>
						<!-- <text class="text">获得{{item.totalNumber}}助学金</text> -->
					</div>
				</div>
				<div class="row" style='padding-left: 150px;'>
					<div class="point"
						v-for='(item,index) in userList.slice(Math.floor(userList.length / 5)* 2,Math.floor(userList.length / 5)* 3)'
						:key="index">
						<image class="headImg" v-if="item.headimgurl==''" :src="imageUrl+'/static/fsdownload/组40.png'" mode=""></image>
						<image class="headImg" v-else :src="item.headimgurl" mode=""></image>
						<text class="name">{{item.strContent}}</text>
						<!-- <text class="text">获得{{item.totalNumber}}助学金</text> -->
					</div>
				</div>
				<!-- 	<div class="row" style='padding-left: 50px;'>
					<div class="point"
						v-for='(item,index) in userList.slice(Math.floor(userList.length / 5)* 3,Math.floor(userList.length / 5)* 4)'
						:key="index">
						<image class="headImg" v-if="item.headimgurl==''" :src="imageUrl+'/static/fsdownload/组40.png'" mode=""></image>
						<image class="headImg" v-else :src="item.headimgurl" mode=""></image>
						<text class="name">{{item.strContent}}</text>
		
					</div>
				</div>
				<div class="row" style='padding-left: 10px;'>
					<div class="point"
						v-for='(item,index) in userList.slice(Math.floor(userList.length / 5)* 4,Math.floor(userList.length / 5)* 5)'
						:key="index">
						<image class="headImg" v-if="item.headimgurl==''" :src="imageUrl+'/static/fsdownload/组40.png'" mode=""></image>
						<image class="headImg" v-else :src="item.headimgurl" mode=""></image>
						<text class="name">{{item.strContent}}</text>
			
					</div>
				</div> -->
			</div>
		</div>

		<view class="biaokuang">
			<view class="activityshiftse" @click="findByMajorId">
				活动班次
				<view class="borders" v-if="index==1">

				</view>
			</view>
			<view class="introduced" @click="onTab(2)">
				我参与的
				<view class="borders" v-if="index==2">

				</view>
			</view>
			<view class="participate" @click="onparticipate">
				活动介绍
				<view class="borders" v-if="index==3">

				</view>
			</view>
		</view>
		<activityshifts :classesAll="classesAll" @plan='plan' v-if="index==1 && Object.keys(classesAll).length>=0" />



		<introduced :findByFj="findByObj" @playe='playe' @plans='plans' @onShiyon='onShiyon' @onoutr='onoutr'
			@onTab='onTab' v-if="index==2 && Object.keys(findByObj).length>0" />




		<participate :amount="amount" @plans='plans' v-if="index==3 " />
		<view v-show='loginAss' class="back-tankuang">
			<login class="loginw" @guanbi='guanbi' />
		</view>
		<view class="zhezhoa" v-if="onISaSS">
			<view class="centeers">
				<view class="centeers-tiel">
					使用说明
				</view>
				<view class="text-text">
					距离达成还差￥{{pices}} 确定使用
					现有助学金吗？
				</view>
				<view class="text-text2">
					*下单后助学金即生效，若取消订单，助学金将不再返还
				</view>
				<view class="flexsw">
					<view class="yes" @click="onYes">
						确定
					</view>
					<view class="no" @click="onISaSS=false">
						取消
					</view>
				</view>
			</view>
		</view>
		<view class="zhezhoa" v-if="onoutrIsAss">
			<view class="centeers">
				<view class="centeers-tiel">
					使用说明
				</view>
				<view class="text-text">
					再支付￥{{pices}}购买课程 确定使用助学金购买吗？
				</view>
				<view class="text-text2">
					*下单后助学金即生效，若取消订单，助学金将不再返还
				</view>
				<view class="flexsw">
					<view class="yes" @click="onOutrsss">
						确定
					</view>
					<view class="no" @click="onoutrIsAss=false">
						取消
					</view>
				</view>
			</view>
		</view>
	</view>


</template>
<script>
	import activityshifts from '@/pagesA/components/financialaid/activityshifts'
	import introduced from '@/pagesA/components/financialaid/introduced'
	import participate from '@/pagesA/components/financialaid/participate'
	import {
		findByActivity,
		findByRecord,
		assistance,
		planJoin,
		findByMajorId,
		findByUserId,
		immediatelyUse,
		outrightPurchase,
	} from "@/api/zhuli.js";
	import {
		orderAdd,
	} from "@/api/pay.js";
	import {
		getMajorInfo,
		getUpZhuvue
	} from "@/common/util/index.js";
	import {
		launchHelp
	} from "@/api/homeAudition.js";
	export default {
		// 分享给好友
		onShareAppMessage(options) {
			// console.log()

			var that = this;
			// 设置菜单中的转发按钮触发转发事件时的转发内容
			var shareObj = {
				title: '畅阳教培', // 默认是小程序的名称(可以写slogan等)
				desc: '', // 小程序的描述
				path: `/pagesA/fenxiang/fenxiang?entityId=${this.findByObj.wdHelpStu.id}`, // 默认是当前页面，必须是以‘/’开头的完整路径
				imageUrl: '', // 图片封面，本地文件路径、网络图片路，支持PNG及JPG，默认当前页面截图，显示图片长宽比是 5:4。
				success: function(res) {
					// 转发成功之后的回调
					console.log(123)
					if (res.errMsg == 'shareAppMessage:ok') {
						console.log(res)
						// 根据专业查询直播中
					}
				},
				fail: function(res) {
					console.log(456)
					// 转发失败之后的回调
					if (res.errMsg == 'shareAppMessage:fail cancel') {
						console.log(res)
						// 用户取消转发
					} else if (res.errMsg == 'shareAppMessage:fail') {
						console.log(res)
						// 转发失败，其中 detail message 为详细失败信息
					}
				},
				complete: function(res) {
					loginAss: getApp().globalData.loginAss,
					console.log(789)
					// 转发结束之后的回调（转发成不成功都会执行）
				}
			}
			// 来自页面内的按钮的转发
			if (options.from == 'button') {
				launchHelp({
					helpStuId: this.findByObj.wdHelpStu.id
				}).then(res => {
			
				})
				// console
				// var eData = options.target.dataset;
				console.log(shareObj.path); // shareBtn
				// 此处可以修改 shareObj 中的内容
				// shareObj.path = '/pages_category_page1/store/index?storeId=' + this.shopId
			}
			// 返回shareObj
			return shareObj;
			// }
		},
		data() {
			return {
				loginAss: getApp().globalData.loginAss,
				animationDuration: 0,
				userList: [],
				imageUrl: getApp().globalData.imageUrl,
				amount: {
					peopleAll: 0,
				},
				index: 0,
				pageNo: 1,
				pageSize: 10,
				majorId: [],
				classesAll: {},
				agree_loding: true,
				num_a: 0,
				findByObj: {},
				onISaSS: false,
				pices: "",
				onoutrIsAss: false,
			}
		},
		onUnload() {
			console.log('likai', 12321321321321321213)
			// uni.removeStorage('resour');
			uni.removeStorageSync('shareUrl')

		},
		onReachBottom() {
			console.log(123)
			if (this.agree_loding == true) {
				this.pageNo++
				this.findByMajorId(this.num_a)
				console.log(this.pageNo)
			}
		},
		onLoad(opotios) {
			if (getUpZhuvue()) {
				this.majorId = getUpZhuvue()
			} else {
				this.majorId = getMajorInfo()
			}
			this.findByRecord()
			this.findByMajorId()
		},
		components: {
			activityshifts,
			introduced,
			participate
		},
		methods: {
			onparticipate() {
				this.findByRecord()
			},
			onYes() {
				immediatelyUse({
					helpStuId: this.findByObj.wdHelpStu.id,
				}).then((res) => {
					console.log(res)
					orderAdd({
							classId: res.result.map.id,
							classesTypeId: res.result.map.classesTypeId,
							orderAreaId: "", //收货地址ID
							// paperId: "", //试卷id 试卷传此参数
							qd: "3", //渠道 官网:1,经销商:2,小程序:3,IOS:4,安卓:5
						}).then((res) => {
							console.log(res)
							if (res.code == 200) {
								uni.reLaunch({
									url: `/pagesA/payOrder/payOrder?orderId=${res.result.id}`
								})
							}

						})
						.catch((res) => {
							console.log(res);
							this.index = 0
							this.onTab(2)
							this.onISaSS = false;
						})
					// uni.reLaunch({
					// 	url:'/pagesA/payOrder/payOrder'
					// })
				})
			},
			onOutrsss() {
				outrightPurchase({
					helpStuId: this.findByObj.wdHelpStu.id
				}).then((res) => {
					console.log(res)
					orderAdd({
							classId: res.result.map.id,
							classesTypeId: res.result.map.classesTypeId,
							orderAreaId: "", //收货地址ID
							// paperId: "", //试卷id 试卷传此参数
							qd: "3", //渠道 官网:1,经销商:2,小程序:3,IOS:4,安卓:5
						}).then((res) => {
							console.log(res)
							uni.reLaunch({
								url: `/pagesA/payOrder/payOrder?orderId=${res.result.id}`
							})
						})
						.catch((res) => {
							console.log(res);
							this.index = 0
							this.onTab(2)
							this.onISaSS = false;
						})
				})
			},
			onShiyon(value) {
				this.onISaSS = true
				this.pices = value
			},
			onoutr(value) {
				this.onoutrIsAss = true
				this.pices = value
			},
			plan(value) {
				console.log(value)
				this.findByUserId()
			},
			playe(value) {
				console.log(value)
				this.index = 1
			},
			plans(value) {
				console.log(value)
				this.index = 1
			},
			onTab(value) {
				if (value == 2) {
					this.findByUserId()
				} else {
					this.index = value
				}
			},
			//我参与的
			findByUserId() {
				findByUserId().then((res) => {
					console.log(res)
					this.findByObj = res.result
					if(Object.keys(this.findByObj).length>0){
						this.index = 2
					}
				})
			},
			//班级列表
			findByMajorId(value) {
				if (getUpZhuvue()) {
					this.majorId = getUpZhuvue()
				} else {
					this.majorId = getMajorInfo()
				}
				findByMajorId({
					majorId: this.majorId.id,
					pageNo: this.pageNo,
					pageSize: this.pageSize,
				}).then((res) => {
					console.log(res)
					this.index = 1
					this.classesAll = res.result.records
					if (value == 0) {
						this.classesAll = this.classesAll.concat(res.result.records)
					}
					if (this.classesAll.length == this.pageSize) {
						this.agree_loding = true
					} else {
						this.agree_loding = false
					}
				})
			},
			guanbi(value) {
				this.loginAss = value
			},
			findByRecord() {
				findByActivity({
					helpStuId: 0
				}).then(res => {
					console.log(res)
					this.amount = res.result
					this.userList = res.result.recordList.slice(0, 100)
					this.animationDuration = Math.ceil(this.userList.length / 5) * 2
					this.index = 3
				})
			},

			// queryByStudent() {
			// 	uni.showLoading({
			// 		mask: true,
			// 		title: '加载中'
			// 	})
			// 	queryByStudent().then(res => {
			// 		console.log(res)
			// 		this.amount = res.result
			// 		if (res.result.flg == 0) {
			// 			// this.findByRecord()
			// 			uni.hideLoading()
			// 		} else if (res.result.flg == 1) {
			// 			setTimeout(() => {
			// 				uni.hideLoading()
			// 				uni.navigateTo({
			// 					url: "../zhuxue/zhuxue"
			// 				})
			// 			}, 1000)
			// 		} else if (res.result.flg == 2) {
			// 			uni.hideLoading()
			// 			uni.navigateTo({
			// 				url: "../zhuxue/zhuxue"
			// 			})
			// 		} else if (res.result.flg == 3) {
			// 			uni.hideLoading()
			// 			uni.navigateTo({
			// 				url: "../zhuxue/zhuxue"
			// 			})
			// 		} else if (res.result.flg == 4) {
			// 			uni.hideLoading()
			// 			uni.navigateTo({
			// 				url: "../zhuxue/zhuxue"
			// 			})
			// 		}

			// 	})
			// },
		}
	}
</script>
<style>
	page {
		height: 100%;
	}
</style>
<style lang="scss" scoped>
	.flexsw {
		width: 100%;
		padding: 0 45rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 25rpx;
	}

	.yes {
		width: 218rpx;
		height: 80rpx;
		background: #F54148;
		border-radius: 39rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.no {
		width: 218rpx;
		height: 80rpx;
		background: #EEEEEE;
		border-radius: 39rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #BABABA;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.text-text {
		font-size: 34rpx;
		font-weight: 500;
		margin-top: 24rpx;
		color: red;
		padding: 0 48rpx;
	}

	.text-text2 {
		font-size: 24rpx;
		font-weight: 500;
		color: #7A7A7A;
		margin-top: 24rpx;
		padding: 0 48rpx;
	}

	.centeers-tiel {
		font-size: 36rpx;
		font-weight: bold;
		color: #333333;
	}

	.centeers {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 580rpx;
		height: 450rpx;
		background: #FFFFFF;
		border-radius: 30rpx;
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 99999;
		margin-top: -225rpx;
		margin-left: -290rpx;
		padding-top: 38rpx;
	}

	.zhezhoa {
		overflow-y: hidden;
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		background: rgba(39, 39, 39, 0.9);
		z-index: 999;
	}


	.borders {
		width: 72rpx;
		height: 7rpx;
		background: #FF575A;
		border-radius: 4rpx;
		position: absolute;
		bottom: 0rpx;
	}

	.biaokuang {
		width: 690rpx;
		height: 94rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 11rpx 2rpx rgba(192, 49, 77, 0.39);
		border-radius: 47rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		position: relative;
		margin: 0 auto 34rpx;
	}

	.activityshiftse {
		height: 94rpx;
		font-size: 34rpx;
		font-family: BigruixianBlackGBV1.0;
		font-weight: 400;
		color: #FF575A;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.introduced {
		height: 94rpx;
		font-size: 34rpx;
		font-family: BigruixianBlackGBV1.0;
		font-weight: 400;
		color: #FF575A;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.participate {
		height: 94rpx;
		font-size: 34rpx;
		font-family: BigruixianBlackGBV1.0;
		font-weight: 400;
		color: #FF575A;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
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
		min-height: 100%;
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
		// background: url($fileBaseUrl + '/ykstatic/fsdownload/1.png') no-repeat;
		width: 340rpx;
		height: 70rpx;
		background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
		// margin-top: 44upx;
		// margin-left: -94upx;
		font-size: 24rpx;
		font-family: Bahnschrift;
		font-weight: bold;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		// justify-content: center;
		padding-left: 35rpx;
		margin-bottom: 23rpx;
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
					padding: 5upx 20upx 5upx 5upx;
					background: linear-gradient(0deg, #F78A9E 0%, #F56F87 50%, #FE988B 100%);
					border-radius: 40upx;

					.headImg {
						width: 67upx;
						height: 67upx;
						border-radius: 50upx;
						margin-right: 18upx;
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

	.tetx-div {
		width: 574upx;
		height: 838upx;
		margin-left: 58upx;
		margin-top: 16upx;
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
		background: url($fileBaseUrl + '/ykstatic/fsdownload/4.png');
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
