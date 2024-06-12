
<template>
	<view class="bg">
		<view class="mayTabs">
			<view class="imgVBiew" @click="onReturn">
				<image class="img" :src="imageUrl+'/static/learn/homeLive/返回键.png'" mode=""></image>
			</view>
			<!-- <image class="img" src="@/static/返回键.png" mode="" @click="onReturn"></image> -->
			<view class="tabItem">
				直播预告
			</view>
		</view>
		<view class="item u-border-bottom list-box" v-if="auditionLiveArr.length > 0">
			<view class="list-item" v-for="(item, index) in auditionLiveArr" :key="item.id"
				@click="lookLive(item, index)">
				<AuditLiveItem :dataInfo="item" />
			</view>
		</view>
		<image v-else style="width: 349rpx;height: 312rpx;display: block;margin: 40rpx auto;"
			:src="imageUrl+'/xing/zwsj.png'" mode=""></image>
		<u-loadmore :status="status" />

		<view class="bottom-fengxiang" v-if="isAss==true">
			<view class="bottom-fengxiang-top">
				分享可免费解锁
			</view>
			<view class="bottom-fengxiang-center">
				<button class="fengxiang-center-left" open-type="share">
					<image :src="imageUrl + '/ykstatic/wxchu.png'" mode=""></image>
					<view class="center-right-text">
						微信好友
					</view>
				</button>
				<!-- 	<button id="right" class="fengxiang-center-right" open-type="share" >
					<image src="@/static/tabBarIcon/朋友圈%20拷贝.png" mode=""></image>
					<view class="center-right-text">
						朋友圈
					</view>
				</button> -->
			</view>
			<view class="quxiao" @click="isAss=false">
				取消
			</view>
		</view>

		<view class="tianjia" v-if="isREs==true">
			<view class="tianjia-top">
				添加老师微信获取解锁码免费解锁
			</view>
			<image class="tianjia-image" :src="unlock.unlock.teacherProfilePhoto" mode=""></image>
			<view class="tianjia-top2">
				{{unlock.teacherName}}
			</view>
			<view class="tianjia-top3" @click="fuzhi">
				复制微信号,并去添加
			</view>
			<input placeholder="请输入解锁码" v-model="yaoqing" class="tianjia-input" type="text" value="" />
			<view class="tianjia-top4" @click="onkeyUnlock">
				解锁
			</view>
			<view class="quxia-tanjia" @click="isREs=false">
				取消
			</view>
		</view>
		<view v-show='loginAss' class="back-tankuang">
			<login class="loginw" @guanbi='guanbi' />
		</view>
	</view>
</template>
<script>
	import AuditLiveItem from "@/pagesA/components/audit/audit-live-item";
	import {
		getAuditionLive,
		getTemplateId,
		reserveLive,
		shareUnlock,
		keyUnlock,
		findByLivePreview
	} from "@/api/homeAudition.js";
	import {
		getTitle
	} from "@/common/util/index.js";
	export default {

		// 分享给好友
		onShareAppMessage(options) {
			console.log(options)
			// if(options.target.id=='right'){
			// 	this.onShareTimeline()
			// }else{

			var that = this;
			// 设置菜单中的转发按钮触发转发事件时的转发内容
			var shareObj = {
				title: getTitle(), // 默认是小程序的名称(可以写slogan等)
				desc: '', // 小程序的描述
				path: '/pages/index/home', // 默认是当前页面，必须是以‘/’开头的完整路径
				imageUrl: this.unlock.teacherImagePhoto, // 图片封面，本地文件路径、网络图片路，支持PNG及JPG，默认当前页面截图，显示图片长宽比是 5:4。
				success: function(res) {
					// 转发成功之后的回调
					console.log(res)
					if (res.errMsg == 'shareAppMessage:ok') {
						console.log(res)
						// 根据专业查询直播中

					}
				},
				fail: function(res) {
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
					console.log(res)
					// 转发结束之后的回调（转发成不成功都会执行）
				}
			}
			// 来自页面内的按钮的转发
			if (options.from == 'button') {
				shareUnlock({
					type: 0,
					courseId: this.unlock.id
				}).then(res => {
					console.log(res)
					this.isAss = false
					this.getAll(this.pageInfo);
				})
				// var eData = options.target.dataset;
				// console.log(eData.id); // shareBtn
				// 此处可以修改 shareObj 中的内容
				// shareObj.path = '/pages_category_page1/store/index?storeId=' + this.shopId
			}
			// 返回shareObj
			return shareObj;
			// }
		},
		components: {
			AuditLiveItem,
		},
		//接收参数
		props: {},
		data() {
			//这里存放数据
			return {
				loginAss: getApp().globalData.loginAss,
				imageUrl: getApp().globalData.imageUrl,
				auditionLiveArr: [],
				pageInfo: {
					majorId: 1,
					pageNo: 1,
					pageSize: 10,
					uid: ''
				},
				total: 0,
				status: "loadmore",
				isREs: false,
				isAss: false,
				unlock: {},
				yaoqing: ''
			};
		},
		computed: {},
		watch: {},
		mounted() {
			try {
				this.pageInfo.majorId = uni.getStorageSync('MajorInfo').id
				this.pageInfo.uid = uni.getStorageSync('userInfos').id
			} catch (e) {}

			this.getAll(this.pageInfo);
		},
		// 上拉加载更多
		onReachBottom() {
			if (this.pageInfo.pageSize >= this.total) return;
			this.status = "loading";
			this.pageInfo.pageSize += 10;
			setTimeout(() => {
				this.getAll(this.pageInfo);
				if (this.pageInfo.pageSize >= this.total) this.status = "nomore";
				else this.status = "loading";
			}, 600);
		},
		//方法集合
		methods: {
			onReturn() {
				// uni.switchTab({
				// 	url: '/pages/index/home'
				// })
				uni.reLaunch({
					url: '/pages/index/home'
				})
			},
			guanbi(value) {
				this.loginAss = value
			},
			fuzhi() {
				console.log(this.unlock.unlock)
				uni.setClipboardData({
					data: this.unlock.unlock.teacherWx,
					success: function() {
						console.log('success');
					}
				});
			},
			onkeyUnlock() {
				uni.showLoading({
					mask: true,
					title: '加载中'
				})
				keyUnlock({
					type: 0,
					courseId: this.unlock.id,
					key: this.yaoqing
				}).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.isREs = false
						this.getAll(this.pageInfo);
						uni.hideLoading()
						uni.showToast({
							title: '解锁成功',
							icon: "none"
						})

					}
				})
			},
			lookLive(data, index) {
				console.log(data)
				this.unlock = data
				if (data.unlock.isUnLock == 0) {
					if (data.unlock.unlockType == 1) {
						this.isAss = true
						this.isREs = false
						console.log(123)
					} else if (data.unlock.unlockType == 0) {
						this.isREs = true
						this.isAss = false
					}
				} else {
					uni.setStorageSync('materials', data.materials)
					if (data.liveClassroomStatus == 1) {
						let token = uni.getStorageSync('token')
						if (!token) {
							this.loginAss = true
							// uni.navigateTo({
							// 	url: '/pages/login/login'
							// })
							return
						}
						//未开播，可设置提醒（微信订阅消息）
						if (data.isAgree != 1) {
							getTemplateId({
								type: 1
							}).then(res => {
								if (res.result && res.result[0]) {
									this.SubscribeMessage(res.result[0].templateId, data, index)
								} else {
									uni.showToast({
										title: '订阅失败',
										icon: 'none'
									})
								}
							})
						} else {
							//待在线，进入观看
							// uni.setStorageSync('materials', data.materials)
							uni.navigateTo({
								url: '/pages/webView/webView?channel=' + data.channel + '&videoId=' + data.id +
									'&liveCourseId=' + data.liveCourseId
							})
						}
					} else if (data.liveClassroomStatus == 2 && data.channel) {
						//在线中，进入观看
						uni.setStorageSync('materials', data.materials)
						uni.navigateTo({
							url: '/pages/webView/webView?channel=' + data.channel + '&videoId=' + data.id +
								'&liveCourseId=' + data.liveCourseId
						})
					} else if (data.liveClassroomStatus == 4) {
						//在线结束可回放
						uni.navigateTo({
							url: '/pages/webView/webView?channel=' + data.channel + '&videoId=' + data.id +
								'&liveCourseId=' + data.liveCourseId
						})
						// console.log(data)
						// if (data.vid) {
						// 	uni.setStorageSync('materials', data.materials)
						// 	uni.navigateTo({
						// 		url: '/pages/videoRoom/videoRoom?vid=' + data.vid+'&videoId='+data.id+'&courseName='+data.courseName
						// 	})
						// } else {
						// 	uni.showToast({
						// 		title: '回放内容不存在',
						// 		icon: 'none'
						// 	});
						// }

					} else {
						uni.showToast({
							title: '回放未生成',
							icon: 'none'
						});
					}
				}

			},
			SubscribeMessage(tId, data, index) {
				const that = this;
				wx.requestSubscribeMessage({
					tmplIds: [tId],
					success(res) {
						console.log(res)
						if (res[tId] == 'accept') {
							reserveLive({
								videoId: data.id
							}).then(result => {
								if (result.code == 200) {
									wx.showToast({
										title: '预约成功',
										icon: 'none'
									})
									that.auditionLiveArr[index].isAgree = 1
								} else {
									wx.showToast({
										title: result.message,
										icon: 'none'
									})
								}
								// uni.navigateTo({
								// 	url: '/pages/webView/webView?channel=' + data.channel +
								// 		'&videoId=' + data.id + '&liveCourseId=' + data
								// 		.liveCourseId
								// })
							})
						} else {
							//待在线，进入观看
							uni.setStorageSync('materials', data.materials)
							uni.navigateTo({
								url: '/pages/webView/webView?channel=' + data.channel + '&videoId=' + data
									.id + '&liveCourseId=' + data.liveCourseId
							})
						}
					},
					fail() {
						//待在线，进入观看
						uni.setStorageSync('materials', data.materials)
						uni.navigateTo({
							url: '/pages/webView/webView?channel=' + data.channel + '&liveCourseId=' + data
								.liveCourseId
						})
					}
				})
			},
			async getAll(info) {
				const res = await findByLivePreview(info);
				console.log(res.result);
				this.auditionLiveArr = res.result.records;
				this.total = res.result.total;
				if (this.pageInfo.pageSize >= this.total) this.status = "nomore";
				else this.status = "loading";
				// if(res.result.records.length < res.result.total) this.status = 'nomore'
			},
		},
	};
</script>
<style lang='scss' scoped>
	.bg {
		background: #fafafa;
		min-height: 100%;
	}

	.imgVBiew {
		width: 200rpx;
		margin-right: 75rpx;
	}

	.img {
		width: 19rpx;
		height: 34rpx;
		margin-bottom: 28rpx;
	}

	.mayTabs {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 99999;
		background-color: #ffffff;
		padding: 108rpx 152rpx 0rpx 30rpx;
		display: flex;
		align-items: center;

		.tabItem {
			height: 69rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			justify-items: center;
			font-size: 32rpx;
			font-weight: bold;
			padding-bottom: 28rpx;
			color: #333333;
		}

		.active {
			color: #333333;
			font-weight: 900;
			background-image: url("../../static/组.png");
			background-size: 100% 100%;
			background-repeat: no-repeat;
		}
	}

	.list-box {
		padding: 185rpx 21rpx;
		padding-bottom: 20rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.list-item {
			margin-top: 20rpx;
		}
	}

	.tianjia {
		width: 749rpx;
		height: 825rpx;
		background: #FFFFFF;
		position: fixed;
		bottom: 0rpx;
		z-index: 9999;
		padding-top: 56rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 50rpx 50rpx 0 0;
	}

	.tianjia-top {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
	}

	.tianjia-image {
		width: 134rpx;
		height: 134rpx;
		border-radius: 10rpx;
		margin-top: 39rpx;
	}

	.tianjia-top2 {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		margin-top: 22rpx;
	}

	.tianjia-top3 {
		width: 321rpx;
		height: 63rpx;
		background: #FE7D36;
		border-radius: 31rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		text-align: center;
		line-height: 63rpx;
		margin-top: 38rpx;
	}


	.tianjia-input {
		width: 545rpx;
		height: 101rpx;
		background: #E0E0E0;
		opacity: 0.6;
		border-radius: 20rpx;
		margin-top: 47rpx;
		font-size: 28px;
		font-family: PingFang SC;
		font-weight: 500;
		color: #2C2C2C;
		line-height: 101rpx;
		text-align: center;
	}

	.tianjia-top4 {
		width: 500rpx;
		height: 80rpx;
		background: #3B7BFF;
		border-radius: 40rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 80rpx;
		text-align: center;
		margin-top: 40rpx;
	}

	.quxia-tanjia {
		font-family: PingFang SC;
		font-weight: 500;
		color: #929292;
		font-size: 32rpx;
		text-align: center;
		height: 118rpx;
		width: 100%;
		border-top: 2px solid #EAEAEA;
		margin-top: 45rpx;
		line-height: 118rpx;
	}


	.bottom-fengxiang {
		width: 749rpx;
		height: 480rpx;
		background: #FFFFFF;
		position: fixed;
		bottom: 0rpx;
		z-index: 9999;
	}

	.quxiao {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #929292;
		text-align: center;
		margin-top: 29rpx;
	}

	.fengxiang-center-left {
		// margin-left: 164rpx;
		text-align: center;
		background: none;

		image {
			width: 102rpx;
			height: 102rpx;
		}

		.center-right-text {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			margin-top: 29rpx;
		}
	}

	.fengxiang-center-right {
		margin-right: 134rpx;
		text-align: center;
		background: none;

		image {
			width: 102rpx;
			height: 102rpx;
		}

		.center-right-text {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			margin-top: 29rpx;
		}
	}

	.bottom-fengxiang-center {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 280rpx;
		width: 690rpx;
		border-bottom: 1rpx solid #EAEAEA;
		margin: 0 auto;
	}

	.bottom-fengxiang-top {
		width: 690rpx;
		height: 100rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		margin: 0 auto;
		padding-top: 35rpx;
		border-bottom: 1px solid #EAEAEA;
		text-align: center;
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