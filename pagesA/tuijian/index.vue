<template>
	<view class="bg">
		<view class="top">
			<view class="views" @click="onReturn">
				<image class="ikmg" :src="imageUrl + '/zixun/img/fanhui.png'" mode="">
				</image>
			</view>

			<view class="flex">
				<image class="img2" :src="imageUrl+'/static/learn/homeLive/alarm.png'" mode=""></image>
				<view class="text">
					您还未购买该课程
				</view>
			</view>
			<view class="flex2">
				<image :src="imageUrl + '/zixun/img/zuo.png'" mode=""></image>
				<view class="text2">
					购买以下课程可解锁该直播
				</view>
				<image :src="imageUrl + '/zixun/img/you.png'" mode=""></image>
			</view>
		</view>
		<view v-for="item in ClassesArr" :key="item.id" class="ubsw" style="margin-top: 20rpx">
			<CourseItem :dataInfo="item" :tise='1'/>
		</view>
		<view v-show='loginAss' class="back-tankuang">
			<login class="loginw" @guanbi='guanbi' />
		</view>
	</view>
</template>

<script>
	import CourseItem from "@/pagesA/components/course-item/index.vue";
	import {
		findByNotBuyClasses
	} from "@/api/homeAudition.js";
	export default {
		components: {
			CourseItem
		},
		data() {
			return {
				loginAss: getApp().globalData.loginAss,
				imageUrl: getApp().globalData.imageUrl,
				pageInfo: {
					majorId: '1551450122080714754',
					pageNo: 1,
					pageSize: 10,
					liveCourseId: '1514140298662064129'
				},
				ClassesArr: [],
				total: ''
			}
		},
		onShow() {
			console.log(92029)
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
			console.log(aaa)
			if (thatPage.options.liveCourseId) {
				this.pageInfo.liveCourseId = thatPage.options.liveCourseId
				console.log(92029)
			}
			this.pageInfo.majorId = uni.getStorageSync('MajorInfo').id
			let token = uni.getStorageSync('token')
			if (token) {
				console.log(this.pageInfo)
				this.getAll(this.pageInfo)
				console.log(92029)
			} else {
				this.loginAss = true
				console.log(92029)
			}
		},
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

		methods: {
			guanbi(value) {
				this.loginAss = value
			},
			onReturn() {
				// uni.navigateBack({
				// 	delta: 1, //返回层数，2则上上页
				// })
				// uni.switchTab({
				// 	url: '/pages/home/home'
				// })
				let pagest = uni.getStorageSync('pagest')
				console.log(pagest)

				if (pagest) {
					console.log(pagest)
					uni.reLaunch({
						url: pagest
					})
				} else {
					// uni.switchTab({
					// 	url: '/pages/index/home',
					// })
					uni.reLaunch({
						url: '/pages/index/home'
					})
				}
				// uni.redirectTo({
				// 	url: '/pagesA/audit-live-list/index'
				// })
				// const pages = getCurrentPages();
				// console.log(pages)
				// if (pages.length === 2) {
				// 	uni.navigateBack({
				// 		delta: 2
				// 	});
				// } else if (pages.length === 1) {
				// 	uni.switchTab({
				// 		url: '/pages/home/home',
				// 	})
				// } else {
				// 	uni.navigateBack({
				// 		delta: 2
				// 	});
				// }
			},
			onMore() {
				this.$emit('onMore')
			},
			async getAll(pageInfo) {
				let res = await findByNotBuyClasses(pageInfo)
				console.log(res.result)
				this.ClassesArr = res.result.records
				this.total = res.result.total
			},
		},
	}
</script>

<style scoped lang="scss">
	.bg{
		background: #fafafa;
		min-height: 100%;
	}
	.views {
		width: 100rpx;
		height: 150rpx;
		padding-top: 62rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.ubsw {
		margin-left: 30rpx;
		margin-right: 30rpx;
		position: relative;
		top: -80rpx;
	}

	.classesName {
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		// white-space: nowrap;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}

	.ziyuanFlex2 {
		display: flex;
		justify-content: space-between;
		margin-top: 18rpx;
	}

	.classesDescribe {
		font-size: 24rpx;
		font-weight: 500;
		color: #999999;
		overflow: hidden;
		text-overflow: ellipsis;
		// white-space: nowrap;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}

	.lineFficialPrice {
		text-decoration: line-through;
		font-size: 30rpx;
		font-weight: 500;
		text-decoration: line-through;
		color: #BCBCBC;
	}

	.price {
		font-size: 36rpx;
		font-weight: bold;
		color: #FA642C;
	}

	.ziyuanFlex {
		display: flex;
		justify-content: space-between;
	}

	.ziyuan {
		width: 690rpx;
		height: 330rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 2rpx 8rpx 0rpx rgba(0, 0, 0, 0.2000);
		border-radius: 20rpx;
		padding: 25rpx 20rpx 34rpx 20rpx;
	}

	.text2 {
		font-size: 30rpx;
		font-weight: 500;
		color: #FFF6C2;
		margin: 0 29rpx;
	}

	.flex2 {
		display: flex;
		position: absolute;
		top: 203rpx;
		left: 102rpx;
		align-items: center;

		image {
			width: 65rpx;
			height: 3rpx;
		}
	}

	.flex {
		display: flex;
		position: absolute;
		align-items: center;
		top: 127rpx;
		left: 188rpx;
	}

	.text {
		font-size: 36rpx;
		font-weight: bold;
		color: #FFFFFF;
		margin-left: 21rpx;
	}

	.img2 {
		width: 34rpx;
		height: 39rpx;
	}

	.ikmg {
		width: 44rpx;
		height: 44rpx;
		// margin-top: 62rpx;
		margin-left: 30rpx;
		/*  */
		position: absolute;
		z-index: 99;
	}

	.top {
		background-image: url($fileBaseUrl + '/tabBarIcon/tuijian.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 101%;
		height: 440rpx;
		margin-left: -5rpx;
	}
</style>
