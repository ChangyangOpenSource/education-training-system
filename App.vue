<script>
	import Vue from "vue";
	import appUpdate from "common/util/appUpdate.js";
	// import plv from "@/wxcomponents/polyv-sdk/index";
	import {
		getMajorInfo,
		getToken,
		setCode,
		setEntityId,
		setTitle
	} from "@/common/util/index.js";
	import {
		componentInfoBrief
	} from '@/api/mine/about.js'
	import {
		isApplet,
		loginRecord,
		judge
	} from "@/api/login.js";
	const NET = require("@/uview-ui/request");
	const API = require("@/api/tuiguang");
	export default {
		globalData: {
			loginAss: false,
			LearningServiceId: '',
			isApplet: true,
			imageUrl: 'https://education.changyangdt.com/educationXcxFile', // 静态文件访问前缀，uni.scss中有css变量
		},
		onLaunch: function(e) {
			// this.get_componentInfoBrief()
			uni.setStorageSync('courseState', false) // 小程序课程权限
			uni.setStorageSync('questionState', false) // 小程序题库权限
			// uni.setStorageSync('tabbarIndex', 1) // 小程序题库权限
			console.log('onLaunch',e)
			if (e.query.entityId) {
				setEntityId(e.query.entityId)
				if (getToken()) {
					// uni.navigateTo({
					// 	url: '/pagesA/fenxiang/fenxiang?entityId=' + e.query.entityId
					// })
				} else {
					const pages = getCurrentPages().pop(); //获取页面栈
					pages.$vm.loginAss = true; //前一个页面方法
				}

			} else if (e.query.scene) {
				if (e.query.scene.slice(0, 4) == 'code') {
					let code = e.query.scene.slice(4, e.query.scene.length)
					setCode(code)
					if (getToken()) {
						NET.request(API.judge, {}, 'post').then(res => {
							if (res.code == 200) {
								if (code) {
									uni.navigateTo({
										url: "/pagesA/tuiguan/index?code=" + code,
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
								if (code) {
									uni.navigateTo({
										url: "/pagesA/shenqing/index?code=" + code,
									});
								} else {
									uni.navigateTo({
										url: "/pagesA/tuiguan/index",
									});
								}
							}
						})
					} else {
						const pages = getCurrentPages().pop(); //获取页面栈
						pages.$vm.loginAss = true; //前一个页面方法
					}
				}

			} else if (e.query.code) {
				setCode(e.query.code)
				if (getToken()) {
					NET.request(API.judge, {}, 'post').then(res => {
						if (res.code == 200) {
							if (e.query.code) {
								uni.navigateTo({
									url: "/pagesA/tuiguan/index?code=" + e.query.code,
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
							if (e.query.code) {
								uni.navigateTo({
									url: "/pagesA/shenqing/index?code=" + e.query.code,
								});
							} else {
								uni.navigateTo({
									url: "/pagesA/tuiguan/index",
								});
							}
						}
					})
				} else {
					const pages = getCurrentPages().pop(); //获取页面栈
					pages.$vm.loginAss = true; //前一个页面方法
				}
			}


			uni.getSystemInfo({
				success: function(e) {
					// #ifdef APP-PLUS
					// 检测升级
					appUpdate();
					// #endif
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == "android") {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					}
					// #endif

					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar =
						custom.bottom + custom.top - e.statusBarHeight;
					// #endif

					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif

					// #ifdef APP-PLUS
					//Vue.prototype.$api.listenTranMsg()
					// 		var info = plus.push.getClientInfo();

					// 		/* 5+  push 消息推送 ps:使用:H5+的方式监听，实现推送*/
					// 		plus.push.addEventListener("click", function(msg) {
					// 			console.log("click:" + JSON.stringify(msg));
					// 			console.log(msg.payload);
					// 			console.log(JSON.stringify(msg));
					// 			//这里可以写跳转业务代码
					// 		}, false);
					// 		// 监听在线消息事件
					// 		plus.push.addEventListener("receive", function(msg) {
					// 			// plus.ui.alert(2);
					// 			//这里可以写跳转业务代码
					// 			console.log("recevice:" + JSON.stringify(msg))
					// 		}, false);
					// #endif

					//Vue.prototype.$api.initLogin()
				},
			});
			// #ifdef MP-ALIPAY
			uni.checkSession({
				success: () => {
					console.log("登陆未过期");
				},
				fail: () => {
					console.log("登陆过期");
				},
			});
			// #endif

			Vue.prototype.NavBarColor = "bg-gradual-blue";
		},
		onShow: function(e) {
			if (getToken()) {
				loginRecord({
					type: 3
				}).then(res => {}).catch(err => {})
			}
		},
		onHide: function() {},
		methods: {
			/**
			 * 获取机构信息
			 */
			get_componentInfoBrief() {
				componentInfoBrief().then((res) => {
					setTitle(res.result.title)
				})
			},
			// 初始化保利威sdk
			initPolyvSdk() {},
			guanbi(value) {
				this.globalData.loginAss = value
			},
			goVideoRoom(data1, data2, idx1, idx2, courseData, classId, courseId) {
				console.log(data1, data2, idx1, idx2, courseData, classId, courseId, '整合数据')
				console.log(courseData, '课程详情')
				console.log(data1, '章')
				console.log(data2, '节')
				let arr = []
				// this.objde = {}
				if (courseData.isNoBuy == 1) {
					// 如果课程买了
					courseData.list.forEach((item, index) => {
						console.log(item, '章')
						// this.arr=[]
						item.list.forEach((res) => {
							console.log(res, '节')
							arr.push({
								classid: classId,
								courseId: courseId,
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
					courseData.list.forEach((item, index) => {
						console.log(item, '章')
						item.list.forEach((res) => {
							console.log(res, '节')
							if (res.liveClassroomStatus == 2 || res.liveClassroomStatus == 4 || res
								.isAudition == 1) {
								arr.push({
									classid: classId,
									courseId: courseId,
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
				if (courseData.isNoBuy == 1) {
					// 如果课程买了
					this.audition(data1, data2, idx1, idx2, courseData, arr, classId, courseId)
				} else {
					// 如果课程没买
					if (data2.isAudition == 1) {
						this.audition(data1, data2, idx1, idx2, courseData, arr, classId, courseId)
					} else {
						uni.showToast({
							title: '尚未购买此课程',
							icon: 'none'
						})
					}
				}
			},
			audition(data1, data2, idx1, idx2, courseData, arr, classId, courseId) {
				console.log(data1, data2, idx1, idx2, courseData, classId, courseId, '整合数据2')
				console.log(data1, '章')
				console.log(data2, '节')
				console.log(idx1, '章索引')
				console.log(idx2, '节索引')
				if (data1.type == 1) {
					// 直播
					//在线
					if (courseData.isNoBuy == 0 && data2.unlock.unlockType != 9 && data2.unlock.isUnLock == 0) {
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
						if (data2.isAudition == 1 && courseData.isNoBuy == 0) {
							// 试听课
							uni.navigateTo({
								url: `/pages/videoRoom/videoRoom?vid=${data2.vid}&videoId=${data2.id}
								&classid=${classId}&courseId=${courseId}&unitId=${data2.id}&arr=${JSON.stringify(arr)}
								&sourceType=${data2.sourceType}&speedOfProgress=${data2.speedOfProgress}&isAudition=true`,
							});
						} else {
							// 其他课
							uni.navigateTo({
								url: `/pages/videoRoom/videoRoom?vid=${data2.vid}&videoId=${data2.id}
								&classid=${classId}&courseId=${courseId}&unitId=${data2.id}&arr=${JSON.stringify(arr)}
								&sourceType=${data2.sourceType}&speedOfProgress=${data2.speedOfProgress}`,
							});
						}
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
<style>
	/* @import "uview-ui/index.scss"; */
	@import "plugin/colorui/main.css";
	@import "plugin/colorui/icon.css";
	@import "plugin/colorui/animation.css";

	page {
		height: 100%;
	}

	.lineClamp2 {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.lineClamp3 {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}

	button {
		margin: 0;
		padding: 0;
		border: 0;
	}

	button::after {
		margin: 0 !important;
		padding: 0 !important;
		border: 0 !important;
	}
	
	.loginw {
		position: absolute !important;
		width: 100%;
		bottom: 0rpx;
		left: 0rpx;
		z-index: 99999;
	}

	.back-tankuang {
		position: fixed;
		top: 0;
		width: 100%;
		left: 0rpx;
		z-index: 99999;
		height: 100%;
		background: rgba(51, 51, 51, 0.5);
	}
</style>