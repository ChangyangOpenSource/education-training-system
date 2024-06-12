<template>
	<view>
		<!-- 顶部 -->
		<view class="mayTabs">
			<view class="tabItem" :class="{activeCss:num==index}" v-for="(item, index) in majorArr" :key="index"
				@click="num = index">
			<!-- 	{{ item.groupName }}
				<image v-if="num == index" class="tabitemImage" src="@/static/椭圆3.png" mode=""></image> -->
				<view class="posit">
					{{ item.groupName }}
					<image v-if="num == index" class="tabitemImage" src="@/static/椭圆3.png" mode=""></image>
					<view class="bored" v-if="num==index">
				
					</view>
				</view>
			</view>
		</view>
		<view class="major-body">
			<!-- ================= -->
			<view class="major-item" v-for="item1 in majorArr[num].parentMajors" :key="item1.id">
				<view class="flex" v-if="item1.wdResourcesMajorList.length > 0">
					<view class="blue">

					</view>
					<Title :title="item1.majorName" :type="1" v-if="item1.wdResourcesMajorList.length > 0" />
				</view>
				<view class="major-content" v-if="item1.wdResourcesMajorList.length > 0">
					<button v-for="item2 in item1.wdResourcesMajorList" :key="item2.id"
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
		bindinMajor
	} from "@/api/login.js";
	import {
		getMajor,
		newList
	} from "@/api/professionalChoice.js";
	import {
		setUpZhuvue,
		getUpZhuvue
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
			const MajorInfo = getUpZhuvue();
			this.activeMajorId = MajorInfo ? MajorInfo.id : "";
		},
		methods: {
			guanbi(value) {
				this.loginAss = value
			},
			// 接收选取的课程
			activeMajor(item) {
				console.log(123)
				this.activeMajorId = item.id;
				// uni.setStorageSync("MajorInfo", item);
				setUpZhuvue(item);
				if (uni.getStorageSync('token')) {
					const valdsa = bindinMajor({
						majorId: getUpZhuvue().id
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
					// uni.switchTab({
					// 	url: '/pages/index/home'
					// })
					uni.reLaunch({
						url: '/pages/index/home'
					})
				}

			},
			// 获取专业科目列表
			async getAll() {
				const res = await getMajor();
				this.majorArr = res.result;
			},
			async newList() {
				const res = await newList();
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
	.flex {
		display: flex;
		// align-items: center;
	}
	
	.bored {
		width: 60rpx;
		height: 6rpx;
		background: #3B7BFF;
		border-radius: 3rpx;
		position: absolute;
		bottom: 0;
		left: 25%;
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
		color: rgba(61, 125, 255, 1);
	}



	.mayTabs {
		margin-top: 20rpx;
		background-color: #ffffff;
		width: 100%;
		padding: 26rpx 40rpx 0rpx;
		display: flex;
		// justify-content: space-between;
		align-items: center;
		// border-bottom: 1rpx solid #f3f3f3;
		overflow-x: scroll;

		.tabitemImage {
			width: 24rpx;
			height: 24rpx;
			position: absolute;
			right: -2rpx;
		}

		.tabItem {
			// width: auto;
			// min-width: 150rpx;
			padding: 0 55rpx 0 55rpx;
			height: 66rpx;
			white-space: nowrap;
			display: flex;
			// justify-content: center;
			// justify-items: center;
			font-size: 32rpx;
			font-weight: bold;
			color: #333333;
			position: relative;
		}
		
		.tabItem:nth-child(1) {
			// width: auto;
			// min-width: 150rpx;
			padding: 0 55rpx 0 25rpx;
			height: 66rpx;
			white-space: nowrap;
			display: flex;
			// justify-content: center;
			// justify-items: center;
			font-size: 32rpx;
			font-weight: bold;
			color: #333333;
			position: relative;
		}

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
		border-top: 1rpx solid #ddd;

		.major-item {
			padding-top: 35rpx;

			.major-content {
				// column-count: 3;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				align-items: center;

				.active-c {
					background: #e3ecff;
					// border: 2rpx solid #3b7bff;
					color: #3b7bff;
					font-weight: bold !important;
				}

				.blur-c {
					background-color: #fff;
					border: 2rpx solid #dddddd;
					color: #333;
				}

				.btn {
					width: calc(50% - 15rpx);
					box-sizing: border-box;
					text-align: center;
					height: 66rpx;
					line-height: 66rpx;
					border-radius: 33rpx;
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
