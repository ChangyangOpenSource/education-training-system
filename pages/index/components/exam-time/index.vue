
<template>
	<view class="exam-time-box" @click="timeShow">
		<view class="exam-left">
			<image class="left-icon" :src="imageUrl + '/static/home/exam-icon.png'" />
			<text v-if="timeTxt == null || timeTxt == undefined || timeTxt<0">设置考试时间</text>
			<text v-else-if="timeTxt>0">距离考试还有 {{timeTxt}} 天</text>
			<text v-else-if="timeTxt==0">今天考试</text>
		</view>
		<view class="exam-right">
			<image :src="imageUrl + '/static/home/time.png'" />
		</view>
		<WPicker ref="picker" mode="date" :start-year="2022" :end-year="2100" :visible="show" @confirm="onConfirm"
			@cancel="onCancel">你将在什么时间参加考试?</WPicker>
		<view v-show='loginAss' class="back-tankuang">
			<login class="loginw" @guanbi='guanbi' />
		</view>
	</view>


</template>
<script>
	import WPicker from "@/pages-mine/components/w-picker/w-picker.vue";
	import {
		addExamTime,
		queryExamTime
	} from "@/api/examTime.js";
	import {
		getMajorInfo
	} from "@/common/util/index.js";
	export default {
		components: {
			WPicker,
		},
		data() {
			return {
				loginAss: getApp().globalData.loginAss,
				imageUrl: getApp().globalData.imageUrl,
				show: false,
				timeTxt: null,
				majorForm: {
					majorId: getMajorInfo().id,
				},
			};
		},
		mounted() {
			this.queryExamTimeFun(this.majorForm);	
		},
		methods: {
			guanbi(value) {
				this.loginAss = value
			},
			timeShow() {
				let token = uni.getStorageSync('token')
				if (token) this.show = true
				else {
					uni.showToast({
						title: '登录失效，请重新登录',
						icon: 'none'
					})
					setTimeout(() => {
						this.loginAss = true
						// uni.navigateTo({
						// 	url: '/pages/login/login'
						// })
					}, 1500)

				}
			},
			onConfirm(e) {
				const form = {
					majorId: this.majorForm.majorId,
					examTime: e.value + " 00:00:00",
				};
				this.addExamTimeFun(form);
				this.show = false;
			},
			onCancel() {
				this.show = false;
			},
			// 添加考试时间
			async addExamTimeFun(data) {
				await addExamTime(data);
				this.queryExamTimeFun(this.majorForm);
			},
			// 查询考试时间
			async queryExamTimeFun(data) {
				// const res = await queryExamTime(data);
				// // if (res.result && res.result.examTime) this.timeTxt = res.result.examTime.split(" ")[0];
				// if (res.result && res.result.examTime) this.timeTxt = res.result.toDay;

				queryExamTime(data).then(res => {
					if (res.result && res.result.examTime) this.timeTxt = res.result.toDay;
				}).catch(err => {})

			},
		},
	};
</script>

<style scoped lang="scss">
	.w-picker-view{
		color:#3b7bff !important;
	}
	.exam-time-box {
		background: #ffffff;
		padding: 20rpx 30rpx 20rpx;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;

		.exam-left {
			font-size: 32rpx;
			display: flex;
			align-items: center;
			white-space: nowrap;

			.left-icon {
				width: 30rpx;
				height: 30rpx;
				margin-right: 20rpx;
			}
		}

		.exam-right {
			height: 30rpx;
			// margin-left: 420rpx;
			position: absolute;
			right: 30rpx;
			top: 50%;
			margin-top: -15rpx;

			image {
				width: 30rpx;
				height: 30rpx;
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
