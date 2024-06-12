<template>
	<view class="container">
		<view class="texts">
			<view class="size" @click="onFanhui">
					<image class="fanhui" :src="imageUrl+'/static/live/黑返回键.png'" mode=""></image>
				</view>
			畅阳助学
			<view class="size">
				
			</view>
		</view>
		<view class="tanchu" v-if="hezi==true">
			<view class="hezi">
				<view class="hezi-text">
					兑换说明
				</view>
				<view class="hezi-centet">
					到APP首页选择课程购买，系统会自动<br />
					扣除助学金。
				</view>
				<view class="hezi-tishi" @click="hezi=false">
					我知道了
				</view>

			</view>
		</view>
		<view class="renshu">
			{{amount.PeopleCount}}人正在参与计划
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
		<view class="jieshao2" v-if="isAss==false">
			<view class="jieshao-top">
				<image class="ren" :src="imageUrl+'/static/fsdownload/2.png'" mode=""></image>
				<image class="zi" :src="imageUrl+'/static/fsdownload/6.png'" mode=""></image>
				<view class="botton-border"></view>
			</view>
			<view class="tetx-div2">
				<view class="text-jieshao">
					畅阳教培秉承学习成就未来的愿景，为助力医药卫
					生人才实现专业精进及能力提升，致力做有专业、
					有温度的教育企业，特面向全部用户开启百万助
					学“温度计划”。
				</view>
				<view class="zhankai" @click="onToview">
					查看全部
				</view>

			</view>
		</view>
		<view class="jieshao" v-if="isAss==true">
			<view class="jieshao-top">
				<image class="ren" :src="imageUrl+'/static/fsdownload/2.png'" mode=""></image>
				<image class="zi" :src="imageUrl+'/static/fsdownload/6.png'" mode=""></image>
				<view class="botton-border"></view>
			</view>
			<view class="tetx-div">
				<view class="text-jieshao">
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
				</view>
			</view>
			<!-- <view class="button">
				我要报名计划
			</view> -->

			<view class="zhankai2" @click="onToview">
				收起
			</view>
		</view>

		<view class="list">
			<view class="list-biaoti">
				累计获得助学金
			</view>
			<image :class="{'lidai':true,'animation-lidai':inide==true}" :src="imageUrl+'/static/fsdownload/7.png'" mode=""></image>
			<view :class="{'qianbao':true,'animation-qianbao':inide==true}">
				<view class="mony">
					{{amount.amount}}
				</view>
				<view class="shijian" v-if="onINSK==false">
					<view class="" v-if="showDay==false">
						距离结束：
					</view>
					<uni-countdown @timeup='timeup' :show-day="showDay" :second="time" />
				</view>
				<view class="shijian" v-if="onINSK==true">
					活动结束
				</view>
			</view>
			<view class="jinbi"></view>
			<view class="list-ui">
				<view class="list-text">
					已助力好友（{{amount.wdHelpStuRecordList.length}}）
				</view>
				<view class="list-li" v-for="(item,index) in amount.wdHelpStuRecordList" :key="index">
					<view class="li-left">
						{{index+1}}
					</view>
					<image v-if="item.headimgurl" class="li-image" :src="item.headimgurl" mode=""></image>
					<image v-else class="li-image" :src="imageUrl+'/static/fsdownload/组40.png'" mode=""></image>
					<view class="li-name">
						{{item.stu_name.length>7?item.stu_name.slice(0,5)+'..':item.stu_name}}
					</view>
					<view class="li-jif">
						<text>帮您获得</text>
						<text class="li-mony">{{item.amount}}</text>
					</view>
				</view>
			</view>


			<button class="button-list" open-type="share" v-if="shares">
				邀请好友助力
			</button>
			<button class="button-list" v-else-if="shares==false" @click="onzaicishenling">
				再次申领
			</button>
		</view>

		<image :src="shareImg" mode="" class="shareImg"></image>
		<view v-show='loginAss' class="back-tankuang">
			<login class="loginw" @guanbi='guanbi' />
		</view>
	</view>

</template>
<script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
<script>
	import {
		findByRecord,
		queryByStudent,
		assistance,
		planJoin,
		shareEntity
	} from "@/api/zhuli.js";
	import {
		 getTitle
	} from "@/common/util/index.js";
	// #ifdef H5
	// var jweixin = require("jweixin-module");
	// #endif
	export default {
		// 分享给好友
		onShareAppMessage(options) {
			// console.log()
			// if(options.target.id=='right'){
			// 	this.onShareTimeline()
			// }else{

			var that = this;
			// 设置菜单中的转发按钮触发转发事件时的转发内容
			var shareObj = {
				title: getTitle(), // 默认是小程序的名称(可以写slogan等)
				desc: '', // 小程序的描述
				path: `/pagesA/fenxiang/fenxiang?entityId=${this.amount.entity.id}`, // 默认是当前页面，必须是以‘/’开头的完整路径
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
				animationDuration: 0,
				imageUrl: getApp().globalData.imageUrl,
				isAss: false,
				inide: false,
				shareImg: '',
				amount: {
					amount: 0,
					PeopleCount: 0,
				},
				userList: [],
				time: '',
				showDay: false,
				onINSK: false,
				shares: true,
				hezi: false,
				loginAss: getApp().globalData.loginAss
			}
		},
		onLoad() {
			// console.log(Math.ceil(this.userList.length / 5)*4)
			// this.animationDuration = Math.ceil(this.userList.length / 5) * 4
			this.findByRecord()
			this.queryByStudent()

		},
		methods: {
			onFanhui(){
				console.log(123)
				uni.reLaunch({
					url:'/pages/index/home'
				})
			},
			guanbi(value) {
				this.loginAss = value
			},
			timeup(val) {
				// 	console.log(val)
				if (val == false) {
					this.onINSK = true
					this.inide = false
					this.shares = false
				}
			},
			findByRecord() {
				findByRecord().then(res => {
					console.log(res)
					this.userList = res.result.slice(0, 100)
					this.animationDuration = Math.ceil(this.userList.length / 5) * 2
				})
			},

			queryByStudent() {
				queryByStudent().then(res => {
					console.log(res)
					let shijina = new Date().getTime()
					console.log(shijina)
					this.amount = res.result
					let values = res.result.entity.endTime.time
					let value = values - shijina
					console.log(value)
					this.time = value / 1000
					console.log(this.time, 123456)
					if (this.time > 86400) {
						this.showDay = true
					} else if (this.time <= 0) {
						this.onINSK = true
						this.inide = false
						this.shares = false
					} else {
						this.showDay = false
					}

					if (res.result.flg == 0) {
						uni.navigateTo({
							url: "../index/index"
						})
					} else if (res.result.flg == 2) { //结束
						this.onINSK = true
						this.inide = false
						this.shares = false
					} else if (res.result.flg == 3) { //助力成功
						this.shares = false
						this.onINSK = true
					} else if (res.result.flg == 4) { //结束
						this.onINSK = true
						this.shares = false
						this.inide = false
					}

					if (this.amount.amount > 0) {
						this.inide = true
					}
				})
			},

			onToview() {
				this.isAss = !this.isAss
				console.log(123)
			},

			onzaicishenling() {
				uni.navigateTo({
					url: "../index/index?isAss=none"
				})
			},

		}
	}
</script>

<style lang="scss">
	.size {
		width: 80rpx;
		display: flex;
		justify-content: center;
		padding-top: 60rpx;
	}
	
	.fanhui {
		width: 19rpx;
		height: 34rpx;
		// margin-right: 230rpx;
	}
	page {
		// width: 10%;
		min-height: 100%;
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
		width: 100%;
		height: 100%;
		min-height: 100%;
		position: absolute;
		top: 0;
		background: rgba(39, 39, 39, 0.6);
		z-index: 3;
	}

	.button-list:after {
		border: none !important;
	}

	.hezi {
		width: 616upx;
		height: 450upx;
		background: #FFFFFF;
		border-radius: 20upx;
		position: absolute;
		top: 443upx;
		left: 65upx;
		padding-top: 53upx;
	}

	.hezi-text {
		font-size: 36upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		// margin-left: 93upx;
		text-align: center;
		line-height: 55upx;
	}

	.hezi-centet {
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #7A7A7A;
		// margin-left: 93upx;
		text-align: center;
		line-height: 55upx;
	}



	.hezi-tishi {
		width: 340rpx;
		height: 91rpx;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 91rpx;
		text-align: center;
		margin-top: 19upx;
		border-radius: 50rpx;
		background-color: red;
		// margin-top: 82rpx;
		margin: 82rpx auto;
	}


	.container {
		background: url($fileBaseUrl + '/ykstatic/fsdownload/3.png');
		width: 100%;
		min-height: 100%;
		height: 100%;
		background-size: 100%;
		padding-top: 170upx;
		padding-bottom: 24rpx;
	}

	.texts {
		width: 100%;
		height: 150rpx;
		font-size: 36upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		display:flex;
		justify-content: space-between;
		background-color: #FFFFFF;
		line-height: 150rpx;
		padding-top: 30rpx;
		position: fixed;
		top: 0;
		z-index: 99999;
		// margin-left: 30upx;
		color: #000000;

		// image {
		// 	width: 19upx;
		// 	height: 34upx;
		// 	margin-right: 247upx;
		// }
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
			text-align: left;
			animation: toleft infinite linear;
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

					text {
						white-space: nowrap;
					}
				}
			}
		}
	}

	.jieshao {
		width: 687upx;
		height: 1033upx;
		background: #FFFFFF;
		border-radius: 30upx;
		margin-left: 32upx;
		margin-top: 63upx;
		position: relative;
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
		// position: relative;
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
		top: 150upx;
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

	.tetx-div2 {
		width: 574upx;
		// height: 838upx;
		margin-left: 58upx;
		// margin-top: 16upx;
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

	.zhankai {
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #7C7C7C;
		position: absolute;
		bottom: 10upx;
		left: 300upx;
		z-index: 2;
	}

	.zhankai2 {
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #7C7C7C;
		// position: absolute;
		// bottom: -117rpx;
		margin-left: 310upx;
		z-index: 2;
		position: relative;
		bottom: 30rpx;
	}

	.list {
		width: 687upx;
		height: 100%;
		min-height: 750upx;
		background: url($fileBaseUrl + '/ykstatic/fsdownload/10.png');
		background-size: 100%;
		margin-left: 31upx;
		margin-top: 33upx;
		padding-top: 36upx;
		position: relative;
	}


	.list-biaoti {
		font-size: 40upx;
		font-family: FZCuYuan-M03S;
		font-weight: 600;
		color: #915645;
		// line-height: 26upx;
		margin: 0 auto;
		margin-left: 205upx;
	}

	.lidai {
		width: 706upx;
		height: 429upx;
		margin-top: 30rpx;
	}

	.animation-lidai {
		animation: zhaRigt 1s infinite linear;
	}

	.qianbao {
		width: 383upx;
		height: 389upx;
		background: url($fileBaseUrl + '/ykstatic/fsdownload/9.png');
		background-size: 100%;
		position: absolute;
		top: 105upx;
		left: 163upx;
		z-index: 0;
	}

	.animation-qianbao {
		animation: leftRigt 2s infinite ease;
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
		font-size: 24upx;
		font-family: FZCuYuan-M03S;
		font-weight: 400;
		color: #A33818;
		margin-top: 120upx;
		// margin-left: 53upx;
		display: flex;
		justify-content: center;
	}

	.jinbi {
		width: 681upx;
		min-height: 600upx;
		height: auto;
		background: url($fileBaseUrl + '/ykstatic/fsdownload/8.png');
		background-size: 100%;
		// margin-top: 233upx;
	}

	.list-ui {
		padding: 0 22upx 0 22upx;
		height: auto;
		position: absolute;
		top: 546upx;
		height: 480upx;
		overflow-y: scroll;
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
		width: 600upx;
		height: 90upx;
		background: #FF2121;
		border-radius: 40upx;
		line-height: 80upx;
		text-align: center;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		background: url($fileBaseUrl + '/ykstatic/fsdownload/4.png');
		background-size: 100%;
		position: fixed;
		bottom: 49upx;
		left: 77upx;
		z-index: 999;
	}

	.shareImg {
		width: 100%;
		height: calc(100vh - var(--window-top));
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
