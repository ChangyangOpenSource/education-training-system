<template>
	<view class="bg">
		<!-- 专业切换 -- begin -->
		<view :class="{majors1:!dingISass,majors2:dingISass}">
			<view class="major-doms">
				<view class="majordsd" v-if="dingISass"> </view>
				<view class="major-box">
					<view class="logo-txt"> {{titleLogin}} </view> <!-- 选择专业 -->
					<MajorSelect @goto="chooseMajor" :name="majorName" />
				</view>
			</view>
		</view>
		<!-- 专业切换 -- end -->
		<!-- 轮播 -- begin -->
		<view class="swiper-box">
			<swiper :autoplay="true" class="screen-swiper square-dot" :indicator-dots="true"
				indicator-color='rgba(238, 238, 238, 1)' indicator-active-color="rgba(255, 91, 0, 1)" :circular="true"
				interval="5000" duration="500" v-if="swiperList.length > 0">
				<swiper-item v-for="item in swiperList" :key="item.id">
					<view class="swiper-item-box" @click="bannerGoto(item)">
						<image class="swiper-img" :src="item.pcImage" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 轮播 -- end -->
		<!-- 设置考试时间 -- begin -->
		<!-- <ExamTime /> -->
		<!-- 设置考试时间 -- end -->
		<!-- 温度计划 -- begin -->
		<view class="" v-if="false">
			<view class="entrance" v-if="ambssadorFlg.helpStuFlg==1 && ambssadorFlg.ambassadorFlg==1">
				<view class="entrance-left" @click="onWennuan" v-if="ambssadorFlg.helpStuFlg!=0">
					<view class="entrance-left-top"> 温度计划 </view>
					<view class="entrance-left-bottom"> 免费领取助学金 </view>
				</view>
				<view class="entrance-right" @click="onTuiGuang" v-if="ambssadorFlg.ambassadorFlg!=0">
					<view class="entrance-left-top"> 推广大使 </view>
					<view class="entrance-left-bottom"> 成为推广大使赚佣金 </view>
				</view>
			</view>
			<view class="entrance" v-else>
				<image class="top-image" @click="onTuiGuang" :src="imageUrl+'/static/fsdownload/16.png'"
					v-if="ambssadorFlg.ambassadorFlg!=0" mode=""></image>
				<image class="bottom-image" @click="onWennuan" :src="imageUrl+'/static/fsdownload/17.png'"
					v-if="ambssadorFlg.helpStuFlg!=0" mode=""></image>
			</view>
		</view>
		<!-- 温度计划 -- end -->
		<!-- 试听直播 -- begin -->
		<AuditionLive v-if="isApplet" ref="AuditionLive" :majorId="pageInfo.majorId" @onERnd='onERnd' />
		<!-- 试听直播 -- end -->
		<!-- 试听课程 -- begin -->
		<!-- <AuditionCourse ref="AuditionCourse" :majorId="pageInfo.majorId" @onERnd='onERnd' /> -->
		<!-- 试听课程 -- end -->
		<!-- 热销课程 -- begin -->
		<view v-if="bestSellerCourseList.length > 0">
			<HomeTitle title="热销课程" type="2" />
			<view>
				<view style="margin-top: 20rpx; padding: 0 30rpx;" v-for="item in bestSellerCourseList" :key="item.id">
					<CourseItem :dataInfo="item" />
				</view>
			</view>
			<!-- 			<image style="width: 349rpx;height: 312rpx;margin: 40rpx auto;display: block;" v-else
			:src="imageUrl+'/xing/zwsj.png'" mode=""></image> -->
		</view>
		<!-- 热销课程 -- end -->
		<!-- 系列课程 -- begin -->
		<view>
			<HomeTitle title="班级课程" type="3" />
			<view style="padding: 0 30rpx 0rpx 30rpx" v-if="seriesCourseList.length > 0">
				<view v-for="item in seriesCourseList" :key="item.id" style="margin-top: 20rpx">
					<CourseItem :dataInfo="item" />
				</view>
			</view>
			<image style="width: 349rpx;height: 312rpx;margin: 40rpx auto;display: block;" v-else
				:src="imageUrl+'/xing/zwsj.png'" mode=""></image>
		</view>
		<!-- 系列课程 -- end -->
		<!-- 高端面授 -- begin -->
		<view>
			<HomeTitle title="活动报名" type="4" v-if="faceCourseList.length > 0" />
			<view style="padding: 0 30rpx 20rpx 30rpx" v-if="faceCourseList.length > 0">
				<view v-for="item in faceCourseList" :key="item.id" style="margin-top: 20rpx">
					<courseIndex :dataInfo="item" />
				</view>
			</view>
		</view>
		<!-- 高端面授 -- end -->

<!-- 		<view v-show="livePosiIsShow && liveing" style="transition: all 1s;" @click="toLiveing">
			<view class="nowLiveBox">
				<view class="nowLive" v-if="liveing">
					<view class="left">
						<image class="llll"
							:src="imageUrl + '/oss/playgif_1640853609666.gif'"
							mode=""></image>
						<image v-if='liveing' class="animationImg" :src="liveing.teacherImagePhoto" mode=""></image>
						<view>
							<text>{{liveing.liveClassroomName}}</text>
							<view class="dasdasd2">课程: {{liveing.courseName}}</view>
						</view>
					</view>
					<view v-if="liveing.isAudition==1&&liveing.unlock.unlockType!=9 && liveing.unlock.isUnLock == 0"
						class="live-box remind-box"
						:style="{'background-image': `url(${imageUrl}/ykstatic/beijchu.png)`,'background-size':'100%'}">
						<image class="size" :src="imageUrl + '/ykstatic/jiesuochu.png'" mode=""></image>
						解锁
					</view>
					<image v-else class="rimg"
						:src="imageUrl + '/oss/live4_1640660575926.png'"
						mode=""></image>
				</view>
			</view>
		</view> -->

		<view v-show="!livePosiIsShow && liveing" style="transition: all 1s;" @click="livePosiIsShow = !livePosiIsShow">
			<view class="nowLiveR">
				<image v-if='liveing' class="animationImg" :src="liveing.teacherImagePhoto" mode=""></image>
				<view></view>
			</view>
		</view>
		<!-- <image show-menu-by-longpress="true"  :src="imageUrl + '/home/1.jpg'" mode=""></image> -->

		<view class="bottom-fengxiang" v-if="isAss==true">
			<view class="bottom-fengxiang-top"> 分享可免费解锁 </view>
			<view class="bottom-fengxiang-center"> <button class="fengxiang-center-left" open-type="share">
					<image :src="imageUrl + '/ykstatic/wxchu.png'" mode=""></image>
					<view class="center-right-text"> 微信好友 </view>
				</button>
				<!-- 	<button id="right" class="fengxiang-center-right" open-type="share" > <image src="@/static/tabBarIcon/朋友圈%20拷贝.png" mode=""></image> <view class="center-right-text"> 朋友圈 </view> </button> -->
			</view>
			<view class="quxiao" @click="isAss=false"> 取消 </view>
		</view>

		<view class="tianjia" v-if="isREs==true">
			<view class="tianjia-top"> 添加老师微信获取解锁码免费解锁 </view>
			<image class="tianjia-image" :src="unlock.unlock.teacherProfilePhoto" mode=""></image>
			<view class="tianjia-top2"> {{unlock.teacherName}} </view>
			<view class="tianjia-top3" @click="fuzhi"> 复制微信号,并去添加 </view> <input placeholder="请输入解锁码" v-model="yaoqing"
				class="tianjia-input" type="text" value="" />
			<view class="tianjia-top4" @click="onkeyUnlock"> 解锁 </view>
			<view class="quxia-tanjia" @click="isREs=false"> 取消 </view>
		</view>
		<view class="footer_tip2">
			<image :src="imageUrl + '/xing/cy_logo_grey.png'"  />洛阳畅阳网络科技有限公司提供技术支持
		</view>
	</view>


</template>
<script>
	import socket from "@/common/js-sdk/socket/socket.js";
	import MajorSelect from "@/components/major-select/index.vue";
	// import ExamTime from "./components/exam-time/index.vue";
	import AuditionLive from "./components/audition-live/index.vue";
	// import AuditionCourse from "./components/audition-course/index.vue";
	import HomeTitle from "./components/home-title/index.vue";
	import CourseItem from "./components/course-item/index2.vue";
	import courseIndex from "./components/course-item/index3.vue";
	import {
		wxLogin,
		bindinMajor,
		loginRecord
	} from "@/api/login.js";
	import {
		getMajorInfo,
		getCode,
		setStudentId,
		getStudentId,
		getToken,
		getEntityId,
		setMajorInfo,
		setUserInfo,
		setToken,
		getTitle
	} from "@/common/util/index.js";
	import {
		getBanner,
		getBestSellerCoursePageList,
		getSeriesCoursePageList,
		getFaceCoursePageList,
		getLiveing,
		shareUnlock,
		keyUnlock,
		isHomeTop,
		judge,
		cyDistributorActivity
	} from "@/api/homeAudition.js";
	import {
		componentInfoBrief
	} from '@/api/mine/about.js'
	import {
		queryByStudent,
	} from "@/api/zhuli.js";
	import {
		getMajor
	} from "@/api/professionalChoice.js";
	const NET = require("@/uview-ui/request");
	const API = require("@/api/tuiguang");
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
					if (res.errMsg == 'shareAppMessage:ok') {
						console.log(res, 124214214214214214)
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
					// this.$refs.AuditionLive.getAll()
					// 根据专业查询直播中
					// let data = {
					// 	majorId: this.pageInfo.majorId
					// }
					// getLiveing(data).then(res => {
					// 	if (res.result.length > 0) {
					// 		this.liveing = res.result[0]
					// 		console.log(this.liveing, 1234)
					// 	} else {
					// 		this.liveing = null
					// 	}
					// })
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
		name: "home",
		components: {
			MajorSelect,
			// ExamTime,
			AuditionLive,
			// AuditionCourse,
			HomeTitle,
			CourseItem,
			courseIndex
		},
		onPageScroll(e) {
			if (e.scrollTop > 50) {
				this.livePosiIsShow = false
			}
		},
		data() {
			return {
				titleLogin: '',
				// refresh: false,
				// tabbarIndex: uni.getStorageSync('tabbarIndex'),
				livePosiIsShow: true,
				imageUrl: getApp().globalData.imageUrl,
				isApplet: getApp().globalData.isApplet,
				majorName: "", //专业学科名字
				isAss: false,
				isREs: false,
				amBss: false,
				unlock: {},
				// oto: {
				// 	scene: 'codebvrsrj'
				// },
				code: '',
				ambssadorFlg: {},
				yaoqing: '',
				swiperList: [], //banner列表
				bestSellerCourseList: [], //热销课程列表
				seriesCourseList: [], //系列课程列表
				faceCourseList: [], //高端面授列表
				pageInfo: {
					majorId: 1,
					pageNo: 1,
					pageSize: 10,
				},
				// msgCount: 0,
				// dot: {
				// 	mailHome: false,
				// },
				liveing: null,
				// isClose: false, //判断当前页面是打开还是返回页  
				// list: [],
				// page: 0,
				// unionids: '',
				// openids: '',
				// sessionKey: '',
				// infos: '',
				// phisAss: false,
				dingISass: true
			};
		},
		watch: {},
		mounted() {},
		methods: {
			get_componentInfoBrief() {
				componentInfoBrief().then((res) => {
					this.titleLogin=res.result.title
				})
			},
			drawing() { //首页的数据渲染
				if (uni.getStorageSync("ipfit") == 1) {
					this.dingISass = false
				} else if (uni.getStorageSync("ipfit") == 2) {
					this.dingISass = true
				}

				let userInfo = null
				try {
					userInfo = uni.getStorageSync('userInfos')
				} catch (e) {}
				const MajorInfo = getMajorInfo("MajorInfo");
				if (!MajorInfo) {
					const shareurl = uni.getStorageSync('shareUrl')
					console.log(shareurl.substr(0, shareurl.indexOf('?')))
					if (shareurl.substr(0, shareurl.indexOf('?')) == '/pagesA/payOrder/payOrder') {
						uni.removeStorage('shareUrl');
						uni.removeStorageSync('shareUrl');
					}
					uni.navigateTo({
						url: "/pagesA/setUpMajor/setUpMajor",
					});
					return
				}
				// 当前选择专业名称
				// this.titleLogin = getTitle()
				this.majorName = MajorInfo ? MajorInfo.majorName : "";
				this.cyDistributorActivity()
				this.get_componentInfoBrief()
				// 当前选择专业ID
				this.pageInfo.majorId = MajorInfo ? MajorInfo.id : "";
				// 获取热销课程
				this.bestSellerCoursePageListFun(this.pageInfo);
				// 获取班级(系列)课程
				this.seriesCoursePageListFun(this.pageInfo);
				// 获取面授课程
				// this.faceCoursePageListFun(this.pageInfo);
				// 获取轮播图
				this.BannerFun(this.pageInfo.majorId);
				// 获取试听直播
				// this.$refs.AuditionLive.pageInfo.majorId = MajorInfo.id
				// this.$refs.AuditionLive.pageInfo.uid = userInfo.id || ''
				// this.$refs.AuditionLive.getAll()
				// 获取试听课程
				// this.$refs.AuditionCourse.pageInfo.uid = userInfo.id || ''
				// this.$refs.AuditionCourse.pageInfo.majorId = MajorInfo.id
				// this.$refs.AuditionCourse.getAll()
				// 根据专业查询直播中
				// let data = {
				// 	majorId: this.pageInfo.majorId
				// }
				// getLiveing(data).then(res => {
				// 	if (res.result.length > 0) {
				// 		this.liveing = res.result[0]
				// 		console.log(this.liveing, 1234)
				// 	} else {
				// 		this.liveing = null
				// 	}
				// })
			},
			cyDistributorActivity() {
				cyDistributorActivity().then((res) => {
					this.faceCourseList = res.result.records;
				})
			},
			jidge() { //判断是否是分销员，不是带邀请码进页面
				NET.request(API.judge, {}, 'post').then(res => {
					if (res.code == 200) {
						if (this.code) {
							uni.navigateTo({
								url: "/pagesA/tuiguan/index?code=" + this.code,
							});
						} else {
							uni.navigateTo({
								url: "/pagesA/tuiguan/index",
							});
						}
					} else if (res.code == 401) {
						uni.showToast({
							title: '请重新登录',
							icon: "none"
						})
					} else {
						if (this.code) {
							uni.navigateTo({
								url: "/pagesA/shenqing/index?code=" + this.code,
							});
						} else {
							uni.navigateTo({
								url: "/pagesA/tuiguan/index",
							});
						}
					}
				})
			},
			onTuiGuang() {
				uni.showLoading({
					mask: true,
					title: '加载中'
				})
				NET.request(API.judge, {}, 'post').then(res => {
					if (res.code == 200) {
						uni.hideLoading()
						if (this.code) {
							uni.navigateTo({
								url: "/pagesA/tuiguan/index?code=" + this.code,
							});
						} else {
							uni.navigateTo({
								url: "/pagesA/tuiguan/index",
							});
						}

					} else if (res.code == 401) {
						uni.showToast({
							title: '请重新登录',
							icon: "none"
						})
						this.$emit('toLogin')
					} else {
						uni.hideLoading()
						if (this.code) {
							uni.navigateTo({
								url: "/pagesA/shenqing/index?code=" + this.code,
							});
						} else {
							if (res.message = '当前账号尚未成为推广大使') {
								uni.navigateTo({
									url: "/pagesA/shenqing/index",
								});
							} else {
								uni.showToast({
									title: res.message,
									icon: "none"
								})
							}
						}
					}
				})
			},
			fuzhi() {
				uni.setClipboardData({
					data: this.unlock.unlock.teacherWx,
					success: function() {
					}
				});
			},
			onisHomeTop() {
				isHomeTop({}).then(res => {
					if (res.code == 200) {
						this.ambssadorFlg = res.result
						this.amBss = true
					}
				})
			},
			onWennuan() {
				uni.showLoading({
					mask: true,
					title: '加载中'
				})
				queryByStudent().then(res => {
					if (res.result.flg == 0) {
						// this.findByRecord()
						uni.navigateTo({
							url: '/pagesA/index/index'
						})
						uni.hideLoading()
					} else if (res.result.flg == 1) {
						setTimeout(() => {
							uni.hideLoading()
							uni.navigateTo({
								url: "/pagesA/zhuxue/zhuxue"
							})
						}, 1000)
					} else if (res.result.flg == 2) {
						uni.hideLoading()
						uni.navigateTo({
							url: "/pagesA/zhuxue/zhuxue"
						})
					} else if (res.result.flg == 3) {
						uni.hideLoading()
						uni.navigateTo({
							url: "/pagesA/zhuxue/zhuxue"
						})
					} else if (res.result.flg == 4) {
						uni.hideLoading()
						uni.navigateTo({
							url: "/pagesA/zhuxue/zhuxue"
						})
					}

				})
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
					if (res.code == 200) {
						this.isREs = false
						// this.$refs.AuditionLive.getAll()
						// this.$refs.AuditionCourse.getAll()
						// 根据专业查询直播中
						// let data = {
						// 	majorId: this.pageInfo.majorId
						// }
						// getLiveing(data).then(res => {
						// 	if (res.result.length > 0) {
						// 		this.liveing = res.result[0]
						// 		console.log(this.liveing, 1234)
						// 	} else {
						// 		this.liveing = null
						// 	}
						// })
						uni.hideLoading()
						uni.showToast({
							title: '解锁成功',
							icon: "none"
						})

					}
				})
			},
			onERnd(value) {
				this.unlock = value
				if (value.unlock.unlockType == 1) {
					this.isAss = true
					this.isREs = false
				} else if (value.unlock.unlockType == 0) {
					this.isREs = true
					this.isAss = false
				}
			},
			// toLiveing() {
			// 	const token = getToken()
			// 	console.log(1231)
			// 	if (!token) {
			// 		this.$emit('toLogin')
			// 	} else {

			// 		if (this.liveing) {
			// 			if (this.liveing.unlock.unlockType != 9 && this.liveing.unlock.isUnLock == 0) {
			// 				this.unlock = this.liveing
			// 				if (this.liveing.unlock.unlockType == 1) {
			// 					this.isAss = true
			// 					this.isREs = false
			// 					console.log(123)
			// 				} else if (this.liveing.unlock.unlockType == 0) {
			// 					this.isREs = true
			// 					this.isAss = false
			// 				}
			// 			} else {

			// 				console.log(this.liveing)
			// 				// 根据专业查询直播中
			// 				let data = {
			// 					majorId: this.pageInfo.majorId
			// 				}
			// 				getLiveing(data).then(res => {
			// 					if (res.result.length > 0) {
			// 						console.log(this.liveing, 89)
			// 						// if (this.liveing.pay == 1) {
			// 						uni.navigateTo({
			// 							url: '/pages/webView/webView?channel=' + this.liveing.channel +
			// 								'&videoId=' + this.liveing.id + '&liveCourseId=' + this.liveing
			// 								.courseid
			// 						})
			// 						// } else {
			// 						// 	uni.showToast({
			// 						// 		title: '您未购买此课程',
			// 						// 		icon: 'none'
			// 						// 	})
			// 						// }
			// 					} else {
			// 						this.liveing = null
			// 					}
			// 				})
			// 			}
			// 		}
			// 	}
			// },
			// 跳转至设置专业页面
			chooseMajor() {
				uni.navigateTo({
					url: "/pagesA/setUpMajor/setUpMajor",
				})
			},
			// Banner
			async BannerFun(majorId) {
				let data = {
					majorId: majorId,
					type:0,
				}
				const res = await getBanner(data);
				// this.titleLogin = getTitle()
				this.swiperList = res.result;
			},
			// Banner跳转
			bannerGoto(data) {
				let datas = JSON.stringify(data)
				uni.navigateTo({
					url: '/pagesA/nav/bannerInfo/bannerInfo?data=' + encodeURIComponent(datas)
				})
				// if (data.clickEvent == 3) {
				// 	uni.navigateTo({
				// 		url: "/pagesA/highEndCourse/highEndCourse?id=" + data.skipUrl,
				// 	});
				// } else if (data.clickEvent == 2) {
				// 	uni.navigateTo({
				// 		url: "/pagesA/curriculumDetail/index?id=" + data.skipUrl
				// 	});
				// }
			},
			// 热销课程列表
			async bestSellerCoursePageListFun() {
				let data = {
					majorId: this.pageInfo.majorId,
					pageNo: this.pageInfo.pageNo,
					pageSize: this.pageInfo.pageSize,
				}
				const res = await getBestSellerCoursePageList(data);
				this.bestSellerCourseList = res.result.records;
			},
			// 系列课程列表
			async seriesCoursePageListFun() {
				let data = {
					majorId: this.pageInfo.majorId,
					pageNo: this.pageInfo.pageNo,
					pageSize: this.pageInfo.pageSize,
				}
				const res = await getSeriesCoursePageList(data);
				this.seriesCourseList = res.result.records;
			},
			// 高端面授列表
			async faceCoursePageListFun() {
				let data = {
					majorId: this.pageInfo.majorId,
					pageNo: this.pageInfo.pageNo,
					pageSize: this.pageInfo.pageSize,
				}
				const res = await getFaceCoursePageList(data);
				this.faceCourseList = res.result.records;
			},
		},
	};
</script>

<style scoped lang="scss">
	.footer_tip2 {
		margin: 40rpx 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #C0C4CC;

		image {
			width: 25rpx;
			height: 25rpx;
			margin-right: 13rpx;
		}
	}

	.bg {
		background: #fafafa;
		padding-bottom: 180rpx;

	}

	.dasdasd2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;

	}

	.chucuno {
		position: absolute;
		top: 50%;
		margin-top: -150rpx;
		z-index: 99999;
		left: 50%;
		margin-left: -325rpx;
	}

	.top-image {
		width: 703rpx;
		height: 144rpx;
		margin: 28rpx auto;
	}

	.live-box {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 126rpx;
		height: 44rpx;
		border-radius: 20rpx;
		background: linear-gradient(90deg, #fd7a3f, #fa632b);
		font-size: 24rpx;
		color: #ffffff;

		image {
			width: 28rpx;
			height: 28rpx;
			margin-right: 6rpx;
		}
	}

	.bottom-image {
		width: 703rpx;
		height: 144rpx;
		margin: 28rpx auto 0;
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

	.remind-box {
		background: linear-gradient(90deg, #3bf0bb, #3b7cfe);
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

	.entrance {
		display: flex;
	}

	.entrance-left {
		width: 330rpx;
		height: 140rpx;
		background: url($fileBaseUrl + '/ykstatic/redhongse.png');
		background-size: 100%;
		padding-top: 20rpx;
		margin-left: 30rpx;
		margin-top: 30rpx;

		.entrance-left-top {
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #FFFFFF;
			margin-left: 19rpx;
		}

		.entrance-left-bottom {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			margin-top: 33rpx;
			margin-left: 19rpx;
		}
	}

	.entrance-right {
		width: 330rpx;
		height: 140rpx;
		background: url($fileBaseUrl + '/ykstatic/zise.png');
		background-size: 100%;
		padding-top: 20rpx;
		margin-left: 30rpx;
		margin-top: 30rpx;

		.entrance-left-top {
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #FFFFFF;
			margin-left: 19rpx;
		}

		.entrance-left-bottom {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			margin-top: 33rpx;
			margin-left: 19rpx;
		}
	}

	.nowLiveR {
		width: 140rpx;
		height: 140rpx;
		border-radius: 70rpx;
		overflow: hidden;
		position: fixed;
		bottom: 50rpx;
		right: 30rpx;
		box-shadow: 0px 0px 5px #999999;

		>image {
			width: 100%;
			height: 100%
		}

		view {
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
			background-image: url($fileBaseUrl + '/oss/playgif_1641260582788.gif');
			background-size: 100% 100%;
			position: absolute;
			top: calc(50% - 30rpx);
			left: calc(50% - 30rpx);
		}
	}

	.animationImg {

	}

	// .nowLiveBox {
	// 	width: 100%;
	// 	padding: 0 30rpx;
	// 	position: fixed;
	// 	bottom: 50rpx;
	// 	left: 0;
	// 	z-index: 999;
	// 	display: flex;
	// 	justify-content: flex-end;

	// 	.nowLive {
	// 		width: 100%;
	// 		height: 150rpx;
	// 		padding: 0 26rpx;
	// 		background-image: url($fileBaseUrl + '/oss/live1_1640660575927.png');
	// 		background-repeat: no-repeat;
	// 		background-size: 100% 100%;
	// 		border-radius: 70rpx;
	// 		display: flex;
	// 		align-items: center;
	// 		justify-content: space-between;
	// 		position: relative;
	// 		overflow: hidden;

	// 		.llll {
	// 			width: 30rpx;
	// 			height: 30rpx;
	// 			position: absolute;
	// 			top: 15rpx;
	// 			left: 90rpx;
	// 			z-index: 1000;
	// 		}

	// 		&>.rimg {
	// 			width: 126rpx;
	// 			height: 44rpx;
	// 		}

	// 		.left {
	// 			display: flex;
	// 			align-items: center;
	// 			flex: 1;
	// 			overflow: hidden;

	// 			&>.animationImg {
	// 				width: 100rpx;
	// 				height: 100rpx;
	// 				border-radius: 50rpx;
	// 				margin-right: 24rpx;
	// 			}

	// 			&>view {
	// 				flex: 1;
	// 				overflow: hidden;

	// 				&>text {
	// 					font-size: 28rpx;
	// 					font-family: PingFang SC;
	// 					font-weight: bold;
	// 					color: #ffffff;
	// 					overflow: hidden;
	// 					text-overflow: ellipsis;
	// 					white-space: nowrap;
	// 					display: block;
	// 				}

	// 				&>view {
	// 					padding-top: 24rpx;
	// 					font-size: 26rpx;
	// 					color: #ffffff;
	// 				}
	// 			}
	// 		}
	// 	}
	// }

	.major-doms {
		height: 80rpx;
		width: 100%;
		position: fixed;
		top: -1px;
		z-index: 1000;
	}

	.majordsd {
		height: 100rpx;
		background: #ffffff;
	}

	.majors1 {
		height: 99rpx;
		width: 100%;
	}

	.majors2 {
		height: 178rpx;
		width: 100%;
	}

	.major-box {
		width: 100%;
		display: flex;
		align-items: center;
		height: 80rpx;
		padding: 0rpx 30rpx 5rpx;
		background: #ffffff;

		.logo-txt {
			font-size: 36rpx;
			font-weight: bold;
			padding-right: 36rpx;
			// width: 190rpx;
			white-space: nowrap;
		}
	}

	.swiper-box {
		background: #ffffff;


		swiper-item {
			height: 400rpx;
		}

		.swiper-item-box {
			width: 710rpx;
			height: 300rpx;
			margin: 0 auto;

			.swiper-img {
				width: 710rpx;
				height: 300rpx;
				border-radius: 30rpx;
			}
		}
	}
</style>