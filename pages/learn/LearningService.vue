<!-- 学习服务 -->
<template>
	<view class="u_learning-Service">

		<view class="classTit">
			<view class="classTit-top">
				<view class="flexs2">
					<view class="flexs" @click="isAss=true">
						<image :src="imageUrl+'/static/live/126rili.png'" class="sizeImg"  />
						<view class="textTime">
							{{year}}年{{month}}月
						</view>
						<image :src="imageUrl+'/static/live/126you.png'" class="sizeImg2"  />
					</view>

					<view class="huidao" @click="onHjt">
						回到今天
					</view>
				</view>
				<view class="flexs mar-t">
					<view class="" v-for="item in dayObj" :key="item.value"
						:class="{risIZE:item.value!=6&&item.value!=7,colo1:item.value==6,mar:item.value==1}">
						{{item.text}}
					</view>
				</view>
			</view>
			<view class="botttoms">
				<view :class="{listDataDay:true,colo124:item.week==6||item.week==7}" v-for="item in listDatas"
					@click="onBlistDataDay(item.day)" :key="item.day">
					<view class="zhibzho222" v-if="item.day==day">
						{{item.day}}
					</view>
					<view class="zhibzho2" v-else-if='item.liveCount>0'>
						{{item.day}}
					</view>
					<view class="zhibzho22" v-else>
						{{item.day}}
					</view>
					<view class="zhibzho" v-if="item.liveCount>0">
						直播中
					</view>
					<view class="borderHuangse" v-else-if="item.count>0 && item.liveCount == 0">
					</view>

					<view class="borderHuangse2" v-else>
					</view>

				</view>
			</view>
		</view>
		<view class="boosew" v-if="findByPeepArr.length>0">
			<view class="list-item" v-for="(item,index) in findByPeepArr" :key="index" @click="lookLive(item, index)">
				<view class="flexs">
					<view class="heads">
						<image
							:class="{head:item.liveClassroomStatus == 2 ,head1:item.liveClassroomStatus == 1 &&item.isAgree != 1, head2:item.liveClassroomStatus == 4,head3:item.liveClassroomStatus == 1 && item.isAgree == 1}"
							:src="item.teacherPhoto">
						</image>
						<view class="lefts">
							<view class="right-box">
								<view v-if="item.liveClassroomStatus == 1 " class="live-box remind-box"
									:style="{background: item.isAgree == 1 ? '#096dd9' : 'linear-gradient(90deg, #3bf0bb, #3b7cfe)'}">
									<image v-if="item.isAgree !=1" class="size2" :src="imageUrl+'/xing/yuyue.png'" 
										mode=""></image>
									<image v-if="item.isAgree ==1" class="size3" :src="imageUrl+'/xing/dwx.png'" 
										mode="">
									</image>
									{{item.isAgree == 1 ? '已预约' : '提醒我'}}
								</view>
								<!-- 在线中 -->
								<view class="live-box" v-else-if="item.liveClassroomStatus == 2">
									<image :src="imageUrl + '/static/home/live.png'" />
									直播中
								</view>
								<!-- 在线完成 -->
									<view v-else-if="item.liveClassroomStatus == 3" class="live-box complete-box">
									<image :src="imageUrl + '/static/home/live.png'" />
									已结束
								</view>
								<!-- 在线回放 -->
								<view v-else-if="item.liveClassroomStatus == 4" class="live-box playback-box">
									<image class="size4" :src="imageUrl+'/xing/xq3.png'"  />
									回放
								</view>
							</view>
						</view>
					</view>
					<view class="">
						<view class="teacherName">
							{{item.teacherName}}
						</view>
						<view class="tests">
							{{item.courseName}}
						</view>
						<view class="tests2">
							{{item.liveTime}}
						</view>
					</view>
				</view>
				<view class="bottoms one-row">
					{{item.liveClassroomName}}
				</view>
			</view>
		</view>

		<view class="titleFlex" v-else>
			<image style="width: 349rpx;height: 312rpx;margin: 40rpx auto;display: block;"
			:src="imageUrl+'/xing/zwsj.png'" mode=""></image>
			<view class="tishititle">
				暂时没有直播~
			</view>
		</view>
		<view class="zhezhao" v-if="isAss" @click="isAss=false">
			<view class="pices">
				<view class="flexs2 pices-top">
					<image :src="imageUrl+'/static/live/126zuo.png'" class="imhgs" @click.native.stop="loginTip('year')"
						 />
					<view class="">
						{{year}}年
					</view>
					<image :src="imageUrl+'/static/live/126you2.png'" class="imhgs" @click.native.stop="loginTip('moun')"
						 />
				</view>
				<!-- <view class="pices-bottom"> -->
				<scroll-view :scroll-into-view="'s'+month" scroll-y="true" class="scroll-Y pices-bottom">
					<view :class="{iymesCss:true,color3:item.text==month}" :id="'s'+item.text"
						v-for="(item,index) in iymes" @click.native.stop="loginTip(item.text)" :key="index">
						{{item.text}}月
					</view>
				</scroll-view>

				<!-- </view> -->
			</view>
		</view>

	</view>


</template>
<script>
	import Title from "@/components/title_comp.vue";
	import Dropdown from "@/uview-ui/components/u-dropdown/u-dropdown.vue";
	import DropdownItem from "@/uview-ui/components/u-dropdown-item/u-dropdown-item.vue";
	import {
		getCurrentChapter,
		getLivePlay,
		findByPeepStreamCalendar
	} from "@/api/learn.js"
	import {
		getTemplateId,
		reserveLive
	} from "@/api/homeAudition.js";
	export default {
		components: {
			Title,
			Dropdown,
			DropdownItem,
		},
		props: ['year', 'month', 'listDatas', 'day', 'findByPeepArr'],
		data() {
			return {
				imageUrl: getApp().globalData.imageUrl,
				isApplet: getApp().globalData.isApplet,
				isDown: false,
				value1: "",
				title1: "",
				image1: "",
				options1: [],
				CurrentChapterList: null,
				LivePlayList: [],
				classesDescribe: '',
				isAss: false,
				years: '',
				months: '',
				days: '',
				hours: '',
				minutess: '',
				secondss: '',
				dayObj: [{
					text: '日',
					value: 7
				}, {
					text: '一',
					value: 1
				}, {
					text: '二',
					value: 2
				}, {
					text: '三',
					value: 3
				}, {
					text: '四',
					value: 4
				}, {
					text: '五',
					value: 5
				}, {
					text: '六',
					value: 6
				}, ],
				iymes: [{
					text: '1',
					value: 1
				}, {
					text: '2',
					value: 2
				}, {
					text: '3',
					value: 3
				}, {
					text: '4',
					value: 4
				}, {
					text: '5',
					value: 5
				}, {
					text: '6',
					value: 6
				}, {
					text: '7',
					value: 7
				}, {
					text: '8',
					value: 8
				}, {
					text: '9',
					value: 9
				}, {
					text: '10',
					value: 10
				}, {
					text: '11',
					value: 11
				}, {
					text: '12',
					value: 12
				}],

			};
		},
		onLoad() {

		},
		onShow() {

		},
		mounted() {
			if (this.month) {
				setTimeout(() => {
					const query = uni.createSelectorQuery().in(this);
					console.log(this.month)
					query.select('#s' + this.month).boundingClientRect(data => {
						// console.log("得到布局位置信息" + JSON.stringify(data));
						console.log("节点离页面顶部的距离为" + data);

						// console.log(this.toRange, 'juli')
					}).exec();

				}, 1000)
			}
			console.log(this.findByPeepArr)
			console.log(this.day)
		},
		methods: {
			onHjt() {
				// 格式化日对象
				var date = new Date();
				var sign2 = ":";
				this.years = date.getFullYear() // 年
				this.months = date.getMonth() + 1; // 月
				this.days = date.getDate(); // 日
				this.hours = date.getHours(); // 时
				this.minutess = date.getMinutes(); // 分
				this.secondss = date.getSeconds() //秒
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
				uni.removeStorageSync('onBlistDataDay');
				uni.removeStorageSync('onBlistDataDay');
				uni.removeStorage('onBlistDataDay')
				this.$emit('onBlistDataDay', this.days, this.months, this.years)
			},
			onBlistDataDay(value) {
				uni.setStorageSync('onBlistDataDay', {
					day: value,
					month: this.month,
					year: this.year
				})
				this.$emit('onBlistDataDay', value)
			},
			loginTip(value) {
				console.log(value)
				if (value == 'year') {
					this.$emit('loginTip', 'year')
				} else if (value == 'moun') {
					this.$emit('loginTip', 'moun')
				} else {
					this.$emit('loginTip', value)
					this.isAss = false
				}
			},
			async lookLive(data, index) {
				console.log(data)
				// if (data.unlock.unlockType != 9 && data.unlock.isUnLock == 0) {
				// 	this.$emit('onERnd', data)
				// } else {
				uni.setStorageSync('materials', data.materials)

				if (data.liveClassroomStatus == 1) {
					let token = uni.getStorageSync('token')
					if (!token) {
						this.loginAss = true

						return
					}
					//未开播，可设置提醒（微信订阅消息）
					if (data.isAgree != 1) {
						getTemplateId({
							type: 1
						}).then(res => {
							if (res.result && res.result[0]) {
								this.SubscribeMessage(res.result[0].templateId, data, index)
							} else {
								uni.showToast({
									title: '订阅失败',
									icon: 'none'
								})
							}
						})
					} else {
						//待在线，进入观看
						// uni.setStorageSync('materials', data.materials)lookLive
						uni.navigateTo({
							url: '/pages/webView/webView?channel=' + data.channel + '&videoId=' + data.unitId +
								'&liveCourseId=' + data.liveCourseId +
								'&activemenu=2'
						})
					}
				} else if (data.liveClassroomStatus == 2 && data.channel) {
					//在线中，进入观看

					uni.setStorageSync('materials', data.materials)
					uni.navigateTo({
						url: '/pages/webView/webView?channel=' + data.channel + '&videoId=' + data.unitId +
							'&liveCourseId=' + data.liveCourseId +
							'&activemenu=2'
					})
				} else if (data.liveClassroomStatus == 4) {
					//在线结束可回放
					uni.navigateTo({
						url: '/pages/webView/webView?channel=' + data.channel + '&videoId=' + data.unitId +
							'&liveCourseId=' + data.liveCourseId +
							'&activemenu=2'
					})


				} else {
					uni.showToast({
						title: '回放未生成',
						icon: 'none'
					});
				}
			},



			SubscribeMessage(tId, data, index) {
				console.log(tId, 1)
				console.log(data, 1)
				console.log(index, 1)
				const that = this;
				wx.requestSubscribeMessage({
					tmplIds: [tId],
					success(res) {
						console.log(res)
						if (res[tId] == 'accept') {
							reserveLive({
								videoId: data.unitId
							}).then(success => {
								if (success.code == 200) {

									wx.showToast({
										title: '预约成功',
										icon: 'none'
									})
									that.$emit('findIsAgrss', index)
									console.log(that.findByPeepArr[index])
								} else {
									wx.showToast({
										title: success.message,
										icon: 'none'
									})
								}
								//待在线，进入观看
								console.log(data, 999999)
								uni.setStorageSync('materials', data.materials)

							})
						} else {
							//待在线，进入观看
							uni.setStorageSync('materials', data.materials)
							uni.navigateTo({
								url: '/pages/webView/webView?channel=' + data.channel + '&videoId=' +
									data.unitId + '&liveCourseId=' + data.liveCourseId +
									'&activemenu=2'
							})
						}
					},
					fail() {
						//待在线，进入观看
						uni.setStorageSync('materials', data.materials)
						uni.navigateTo({
							url: '/pages/webView/webView?channel=' + data.channel + '&videoId=' + data
								.unitId +
								'&liveCourseId=' + data.liveCourseId +
								'&activemenu=2'
						})
					}
				})
			},

		},
	};
</script>
<style scoped lang="scss">
	.size4 {
		width: 18rpx !important;
		height: 18rpx !important;
	}

	.size3 {
		width: 14rpx !important;
		height: 12rpx !important;
	}

	.size2 {
		width: 12rpx !important;
		height: 16rpx !important;
	}

	.bottoms {
		border-top: 2px solid #EEEEEE;
		padding-top: 13rpx;
		margin-top: 18rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #3D3D3D;
	}

	.tests2 {
		font-size: 19rpx;
		font-weight: 500;
		color: #999999;
	}

	.tests {
		font-size: 24rpx;
		font-weight: bold;
		color: #3D3D3D;
		margin: 16rpx 0;
	}

	.teacherName {
		width: 103rpx;
		height: 35rpx;
		background: rgba(189, 255, 248, 0.4);
		border-radius: 8rpx;
		font-size: 22rpx;
		font-weight: bold;
		color: #0CD8C2;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.lefts {
		width: 100%;
		position: absolute;
		bottom: -10rpx;
	}

	.titleFlex {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.tishititle {
		font-size: 28rpx;
		font-weight: 500;
		color: #666666;
		margin-top: 54rpx;
	}

	.boosew {
		padding: 0 22rpx 50rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.serr-row2 {
		/* width: 200rpx; */
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.shitin {
		width: 74rpx !important;
		height: 38rpx;
		background: #FFF2EB;
		border-radius: 4rpx;
		font-size: 24rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 500;
		color: rgba(250, 100, 44, 1);
		padding-left: 15rpx;
		white-space: nowrap;
		padding-right: 15rpx;
		margin-left: 10rpx;
	}

	.size {
		width: 21rpx;
		height: 25rpx;
	}

	.marbyuo {
		display: flex;
	}

	.flexs {
		display: flex;
		align-items: center;
	}

	.list-item {
		background: #ffffff;
		/* box-shadow: 0px 2rpx 2rpx 0px rgba(0, 0, 0, 0.1); */
		border-radius: 20rpx;
		padding: 14rpx 15rpx 0rpx 15rpx;
		width: 342rpx;
		height: 209rpx;
		margin-bottom: 28rpx;

		.heads {
			width: 113rpx;
			height: 106rpx;
			border-radius: 50%;
			position: relative;
			margin-right: 19rpx;
		}

		.head {
			width: 113rpx;
			height: 106rpx;
			border-radius: 50%;
			position: relative;
			margin-right: 19rpx;
			border: 2rpx solid RGBA(255, 94, 5, 1);
			position: relative;
		}

		.head1 {
			width: 113rpx;
			height: 106rpx;
			border-radius: 50%;
			position: relative;
			margin-right: 19rpx;
			border: 2rpx solid RGBA(1, 121, 238, 1);
			position: relative;
		}

		.head2 {
			width: 113rpx;
			height: 106rpx;
			border-radius: 50%;
			position: relative;
			margin-right: 19rpx;
			border: 2rpx solid #FFA340;
			position: relative;
		}

		.head3 {
			width: 113rpx;
			height: 106rpx;
			border-radius: 50%;
			position: relative;
			margin-right: 19rpx;
			border: 2rpx solid #1BE7A9;
			position: relative;
		}

		.info {
			// width: 348rpx;
			margin-bottom: 34rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.title {
				font-size: 32rpx;
				color: #333333;
				font-weight: bold;
				/* margin-bottom: 29rpx; */
			}

			.desc {
				font-size: 26rpx;
				color: #666666;
			}
		}

		.right-box {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.live-box {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 87rpx;
				height: 30rpx;
				border-radius: 20rpx;
				background: linear-gradient(90deg, #fd7a3f, #fa632b);
				font-size: 16rpx;
				color: #ffffff;
				margin-left: 10rpx;

				image {
					width: 28rpx;
					height: 28rpx;
					margin-right: 6rpx;
				}
			}

			.remind-box {
				background: linear-gradient(90deg, #3bf0bb, #3b7cfe);
			}

			.complete-box {
				background-color: none !important;
				background-image: url($fileBaseUrl+'/ykstatic/startType3_1631613967962.png');
				background-size: 100% 100%;
			}

			.playback-box {
				background: linear-gradient(-89deg, #FFAC52 0%, #FF8502 99%);
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

	.zhibzho {
		font-size: 20rpx;
		font-weight: 500;
		color: #FC793E;
		margin-top: 8rpx;
	}

	.zhibzho2 {
		width: 50rpx !important;
		height: 50rpx !important;
		background: linear-gradient(0deg, #FB652C 0%, #FC7339 100%) !important;
		border-radius: 14rpx;
		font-size: 28rpx !important;
		font-family: hzgb;
		font-weight: 400;
		color: #FFFFFF !important;
		line-height: 50rpx;
		text-align: center;
		// display: flex;
		// align-content: center;
		// justify-content: center;
	}

	.zhibzho222 {
		width: 50rpx !important;
		height: 50rpx !important;
		background: $uni-primary !important;
		border-radius: 50%;
		font-size: 28rpx !important;
		font-family: hzgb;
		font-weight: 400;
		color: #FFFFFF !important;
		line-height: 50rpx;
		text-align: center;
		// display: flex;
		// align-content: center;
		// justify-content: center;
	}

	.zhibzho22 {
		width: 50rpx !important;
		height: 50rpx !important;
		border-radius: 14rpx;
		font-size: 28rpx !important;
		font-family: hzgb;
		font-weight: 400;
		line-height: 50rpx;
		text-align: center;
	}

	.borderHuangse {
		width: 14rpx;
		height: 14rpx;
		background: #FCB247;
		border-radius: 50%;
		margin-top: 14rpx;
	}

	.borderHuangse2 {
		width: 14rpx;
		height: 14rpx;
		border-radius: 50%;
		margin-top: 14rpx;
	}

	.zhezhao {
		position: fixed;
		top: 0;
		width: 100%;
		left: 0rpx;
		z-index: 99999;
		height: 100%;
		background: rgba(51, 51, 51, 0.5);
	}

	.color3 {
		font-size: 30rpx !important;
		color: $uni-primary !important;
		font-weight: bold !important;
	}

	.pices-top {
		padding: 23rpx 27rpx 20rpx;
	}

	.pices-bottom {
		height: 290rpx;
		// overflow-y: scroll;
	}

	.iymesCss {
		font-size: 28rpx;
		font-weight: 500;
		color: #B3B3B3;
		border-top: 2rpx solid #EEEEEE;
		padding-top: 20rpx;
		padding-bottom: 19rpx;
		display: flex;
		align-content: center;
		justify-content: center;
	}

	.imhgs {
		width: 13rpx;
		height: 22rpx;
	}

	.pices {
		width: 238rpx;
		height: 375rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		position: absolute;
		top: 300rpx;
		left: 55rpx;
	}

	.listDataDay {
		width: 98rpx;
		height: 91rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		// justify-content: center;
		font-size: 28rpx;
		font-weight: blod;
		color: #333333;
		// // background: #3D7DFF;
		// border-radius: 14rpx;
	}

	.botttoms {
		// height: 457rpx;
		// padding-top: 38rpx;
		display: flex;
		flex-wrap: wrap;
	}

	.mar-t {
		margin-top: 34rpx;
		padding-left: 5rpx;
	}

	.colo1 {
		font-size: 28rpx;
		font-weight: bold;
		color: #777777;
	}

	.colo12 {
		font-size: 28rpx;
		font-weight: 800;
		color: $uni-primary;
	}

	.colo124 {
		font-size: 28rpx;
		font-family: hzgb;
		font-weight: 400;
		color: #818181;
	}

	.risIZE {
		font-size: 28rpx;
		font-weight: bold;
		color: #333333;
		margin-right: 73rpx;
	}

	.mar {
		margin-left: 75rpx;
	}

	.classTit-top {
		padding: 0 28rpx 32rpx;
		border-bottom: 2rpx dashed #eeeeee;
		margin-bottom: 38rpx;
	}

	.flexs2 {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.huidao {
		width: 134rpx;
		height: 40rpx;
		background: linear-gradient(91deg, #FF5C03 0%, #FF7F39 100%);
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		font-size: 22rpx;
		font-weight: 500;
		color: #FFFFFF;
		justify-content: center;
	}

	.textTime {
		font-size: 28rpx;
		font-weight: bold;
		color: #333333;
	}

	.flexs {
		display: flex;
		align-items: center;
	}

	.sizeImg {
		width: 27rpx;
		height: 27rpx;
		margin-right: 17rpx;
	}

	.sizeImg2 {
		width: 21rpx;
		height: 12rpx;
		margin-left: 15rpx;
	}

	.classTit {
		width: 694rpx;
		height: auto;
		background: #FFFFFF;
		box-shadow: 0rpx 16rpx 60rpx 10rpx rgba(228, 228, 228, 0.25);
		border-radius: 20rpx;
		margin: 20rpx auto 32rpx;
		padding-top: 43rpx;
	}

	.mask {
		width: 100%;
		// background-color: #f1f1f1;

		image {
			width: 313rpx;
			height: 279rpx;
			display: block;
			margin: 0 auto 20rpx;
		}

		view {
			width: 100%;
			text-align: center;
			font-size: 26rpx;
			color: #999999;
		}
	}

	button::after {
		border: 0 !important;
	}

	.u_learning-Service {
		padding-top: 176rpx;
		padding-bottm: 200rpx;
		margin-bottom: 200rpx;

		// 头部
		.header {
			background-color: #fff;
			width: 100%;
			box-sizing: border-box;
			padding: 20rpx 30rpx 0;

			.learning_img {
				width: 100%;
				height: 310rpx;
				border-radius: 20rpx;
			}
		}

		// 菜单导航
		.learning-tabs {
			.uni-button:after {
				border: none;
			}

			margin-top: 10rpx;
			box-sizing: border-box;
			padding: 0 30rpx;
			height: 200rpx;
			background-color: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			text-align: center;

			.tabs-item {
				.tabs_img {
					width: 90rpx;
					height: 90rpx;
				}
			}
		}

		// 内容
		.learning_body {
			width: 100%;
			box-sizing: border-box;
			padding: 0 30rpx;
			margin-top: 26rpx;
			display: inline-block;
			margin-bottom: 86rpx;

			// 卡片
			.u-Card {
				box-sizing: border-box;
				padding: 0 20rpx;
				background: #ffffff;
				box-shadow: 0rpx 2rpx 2rpx 0rpx rgba(0, 0, 0, 0.1);
				border-radius: 20rpx;
				width: 100%;
				margin-bottom: 27rpx;
			}

			.Last_study {
				display: flex;
				align-items: center;
				width: 100%;
				height: 290rpx;
			}

			// 头像--左
			.teacher_img {
				width: 130.1rpx;
				height: 130.1rpx;
				border-radius: 50%;
			}

			// 右
			.learning_curriculum {
				margin-left: 28rpx;
				width: 76%;
			}

			// 标题
			.curriculum_title {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				margin-bottom: 28rpx;
			}

			// 课程介绍
			.course-introduction {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #666666;
				margin-bottom: 25rpx;
				// display: flex;
				// justify-content: space-between;
				// align-items: center;

				.btn-operation---s {
					.btn---s {
						display: flex;
						align-items: center;
						justify-content: space-around;
						width: 138rpx;
						height: 44rpx;
						border-radius: 20rpx;
						padding: 0;
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #ffffff;
						padding: 0;
						// margin-left: 10rpx;
						line-height: 1.7;

						.live_icon {
							width: 32rpx;
							height: 32rpx;
							// margin-right: 6rpx;
						}
					}
				}
			}

			// 时长
			.operation-time {
				white-space: nowrap;

				.-time {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.time-u {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #999999;

						// margin-right: 46rpx;
						.u-icons {
							width: 27rpx;
							height: 27rpx;
							margin-right: 6rpx;
						}

						.u-progress {
							padding: 0 4rpx;
						}
					}
				}

				.btn-operation {

					// 继续学习
					.btn {
						background-image: url($fileBaseUrl+"/ykstatic/learn/btnBg.png");
						background-position: 0 0;
						background-repeat: no-repeat;
						background-size: 100%;
						border-radius: 50rpx;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #ffffff;
						width: 145rpx;
						height: 48rpx;
						padding: 0;
						line-height: 1.7;
					}

					.button-hover {
						color: #e1e1e1;
					}
				}
			}

			// 测评任务
			.content {
				width: 100%;
				height: 160rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.u-pending {
					width: 114rpx;
					height: 114rpx;
				}
			}

			// 最新笔记
			.Latest_notes {
				width: 100%;
				align-items: center;
				height: 160rpx;

				.curriculum_title {
					padding: 17rpx 0 8rpx;
					margin: 0;
				}

				.dis-center {
					display: flex;
					align-items: center;
				}
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
