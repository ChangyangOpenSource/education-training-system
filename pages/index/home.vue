<template>
	<view class="bg">
		<!-- 小程序过期禁止使用弹窗 -- begin  -->
		<StopCan v-if="validityFlg == 0"></StopCan>
		<!-- 小程序过期禁止使用弹窗 -- end  -->
		<!-- 课程 -- begin -->
		<Home v-show='tabbarIndex == 1' :thatPage="thatPage" ref="Home" @toLogin="toLogin"></Home>
		<!-- 课程 -- end -->
		<!-- 学习 -- begin -->
		<Learn v-show='tabbarIndex == 2' ref="Learn" @toLogin="toLogin"></Learn>
		<!-- 学习 -- end -->
		<!-- 题库 -- begin -->
		<Question v-show='tabbarIndex == 3' ref="Question" @toLogin="toLogin"></Question>
		<!-- 题库 -- end -->
		<!-- 我的 -- begin -->
		<Mine v-show='tabbarIndex == 4' ref="Mines" :userInfo="userInfo" :myProgram="myProgram"
			:questionState="questionState" :courseState="courseState" @toLogin="toLogin"></Mine>
		<!-- 我的 -- end -->
		<!-- tabbar -- begin -->
		<Tabbar class="heighe" :index="tabbarIndex" @changeTabbarIndex="changeTabbarIndex"></Tabbar>
		<!-- tabbar -- end -->

		<view class="bottom-fengxiang" v-if="isAss==true">
			<view class="bottom-fengxiang-top"> 分享可免费解锁 </view>
			<view class="bottom-fengxiang-center"> <button class="fengxiang-center-left" open-type="share">
					<image :src="imageUrl + '/ykstatic/wxchu.png'" mode=""></image>
					<view class="center-right-text"> 微信好友 </view>
				</button>
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
		<!-- 登陆弹窗 -- begin -->
		<view v-show='loginAss' class="back-tankuang">
			<login class="loginw" @guanbi='guanbi' />
		</view>
		<!-- 登陆弹窗 -- end -->
	</view>
</template>


<script>
	import StopCan from '@/components/stopCan.vue'
	import Home from '@/pages/index/index.vue'
	import Learn from '@/pages/learn/index.vue'
	import Question from '@/pages/indexs/index.vue'
	import Mine from '@/pages/mine/index.vue'
	import {
		findDistributionl, // 获取权限和开课模式
	} from '@/api/homeAudition.js'
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
		getTitle,
		setTouristToken,
		getTouristToken,
		getUserInfo,
		removeUserInfo,
		removeToken,
		removeTouristToken,
	} from "@/common/util/index.js";
	import {
		wxLogin,
		bindinMajor,
		loginRecord,
		touristLogin
	} from "@/api/login.js";
	import {
		getMajor
	} from "@/api/professionalChoice.js";
	import {
		componentInfoBrief,
		getBrief
	} from '@/api/mine/about.js'
	import {
		userInfo,
	} from '@/api/index/index.js'
	import baseConfig from '../../baseConfig'
	export default {
		name: "home",
		props: {
			cur: String,
		},
		components: {
			StopCan,
			Home,
			Question,
			Learn,
			Mine,
		},
		data() {
			return {
				refresh: true,
				refresh1: true,
				refresh2: true,
				refresh3: true,
				setUpMajorAss: false,
				isDisplayPrice: '',
				validityFlg: 1,
				thatPage: {
					options: {

					},
					route: ''
				},
				tabbarIndex: uni.getStorageSync('tabbarIndex'),
				loginAss: getApp().globalData.loginAss,
				imageUrl: getApp().globalData.imageUrl,
				isAss: false,
				isREs: false,
				unlock: {},
				code: '',
				yaoqing: '',
				pageInfo: {
					majorId: 1,
				},
				liveing: null,
				userInfo: {}, // 当前登录用户的用户信息
				myProgram: false, // 当前appid是否是自己的
				questionState: false, // 题库权限
				courseState: false, // 课程权限
			};
		},
		watch: {
			tabbarIndex(newValue, oldValue) {
				this.$nextTick(() => {
					this.tabbarIndex = newValue
				})
			}
		},
		onShow() {
			if (this.setUpMajorAss) {
				this.getDataByTabbarIndex()
				this.setUpMajorAss = false
			}
		},
		onLoad() {
			touristLogin().then((res) => {
				if (res.code == 200) {
					// 设立游客临时登录token
					setTouristToken(res.result)
				}
			})

			this.get_componentInfoBrief()
			// #ifdef H5
			let code = this.getQueryVariable("code");
			let inviteCode = "";
			let distributorId = "";
			if (this.getQueryVariable("id")) {
				distributorId = this.getQueryVariable("id");
				uni.setStorageSync("distributorId", distributorId);
			}
			if (this.getQueryVariable("inviteCode")) {
				inviteCode = this.getQueryVariable("inviteCode");
				uni.setStorageSync("inviteCode", inviteCode);
			}

			if (code && !getToken()) {
				this.login(code, inviteCode);
				return
			}
			//#endif



			if (!uni.getStorageSync('tabbarIndex')) {
				this.tabber('tabbarIndex')
			} else {
				this.tabber()
			}
			var aaa = getCurrentPages()
			console.log(aaa, '首页-接受值')
			var thatPage = aaa[aaa.length - 1];
			if (thatPage.options.tabbarIndex) {
				if (thatPage.options.tabbarIndex == '3') {
					this.changeTabbarIndex(3)
				} else {
					this.tabbarIndex = thatPage.options.tabbarIndex
				}
			}

			this.thatPage.options = thatPage.options;
			this.thatPage.route = thatPage.route;

			var sceneCode = wx.getLaunchOptionsSync().scene; //获取场景值，判断是用哪种方式进入的小程序
			if (thatPage.route == 'pages/home/home' && thatPage.options.code) {
				sceneCode = 1007
			}
			let sceneList = [1007, 1008, 1044, 1036, 1047, 1048]
			if (sceneList.includes(sceneCode)) { //从分享进入
				if (getStudentId()) {
					if (getStudentId().studentId) {
						uni.navigateTo({
							url: "/pagesA/curriculumDetail/index?id=" + getStudentId().id +
								'&studentId=' +
								getStudentId().studentId
						})
					} else {
						uni.navigateTo({
							url: "/pagesA/curriculumDetail/index?id=" + getStudentId().id
						})
					}
				}
			}
		},
		onPullDownRefresh() {
			/**
			 * 下拉刷新当前tabbar页
			 */
			this.getDataByTabbarIndex()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		// 分享给好友
		onShareAppMessage(options) {
			console.log(options)
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
		methods: {
			get_componentInfoBrief() {
				componentInfoBrief().then((res) => {
					if (res.code == 200) {
						uni.setStorageSync('privacyAgreement', res.result.privacyAgreement)
						uni.setStorageSync('registrationAgreement', res.result.registrationAgreement)
					}

				})
			},
			getQueryVariable(variable) {
				var query = window.location.search.substring(1);
				var vars = query.split("&");
				for (var i = 0; i < vars.length; i++) {
					var pair = vars[i].split("=");
					if (pair[0] == variable) {
						return pair[1];
					}
				}
				return false;
			},
			tabber(type) {
				findDistributionl().then((res) => {
					if (res.code == 200) {
						// 小程序课程价格是否显示,false不显示价格
						let isDisplayPrice = res.result.isDisplayPrice
						if (isDisplayPrice === true || isDisplayPrice === false) {
							// console.log(isDisplayPrice, '存储是否显示价格')
							uni.setStorageSync('isDisplayPrice', isDisplayPrice)
							this.isDisplayPrice = isDisplayPrice
						}
						// 小程序是否能继续使用，0不能使用
						let validityFlg = res.result.validityFlg
						if (validityFlg === 0 || validityFlg === 1) {
							// console.log(validityFlg, '存储小程序是否能使用，0不能，1能')
							uni.setStorageSync('validityFlg', validityFlg)
							this.validityFlg = validityFlg
						}
						// 开课模式
						if (res.result.courseControl) {
							// courseControl: "open" // open二维码开课
							uni.setStorageSync('courseControl', res.result.courseControl)
						}
						// 机构权限
						if (type == 'tabbarIndex') {
							let authority = res.result.authority
							// authority: "question,course" // 课程开，题库开
							if (authority) {
								if (authority.indexOf('course') != -1 && authority.indexOf('question') != -
									1) { //课程和题库都开通
									this.tabbarIndex = 1
									this.getDataByTabbarIndex()
									uni.setStorageSync('courseState', true)
									uni.setStorageSync('tabbarIndex', 1) // 根据权限设置tabbarIndex默认值
								} else if (authority.indexOf('question') != -1) { //题库开通
									this.tabbarIndex = 3
									this.getDataByTabbarIndex()
									// this.$refs.Question.refresh = true
									uni.setStorageSync('tabbarIndex', 3) // 根据权限设置tabbarIndex默认值
									uni.setStorageSync('questionState', true)
								} else if (authority.indexOf('course') != -1) { //课程开通
									this.tabbarIndex = 1
									this.getDataByTabbarIndex()
									uni.setStorageSync('courseState', true)
									uni.setStorageSync('tabbarIndex', 1) // 根据权限设置tabbarIndex默认值
								}
							}
						} else {
							this.$refs.Home.drawing()
						}
					}
				})
			},
			/**
			 * 根据当前tabbarIndex查询数据
			 */
			getDataByTabbarIndex() {
				if (this.tabbarIndex == 1) {
					// 课程
					this.$refs.Home.drawing()
				} else if (this.tabbarIndex == 2) {
					// 学习
					this.$refs.Learn.onLodsw()
				} else if (this.tabbarIndex == 3) {
					// 题库
					this.$refs.Question.update()
				}
				if (getToken()) {
					// 检查token是否过期
					userInfo().then((res) => {
						if(res.success){
							setUserInfo(res.result)
							this.userInfo = getUserInfo()
						}
					}).catch(err => {
						if (err.data.code == 401) {
							this.userInfo = {}
							removeUserInfo()
							removeToken()
							removeTouristToken()
						}
					})
				} else {
					this.userInfo = {}
				}
				//#ifdef H5
				if (baseConfig.h5Appid != baseConfig.myself_vx_h5_appid) {
					this.myProgram = false
				}
				//#endif
				// 判断是不是第三方小程序
				//#ifdef MP-WEIXIN
				if (uni.getAccountInfoSync().miniProgram.appId != baseConfig.myself_vx_mp_appid) {
					this.myProgram = false
				}
				//#endif
				this.questionState = uni.getStorageSync('questionState') // 小程序题库权限
				this.courseState = uni.getStorageSync('courseState') // 小程序课程权限
			},
			// tabbar 切换
			changeTabbarIndex(val) {
				this.tabbarIndex = val;
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 100
				});
				if (this.refresh) {
					this.getDataByTabbarIndex()
					this.refresh = false
				} else if (this.refresh1) {
					this.getDataByTabbarIndex()
					this.refresh1 = false
				} else if (this.refresh2) {
					this.getDataByTabbarIndex()
					this.refresh2 = false
				} else if (this.refresh3) {
					this.getDataByTabbarIndex()
					this.refresh3 = false
				}
			},
			// 登陆弹窗关闭事件
			guanbi(value) {
				this.loginAss = value
			},
			toLogin() {
				console.log('触发登录toLogin');
				this.loginAss = true
			},
			async login(data) {
				const val = await wxLogin({
					code: data, //用户微信CODE
				});
				if (val.result.userInfo) {
					this.loginAss = false
					if (val.result.userInfo.majorId) {
						const res = await getMajor({
							type: 0, //  0首页，1题库
						});
						res.result.forEach((rest) => {
							rest.wdResourcesMajorList.forEach((item) => {
								if (item.id == val.result.userInfo.majorId) {
									setMajorInfo(item)
								}
							})
						})
					}
				}
				if (val.result.token) {
					setToken(val.result.token);
					setUserInfo(val.result.userInfo);
					loginRecord({
						type: 3
					}).then(res => {}).catch(err => {})
				} else {
					uni.setStorageSync("unionids", val.result.unionId);
					uni.setStorageSync("openids", val.result.openId);
					uni.navigateTo({
						url: "/pagesA/phone/phone",
					});
				}
			},
			fuzhi() {
				uni.setClipboardData({
					data: this.unlock.unlock.teacherWx,
					success: function() {}
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
					if (res.code == 200) {
						this.isREs = false
						// this.$refs.AuditionLive.getAll()
						this.$refs.AuditionCourse.getAll()
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
		},
	};
</script>

<style scoped lang="scss">
	.heighe {
		height: 150rpx;
	}

	.bg {
		background: #fafafa;
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