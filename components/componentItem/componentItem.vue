<template>
	<view class="listItem" @click="toCoursDetail(item)">
		<image class="goodsImg" :src="item.courseImgPath"></image>
		<view class="rightCon">
			<view class="flexCon">
				<view class="title two-row"> {{ item.courseName }} </view>
			</view>
			<view class="contentTxt two-row"> {{ item.courseLiveDescription }} </view>
			<view class="flexCon">
				<LearningPhase :item="item"></LearningPhase>
				<view class="bottomflexCom" v-if="item.courseType == 2">
					<image style="width: 23rpx;height: 17rpx;margin-right: 5rpx;" class="icon" :src="imageUrl + '/home/uni3.png' "></image>
					</image>
					<text>{{ item.classHour }}课时</text>
				</view>
				<view class="bottomflexCom" v-if="item.courseType == 1" style="background: #FFECE3;">
					<image style="width: 23rpx;height: 17rpx;margin-right: 5rpx;" class="icon" :src="imageUrl + '/home/uni9.png' "></image>
					</image>
					<text style="color: #F1592A;">{{ item.classHour }}课时</text>
				</view>
			</view>
		</view>

	</view>


</template>
<script>
	import {
		queryCourseDetailsCourseOrSubNew,
	} from "@/api/curriculumDetail.js";
	import LearningPhase from '@/components/learningPhase.vue'
	export default {
		data() {
			return {
				imageUrl: getApp().globalData.imageUrl,
			}
		},
		props: ['item', 'courseId', 'detailsArr'],
		components: {
			LearningPhase
		},
		onShow() {
			// console.log(this.detailsArr)
		},
		methods: {
			toCoursDetail(data) {
				console.log(data)
				console.log(this.detailsArr)
				console.log(this.courseId, 'this.courseId')
				if (this.detailsArr.isNoBuy == 0) {
					uni.navigateTo({
						url: `/pages-learn/courseDetail/courseDetail?courseId=${data.id}&classId=${this.courseId}`
					})
				} else if (this.detailsArr.isNoBuy == 1) {
					this.queryCourseDetailsCourseOrSubNew({
						classid: this.courseId != null ? this.courseId : '',
						courseid: data.id,
					})
				}

			},

			async queryCourseDetailsCourseOrSubNew(data) {
				const res = await queryCourseDetailsCourseOrSubNew(data);
				console.log(res)
				console.log(Object.keys(res.result).length)
				if (Object.keys(res.result).length == 0) {
					console.log('123')
					console.log(data)
					uni.navigateTo({
						url: `/pages-learn/courseDetail/courseDetail?classId=${this.courseId}&courseId=${data.courseid}`
					})
				} else {
					uni.navigateTo({
						url: '/pages-mine/webLink/webLink?src=' + encodeURIComponent(res.result.obj.playUrl)
					})
					// 	 window.location.href=res.result.obj.playUrl
					// console.log(res.result.obj.playUrl)
					// uni.navigateTo({
					// 	url: '/pages/course/index?token=62671D52E8A9&pwToken=62671D52E8A9'
					// })
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.listItem {
		padding: 28rpx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid #f3f3f3;

		.goodsImg {
			width: 195rpx;
			height: 130rpx;
			border: 2px solid #EEEEEE;
			border-radius: 20rpx;
			// border-radius: 20rpx;
		}

		.rightCon {
			width: 426rpx;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			margin-left: 19.5rpx;

			.flexCon {
				width: 100%;
				display: flex;
				// justify-content: space-between;
				align-items: center;

				.title {
					// font-size: 28rpx;
					// font-weight: bold;
					// color: #333333;
					// text-align: left;
					// width: 60%;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #282828;
				}

				.typeCon {
					// width: 106rpx;
					// font-weight: bold;
					// height: 34rpx;
					border-radius: 10rpx;
					font-size: 22rpx;
					padding: 7rpx 12rpx;
					text-align: center;
				}

				.typeCon-1 {
					color: #fd1506;
					background: rgba(255, 226, 224, 0.99);
				}

				.typeCon-2 {
					color: #fd8c01;
					background: #fff2e2;
				}

				.typeCon-3 {
					color: #e9c500;
					background: #f9f8d0;
				}

				.typeCon-4 {
					color: #74df00;
					background: #eeffdb;
				}

				.typeCon-5 {
					color: #0adedb;
					background: #e5fdff;
				}

				.typeCon-6 {
					color: #3b7bff;
					background: #f1f4fb;
				}

				.bottomflexCom {
					margin-left: 10rpx;
					// width: 116rpx;
					padding: 0 10rpx;
					height: 34rpx;
					background: #DEF0FF;
					border-radius: 8rpx;
					display: flex;
					align-items: center;
					// color: #999999;
					// font-size: 22rpx;
					// width: 56rpx;
					// height: 19rpx;
					font-size: 20rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #3787FF;

					.icon {
						width: 31rpx;
						height: 31rpx;
						margin-right: 10rpx;
					}
				}
			}

			.contentTxt {
				font-size: 24rpx;
				color: #666666;
				width: 100%;
				text-align: left;
				margin: 10rpx 0;
				overflow: hidden;
				text-overflow: ellipsis;
				// white-space: nowrap;
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
