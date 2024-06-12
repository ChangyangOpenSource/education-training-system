<template>
	<view class="curriculumDetailCon">
		<!-- 		<button v-if="isAss==true" open-type="share" class="zhuanfa">
			<image :src="imageUrl+'/static/live/21.png'" mode=""></image>
		</button> -->
		<!-- open，扫码开课模式弹窗 op -->
		<div class="popup-buy" v-if="popupBuyState == true">
			<div class="popup-buy-bg"></div>
			<div class="popup-buy-img">
				<div class="title">该课程暂未解锁</div>
				<div class="qrcode">
					<image :show-menu-by-longpress="true" :src="popupBuyInfo.qrCode"></image>
				</div>
				<div class="text"> 请长按识别二维码联系老师开课 </div>
				<image :src="imageUrl +'/home/uni15.png'"  class="close-icon" @click="onNo" />
			</div>
		</div>
		<!-- open，扫码开课模式弹窗 ed -->
		<!-- 头部 -->
		<view class="header_d">
			<image :src="detailsArr.classesCover" mode="scaleToFill" class="lunbotu"></image>
		</view>
		<!-- 课程标题 -->
		<view class="course_overview">
			<view class="ovs_1">
				<view class="ovs_1-1 two-row">{{ detailsArr.classesName!=''?detailsArr.classesName:'' }}
					<!-- 	<view class="jieduan">
						导学阶段
					</view> -->
				</view>
				<view class="ovs_1-2 two-row"> {{ detailsArr.classesDescribe!=''?detailsArr.classesDescribe:''}}</view>
				<!-- <view class="ovs_1-2 two-row">共 {{ detailsArr.classHour || 0 }} 节</view> -->
			</view>
			<view class="ovs_2">
				<!-- <text class="ovs_2-1">基础阶段</text> -->
			</view>
		</view>
		<view class="mayTabs">
			<view class="tabItem" v-for="(item, index) in listData" :key="index"
				:class="num == item.num ? 'active' : ''" @click="onNume(item.num)">
				{{ item.name }}
				<image class="tab-bottom-icon" v-show="num == item.num " :src="imageUrl + '/home/uni8.png' ">
				</image>
			</view>
		</view>
		<view class="tabContent">
			<!-- 			<view v-if="num === 1">
				<mp-html :content="detailsArr.classesDetails"></mp-html>
			</view> -->
			<view v-if="num === 2">
				<!-- <HomeTitle title="试听体验" type="1" types='2' v-if="courseArr.auditionCourseList.length > 0" /> -->
				<!-- <view class="title-new" v-if="courseArr.auditionCourseList.length > 0">
					<div class="bg-circular"> </div> 试听体验
				</view>
				<scroll-view v-if="courseArr.auditionCourseList.length > 0" :scroll-x="true" class="scrolls">
			
					<auditCourseItem :dataInfo="item" v-for="item in courseArr.auditionCourseList" :key="item.id"
						style="display: inline-block;" />


				</scroll-view> -->
				<!-- <HomeTitle title="课程目录" type="6" types='2' /> -->
				<view class="title-new">
					<div class="bg-circular"> </div> 课程目录
				</view>
				<view v-if="courseArr.courseType === 1">
					<view v-if="courseArr.classesCourseList.length > 0">
						<u-collapse :head-style="{borderBottom: '1px solid #eaeaea'}">
							<u-collapse-item v-for="(item,index) in courseArr.classesCourseList" :key="index">
								<view slot="title" style="width: 100%;">
									<view style="display: flex;align-items: center;justify-content: space-between;">
										<view class="classesN">{{item.sectionName}}</view>
										<text>{{item.classesCourseList.length+'模块'}}</text>
									</view>
								</view>
								<view v-for="items in item.classesCourseList" :key="items.id">
									<ComponentItemNew :courseId="courseId" :item="items" :detailsArr='detailsArr'>
									</ComponentItemNew>
								</view>
							</u-collapse-item>
						</u-collapse>
					</view>
					<image style="width: 349rpx;height: 312rpx;" v-else :src="imageUrl+'/xing/zwsj.png'" mode="">
					</image>
				</view>
				<view v-else>
					<view class="listCard" v-if="courseArr.courseList && courseArr.courseList.length > 0">
						<view v-for="item in courseArr.courseList" :key="item.id">
							<ComponentItem :courseId="courseId" :item="item" :detailsArr='detailsArr'
								:paddingLeftSize="'34rpx'">
							</ComponentItem>
						</view>
					</view>
					<image style="width: 349rpx;height: 312rpx;" v-else :src="imageUrl+'/xing/zwsj.png'" mode="">
					</image>
				</view>

			</view>
			<view v-if="num === 5">
				<TeachList :list="detailsArr.teacherList"></TeachList>
			</view>
		</view>
		<view class="footerCon" v-if="detailsArr.isNoBuy==0">
			<button type="default" @click="kefu" class="leftCon">
				<image class="phoneImg" :src="imageUrl + '/home/uni1.png'" mode=""></image>
				<text>客服</text>
			</button>
			<view class="priceCon">
				<div class="texts" v-if="isDisplayPrice == true">
					<div class="text1">
						￥{{ detailsArr.classesTypeList[0].fficialPrice || '0'}} 起
					</div>
					<div class="text2"
						v-if="detailsArr.classesTypeList[0].lineFficialPrice!=0 && detailsArr.classesTypeList[0].lineFficialPrice!=''">
						￥{{ detailsArr.classesTypeList[0].lineFficialPrice || '0'}}
					</div>
				</div>
				<div class="kaike" v-else>联系老师开课</div>
				<div class="text3" @click="buyNow" v-if="detailsArr.classesTypeList[0].fficialPrice == 0">
					免费领取
				</div>
				<div class="text3" @click="buyNow"
					v-if="detailsArr.classesTypeList[0].fficialPrice != 0 && courseControl == 'pay'">
					立即购买
				</div>
				<div class="text3" @click="buyNow"
					v-if="detailsArr.classesTypeList[0].fficialPrice != 0 && courseControl == 'open'">
					立即开课
				</div>
				<!-- 	<text class="price">￥{{ detailsArr.classesTypeList[0].fficialPrice || '0'}} <text class="qi">起</text>
				</text> -->
				<!-- <text class="price2"
					v-if="detailsArr.classesTypeList[0].lineFficialPrice!=0 && detailsArr.classesTypeList[0].lineFficialPrice!=''">￥{{ detailsArr.classesTypeList[0].lineFficialPrice || '0'}}</text> -->
			</view>
			<!-- 单一班型&&价格为0 -->
			<!-- 	<view class="myBtn" @click="buyNow">
				{{ detailsArr.classesTypeList[0].fficialPrice == 0 ? '免费领取' : '立即购买'}}
			</view> -->
		</view>
		<!-- 弹出框 -->
		<DialogView :show="popupShow" ref="DialogView" :model="detailsArr.classesTypeList"
			:courseControl="courseControl" :coverImg="detailsArr.classesCover" @handleChange="handleChange"
			@footHandleChange="footHandleChange" @hideDialog="hideDialog" />
		<view v-show='loginAss' class="back-tankuang">
			<login class="loginw" @guanbi='guanbi' />
		</view>
		<!-- 		<image v-if="detailsArr.isShowIcon!=0" @click="onWennuan" :src="imageUrl+'/static/live/zhuali.png'" class="zhualiSize" mode="">
		</image> -->
	</view>
</template>
<script>
	// import HomeTitle from "@/pages/index/components/home-title/index.vue";
	import DialogView from "@/pagesA/components/popUp.vue";
	import ComponentItem from "@/components/componentItem/componentItem.vue";
	import ComponentItemNew from "./components/componentItemNew.vue";
	// import auditCourseItem from "@/components/audit/audit-course-item/index.vue";
	import auditCourseItem from "./components/audition.vue";
	import TeachList from "./components/teachList.vue";
	import {
		componentInfoBrief
	} from '@/api/mine/about.js'
	import {
		getClassesBooks,
		getClassesCourse,
		getClassesDetails,
	} from "@/api/curriculumDetail.js";
	import {
		setStudentId,
		getStudentId,
		getToken,
		getTitle
	} from "@/common/util/index.js";
	import {
		isHomeTop,
	} from "@/api/homeAudition.js";
	import {
		queryByStudent,
	} from "@/api/zhuli.js";
	import {
		orderAdd,
		distributorId
	} from "@/api/pay.js";
	const NET = require("@/uview-ui/request");
	const API = require("@/api/tuiguang");
	export default {
		components: {
			// HomeTitle,
			DialogView,
			ComponentItem,
			auditCourseItem,
			TeachList,
			ComponentItemNew
		},
		// 分享给好友
		onShareAppMessage(options) {
			// if(options.target.id=='right'){
			// 	this.onShareTimeline()
			// }else{

			var that = this;
			// 设置菜单中的转发按钮触发转发事件时的转发内容
			var shareObj = {
				title: getTitle(), // 默认是小程序的名称(可以写slogan等)
				desc: '', // 小程序的描述
				path: `/pagesA/curriculumDetail/index?id=${this.courseId}&studentId=${this.studentIdw}`, // 默认是当前页面，必须是以‘/’开头的完整路径
				imageUrl: this.detailsArr.classesCover, // 图片封面，本地文件路径、网络图片路，支持PNG及JPG，默认当前页面截图，显示图片长宽比是 5:4。
				success: function(res) {
					// 转发成功之后的回调
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
				isDisplayPrice: '',
				courseControl: 'pay', //开课模式，open二维码开课，pay支付开课
				popupBuyState: false, // 开课弹窗状态
				popupBuyInfo: {}, // 开课弹窗返回信息
				ambssadorFlg: {},
				loginAss: getApp().globalData.loginAss,
				imageUrl: getApp().globalData.imageUrl,
				studentIdw: uni.getStorageSync('userInfos').id,
				popupShow: false,
				// isAss: false,
				// 班级课程
				courseArr: [],
				detailsArr: {
					isShowIcon: 0
				},
				num: 2,
				courseId: "",
				listData: [{
					num: 2,
					name: "目录",
				}, {
					num: 5,
					name: "讲师",
				}],
			};
		},
		onUnload() {
			uni.removeStorageSync('studentId')
		},
		onShow() {
			this.isDisplayPrice = uni.getStorageSync('isDisplayPrice')
			// 获取开课类型
			this.courseControl = uni.getStorageSync('courseControl')
			console.log(this.courseControl, '开课方式')
			// 如果为二维码联系开课获取二维码
			// if (this.courseControl == 'open') {
			componentInfoBrief().then((res) => {
				if (res.code == 200) {
					this.popupBuyInfo = res.result;
				}
			})
			// }
			let aaa = getCurrentPages()
			let thatPage = aaa[aaa.length - 1];

			// this.onisHomeTop()
			console.log(thatPage.options, '详情页接收值')
			if (thatPage.options.studentId && thatPage.options.studentId != 'undefined') {
				// console.log(thatPage.options.id, 12)
				setStudentId({
					id: thatPage.options.id,
					studentId: thatPage.options.studentId ? thatPage.options.studentId : ''
				})
				// console.log(thatPage.options.studentId, 12)
				if (thatPage.options.id) {
					this.courseId = thatPage.options.id;
					// this.collapseChange()
					if (this.courseId) {
						this.classesCourseFun({
							id: this.courseId
						});
						this.classesDetailsFun({
							id: this.courseId
						});
					} else {
						uni.reLaunch({
							url: '/pages/index/home'
						})
					}
				}

				if (getToken()) {
					// this.collapseChange()
					// console.log(thatPage.options.studentId, 123123)
					if (thatPage.options.scene) {
						// const scene = decodeURIComponent(options.scene)
						this.courseId = thatPage.options.scene;
					} else {
						this.courseId = thatPage.options.id;
					}

					if (thatPage.options.studentId) {
						setStudentId({
							id: thatPage.options.id,
							studentId: thatPage.options.studentId
						})
					} else {
						// console.log('销毁')
						uni.removeStorageSync('studentId')
					}
					if (getStudentId().studentId) {
						// console.log(getStudentId().studentId, '123')
						this.bind()
					}
				} else {
					uni.showToast({
						title: '登录失效，请重新登录',
						icon: "none"
					})
					setTimeout(() => {
						this.loginAss = true
					}, 1000)
				}
			} else if (thatPage.options.scene) {
				this.courseId = thatPage.options.scene;
				if (this.courseId) {
					this.classesCourseFun({
						id: this.courseId
					});
					this.classesDetailsFun({
						id: this.courseId
					});
				} else {
					uni.reLaunch({
						url: '/pages/index/home'
					})
				}
			} else {
				this.courseId = thatPage.options.id;
				// this.collapseChange()
				if (this.courseId) {
					this.classesCourseFun({
						id: this.courseId
					});
					this.classesDetailsFun({
						id: this.courseId
					});
				} else {
					uni.reLaunch({
						url: '/pages/index/home'
					})
				}
			}

		},
		mounted() {

		},
		methods: {
			kefu() {
				this.popupBuyState = true
			},
			onNo() {
				this.popupBuyState = false
			},
			onNume(value) {
				this.num = value
			},
			setShareUrl(options) {
				try {
					let shareUrl = '/pagesA/fenxiang/fenxiang?';
					if (options.entityId) shareUrl += 'entityId=' + options.entityId
					uni.setStorageSync('shareUrl', shareUrl)
					// console.log('新登录')
					this.loginAss = true
				} catch (e) {
					// error
				}
			},
			setShokjw(options) {
				try {
					let shareUrl = '/pagesA/fenxiang/fenxiang?';
					if (options.entityId) shareUrl += 'entityId=' + options.entityId
					uni.setStorageSync('shareUrl', shareUrl)
					// console.log('新登录')
					uni.navigateTo({
						url: "/pagesA/setUpMajor/setUpMajor",
					});
				} catch (e) {
					// error
				}
			},
			// onWennuan() {
			// 	uni.showLoading({
			// 		mask: true,
			// 		title: '加载中'
			// 	})
			// 	let token = uni.getStorageSync('token')
			// 	if (!token) {
			// 		this.loginAss = true
			// 		return
			// 	} else {
			// 		uni.hideLoading()
			// 		uni.navigateTo({
			// 			url: '/pagesA/index/index'
			// 		})
			// 	}
			// },
			// onisHomeTop() {
			// 	isHomeTop({}).then(res => {
			// 		console.log(res)
			// 		if (res.code == 200) {
			// 			this.ambssadorFlg = res.result
			// 		}
			// 	})
			// },
			// 关闭登陆弹窗
			guanbi(value) {
				this.loginAss = value
			},
			bind(item) {
				var id = getStudentId().studentId
				console.log(id, 'distributorId')
				NET.request(API.bind, {
					distributorId: id
				}, 'post').then(res => {
					if (res.code == 200) {
						console.log(res.code, 132456)
					}
				})
			},
			// collapseChange() {
			// 	NET.request(API.judge, {}, 'post').then(res => {
			// 		console.log(res, 132456978)
			// 		if (res.code == 200) {
			// 			this.isAss = true
			// 			this.code = res.result.invitationCode
			// 		} else {
			// 			this.isAss = false
			// 		}
			// 	})
			// },
			keFU() {
				this.popupBuyState = true;
			},
			//立即购买
			buyNow() {
				// 没登陆登录，登陆了弹底部弹窗
				let token = uni.getStorageSync('token')
				if (!token) {
					this.loginAss = true
					return
				} else {
					// 支付开课
					if (this.detailsArr.classesTypeList.length === 1) {
						this.footHandleChange(this.detailsArr.classesTypeList[0])
						// this.collapseChange()
					} else {
						this.popupShow = true
						this.$refs.DialogView.setData()
					}
				}
			},
			// 生成订单
			async generateOrder(form, type) {
				const res = await orderAdd(form);
				if (res.code == 200) {
					if (type == 1) {
						uni.showToast({
							title: '购买成功',
						})
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages-mine/courseOrder/courseOrder'
							})
						}, 1000)
					} else {
						uni.navigateTo({
							url: `/pagesA/payOrder/payOrder?orderId=${res.result.id}`,
						});
					}

				}
				this.payInfo = res.result;
			},
			toVideo(data) {
				console.log('toVideo', data)
				if (data.vid) {
					uni.setStorageSync('materials', data.materials)
					uni.navigateTo({
						url: '/pages/videoRoom/videoRoom?vid=' + data.vid + '&videoId=' + data.id +
							'&sourceType=' + data.sourceType
					})
				} else {
					uni.showToast({
						title: '回放内容不存在',
						icon: 'none'
					});
				}
			},
			toCoursDetail(data) {
				uni.navigateTo({
					url: `/pages-learn/courseDetail/courseDetail?classId=${this.courseId}&courseId=${data.id}`
				})
			},
			hideDialog() {
				this.popupShow = false;
			},
			// 小按钮
			handleChange(val) {
				console.log(val);
			},
			// 立即购买
			footHandleChange(val) {
				console.log('footHandleChange 11011 =》', val)
				if (this.courseControl == 'pay') {
					if (val) {
						uni.navigateTo({
							url: `/pagesA/payOrder/payOrder?detailsArr=${encodeURIComponent(JSON.stringify(this.detailsArr))}&val=${encodeURIComponent(JSON.stringify(val))}`,
						});
					} else {
						uni.navigateTo({
							url: `/pagesA/payOrder/payOrder?detailsArr=${encodeURIComponent(JSON.stringify(this.detailsArr))}`,
						});
					}
				} else if (this.courseControl == 'open') {
					// 显示弹窗
					this.popupBuyState = true;
				}

			},
			// 班级课程查询
			async classesCourseFun(data) {
				const res = await getClassesCourse(data);
				this.courseArr = res.result;
				// 过滤掉直播课
				if (this.courseArr.courseList) {
					this.courseArr.courseList = this.courseArr.courseList.filter((item, index) => {
						return item.courseType == 2
					})
				}
			},
			// 班级详情查询
			async classesDetailsFun(data) {
				const res = await getClassesDetails(data);
				if (res.result.classesDetails) {
					res.result.classesDetails = res.result.classesDetails.replace(/\<img/gi,
						'<image style="max-width:100%;height:auto"')
				}
				this.detailsArr = res.result;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.kaike {
		position: absolute;
		top: 50%;
		left: 100rpx;
		transform: translateY(-50%);
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #000000;
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
				margin: 36rpx auto 0;
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

	/deep/ .u-collapse-head {
		margin-top: 20rpx;
		padding: 39rpx 25rpx 39rpx 34rpx !important;
		border: 2px solid #EEEEEE;
		border-bottom: 1px solid #EEEEEE !important;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
	}

	.title-new {
		position: relative;
		z-index: 2;
		padding-left: 17rpx;
		margin: 0 0 20rpx 0;
		text-align: left;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;

		.bg-circular {
			position: absolute;
			z-index: 1;
			top: 1rpx;
			left: 3rpx;
			width: 23rpx;
			height: 23rpx;
			background: #FF8849;
			opacity: 0.5;
			border-radius: 50%;
		}
	}

	image,
	img {
		max-width: 100% !important;
	}

	.zhualiSize {
		width: 275rpx;
		height: 227rpx;
		position: fixed;
		right: 0;
		bottom: 260rpx;
	}

	.title-left {
		font-size: 34rpx;
		color: #333333;
		font-weight: bold;
		margin-left: 20rpx;
		// width: 30%;
		width: fit-content;
		display: flex;
		margin-bottom: 50rpx;
	}

	.yellow-line {
		position: relative;

		&::before {
			background: linear-gradient(0deg, #fbb752, #fee94c);
		}

		&::after {
			background: linear-gradient(90deg, #f5e6d1 0%, #f5f1cf 100%);
		}
	}

	.flex {
		display: flex;
		flex-wrap: wrap;
	}

	.zhuanfa {
		width: 96rpx;
		height: 96rpx;
		border-radius: 100rpx;
		background: none;
		position: absolute;
		right: 15rpx;
		z-index: 1000;

		image {
			width: 96rpx;
			height: 96rpx;
			border-radius: 100rpx;
		}
	}

	.blue-line {
		position: relative;

		&::before {
			content: "";
			width: 6rpx;
			height: 30rpx;
			border-radius: 4rpx;
			position: absolute;
			background: linear-gradient(0deg, #2bddea, #16f2f9);
			left: -20rpx;
			top: 8rpx;
			z-index: 10;
		}

		&::after {
			content: "";
			width: 100%;
			height: 14rpx;
			background: linear-gradient(90deg, #cbeff1 0%, #c7f3f4 100%);
			border-radius: 50%;
			position: absolute;
			left: 0;
			bottom: 0;
			right: 0;
			z-index: -1;
		}
	}

	.classesN {
		// background-image: url($fileBaseUrl + '/oss/2_1641868998293.png');
		// background-repeat: no-repeat;
		// padding: 2rpx 20rpx 8rpx;
		background-size: 110rpx 100%;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		flex: 1;
		overflow: hidden;
	}

	.play {
		position: absolute;
		z-index: 10;
		width: 36rpx;
		height: 36rpx;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -100%);
	}

	.widtj {
		width: 50%;
	}

	.curriculumDetailCon {
		min-height: 100vh;
		padding: 25rpx 20rpx;
		background: #fafafa;
		padding-bottom: 200rpx;

		.footerCon {
			width: 100%;
			box-sizing: border-box;
			height: 160rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(108, 108, 108, 0.3);
			padding: 0 30rpx;
			padding-bottom: 30rpx;
			position: fixed;
			left: 0;
			bottom: 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			z-index: 10;

			.leftCon {
				padding-top: 14rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #ffffff;
				margin: 0;

				text {
					font-size: 24rpx;
					font-family: PingFang SC;
					color: #333333;
					display: inline-block;
					height: auto;
					font-weight: 500;
				}

				.phoneImg {
					margin-right: 17rpx;
					width: 38rpx;
					height: 34rpx;
				}
			}

			.priceCon {
				position: relative;
				width: 527rpx;
				height: 80rpx;
				background-image: url($fileBaseUrl + '/home/uni21.png');
				background-repeat: no-repeat;
				background-size: 100% 100%;

				.texts {
					position: absolute;
					top: 50%;
					left: 42rpx;
					transform: translateY(-50%);
					display: flex;
					align-items: center;

					.text1 {
						margin-right: 15rpx;
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: $uni-primary;
					}

					.text2 {
						// position: absolute;
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 500;
						text-decoration: line-through;
						color: #FA632B;
						opacity: 0.7;
					}
				}

				.text3 {
					position: absolute;
					top: 50%;
					right: 23rpx;
					transform: translateY(-50%);
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #FFFFFF;
				}

				.qi {
					color: #333333;
					font-size: 32rpx;
				}

				.price {
					// margin-right: 10rpx;
					font-size: 40rpx;
					color: #fa642c;
				}

				.price2 {
					font-size: 28rpx;
					text-decoration: line-through;
					color: #999999;
					text-align: center;
					margin-left: 16rpx;
				}
			}

			.myBtn {
				width: 270rpx;
				height: 80rpx;
				border-radius: 40rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 32rpx;
				font-weight: bold;
				color: #ffffff;
				background-color: #fa642c;
			}
		}

		.tabContent {
			background-color: #ffffff;
			width: 100%;
			box-sizing: border-box;
			padding: 30rpx 30rpx 140rpx;
			text-align: center;
			// z-index: -2;
			position: relative;
			box-shadow: 0rpx 4rpx 19rpx 2rpx rgba(214, 214, 214, 0.17);
			border-bottom-left-radius: 20rpx;
			border-bottom-right-radius: 20rpx;

			.swiper-item {
				width: 100%;
				height: 220rpx;
				background: #ffffff;
				box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(0, 0, 0, 0.2) inset;
				border-radius: 20rpx;

				.item-content {
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 100%;
					height: 100%;
					box-sizing: border-box;
					padding: 20rpx;

					.item-left {
						height: 132rpx;
						width: 132rpx;

						.item-left-img {
							width: 100%;
							border-radius: 50%;
							height: 100%;
						}
					}

					.item-right {
						width: 500rpx;
						text-align: left;

						.teacher-name {
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: bold;
							margin-bottom: 22rpx;

							.t1 {
								color: #333333;
								margin-right: 20rpx;
							}

							.t2 {
								color: #666666;
							}
						}

						.teacher-detail {
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #999999;
						}
					}
				}
			}

			.scrolls {
				width: 100%;
				// height: 265rpx;
				margin-top: 15rpx;
				white-space: nowrap;
				margin-bottom: 22rpx;
				// line-height: 265rpx;
				text-align: left;

				.scroll-item {

					// position: relative;
					// display: inline-block;
					// width: 313rpx;
					// height: 98%;
					// border-radius: 9rpx;
					// margin: 0 18rpx 0 10rpx;
					// box-shadow: 0rpx 2rpx 8rpx 0rpx rgba(0, 0, 0, 0.2);

					// .imgd {
					// 	height: 193rpx;
					// 	width: 100%;
					// 	border-top-left-radius: 9rpx;
					// 	border-top-right-radius: 9rpx;
					// }

					// .dwdasds {
					// 	display: block;
					// 	text-align: left;
					// 	font-size: 26rpx;
					// 	font-family: PingFang SC;
					// 	font-weight: bold;
					// 	color: #282828;
					// 	padding: 10rpx 0 0 18rpx;
					// 	background-color: #fff;
					// 	overflow: hidden;
					// 	// text-overflow: ellipsis;
					// 	// white-space: nowrap;
					// 	text-overflow: -o-ellipsis-lastline;
					// 	text-overflow: ellipsis;
					// }
				}
			}

			.booksCon {
				margin-bottom: 130rpx;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;

				.bookCard {
					width: 100%;
					height: auto;
					margin-bottom: 30rpx;
					// background: #ffffff;
					// box-shadow: 0rpx 2rpx 16rpx 0rpx rgba(0, 0, 0, 0.2);
					// border-radius: 10rpx;

					.bookBottomCon {
						width: 100%;
						padding: 15rpx;
						height: 126rpx;
						// display: flex;
						// flex-direction: column;
						// justify-content: center;
						// align-items: flex-start;

						.bookTitle {
							font-size: 28rpx;
							font-weight: bold;
							color: #333333;
							flex: 1;
							overflow: hidden;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
							text-align: left;
						}

						.bookPrice {
							font-size: 32rpx;
							font-weight: bold;
							color: #fa642c;
							text-align: left;
						}
					}

					.bookTopCon {
						width: 334rpx;
						height: 334rpx;
						border-bottom: 1rpx dashed #999999;
						position: relative;

						.bookImg {
							width: 100%;
							height: 100%;
						}

						.bookTip {
							position: absolute;
							top: 20rpx;
							left: 0;
							width: 122rpx;
							height: 38rpx;
							background: rgba(59, 123, 255, 0.99);
							border-radius: 0rpx 19rpx 19rpx 0px;
							font-size: 22rpx;
							font-weight: bold;
							color: #ffffff;
							line-height: 38rpx;
							text-align: center;
						}
					}
				}
			}

			.listCard {
				margin-top: 15rpx;
				margin-bottom: 130rpx;
				padding: 14rpx 20rpx;
				background: #ffffff;
				box-shadow: 0rpx 0rpx 6rpx 0rpx rgba(0, 0, 0, 0.1);
				border-radius: 20rpx;

				.serverItem {
					height: 100rpx;
					padding: 30rpx 0;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1rpx solid #f3f3f3;

					.serverItemLeftCon {
						display: flex;
						align-items: center;

						.serverIcon {
							width: 62rpx;
							height: 62rpx;
							margin-right: 20rpx;
						}
					}

					.serverTrue {
						width: 36rpx;
						height: 26rpx;
					}
				}


			}
		}

		.mayTabs {
			margin-top: 20rpx;
			background-color: #ffffff;
			width: 100%;
			padding: 33rpx 36rpx 0rpx;
			display: flex;
			// justify-content: space-between;
			align-items: center;
			border-bottom: 1rpx solid #f3f3f3;
			// width: 713rpx;
			// height: 1487rpx;
			background: #FFFFFF;
			// box-shadow: 0rpx 4rpx 19rpx 2rpx rgba(214, 214, 214, 0.17);
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;

			.tabItem {
				position: relative;
				margin-right: 54rpx;
				width: 70rpx;
				height: 66rpx;
				display: flex;
				justify-content: center;
				justify-items: center;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;

				.tab-bottom-icon {
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44rpx;
					height: 14rpx;
				}
			}

			.active {
				// background-image: url($fileBaseUrl+"/ykstatic/lessonDetail/activeTab.png");
				// background-size: 100% 100%;
				// background-repeat: no-repeat;
				font-size: 34rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				// border-bottom: 5rpx solid #ff6b19;
			}
		}

		// 头部banner
		.header_d {
			position: relative;
			// height: 430rpx;
			// width: 100%;
			width: 710rpx;
			height: 473rpx;
			background: red;
			// width: 709px;
			// height: 300px;
			background: #FFFFFF;
			border-radius: 20px;
			overflow: hidden;

			.rowFlex {
				position: fixed;
				top: 20rpx;
				z-index: 10;
				width: 100%;
				display: flex;
				justify-content: flex-start;
				align-items: center;

				.title {
					color: #ffffff;
					font-size: 36rpx;
					font-weight: bold;
					margin-left: 30%;
				}
			}

			.fenxiang {
				width: 46rpx;
				height: 46rpx;
				margin: 30rpx 20rpx 20rpx;
			}

			.lunbotu {
				width: 100%;
				height: 100%;
				// height: 473rpx;
			}
		}

		.ovs_1 {
			// margin-top: 20rpx;
		}

		.ovs_1-1 {
			margin-bottom: 18rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;

			.jieduan {
				width: fit-content;
				margin-left: 16rpx;
				// width: 106px;
				padding: 0 10rpx;
				height: 34rpx;
				background: linear-gradient(0deg, #DBA17A 0%, #C89181 100%);
				border-radius: 8rpx;
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
			}
		}

		.ovs_1-2 {
			font-size: 28rpx;
			font-weight: 500;
			color: #666666;
		}

		// 课程标题
		.course_overview {
			margin-top: 20rpx;
			// width: 100%;
			// box-sizing: border-box;
			padding: 28rpx;
			// height: 170rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #fff;
			// width: 713rpx;
			// height: 125rpx;
			// background: #FFFFFF;
			box-shadow: 0rpx 4rpx 19rpx 2rpx rgba(214, 214, 214, 0.17);
			border-radius: 20rpx;

			.ovs_2-1 {
				padding: 13rpx 14rpx;
				background-color: #fff2e2;
				color: #fd8c01;
			}
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