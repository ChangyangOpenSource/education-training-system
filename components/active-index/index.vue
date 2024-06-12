<template>
	<view class="">

		<view class="acticew" v-if="Object.keys(findBySeriesObj).length != 0">
			<view class="top"
				v-if="findBySeriesObj.courseUnitDetailsVo && findBySeriesObj.courseUnitDetailsVo.courseName!=null">
				<view class="text">
					<image :src="imageUrl+'/xing/scxx.png'"  />
				</view>
				<view class="flxe border-s">
					<view class="">
						<image :src="findBySeriesObj.courseUnitDetailsVo.teacherImagePhoto" class="imgRadiue"  />
					</view>
					<view class="right">
						<view class="right-top">
							{{findBySeriesObj.courseUnitDetailsVo.liveClassroomName==null?'暂无':findBySeriesObj.courseUnitDetailsVo.liveClassroomName}}
						</view>

						<view class="flxe hesie">
							<view class="right-centet">
								{{findBySeriesObj.courseUnitDetailsVo.courseName==null?'暂无':findBySeriesObj.courseUnitDetailsVo.courseName}}
							</view>
							<view class="flxe">
								<view class="colors" v-if="findBySeriesObj.courseUnitDetailsVo.lookPercentage==100">
									已学完
								</view>
								<view class="colors" v-else>
									已学习{{findBySeriesObj.courseUnitDetailsVo.lookPercentage==null?0:findBySeriesObj.courseUnitDetailsVo.lookPercentage}}%
								</view>
								<view class="xueixBUtonn" @click="continueStudying">
									继续学习
								</view>
							</view>

						</view>
					</view>
				</view>
			</view>

			<view class="bottom">
				<view class="flxe" v-if="findBySeriesObj.classesMap.wdClassesGrouping">
					<view :class="{titleText:true,titleColors:type==index}" @click="onClassMap(item,index)"
						v-for="(item,index) in findBySeriesObj.classesMap.wdClassesGrouping" :key='item.id'>
						{{item.sectionName}}
					</view>
				</view>
				<view class="flxe titleText  titleColors marse" v-else>
					班级课程
				</view>
				<view class="flxe titleColor" v-if="findBySeriesObj.classesMap.wdClassesGrouping">
					共<view class="blue" v-if="findBySeriesObj.classesMap.wdClassesGrouping.length!=0">
						<view class="" v-if="findArr.learningPhaseMap">
							{{ findArr.learningPhaseMap.length}}
						</view>
					</view>
					<view class="blue" v-else>
						0
					</view>个阶段 {{lengThs}}个模块
				</view>
				<view class="flxe titleColor" v-else>
					共<view class="blue">
						{{ findArr.length}}
					</view>个阶段 {{lengThs}}个模块
				</view>
				<view class="" v-if="findBySeriesObj.classesMap.wdClassesGrouping">
					<view class="cengters" v-if="findArr.learningPhaseMap[0]==null">

					</view>
					<view class="cengters" v-else>
						<view :class="{jieduan:true,jieduanClose:findType==index}"
							v-for="(item,index) in findArr.learningPhaseMap" @click="onLearn(index)" :key='item.id'>
							{{item.learningPhaseText}}阶段
						</view>
					</view>

				</view>
				<view class="cengters" v-else>
					<view :class="{jieduan:true,jieduanClose:findType==index}" v-for="(item,index) in findArr"
						@click="onLearn(index)" :key='item.id'>
						{{item.learningPhaseText}}阶段
					</view>
				</view>
				<view class="bottomswe" v-if="findBySeriesObj.classesMap.wdClassesGrouping">
					<view v-for="items in findArr.learningPhaseMap[findType].learningPhaseCourseMap" :key="items.id"
						class="bordfers">
						<Msodules :courseId="classesId" :item="items" :types='1'>
						</Msodules>
					</view>
				</view>
				<view class="bottomswe" v-else>
					<view v-for="items in findArr[findType].learningPhaseCourseMap" :key="items.id" class="bordfers">
						<Msodules :courseId="classesId" :item="items" :types='1'>
						</Msodules>
					</view>
				</view>
			</view>
		</view>

		<view class="acticew" v-if=" Object.keys(findByModuleObj).length != 0">
			<view class="class_section">
				<view v-for="(test1, idx1) in findByModuleObj.list" class="borse" :key="test1"
					style="margin-bottom: 21rpx;">
					<!-- 标题 -->
					<view class="dis-borderbox title_h" @click="openFun(test1.chapterid)">
						<view class="title-s">
							<Title :title="test1.chapterName" :type="test1.type" />
						</view>
						<view class="time_p">
							<image v-if="test1.type == 1" :src="imageUrl + '/static/learn/liveIcons.png'" mode=""
								class="icons">
								<image v-else :src="imageUrl+'/static/video_1632402245294.png'" mode="" class="icons2">
								</image>
								<!-- @/static/learn/audioIcon.png-----视频icon -->
								<text class="bytes">{{ test1.type == 1 ? "直播" : "视频" }}</text>
								<text class="bytes">{{ test1.list.length || 0 }} 节</text>

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
						<view class="section_h" v-for="(test2, idx2) in test1.list"
							@click="goVideoRoom(test1, test2, idx1, idx2)" :key="test2">
							<view class="dis-borderbox body_content">
								<view class="" style="display: flex;">

									<view class="iconsese">
										<image v-if="test1.type == 1" :src="imageUrl + '/static/learn/liveIcons.png'"
											mode="" class="icons">
										</image>
										<image v-else :src="imageUrl+'/static/video_1632402245294.png'" mode=""
											class="icons2"></image>
									</view>
									<view class="yyy">
										<view class="ovs_1-1">
											<text class="two-row colorse">{{ test2.liveClassroomName }}</text>
										</view>
										<view class="ovs_1-2">
											<text style="margin-right: 20rpx;">讲师：{{ test2.teacherName }}</text>
											<text v-if="test2.type == 2">{{ test2.duration }}</text>
											<view v-if="test2.type == 1">{{ test2.liveStartTime }}</view>
										</view>
									</view>
								</view>
								<!-- 按钮 -->
								<view>
									<!-- 已购买 -->
									<view class="startType" v-if="test2.liveClassroomStatus == 1 && test1.type == 1"
										:style="{'background-image': 'url('+imageUrl+'/static/startType2_1631613939749.png)'}">
										<image :src="imageUrl+'/static/learn/liveIcon.png'" mode="" class="live_icon">
										</image>
										<text class="ttt">待在线</text>
									</view>

									<view class="startType"
										v-else-if="test2.liveClassroomStatus == 2 && test1.type == 1"
										style="background: linear-gradient(90deg, #fd7a3f, #fa632b);">
										<image :src="imageUrl+'/static/learn/liveIcon.png'" mode="" class="live_icon">
										</image>
										<text class="ttt">在线中</text>
									</view>

									<view class="startType"
										v-else-if="test2.liveClassroomStatus == 3 && test1.type == 1"
										:style="{'background-image': 'url('+imageUrl+'/static/startType3_1631613967962.png)'}">
										<image :src="imageUrl+'/static/learn/liveIcon.png'" mode="" class="live_icon">
										</image>
										<text class="ttt">已结束</text>
									</view>

									<view class="startType"
										v-else-if="test2.liveClassroomStatus == 4 && test1.type == 1"
										:style="{'background-image': 'url('+imageUrl+'/static/startType1_1631613893009.png)'}">
										<image :src="imageUrl+'/static/learn/liveIcon.png'" mode="" class="live_icon">
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
										<text v-if="test2.lookPercentage<100" :style="{'color':'rgba(59, 123, 255, 1)'}"
											class="ttt">已学{{test2.lookPercentage}}%</text>
										<text v-else-if="test2.lookPercentage>=100"
											:style="{'color':'rgba(59, 123, 255, 1)'}" class="ttt">已学完</text>
									</view>



									<view class="startType" v-if="!test2.vid && test1.type == 2"
										:style="{'width': '126rpx','height': '44rpx','background-image': 'url('+imageUrl+'/static/playD_1632480635217.png)'}">
										<!-- <text class="ttt">待更新</text> -->
									</view>
								</view>


							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		queryCourseDetailsCourseOrSubNew,
	} from "@/api/curriculumDetail.js";
	import ComponentItem from "@/pagesA/components/componentItem/componentItem.vue";
	import Msodules from "@/components/modules-index/xuexi.vue";
	import Title from "@/components/title_comp.vue";
	export default {
		data() {
			return {
				imageUrl: getApp().globalData.imageUrl,
				type: 0,
				findType: 0,
				findArr: [],
				lengThs: 0,
				maxheight: 168,
				openArr: [],
				classesId: ''
			}
		},
		// props: {
		// 	// 数据
		// 	findBySeriesObj: {
		// 		type: Object,
		// 		default: {},
		// 	},
		// 	findByModuleObj: {
		// 		type: Object,
		// 		default: {},
		// 	},
		// },
		watch: {
			findBySeriesObj(obj, news) {
				this.lengThs = 0
				console.log(obj, news, 'chu')
				if (Object.keys(obj).length != 0) {
					this.classesId = uni.getStorageSync('keChenXq').classesId
					if (obj.classesMap.wdClassesGrouping) {
						this.findArr = obj.classesMap.wdClassesGrouping[0]
						obj.classesMap.wdClassesGrouping[this.type].learningPhaseMap.forEach((res, index) => {
							this.lengThs += res.learningPhaseCourseMap.length
						})
					} else {
						this.findArr = obj.classesMap.learningPhaseMap
						obj.classesMap.learningPhaseMap.forEach((res, index) => {
							this.lengThs += res.learningPhaseCourseMap.length
						})
					}
					console.log(this.findArr)
				}
			},
			findByModuleObj(obj, news) {
				this.openArr.push(obj.list[0].chapterid)
			}
		},
		props: ['findBySeriesObj', 'findByModuleObj', 'itRmes'],
		mounted() {
			console.log(this.findBySeriesObj, 'chus')
			console.log(this.findByModuleObj, 'chus')
			if (Object.keys(this.findBySeriesObj).length != 0) {
				this.classesId = uni.getStorageSync('keChenXq').classesId
				if (this.findBySeriesObj.classesMap.wdClassesGrouping) {
					this.findArr = this.findBySeriesObj.classesMap.wdClassesGrouping[0]
					this.findBySeriesObj.classesMap.wdClassesGrouping[this.type].learningPhaseMap.forEach((res, index) => {
						// res.learningPhaseMap.forEach((resr, indexs) => {
						this.lengThs += res.learningPhaseCourseMap.length
						// })

					})

				} else {
					this.findArr = this.findBySeriesObj.classesMap.learningPhaseMap
					this.findBySeriesObj.classesMap.learningPhaseMap.forEach((res, index) => {

						this.lengThs += res.learningPhaseCourseMap.length

					})
				}

				console.log(this.findArr)
			} else if (Object.keys(this.findByModuleObj).length != 0) {
				this.openArr.push(this.findByModuleObj.list[0].chapterid)
			}

		},
		components: {
			Msodules,
			Title
		},
		methods: {
			continueStudying() {
				if (this.findBySeriesObj.courseUnitDetailsVo.type == 1) {
					if (this.findBySeriesObj.courseUnitDetailsVo.liveClassroomStatus == 2 || this.findBySeriesObj
						.courseUnitDetailsVo.liveClassroomStatus == 1) {
						uni.navigateTo({
							url: `/pages/webView/webView?channel=${this.findBySeriesObj.courseUnitDetailsVo.channel}&classid=${this.itRmes.classesId}&courseId=${this.findBySeriesObj.courseUnitDetailsVo.courseid}&unitId=${this.findBySeriesObj.courseUnitDetailsVo.id}&activeIsAss=1`
						})
						return
					}
					if (this.findBySeriesObj.courseUnitDetailsVo.liveClassroomStatus == 4) {
						uni.navigateTo({
							url: '/pages/videoRoom/videoRoom?vid=' + this.findBySeriesObj.courseUnitDetailsVo.vid +
								'&videoId=' + this.findBySeriesObj.courseUnitDetailsVo.id + '&sourceType=' + this
								.findBySeriesObj.courseUnitDetailsVo.sourceType
						})
						return
					}
					uni.showToast({
						title: '在线已结束',
						icon: 'none'
					})
				} else {
					uni.navigateTo({
						url: '/pages/videoRoom/videoRoom?vid=' + this.findBySeriesObj.courseUnitDetailsVo.vid +
							'&videoId=' + this.findBySeriesObj.courseUnitDetailsVo.id + '&classid=' + this.itRmes
							.classesId +
							'&unitId=' + this.findBySeriesObj.courseUnitDetailsVo.id + '&courseId=' + this
							.findBySeriesObj.courseUnitDetailsVo.courseid + '&sourceType=' + this
							.findBySeriesObj.courseUnitDetailsVo.sourceType + '&lookPercentage=' + this
							.findBySeriesObj.courseUnitDetailsVo.lookPercentage + '&speedOfProgress=' + this
							.findBySeriesObj.courseUnitDetailsVo.speedOfProgress
					})
					return
				}
			},
			goVideoRoom(data1, data2, idx1, idx2) {
				console.log(this.findByModuleObj, 123213)
				console.log(data1, 456)
				console.log(data2, 456)
				this.arr = []
				this.objde = {}
				if (this.findByModuleObj.isNoBuy == 1) {
					this.findByModuleObj.list.forEach((item, index) => {
						console.log(item, '000')
						// this.arr=[]
						item.list.forEach((res) => {
							console.log(res, '111')
							this.arr.push({
								classid: '',
								courseId: data2.courseId,
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
					this.findByModuleObj.list.forEach((item, index) => {
						console.log(item, '000')
						item.list.forEach((res) => {
							console.log(res, '111')
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

				console.log(this.arr, 8888)
				// if (this.findByModuleObj.isNoBuy == 1) {

				this.audition(data1, data2, idx1, idx2)

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
			onClassMap(item, index) {
				this.type = index
				this.findArr = item
				this.lengThs = 0
				this.findBySeriesObj.classesMap.wdClassesGrouping[this.type].learningPhaseMap.forEach((res, index) => {
					// res.learningPhaseMap.forEach((resr, indexs) => {
					this.lengThs += res.learningPhaseCourseMap.length
					// })

				})
			},
			onLearn(index) {
				this.findType = index
			},
			audition(data1, data2, idx1, idx2) {
				console.log(data1)
				console.log(data2)
				console.log(idx1)
				console.log(idx2)
				if (data1.type == 1) {
					//在线
					if (this.findByModuleObj.isNoBuy == 0 && data2.unlock.unlockType != 9 && data2.unlock.isUnLock == 0) {
						this.unlock = data2
						if (data2.unlock.unlockType == 1) {
							this.isAss = true
							this.isREs = false
							console.log(123)
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
					if (data2.vid) {
						uni.setStorageSync('materials', data2.materials)
						console.log(data2.vid)
						console.log(data2.id)
						console.log(this.classId)
						console.log(data2.courseid)
						uni.navigateTo({
							url: `/pages/videoRoom/videoRoom?vid=${data2.vid}&videoId=${data2.id}&classid=${this.classid!='undefined'&&this.classid!='null'?this.classid:''}&courseId=${data2.courseid}&unitId=${data2.id}&arr=${JSON.stringify(this.arr)}&sourceType=${data2.sourceType}&speedOfProgress=${data2.speedOfProgress}`,
						});
					} else {
						uni.showToast({
							title: '视频暂未更新',
							icon: 'none'
						})
					}
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.hesie {
		justify-content: space-between;
	}

	.marse {
		margin-left: 26rpx;
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
		height: 430rpx;

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
		padding-right: 30rpx;
	}

	// .ovs_2{
	// 	min-width: 140rpx;
	// }

	.ovs_1-1 {
		margin-bottom: 18rpx;
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
		width: 100%;
		box-sizing: border-box;
		padding: 0 28rpx;
		height: 170rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;

		.ovs_2-1 {
			padding: 13rpx 14rpx;
			background-color: #fff2e2;
			color: #fd8c01;
		}
	}

	// 课节
	.class_section {
		margin: 20rpx auto 0;
		padding-bottom: 150rpx;
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
					width: 26rpx;
					height: 27rpx;
				}

				.icons2 {
					width: 27rpx;
					height: 24rpx;
				}

				.bytes {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #999999;
				}

				.more_icon {
					width: 22rpx;
					height: 12rpx;
				}
			}
		}

		// 标题
		.title_h {
			height: 103rpx;
			padding: 0rpx 29rpx 0rpx 28rpx;
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

		// 下拉
		.collapse {
			width: 100%;
			background-color: #fff;
			overflow-y: hidden;
			transition: all 0.5s;

			border-radius: 0 0 20rpx 20rpx;


			.section_h {
				padding: 0rpx 29rpx 0rpx 28rpx;

				.bodsecontent {
					width: 100%;
					height: 100%;
					// border-bottom: 2rpx solid #dddddd;

					.iconsese {
						// width: 35rpx;
						// height: 35rpx;
						margin-right: 12rpx;

						.icons {
							width: 26rpx;
							height: 27rpx;
							margin-top: 6rpx;
						}

						.icons2 {
							width: 27rpx;
							height: 24rpx;
							margin-top: 8rpx;
						}
					}

					.colorse {
						font-size: 28rpx;
						font-weight: 400;
						color: #333333;
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
					border-top: 2rpx solid #dddddd;
					padding: 18rpx 0 20rpx;

					.iconsese {
						// width: 35rpx;
						// height: 35rpx;
						margin-right: 12rpx;

						.icons {
							width: 26rpx;
							height: 27rpx;
							margin-top: 6rpx;
						}

						.icons2 {
							width: 27rpx;
							height: 24rpx;
							margin-top: 8rpx;
						}
					}

					.colorse {
						font-size: 28rpx;
						font-weight: 400;
						color: #333333;
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

	.bottomswe {
		margin-top: 24rpx;
		border-top: 2rpx solid #fafafa;
		// padding: 0 27rpx;
	}

	.bordfers {}

	.cengters {
		// width: 666rpx;
		margin-top: 28rpx;
		margin-left: 26rpx;
		display: flex;
		align-items: center;
		// overflow: scroll;
		overflow: scroll;
	}

	.jieduan {
		width: 153rpx;
		min-width: 153rpx;
		white-space: nowrap;
		height: 55rpx;
		background: #EEEEEE;
		border-radius: 28rpx;
		font-size: 26rpx;
		font-weight: 400;
		color: #333333;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 34rpx;
	}

	.jieduanClose {
		background: $uni-primary;
		font-size: 26rpx;
		font-weight: 500;
		color: #FFFFFF;
	}

	.titleColor {
		font-size: 24rpx;
		font-weight: 400;
		color: #575757;
		margin-top: 27rpx;
		margin-left: 26rpx;
	}

	.blue {
		color: rgba(61, 125, 255, 1);
	}

	.titleText {
		font-size: 34rpx;
		font-weight: bold;
		color: #A6A6A6;
		margin: 0 26rpx;
		white-space: nowrap;
	}

	.titleColors {
		font-weight: bold !important;
		color: #333333 !important;
	}

	.bottom {
		width: 692rpx;
		height: 100%;
		background: #FFFFFF;
		border-radius: 20rpx;
		padding-top: 24rpx;
		margin-top: 21rpx;
	}

	.mar-r {
		margin-right: 46rpx;
		white-space: nowrap;
		margin-top: 15rpx;
	}

	.mar-r2 {
		margin-right: 64rpx;
		white-space: nowrap;
		margin-top: 15rpx;
	}


	.xueixBUtonn {
		width: 126rpx;
		height: 44rpx;
		margin-left: 15rpx;
		background: linear-gradient(0deg, #E9C79A 0%, #E7BD88 100%);
		border-radius: 22rpx;

		font-size: 24rpx;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 44rpx;
		text-align: center;
	}

	.border-s {
		border-top: 1px solid #fafafa;
		// justify-content: space-between;
		padding-top: 24rpx;
		margin-top: 27rpx;
	}

	.acticew {
		margin-top: 21rpx;
		padding: 0 31rpx;
	}

	.indsw {
		width: 30rpx;
		height: 30rpx;
	}

	.flxe {
		display: flex;
		align-items: center;
		overflow-x: scroll;
	}

	.right {
		width: 100%;
		margin-left: 29rpx;
	}

	.top {
		width: 690rpx;
		// height: 261rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		padding: 23rpx 22rpx 28rpx 22rpx;
	}

	.text {
		font-size: 34rpx;
		font-weight: bold;
		color: #333333;

		image {
			width: 188rpx;
			height: 48rpx;
		}
	}

	.imgRadiue {
		width: 124rpx;
		height: 124rpx;
		background: #EAE8EB;
		border-radius: 50%;
		border: 2rpx solid #E8C18E;
	}

	.right-top {
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
		margin-bottom: 22rpx;
	}

	.right-centet {
		font-size: 26rpx;
		font-weight: 500;
		color: #666666;
	}

	.colors {
		width: 136rpx;
		height: 46rpx;
		background: RGBA(251, 243, 234, 0.6);
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #D3A468;
		margin-left: 12rpx;

		border-radius: 23rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>