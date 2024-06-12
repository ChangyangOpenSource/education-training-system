<template>
	<view>
		<view class="major-body" v-if="majorArr">
			<view class="major-item" v-for="item1 in majorArr" :key="item1.id">
				<view class="theBox" v-if="item1.cyResourcesMajorList.length > 0">
					<Title :title="item1.majorName" :type="1" v-if="item1.cyResourcesMajorList.length > 0" />
				</view>
				<view class="major-content" v-if="item1.cyResourcesMajorList.length > 0">
					<button v-for="item2 in item1.cyResourcesMajorList" :key="item2.id"
						:class="[activeMajorId == item2.id ? 'active-c' : 'blur-c', 'btn']" @click="activeMajor(item2)">
						{{ item2.majorName }}
					</button>
				</view>
			</view>
		</view>
		<view v-show='loginAss' class="back-tankuang">
			<login class="loginw" @guanbi='guanbi' />
		</view>
	</view>
</template>
<script>
	import Title from "@/components/title_comp.vue";
	import {
		bindinMajor,
	} from "@/api/login.js";
	import {
		getMajor,
		newList
	} from "@/api/professionalChoice.js";
	import {
		setMajorInfo,
		getMajorInfo
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
			this.newList();
			const MajorInfo = getMajorInfo();
			this.activeMajorId = MajorInfo ? MajorInfo.id : "";
		},
		methods: {
			guanbi(value) {
				this.loginAss = value
			},
			// 接收选取的课程
			activeMajor(item) {
				this.activeMajorId = item.id;
				// uni.setStorageSync("MajorInfo", item);
				setMajorInfo(item);
				if (uni.getStorageSync('token')) {
					const valdsa = bindinMajor({
						majorId: getMajorInfo().id
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
					// uni.reLaunch({
					// 	// url: '/pages/index/home?topIsAss=true'
					// 	url: `/pages/index/home?tabbarIndex=1&topIsAss=true`
					// })
					let pages = getCurrentPages(); //获取所有页面栈实例列表
					let nowPage = pages[pages.length - 1]; //当前页页面实例
					let prevPage = pages[pages.length - 2]; //上一页页面实例
					prevPage.$vm.tabbarIndex = 1; //修改上一页data里面的参数值
					prevPage.$vm.setUpMajorAss = true; //修改上一页data里面的参数值
					uni.navigateBack();
				}

			},
			// 获取专业科目列表
			async newList() {
				const res = await getMajor({
					type: 0, //  0首页，1题库
				});
				this.majorArr = res.result;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.theBox{
		margin-bottom: 30rpx;
		display: flex;
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
