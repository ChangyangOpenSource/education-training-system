
<template>
	<view class="bg">
		<view class="mayTabs">
			<image class="image" :src="imageUrl+'/static/learn/homeLive/返回键.png'" mode="" @click="onReturn"></image>
			<view class="tabItem" v-for="(item, index) in listData" :key="index"
				:class="num == item.num ? 'active' : ''" @click="onNum(item)">
				{{ item.name }}
				<image v-if="num == item.num" :src="imageUrl+'/xing/dibu.png'"  />
			</view>
		</view>
		<view class="item u-border-bottom list-box" v-if="num==2">
			<view class="list-item" v-for="item in auditionCourseArr" :key="item.id">
				<AuditCrouseItem :dataInfo="item" />
			</view>
		</view>
		<!-- 		<view class="item u-border-bottom list-box" v-if="num==1">
			<view class="list-item" v-for="(item,index) in auditionionLive" :key="item.id">
				<AuditCrouseItemlive @onERnd='onERnd' :index="index" :dataInfo="item" />
			</view>
		</view> -->
		<image v-if="num==1 && auditionionLive.length==0"
			style="width: 349rpx;height: 312rpx;display: block;margin: 300rpx auto;" :src="imageUrl+'/xing/zwsj.png'"
			mode=""></image>
		<image v-if="num==2 && auditionCourseArr.length==0"
			style="width: 349rpx;height: 312rpx;display: block;margin: 300rpx auto;" :src="imageUrl+'/xing/zwsj'"
			mode=""></image>
		<u-loadmore :status="status" />
		<!-- <view class="list-box">
      <view class="list-item" v-for="(item, index) in 10" :key="index">
        <AuditCrouseItem />
      </view>
    </view> -->

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
	import AuditCrouseItem from "@/pagesA/components/audit/audit-course-item/live.vue";
	// import AuditCrouseItemlive from "@/pagesA/components/audit/audit-course-live/live.vue";
	import {
		getAuditionCourse,
		getAuditionLive,
		shareUnlock,
		keyUnlock,
	} from "@/api/homeAudition.js";
	import {
		getTitle
	} from "@/common/util/index.js";
	export default {
		components: {
			AuditCrouseItem,
			// AuditCrouseItemlive,
		},
		//接收参数
		props: {},
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
					if (this.num == 1) {
						this.pageInfo.pageNo = 1
						this.pageInfo.pageSize = 10
						this.getLive(this.pageInfo);
					} else {
						this.pageInfo.pageNo = 1
						this.pageInfo.pageSize = 10
						this.getAll(this.pageInfo);
					}
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
		data() {
			//这里存放数据
			return {
				loginAss: getApp().globalData.loginAss,
				imageUrl: getApp().globalData.imageUrl,
				auditionCourseArr: [],
				auditionionLive: [],
				isAss: false,
				isREs: false,
				yaoqing: '',
				unlock: {},
				pageInfo: {
					majorId: 1,
					pageNo: 1,
					pageSize: 10,
					uid: ''
				},
				total: 0,
				status: "loadmore",
				num: 2,
				listData: [
					// {
					// 	num: 1,
					// 	name: "试听直播",
					// },
					{
						num: 2,
						name: "试听课程",
					},

				],
			};
		},
		computed: {},
		watch: {},
		mounted() {
			this.pageInfo.majorId = uni.getStorageSync('MajorInfo').id
			this.pageInfo.uid = uni.getStorageSync('userInfos').id
			this.getAll(this.pageInfo);
			// this.getLive(this.pageInfo);
		},
		// 上拉加载更多
		onReachBottom() {
			if (this.pageInfo.pageSize >= this.total) return;
			this.status = "loading";
			this.pageInfo.pageSize += 10;
			setTimeout(() => {
				this.getAll(this.pageInfo);
				// this.getLive(this.pageInfo);
				if (this.pageInfo.pageSize >= this.total) this.status = "nomore";
				else this.status = "loading";
			}, 600);
		},
		//方法集合
		methods: {
			onERnd(value) {
				console.log(value)
				this.unlock = value
				if (value.unlock.unlockType == 1) {
					this.isAss = true
					this.isREs = false
					console.log(123)
				} else if (value.unlock.unlockType == 0) {
					this.isREs = true
					this.isAss = false
				}
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
						this.getLive(this.pageInfo);
						uni.hideLoading()
						uni.showToast({
							title: '解锁成功',
							icon: "none"
						})

					}
				})
			},
			onReturn() {
				console.log(123)
				uni.reLaunch({
					// delta: 1, //返回层数，2则上上页
					url: '/pages/index/home'
				})
			},
			onNum(item) {
				this.num = item.num
				if (this.num == 1) {
					this.pageInfo.pageNo = 1
					this.pageInfo.pageSize = 10
					this.getLive(this.pageInfo);
				} else {
					this.pageInfo.pageNo = 1
					this.pageInfo.pageSize = 10
					this.getAll(this.pageInfo);
				}
			},
			guanbi(value) {
				this.loginAss = value
			},
			async getAll(info) {
				const res = await getAuditionCourse(info);
				console.log(res.result);
				this.auditionCourseArr = res.result.records;
				this.total = res.result.total;
				if (this.pageInfo.pageSize >= this.total) this.status = "nomore";
				else this.status = "loading";
			},
			async getLive(info) {
				const res = await getAuditionLive(info);
				console.log(res.result);
				this.auditionionLive = res.result.records;
				this.total = res.result.total;
				if (this.pageInfo.pageSize >= this.total) this.status = "nomore";
				else this.status = "loading";
			},
		},
	};
</script>
<style lang='scss' scoped>
	.bg {
		background: #fafafa;
		min-height: 100%;
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




	.image {
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
		padding: 110rpx 300rpx 0rpx 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.tabItem {
			height: 69rpx;
			font-size: 32rpx;
			font-weight: bold;
			padding-bottom: 28rpx;
			color: #333333;
			position: relative;
		}

		image {
			width: 44rpx;
			height: 14rpx;
			position: absolute;
			bottom: 1rpx;
			left: 40rpx;
		}

	}

	.flex {
		display: flex;
	}

	.list-box {
		padding: 168rpx 30rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		// .list-item {
		// margin-right: 14rpx;
		// }
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