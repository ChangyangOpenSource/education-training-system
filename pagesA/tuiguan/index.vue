<template>
	<view class="content">
		<view class="tanchu" v-if="isAss==true">
			<!-- <view class="kuang"> -->
			<image class="tanchuimg" :src="'https://wendu.changyangdt.com/xcxImg/static/distributor/'+imageName" mode=""></image>
			<button type="default" class="fenxiangimg2" open-type="share">
				<image class="fenxiangimg" @click="onFenxiang" :src="imageUrl+'/static/live/分享.png'" mode=""></image>
			</button>

			<image class="fenxguanbi" @click="isAss=false" :src="imageUrl+'/static/live/关闭.png'" mode=""></image>
			<!-- </view> -->
		</view>
		<view class="topo-LOging">
			<!-- 	<view class="top">
				<image class="fanhui" :src=imageUrl+"/static/live/返回键.png" mode=""></image>
				<view class="tuiguang">
					推广大使
				</view>
			</view> -->
		</view>
		<view class="geren">
			<view class="geren-top">
				<image v-if="order.avatarUrl" class="toxiang" :src="order.avatarUrl" mode=""></image>
				<image v-else class="toxiang" :src="imageUrl+'/static/live/组40.png'" mode=""></image>
				<view class="two-top">
					<view class=" top2">
						<view class="staticJinpai">
							{{order.levelName}}
							<image class="jinpai" :src="imageUrl+'/static/live/金牌.png'" mode=""></image>
						</view>
					</view>
					<view class="top-id">
						ID:{{order.invitationCode}}
					</view>
				</view>
				<view class="tixian" @click="onTinxian">
					提现
				</view>
				<image :src="imageUrl+'/static/live/3.1提示.png'" @click="isawe=true" class="tishi" mode=""></image>
			</view>
			<view class="geren-bottom">
				<view class="left border">
					<view class="text-bottom">
						个人收益
					</view>
					<view class="mouny">
						￥{{order.personalIncome}}
					</view>
					<view class="zongjie">
						含待结算{{order.pendingSettlement}}
					</view>
				</view>
				<view class="left" @click="onTundui">
					<view class="text-bottom">
						本月团队销售额
					</view>
					<view class="mouny">
						￥{{order.currentMonthTeamIncome}}
					</view>
					<view class="zongjie">
						查看团队业绩
						<image class="zongjie-img" :src="imageUrl+'/static/live/进入icon拷贝3.png'" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="center">
			<view class="cenrer-son" @click="onNetv(1)">
				<view class="centrer-top">
					<text class="cenete-trext">
						分销员
					</text>
					<image class="center-img" :src="imageUrl+'/static/live/客户列表.png'" mode=""></image>
				</view>
				<view class="ters">
					{{order.distributorNum}}
				</view>
			</view>
			<view class="cenrer-two" @click="onNetv(2)">
				<view class="centrer-top2">
					<text class="cenete-trext">
						累计客户
					</text>
					<image class="center-img2" :src="imageUrl+'/static/live/业务管理.png'" mode=""></image>
				</view>
				<view class="ters">
					{{order.customerNum}}
				</view>
			</view>
			<view class="cenrer-son" @click="onNetv(3)">
				<view class="centrer-top3">
					<text class="cenete-trext">
						分销订单
					</text>
					<image class="center-img3" :src="imageUrl+'/static/live/需求列表.png'" mode=""></image>
				</view>
				<view class="ters">
					{{order.orderNum}}
				</view>
			</view>

		</view>
		<view class="tishiTExt">
			你可以试试通过以下方式或得收益
		</view>
		<view class="bteosn">
			<view class="bteosn-left margin" @click="promote">
				<image class="fenxiao" :src="imageUrl+'/static/live/我的团队.png'" mode=""></image>
				<text class="fenxiao-text">推荐分销员</text>
			</view>
			<view class="bteosn-left" @click="tishi=true">
				<image class="fenxiao" :src="imageUrl+'/static/live/精品课堂.png'" mode=""></image>
				<text class="fenxiao-text">赚取收益</text>
			</view>
		</view>
		<view class="tanchues" v-if="tishi==true">
			<view class="tanchuses">
				<view class="active">
					<image class="tanchuimg" :src="imageUrl+'/static/live/关闭26拷贝.png'" @click="tishi=false" mode=""></image>
				</view>

				<view class="top-text">
					赚取收益
				</view>
				<view class="titext">
					怎样赚取个人收益？
				</view>
				<view class="titext2">
					首页→选择您的要推荐的专业→选择您推荐的课程，进入详情页→点击右上角“赚”图标分享至微信好友或朋友圈，好友通过您分享的链接购课后，即可立即获取收益。
				</view>
				<view class="btws2" @click="ONtuijiankecheng">
					确定
				</view>
			</view>
		</view>
		<view class="tanchues" v-if="isawe">
			<view class="gantan">
				<!-- <image class="gantan-img" src="@/static/关闭26拷贝.png" @click="isawe=false" mode=""></image> -->
				<view class="gantan-top">
					<image class="img-left" :src="imageUrl+'/static/live/1031.png'" mode=""></image>
					<text>推广大使规则说明</text>
					<image class="img-right" :src="imageUrl+'/static/live/1032.png'" mode=""></image>
				</view>
				<view class="title-ntan">
					怎样赚取个人收益？<br />
					首页→选择您的要推荐的专业→选择您推荐的课程，进入详情页→点击右上角“赚”图标分享至微信好友或朋友圈，好友通过您分享的链接购课后，即可立即获取收益。
				</view>
				<view class="btws3" @click="isawe=false">
					我知道了
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

		// 分享给好友
		onShareAppMessage(options) {
			// console.log()
			// if(options.target.id=='right'){
			// 	this.onShareTimeline()
			// }else{

			var that = this;
			// 设置菜单中的转发按钮触发转发事件时的转发内容
			var shareObj = {
				title: '畅阳教培', // 默认是小程序的名称(可以写slogan等)
				desc: '', // 小程序的描述
				path: `/pages/index/home?code=${this.yaoqing}`, // 默认是当前页面，必须是以‘/’开头的完整路径
				imageUrl: 'https://wendu.changyangdt.com/distributor/' + this
					.imageName, // 图片封面，本地文件路径、网络图片路，支持PNG及JPG，默认当前页面截图，显示图片长宽比是 5:4。
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
				title: 'Hello',
				order: {
					currentMonthTeamIncome: 0,
					customerNum: 0,
					distributorNum: 0,
					levelName: '金牌推广大使',
					orderNum: 0,
					pendingSettlement: 0,
					personalIncome: 0,
				},
				loginAss: getApp().globalData.loginAss,
				imageName: "",
				isAss: false,
				code: '',
				invitationCode: {},
				tishi: false,
				imageUrl: getApp().globalData.imageUrl,
				yaoqing: '',
				isawe: false
			}
		},
		onLoad(optios) {
			this.judge()
			
		},
		onUnload() {
			console.log('销毁1')
			uni.removeStorageSync('code')
		},
		methods: {
			guanbi(value) {
				this.loginAss = value
			},
			onTinxian() {
				uni.navigateTo({
					url: "/pagesA/withdrawal/index",
				});
			},
			judge() {
				uni.showLoading({
					mask: true,
					title: '加载中'
				})
				NET.request(API.judge, {}, 'post').then(res => {
					console.log(res)
					if (res.code == 200) {
						this.invitationCode = res.result
						this.yaoqing = res.result.invitationCode
						uni.hideLoading()
						this.wdDistributor()
					} else if (res.code == 401) {
						uni.showToast({
							title: '请重新登录',
							icon: "none"
						})
					} else {
						uni.hideLoading()
						uni.navigateTo({
							url: "/pagesA/shenqing/index?code=" + this.code,
						});
					}
				})
			},
			onTundui() {
				uni.navigateTo({
					url: "/pagesA/team/index",
				});
			},
			wdDistributor() {
				NET.request(API.wdDistributor, {}, 'get').then(res => {
					console.log(res)
					if (res.code == 200) {
						this.order = res.result
					}
				})
			},
			onNetv(index) {
				console.log(index)
				if (index == 1) {
					console.log(1)
					uni.navigateTo({
						url: "/pagesA/Distribution/index",
					});
				} else if (index == 2) {
					console.log(2)
					uni.navigateTo({
						url: "/pagesA/customer/index",
					});
				} else {
					console.log(3)
					uni.navigateTo({
						url: "/pagesA/orders/index",
					});
				}

			},
			promote() {
				NET.request(API.promote, 'get').then(res => {
					console.log(res)
					if (res.code == 200) {
						this.imageName = res.result.name
						this.isAss = true

					}
				})
			},
			onFenxiang() {
				let obj = {
					title: '畅阳教培',
					image: 'https://wendu.changyangdt.com/distributor/' + this.imageName,
					type: 2,
					way: 1
				}
				let objs = JSON.stringify(obj)
				console.log(objs)
				let ua = navigator.userAgent;
				// Android 端
				let isAndroid = ua.indexOf("Android") > -1 || ua.indexOf("Linux") > -1;
				// iOS 终端
				let isiOS = /iPhone|mac|iPod|iPad/i.test(ua);
				//WeChat 终端
				let isWeChat = !!window.__wxjs_is_wkwebview;
				if (isAndroid) {
					window.android.share2WX(objs);
				} else if (isiOS) {
					window.webkit.messageHandlers.share2WX.postMessage(objs);
				}
			},
			ONtuijiankecheng() {
				console.log(this.tishi, '关闭')
				this.tishi = false
				// let obj = {
				// 	title: '畅阳教培',
				// 	invitationCode: this.invitationCode.invitationCode,
				// 	type: 0
				// }
				// let objs = JSON.stringify(obj)
				// console.log(objs)
				// let ua = navigator.userAgent;
				// // Android 端
				// let isAndroid = ua.indexOf("Android") > -1 || ua.indexOf("Linux") > -1;
				// // iOS 终端
				// let isiOS = /iPhone|mac|iPod|iPad/i.test(ua);
				// //WeChat 终端
				// let isWeChat = !!window.__wxjs_is_wkwebview;
				// if (isAndroid) {
				// 	window.android.closeWebpage();
				// } else if (isiOS) {
				// 	window.webkit.messageHandlers.closeWebpage.postMessage();
				// }
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #F3F3F3;
	}

	@font-face {
		font-family: abc;
		src: ('../../font/苹方黑体-准-简.ttf');
	}



	.gantan {
		width: 690rpx;
		height: 548rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		position: absolute;
		top: 314rpx;
		left: 28rpx;
	}

	.gantan-img {
		width: 25rpx;
		height: 25rpx;
		position: absolute;
		right: 20rpx;
		top: 20rpx;
	}

	.gantan-top {
		display: flex;
		margin-top: 35rpx;
		align-items: center;
		justify-content: center;

		text {
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #3D7DFF;
		}

	}

	.title-ntan {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #5B5B5B;
		line-height: 48rpx;
		margin-top: 44rpx;
		margin-left: 40rpx;
		margin-right: 35rpx;

	}

	.btws3 {
		width: 500rpx;
		height: 80rpx;
		background: rgba(61, 125, 255, 1);
		border-radius: 40rpx;
		font-size: 32rpx;
		font-family: abc;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 80rpx;
		text-align: center;
		margin: 36rpx auto 0rpx;
	}


	.img-left {
		width: 123rpx;
		height: 6rpx;
		margin-right: 23rpx;
	}

	.img-right {
		width: 123rpx;
		height: 6rpx;
		margin-left: 25rpx;
	}

	.titext {
		font-size: 38rpx;
		font-family: abc;
		font-weight: 600;
		color: #333333;
		margin-bottom: 20rpx;
		// text-align: center;
		padding: 0 60rpx 0 60rpx;
	}

	.titext2 {
		font-size: 26rpx;
		font-family: abc;
		font-weight: 400;
		color: #333333;
		margin-bottom: 40rpx;
		// text-align: center;
		padding: 0 60rpx 0 60rpx;
	}

	.tanchuses {
		width: 560rpx;
		height: 518rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		position: absolute;
		top: 420rpx;
		left: 100rpx;
	}

	.tanchues {
		width: 100%;
		height: 100%;
		background: RGBA(138, 138, 138, 0.6);
		position: absolute;
		top: 0;
	}

	.tanchuimg {
		width: 27rpx;
		height: 27rpx;
	}

	.active {
		display: flex;
		justify-content: flex-end;
		margin-right: 35rpx;
		margin-top: 31rpx;
	}

	.top-text {
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		margin-bottom: 30rpx;
		text-align: center;
	}

	.tanchu {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 250;
		background: RGBA(25, 62, 84, 0.4);
		display: flex;
		flex-direction: column;

		.tanchuimg {
			margin-top: 435rpx;
			margin-left: 56rpx;
			width: 631rpx;
			border-radius: 20rpx;
			height: 769rpx;
		}

		.fenxiangimg {
			width: 139rpx;
			height: 132rpx;
			position: absolute;
			left: 548rpx;
			top: 1068rpx;
			border-radius: 0 0 20rpx 0;
		}


		.fenxiangimg2 {
			width: 139rpx;
			height: 132rpx;
			position: absolute;
			left: 548rpx;
			top: 1068rpx;
			border-radius: 0 0 20rpx 0;
			background: none;
		}

		.fenxguanbi {
			width: 53rpx;
			height: 53rpx;
			// margin-top: 62rpx;
			margin: 62rpx auto;
		}
	}


	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.topo-LOging {
		background: url($fileBaseUrl + '/xcxImg2/static/live/蓝背景.png') no-repeat;
		background-size: 100%;
		width: 100%;
		height: 439rpx;
		position: relative;
	}


	.tuiguang {
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
	}

	.top {
		display: flex;
		margin-left: 31rpx;
		margin-top: 100rpx;
		align-items: center;
	}

	.fanhui {
		width: 19rpx;
		height: 34rpx;
		margin-right: 250rpx;
	}

	.geren {
		width: 690rpx;
		height: 363rpx;
		background-color: #FFFFFF;
		box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(127, 126, 126, 0.2);
		border-radius: 20rpx;
		position: absolute;
		top: 175rpx;
		/* padding: 22rpx 21rpx 0 28rpx; */
	}

	.staticJinpai {
		width: 200rpx;
		height: 43rpx;
		background: url($fileBaseUrl + '/xcxImg2/static/live/圆角矩形%204.png');
		background-size: 100%;
		font-size: 22rpx;
		font-family: Alibaba PuHuiTi;
		font-weight: bold;
		font-style: italic;
		color: #FFFFFF;
		text-shadow: 0px 0px 7rpx rgba(114, 86, 51, 0.16);
		/* padding-left: 16rpx;/. */
		line-height: 43rpx;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		// padding-left:21rpx ;
	}

	.geren-top {
		display: flex;
		height: 120rpx;
		margin-top: 21rpx;
		padding: 0rpx 21rpx 0 21rpx;
	}

	.jinpai {
		width: 33rpx;
		height: 28rpx;
		/* position: absolute; */
		// margin-left: 141rpx;
		// margin-top: -31rpx;
		display: inherit;
		margin-left: 10rpx;
	}

	.top2 {
		display: flex;
		/* align-items: center; */
	}

	.top-id {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #3D7DFF;
		margin-top: 18rpx;
		margin-left: 12rpx;
	}

	.toxiang {
		width: 120rpx;
		height: 120rpx;
		margin-right: 22rpx;
		border-radius: 100rpx;
	}

	.tishi {
		width: 31rpx;
		height: 31rpx;
	}

	.btws2 {
		width: 300rpx;
		height: 80rpx;
		background: rgba(61, 125, 255, 1);
		border-radius: 40rpx;
		font-size: 32rpx;
		font-family: abc;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 80rpx;
		text-align: center;
		margin: 0 auto 0rpx;
	}

	.tixian {
		width: 179rpx;
		height: 63rpx;
		background: #3D7DFF;
		border-radius: 32rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		margin-left: 89rpx;
		margin-top: 28rpx;
	}

	.two-top {
		padding-top: 23rpx;
	}

	.text-bottom {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
	}

	.mouny {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #3D7DFF;
		margin-top: 14rpx;
		margin-bottom: 40rpx;
	}

	.zongjie {
		font-size: 22rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
		// margin-bottom: 44rpx;
	}

	.left {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.zongjie-img {
		width: 11rpx;
		height: 20rpx;
		margin-left: 10rpx;
	}

	.geren-bottom {
		display: flex;
		justify-content: center;
		padding-top: 43rpx;
	}

	.border {
		border-right: 1rpx solid #B4B4B4;
		padding-right: 112rpx;
		margin-right: 68rpx;
	}

	.center-img {
		width: 40rpx;
		height: 28rpx;
	}

	.center-img2 {
		width: 38rpx;
		height: 25rpx;
	}

	.center-img3 {
		width: 30rpx;
		height: 30rpx;
	}

	.cenete-trext {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
	}

	.ters {
		font-size: 36rpx;
		// font-family: PingFang SC;
		font-weight: bold;
		color: #3D7DFF;
		padding-top: 11rpx;
		text-align: center;
	}

	.centrer-top {
		display: flex;
		padding: 16rpx 32rpx 0 16rpx;
		justify-content: space-between;
	}


	.centrer-top2 {
		display: flex;
		padding: 16rpx 27rpx 0 23rpx;
		justify-content: space-between;
	}

	.centrer-top3 {
		display: flex;
		padding: 18rpx 26rpx 0 22rpx;
		justify-content: space-between;
	}

	.cenrer-son {
		width: 219rpx;
		height: 137rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
	}

	.cenrer-two {
		width: 219rpx;
		height: 137rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		margin-right: 17rpx;
		margin-left: 15rpx;
	}

	.center {
		margin-top: 152rpx;
		display: flex;
	}

	.tishiTExt {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #3E3E3E;
		margin-top: 147rpx;
	}

	.bteosn {
		width: 690rpx;
		height: 231rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		margin-top: 41rpx;
	}

	.bteosn-left {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.margin {
		margin-right: 224rpx;
		margin-left: 113rpx;
	}

	.fenxiao {
		width: 100rpx;
		height: 100rpx;
	}

	.fenxiao-text {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		margin-top: 22rpx;
	}
</style>
