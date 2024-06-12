<!-- * 学习页面 -->
<template>
	<view class="learns">

		<view class="menu-dom">
			<view :class="{menu2:!dingISass,menu:dingISass}">
				<view :class="[{ bor: activemenu == 1 }, 'menu-item']" @click="oNxifuydsaw">
					我的课程
					<image class="line" :src="imageUrl + '/xing/dibu.png'" v-if="activemenu == 1"  />
				</view>
				<!-- 	<view :class="[{ bor: activemenu == 2 }, 'menu-item']" @click="oNxifuy">
					直播计划
					<image class="line" :src="imageUrl + '/xing/dibu.png'" v-if="activemenu == 2"  />
				</view> -->
			</view>
		</view>

		<view class="venter" v-if="isAss==1">
			<view class="Learning">
				<view class="flex1">
					<image :src="imageUrl+'/xing/126danqiang.png'" class="imgsIZR1"  />
					<view class="flex">
						<view class="xinkec" v-if="findBySeriesObj.newCourseClassesFlg==1">
							有新课程
						</view>
						<view class="flex" @click="onShift">
							<view class="sizeTexr">
								切换课程
							</view>
							<image class="imdSize" :src="imageUrl+'/tabBarIcon/yoyuse.png'"  />
						</view>
					</view>
				</view>
				<view class="nemese one-row">
					{{classesName}}
				</view>
			</view>
			<activeIndex v-if="activeIsAss == 1 ||activeIsAss == 2" :findBySeriesObj="findBySeriesObj" :itRmes="itRmes"
				:findByModuleObj='findByModuleObj' />
		</view>
		<view class="" v-else>
			<!-- 我的课程 -->
			<MyCourse v-if="activemenu == 1" :listData="listData"
				@findBySeriesOfCoursesDetail='findBySeriesOfCoursesDetail'
				@findByModuleOfCoursesDetail="findByModuleOfCoursesDetail" />
			<!-- 学习服务 -->
			<LearnService v-if="activemenu == 2" @loginTip='loginTip' @onBlistDataDay='onBlistDataDay'
				:listDatas="listDatas" :findByPeepArr='findByPeepArr' @findIsAgrss='findIsAgrss' :year='year'
				:month='month' :day='day' />
		</view>
	</view>
</template>

<script>
	import MyCourse from "./MyCourse.vue";
	import LearnService from "./LearningService.vue";
	import activeIndex from "@/components/active-index/index.vue";
	// import actnewfile from "@/components/active-index/new_file.vue";
	import {
		getToken
	} from "@/common/util/index.js";
	import {
		queryCourseDetailsCourseOrSubNew,
		findBySeriesOfCoursesDetail,
		findByModuleOfCoursesDetail
	} from "@/api/curriculumDetail.js";
	import {
		findBySeriesOfCourses,
		findByPeepStreamCalendar,
		findByPeepStreamLiveCourse,
	} from "@/api/learn.js"

	export default {
		name: "Learn",
		components: {
			MyCourse,
			LearnService,
			activeIndex,
			// actnewfile
		},
		data() {
			return {
				refresh: false,
				dingISass: true,
				imageUrl: getApp().globalData.imageUrl,
				activemenu: 1,
				isAss: 0,
				menuList: [{
						index: 1,
						title: "我的课程",
					},
					{
						index: 2,
						title: "学习服务",
					},
				],
				listData: [],
				listDatas: [],
				year: '',
				month: '',
				day: '',
				hour: '',
				minutes: '',
				seconds: '',
				classesName: '',
				findBySeriesObj: {},
				findByModuleObj: {},
				activeIsAss: 0,
				itRmes: {},
				findByPeepArr: [],
				iosAss: true,
			};
		},
		mounted() {},
		created() {},
		methods: {
			onLodsw(){
				// 判断是否登录
				const token = getToken();
				if (!token) {
					this.$emit('toLogin')
					return
				}
				console.log('切换至学习页')
				if (uni.getStorageSync("ipfit") == 1) {
					this.dingISass = false
				} else if (uni.getStorageSync("ipfit") == 2) {
					this.dingISass = true
				}
				let aaa = getCurrentPages()
				
				//#ifdef H5
				let thatPage = {
					options: {}
				}
				console.log(aaa[aaa.length - 1].options, '学习页接收值')
				if (aaa[aaa.length - 1].options) {
					thatPage.options = aaa[aaa.length - 1].options
				}
				// thatPage.options = JSON.parse(aaa[aaa.length - 1].options.query)
				//#endif
				//#ifdef MP-WEIXIN
				let thatPage = aaa[aaa.length - 1];
				//#endif
				// this.isAss = 0
				this.getData()
				
				if (thatPage.options.activemenu) {
					if (this.iosAss) {
						if (thatPage.options.activemenu == '1') {
							if (thatPage.options.activeIsAss == '2') {
								this.activemenu = 1
								this.activeIsAss = 2
								this.isAss = 1
							} else {
								this.activemenu = 1
								this.activeIsAss = 1
								this.isAss = 1
							}
							this.classesName = uni.getStorageSync('classesName')
						} else {
							this.activemenu = 2
						}
						this.findByPeepStreamCalendar()
					}
				
				}
				if (this.isAss == 1 && this.activeIsAss == 1) {
					findBySeriesOfCoursesDetail({
						classesId: uni.getStorageSync('keChenXq').classesId,
						classesTypeId: uni.getStorageSync('keChenXq').classesTypeId,
					}).then((res) => {
						if (res.result.isNoBuy == 0) {
							this.isAss = 0
							this.findByModuleObj = {}
						} else {
							this.findBySeriesObj = res.result;
							this.findByModuleObj = {}
						}
					})
				}
				
				if (this.isAss == 1 && this.activeIsAss == 2) {
					findByModuleOfCoursesDetail({
						courseId: uni.getStorageSync('ModulekeChenXq').classesTypeId,
					}).then((res) => {
						if (res.result.isNoBuy == 0) {
							this.isAss = 0
							this.findBySeriesObj = {}
						} else {
							this.findByModuleObj = res.result.courseList
							this.findBySeriesObj = {}
						}
					})
				}
				this.findBySeriesOfCourses()
			},
			findBySeriesOfCourses(){
				findBySeriesOfCourses({
					pageNo: 1,
					pageSize: 999,
				}).then(res => {
					this.listData = res.result.records
				})
			},
			findIsAgrss(value) {
				this.findByPeepArr[value].isAgree = 1
			},
			oNxifuydsaw() {
				this.iosAss = false
				this.activemenu = 1
				this.isAss = 0
				this.findBySeriesOfCourses()
				uni.removeStorageSync('onBlistDataDay');
				uni.removeStorageSync('onBlistDataDay');
				uni.removeStorage('onBlistDataDay')
				uni.removeStorageSync('ModulekeChenXq');
				uni.removeStorageSync('ModulekeChenXq');
				uni.removeStorage('ModulekeChenXq')
				uni.removeStorageSync('keChenXq');
				uni.removeStorageSync('keChenXq');
				uni.removeStorage('keChenXq')
			},
			onShift() {
				this.isAss = 0
				this.findBySeriesObj = {}
				this.findByModuleObj = {}
				uni.removeStorageSync('ModulekeChenXq');
				uni.removeStorageSync('ModulekeChenXq');
				uni.removeStorage('ModulekeChenXq')

				uni.removeStorageSync('keChenXq');
				uni.removeStorageSync('keChenXq');
				uni.removeStorage('keChenXq')
				this.findBySeriesOfCourses()
			},
			findByModuleOfCoursesDetail(value, item) {
				uni.setStorageSync('ModulekeChenXq', {
					classesTypeId: item.id,
				})
				if (Object.keys(JSON.parse(value)).length != 0) {
					this.findByModuleObj = JSON.parse(value)
					this.findBySeriesObj = {}
					this.isAss = 1
					this.activeIsAss = 2
					this.classesName = item.courseName
					uni.setStorageSync('classesName', item.courseName)
				}
			},
			findBySeriesOfCoursesDetail(value, item) {
				uni.setStorageSync('keChenXq', {
					classesId: item.classesId,
					classesTypeId: item.classesTypeId,
				})
				if (Object.keys(JSON.parse(value)).length != 0) {
					this.findBySeriesObj = JSON.parse(value)
					this.findByModuleObj = {}
					this.isAss = 1
					this.activeIsAss = 1
					this.itRmes = item
					this.classesName = item.classesName
					uni.setStorageSync('classesName', item.classesName)
				}
			},
			loginTip(value) {
				if (value == 'year') {
					this.year--
					uni.setStorageSync('onBlistDataDay', {
						month: this.month,
						year: this.year
					})
					this.findByPeepStreamCalendar()
				} else if (value == 'moun') {
					this.year++
					uni.setStorageSync('onBlistDataDay', {
						month: this.month,
						year: this.year
					})
					this.findByPeepStreamCalendar()
				} else {
					this.month = value
					uni.setStorageSync('onBlistDataDay', {
						month: this.month,
						year: this.year
					})
					this.findByPeepStreamCalendar()
				}

			},
			onBlistDataDay(value, value1, value2) {
				if (value) {
					this.day = value
				}
				if (value1) {
					this.month = value1
				}
				if (value2) {
					this.year = value2
				}
				this.findByPeepStreamCalendar()
				this.findByPeepStreamLiveCourse()
			},
			oNxifuy() {
				uni.removeStorageSync('onBlistDataDay');
				uni.removeStorageSync('onBlistDataDay');
				uni.removeStorage('onBlistDataDay')
				this.iosAss = false
				this.activemenu = 2
				this.isAss = 0
				this.getData()
				this.findByPeepStreamCalendar()
			},
			findByPeepStreamLiveCourse() {
				if (uni.getStorageSync('onBlistDataDay').day) {
					this.day = uni.getStorageSync('onBlistDataDay').day
				}
				findByPeepStreamLiveCourse({
					date: this.year + '-' + this.month + "-" + this.day
				}).then((res) => {
					if (res.result) {
						this.findByPeepArr = res.result
					}
				})
			},
			findByPeepStreamCalendar() {
				if (uni.getStorageSync('onBlistDataDay')) {
					this.year = uni.getStorageSync('onBlistDataDay').year
					this.month = uni.getStorageSync('onBlistDataDay').month
				}
				findByPeepStreamCalendar({
					// date: 1
					date: this.year + '-' + this.month
				}).then((res) => {
					this.listDatas = res.result
					let obj = {
						count: 0,
						date: "",
						day: '',
						liveCount: 0,
						week: "",
					}
					if (this.listDatas[0].week == 1) {
						this.listDatas.unshift(obj)
					} else if (this.listDatas[0].week == 2) {
						for (var i = 0; i < 2; i++) {
							this.listDatas.unshift(obj)
						}
					} else if (this.listDatas[0].week == 3) {
						for (var i = 0; i < 3; i++) {
							this.listDatas.unshift(obj)
						}
					} else if (this.listDatas[0].week == 4) {
						for (var i = 0; i < 4; i++) {
							this.listDatas.unshift(obj)
						}
					} else if (this.listDatas[0].week == 5) {
						for (var i = 0; i < 5; i++) {
							this.listDatas.unshift(obj)
						}
					} else if (this.listDatas[0].week == 6) {
						for (var i = 0; i < 6; i++) {
							this.listDatas.unshift(obj)
						}
					}
					this.findByPeepStreamLiveCourse()
				})
			},
			// 格式化日对象
			getData() {
				var date = new Date();
				var sign2 = ":";
				this.year = date.getFullYear() // 年
				this.month = date.getMonth() + 1; // 月
				this.day = date.getDate(); // 日
				this.hour = date.getHours(); // 时
				this.minutes = date.getMinutes(); // 分
				this.seconds = date.getSeconds() //秒
				var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
				var week = weekArr[date.getDay()];
				// 给一位数的数据前面加 “0”
				if (this.month >= 1 && this.month <= 9) {
					this.month = "0" + this.month;
				}

				if (this.hour >= 0 && this.hour <= 9) {
					this.hour = "0" + this.hour;
				}
				if (this.minutes >= 0 && this.minutes <= 9) {
					this.minutes = "0" + this.minutes;
				}
				if (this.seconds >= 0 && this.seconds <= 9) {
					this.seconds = "0" + this.seconds;
				}
			},
		},
	};
</script>

<style lang="scss">
	.onpse-flex {
		display: flex;
		align-items: center;
		margin-right: 7rpx;
	}

	.baitiao {
		width: 3rpx;
		height: 9rpx;
		background: #FFFFFF;
		margin-top: 4rpx;
	}

	.baitiao2 {
		width: 3rpx;
		height: 13rpx;
		background: #FFFFFF;
		margin: 0 2rpx;
	}

	.onpse {
		width: 99rpx;
		height: 30rpx;
		background: linear-gradient(90deg, #FD7A3F 0%, #FA632B 100%);
		border-radius: 15rpx;
		font-size: 20rpx;
		font-weight: 400;
		color: #FFFFFF;
		display: flex;
		// align-items: center;
		position: absolute;
		justify-content: center;
		// top: 0;
		right: 125rpx;
		bottom: 50rpx
	}

	.nemese {
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
		margin-top: 21rpx;
	}

	.imgsIZR1 {
		width: 188rpx;
		height: 48rpx;
	}

	.imgsIZR1se {
		width: 20rpx;
		height: 20rpx;
	}

	.sizeTexr {
		font-size: 24rpx;
		font-weight: 500;
		color: #898989;
		white-space: nowrap;
		margin-right: 10rpx;
	}

	.imdSize {
		width: 18rpx;
		height: 25rpx;
	}

	.xinkec {
		padding: 0 11rpx;
		white-space: nowrap;
		height: 30rpx;
		background: #F73030;
		border-radius: 15rpx;
		font-size: 20rpx;
		font-weight: 500;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 14rpx;
	}

	.flex {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.flex1 {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 23rpx;
		border-bottom: 2rpx solid #fafafa;
	}

	.venter {
		padding-top: 199rpx;
		padding-bottom: 37rpx;
	}

	.Learning {
		width: 692rpx;
		height: 170rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		margin: 0 auto;
		padding: 29rpx 28rpx 0;
	}

	.chucuno {
		position: absolute;
		top: 50%;
		margin-top: -150rpx;
		z-index: 99999;
		left: 50%;
		margin-left: -325rpx;
	}

	.learns {
		background: #fafafa;
		min-height: 100%;
		padding-bottom: 180rpx;

		.menu-dom {
			width: 100%;
			// height: 140rpx;
			background-color: #fff;
		}

		.menu {
			position: fixed;
			top: 0rpx;
			width: 100%;
			height: 110rpx;
			box-sizing: content-box;
			padding-top: 48rpx;
			padding-bottom: 20rpx;
			display: flex;
			// justify-content: center;
			align-items: flex-end;
			z-index: 1000;
			background-color: #fff;
			// box-shadow:0px 1px 3px #969696;

			.menu-item {
				margin: 0 25rpx;
				font-size: 32rpx;
				font-weight: bold;
				padding-bottom: 10rpx;
				transition: all 0.1s;
				position: relative;
				color: rgba(102, 102, 102, 1);
				position: relative;

				.line {
					width: 41rpx;
					height: 13rpx;
					position: absolute;
					bottom: -15rpx;
					z-index: 999;
					left: 50%;
					margin-left: -20rpx;
				}
			}

			.bor {
				// border-bottom: 3px solid #3B7BFF;
				font-size: 36rpx;
				color: #000000 !important;
			}
		}


		.menu2 {
			position: fixed;
			top: 0rpx;
			width: 100%;
			height: 110rpx;
			box-sizing: content-box;
			// padding-top: 48rpx;
			padding-bottom: 20rpx;
			display: flex;
			justify-content: center;
			align-items: flex-end;
			z-index: 1000;
			background-color: #fff;

			// box-shadow:0px 1px 3px #969696;

			.menu-item {
				margin: 0 25rpx;
				font-size: 32rpx;
				font-weight: bold;
				padding-bottom: 10rpx;
				transition: all 0.1s;
				position: relative;
				position: relative;
				color: rgba(102, 102, 102, 1);

				.line {
					width: 41rpx;
					height: 13rpx;
					position: absolute;
					bottom: -15rpx;
					z-index: 999;
					left: 50%;
					margin-left: -20rpx;
				}
			}

			.bor {
				// border-bottom: 3px solid #3B7BFF;
				font-size: 36rpx;
				color: #000000 !important;
			}
		}
	}
</style>