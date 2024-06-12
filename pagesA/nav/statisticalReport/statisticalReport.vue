<template>
	<view class="bg">
		<!-- <cover-view>
			<top_nav_return_green :topNavTitle="topNavTitle"></top_nav_return_green>
		</cover-view> -->
		<coverviewTop :topNavTitle="topNavTitle"></coverviewTop>
		<section id="top-box">
			<div class="item">
				<div class="text1">
					{{statisticalReportMajor.studentQuestionsNumber?statisticalReportMajor.studentQuestionsNumber : '0' }}
				</div>
				<div class="text2">做题数</div>
			</div>
			<div class="hr"> </div>
			<div class="item">
				<div class="text1">
					{{statisticalReportMajor.studentQuestionsAccuracy?statisticalReportMajor.studentQuestionsAccuracy : '0' }}%
				</div>
				<div class="text2">正确率</div>
			</div>
			<div class="hr"> </div>
			<div class="item">
				<div class="text1">
					{{statisticalReportMajor.questionsAccuracy?statisticalReportMajor.questionsAccuracy : '0' }}%
				</div>
				<div class="text2">全网正确率</div>
			</div>
		</section>
		<view class="title"> 答题正确率 </view>
		<section id="second-box">
			<ChartA ref="ChartA" :chartA_Length="chartA_Length" :chartA_title="chartA_title"
				:chartA_myData="chartA_myData" :chartA_peopleData="chartA_peopleData" :activeHeight="activeHeight">
			</ChartA>
		</section>
		<section id="third-box">
			<ChartB ref="ChartB" :chartB_myData="chartB_myData" :chartB_peopleData="chartB_peopleData"></ChartB>
		</section>
		<view class="title"> 巩固薄弱项 </view>
		<section id="fourth-box">
			<view id="weak-box">
				<view class="weak-item" v-for="(item,index) in weakList_five" :key="index" @click="goEXE(item.id)">
					<view class="weak-item-left"> {{item.templateName ? item.templateName : ''}} </view>
					<view class="weak-item-right">
						<view class="text" ref="a1"> 正确率 {{item.studentQuestionsAccuracy}}% </view>
						<view class="btn" ref="a2"> 去练习 > </view>
					</view>
				</view>
			</view>
		</section>
	</view>
</template>

<script>
	import coverviewTop from '@/pagesA/components/coverviewTop.vue'
	import {
		obtainStatisticalReport, //统计报告数据
	} from '@/api/report.js'
	import {
		getMajorInfo2
	} from '@/common/util/index.js'
	import ChartA from './components/chartA.vue'
	import ChartB from './components/chartB.vue'
	export default {
		components: {
			ChartA,
			ChartB,
			coverviewTop
		},
		data() {
			return {
				topNavTitle: '统计报告', // 页面自定义顶部导航标题
				statisticalReportMajor: {}, // 我的做题数、我的正确率、全网正确率
				statisticalReportChapters: [], // 我当前专业下各章节的正确率与全网正确率
				chartA_Length: 0, // 此专业下章节数
				chartA_title: [], //我当前专业下的专业列表
				chartA_myData: [], //我当前专业下各章节的正确率与全网正确率
				chartA_peopleData: [], //我当前专业下各章节的正确率与全网正确率
				chartB_title: [], //我当前专业下的专业列表
				chartB_myData: [], //我当前专业下各章节的正确率与全网正确率
				chartB_peopleData: [], //我当前专业下各章节的正确率与全网正确率
				weakList_five: [], //最弱的五章节
				activeHeight:0,
			}
		},
		onLoad() {
			this.getData()
		},
		mounted() {},
		methods: {
			ObjectLength(object) {
				var length = 0;
				for (var key in object) {
					if (object.hasOwnProperty(key)) {
						++length;
					}
				}
				return length;
			},
			getData() {
				// 获取统计报告数据
				obtainStatisticalReport({
					majorId: getMajorInfo2().id
				}).then((res) => {
					if (res.code == 200) {
						// 获取此专业数据
						this.statisticalReportMajor = res.result.statisticalReportMajor
						// 获取此专业各章节数据
						this.statisticalReportChapters = res.result.statisticalReportChapters
						// 获取此专业【最弱前五章节数据】
						this.weakList_five = res.result.statisticalReportChapters.slice(0, 5)
						// 统计条形统计图数据
						this.statisticalReportChapters.forEach((item, index) => {
							this.chartA_title.push(item.templateName)
							this.chartA_myData.push(item.studentQuestionsAccuracy)
							this.chartA_peopleData.push(item.questionsAccuracy)
						})
						// 调用条形统计图组件赋值方法
						this.$refs.ChartA.getServerData()
						// 此专业下章节数
						this.chartA_Length = this.statisticalReportChapters.length
						// 答题正确率，动态高度
						this.activeHeight = (100 * this.chartA_Length) + 200 + 'rpx'
						// 统计雷达图数据
						let radarChart = res.result.radarChart
						// 雷达图--正确率
						if (radarChart.radarChartAnswerAccuracy) {
							this.chartB_myData.push(radarChart.radarChartAnswerAccuracy.studentQuestionsAccuracy)
							this.chartB_peopleData.push(radarChart.radarChartAnswerAccuracy.questionsAvgAccuracy)
						} else {
							this.chartB_myData.push(0)
							this.chartB_peopleData.push(0)
						}
						// 雷达图--平均用时
						let radarChartAnswerTime = radarChart.radarChartAnswerTime
						if (radarChartAnswerTime) {
							if (radarChartAnswerTime.answerMaxTime != 0) {
								this.chartB_myData.push(((radarChartAnswerTime.studentAnswerAvgTime /
									radarChartAnswerTime.answerMaxTime) * 100).toFixed(2))
								this.chartB_peopleData.push(((radarChartAnswerTime.answerAvgTime /
									radarChartAnswerTime.answerMaxTime) * 100).toFixed(2))
							} else {
								this.chartB_myData.push(0)
								this.chartB_peopleData.push(0)
							}
						} else {
							this.chartB_myData.push(0)
							this.chartB_peopleData.push(0)
						}
						// 雷达图--测评次数
						let radarChartPaperCount = radarChart.radarChartPaperCount
						if (radarChartPaperCount) {
							if (radarChartPaperCount.maxPaperCount != 0) {
								this.chartB_myData.push(((radarChartPaperCount.studentPaperCount /
									radarChartPaperCount.maxPaperCount) * 100).toFixed(2))
								this.chartB_peopleData.push(((radarChartPaperCount.avgPaperCount /
									radarChartPaperCount.maxPaperCount) * 100).toFixed(2))
							} else {
								this.chartB_myData.push(0)
								this.chartB_peopleData.push(0)
							}
						} else {
							this.chartB_myData.push(0)
							this.chartB_peopleData.push(0)
						}
						// 雷达图--做题数量
						let radarChartQuestionNumber = radarChart.radarChartQuestionNumber
						if (radarChartQuestionNumber) {
							if (radarChartQuestionNumber.maxQuestionNumber != 0) {
								this.chartB_myData.push(((radarChartQuestionNumber.studentQuestionNumber /
									radarChartQuestionNumber.maxQuestionNumber) * 100).toFixed(2))
								this.chartB_peopleData.push(((radarChartQuestionNumber.avgQuestionNumber /
									radarChartQuestionNumber.maxQuestionNumber) * 100).toFixed(2))
							} else {
								this.chartB_myData.push(0)
								this.chartB_peopleData.push(0)
							}

						} else {
							this.chartB_myData.push(0)
							this.chartB_peopleData.push(0)
						}
						// 雷达图--学习时长
						let radarChartStudyTime = radarChart.radarChartStudyTime
						if (radarChartStudyTime) {
							if (radarChartStudyTime.studyMaxTime != 0) {
								this.chartB_myData.push(((radarChartStudyTime.studyAvgTime /
									radarChartStudyTime.studyMaxTime) * 100).toFixed(2))
								this.chartB_peopleData.push(((radarChartStudyTime.studentStudyTime /
									radarChartStudyTime.studyMaxTime) * 100).toFixed(2))
							} else {
								this.chartB_myData.push(0)
								this.chartB_peopleData.push(0)
							}

						} else {
							this.chartB_myData.push(0)
							this.chartB_peopleData.push(0)
						}
						// 调用雷达图组件赋值方法
						this.$refs.ChartB.getServerData()
					}

				})
			},
			goEXE() {
				uni.navigateBack()
			}
		}
	}
</script>

<style scoped lang="scss">
	#weak-box {
		.weak-item:last-child {
			border-bottom: none;
		}

		.weak-item {
			margin: 0 30rpx;
			padding: 35rpx 0 25rpx 0;
			border-bottom: 1rpx solid #EEEEEE;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.weak-item-left {
				width: 300rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
			}

			.weak-item-right {
				display: flex;
				align-items: center;

				.text {
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #898989;
				}

				.btn {
					margin-left: 30rpx;
					width: 129rpx;
					height: 46rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					background: #01909F;
					border-radius: 23rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
				}
			}
		}
	}

	.title {
		margin: 40rpx 30rpx 0;
		font-size: 34rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
	}

	.bg {
		overflow: hidden;
		background: rgba(249, 249, 249, 0.8);
		background: #F8F8F8;
		min-height: 100vh;
		// padding: 0 30rpx;
		padding-top: 160rpx;
		padding-bottom: 200rpx;
	}

	#fourth-box {
		margin: 30rpx 30rpx 0;
		width: 691rpx;
		// height: 589rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 22rpx 14rpx 4rpx rgba(230, 230, 230, 0.13);
		border-radius: 20rpx;
	}

	#third-box {
		margin: 30rpx 30rpx 0;
		width: 691rpx;
		height: 589rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 22rpx 14rpx 4rpx rgba(230, 230, 230, 0.13);
		border-radius: 20rpx;
	}

	#second-box {
		margin: 30rpx 30rpx 0;
		background: tan;
		width: 691rpx;
		// height: 589rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 22rpx 14rpx 4rpx rgba(230, 230, 230, 0.13);
		border-radius: 20rpx;
	}

	#top-box {
		margin: 30rpx 30rpx 0;
		// background: tan;
		border-radius: 20rpx;
		width: 691rpx;
		height: 178rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 6rpx 29rpx 0rpx rgba(207, 207, 207, 0.13);
		display: flex;
		justify-content: space-around;
		align-items: center;

		.hr {
			width: 1rpx;
			height: 62rpx;
			background: #E5E5E5;
		}

		.item {
			flex: 1;

			.text1 {
				text-align: center;
				font-size: 40rpx;
				font-family: Bahnschrift;
				font-weight: 600;
				color: #333333;
			}

			.text2 {
				text-align: center;
				margin-top: 35rpx;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #666666;
			}
		}
	}
</style>
