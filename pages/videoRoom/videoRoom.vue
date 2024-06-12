<template>
	<view id="videoRoom">
		<view class="potse">

			<!-- h5使用播放器使用此部分 -->
			<!--  #ifdef  H5 -->
			<view class="videoMain" v-show="videoType == 'aliv'">
				<div id="J_prismPlayer"></div>
			</view>
			<view class="videoMain" v-show="videoType == 'polyv'">
				<div id="video"></div>
			</view>
			<!--  #endif -->

			<!-- 小程序播放器使用此部分 -->
			<!--  #ifdef  MP-WEIXIN -->
			<view class="videoMain" v-show="videoType == 'aliv'">
				<video autoplay :controls="true" :src="playInfo.playURL" id="media" ref="media" @ended="playerEnd"
					@play="playerPlay" @timeupdate="playerTimeupdate" @loadedmetadata="loadedmetadata"
					style="width: 100%;height:100%;"></video>
			</view>
			<view class="videoMain" v-show="videoType == 'polyv'">
				<!-- <polyv-player id="playerId" :playerId="playerId" :showQualityBtn="false" @playing="playing" :vid="vid"
				@ended="ended" :showControls="true" :autoplay="true" height="430rpx"> </polyv-player> -->
			</view>
			<!--  #endif -->
			<view class="tabs-menu">
				<view class="tabs-item">
					<view class="tabs-text">课件</view>
				</view>
			</view>
		</view>

		<!-- 课件列表 -->

		<view class="imageList" v-if="materialsList.length > 0">
			<image lazy-load v-for="(item,index) in materialsList" :src="item" mode="widthFix" :key="item"></image>
			<!-- uni-app 中 web-view 可以直接加载 pdf 文件 -->
			<!-- <web-view :src="materialsList[0]"></web-view> -->
		</view>
		<view v-else>
			<image class="noDataImg" :src="imageUrl+'/xing/zwsj.png'" mode=""> </image>
			<view class="noDataText">暂无课件</view>
		</view>
		<!-- 登陆弹窗 -->
		<view v-show='loginAss' class="back-tankuang">
			<login class="loginw" @guanbi='guanbi' />
		</view>
		<!-- 是否下一集弹窗 -->
		<view class="zhehao" v-if="isAss">
			<view class="tish">
				<view class="tish1"> 提示 </view>
				<view class="tishTitle"> 是否播放下一个视频:
					<!-- <view class="" v-if="liveClassroomName"> --> {{liveClassroomName}} <!-- </view> -->
				</view>
				<view class="tishFlex">
					<view class="quexiao" @click="isAss=false"> 取消 </view>
					<view class="queidg" @click="Qiehuan"> 确定 </view>
				</view>
			</view>
		</view>
		<!-- 机构二维码弹窗 -->
		<componentQRCodePopup @onClose="onCloseComponentQRCodePopup" v-if="isShowComponentQRCodePopup" />
	</view>
</template>

<script>
	import {
		getPolyvToken, // 获取保利为token
		findByPlayInfo, // 阿里云vid+凭证换视频地址
		findByPlayAuth, // 阿里云vid换视频地址
		addLearn,
		updateCoursePlayCount,
		queryMaterial,
		getCourseIsNoBuy,
		getVidByUnitId,
	} from '@/api/learn.js';
	import {
		courseRecord,
		querySaleShare,
		bindinDealer
	} from '@/api/login.js';
	import {
		getToken
	} from "@/common/util/index.js";
	let polyvPlayerContext;
	import componentQRCodePopup from "@/components/common/componentQRCodePopup.vue";
	export default {
		components: {
			componentQRCodePopup,
		},
		data() {
			return {
				loginAss: getApp().globalData.loginAss,
				imageUrl: getApp().globalData.imageUrl,
				current: 0,
				materialsList: [], // 课件列表
				pHeight: 84,
				vid: '',
				id: '12345',
				playerId: 'polyvPlayer',
				classid: '',
				courseId: '',
				unitId: '',
				videoId: '',
				learnState: 1,
				JSONstr: '',
				olvideoId: '',
				arr: [], // 播放列表
				isAss: false, // 是否观看下一集课程弹窗状态
				liveClassroomName: '', // 课程名称，用于是否观看下一集课程弹窗状态的标题
				key: '',
				seconds: 0, // 播放时长
				// \\\\\\\\\\\\\\\\\\\\\\\\
				videoType: '', // 视频播放器类型aliv \ polyv
				watchTime: '', // 学习时间
				playInfo: { // 视频播放器参数
					playURL: '',
					vid: '',
					playAuth: '',
					courseId: ''
				},
				// 、、、、、、、、、、、、、、、、、、、、、、
				// timer: null, // player：ali播放器计时器
				player: '', // player：ali播放器载体		
				playerPolyv: '', // playerPolyv：Polyv播放器载体			
				lookPercentage: 0, // 当前视频播放进度
				// initialTime: 0, // 当前视频的播放时间
				seekTime: 0, // 跳转到多少秒，根据上次最后观看的时刻
				videoContext: '',
				h5LastWatchTime: 0,
				// isAudition是否是试听课
				isAudition: false,
				isShowComponentQRCodePopup: false, // 是否显示机构二维码弹窗
			};
		},
		// watch: {
		// 	initialTime(newValue, oldValue) {
		// 		this.initialTime = newValue
		// 	}
		// },
		onHide() {
			if (this.videoId) {
				if (this.learnState == 2) {
					//#ifdef MP-WEIXIN
					if (this.videoType == 'aliv') {} else if (this.videoType == 'polyv') {}
					//#endif
					this.courseRecord()
				} else {
					//#ifdef MP-WEIXIN
					if (this.videoType == 'aliv') {} else if (this.videoType == 'polyv') {}
					//#endif
					this.courseRecord()
				}
			}
		},
		onUnload() {
			if (this.videoId) {
				if (this.learnState == 2) {
					//#ifdef MP-WEIXIN
					if (this.videoType == 'aliv') {} else if (this.videoType == 'polyv') {}
					//#endif
					this.courseRecord()
				} else {
					//#ifdef MP-WEIXIN
					if (this.videoType == 'aliv') {} else if (this.videoType == 'polyv') {}
					//#endif
					this.courseRecord()
				}
			}
		},
		onShow() {
			setInterval(() => {
				this.seconds++
			}, 1000)
			let aaa = getCurrentPages()
			//#ifdef H5
			console.log(aaa[aaa.length - 1].options, '测试用 1001')
			let thatPage = {
				options: {}
			}
			thatPage.options = aaa[aaa.length - 1].options
			//#endif

			//#ifdef MP-WEIXIN
			let thatPage = aaa[aaa.length - 1];
			//#endif

			if (thatPage.options.arr) {
				this.arr = JSON.parse(thatPage.options.arr)
			}
			if (thatPage.options.key) {
				this.key = JSON.parse(thatPage.options.key)
			}
			if (thatPage.options.speedOfProgress) {
				this.seekTime = Number(thatPage.options.speedOfProgress)
				// this.lookPercentage = thatPage.options.lookPercentage * 1;
			}
			if (thatPage.options.isAudition) {
				this.isAudition = thatPage.options.isAudition
			}

			if (thatPage.options.sourceType) {
				this.videoType = thatPage.options.sourceType;
				// 李佳浩 20230325
				if (this.videoType == 'polyv') {
					uni.navigateBack()
					// 李佳浩 20230325 upd 褚存龙解决视频不播放将return挪至判断内
					return
				}
			} else {
				console.log('当前播放器类型为空')
			}
			try {
				var token = wx.getStorageSync('token')
				if (this.isAudition == true && !token) {
					// 是试听课
				} else if (this.isAudition == false && !token) {
					// 不是试听课
					if (thatPage.options.scene) {
						this.setShareUrl({
							scene: thatPage.options.scene
						})
					} else {
						this.setShareUrl(thatPage.options)
					}
					return
				}
			} catch (e) {
				if (thatPage.options.scene) {
					this.setShareUrl({
						scene: thatPage.options.scene
					})
				} else {
					this.setShareUrl(thatPage.options)
				}
				return
			}
			if (!thatPage.options) {
				uni.reLaunch({
					url: '/pages/index/home'
				})
				return
			}
			if (thatPage.options.courseName) {
				uni.setNavigationBarTitle({
					title: thatPage.options.courseName
				})
			}
			if (thatPage.options.classid) {
				this.classid = thatPage.options.classid
			}
			if (thatPage.options.courseId) {
				this.courseId = thatPage.options.courseId
			}
			try {
				let videoId = '';
				let vid = '';
				if (!thatPage.options.scene) {
					if (thatPage.options.videoId) { //video视频与在线的单元ID
						this.videoId = thatPage.options.videoId
						if (thatPage.options.vid) {
							this.vid = thatPage.options.vid
						}
					}
					this.queryMaterial()
					this.getCourseIsNoBuy(thatPage)
				} else if (/^[a-zA-Z]/.test(thatPage.options.scene)) {
					let data = {
						saleShareId: thatPage.options.scene
					}
					querySaleShare(data).then((res) => {
						let dasr = res.result.distributionId + ''
						let id = res.result.channel
						this.videoId = res.result.channel
						bindinDealer(data).then(res => {})
						getVidByUnitId({
							courseUnitId: id
						}).then(res => {
							this.vid = res.result
							uni.setNavigationBarTitle({
								title: '视频'
							})
							this.getCourseIsNoBuy(thatPage)
						})
					})
					this.queryMaterial()

				} else {
					if (thatPage.options.scene) {
						this.videoId = thatPage.options.scene
						getVidByUnitId({
							courseUnitId: thatPage.options.scene
						}).then(res => {
							this.vid = res.result
						})
						this.queryMaterial()
						this.getCourseIsNoBuy(thatPage)
					} else {
						if (thatPage.options.videoId) { //video视频与在线的单元ID
							this.videoId = thatPage.options.videoId
							if (thatPage.options.vid) {
								this.vid = thatPage.options.vid
							}
						}
						this.queryMaterial()
						this.getCourseIsNoBuy(thatPage)
					}
				}
			} catch (e) {
				// error
			}

			try {
				if (thatPage.options.unitId) {
					this.unitId = thatPage.options.unitId;
					updateCoursePlayCount(thatPage.options.unitId);
					if (thatPage.options.classid != 'undefined' && thatPage.options.classid != 'null') {
						this.addLearn()
					}
				}
			} catch (e) {
				// error
			}

			uni.removeStorageSync('shareUrl')
		},
		methods: {
			/**
			 * 关闭弹窗
			 */
			onCloseComponentQRCodePopup() {
				this.isShowComponentQRCodePopup = false
			},
			/**
			 * 查询课程是否购买
			 * @param {Object} thatPage
			 */
			getCourseIsNoBuy(thatPage) {
				getCourseIsNoBuy(this.videoId).then(res => {
					if (res.result.isNoBuy == 1) {
						// 已购买，生成播放器
						this.controlVideo(thatPage)
					} else {
						// 未购买，提示没有播放权限
						this.onTip()
					}
				})
			},
			/**
			 * 查询视频课件
			 */
			queryMaterial() {
				queryMaterial(this.videoId).then(res => {
					if (res.code == 200 && res.result.length > 0) {
						this.materialsList = res.result
					}
				})
			},
			/**
			 * 课程未购买，提示没有播放权限
			 */
			onTip() {
				uni.showModal({
					title: '温馨提示',
					content: '您还没有播放权，请购买后观看',
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.reLaunch({
								url: '/pages/index/home'
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			/**
			 * 生成播放器
			 * @param {Object} thatPage
			 */
			controlVideo(thatPage) {
				//#ifdef H5
				console.log('h5播放室 show')
				if (thatPage.options.sourceType == 'aliv') {
					console.log('h5 阿里云视频')
					if (thatPage.options.vid) {
						this.findByPlayAuth(thatPage.options)
					}
				} else if (thatPage.options.sourceType == 'polyv') {
					console.log('h5 保利为视频')
					this.getPolyvToken(thatPage.options)
				}
				//#endif

				//#ifdef MP-WEIXIN
				console.log('小程序播放室 show')
				if (thatPage.options.sourceType == 'aliv') {
					console.log('小程序 阿里云视频')
					if (thatPage.options.vid) {
						this.findByPlayInfo(thatPage.options)
					}
				} else if (thatPage.options.sourceType == 'polyv') {
					console.log('小程序 保利为视频')
					// 这里暂无代码
					polyvPlayerContext = this.selectComponent('#playerId');
				}
				//#endif
			},
			findByPlayInfo(data) {
				// 小程序阿里云视频播放 - video组件 + url播放
				findByPlayInfo({
					aliVideoId: data.vid
				}).then((res) => {
					console.log('findByPlayInfo res', res);
					if (res.code == 200) {
						this.playInfo.playURL = res.result.playURL;
					}
				}).catch(err => {
					console.log('findByPlayInfo err', err);
					if (err.code == 500) {
						this.isShowComponentQRCodePopup = true
					}
				})
			},
			findByPlayAuth(data) {
				// 公众号h5阿里云视频播放 - vid + playauth
				findByPlayAuth({
					aliVideoId: data.vid
				}).then((res) => {
					console.log('findByPlayAuth res', res);
					if (res.code == 200 && res.result.playAuth) {
						// 销毁已有的播放器实例
						if (this.player) {
							this.player.dispose()
						}
						// 创建新播放器示例
						this.player = new Aliplayer({
							id: "J_prismPlayer",
							width: '100%',
							height: '100%',
							vid: data.vid,
							playauth: res.result.playAuth,
						}, (player) => {
							// 跳转到上次最后观看时刻
							this.player.seek(Number(this.seekTime))
							// 1秒更新一次最新观看时间
							this.h5LastWatchTime = setInterval(() => {
								this.seekTime = parseInt(this.player.getCurrentTime());
							}, 1000)
							// 初始化完成时获取视频总时长
							this.player.on("ready", (e) => {
								this.player.play()
								this.watchTime = this.formatSeconds(this.player.getDuration())
							})
							// 播放结束下一集
							this.player.on("ended", (e) => {
								this.playerEnd()
							})
						});
						// 增加学习记录
						this.addLearn()
					}
				}).catch(err => {
					console.log('findByPlayAuth err', err);
					if (err.code == 500) {
						this.isShowComponentQRCodePopup = true
					}
				})
			},
			getPolyvToken(data) {
				// 公众号h5保利威视频播放 - vid + playsafe
				getPolyvToken({
					courseId: data.videoId,
					classesId: this.classid
				}).then(res => {
					if (res.code == 200) {
						// 增加学习记录
						this.addLearn()
						// 销毁已有的播放器实例
						if (this.playerPolyv) {
							this.playerPolyv.destroy();
						}
						// 创建新播放器示例
						this.playerPolyv = polyvPlayer({
							wrap: '#video',
							width: '100%',
							height: '210px',
							vid: data.vid,
							playsafe: res.result.token,
							autoplay: true,
							df: 3,
							showHd: false
						});
						// 获取视频总时长
						this.playerPolyv.on('s2j_onVideoPlay', (...params) => {
							this.watchTime = this.formatSeconds(this.playerPolyv.j2s_getDuration())
						});
						// 播放结束下一集
						this.playerPolyv.on('s2j_onPlayOver', (...params) => {
							this.playerEnd()
						});
					}
				})
			},
			courseRecord() {
				courseRecord({
					courseId: this.videoId,
					isTime: this.watchTime,
					seconds: this.seconds,
					isType: 1,
					speedOfProgress: this.seekTime
				}).then(res => {}).catch(err => {})
			},
			playerEnd(e) {
				this.learnState = 2
				if (this.classid != 'undefined' && this.classid != 'null') {
					this.addLearn()
				}
				this.arr.forEach((item, index) => {
					if (item.unitId == this.unitId) {
						if (this.arr.length - 1 == index) {

						} else {
							this.liveClassroomName = this.arr[index + 1].liveClassroomName
							this.isAss = true
						}
					}
				})
			},
			playerPlay(e) {
				console.log('播放开始', e)
			},
			playerTimeupdate(e) {
				console.log('播放中，视频时长', e, this.formatSeconds(e.detail.duration))
				// 视频总时长
				this.watchTime = this.formatSeconds(Math.trunc(e.detail.duration))
				// 视频最后播放时刻
				this.seekTime = Math.trunc(e.detail.currentTime)
				// // 获取视频总秒数
				// this.timeEvent(this.watchTime)
				// console.log('播放中，视频时长 \\', this.watchTime, this.timeEvent(this.watchTime))
				// this.$nextTick(() => {
				// 	// 获取视频上次观看到的时间
				// 	this.initialTime = Math.round(this.timeEvent(this.watchTime) * this.lookPercentage * 0.01);
				// 	console.log('播放中，视频时长 *** \\', this.initialTime)
				// })
				// this.initialTime = this.timeEvent(this.watchTime) * this.lookPercentage *0.01
				// this.addLearn()
			},
			loadedmetadata(e) {
				// let ac = document.getElementById('media')
				console.log('loadedmetadata', e)
				this.videoContext = uni.createVideoContext('media')
				console.log(this.videoContext)
				this.videoContext.seek(this.seekTime)
				// this.$nextTick(() => {
				// 	console.log('loadedmetadata  tttt',this, this.$refs)
				// 	this.$refs.media.seek(this.seekTime)
				// })

			},
			timeEvent(e) {
				// 时分秒转秒
				var time = e;
				var len = time.split(':')
				if (len.length == 3) {
					var hour = time.split(':')[0];
					var min = time.split(':')[1];
					var sec = time.split(':')[2];
					return Number(hour * 3600) + Number(min * 60) + Number(sec);
				}
				if (len.length == 2) {
					var min = time.split(':')[0];
					var sec = time.split(':')[1];
					return Number(min * 60) + Number(sec);
				}
				if (len.length == 1) {
					var sec = time.split(':')[0];
					return Number(sec);
				}

				// var hour = time.split(':')[0];
				// var min = time.split(':')[1];
				// var sec = time.split(':')[2];
				// return  Number(hour*3600) + Number(min*60) + Number(sec);
			},
			guanbi(value) {
				this.loginAss = value
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
				result = "" + (parseInt(minuteTime) < 10 ? "0" + parseInt(minuteTime) : parseInt(minuteTime)) + ":" +
					result;
				// }
				// if (hourTime > 0) {
				result = "" + (parseInt(hourTime) < 10 ? "0" + parseInt(hourTime) : parseInt(hourTime)) + ":" + result;
				// }
				return result;
			},
			setShareUrl(options) {
				try {
					let shareUrl = '/pages/videoRoom/videoRoom?';
					if (options.courseName) shareUrl += 'courseName=' + options.courseName + '&'
					if (options.classid) shareUrl += 'classid=' + options.classid + '&'
					if (options.courseId) shareUrl += 'courseId=' + options.courseId + '&'
					if (options.videoId) shareUrl += 'videoId=' + options.videoId + '&'
					if (options.unitId) shareUrl += 'unitId=' + options.unitId + '&'
					if (options.vid) shareUrl += 'vid=' + options.vid + '&'
					if (options.scene) shareUrl += 'scene=' + options.scene + '&'
					uni.setStorageSync('shareUrl', shareUrl)
					this.loginAss = true
				} catch (e) {
					// error
				}
			},
			setShokjw(options) {
				try {
					let shareUrl = '/pages/videoRoom/videoRoom?';
					if (options.courseName) shareUrl += 'courseName=' + options.courseName + '&'
					if (options.classid) shareUrl += 'classid=' + options.classid + '&'
					if (options.courseId) shareUrl += 'courseId=' + options.courseId + '&'
					if (options.videoId) shareUrl += 'videoId=' + options.videoId + '&'
					if (options.unitId) shareUrl += 'unitId=' + options.unitId + '&'
					if (options.vid) shareUrl += 'vid=' + options.vid + '&'
					if (options.scene) shareUrl += 'scene=' + options.scene + '&'
					uni.setStorageSync('shareUrl', shareUrl)
					uni.navigateTo({
						url: "/pagesA/setUpMajor/setUpMajor",
					});
				} catch (e) {
					// error
				}
			},
			ended() {
				if (polyvPlayerContext) {
					this.watchTime = this.formatSeconds(Math.trunc(polyvPlayerContext.getDuration()))
				}
				this.learnState = 2
				if (this.classid != 'undefined' && this.classid != 'null') {
					this.addLearn()
				}
				this.arr.forEach((item, index) => {
					if (item.unitId == this.unitId) {
						if (this.arr.length - 1 == index) {

						} else {
							this.liveClassroomName = this.arr[index + 1].liveClassroomName
							this.isAss = true
						}
					}
				})
			},
			Qiehuan() {
				let that = this
				this.arr.forEach((item, index) => {
					if (item.unitId == this.unitId) {
						setTimeout(() => {
							uni.redirectTo({
								url: `/pages/videoRoom/videoRoom?vid=${that.arr[index+1].vid}&videoId=${that.arr[index+1].videoId}&classid=${that.arr[index+1].classid}&courseId=${that.arr[index+1].courseId}&unitId=${that.arr[index+1].videoId}&arr=${JSON.stringify(that.arr)}&sourceType=${that.arr[index+1].sourceType}`,
							});
						}, 500)
					}
				})
			},
			addLearn() {
				let uid = uni.getStorageSync('userInfos').id;
				let data = {
					classesId: this.classid != 'undefined' && this.classid != 'null' ? this.classid : '',
					courseId: this.courseId,
					studentId: uid,
					unitId: this.unitId,
					learnState: this.learnState
				};
				addLearn(data).then(res => {})
			},
			playing(e) {
				if (polyvPlayerContext) {
					this.watchTime = this.formatSeconds(Math.trunc(polyvPlayerContext.getDuration()))
				}
			},
			// 视频播放插件报错执行
			videoErrorCallback(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false,
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.potse {
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 2;
	}

	.videoMain {
		width: 100%;
		height: 430rpx;
	}

	.noDataImg {
		width: 349rpx;
		height: 312rpx;
		display: block;
		margin: 40rpx auto;
	}

	.noDataText {
		width: 100%;
		text-align: center;
		font-size: 26rpx;
	}

	video {
		width: 100% !important;
	}

	.zhehao {
		width: 100%;
		height: 100%;
		background: rgba(79, 79, 79, 0.6s);
		position: fixed;
		top: 0;
	}

	.color1 {
		color: rgba(61, 125, 255, 1);
	}

	.tish {
		width: 635rpx;
		height: 386rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		position: absolute;
		// padding: 0 50rpx;
		top: 40%;
		left: 9%;
	}

	.tish1 {
		font-size: 40rpx;
		font-weight: 500;
		color: #2B2B2B;
		display: flex;
		justify-content: center;
		margin-top: 25rpx;
	}

	.tishTitle {
		font-size: 30rpx;
		font-weight: 500;
		color: #2B2B2B;
		text-align: center;
		// display: flex !important;
		justify-content: center;
		margin-bottom: 50rpx;
		margin-top: 40rpx;
		display: -webkit-box;
		// flex-direction: column;
		padding: 0 20rpx;
		// align-items: center;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		// view{
		// 	margin-top: 15rpx;
		// }
	}

	.tishFlex {
		display: flex;
		justify-content: center;
		position: absolute;
		bottom: 0;
		// padding-bottom: 30rpx;
		// left: 35%;/*  */
		border-top: 1rpx solid #E5E5E5;
		width: 100%;
		// padding-top: 25rpx;
	}

	.quexiao {
		font-size: 38rpx;
		font-weight: 500;
		color: #2B2B2B;
		// margin-right: 55rpx;
		width: 50%;
		// height: 100%;
		padding-top: 25rpx;
		display: flex;
		justify-content: center;
		padding-bottom: 30rpx;
		border-right: 1rpx solid #E5E5E5;
		color: red;
	}

	.queidg {
		width: 50%;
		font-size: 38rpx;
		font-weight: 500;
		color: #2B2B2B;
		padding-bottom: 30rpx;
		padding-top: 25rpx;
		display: flex;
		justify-content: center;
		color: rgba(0, 119, 255, 1);
	}

	#playerId {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 4;
	}

	.imageList {
		overflow: auto;
		height: 100%;

		// padding: 0 30rpx;
		>image {
			width: 100%;
			height: auto;
		}
	}

	#myVideo {
		width: 100%;
		height: 430rpx;
	}

	#videoRoom {
		height: 100%;
		width: 100%;
		// overflow: hidden;
		padding-top: 430rpx;
		// background-color: #fff;
	}

	// 导航菜单
	.tabs-menu {
		width: 100%;
		height: 120rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		background-color: #fff;
		border-bottom: 2rpx solid #f2f2f2;

		.tabs-item {
			width: 160rpx;
			font-size: 36rpx;
			line-height: 60rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
			text-align: center;
			position: relative;

			.tabs-text {
				&::after {
					content: "";
					display: block;
					position: absolute;
					width: 60rpx;
					height: 6rpx;
					background: $uni-primary;
					border-radius: 3rpx;
					left: 32%;
				}
			}
		}
	}

	// 互动消息
	.danmu-list {
		box-sizing: border-box;
		padding: 30rpx;
		background-color: #fff;
		height: 700rpx;
		overflow-y: scroll;

		.danmu-item {
			display: inline-block;
			background: #f1f7fb;
			border-radius: 29rpx;
			margin: 20rpx 0;

			.danmu {
				display: flex;
				align-items: center;
				width: 100%;
				box-sizing: border-box;
				padding: 10rpx 15rpx;

				.user-img {
					width: 45rpx;
					height: 100%;
					margin-right: 15rpx;
					display: flex;
					align-items: center;

					.user {
						width: 42rpx;
						height: 42rpx;
						border-radius: 50%;
					}
				}

				.danmu-text {
					font-size: 26rpx;
					font-weight: 500;
					font-family: PingFang SC;
					color: #333333;
				}
			}
		}
	}

	// 点赞
	.niubi {
		position: absolute;
		bottom: 140rpx;
		right: 32rpx;
	}

	// 底部
	.footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		background-color: #fff;
		box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(0, 0, 0, 0.3);

		.form {
			height: 100%;
			box-sizing: border-box;
			padding: 0 30rpx;
			display: flex;
			align-items: center;
		}

		.form-item {
			background-color: rgb(240, 240, 240);
			display: flex;
			align-items: center;
			width: 100%;
			box-sizing: border-box;
			padding-left: 15rpx;
			border-radius: 15rpx;
			border-top-right-radius: 40rpx;
			border-bottom-right-radius: 40rpx;
		}

		.btn-s {
			width: 120rpx;
			height: 60rpx;
			color: #fff;
			background-color: #3293f5;
			padding: 0;
			margin-left: 24rpx;
		}
	}

	.chucuno {
		position: absolute;
		top: 50%;
		margin-top: -150rpx;
		z-index: 3;
		left: 50%;
		margin-left: -325rpx;
	}

	.back-tankuang {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 3;
		height: 100%;
		background: rgba(51, 51, 51, 0.5);
	}
</style>