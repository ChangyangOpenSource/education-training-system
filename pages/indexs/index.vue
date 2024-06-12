<template>
	<view class="bg">
		<view class="top_nav">
			<view class="top_nav_text">
				<view class="top_nav_text_position"> 题库 </view>
				<view class="" style="display: flex;align-items: center;" @click="onSetUpMajor">
					<view class="major-box2"> {{majorName || '未选择专业'}} </view>
					<image class="majorimage" :src="imageUrl+'/xing/right.png'" mode=""></image>
				</view>
			</view>
		</view>
		<view class="header">
			<!-- 轮播图 -->
			<view class="banner" v-if="bannerList && bannerList.length > 0">
				<swiper circular indicator-dots="true" autoplay="true" interval="5000" indicator-active-color="#F1592A"
					indicator-color="#E5E5E5" duration="2000" style="width:100%;hiehgt:100%;">
					<swiper-item v-for="(item,index) in bannerList" :key="index" @click="go_bannerInfo(item)">
						<image class='imgswiper' :src="item.pcImage"  />
					</swiper-item>
				</swiper>
			</view>
			<!-- 智能组题、历年真题、模拟机考导航 -->
			<view class="flex">
				<view class="zhineng" @click="go_Page_2(routes.aiQuestionGroup)">
					<view class="text"> 智能组题 </view>
					<view class="text2"> 系统组题，模拟练习 </view>
				</view>
				<view class="linina" @click="go_Page_2(routes.lnzt)">
					<view class="text"> 历年甄题 </view>
					<view class="text2"> 精选甄题，名师解析 </view>
				</view>
				<!-- <view class="moni" @click="go_Page_2(routes.mokao)">
					<view class="text"> 模拟机考 </view>
					<view class="text2"> 还原模考，知晓薄弱 </view>
				</view> -->
			</view>
			<!-- 错题、收藏、笔记、统计报告导航 -->
			<view class="nav">
				<view class="nav_item" v-for="(item,index) in nav_list" :key="index" @click="go_page(item.route)">
					<view class="imgbox"> <image class="" :src="item.pic"  /> </view>
					<view class="text3"> {{item.name}} </view>
				</view>
			</view>
		</view>

		<view class="list_box">
			<view class="list_nav">
				<view class="list_nav_item"> 题库 </view>
			</view>
			<!-- 章节练习列表end -->
			<view class="" v-if="zjlx_list.length > 0">
				<view class="" v-for="(item,index) in zjlx_list" :key="index">
					<view class="zjlx_dad_list" @tap="get_zjlx_listById(index)">
						<view class="list_title" v-if="item.lastSubject == 1">
							<view class="viewimg">
								<image class='list-img' :src="imageUrl+'/image/xiangxia.png'"  />
							</view>
							<view class="on-rouw">
								{{item.templateName}}
							</view>
						</view>
						<view class="list_title" v-else>
							<view class="viewimg">
								<image class='list-img' :src="imageUrl+'/image/dakai.png'"  />
							</view>
							<view class="on-rouw">
								{{item.templateName}}
							</view>
						</view>
						<view class="list_number">
							<text v-if="item.doSubjectNumber == item.subjectNumber"
								style="color:#FF5B00">{{item.doSubjectNumber}}</text>
							<text v-else-if="item.doSubjectNumber > 0 && item.doSubjectNumber < item.subjectNumber"
								style="color:rgba(149, 162, 163, 1)">{{item.doSubjectNumber}}</text>
							<text v-else>{{item.doSubjectNumber}}</text>
							/
							<text v-if="item.doSubjectNumber == item.subjectNumber"
								style="color:rgba(149, 162, 163, 1)">{{item.subjectNumber}}</text>
							<text v-else>{{item.subjectNumber}}</text>
						</view>
					</view>
					<view :class="item.lastSubject == 1  ? 'content_open' : 'content_close'">
						<view :class="item.lastSubject == 1  ? 'ziJie_open' : 'ziJie_close'"
							v-for="(itemA,indexA) in templateArr" :key="indexA" @click="onParsing(itemA,indexA,index)">
							<view class="ziJie-flex">
								<view class="lock" v-if="viewFlg == 0 && (indexA!=0||index!=0)">
									<image :src="imageUrl+'/xing/lock.png'"  />
								</view>
								<!-- <view class="lock" v-if="loginState == false" @click.native.stop="loginTip(1)">
									<image :src="imageUrl+'/icon/lock.png'"  />
								</view> -->
								<view class="ziJie-flex2">
									<view class="">
										{{indexA<'10'?'0'+(indexA*1+1):indexA*1+1}}
										<text style="opacity: 0;">0</text>
									</view>
									<view class="on-rouw">
										{{itemA.templateName}}
									</view>
									<view class="answerSheetbox_content_doing" v-if="itemA.lastSubject == 1 ">
										继续做 </view>
								</view>
								<view class="list_numbe2r">
									<text v-if="itemA.doSubjectNumber == itemA.subjectNumber"
										style="color:rgba(149, 162, 163, 1)">{{itemA.doSubjectNumber}}</text>
									<text
										v-else-if="itemA.doSubjectNumber > 0 && itemA.doSubjectNumber < itemA.subjectNumber"
										style="color:#FF5B00">{{itemA.doSubjectNumber}}</text>
									<text v-else>{{itemA.doSubjectNumber}}</text>
									/
									<text v-if="itemA.doSubjectNumber == itemA.subjectNumber"
										style="color:rgba(149, 162, 163, 1)">{{itemA.subjectNumber}}</text>
									<text v-else>{{itemA.subjectNumber}}</text>
								</view>
							</view>

						</view>
					</view>
				</view>
			</view>
			<view class="" v-else>
				<image :src="imageUrl+'/icon/question_nodata.png'"  class="nodata_tip" />
			</view>
		</view>

		<view class="footer_tip2">
			<image :src="imageUrl + '/xing/cy_logo_grey.png'"  />洛阳畅阳网络科技有限公司提供技术支持
		</view>
		<!-- open，扫码开课模式弹窗 op -->
		<div class="popup-buy" v-if="popupBuyState == true">
			<div class="popup-buy-bg"></div>
			<div class="popup-buy-img">
				<!-- <div class="title">该课程暂未解锁</div> -->
				<div class="qrcode">
					<image :show-menu-by-longpress="true" :src="popupBuyInfo.qrCode"></image>
				</div>
				<div class="text"> 请长按识别二维码联系老师开课 </div>
				<image :src="imageUrl +'/home/uni15.png'"  class="close-icon" @click="onErwm()" />
			</div>
		</div>
	</view>
</template>


<script>
	import {
		userInfo,
	} from '@/api/index/index.js'
	import {
		practiceAgain,
		newList
	} from '@/api/professionalChoice.js'
	import {
		getBanner
	} from '@/api/homeAudition.js'
	import {
		get_zjlx_list,
		get_zjlx_listById,
		touristLogin
	} from '@/api/index/zjlx.js'
	import {
		findBySmartList
	} from '@/api/cySubjectSmart.js'
	import {
		componentInfoBrief
	} from '@/api/mine/about.js'
	import {
		setMajorInfo2,
		getMajorInfo2,
		getToken,
		setMajorInfo,
		getMajorInfo,
		getUserInfo,
		setUserInfo,
		setlistById,
		getlistById,
		setchapter,
		getchapter,
		setToken,
		setTouristToken,
		getTouristToken,
	} from '@/common/util/index.js'
	import {
		checkLoginState
	} from '@/api/login2.js'
	import {
		getMajor,
	} from "@/api/professionalChoice.js";
	import {
		nextTick
	} from "vue"
	export default {
		data() {
			return {
				popupBuyInfo: {}, // 开课弹窗返回信息
				popupBuyState: false,
				refresh: false,
				type: false,
				doed: false, //是否做过
				viewFlg: 0,
				viewFlgTip: '激活题库即可体验',
				imageUrl: getApp().globalData.imageUrl,
				defult_zjlx: true, // zjlx列表默认状态，【只有刚进入小程序时为true】，点击任意章节练习一级列表内容转为false
				loginState: false, // 登陆状态【默认false未登录】，检测token存在变为true，loginState为false时章节练习二级列表带【锁】
				majorName: '', // 左上角专业名称
				pageNo: 1,
				bannerList: [], // 轮播列表
				zjlx_list: [], // 章节练习一级列表
				templateArr: [], // 章节练习二级列表
				majorArray: [], // 专业列表
				nav_list: [{ // 我的错题、我的笔记、统计报告、统计报告
						pic: getApp().globalData.imageUrl + "/questionBank/static/xing/cuoti.png",
						name: "我的错题",
						route: "/pagesA/nav/cuoti/cuoti"
					},
					{
						pic: getApp().globalData.imageUrl + "/questionBank/static/xing/biji.png",
						name: "我的笔记",
						route: "/pagesA/nav/biji/biji"
					},
					{
						pic: getApp().globalData.imageUrl + "/questionBank/static/xing/shoucang.png",
						name: "我的收藏",
						route: "/pagesA/nav/shoucang/shoucang"
					},
					{
						pic: getApp().globalData.imageUrl + "/questionBank/static/xing/tongji.png",
						name: "统计报告",
						route: "/pagesA/nav/statisticalReport/statisticalReport"
					},
				],
				routes: { // 智能组题、历年真题、模拟考试
					aiQuestionGroup: '/pagesA/nav/aiQuestionGroup/aiQuestionGroup',
					lnzt: '/pagesA/nav/lnzt/lnzt',
					mokao: '/pagesA/nav/mokao/mokao',
				},
			}
		},
		mounted() {},
		methods: {
			onErwm() {
				this.popupBuyState = false
			},
			update() {
				console.log('切换至题库页')
				if (getToken()) {
					this.loginState = true
					userInfo().then((res) => {
						if (res.code == 200 && res.result) {
							setUserInfo(res.result)
							if (res.result.majorIdStr.indexOf(getMajorInfo2().id) == -1) {
								this.viewFlg = 0
							} else {
								this.viewFlg = 1
							}
						}
					})
				}
				if (!getMajorInfo2()) {
					// 未选择题库专业跳转到题库选专业页
					this.getAll()

				} else {
					// 已经选择题库专业，获取章节练习一级列表
					this.majorName = getMajorInfo2().majorName
					this.get_zjlx_list()
				}
				this.getBannerList()
				this.onSHOWS()

				if (this.type) {
					console.log(12333);
					if (getToken()) {
						this.loginState = true
						userInfo().then((res) => {
							if (res.code == 200 && res.result) {
								setUserInfo(res.result)
								if (res.result.majorIdStr.indexOf(getMajorInfo2().id) == -1) {
									this.viewFlg = 0
								} else {
									this.viewFlg = 1
								}

							}
						})
					}
					this.get_zjlx_list()
				}
			},
			// 获取专业科目列表
			async getAll() {
				const res = await getMajor({
					type: 1, //  0首页，1题库
				});
				setMajorInfo2(res.result[0].wdResourcesMajorList[0])
				this.majorName = res.result[0].wdResourcesMajorList[0].majorName
				this.get_zjlx_list()
			},
			onParsing(value, one, two) {
				if (this.viewFlg == 0 && one == 0 && two == 0) {
					// 是第一个节
					if (getToken()) {
						// 用户登录
						this.userGoAnswerSheet(value)
					} else if (getTouristToken()) {
						// 游客登陆
						setlistById(value)
						uni.navigateTo({
							url: '/pagesB/answerSheet/answerSheet_tourist?sourceType=1'
						})
					}
				} else {
					// 不是第一个节
					if (getToken()) {
						if (this.viewFlg == 0 && (one != 0 || two != 0)) {
							// 联系相关人员开权限弹窗
							this.popupBuyState = true
						} else {
							// 用户登录
							this.userGoAnswerSheet(value)
						}
					} else {
						this.loginTip(1)
					}
				}
			},
			userGoAnswerSheet(value) {
				// 用户登录后去答题卡，不是游客
				checkLoginState().then((res) => {
					setlistById(value)
					uni.navigateTo({
						url: '/pagesB/answerSheet/answerSheet?sourceType=1'
					})
				}).catch((err) => {
					// 登录失效
					if (err.data.code == 401 && err.data.message == "账号在其他设备登录") {
						this.loginTip(2)
					}
				})
			},
			onSHOWS() {
				componentInfoBrief().then((res) => {
					if (res.code == 200) {
						this.popupBuyInfo = res.result;
					}
				})
			},
			getBannerList() {
				getBanner({
					type: 1
				}).then((res) => {
					this.bannerList = res.result
				})
			},
			get_zjlx_list() {
				let reqdata = {
					majorId: getMajorInfo2().id,
				}
				get_zjlx_list(reqdata).then((res) => {
					this.zjlx_list = res.result
					this.zjlx_list.forEach((res, index) => {
						res.isAss = false
						if (res.lastSubject == 1) {
							this.get_zjlx_listById(index)
						}
					})
				})
			},
			get_zjlx_listById(index) {
				if (this.zjlx_list[index].lastSubject == 1 && this.defult_zjlx == true) {
					get_zjlx_listById({
						majorId: getMajorInfo2().id,
						id: this.zjlx_list[index].id,
						templateId: this.zjlx_list[index].templateId,
					}).then((res) => {
						this.templateArr = res.result
						this.zjlx_list[index].isAss = !this.zjlx_list[index].isAss
						this.zjlx_list.forEach((itemA, indexA) => {
							itemA.lastSubject = 0
						})
						this.zjlx_list[index].lastSubject = 1
						setchapter(this.zjlx_list[index])
					})
					this.defult_zjlx = false
				} else if (this.zjlx_list[index].lastSubject == 1) {
					this.zjlx_list[index].lastSubject = 0
				} else if (this.zjlx_list[index].lastSubject == 0) {
					get_zjlx_listById({
						majorId: getMajorInfo2().id,
						id: this.zjlx_list[index].id,
						templateId: this.zjlx_list[index].templateId,
					}).then((res) => {
						this.templateArr = res.result
						this.zjlx_list[index].isAss = !this.zjlx_list[index].isAss
						this.zjlx_list.forEach((itemA, indexA) => {
							itemA.lastSubject = 0
						})
						this.zjlx_list[index].lastSubject = 1
						setchapter(this.zjlx_list[index])
					})
				}
			},
			go_page(route) {
				if (!getToken()) {
					// 没token
					this.loginTip(1)
				} else {
					if (this.viewFlg == 0) {
						uni.showToast({
							title: this.viewFlgTip,
							icon: 'none'
						})
					} else {
						checkLoginState().then((res) => {
							uni.navigateTo({
								url: route
							})
						}).catch((err) => {
							// 登录失效
							if (err.data.code == 401 && err.data.message == "账号在其他设备登录") {
								this.loginTip(2)
							}
						})
					}
				}
			},
			go_Page_2(route) {
				uni.navigateTo({
					url: route
				})
			},
			onSetUpMajor() {
				// 前往专业选择页
				uni.navigateTo({
					url: "/pagesA/setUpMajor/setUpMajor2",
				})
			},
			go_bannerInfo(item) {
				// 带参数前往轮播图详情页
				let data = JSON.stringify(item)
				uni.navigateTo({
					url: '/pagesA/nav/bannerInfo/bannerInfo?data=' + encodeURIComponent(data)
				})
			},
			goMinePage() {
				// 自定义底部导航前往【我的】页
				uni.navigateTo({
					url: '/pages/mine/mine'
				})
			},
			loginTip(type) {
				// 登陆提示
				this.$emit('toLogin')
			},
		}
	}
</script>

<style lang="scss" scoped>
	.footer_tip2 {
		margin: 20rpx 0;
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

	.popup-buy {
		.popup-buy-bg {
			position: fixed;
			z-index: 990; //99999
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: rgba(61, 61, 61, 0.7);
		}

		.popup-buy-img {
			position: fixed;
			z-index: 991;
			left: 50%;
			top: 40%;
			transform: translate(-50%, -50%);
			width: 580rpx;
			height: 647rpx;
			// background: #ccc;
			background-image: url($fileBaseUrl + '/home/uni14.png');
			// background-image: url($fileBaseUrl + '/home/uni21.png');
			background-size: contain;
			background-position: center;
			background-repeat: no-repeat;

			.close-icon {
				position: absolute;
				bottom: -80rpx;
				left: 50%;
				transform: translateX(-50%);
				width: 55rpx;
				height: 55rpx;
			}

			.title {
				margin-top: 208rpx;
				text-align: center;
				font-size: 34rpx;
				font-family: PingFang SC;
				font-weight: 800;
				color: #FFFFFF;
				text-shadow: 0px 0px 25rpx rgba(159, 82, 47, 0.22);
			}

			.qrcode {
				margin: 260rpx auto 0;
				width: 230rpx;
				height: 230rpx;
				background: #FFFFFF;
				border-radius: 10rpx;

				image {
					width: 100%;
					height: 100%;
				}

				image {
					width: 100%;
					height: 100%;
				}
			}

			.text {
				margin-top: 45rpx;
				text-align: center;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			}
		}
	}

	.nodata_tip {
		display: block;
		margin: 0 auto;
		width: 600rpx;
		height: 600rpx;
		// position: fixed;
		// top:50%;
		// left:50%;
		// transform: translate(-50%,-50%);
	}

	.zjlx_dad_list {
		display: flex;
		justify-content: space-between;
		padding: 30rpx 0;
	}

	.answerSheetbox_content_doing {
		margin-left: 30rpx;
		height: 35rpx;
		line-height: 35rpx;
		width: 99rpx;
		text-align: center;
		background-image: url($fileBaseUrl + '/icon/doing.png');
		background-size: cover;
		font-size: 22rpx;
		font-family: PingFang SC;
		font-weight: 500;
		white-space: nowrap;
		color: #FFFFFF;
	}

	.ziJie-flex2 {
		display: flex;
		align-items: center;
		font-size: 26rpx;
		font-weight: 500;
		color: #666666;
	}

	.list_numbe2r {
		font-size: 28rpx;
		font-family: Bahnschrift;
		font-weight: normal;
		color: #95A2A3;
	}

	.ziJie-flex {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
	}

	.ziJie_open {
		box-sizing: border-box;
		// padding: 0 40rpx;
		padding: 40rpx 0;
		padding-left: 46rpx;
		padding-right: 42rpx;
		// height: 90rpx;

		width: 100%;
		display: flex;
		align-items: center;
		background: #F8F8F8;
		// border-radius: 20rpx;
		transition: all 0.5s cubic-bezier(0.25, 1.0, 0.25, 1.0);
	}

	.ziJie_close {
		box-sizing: border-box;
		padding: 0 40rpx;
		height: 0;
		opacity: 0;
		width: 100%;
		display: flex;
		align-items: center;
		background: #F8F8F8;
		border-radius: 20rpx;
		transition: all 0.5s cubic-bezier(0.25, 1.0, 0.25, 1.0);
	}

	.flex {
		display: flex;
		justify-content: space-between;
		margin-bottom: 30rpx;
	}

	.text {
		font-size: 30rpx;
		font-weight: bold;
		color: #FFFFFF;
		margin-top: 15rpx;
		margin-left: 19rpx;
		margin-bottom: 15rpx;
	}

	.text2 {
		font-size: 20rpx;
		font-weight: 500;
		color: #FFFFFF;
		margin-left: 19rpx;
	}

	.zhineng {
		width: 330rpx;
		height: 122rpx;
		background: url($fileBaseUrl + '/xing/combination.png') no-repeat;
		background-size: 100%;
	}

	.linina {
		width: 330rpx;
		height: 122rpx;
		background: url($fileBaseUrl + '/xing/education.png') no-repeat;
		background-size: 100%;
		// margin: 0 19rpx;
	}

	.moni {
		width: 217rpx;
		height: 120rpx;
		background: url($fileBaseUrl + '/xing/thetest.png') no-repeat;
		background-size: 100%;
	}

	.bg {
		width: 100%;
		height: auto;
		// min-height: 100%;
		// padding-bottom: 100rpx;
		background-color: #fafafa;
		overflow: hidden;
		padding-bottom: 180rpx;
	}

	.imgswiper {
		width: 691rpx;
		// height: 220rpx;
		height: 100%;
	}

	.lock {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		image {
			position: absolute;
			right: -32rpx;
			top: 3rpx;
			width: 30rpx;
			height: 30rpx;
		}
	}

	.top_nav {
		position: fixed;
		z-index: 10;
		left: 0;
		top: 0;
		width: 100%;
		background-color: white;
		display: flex;
	}

	.top_nav_title {
		margin-top: 90rpx;
		margin-bottom: 30rpx;
		margin-left: 30rpx;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
	}

	.major-box2 {
		min-height: 40rpx;
		background-color: RGBA(255, 93, 3, 1);
		color: #fff;
		border-radius: 10rpx 0 0rpx 10rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
		display: flex;
		align-items: center;
	}

	.majorimage {
		width: 47rpx;
		height: 40rpx;
	}

	.top_nav_text {
		margin-top: 105rpx;
		margin-bottom: 30rpx;
		margin-left: 30rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #132B2E;
		display: flex;
		align-items: center;

		.top_nav_text_position {


			font-size: 36rpx;
			font-weight: bold;
			padding-right: 36rpx;
			white-space: nowrap;

			image {
				display: inline-block;
				margin-left: 17rpx;
				width: 25rpx;
				height: 25rpx;
			}
		}

	}

	.bottom_nav_box {
		display: flex;
		position: fixed;
		z-index: 10;
		bottom: 0;
		left: 0;
		height: 100rpx;
		width: 100vw;
		box-shadow: 0 21rpx 47rpx 4rpx rgba(158, 155, 155, 0.1400);
		border-radius: 10rpx 10rpx 0 0;
		font-size: 20rpx;
		font-family: PingFang SC;
		font-weight: bold;
		background: #FFFFFF;

		.bottom_nav_box_1 {
			padding-top: 15rpx;
			margin-left: 220rpx;
			color: #0191A0;

			image {
				width: 40rpx;
				height: 40rpx;
			}
		}

		.bottom_nav_box_2 {
			padding-top: 15rpx;
			margin-left: 230rpx;
			color: #4F5C5E;

			image {
				width: 40rpx;
				height: 40rpx;
			}
		}
	}

	.login_div_bg {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		background-color: #969696;
	}

	.classify_box {
		padding-top: 40rpx;
	}

	.classify_box_title {
		display: flex;
		align-items: center;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #132B2E;

		image {
			display: inline-block;
			margin-right: 12rpx;
			width: 30rpx;
			height: 30rpx;
		}
	}

	.classify_box_content {
		display: flex;
		flex-wrap: wrap;

		:first-child {
			margin-left: 0 !important;
		}

		:nth-child(5) {
			margin-left: 0 !important;
		}

		:nth-child(9) {
			margin-left: 0 !important;
		}

		.classify_box_content_item {
			margin-top: 25rpx;
			margin-left: 54rpx;
			height: 50rpx;
			width: 130rpx;
			text-align: center;
			line-height: 50rpx;
			background: rgba(246, 246, 246, 0.9900);
			border-radius: 6rpx;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #95A2A3;
		}
	}

	.classify_submit_btn {
		margin-top: 80rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		background: #0191A0;
		border-radius: 10rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}

	.header {
		margin-top: 200rpx;
		padding: 0 30rpx 30rpx 30rpx;
		overflow: hidden;
	}

	.banner {
		margin-bottom: 28rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.nav {
		display: flex;
		justify-content: space-between;
		background: #fff;
		padding-top: 13rpx;
		padding-bottom: 27rpx;
	}

	.nav_item {
		display: flex;
		flex-direction: column;
		align-items: center;

		.imgbox {

			border-radius: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 144rpx;
				height: 144rpx;
			}
		}

		.text3 {
			font-size: 24rpx;
			font-weight: 500;
			color: #666666;
		}
	}

	.hr {
		height: 16rpx;
		background-color: #eef3f4;
	}

	.list_box {
		height: auto;
		margin: 0 30rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		padding: 0 30rpx 30rpx;
		margin-bottom: 85rpx;
	}

	.list_nav {
		display: flex;
		justify-content: space-between;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #4F5C5E;
	}

	.list_nav_item {
		margin: 30rpx 0 0 0rpx;
		font-size: 34rpx;
		font-weight: bold;
		color: #333333;
	}

	.list_hr {
		height: 6rpx;
		background: #0191A0;
		border-radius: 2rpx;
	}

	.list {
		height: 104rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;

		.list-img {
			display: inline-block;
			margin-right: 15rpx;
			width: 32rpx;
			height: 32rpx;
		}
	}


	.on-rouw {
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		line-clamp: 1;
		-webkit-box-orient: vertical;
	}


	.list_title {
		width: 80%;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #132B2E;
		display: flex;
		align-items: center;

		image {
			display: inline-block;
			margin-right: 15rpx;
			width: 32rpx;
			height: 32rpx;
		}

		.viewimg {
			display: inline-block;
			margin-right: 15rpx;
			width: 32rpx;
			height: 32rpx;
		}
	}

	.list_number {
		font-size: 28rpx;
		font-family: Bahnschrift;
		font-weight: normal;
		color: #95A2A3;
	}

	.list_state {
		width: 130rpx;
		height: 50rpx;
		text-align: center;
		line-height: 50rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #95A2A3;
	}


	.active_list_state {
		width: 130rpx;
		height: 50rpx;
		text-align: center;
		line-height: 50rpx;
		background: rgba(233, 253, 255, 0.9900);
		border-radius: 6rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #0191A0;
	}

	/******************************动态样式***********************************/


	.hide {
		display: none;
		// padding-bottom: 150rpx;
	}

	.show {
		display: block;
	}

	.active_list_nav_item {
		border-bottom: 6rpx #0191A0 solid;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #132B2E;
	}

	.active_classify_box_content_item {
		background: $uni-primary !important;
		color: #FFFFFF !important;
	}

	.content_open {
		border-radius: 20rpx;
		overflow: hidden;
		transition: all 0.5s cubic-bezier(0.25, 1.0, 0.25, 1.0);
	}

	.content_close {
		height: 0;
		opacity: 0;
		transition: all 0.5s cubic-bezier(0.25, 1.0, 0.25, 1.0);
	}
</style>