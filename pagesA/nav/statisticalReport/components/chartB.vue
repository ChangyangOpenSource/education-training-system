<template>
	<view class="charts-box">
		<qiun-data-charts type="radar" :opts="opts" :chartData="chartData" />
	</view>
</template>

<script>
	export default {
		props: ['chartB_myData', 'chartB_peopleData'],
		data() {
			return {
				chartData: {},
				//您可以通过修改 config-ucharts.js 文件中下标为 ['radar'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
				opts: {
					// 'legendShape': 'circle',
					color: ["#FFD974", "#11A2B1"],
					padding: [5, 20, 5, 20],
					// dataLabel: false,
					enableScroll: false,
					legend: {
						show: true,
						position: "top",
						float: 'right',
						// lineHeight: 25
					},
					extra: {
						radar: {
							gridType: "radar", //蜘蛛网网格
							gridColor: "#CCCCCC", //网格颜色
							gridCount: 8, //网格数量
							opacity: 0.2, //主图区域透明度
							max: 100, //	data的最大值，数据区间最大值，用于调整数据显示的比例
							labelShow: true, //	是否显示各项标识文案
							border: true //	是否绘制主图区域描边线
						}
					}
				}
			};
		},
		onReady() {
			// this.getServerData();
		},
		methods: {
			getServerData() {
				this.$nextTick(() => {
					let res = {
						categories: ["正确率", "平均用时", "测评次数", "做题数量 ", "学习时长"],
						series: [{
								name: "我的数据",
								data: this.chartB_myData
							},
							{
								name: "全网数据",
								data: this.chartB_peopleData
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
		/* height: 300px; */
	}
</style>
