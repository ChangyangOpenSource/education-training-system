<template>
	<view class="charts-box" :style="{height:activeHeight}">
		<qiun-data-charts type="bar" :opts="opts" :chartData="chartData" />
	</view>
</template>

<script>
	// import qiun-data-charts from '@/pagesA/components/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue'
	// /uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts
	export default {
		props: ['chartA_Length', 'chartA_title', 'chartA_myData', 'chartA_peopleData','activeHeight'],
		// components: {
		// 	qiun-data-charts
		// },
		data() {
			return {
				// activeHeight: '300rpx',
				basicHeight: 100,
				chartData: {},
				//您可以通过修改 config-ucharts.js 文件中下标为 ['bar'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
				opts: {
					color: ["#11A2B1", "#E5E5E5"],
					padding: [5, 20, 10, 5],
					enableScroll: false,
					legend: {
						show: true,
						position: 'top',
						float: 'right',
					},
					xAxis: {
						boundaryGap: "justify",
						disableGrid: true,
						min: 0, // x轴最小值
						axisLine: false,
						max: 100, // x轴最大值
						// labelCount:5,
					},
					yAxis: {
						// disabled:true,// 是否显示y轴
						splitNumber: 15, // y轴网格最大限条数
						disableGrid: true, // 是否显示y轴网格
						data: [{
							type: 'categories',
							format: 'yAxisDemo3', // y轴数据格式化，全局搜索yAxisDemo3自定义格式
						}]
					},
					extra: {
						bar: {
							type: "group",
							width: 10,
							meterBorde: 1,
							meterFillColor: "#FFFFFF",
							activeBgColor: "#000000",
							activeBgOpacity: 0.08,
							linearType: "none",
							barBorderCircle: true,
							seriesGap: 5,
							categoryGap: 10,
						},
						tooltip: {
							showBox: true, // 是否显示提示框
						}
					},

				}
			};
		},
		onReady() {
			// this.getServerData();
		},
		beforeUpdate() {
			// console.log(this.chartA_Length, '数据长度')
			// this.activeHeight = (this.basicHeight * this.chartA_Length) + 200 + 'rpx'
			// console.log(this.activeHeight, ' 容器高度')
		},
		methods: {
			getServerData() {
				this.$nextTick(() => {
					// console.log(this.chartA_title, this.chartA_myData, this.chartA_peopleData,'chart--A')
					let res = {
						categories: this.chartA_title,
						series: [{
								name: "我的正确率",
								data: this.chartA_myData,
								legendShape: 'circle'
							},
							{
								name: "全网正确率",
								data: this.chartA_peopleData,
								legendShape: 'circle'
							}
						]
					};
					this.chartData = JSON.parse(JSON.stringify(res));
				})
			},
		}
	};
</script>

<style scoped lang="scss">
	/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
	.charts-box {
		width: 100%;
		/* min-height: 500rpx; */
	}
</style>
