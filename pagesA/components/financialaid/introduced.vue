<template>
	<view class="containers">
		<view class="" v-if="isAss">

			<view class="kechang">
				<view class="kechang2">
					<view class="kechang-text">
						{{findByObj.classesMap.classesName}}
					</view>
					<view class="" style="display: flex;">
						<view class="label" v-if="findByObj.classesMap.courseCombination">
							{{ findByObj.classesMap.courseCombination }}
						</view>
						<view class="label2" v-if="findByObj.classesMap.classHour">
							在线{{findByObj.classesMap.classHour}}节
						</view>
					</view>
				</view>
				<view class="twoLine">
					<view class="twoLine-text width1 over">
						{{findByObj.classesMap.classesDescribe}}
					</view>
					<view class="twoLine-text">
						{{findByObj.classesMap.students}}人学习
					</view>
				</view>
				<view class="scesLine">
					<view class="" style="display: flex;align-items: center;">
						<view class="border-yuan" v-for="items in findByObj.classesMap.teacherList" :key="items.id">
							<image class="border-yuan"
								:src="items.teacherImagePhoto == undefined ? items.imagePhoto : items.teacherImagePhoto" />
						</view>

					</view>
					<image class="sizeImg" :src="imageUrl+'/static/helpStuImg/img/yicy.png'" v-if="findByObj.wdHelpStu.status==0" mode="">
					</image>
					<image class="sizeImg" :src="imageUrl+'/static/helpStuImg/img/wei.png'" v-else mode=""></image>
				</view>
				<view class="boeder-xuxian">
				</view>
				<view class="fourLine">
					<view class="" style="display: flex;align-items: center;">
						<view class="fourLine-letf" style="display: flex;align-items: center;">
							助学价￥ <view class="sizeText">
								{{findByObj.classesMap.student_price}}
							</view>
						</view>
						<view class="fourLine-centet">
							￥{{findByObj.classesMap.fficialPrice}}
						</view>
					</view>

					<view class="fourLine-right">
						助学金最高可减￥{{(findByObj.classesMap.fficialPrice-findByObj.classesMap.student_price).toFixed(2)<0?findByObj.classesMap.fficialPrice:(findByObj.classesMap.fficialPrice-findByObj.classesMap.student_price).toFixed(2)}}元
					</view>
				</view>

			</view>
			<view class="baibeiji">
				<view class="tow-cente2" style="display: flex;align-items: center;"
					v-if="findByObj.wdHelpStu.status==0">
					<view class="validity">
						距离活动结束：
					</view>
					<view class="" style="display: flex;align-items: center;">
						<view class="timeBjin">
							{{hr}}
						</view>
						<view class="TheColon">
							:
						</view>
						<view class="timeBjin">
							{{min}}
						</view>
						<view class="TheColon">
							:
						</view>
						<view class="timeBjin">
							{{sec}}
						</view>
					</view>
				</view>
				<view class="" style="display: flex;align-items: center;" v-else>
					<image class="jieshu" :src="imageUrl+'/static/helpStuImg/img/jieshu.png'"  />
					<view class="jieshu-text">
						活动已结束
					</view>
				</view>
			</view>
			<view class="list">
				<image class="studyPlanImg-title" :src="imageUrl+'/static/helpStuImg/img/title.png'" mode="">
				</image>
				<view class="lidai" mode="">
					<view class="tishik" v-if="findByObj.wdHelpStu.status==1">
						<view class="tishik"
							v-if="findByObj.wdHelpStu.powerAmount!=(Math.abs(findByObj.classesMap.fficialPrice-findByObj.classesMap.student_price)).toFixed(2)">
							您可以使用<view class="reds">
								{{findByObj.wdHelpStu.powerAmount}}元
							</view>
							助力金购买课程
						</view>
						<view class="" v-else>
							已达到最高助学金
						</view>
					</view>
					<view class="tishik" v-else-if="findByObj.wdHelpStu.status==0">
						距离达成最高助学金还差 <view class="reds">
							{{(Math.abs(findByObj.classesMap.fficialPrice-findByObj.classesMap.student_price)-this.findByObj.wdHelpStu.powerAmount).toFixed(2)}}元
						</view>
					</view>
					<view class="tishik" v-else-if="findByObj.wdHelpStu.status==3">
						您的助学金过期未使用，助学金已失效
					</view>
					<view class="tishik" v-else-if="findByObj.wdHelpStu.status==2">
						活动已结束，您未获得助学金
					</view>
				</view>
				<view :class="{'qianbao':true,'animation-qianbao':inide==true}">
					<view class="mony">
						{{findByObj.wdHelpStu.powerAmount}}
					</view>
				</view>

				<view class="centet-bnu2">
					<view class="poste" v-if="findByObj.wdHelpStu.status==0||findByObj.wdHelpStu.status==1">
						<view class="duobianx">
							<image :src="imageUrl+'/static/helpStuImg/img/duobianx.png'" class="duobianx"  />
							<view class="duobianx-pice">
								￥{{(Math.abs(findByObj.classesMap.fficialPrice-findByObj.classesMap.student_price)).toFixed(2)}}
							</view>
						</view>
						<slider :min='0' :disabled='true'
							:value='(findByObj.wdHelpStu.powerAmount/Math.abs((findByObj.classesMap.fficialPrice-findByObj.classesMap.student_price)).toFixed(2)*100).toFixed(2)'
							:max='100' :line-size='40' :block-size='55' />
						<!-- 	{{(100/Math.abs((findByObj.classesMap.fficialPrice-findByObj.classesMap.student_price)).toFixed(0)*100).toFixed(0)}}
							{{findByObj.wdHelpStu.powerAmount}}
							{{Math.abs(((findByObj.classesMap.fficialPrice-findByObj.classesMap.student_price)).toFixed(0))}} -->
						<!-- {{(findByObj.classesMap.powerAmount/Math.abs(findByObj.classesMap.fficialPrice-findByObj.classesMap.student_price)*100).toFixed(0)}} -->
					</view>
					<view class="centet-bnu" v-if="findByObj.wdHelpStu.status==1">
						<view class="tow-cente" style="display: flex;align-items: center;">
							<view class="validity">
								助学金有效期：
							</view>
							<view class="" style="display: flex;align-items: center;">
								<view class="timeBjin">
									{{hr2}}
								</view>
								<view class="TheColon">
									:
								</view>
								<view class="timeBjin">
									{{min2}}
								</view>
								<view class="TheColon">
									:
								</view>
								<view class="timeBjin">
									{{sec2}}
								</view>
							</view>
						</view>
						<view class="ses-cente">
							请在助学金有效期内使用，过期将不能使用
						</view>
						<view class="button-cente"
							@click="onoutr((findByObj.classesMap.fficialPrice-findByObj.wdHelpStu.powerAmount).toFixed(2))">
							再支付￥{{(findByObj.classesMap.fficialPrice-findByObj.wdHelpStu.powerAmount).toFixed(2)}}购买课程
						</view>
						<view class="buttin-centet" @click="onActivity(1)">
							放弃本次助学金，重新发起助力
						</view>
					</view>
					<view class="shiyoingFlex" v-else-if="findByObj.wdHelpStu.status==0">
						<view class="shiyoing" @click='onShiyon'>
							立即使用
						</view>
						<button class="yaoqing" open-type="share">
							邀请好友
						</button>
					</view>
					<view class="centet-bnu" v-else>
						<view class="tow-cente" style="display: flex;align-items: center;">
							<view class="validity2">
								助学金有效期：
							</view>
							<view class="" style="display: flex;align-items: center;">
								<view class="timeBjin2">
									00
								</view>
								<view class="TheColon2">
									:
								</view>
								<view class="timeBjin2">
									00
								</view>
								<view class="TheColon2">
									:
								</view>
								<view class="timeBjin2">
									00
								</view>
							</view>
						</view>
						<view class="yaoqing2" @click='onActivity(2)'>
							重新参与
						</view>
					</view>
				</view>

				<view class="list-ui">
					<view class="list-text">
						已助力好友（{{findByObj.recordMap.length}}）
					</view>
					<view class="list-li" v-for="(item,index) in findByObj.recordMap" :key="index">
						<view class="li-left">
							{{index+1}}
						</view>
						<view class="disolefse">
							<image v-if="item.headimgurl" class="li-image" :src="item.headimgurl" mode=""></image>
							<image v-else class="li-image" :src="imageUrl+'/static/fsdownload/组40.png'" mode=""></image>
							<view class="li-name">
								{{item.stu_name.length>7?item.stu_name.slice(0,5)+'..':item.stu_name}}
							</view>
						</view>

						<view class="li-jif">
							<text>帮您获得</text>
							<text class="li-mony">+{{item.amount}}</text>
						</view>
					</view>
				</view>
			</view>

		</view>
		<view class="wuzhuangtai" v-else>
			<view class="flex23">
				<image :src="imageUrl+'/static/helpStuImg/img/dengpao.png'"  class="dengpao" />
				<view class="dengpao-text">
					您还未参与任何课程哦~
				</view>
			</view>
			<image class="doding" :src="imageUrl+'/static/helpStuImg/img/doding2.png'"  />
			<view class="xuanze" @click="OnsignUp">
				立即参与
			</view>
		</view>
		<view v-show='loginAss' class="back-tankuang">
			<login class="loginw" @guanbi='guanbi' />
		</view>

	</view>

</template>
<script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
<script>
	import {
		findByRecord,
		operationActivity,
		immediatelyUse,
		outrightPurchase,
		findByUserId
	} from "@/api/zhuli.js";
	import slider from "@/components/ly-drag-slider/dc-slider.vue"
	import {
		orderAdd,
	} from "@/api/pay.js";
	// #ifdef H5
	// var jweixin = require("jweixin-module");
	// #endif
	export default {
		props: {
			// 数据
			findByFj: {
				type: Object,
				default: {
					recordMap: []
				},
			},
		},
		components: {
			slider
		},

		data() {
			return {
				animationDuration: 0,
				imageUrl: getApp().globalData.imageUrl,
				isAss: false,
				inide: true,
				shareImg: '',
				amount: {
					amount: 0,
					PeopleCount: 0,
				},
				userList: [],
				time: '',
				showDay: false,
				onINSK: false,
				shares: true,
				hezi: false,
				loginAss: getApp().globalData.loginAss,
				time: '',
				hr: '00',
				min: '00',
				sec: '00',
				time2: '',
				hr2: '00',
				min2: '00',
				sec2: '00',
				findByObj: {}
			}
		},
		mounted() {
			this.findByObj = this.findByFj
			console.log(this.findByObj, 1)
			if (this.findByObj.flg == 0) {
				this.isAss = false
			} else {
				this.isAss = true
			}
			if (this.findByObj.wdHelpStu.status == 1) {
				this.accessTime()
				this.countdownpice();
			} else {
				this.accessTimeInAnHour()
				this.countdown()
			}
		},
		methods: {
			onoutr(value) {
				console.log(1232)
				this.$emit('onoutr', value)
			},
			OnsignUp() {
				this.$emit('plans', 3)
			},
			onActivity(value) {
				operationActivity({
					helpStuId: this.findByObj.wdHelpStu.id,
					type: value,
				}).then((res) => {
					this.$emit('playe', 2)
				})
			},
			onShiyon() {
				this.$emit('onShiyon', (Math.abs(this.findByObj.classesMap.fficialPrice - this.findByObj.classesMap
					.student_price) - this.findByObj.wdHelpStu.powerAmount).toFixed(2))
			},
			//获取一小时后的日期  时间
			accessTimeInAnHour() {
				var date = new Date();
				var date1 = new Date(this.findByObj.wdHelpStu.startTime).getTime(); // 获取开始时间戳
				var date2 = new Date(this.findByObj.wdHelpStu.endTime).getTime(); // 获取活动结束时间戳
				console.log(date1, 1)

				// 当前时间戳+3600s（一小时，其他时间通过计算时间戳进行相应加减），重新设置 Date 对象
				date.setTime(date1 + (date2 - date1));
				// date.setTime(date1 + 10000);
				console.log(date, 1)

				return this.zeroPadd(date);
			},
			//获取一小时后的日期  时间
			accessTime() {
				var date = new Date();
				var date1 = new Date(this.findByObj.wdHelpStu.startTime).getTime(); // 获取开始时间戳
				var date2 = new Date(this.findByObj.wdHelpStu.priceTime).getTime(); // 获取助学金结束时间戳
				console.log(date1, 1)

				// 当前时间戳+3600s（一小时，其他时间通过计算时间戳进行相应加减），重新设置 Date 对象
				date.setTime(date1 + (date2 - date1));
				// date.setTime(date1 + 10000);
				console.log(date, 1)

				return this.zeroPaddpice(date);
			},
			//日期时间补0
			zeroPadd(date) {
				console.log(date)
				var hours = date.getHours(); // 获取时
				var minutes = date.getMinutes(); // 获取分
				var seperator1 = "-"; // 自定义日期分隔符
				var year = date.getFullYear(); // 获取年
				var month = date.getMonth() + 1; // 获取月
				var strDate = date.getDate(); // 获取日
				let second = date.getSeconds(); //获取当前秒数(0-59)

				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				if (hours >= 0 && hours <= 9) {
					hours = "0" + hours;
				}
				if (minutes >= 0 && minutes <= 9) {
					minutes = "0" + minutes;
				}
				if (second >= 0 && second <= 9) {
					second = "0" + second;
				}

				var time = hours + ":" + minutes + ":" + second; // 时分
				var currentdate = year + seperator1 + month + seperator1 + strDate; // 年月日
				var date = {
					time,
					currentdate,
				};
				this.time = currentdate + " " + time;
				console.log(this.time);
			},

			//日期时间补0
			zeroPaddpice(date) {
				console.log(date)
				var hours = date.getHours(); // 获取时
				var minutes = date.getMinutes(); // 获取分
				var seperator1 = "-"; // 自定义日期分隔符
				var year = date.getFullYear(); // 获取年
				var month = date.getMonth() + 1; // 获取月
				var strDate = date.getDate(); // 获取日
				let second = date.getSeconds(); //获取当前秒数(0-59)

				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				if (hours >= 0 && hours <= 9) {
					hours = "0" + hours;
				}
				if (minutes >= 0 && minutes <= 9) {
					minutes = "0" + minutes;
				}
				if (second >= 0 && second <= 9) {
					second = "0" + second;
				}

				var time = hours + ":" + minutes + ":" + second; // 时分
				var currentdate = year + seperator1 + month + seperator1 + strDate; // 年月日
				var date = {
					time,
					currentdate,
				};
				this.time2 = currentdate + " " + time;
				console.log(this.time2);
			},

			countdown() {
				//倒计时
				const end = Date.parse(new Date(this.time.replace(/\-/g, '/')));
				// console.log(end)
				const now = Date.parse(new Date());
				const msec = end - now;

				// console.log(msec)
				if (msec < 0) return;

				// let day = parseInt(msec / 1000 / 60 / 60 / 24)
				let hr = parseInt(msec / 1000 / 60 / 60 % 24)
				let min = parseInt(msec / 1000 / 60 % 60);
				let sec = parseInt((msec / 1000) % 60);
				// this.day = day
				this.hr = hr > 9 ? hr : '0' + hr;
				this.min = min > 9 ? min : "0" + min;
				this.sec = sec > 9 ? sec : "0" + sec;
				// console.log(this.hr + ':' + this.min + ':' + this.sec)
				const that = this;
				if (min >= 0 && sec >= 0) {
					//倒计时结束关闭订单
					if (hr == 0 && min == 0 && sec == 0) {
						// this.$emit('onTab')
						setTimeout(() => {
							this.findByUserId()
						}, 1000);

						return;
					}
					this.timeout = setTimeout(function() {
						// console.log(123)
						that.countdown();
					}, 1000);
				}
			},
			countdownpice() {
				//倒计时
				const end = Date.parse(new Date(this.time2.replace(/\-/g, '/')));
				// console.log(end)
				const now = Date.parse(new Date());
				const msec = end - now;

				// console.log(msec)
				if (msec < 0) return;

				// let day = parseInt(msec / 1000 / 60 / 60 / 24)
				let hr = parseInt(msec / 1000 / 60 / 60 % 24)
				let min = parseInt(msec / 1000 / 60 % 60);
				let sec = parseInt((msec / 1000) % 60);
				// this.day = day
				this.hr2 = hr > 9 ? hr : '0' + hr;
				this.min2 = min > 9 ? min : "0" + min;
				this.sec2 = sec > 9 ? sec : "0" + sec;
				// console.log(this.hr + ':' + this.min + ':' + this.sec)
				const that = this;
				if (min >= 0 && sec >= 0) {
					//倒计时结束关闭订单
					if (hr == 0 && min == 0 && sec == 0) {
						// this.$emit('onTab')

						setTimeout(() => {
							this.findByUserId()
						}, 1000);

						return;
					}
					this.timeout = setTimeout(function() {
						// console.log(123)
						that.countdownpice();
					}, 1000);
				}
			},
			findByUserId() {
				findByUserId().then((res) => {
					console.log(res)
					console.log(this.findByFj, 1)
					this.findByObj = res.result
					if (this.findByObj.wdHelpStu.status == 1) {
						this.accessTime()
						this.countdownpice();
					} else {
						this.accessTimeInAnHour()
						this.countdown()
					}
					console.log(this.findByObj, 1)
				})
			},

			guanbi(value) {
				this.loginAss = value
			},
			// timeup(val) {
			// 	// 	console.log(val)
			// 	if (val == false) {
			// 		this.onINSK = true
			// 		this.inide = false
			// 		this.shares = false
			// 	}
			// },
			findByRecord() {
				findByRecord().then(res => {
					console.log(res)
					this.userList = res.result.slice(0, 100)
					this.animationDuration = Math.ceil(this.userList.length / 5) * 2
				})
			},




		}
	}
</script>

<style lang="scss" scoped>
	.disolefse {
		width: 230rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 145upx;
	}

	.duobianx {
		display: flex;
		justify-content: center;
	}

	.duobianx-pice {
		font-size: 18rpx;
		font-weight: 800;
		color: #FEFEFE;
		position: absolute;
		top: -5rpx;
		// left: 8rpx;
		z-index: 99;
	}

	.duobianx {
		width: 96rpx;
		height: 49rpx;
		position: absolute;
		right: 0;
		top: -10rpx;
	}

	.poste {
		position: relative;
	}

	.jieshu-text {
		font-size: 32rpx;
		font-family: BigruixianBlackGBV1.0;
		font-weight: 400;
		color: #C8C8C8;
	}

	.jieshu {
		width: 45.3rpx;
		height: 45.3rpx;
		margin-right: 23rpx;
	}

	.baibeiji {
		width: 652rpx;
		height: 138rpx;
		background: url($fileBaseUrl + '/zixun/img/baibeij.png');
		position: relative;
		background-repeat: no-repeat;
		background-size: 100%;
		top: -20rpx;
		z-index: 1;
		left: 49rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.shiyoingFlex {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 0 65rpx;
		margin-top: 37rpx;

	}

	.yaoqing {
		width: 231rpx;
		height: 81rpx;
		background: url($fileBaseUrl + '/zixun/img/yaoqing.png');
		background-repeat: no-repeat;
		background-size: 100%;
		display: flex;
		align-items: center;
		font-size: 32rpx;
		font-weight: bold;
		color: #FFFFFF;
		justify-content: center;
	}

	.yaoqing2 {
		width: 340rpx;
		height: 91rpx;
		background: url($fileBaseUrl + '/zixun/img/cxcy.png');
		background-repeat: no-repeat;
		background-size: 100%;
		display: flex;
		align-items: center;
		font-size: 32rpx;
		font-weight: bold;
		color: #FFFFFF;
		justify-content: center;
		margin-top: 29rpx;
	}

	.shiyoing {
		width: 220rpx;
		height: 70rpx;
		background: linear-gradient(0deg, #E9C79A 0%, #E7BD88 100%);
		border-radius: 35rpx;
		font-size: 32rpx;
		font-weight: bold;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.xuanze {
		width: 297rpx;
		height: 80rpx;
		background: url($fileBaseUrl + '/zixun/img/canyu.png');
		background-repeat: no-repeat;
		background-size: 100%;
		font-size: 32rpx;
		font-weight: 800;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 68rpx;
	}

	.doding {
		width: 126rpx;
		height: 192rpx;
		margin-top: 61rpx;
	}

	.wuzhuangtai {
		margin: 79rpx auto 0;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.flex23 {
		display: flex;
		align-items: center;
	}

	.dengpao-text {
		font-size: 32rpx;
		font-weight: bold;
		color: #FFFFFF;
	}

	.dengpao {
		width: 32rpx;
		height: 40rpx;
		margin-right: 26rpx;
	}

	.buttin-centet {
		background: linear-gradient(0deg, #E9C79A 0%, #E7BD88 100%);
		border-radius: 50rpx;
		width: 455rpx;
		height: 91rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		font-weight: bold;
		color: #FFFFFF;
		margin-top: 26rpx;
	}

	.button-cente {
		width: 455rpx;
		height: 91rpx;
		background: url($fileBaseUrl + '/studyPlanImg/button.png');
		background-size: 100%;
		background-repeat: no-repeat;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32rpx;
		font-weight: bold;
		color: #FFFFFF;
		margin-top: 35rpx;
	}

	.ses-cente {
		font-size: 24rpx;
		font-weight: 500;
		color: #83341D;
		margin-top: 25rpx;
	}

	.tow-cente {
		margin-top: 39rpx;
		display: flex;
		justify-content: center;
	}

	.tow-cente2 {
		padding-left: 35rpx;
		display: flex;
		justify-content: center;
	}


	.centet-bnu {
		// margin-bottom: 38rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.centet-bnu2 {
		margin-bottom: 38rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 50rpx;
	}

	.TheColon {
		font-size: 28rpx;
		font-weight: 800;
		color: #FF575A;
		margin-right: 15rpx;
	}

	.TheColon2 {
		font-size: 28rpx;
		font-weight: 800;
		color: #937B74;
		margin-right: 15rpx;
	}

	.timeBjin {
		width: 67rpx;
		height: 67rpx;
		background: url($fileBaseUrl + '/studyPlanImg/tiemBeijin.png');
		background-size: 100%;
		background-repeat: no-repeat;
		margin-right: 15rpx;
		font-size: 26rpx;
		font-family: HYYaKuHeiW;
		font-weight: 400;
		color: #FF2F33;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.timeBjin2 {
		width: 67rpx;
		height: 67rpx;
		background: url($fileBaseUrl + '/studyPlanImg/tiemBeijin.png');
		background-size: 100%;
		background-repeat: no-repeat;
		margin-right: 15rpx;
		font-size: 26rpx;
		font-family: HYYaKuHeiW;
		font-weight: 400;
		color: #BEBEBE;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.validity {
		font-size: 24rpx;
		font-weight: 800;
		color: #FF575A;
		margin-right: 20rpx;
	}

	.validity2 {
		font-size: 24rpx;
		font-family: BigruixianBlackGBV1.0;
		font-weight: 400;
		color: #937B74;
	}

	.reds {
		color: rgba(255, 47, 19, 1);
	}

	.tishik {
		width: 489rpx;
		height: 54rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 13rpx 3rpx rgba(125, 31, 41, 0.11);
		border-radius: 27rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: rgba(131, 52, 29, 1);
		position: absolute;
		left: 50%;
		margin-left: -244.5rpx;
		bottom: 0;
	}

	.studyPlanImg-title {
		width: 319rpx;
		height: 56rpx;
	}

	.fourLine-centet {
		font-size: 22rpx;
		font-weight: 500;
		text-decoration: line-through;
		color: #C0C0C0;
		margin-left: 15rpx;
	}

	.fourLine-letf {
		font-size: 26rpx;
		font-weight: bold;
		color: #FA642C;
	}

	.sizeText {
		font-size: 36rpx;
	}

	.fourLine-right {
		font-size: 24rpx;
		font-weight: 500;
		color: #92503C;
	}

	.fourLine {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 18rpx;
	}

	.sizeImg {
		width: 180rpx;
		height: 55rpx;
	}

	.boeder-xuxian {
		width: 100%;
		height: 1rpx;
		border: 1rpx dashed #E7DBDB;
		margin-top: 18rpx;
	}

	.scesLine {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 18rpx;
	}

	.border-yuan {
		width: 59rpx;
		height: 59rpx;
		border-radius: 50%;
		margin-right: 18rpx;
		// background-color: #000000;
	}

	.over {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box; //使用自适应布局
		-webkit-line-clamp: 1; //设置超出行数，要设置超出几行显示省略号就把这里改成几
		-webkit-box-orient: vertical;
	}

	.width1 {
		width: 500rpx;
	}

	.twoLine-text {
		ont-size: 24rpx;
		font-weight: 500;
		color: #999999;
	}

	.label {
		height: 42rpx;
		font-size: 22rpx;
		font-weight: 500;
		color: #3B7BFF;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 10rpx;
		padding: 10rpx 13rpx;
		background: rgba(231, 238, 255, 0.9);
	}

	.label2 {
		height: 42rpx;
		font-size: 22rpx;
		font-weight: 500;
		color: #FA642C;
		display: flex;
		align-items: center;
		border-radius: 10rpx;
		justify-content: center;
		padding: 10rpx 13rpx;
		background: #FFECE2;
		margin-left: 13rpx;
	}

	.kechang-text {
		width: 350rpx;
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box; //使用自适应布局
		-webkit-line-clamp: 2; //设置超出行数，要设置超出几行显示省略号就把这里改成几
		-webkit-box-orient: vertical;
	}

	.activityshifts {
		padding: 0 22rpx;
	}

	.containers {
		height: 100%;
	}

	.kechang2 {
		display: flex;
		height: 84rpx;
		// align-items: center;
		justify-content: space-between;
	}

	.twoLine {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 18rpx;
	}

	.kechang {
		width: 705rpx;
		height: 340rpx;
		background: linear-gradient(182deg, #FFFFFF 51%, #FFF2E8 100%);
		box-shadow: 0px 2rpx 8rpx 0rpx rgba(0, 0, 0, 0.2);
		border-radius: 30rpx;
		padding: 30rpx 30rpx 0rpx 30rpx;
		margin: 27rpx auto 0;
		position: relative;
		z-index: 2;
	}

	.size {
		width: 80rpx;
		display: flex;
		justify-content: center;
		padding-top: 60rpx;
	}

	.fanhui {
		width: 19rpx;
		height: 34rpx;
		// margin-right: 230rpx;
	}

	page {
		// width: 10%;
		min-height: 100%;
		// height: 100%;
	}

	@keyframes toleft {
		from {
			left: 100%;
		}

		to {
			left: -1300%;
		}
	}

	@keyframes leftRigt {
		0% {
			transform: rotate(0deg);
		}

		25% {
			transform: rotate(7deg);
		}

		50% {
			transform: rotate(-7deg);
		}

		100% {
			transform: rotate(0deg);
		}
	}



	@keyframes zhaRigt {
		from {
			transform: scale(0.5);
		}

		to {
			transform: scale(1.2);
		}

	}

	.tanchu {
		width: 100%;
		height: 100%;
		min-height: 100%;
		position: absolute;
		top: 0;
		background: rgba(39, 39, 39, 0.6);
		z-index: 3;
	}

	.button-list:after {
		border: none !important;
	}

	.hezi {
		width: 616upx;
		height: 450upx;
		background: #FFFFFF;
		border-radius: 20upx;
		position: absolute;
		top: 443upx;
		left: 65upx;
		padding-top: 53upx;
	}

	.hezi-text {
		font-size: 36upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		// margin-left: 93upx;
		text-align: center;
		line-height: 55upx;
	}

	.hezi-centet {
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #7A7A7A;
		// margin-left: 93upx;
		text-align: center;
		line-height: 55upx;
	}



	.hezi-tishi {
		width: 340rpx;
		height: 91rpx;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 91rpx;
		text-align: center;
		margin-top: 19upx;
		border-radius: 50rpx;
		background-color: red;
		// margin-top: 82rpx;
		margin: 82rpx auto;
	}


	.container {
		// background: url($fileBaseUrl + '/ykstatic/fsdownload/3.png');
		// width: 100%;
		// min-height: 100%;
		// height: 100%;
		// background-size: 100%;
		// padding-top: 170upx;
		// padding-bottom: 24rpx;
	}

	.texts {
		width: 100%;
		height: 150rpx;
		font-size: 36upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		background-color: #FFFFFF;
		line-height: 150rpx;
		padding-top: 30rpx;
		position: fixed;
		top: 0;
		z-index: 99999;
		// margin-left: 30upx;
		color: #000000;

		// image {
		// 	width: 19upx;
		// 	height: 34upx;
		// 	margin-right: 247upx;
		// }
	}

	.renshu {
		background: url($fileBaseUrl + '/ykstatic/fsdownload/1.png') no-repeat;
		width: 313upx;
		height: 80upx;
		background-size: 100%;
		// margin-top: 44upx;
		// margin-left: -94upx;
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 70upx;
		text-align: right;
		padding-right: 49upx;
	}

	.animate {
		width: 100%;
		height: 360upx;
		overflow: hidden;
		display: flex;

		.in {
			position: relative;
			min-width: 200%;
			height: 100%;
			text-align: left;
			animation: toleft infinite linear;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.row {
				margin-bottom: 0.2em;
				display: flex;

				.point {
					margin-left: 80upx;
					display: flex;
					padding: 10upx 20upx;
					background: linear-gradient(0deg, #F78A9E 0%, #F56F87 50%, #FE988B 100%);
					border-radius: 38upx;

					.headImg {
						width: 40upx;
						height: 40upx;
						border-radius: 20upx;
						margin-right: 20upx;
					}

					.name {
						padding-right: 22upx;
						font-size: 24upx;
						color: #FFFFFF;
					}

					.text {
						font-size: 24upx;
						color: #FFFFFF;
					}

					.get_money {
						margin-left: 20upx;
						color: red;
					}

					span {
						white-space: nowrap;
					}
				}
			}
		}
	}

	.jieshao {
		width: 687upx;
		height: 1033upx;
		background: #FFFFFF;
		border-radius: 30upx;
		margin-left: 32upx;
		margin-top: 63upx;
		position: relative;
	}

	.jieshao2 {
		width: 687upx;
		height: 336upx;
		background: #FFFFFF;
		border-radius: 30upx;
		margin-left: 32upx;
		margin-top: 63upx;
		position: relative;
	}

	.jieshao-top {
		display: flex;
		align-items: center;
		// position: relative;
	}

	.ren {
		width: 147upx;
		height: 150upx;
		margin-left: 31upx;
		margin-top: 18rpx;
	}

	.zi {
		width: 346upx;
		height: 39upx;
	}

	.botton-border {
		width: 568upx;
		height: 1upx;
		border: 1upx dashed #C9C9C9;
		position: absolute;
		top: 150upx;
		left: 57upx;
	}

	.text-jieshao {
		font-size: 27upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #4F1A1A;
		line-height: 34upx;
		text-indent: 3upx;
	}

	.tetx-div {
		width: 574upx;
		height: 838upx;
		margin-left: 58upx;
		margin-top: 16upx;
	}

	.tetx-div2 {
		width: 574upx;
		// height: 838upx;
		margin-left: 58upx;
		// margin-top: 16upx;
	}

	.fangshi {
		font-size: 28upx;
		font-family: FZCuYuan-M03S;
		font-weight: 400;
		color: #915645;
		line-height: 26upx;
		margin-top: 55upx;
	}

	.guize {
		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #4F1A1A;
		line-height: 44rpx;
		margin-top: 35upx;
	}

	.guize-two {
		margin-top: 24upx;
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 600;
		color: RGBA(79, 26, 26, 1);
	}

	.button {
		background: url($fileBaseUrl + '/ykstatic/fsdownload/4.png');
		width: 611upx;
		height: 91upx;
		background-size: 100%;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 91upx;
		text-align: center;
		margin-left: 45upx;
		margin-top: 50upx;
	}

	.height {
		height: 35upx;
	}

	.zhankai {
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #7C7C7C;
		position: absolute;
		bottom: 10upx;
		left: 300upx;
		z-index: 2;
	}

	.zhankai2 {
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #7C7C7C;
		// position: absolute;
		// bottom: -117rpx;
		margin-left: 310upx;
		z-index: 2;
		position: relative;
		bottom: 30rpx;
	}

	.list {
		width: 687upx;
		height: auto;
		min-height: 750upx;
		background-size: 100%;
		min-height: 1000rpx;
		margin-left: 31upx;
		// margin-top: 35upx;
		padding-top: 36upx;
		background: #FFFFFF;
		border-radius: 40px;
		position: relative;
	}


	.list-biaoti {
		font-size: 40upx;
		font-family: FZCuYuan-M03S;
		font-weight: 600;
		color: #915645;
		// line-height: 26upx;
		margin: 0 auto;
		margin-left: 205upx;
	}

	.lidai {
		width: 687upx;
		height: 411upx;
		margin-top: 25rpx;
		background: url($fileBaseUrl + '/zixun/img/onw.png');
		background-size: 100%;
		background-repeat: no-repeat;
		position: relative;
	}

	.animation-lidai {
		animation: zhaRigt 1s infinite linear;
	}

	.qianbao {
		width: 383upx;
		height: 389upx;
		background: url($fileBaseUrl + '/zixun/img/img3.png');
		background-repeat: no-repeat;
		background-size: 100%;
		position: absolute;
		top: 105upx;
		left: 50%;
		margin-left: -191.5rpx;
		z-index: 0;
		display: flex;
		justify-content: center;
		background-position-y: center;
	}

	.animation-qianbao {
		animation: leftRigt 2s infinite ease;
	}

	.mony {
		font-size: 50rpx;
		font-family: HYYaKuHeiW;
		font-weight: 400;
		color: #FFFFFF;
		text-shadow: 0px 0px 13rpx rgba(125, 31, 41, 0.39);
		// margin-left: 116upx;
		text-align: center;
		position: absolute;
		bottom: 121rpx;
		display: flex;
	}

	.uyase {
		font-size: 32rpx;
	}

	.shijian {
		font-size: 24upx;
		font-family: FZCuYuan-M03S;
		font-weight: 400;
		color: #A33818;
		margin-top: 120upx;
		// margin-left: 53upx;
		display: flex;
		justify-content: center;
	}

	.jinbi {
		width: 681upx;
		min-height: 600upx;
		height: auto;
		background: url($fileBaseUrl + '/ykstatic/fsdownload/8.png');
		background-size: 100%;
		// margin-top: 233upx;
	}

	.list-ui {
		padding: 0 22upx 0 22upx;
		height: auto;
		// position: absolute;
		top: 546upx;
		height: 480upx;
		overflow-y: scroll;
	}

	.list-text {
		font-size: 26upx;
		font-family: FZCuYuan-M03S;
		font-weight: 600;
		color: #915645;
		margin-bottom: 20upx;
	}

	.list-li {
		width: 639upx;
		height: 84upx;
		background: #FFFFFF;
		box-shadow: 0px 0px 20upx 4upx rgba(166, 166, 166, 0.15);
		border-radius: 20upx;
		display: flex;
		align-items: center;
		margin-top: 15upx;
	}

	.li-left {
		font-size: 30upx;
		font-family: FZCuYuan-M03S;
		font-weight: 400;
		color: #B5B5B5;
		margin-left: 28upx;
	}

	.li-image {
		width: 52upx;
		height: 52upx;
		margin-left: 24upx;
		border-radius: 50upx;
	}

	.li-name {
		font-size: 24upx;
		font-family: FZCuYuan-M03S;
		font-weight: 600;
		color: #DB7209;
		margin-left: 23upx;
	}

	.li-jif {
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 600;
		color: #666666;
		// margin-left: 165upx;
	}


	.li-mony {
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 600;
		color: rgba(255, 89, 33, 1);
	}

	.button-list {
		width: 600upx;
		height: 90upx;
		background: #FF2121;
		border-radius: 40upx;
		line-height: 80upx;
		text-align: center;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		background: url($fileBaseUrl + '/ykstatic/fsdownload/4.png');
		background-size: 100%;
		position: fixed;
		bottom: 49upx;
		left: 77upx;
		z-index: 999;
	}

	.shareImg {
		width: 100%;
		height: calc(100vh - var(--window-top));
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
