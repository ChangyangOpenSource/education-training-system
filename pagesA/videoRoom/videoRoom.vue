<template>
	<view class="onse">
		<view class="materiales" id="videoRoom" v-if="mediaType==1">
	<!-- 		<polyv-player id="playerId" :playerId="playerId" :showQualityBtn="false" @playing="playing" :vid="vid"
				@ended="ended" :showControls="true" :autoplay="true" height="430rpx"> </polyv-player> -->
			<!-- 课程标题 -->
			<view class="course_overview">
				<view class="ovs_1">
					<view class="ovs_1-1 two-row">{{ courseData.resourcesName }}</view>
					<view class="ovs_1-2 two-row">{{ courseData.resourcesDescribe }}</view>
				</view>
			</view>
			<!-- 课节 -->
			<scroll-view @scrolltolower='scroll' lower-threshold="" class="class_section"
				v-if="courseData.resourcesType==1">
				<view v-for="(test1, idx1) in courseData.wdResourcesTemplatesList" :key="test1">
					<!-- 标题 -->
					<view class="dis-borderbox title_h" @click="openFun(test1.id)">
						<view class="title-s">
							<!-- {{test1.templateName}} -->
							<Title :title="test1.templateName" :type="4" />
						</view>
						<view class="time_p">
							<image :src="imageUrl + '/static/learn/closeIcon.png'" mode="" class="more_icon"
								v-if="openArr.indexOf(test1.id) != -1"></image>
							<image :src="imageUrl + '/static/learn/openIcon.png'" mode="" class="more_icon" v-else>
							</image>
						</view>
					</view>
					<!-- 下拉 -->
					<view :class="{'collapse':true,'marbottonm':openArr.indexOf(test1.id) != -1}"
						:style="{maxHeight: openArr.indexOf(test1.id) != -1 ? `${test1.wdMediaResourcesTemplates.length * maxheight}rpx` : '0rpx'}">
						<!-- **************************************************** -->
						<!-- 在线↓ -->
						<view :class="{'background':test2.id==unitId,'section_h':true}" @click="onVideo(test2)"
							:style="{ height: `${maxheight}rpx` }"
							v-for="(test2, idx2) in test1.wdMediaResourcesTemplates" :key="test2">
							<view
								:class="{'body_content':test2.id!=unitId,'body_content2':test2.id==unitId ,'dis-borderbox':true}">
								<!-- 中间 -->
								<view class="yyy">
									<view>

										<view :class="{'two-rowsw2':test2.id!=unitId,'two-rowsw3':test2.id==unitId}">
											{{ test2.mediaName }}
										</view>
									</view>
								</view>

							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<view class="datika" v-if="courseData.resourcesType==2">
				<view :class="{'boredr':value.id!=unitId,'boredr2':value.id==unitId}"
					v-for="(value,index) in courseData.wdMediaResourcesTemplateList" :key='index'
					@click="onVideo(value)">
					<view class="border-text">
						{{index+1}}
					</view>
				</view>

			</view>
		</view>


		<view class="materialese" id="videoRooms" v-else>
			<!-- 课节 -->
			<scroll-view @scrolltolower='scroll' lower-threshold="" class="class_sectionqw"
				v-if="courseData.resourcesType==1">
				<view v-for="(test1, idx1) in courseData.wdResourcesTemplatesList" :key="test1">
					<!-- 标题 -->
					<view class="dis-borderbox title_h" @click="openFun(test1.id)">
						<view class="title-s">
							<!-- {{test1.templateName}} -->
							<Title :title="test1.templateName" :type="4" />
						</view>
						<view class="time_p">
							<image :src="imageUrl + '/static/learn/closeIcon.png'" mode="" class="more_icon"
								v-if="openArr.indexOf(test1.id) != -1"></image>
							<image :src="imageUrl + '/static/learn/openIcon.png'" mode="" class="more_icon" v-else>
							</image>
						</view>
					</view>
					<!-- 下拉 -->
					<view :class="{'collapse':true,'marbottonm':openArr.indexOf(test1.id) != -1}"
						:style="{maxHeight: openArr.indexOf(test1.id) != -1 ? `${test1.wdMediaResourcesTemplates.length * maxheight}rpx` : '0rpx'}">
						<!-- **************************************************** -->
						<!-- 在线↓ -->
						<view :class="{'background2':test2.id==unitId,'section_h':true}" @click="onVideo(test2)"
							:style="{ height: `${maxheight}rpx` }"
							v-for="(test2, idx2) in test1.wdMediaResourcesTemplates" :key="test2">
							<view
								:class="{'body_content':test2.id!=unitId,'body_content2':test2.id==unitId ,'dis-borderbox':true}">
								<!-- 中间 -->
								<view class="yyy">
									<view>
										<view :class="{'two-rowsw22':test2.id!=unitId,'two-rowsw33':test2.id==unitId}">
											{{ test2.mediaName }}
										</view>
									</view>
									<view class="">
										<image class="youfanhui" src="@/static/youfanhui.png" mode=""></image>
									</view>
								</view>

							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<view class="datika" v-if="courseData.resourcesType==2">
				<view :class="{'boredr':value.id!=unitId,'boredr2':value.id==unitId}"
					v-for="(value,index) in courseData.wdMediaResourcesTemplateList" :key='index'
					@click="onVideo(value)">
					<view class="border-text">
						{{index+1}}
					</view>
				</view>

			</view>
		</view>
		<!--  -->
		<!-- <view v-if="isAss==1 || isAss=='true'" class="back-tan">
			<view class="color12">
				加载中，请稍等
			</view>
			<view class="color12">
				....
			</view>
		</view> -->
		<view v-show='loginAss' class="back-tankuang">
			<login class="loginw" @guanbi='guanbi' />
		</view>
	</view>

</template>
<script>
	import Title from "@/components/title_comp.vue";
	import {
		findByMedial
	} from "@/api/homeAudition.js";
	import {
		courseRecord,
		wxLogin,
		bindinMajor
	} from "@/api/login.js";
	import {
		getMajor
	} from "@/api/professionalChoice.js";
	import {
		setUserInfo,
		setToken,
		getMajorInfo,
		setMajorInfo
	} from "@/common/util/index.js";
	import {
		addLearn,
		updateCoursePlayCount,
		queryMaterial,
		getCourseIsNoBuy,
		getVidByUnitId,
	} from '@/api/learn.js';

	let polyvPlayerContext;
	export default {
		components: {
			Title,
			// Share
		},
		data() {
			return {
				imageUrl: getApp().globalData.imageUrl,
				maxheight: 81,
				openArr: [],
				classId: "", //班级id
				courseId: "", //课程详情id
				courseData: {
					resourcesType: ''
				},
				uid: '',
				isREs: false,
				yaoqing: '',
				unlock: {},
				loging: false,
				isLoading: false,
				vid: '',
				playerId: 'polyvPlayer',
				videoId: '',
				learnState: 1,
				src: "https://go.plvideo.cn/front/video/view?vid=b7130a8d0b6007a2fd4365c634401bf5_b",
				current: 0,
				//   弹幕列表
				danmuList: [],
				//   输入的弹幕
				danmuValue: "",
				materialsList: [],
				pHeight: 84,
				classid: '',
				courseId: '',
				unitId: '',
				JSONstr: '',
				olvideoId: '',
				resources: '',
				resourcesType: '',
				template: '',
				mediaId: '',
				loginAss: getApp().globalData.loginAss,
				mediaType: '',
				isAss: 1,
				chucunlong: 0,
				seconds: 0
			};
		},
		onHide() {
			console.log('likai')
			console.log(this.videoId)
			if (this.videoId) {
				let duration = polyvPlayerContext.getDuration()
				if (this.learnState == 2) {
					courseRecord({
						courseId: this.videoId,
						seconds: this.seconds,
						isTime: this.formatSeconds(duration),
						isType: 1
					}).then(res => {}).catch(err => {})
				} else {
					let hms = this.formatSeconds(polyvPlayerContext.getCurrentTime())
					courseRecord({
						courseId: this.videoId,
						isTime: hms,
						seconds: this.seconds,
						isType: 1
					}).then(res => {}).catch(err => {})
				}

			}
		},
		onUnload() {
			console.log('likai', 12321321321321321213)
			// uni.removeStorage('resour');
			uni.removeStorageSync('resour');
			uni.removeStorageSync('shareUrl')
			if (this.videoId) {
				let duration = polyvPlayerContext.getDuration()
				if (this.learnState == 2) {
					courseRecord({
						courseId: this.videoId,
						seconds: this.seconds,
						isTime: this.formatSeconds(duration),
						isType: 1
					}).then(res => {}).catch(err => {})
				} else {
					let hms = this.formatSeconds(polyvPlayerContext.getCurrentTime())
					courseRecord({
						courseId: this.videoId,
						seconds: this.seconds,
						isTime: hms,
						isType: 1
					}).then(res => {}).catch(err => {})
				}
			}
		},
		// onLoad(options) {
		// 	console.log(options)


		// },
		onShow() {
			setInterval(() => {
				this.seconds++
			}, 1000)
			if (this.isAss == 1 || this.isAss == true) {
				uni.showLoading({
					title: '加载中'
				});
			}

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
			console.log(thatPage.options)
			console.log(this.isAss)
			// let arr = decodeURIComponent(// let arr = decodeURIComponent(
			// 	"https%3A%2F%2Fyixue.wendu.com%2Fqr%2F%3Fresources%3D1565520728395108353%26resourcesType%3D1%26template%3D1453171278864470017%26mediaId%3D1565585877453770753"
			// )


			if (uni.getStorageSync("resour")) {
				let resour = uni.getStorageSync("resour")
				console.log(resour)
				this.resources = resour.resources,
					this.resourcesType = resour.resourcesType,
					this.template = resour.template,
					this.mediaId = resour.mediaId
				this.isAss = resour.isAss
			} else if (uni.getStorageSync("resourLogin")) {
				let resour = uni.getStorageSync("resourLogin")
				console.log(resour)
				this.resources = resour.resources,
					this.resourcesType = resour.resourcesType,
					this.template = resour.template,
					this.mediaId = resour.mediaId
				this.isAss = resour.isAss
			} else {
				// var arr = decodeURIComponent(
				// 	'?isAss%3Dtrue%26resources%3D1565520728395108353%26resourcesType%3D1%26template%3D1453171278864470017%26mediaId%3D1565585877453770753'
				// )
				var arr = decodeURIComponent(
					thatPage.options.q
				)
				console.log(arr, 'opi')
				let splitURL = arr.split("?")[1].split("&");

				for (var i = 0; i < splitURL.length; i++) {
					var searchkey = "";
					// 按照具体的参数字段查找
					if (splitURL[i].indexOf("isAss=") != -1) {
						this.isAss = splitURL[i].split("isAss=")[1];
						console.log(this.isAss, '0990')
					}
					if (splitURL[i].indexOf("resources=") != -1) {
						this.resources = splitURL[i].split("resources=")[1];
						console.log(this.resources)
					}
					if (splitURL[i].indexOf("resourcesType=") != -1) {
						this.resourcesType = splitURL[i].split("resourcesType=")[1];
						console.log(this.resourcesType)
					}
					if (splitURL[i].indexOf("template=") != -1) {
						this.template = splitURL[i].split("template=")[1];
						console.log(this.template)
					}
					if (splitURL[i].indexOf("mediaId=") != -1) {
						this.mediaId = splitURL[i].split("mediaId=")[1];
						console.log(this.mediaId)
					}

				}
				let obj = {
					resources: this.resources,
					isAss: this.isAss,
					resourcesType: this.resourcesType,
					template: this.template,
					mediaId: this.mediaId
				}

				uni.setStorageSync('resour', obj)
			}
			var token = wx.getStorageSync('token')
			console.log(token, 'ppppppp')
			if (!token) {
				console.log('jinru')
				if (thatPage.options.q) {
					uni.hideLoading();
					this.setShareUrl({
						scene: thatPage.options.scene
					})
				} else {
					uni.hideLoading();
					this.setShareUrl(thatPage.options)
				}

				// uni.reLaunch({
				// 	url: "/pages/login/login",
				// });
				return
			}


			this.getCourseDetail();
			// }, 2000)
			console.log(this.courseData)

		},
		methods: {
			setShareUrl(options) {
				try {
					let shareUrl = '/pagesA/videoRoom/videoRoom?';
					if (this.isAss) shareUrl += 'isAss=' + this.isAss + '&'
					if (this.mediaId) shareUrl += 'mediaId=' + this.mediaId + '&'
					if (this.resources) shareUrl += 'resources=' + this.resources + '&'
					if (this.resourcesType) shareUrl += 'resourcesType=' + this.resourcesType + '&'
					if (this.template) shareUrl += 'template=' + this.template + '&'
					uni.setStorageSync('shareUrl', shareUrl)
					console.log('新登录')
					this.loginAss = true
				} catch (e) {
					// error
				}
			},
			setShokjw(options) {
				try {
					let shareUrl = '/pagesA/videoRoom/videoRoom?';
					if (this.isAss) shareUrl += 'isAss=' + this.isAss + '&'
					if (this.mediaId) shareUrl += 'mediaId=' + this.mediaId + '&'
					if (this.resources) shareUrl += 'resources=' + this.resources + '&'
					if (this.resourcesType) shareUrl += 'resourcesType=' + this.resourcesType + '&'
					if (this.template) shareUrl += 'template=' + this.template + '&'
					uni.setStorageSync('shareUrl', shareUrl)
					console.log('新登录')
					uni.navigateTo({
						url: "/pagesA/setUpMajor/setUpMajor",
					});
				} catch (e) {
					// error
				}
			},
			guanbi(value) {
				this.loginAss = value
			},
			openFun(id) {
				console.log(id);
				// 判断数组里有无这个值,没有就代表这个下拉框没有展开
				const findIndex = this.openArr.indexOf(id);
				if (findIndex == -1) {
					// 没有找到就添加
					this.openArr = (id);
				} else {
					// 找到就删除
					this.openArr = [];
				}

				console.log(this.openArr, '12')
			},
			formatSeconds(value) {
				var secondTime = parseInt(value); // 秒
				var minuteTime = 0; // 分
				var hourTime = 0; // 小时
				if (secondTime >= 60) {
					minuteTime = parseInt(secondTime / 60);
					secondTime = parseInt(secondTime % 60);
					if (minuteTime >= 60) {
						hourTime = parseInt(minuteTime / 60);
						minuteTime = parseInt(minuteTime % 60);
					}
				}
				var result = "" + (parseInt(secondTime) < 10 ? "0" + parseInt(secondTime) : parseInt(secondTime));

				// if (minuteTime > 0) {
				result = "" + (parseInt(minuteTime) < 10 ? "0" + parseInt(minuteTime) : parseInt(minuteTime)) +
					":" +
					result;
				// }
				// if (hourTime > 0) {
				result = "" + (parseInt(hourTime) < 10 ? "0" + parseInt(hourTime) : parseInt(hourTime)) + ":" +
					result;
				// }
				return result;
			},
			//   添加弹幕
			sendDanmu() {
				//   this.videoContext.sendDanmu({
				//     text: this.danmuValue,
				//     color: "#fff",
				//   });
				this.danmuList.push({
					text: this.danmuValue,
				});
				this.danmuValue = "";
			},
			// 视频播放插件报错执行
			videoErrorCallback(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false,
				});
			},
			onVideo(value, on) {
				if (on == 12) {
					this.chucunlong = 1
				}
				console.log(value, 'chucuongos')
				console.log(this.mediaType, 1232131321321313)
				try {
					if (value.courseName) {
						uni.setNavigationBarTitle({
							title: value.mediaName
						})
					}
				} catch (e) {
					// error
				}

				if (this.mediaType == 1) {
					if (value.mediaMaterial) { //video视频与在线的单元ID
						this.vid = value.mediaMaterial
						this.videoId = value.mediaId
						this.unitId = value.id
						console.log(this.vid, 'vid')
						polyvPlayerContext = this.selectComponent('#playerId');
						console.log(polyvPlayerContext)
					}
				} else {
					if (value.resourcesTemplateId) {
						this.template = value.resourcesTemplateId
					}
					console.log(this.mediaType, 1232131321321313)
					this.openArr = []
					this.unitId = value.id
					uni.reLaunch({
						url: `/pagesA/graphic/graphic?value=${encodeURIComponent(JSON.stringify(value))}&resources=${this.resources}&resourcesType=${this.resourcesType}&template=${this.template}&mediaId=${this.unitId}`
					})
				}
			},
			playing(e) {

			},
			ended() {
				this.learnState = 2
				// this.addLearn()
			},
			getCourseDetail() {
				uni.showLoading({
					mask: true,
					title: '加载中'
				})
				console.log(9999999999)
				const that = this;
				findByMedial({
					mediaResourcesId: this.resources,
				}).then(
					(res) => {
						if (this.isAss != 'true') {
							uni.hideLoading();
						}

						console.log(res)
						this.mediaType = res.result.mediaType
						uni.hideLoading()
						this.courseData = res.result
						if (res.result == 'login') {
							// uni.setStorageSync('shareUrl','/pagesA/videoRoom/videoRoom')
							this.loginAss = true
						} else {
							uni.removeStorageSync('resourLogin');
						}
						if (this.resourcesType == this.courseData.resourcesType) {
							if (this.resourcesType == 1) {
								this.openFun(this.template)
								this.courseData.wdResourcesTemplatesList.forEach((res) => {
									console.log(res, 'iop', this.template)
									if (res.id == this.template) {
										console.log(res, 'pops')
										res.wdMediaResourcesTemplates.forEach((item) => {
											console.log(item.id, '0909', this.mediaId)
											if (item.id == this.mediaId) {
												console.log(this.mediaType, '0909.')
												// if (this.mediaType == 1 || this.isAss == 'true') {
												this.onVideo(item, 12)
												return
												// }
											}
										})
										if (this.chucunlong == 0) {
											console.log('chucunlong')
											uni.showToast({
												title: "暂无媒体资源",
												icon: "none",
											});
										}

									}

								})

							} else {
								console.log(this.courseData, 'ojo')
								this.courseData.wdMediaResourcesTemplateList.forEach((res) => {
									console.log(res.id)
									if (res.id == this.mediaId) {
										if (this.mediaType == 1) {
											this.onVideo(res, 12)
										}
									}
								})
								if (this.chucunlong == 0) {
									console.log('chucunlong')
									uni.showToast({
										title: "暂无媒体资源",
										icon: "none",
									});
								}
							}

						}
						console.log(res)
					}
				);
			},
			// 第一步
			async login(data) {
				uni.showLoading({
					mask: true,
					title: '加载中'
				})
				const val = await wxLogin({
					code: this.code,
					type: "1",
					location: this.location
				});
				console.log(val, '登录')
				if (val.result.userInfo) {
					if (val.result.userInfo.majorId) {
						const res = await getMajor();
						res.result.forEach((rest) => {
							console.log(rest)
							rest.wdResourcesMajorList.forEach((item) => {
								if (item.id == val.result.userInfo.majorId) {
									console.log(item)
									setMajorInfo(item)
								}
							})
						})
					}
				}

				if (val.result.token) {
					setToken(val.result.token);
					setUserInfo(val.result.userInfo);
					console.log(getMajorInfo().id)
					this.getCourseDetail();
					if (getMajorInfo().id) {

						let shareUrl = ''
						try {
							shareUrl = uni.getStorageSync('shareUrl')
						} catch (err) {}
						if (shareUrl) {
							uni.reLaunch({
								url: shareUrl
							})
						} else {
							// uni.switchTab({
							// 	url: "/pages/home/home",
							// })
							// uni.switchTab({
							// 	url: "/pages/home/home",
							// 	success: function(e) {
							// 		var page = getCurrentPages().pop(); //当前页面
							// 		if (page == undefined || page == null) return;
							// 		page.onLoad(); //或者其它操作
							// 	}
							// })
						}

						// uni.navigateBack()
					} else {
						let shareUrl = ''
						try {
							shareUrl = uni.getStorageSync('shareUrl')
						} catch (err) {}
						if (shareUrl) {
							console.log(123)
							uni.reLaunch({
								url: shareUrl
							})
						} else {
							// uni.navigateTo({
							// 	url: "/pagesA/setUpMajor/setUpMajor",
							// });
						}

					}
					uni.hideLoading()
				} else {
					uni.navigateTo({
						url: `/pages/mobilePhone/mobilePhone?unionid=${val.result.unionid}&openid=${
			  val.result.openid
			}&sessionKey=${val.result.session_key}&info=${JSON.stringify(
			  data.userInfo
			)}`,
					});
				}
				this.isLoading = false
			},
			async appLoginWx() {
				console.log(123)
				const that = this;
				if (this.isLoading == false) {
					this.isLoading = true
					uni.login({
						provider: "weixin",
						success: (res2) => {
							console.log(res2)
							that.code = res2.code;
							// const valdsa = bindinMajor({
							// 	majorId: getMajorInfo().id
							// });
						},
						fail: () => {
							uni.showToast({
								title: "微信登录授权失败",
								icon: "none",
							});
							that.isLoading = false
						},
					});
					uni.getUserProfile({
						desc: "正在获取", //不写不弹提示框
						success: function(res) {
							// 我的页面头像和名字在这里保存的，手机号授权页面的请求也会用到微信名和头像
							that.login(res);

						},
						fail: function(err) {
							uni.showToast({
								title: "微信登录授权失败",
								icon: "none",
							});
							that.isLoading = false
						},
					});
				}

			},

		},
	};
</script>

<style lang="scss" scoped>
	.youfanhui {
		width: 14rpx;
		height: 25rpx;
	}

	.color12 {
		color: #FFFFFF;
		font-size: 48rpx;
	}

	.back-tan {
		position: fixed;
		top: 0;
		width: 100%;
		left: 0rpx;
		z-index: 99999;
		height: 100%;
		background: rgba(51, 51, 51, 1);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-bottom: 150rpx;
	}

	#videoRoom {
		height: 100%;
		width: 100%;
		padding-top: 400rpx;
		background-color: rgba(243, 243, 243, 0.6);
		overflow: hidden;
	}

	#videoRooms {
		height: 100%;
		width: 100%;
		// padding-top: 40rpx;
		background-color: rgba(243, 243, 243, 0.6);
		overflow: hidden;
	}

	#playerId {
		position: fixed;
		top: 00rpx;
		left: 50%;
		margin-left: -346rpx;
		width: 690rpx;
		z-index: 999999;
		background: rgba(27, 27, 27, 0.28);
		border-radius: 10rpx 10rpx 0rpx 0rpx;
	}

	.background {
		padding: 0 30rpx;
		background: #E4EAF9;
		font-size: 28rpx;
		font-family: PingFang SC;
		color: #3B7BFF;
		font-weight: 500;
	}

	.background2 {
		// padding: 0 30rpx;
		background: #E4EAF9;
		font-size: 28rpx;
		font-family: PingFang SC;
		color: #3B7BFF;
		font-weight: 500;
	}

	.two-rowsw2 {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #727272;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.two-rowsw22 {
		font-size: 28rpx;
		font-weight: 500;
		color: #727272;
		width: 600rpx;
		margin-left: 65rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.two-rowsw3 {
		font-size: 28rpx;

		font-weight: 500;
		color: #3B7BFF;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.two-rowsw33 {
		font-size: 28rpx;
		font-weight: 500;
		color: #3B7BFF;
		margin-left: 65rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}


	.marbottonm {
		// margin-bottom: 18rpx;
	}

	.materiales {
		padding: 30rpx 30rpx;
	}

	.datika {
		display: flex;
		padding: 30rpx 16rpx;
		width: 690rpx;
		margin-top: 240rpx;
		// height: 787px;
		background: #FFFFFF;
		border-radius: 10px;
		// justify-content: space-between;
		flex-wrap: wrap;
	}

	.boredr2 {
		width: 80rpx;
		height: 80rpx;
		background: #3B7BFF;
		border-radius: 50%;
		margin-right: 24rpx;
		margin-left: 24rpx;
		margin-bottom: 49rpx;
		line-height: 85rpx;
		text-align: center;
		// display: flex;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		// align-items: center;
		// justify-content: center;
	}

	.boredr {
		background: url(../../static/椭圆1.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 80rpx;
		height: 85rpx;
		// background: #3B7BFF;
		border-radius: 50%;
		line-height: 85rpx;
		text-align: center;
		margin-right: 24rpx;
		margin-left: 24rpx;
		margin-bottom: 49rpx;
		// display: flex;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #2BAEDA;
		// align-items: center;
		// justify-content: center;
	}

	// .border-text {
	// 	font-size: 32rpx;
	// 	font-family: PingFang SC;
	// 	font-weight: 500;
	// 	color: #2BAEDA;
	// }

	// .border-text2 {
	// 	font-size: 32rpx;
	// 	font-family: PingFang SC;
	// 	font-weight: bold;
	// 	color: #FFFFFF;
	// }

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

		.lunbotu {
			width: 100%;
			height: 430rpx;
		}
	}

	.d1_t_2 {
		font-size: 26rpx;
		padding: 12rpx 14rpx;
		border-radius: 6rpx;
	}

	.ovs_1 {
		flex: 1;
		// height: 170rpx;
		padding-right: 30rpx;
	}

	// .ovs_2{
	// 	min-width: 140rpx;
	// }

	.ovs_1-1 {
		margin-bottom: 18rpx;
		font-size: 28rpx;
		font-weight: bold;
		color: #333333;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.ovs_1-2 {
		font-size: 28rpx;
		font-weight: 500;
		color: #666666;
	}

	// 课程标题
	.course_overview {
		width: 690rpx;
		box-sizing: border-box;
		padding: 0 28rpx;
		height: 170rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
		box-shadow: 0rpx 0rpx 10rpx 0rpx rgba(69, 69, 69, 0.1700);
		border-radius: 0rpx 0rpx 10rpx 10rpx;
		overflow: hidden;
		background: #FFFFFF;
		position: fixed;
		z-index: 99;
		// margin-bottom: 50rpx;
		top: 430rpx;

		.ovs_2-1 {
			padding: 13rpx 14rpx;
			background-color: #fff2e2;
			color: #fd8c01;
		}
	}

	// 课节
	.class_section {
		margin-top: 240rpx;
		padding-bottom: 80rpx;
		overflow-y: auto;

		// 公共样式display布局
		.dis-borderbox {
			width: 100%;
			box-sizing: border-box;
			display: flex;
			background-color: #fff;
			align-items: center;
			justify-content: space-between;

			.title-s {
				width: 100%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				display: flex;
				align-items: center;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				// width: 700rpx;
			}

			// 消除组件的margin
			.title-item {
				margin: 0;
			}

			// 标题的右边
			.time_p {
				display: flex;
				// justify-content: left;
				// align-items: center;
				// width: 520rpx;
				text-align: right;

				.icons {
					width: 35rpx;
					height: 35rpx;
				}

				.bytes {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #999999;
				}

				.more_icon {
					width: 44rpx;
					height: 44rpx;
				}
			}
		}

		// 标题
		.title_h {
			height: 130rpx;
			padding: 15rpx 30rpx 15rpx;
			border-bottom: 2rpx solid #dddddd;
		}

		.startType {
			display: flex;
			align-items: center;
			justify-content: space-around;
			width: 144rpx;
			height: 48rpx;
			border-radius: 24rpx;
			font-size: 26rpx;
			font-family: PingFang SC;
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
			}

			.ttt {
				display: inline-block;
				margin: 0;
			}
		}

		.checkActive {
			background: #E4EAF9;
			color: #3B7BFF;
		}

		// 下拉
		.collapse {
			width: 100%;
			background-color: rgba(238, 238, 238, 1);
			overflow-y: hidden;
			transition: all 0.5s;
			border-radius: 0px 0px 10rpx 10rpx;
			// margin-bottom: 18rpx;

			.section_h {
				padding: 0 30rpx;

				.body_content {
					width: 100%;
					height: 100%;
					background-color: rgba(238, 238, 238, 1);
					border-bottom: 1rpx solid #dddddd;

					.img_h {
						width: 100rpx;
						height: 100rpx;
						border-radius: 45rpx;
					}

					.yyy {
						width: 100%;
					}

					.btn-operation--s {
						.btn--s::after {
							border: 0 !important;
							padding: 0 !important;
						}
					}
				}

				.body_content2 {
					width: 100%;
					height: 100%;
					background-color: #E4EAF9;
					border-bottom: 1rpx solid #dddddd;

					.img_h {
						width: 100rpx;
						height: 100rpx;
						border-radius: 45rpx;
					}

					.yyy {
						width: 100%;
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



	// 课节
	.class_sectionqw {
		// margin-top: 20rpx;
		padding-bottom: 80rpx;
		overflow-y: auto;

		// 公共样式display布局
		.dis-borderbox {
			width: 100%;
			box-sizing: border-box;
			display: flex;
			background-color: #fff;
			align-items: center;
			justify-content: space-between;

			.title-s {
				width: 100%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				display: flex;
				align-items: center;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				// width: 700rpx;
			}

			// 消除组件的margin
			.title-item {
				margin: 0;
			}

			// 标题的右边
			.time_p {
				display: flex;
				// justify-content: left;
				// align-items: center;
				// width: 520rpx;
				text-align: right;

				.icons {
					width: 35rpx;
					height: 35rpx;
				}

				.bytes {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #999999;
				}

				.more_icon {
					width: 44rpx;
					height: 44rpx;
				}
			}
		}

		// 标题
		.title_h {
			height: 110rpx;
			padding: 15rpx 30rpx 15rpx;
			border-bottom: 2rpx solid #dddddd;
		}

		.startType {
			display: flex;
			align-items: center;
			justify-content: space-around;
			width: 144rpx;
			height: 48rpx;
			border-radius: 24rpx;
			font-size: 26rpx;
			font-family: PingFang SC;
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
			}

			.ttt {
				display: inline-block;
				margin: 0;
			}
		}

		.checkActive {
			background: #E4EAF9;
			color: #3B7BFF;
		}

		// 下拉
		.collapse {
			width: 100%;
			background-color: rgba(238, 238, 238, 1);
			overflow-y: hidden;
			transition: all 0.5s;
			border-radius: 0px 0px 10rpx 10rpx;
			// margin-bottom: 18rpx;

			.section_h {
				// padding: 0 30rpx;

				.body_content {
					width: 100%;
					height: 100%;
					// background-color: rgba(238, 238, 238, 1);
					border-bottom: 1rpx solid #dddddd;

					.img_h {
						width: 100rpx;
						height: 100rpx;
						border-radius: 45rpx;
					}

					.yyy {
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding-right: 40rpx;
					}

					.btn-operation--s {
						.btn--s::after {
							border: 0 !important;
							padding: 0 !important;
						}
					}
				}

				.body_content2 {
					width: 100%;
					height: 100%;
					background-color: #E4EAF9;
					border-bottom: 1rpx solid #dddddd;

					.img_h {
						width: 100rpx;
						height: 100rpx;
						border-radius: 45rpx;
					}

					.yyy {
						width: 100%;
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
