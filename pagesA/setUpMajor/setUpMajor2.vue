<template>
	<view>
		<!-- 顶部 -->
		<!-- <view class="mayTabs">
			<view class="tabItem" :class="{'activeCss':num==index}" v-for="(item, index) in majorArr" :key="index"
				@click="onsw(index)">

				<view class="posit">
					{{ item.groupName }}
					<view class="bored" v-if="num==index">
						<image v-if="num == index" class="tabitemImage" :src="imageUrl+'/xing/dibu.png'" mode="">
						</image>
					</view>
				</view>
			</view>
		</view> -->
		<view class="major-body" v-if="majorArr">
			<!-- ================= -->
			<view class="major-item" v-for="item1 in majorArr" :key="item1.id">
				<view class="flex mars" v-if="item1.cyResourcesMajorList.length > 0">
					<Title :title="item1.majorName" :type="1" v-if="item1.cyResourcesMajorList.length > 0" />
				</view>
				<view class="major-content" v-if="item1.cyResourcesMajorList.length > 0">
					<button v-for="item2 in item1.cyResourcesMajorList" :key="item2.id"
						:class="[activeMajorId == item2.id ? 'active-c' : 'blur-c', 'btn']" @click="activeMajor(item2)">
						{{ item2.majorName }}
					</button>
				</view>
			</view>
			<!-- ================= -->
		</view>
		<view v-show='loginAss' class="back-tankuang">
			<login class="loginw" @guanbi='guanbi' />
		</view>
	</view>


</template>
<script>
	import Title from "@/components/title_comp.vue";

	import {
		wxLogin,
		bindinMajor,
		loginRecord
	} from "@/api/login.js";
	import {
		getMajor,
		newList
	} from "@/api/professionalChoice.js";
	import {
		setMajorInfo2,
		getMajorInfo2
	} from "@/common/util/index.js";

	export default {
		components: {
			Title,
		},
		data() {
			return {
				loginAss: getApp().globalData.loginAss,
				imageUrl: getApp().globalData.imageUrl,
				majorArr: {},
				activeMajorId: "",
				num: 0,
				listData: [{
						num: 1,
						name: "介绍",
					},
					{
						num: 2,
						name: "课程",
					},
					{
						num: 3,
						name: "资料",
					},
					{
						num: 4,
						name: "服务",
					},
				],
			};
		},
		// onUnload(){
		// 	console.log(this.majorArr)
		// 	setMajorInfo2(this.majorArr[0].cyResourcesMajorList[0])
		// },
		// onHide(){
		// 	console.log(1)
		// 	setMajorInfo2(this.majorArr[0].cyResourcesMajorList[0])
		// },
		
		onLoad(opt) {
			console.log(opt)
			// uni.showModal({
			// 	title: '123',
			// 	content: decodeURIComponent(opt.q)
			// })
		},

		mounted() {
			// this.getAll();
			this.newList();
			const MajorInfo = getMajorInfo2();
			this.activeMajorId = MajorInfo ? MajorInfo.id : "";
		},
		methods: {
			onsw(index) {
				this.num = index
			},
			guanbi(value) {
				this.loginAss = value
			},
			// 接收选取的课程
			activeMajor(item) {
				console.log(123)
				this.activeMajorId = item.id;
				// uni.setStorageSync("MajorInfo", item);
				setMajorInfo2(item);
				if (uni.getStorageSync('token')) {
					const valdsa = bindinMajor({
						majorId: getMajorInfo2().id
					});
				}
				let shareUrl = ''
				try {
					shareUrl = uni.getStorageSync('shareUrl')
				} catch (err) {}
				if (shareUrl) {
					uni.reLaunch({
						url: shareUrl
					})
				} else {
					uni.setStorageSync('hometType', {
						type: 1,
						courseType: 0,
						queryArrselabelId: '',
						queryArrlearningPhase: ''
					})
					console.log(1233)

					// #ifdef H5
					let pages = getCurrentPages(); //获取所有页面栈实例列表
					let nowPage = pages[pages.length - 1]; //当前页页面实例
					let prevPage = pages[pages.length - 2]; //上一页页面实例
					console.log(pages)
					
					prevPage.$vm.tabbarIndex = 3; //修改上一页data里面的参数值
					prevPage.$vm.setUpMajorAss = true; //修改上一页data里面的参数值
					uni.navigateBack({ //uni.navigateTo跳转的返回，默认1为返回上一级
						delta: 1
					});
					//#endif
					
					
					//#ifdef MP-WEIXIN
					let pages = getCurrentPages(); //获取所有页面栈实例列表
					let nowPage = pages[pages.length - 1]; //当前页页面实例
					let prevPage = pages[pages.length - 2]; //上一页页面实例
					console.log(pages)
					console.log(nowPage)
					console.log(prevPage)
					prevPage.$vm.tabbarIndex = 3; //修改上一页data里面的参数值
					prevPage.$vm.setUpMajorAss = true; //修改上一页data里面的参数值
					uni.navigateBack({ //uni.navigateTo跳转的返回，默认1为返回上一级
						delta: 1
					});
					//#endif

				}

			},
			// 获取专业科目列表
			async getAll() {
				const res = await getMajor();
				this.majorArr = res.result;
			},
			async newList() {
				const res = await getMajor({
					type: 1, //  0首页，1题库
				});
				this.majorArr = res.result;
				console.log(this.majorArr)
			},
		},
	};
</script>
<style>
	page,
	body {

		background-color: #ffffff !important;

	}
</style>
<style lang="scss" scoped>
	.mars {
		margin-bottom: 30rpx;
	}

	.flex {
		display: flex;
		// align-items: center;
	}

	.bored {
		width: 60rpx;
		height: 6rpx;
		position: absolute;
		bottom: 7rpx;
		left: 35%;
	}

	.blue {
		width: 6rpx;
		height: 30rpx;
		background: linear-gradient(0deg, #89B0FF 0%, #3B7BFF 100%);
		border-radius: 3rpx;
		margin-top: 10rpx;
	}

	.posit {
		position: relative;
	}

	.activeCss {
		// border-bottom: 4rpx solid rgba(61, 125, 255, 1);
		// color: rgba(61, 125, 255, 1);

		font-size: 32rpx !important;
		font-family: PingFang SC !important;
		font-weight: bold !important;
		color: #333333 !important;
	}



	.mayTabs {
		// margin-top: 20rpx;
		background-color: #ffffff;
		width: 100%;
		padding: 30rpx 30rpx 0rpx;
		display: flex;
		// justify-content: space-between;
		align-items: center;
		// border-bottom: 1rpx solid #f3f3f3;
		overflow-x: scroll;

		.tabitemImage {
			width: 41rpx;
			height: 13rpx;
			bottom: 2rpx;
			position: absolute;
		}

		.tabItem:last-child {
			margin-right: 0 !important;
		}

		.tabItem {
			// width: auto;
			// min-width: 150rpx;
			// padding: 0 55rpx 0 55rpx;
			margin-right: 78rpx;
			height: 66rpx;
			white-space: nowrap;
			display: flex;
			// justify-content: center;
			// justify-items: center;
			// font-size: 32rpx;
			// font-weight: bold;
			// color: #333333;

			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #999999;
			position: relative;
		}

		// .tabItem:nth-child(1) {
		// 	// width: auto;
		// 	// min-width: 150rpx;
		// 	padding: 0 55rpx 0 25rpx;
		// 	height: 66rpx;
		// 	white-space: nowrap;
		// 	display: flex;
		// 	// justify-content: center;
		// 	// justify-items: center;
		// 	font-size: 32rpx;
		// 	font-weight: bold;
		// 	color: #333333;
		// 	position: relative;
		// }

		.active {
			color: #333333;
			font-size: 30rpx;
			font-weight: 900;
			// background-image: url($fileBaseUrl+"/ykstatic/lessonDetail/activeTab.png");
			background-size: 100% 100%;
			background-repeat: no-repeat;
		}
	}

	.mayTabs::-webkit-scrollbar {
		display: none;
	}

	page {

		background-color: #ffffff !important;

	}

	.major-body {
		box-sizing: border-box;
		padding: 0 30rpx 50rpx;
		width: 100%;
		background-color: #fff;
		border-top: 1rpx solid #eeeeee;

		.major-item {
			padding-top: 35rpx;

			.major-content {
				// column-count: 3;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				align-items: center;

				.active-c {
					background: $uni-primary;
					// border: 2rpx solid #3b7bff;
					color: #ffffff;
					font-weight: bold !important;
				}

				.blur-c {
					background: #F6F6F6;
					color: #666666;
				}

				.btn {
					width: calc(50% - 15rpx);
					box-sizing: border-box;
					text-align: center;
					height: 80rpx;
					line-height: 80rpx;
					border-radius: 20rpx;
					padding: 0 20rpx;
					margin: 0 0 36rpx 0;
					font-size: 28rpx;
					// font-family: PingFang SC;
					font-weight: 500;

					&::after {
						border: none;
					}
				}
			}
		}
	}
</style>