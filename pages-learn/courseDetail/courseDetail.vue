<template>
	<view class="bg">
		<!-- 头部 -->
		<view class="header_d">
			<image :src="courseData.courseImgPath" class="lunbotu"></image>
		</view>
		<!-- 课程标题 -->
		<view class="course_overview">
			<view class="ovs_1" style="display: flex;align-items: center;		margin-bottom: 18rpx;">
				<view class="ovs_1-1 two-row">{{ courseData.courseName }}</view>
				<view class="ovs_2">
					<!-- <text class="ovs_2-1">基础阶段</text> -->
					<text class="d1_t_2" style="color:#FFFFFF; background-color: #ffe2e0"
						v-if="courseData.learningPhase == 1">{{courseData.learningPhaseText}}</text>
					<text class="d1_t_2" style="color: #FFFFFF; background-color: #fff2e2"
						v-else-if="courseData.learningPhase == 2">{{courseData.learningPhaseText}}</text>
					<text class="d1_t_2" style="color: #FFFFFF; background-color: #f9f8d0"
						v-else-if="courseData.learningPhase == 3">{{courseData.learningPhaseText}}</text>
					<text class="d1_t_2" style="color: #FFFFFF; background-color: #eeffdb"
						v-else-if="courseData.learningPhase == 4">{{courseData.learningPhaseText}}</text>
					<text class="d1_t_2" style="color: #FFFFFF; background-color: #e5fdff"
						v-else-if="courseData.learningPhase == 5">{{courseData.learningPhaseText}}</text>
					<text class="d1_t_2" style="color: #FFFFFF; background-color: #f1f4fb"
						v-else-if="courseData.learningPhase == 6">{{courseData.learningPhaseText}}</text>
				</view>
			</view>
			<view class="ovs_1-2 two-row">{{ courseData.courseDescription }}</view>
		</view>
		<!-- 课节 -->
		<view class="class_section">
			<view v-for="(test1, idx1) in courseData.list" class="borse" :key="test1" style="margin-bottom: 21rpx;">
				<!-- 标题 -->
				<view class="dis-borderbox title_h" @click="openFun(test1.chapterid)">
					<view class="title-s">
						<Title :title="test1.chapterName" :type="test1.type" />
					</view>
					<view class="time_p">
						<view class="div1" v-if="test1.type == 1">
							<image v-if="test1.type == 1" :src="imageUrl+'/xing/zhibo.png'" mode="" class="icons">

								<image v-else :src="imageUrl+'/xing/sp.png'" mode="" class="icons2">
								</image>

								<text class="bytes">{{ test1.type == 1 ? "直播" : "视频" }}</text>
						</view>
						<view class="div12" v-else>
							<image v-if="test1.type == 1" :src="imageUrl + '/static/learn/liveIcons.png'" mode=""
								class="icons">

								<image v-else :src="imageUrl+'/xing/sp.png'" mode="" class="icons2">
								</image>

								<text class="bytes2">{{ test1.type == 1 ? "直播" : "视频" }}</text>
						</view>

						<text class="bytes" v-if="test1.type == 1">{{ test1.list.length || 0 }} 节</text>
						<text class="bytes2" v-else>{{ test1.list.length || 0 }} 节</text>

						<image :src="imageUrl+'/static/live/126shang.png'" mode="" class="more_icon"
							v-if="openArr.indexOf(test1.chapterid) != -1"></image>
						<image :src="imageUrl+'/static/live/126shang2.png'" mode="" class="more_icon" v-else>
						</image>
					</view>
				</view>
				<!-- 下拉 -->
				<view class="collapse"
					:style="{maxHeight: openArr.indexOf(test1.chapterid) != -1 ? `${test1.list.length * maxheight}rpx` : '0rpx'}">
					<!-- **************************************************** -->
					<!-- 在线↓ -->
					<view class="section_h" :style="{ height: `${maxheight}rpx` }" v-for="(test2, idx2) in test1.list"
						@click="goVideoRoom(test1, test2, idx1, idx2)" :key="test2">
						<view :class="{body_content:idx2!=test1.list.length-1,bodsecontent:idx2==test1.list.length-1,}"
							class="dis-borderbox">
							<!-- 头像 -->
							<!-- <image :src="test2.teacherImagePhoto" mode="" class="img_h"></image> -->

							<!-- 中间 -->
							<view class="yyy">
								<view class="ovs_1-1">
									<!-- <view class="iconsese">
										<image v-if="test1.type == 1" :src="imageUrl + '/static/learn/liveIcons.png'"
											mode="" class="icons"></image>
										<image v-else :src="imageUrl+'/static/video_1632402245294.png'" mode=""
											class="icons2"></image>
									</view> -->

									<text class="two-row colorse">{{ test2.liveClassroomName }}</text>
								</view>
								<view class="ovs_1-2">
									<text style="margin-right: 20rpx;">讲师：{{ test2.teacherName }}</text>
									<text v-if="test2.type == 2">{{ test2.duration }}</text>
									<view v-if="test2.type == 1">{{ test2.liveStartTime }}</view>
								</view>
							</view>
							<!-- 按钮 -->
							<view v-if="courseData.isNoBuy == 1">
								<!-- 已购买 -->
								<view class="startType" v-if="test2.liveClassroomStatus == 1 && test1.type == 1"
									:style="{'background-image': 'url('+imageUrl+'/static/startType2_1631613939749.png)'}">
									<image :src="imageUrl+'/xing/xq1.png'" mode="" class="live_icon">
									</image>
									<text class="ttt">待在线</text>
								</view>

								<view class="startType" v-else-if="test2.liveClassroomStatus == 2 && test1.type == 1"
									style="background: linear-gradient(90deg, #fd7a3f, #fa632b);">
									<image :src="imageUrl+'/xing/xq2.png'" mode="" class="live_icon">
									</image>
									<text class="ttt">在线中</text>
								</view>

								<view class="startType" v-else-if="test2.liveClassroomStatus == 3 && test1.type == 1"
									:style="{'background-image': 'url('+imageUrl+'/static/startType3_1631613967962.png)'}">
									<image :src="imageUrl+'/xing/xq1.png'" mode="" class="live_icon">
									</image>
									<text class="ttt">已结束</text>
								</view>

								<view class="startType" v-else-if="test2.liveClassroomStatus == 4 && test1.type == 1"
									:style="{'width': '144rpx','height': '44rpx','background': ' linear-gradient(0deg, #FFAB50 0%, #FF8707 100%)'}">
									<image :src="imageUrl+'/xing/xq3.png'" mode="" class="live_icon">
									</image>
									<text class="ttt">回放</text>
								</view>
								
								<view class="startType"
									v-if="test2.vid && test1.type == 2 && test2.lookPercentage==null"
									:style="{'width': '126rpx','height': '44rpx','background-image': 'url('+imageUrl+'/static/play_1632480625274.png)'}">
									<!-- <text class="ttt">已更新</text> -->
								</view>


								<view class="startType2"
									v-if="test2.lookPercentage!=null && test1.type == 2 &&test2.vid"
									:style="{'background': 'RGBA(228, 234, 249, 1)'}">
									<text v-if="test2.lookPercentage<100" :style="{'color':'#3787FF'}"
										class="ttt">已学{{test2.lookPercentage}}%</text>
									<text v-else-if="test2.lookPercentage>=100" :style="{'color':'#3787FF'}"
										class="ttt">已学完</text>
								</view>



								<view class="startType" v-if="!test2.vid && test1.type == 2"
									:style="{'width': '126rpx','height': '44rpx','background-image': 'url('+imageUrl+'/static/playD_1632480635217.png)'}">
									<!-- <text class="ttt">待更新</text> -->
								</view>
							</view>

							<view v-else>
								<!-- 未购买 -->
								<view
									v-if="test2.isAudition == 1 && test1.type == 1 && test2.unlock.unlockType!=9 && test2.unlock.isUnLock == 0"
									class="startType"
									:style="{'background-image': `url(${imageUrl}/ykstatic/beijchu.png)`,'background-size':'100%'}">
									<image class="size" :src="imageUrl + '/ykstatic/jiesuochu.png'" mode="">
									</image>
									解锁
								</view>
								<view class="startType" v-else-if="test2.isAudition == 1"
									:style="{'background-image': 'url('+imageUrl+'/static/2_1631860996325.png)'}">
									<text class="ttt" style="color: #65C300;">试听</text>
								</view>
								<view class="startType" v-else
									:style="{'background-image': 'url('+imageUrl+'/static/1_1631860917263.png)'}">
									<text class="ttt" style="color: #666666;">未订购</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>


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
	var app = getApp()
	import {
		getTitle
	} from "@/common/util/index.js";
	import {
		orderAdd
	} from "@/api/pay.js";
	import {
		getCourseDetail
	} from "@/api/learn.js";
	import Title from "@/components/title_comp.vue";
	import {
		getTemplateId,
		reserveLive,
		keyUnlock,
		shareUnlock,
	} from "@/api/homeAudition.js";
	// import Share from '@/components/uni-popup/uni-popup-share.vue'
	export default {
		components: {
			Title,
			// Share
		},
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
				shareUnlock({
					type: 0,
					courseId: this.unlock.id
				}).then(res => {
					console.log(res)
					this.isAss = false
					this.getCourseDetail()
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
			return {
				loginAss: getApp().globalData.loginAss,
				imageUrl: getApp().globalData.imageUrl,
				maxheight: 168,
				openArr: [],
				classId: "", //班级id
				courseId: "", //课程详情id
				courseData: {},
				uid: '',
				isAss: false,
				isREs: false,
				yaoqing: '',
				unlock: {},
				arr: [],
				objde: {}
			};
		},
		onLoad(options) {
			// console.log(options, '课程详情接受');
			// this.classId = options.classId;
			// this.courseId = options.courseId;
		},
		onShow(options) {
		
			let aaa = getCurrentPages()
			let nowPage = aaa[aaa.length - 1]; //当前页页面实例
			let prevPage = aaa[aaa.length - 2]; //上一页页面实例
			prevPage.$vm.tabbarIndex = 2; //修改上一页data里面的searchVal参数值为1211
			prevPage.$vm.setUpMajorAss = true; //修改上一页data里面的searchVal参数值为1211
			//#ifdef H5
			console.log(aaa[aaa.length - 1].options, '课程详情 测试用 1001')
	
			this.classId = aaa[aaa.length - 1].options.classId;
			this.courseId = aaa[aaa.length - 1].options.courseId;
			console.log(this.classId, this.courseId, '课程详情 测试用 1001.5')
			//#endif

			//#ifdef MP-WEIXIN
			// let thatPage = aaa[aaa.length - 1];
			this.classId = aaa[aaa.length - 1].options.classId;
			this.courseId = aaa[aaa.length - 1].options.courseId;
			//#endif
			// console.log(thatPage.options, 'videoroom页面接受值')

			if (uni.getStorageSync('userInfos').id) {
				this.uid = uni.getStorageSync('userInfos').id
			}
			this.getCourseDetail();
		},
		methods: {
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
			// 立即购买
			footHandleChange(val) {
				let detail = JSON.parse(JSON.stringify(val));
				if (detail.wdCourseSale.fficialPrice === 0) {
					this.generateOrder({
						// classId: this.courseData.id,
						// classesTypeId: detail.id,

						moduleCourseType: detail.type == '直播' ? 1 : 0,
						moduleCourseId: detail.id,
						// , 						orderAreaId: "", //收货地址ID
						// paperId: "", //试卷id 试卷传此参数
						qd: "3", //渠道 官网:1,经销商:2,小程序:3,IOS:4,安卓:5
					}, 1);

				} else {
					detail = Object.assign(detail, {
						moduleCourseType: detail.type == '直播' ? 1 : 0,
						moduleCourseId: detail.id,
						qd: "3", //渠道 官网:1,经销商:2,小程序:3,IOS:4,安卓:5
					});
					this.generateOrder(detail);

				}

			},
			//立即购买
			buyNow() {
				let token = uni.getStorageSync('token')
				if (!token) {
					this.loginAss = true
					// uni.navigateTo({
					// 	url: '/pages/login/login'
					// })
					return
				}
				this.footHandleChange(this.courseData)


			},
			guanbi(value) {
				this.loginAss = value
			},
			fuzhi() {
				uni.setClipboardData({
					data: this.unlock.unlock.teacherWx,
					success: function() {
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
					if (res.code == 200) {
						this.isREs = false
						this.getCourseDetail()
						uni.hideLoading()
						uni.showToast({
							title: '解锁成功',
							icon: "none"
						})

					}
				})
			},
			getCourseDetail() {
				getCourseDetail({
					classId: this.classId,
					courseId: this.courseId,
					uid: this.uid
				}).then(res => {
						if (res.code == 200 && res.result) {
							this.courseData = res.result;
							if (res.result.list) {
								if (res.result.list.length > 0) {
									this.openArr.push(res.result.list[0].chapterid)
								}
							}

						}
					}
				);
			},
			openFun(id) {
				console.log(id);
				// 判断数组里有无这个值,没有就代表这个下拉框没有展开
				const findIndex = this.openArr.indexOf(id);
				if (findIndex == -1) {
					// 没有找到就添加
					this.openArr.push(id);
				} else {
					// 找到就删除
					this.openArr.splice(findIndex, 1);
				}
			},
			SubscribeMessage(tId, id, idx1, idx2) {
				const that = this;
				wx.requestSubscribeMessage({
					tmplIds: [tId],
					success(res) {
						if (res[tId] == 'accept') {
							reserveLive({
								videoId: id
							}).then(data => {
								if (data.code == 200) {
									wx.showToast({
										title: '预约成功',
										icon: 'none'
									})
									that.courseData.list[idx1].list[idx2].isAgree = 1
								} else {
									wx.showToast({
										title: data.message,
										icon: 'none'
									})
								}
							})
						}
					}
				})
			},
			goVideoRoom(data1, data2, idx1, idx2) {
				app.goVideoRoom(data1, data2, idx1, idx2, this.courseData, this.classId, this.courseId)
				return
				console.log(this.courseData, '课程详情')
				console.log(data1, '章')
				console.log(data2, '节')
				this.arr = []
				this.objde = {}
				if (this.courseData.isNoBuy == 1) {
					// 如果课程买了
					this.courseData.list.forEach((item, index) => {
						console.log(item, '章')
						// this.arr=[]
						item.list.forEach((res) => {
							console.log(res, '节')
							this.arr.push({
								classid: this.classId,
								courseId: this.courseId,
								unitId: res.id,
								vid: res.vid,
								videoId: res.id,
								liveClassroomName: res.liveClassroomName,
								sourceType: res.sourceType
							})
						})
						// this.objde[index]=this.arr
					})

				} else {
					// 如果课程没买
					this.courseData.list.forEach((item, index) => {
						console.log(item, '章')
						item.list.forEach((res) => {
							console.log(res, '节')
							if (res.liveClassroomStatus == 2 || res.liveClassroomStatus == 4 || res
								.isAudition == 1) {
								this.arr.push({
									classid: this.classId,
									courseId: this.courseId,
									unitId: res.id,
									vid: res.vid,
									videoId: res.id,
									liveClassroomName: res.liveClassroomName,
									sourceType: res.sourceType
								})
							}
						})
						// this.objde[index]=this.arr
					})
				}

				console.log(this.arr, '播放列表')
				if (this.courseData.isNoBuy == 1) {
					// 如果课程买了
					this.audition(data1, data2, idx1, idx2)
				} else {
					// 如果课程没买
					if (data2.isAudition == 1) {
						this.audition(data1, data2, idx1, idx2)
					} else {
						uni.showToast({
							title: '尚未购买此课程',
							icon: 'none'
						})
					}
				}
			},
			audition(data1, data2, idx1, idx2) {
				console.log(data1, '章')
				console.log(data2, '节')
				console.log(idx1, '章索引')
				console.log(idx2, '节索引')
				if (data1.type == 1) {
					// 直播
					//在线
					if (this.courseData.isNoBuy == 0 && data2.unlock.unlockType != 9 && data2.unlock.isUnLock == 0) {
						this.unlock = data2
						if (data2.unlock.unlockType == 1) {
							this.isAss = true
							this.isREs = false
						} else if (data2.unlock.unlockType == 0) {
							this.isREs = true
							this.isAss = false
						}
					} else if (data2.liveClassroomStatus == 1) {
						//在线中，进入观看
						// uni.setStorageSync('materials', data.materials)
						uni.navigateTo({
							url: `/pages/webView/webView?channel=${data2.channel}&classid=${this.classId}&courseId=${this.courseId}&unitId=${data2.id}`
						})
						//未开播，可设置提醒（微信订阅消息）
						// if (data2.isAgree != 1) {
						// 	getTemplateId({
						// 		type: 1
						// 	}).then(res => {
						// 		if (res.result && res.result[0]) {
						// 			this.SubscribeMessage(res.result[0].templateId, data2.id, idx1, idx2)
						// 		}
						// 	})
						// }
					} else if (data2.liveClassroomStatus == 2 && data2.channel) {
						//在线中，进入观看
						// uni.setStorageSync('materials', data.materials)
						uni.navigateTo({
							url: `/pages/webView/webView?channel=${data2.channel}&classid=${this.classId}&courseId=${this.courseId}&unitId=${data2.id}`
						})
					} else if (data2.liveClassroomStatus == 4) {
						//在线结束可回放
						uni.navigateTo({
							url: `/pages/webView/webView?channel=${data2.channel}&classid=${this.classId}&courseId=${this.courseId}&unitId=${data2.id}`
						})
						// if (data2.vid) {
						// 	uni.setStorageSync('materials', data2.materials)
						// 	uni.navigateTo({
						// 		url: `/pages/videoRoom/videoRoom?vid=${data2.vid}&videoId=${data2.id}&classid=${this.classId}&courseId=${this.courseId}&unitId=${data2.id}`
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

				} else {
					// 视频
					if (data2.vid) {
						uni.setStorageSync('materials', data2.materials)
						uni.navigateTo({
							url: `/pages/videoRoom/videoRoom?vid=${data2.vid}&videoId=${data2.id}&classid=${this.classId}&courseId=${this.courseId}&unitId=${data2.id}&arr=${JSON.stringify(this.arr)}&sourceType=${data2.sourceType}`,
						});
					} else {
						uni.showToast({
							title: '视频暂未更新',
							icon: 'none'
						})
					}
				}
			}
		},
	};
</script>

<style lang="scss" scoped>
	.bg {
		min-height: 100%;
		background: #fafafa;
	}

	.div12 {
		padding: 5rpx 10rpx;
		background: #DEF0FF;
		border-radius: 8rpx;
		font-size: 20rpx;
		font-weight: bold;
		color: #3787FF;
	}

	.div1 {
		padding: 5rpx 10rpx;
		background: #FFECE3;
		border-radius: 8rpx;
		font-size: 20rpx;
		font-weight: bold;
		color: $uni-primary;
	}

	.borse {
		background-color: #fff;
		border-radius: 20rpx 20rpx 20rpx 20rpx !important;
	}

	.footerCon {
		width: 100%;
		height: 140rpx;
		background-color: #ffffff;
		box-shadow: 0rpx 2rpx 16rpx 0rpx rgba(0, 0, 0, 0.2);
		padding: 0 40rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 999;

		.leftCon {
			padding-top: 14rpx;
			width: 110rpx;
			border-left: 1rpx solid #f3f3f3;
			border-right: 1rpx solid #f3f3f3;
			display: flex;
			flex-direction: column;
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
			}

			.phoneImg {
				width: 47rpx;
				height: 47rpx;
			}
		}

		.priceCon {
			font-size: 30rpx;
			font-weight: bold;
			color: #333333;
			// display: flex;
			// flex-direction: column;

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

	// 头部banner
	.header_d {
		position: relative;
		// height: 575rpx;
		width: 100%;

		// height: 350rpx;
		 height: 475rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		.lunbotu {
			width: 709rpx;
			border-radius: 8rpx;
			// height: 300rpx;
			height: 475rpx;
		}
	}

	.d1_t_2 {
		font-size: 26rpx;
		padding: 5rpx 10rpx;
		background: linear-gradient(0deg, #DBA17A 0%, #C89181 100%);
		border-radius: 8rpx;
		margin-left: 16rpx;
	}

	.ovs_1 {
		flex: 1;
		padding-right: 30rpx;
	}

	// .ovs_2{
	// 	min-width: 140rpx;
	// }

	.ovs_1-1 {
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		display: flex;
	}

	.ovs_1-2 {
		font-size: 22rpx;
		font-weight: 500;
		color: #999999;
		display: flex;
		align-items: center;
	}

	// 课程标题
	.course_overview {
		width: 713rpx;
		box-sizing: border-box;
		padding: 26rpx 28rpx;
		// height: 125rpx;
		margin: 0 auto;

		background-color: #fff;
		box-shadow: 0rpx 4rpx 19rpx 2rpx rgba(214, 214, 214, 0.17);
		border-radius: 20rpx;

		.ovs_2-1 {
			padding: 13rpx 14rpx;
			background-color: #fff2e2;
			color: #fd8c01;
		}
	}

	// 课节
	.class_section {
		margin: 20rpx auto 0;
		padding-bottom: 180rpx;
		width: 690rpx;
		border-radius: 20px;

		// 公共样式display布局
		.dis-borderbox {
			width: 690rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.title-s {
				width: 700rpx;
			}

			// 消除组件的margin
			.title-item {
				margin: 0;
			}

			// 标题的右边
			.time_p {
				display: flex;
				justify-content: space-around;
				align-items: center;
				width: 520rpx;

				.icons {
					width: 21rpx;
					height: 13rpx;
				}

				.icons2 {
					width: 23rpx;
					height: 17rpx;
				}

				.bytes2 {
					font-size: 20rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #3787FF;
					padding: 5rpx 10rpx;
					background: #DEF0FF;
					border-radius: 8rpx;
				}

				.bytes {
					padding: 5rpx 10rpx;
					background: #FFECE3;
					border-radius: 8rpx;
					font-size: 20rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: $uni-primary;
				}

				.more_icon {
					width: 22rpx;
					height: 12rpx;
				}
			}
		}

		// 标题
		.title_h {
			height: 130rpx;
			padding: 0rpx 39rpx 0rpx 28rpx;
			// border-bottom: 2rpx solid #dddddd;
		}

		.startType {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 144rpx;
			height: 48rpx;
			border-radius: 24rpx;
			font-size: 24rpx;
			font-weight: 500;
			color: #ffffff;
			padding: 0;
			// margin-left: 10rpx;
			line-height: 1.7;
			border: 0;
			background-repeat: no-repeat;
			background-size: 100% 100%;

			image {
				width: 28rpx;
				height: 28rpx;
				margin-right: 6rpx;
			}

			.live_icon {
				width: 32rpx;
				height: 32rpx;
				margin-right: 17rpx;
			}

			.ttt {
				display: inline-block;
				margin: 0;
			}
		}

		.startType2 {
			display: flex;
			align-items: center;
			justify-content: space-around;
			width: auto;
			height: 48rpx;
			padding-right: 10rpx;
			padding-left: 10rpx;
			border-radius: 24rpx;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #ffffff;
			// padding: 0;
			// margin-left: 10rpx;
			line-height: 1.7;
			border: 0;
			background-repeat: no-repeat;
			background-size: 100% 100%;

			.live_icon {
				width: 32rpx;
				height: 32rpx;
				margin-right: 17rpx;
			}

			.ttt {
				display: inline-block;
				margin: 0;
			}
		}

		// 下拉
		.collapse {
			width: 100%;
			background-color: #fff;
			overflow-y: hidden;
			transition: all 0.5s;

			border-radius: 0 0 20rpx 20rpx;


			.section_h {
				padding: 0 30rpx;

				.bodsecontent {
					width: 100%;
					height: 100%;
					// border-bottom: 2rpx solid #dddddd;

					.iconsese {
						// width: 35rpx;
						// height: 35rpx;
						margin-right: 12rpx;


						.icons {
							width: 21rpx;
							height: 13rpx;
						}

						.icons2 {
							width: 23rpx;
							height: 17rpx;
						}
					}

					.colorse {
						font-size: 28rpx;
						font-weight: 400;
						color: #333333;
						margin-bottom: 30rpx;
					}

					.icons {
						width: 35rpx;
						height: 35rpx;
					}

					.yyy {
						width: 416rpx;
					}

					.btn-operation--s {
						.btn--s::after {
							border: 0 !important;
							padding: 0 !important;
						}
					}
				}

				.body_content {
					width: 100%;
					height: 100%;
					border-bottom: 2rpx solid #dddddd;

					.iconsese {
						// width: 35rpx;
						// height: 35rpx;
						margin-right: 12rpx;


						.icons {
							width: 21rpx;
							height: 13rpx;
						}

						.icons2 {
							width: 23rpx;
							height: 17rpx;
						}
					}

					.colorse {
						font-size: 28rpx;
						font-weight: 400;
						color: #333333;
						margin-bottom: 30rpx;
					}

					.icons {
						width: 35rpx;
						height: 35rpx;
					}

					.yyy {
						width: 416rpx;
					}

					.btn-operation--s {
						.btn--s::after {
							border: 0 !important;
							padding: 0 !important;
						}
					}
				}
			}
		}
	}
</style>
