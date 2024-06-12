<template>
	<div class="charts">
		<view class="charts-box">
			<qiun-data-charts type="area" :opts="opts" :chartData="data" @getIndex="funA()" />
		</view>
	</div>
</template>

<script>
	export default {
		props:['data'],
		data() {
			return {
				chartData: {},
				//您可以通过修改 config-ucharts.js 文件中下标为 ['area'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
				opts: {
					color: ["#068fa3", "#91CB74", "#FAC858"], // 每条折线的颜色
					padding: [5, 0, 5, 0], // 填充边距
					dataLabel: false, // 隐藏坐标数据
					dataPointShape: false, // 隐藏坐标原点
					legend: {
						show: false, // 隐藏底部图例
					},
					xAxis: {
						disableGrid: true, // 隐藏网格线
						disabled: true, //隐藏刻度
					},
					yAxis: {
						disableGrid: true,
						disabled: true
					},
					extra: {
						tooltip: {
							showCategory: false,
							// bgColor:#0491a3,
							// fontColor:#ffffff,
						},
						area: {
							type: "curve",
							// opacity: 0.2,
							addLine: true,
							width: 3,
							gradient: true
						}
					}
				},

			};

		},
		onShow() {
			this.getServerData();
		},
		onReady() {
			// this.getServerData();
		},
		methods: {
			funA(index) {
				console.log('获取索引：',index);
			},
			getServerData() {
				console.log('图表启动');
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
						series: [{
							name: '正确率',
							data: [35, 0, 25, 100, 4, 20, 25, 100, 4, 20],
						}]
					};
					this.chartData = JSON.parse(JSON.stringify(res));
				}, 500);
			},

		}
	};
</script>

<style scoped lang="scss">
	/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
	.charts {
		// width: 690rpx;
		height: 230rpx;
		// border: 1px red solid;
	}

	/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
	.charts-box {
		width: 100%;
		height: 100%;
	}
</style>
