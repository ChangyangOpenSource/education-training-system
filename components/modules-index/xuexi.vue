<template>
	<view :class="{listItem:types!=1,listItem2:types==1}" @click="toCoursDetail(item)">
		<image class="goodsImg" v-if="types==1" :src="item.courseImgPath"></image>
		<image class="goodsImg" v-else :src="item.imgPath"></image>
		<view class="rightCon">
			<view class="tsiw">
				<view class="title two-row"> {{ item.courseName }} </view>
			</view>
			<view class="contentTxt two-row" v-if="types==1"> {{ item.courseDescription }} </view>
			<view class="contentTxt two-row" v-else> {{ item.description }} </view>
			<view class="flexConse">
				<view class="flexCon">
					<view class="typeCon typeCon-1" v-if="item.learningPhase == '1'">{{item.learningPhaseText}}</view>
					<view class="typeCon typeCon-2" v-else-if="item.learningPhase == '2'">{{item.learningPhaseText}}
					</view>
					<view class="typeCon typeCon-3" v-else-if="item.learningPhase == '3'">{{item.learningPhaseText}}
					</view>
					<view class="typeCon typeCon-4" v-else-if="item.learningPhase == '4'">{{item.learningPhaseText}}
					</view>
					<view class="typeCon typeCon-5" v-else-if="item.learningPhase == '5'">{{item.learningPhaseText}}
					</view>
					<view class="typeCon typeCon-6" v-else-if="item.learningPhase == '6'">{{item.learningPhaseText}}
					</view>
					<view class="typeCon typeCon-6" style="color: #3b7bff;background: #f1f4fb;" v-else>
						{{item.learningPhaseText}}
					</view>
				</view>
				<view class="bottomflexCom2" v-if="item.type == 2">
					<image v-if="item.type == 2" class="icon" :src="imageUrl+'/xing/sp.png'"  mode=""></image>
					<image v-else style="width: 23rpx;height: 17rpx;" :src="imageUrl+'/xing/zhibo.png'" class="icon" 
						mode=""></image>
					<text v-if="types==1">{{ item.classHour }}节</text>
					<text v-else>{{ item.class_hour }}节</text>
				</view>
				<view class="bottomflexCom" v-else>
					<image v-if="item.type == 2" class="icon" :src="imageUrl+'/xing/sp.png'"  mode=""></image>
					<image v-else style="width: 23rpx;height: 17rpx;" :src="imageUrl+'/xing/zhibo.png'" class="icon" 
						mode=""></image>
					<text v-if="types==1">{{ item.classHour }}节</text>
					<text v-else>{{ item.class_hour }}节</text>
				</view>
				
			</view>
		</view>

	</view>


</template>
<script>
	import {
		queryCourseDetailsCourseOrSubNew,
	} from "@/api/curriculumDetail.js";
	export default {
		data() {
			return {
				imageUrl: getApp().globalData.imageUrl,
			}
		},
		props: ['item', 'courseId', 'detailsArr', 'types'],
		onShow() {
			// console.log(this.detailsArr)
		},
		methods: {
			toCoursDetail(data) {
				console.log(data)
				console.log(this.detailsArr)
				console.log(this.courseId, 'this.courseId')
				if (this.types == 1) {
					this.queryCourseDetailsCourseOrSubNew({
						classid: this.courseId != null ? this.courseId : '',
						courseid: data.id,
					})
				} else {
					this.$emit('onButtonse', data)
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
	.bottomflexCom3 {
		display: flex;
		align-items: center;
		color: #999999;
		font-size: 22rpx;
	}

	.zhengshiji {

		font-size: 24rpx;
		font-weight: 500;
		color: #FA642C;
		margin-left: 15rpx;
	}

	.sizes {
		text-decoration: line-through;
		color: #999999;
		font-size: 22rpx;

		font-weight: 400;
	}

	.tsiw {
		width: 100%;

		.title {
			font-size: 28rpx;
			font-weight: bold;
			color: #333333;
			text-align: left;
			// width: 60%;
		}
	}

	.flexConse {
		width: 100%;
		display: flex;
		align-items: center;

		.typeCon {
			// width: 106rpx;
			// font-weight: bold;
			height: 34rpx;
			border-radius: 10rpx;
			font-size: 22rpx;
			line-height: 34rpx;
			padding: 0rpx 12rpx;
			text-align: center;
		}

		.typeCon-1 {

			color: #FFFFFF;

			background: linear-gradient(0deg, #DBA17A 0%, #C89181 100%);
		}

		.typeCon-2 {

			color: #FFFFFF;

			background: linear-gradient(0deg, #DBA17A 0%, #C89181 100%);
		}

		.typeCon-3 {

			color: #FFFFFF;

			background: linear-gradient(0deg, #DBA17A 0%, #C89181 100%);
		}

		.typeCon-4 {

			color: #FFFFFF;

			background: linear-gradient(0deg, #DBA17A 0%, #C89181 100%);
		}

		.typeCon-5 {

			color: #FFFFFF;

			background: linear-gradient(0deg, #DBA17A 0%, #C89181 100%);
		}

		.typeCon-6 {

			color: #FFFFFF;

			background: linear-gradient(0deg, #DBA17A 0%, #C89181 100%);
		}

		.bottomflexCom {
			display: flex;
			align-items: center;
			color: $uni-primary;
			font-size: 22rpx;
			width: 130rpx;
			padding: 5rpx 10rpx;
			background: #FFECE3;
			border-radius: 8rpx;

			justify-content: center;

			.icon {
				width: 23rpx;
				height: 17rpx;
				margin-right: 10rpx;
			}
		}

		.bottomflexCom2 {
			display: flex;
			align-items: center;
			color: #3787FF;
			font-size: 22rpx;
			width: 130rpx;
			padding: 5rpx 10rpx;
			background: #DEF0FF;
			border-radius: 10rpx;

			justify-content: center;

			.icon {
				width: 23rpx;
				height: 17rpx;
				margin-right: 10rpx;
			}
		}
	}

	.listItem2 {

		background: #FFFFFF;
		border-radius: 20rpx;
		padding: 28rpx 24rpx 28rpx 26rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		// border-bottom: 1rpx solid #f3f3f3;

		.goodsImg {
			width: 195rpx;
			height: 135rpx;
			border-radius: 20rpx;
		}

		.rightCon {
			width: 426rpx;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			margin-left: 25rpx;

			.flexCon {
				// width: 135rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				// margin-right: 23rpx;
				margin-right: 15rpx;



				.typeCon {
					// width: 106rpx;
					// font-weight: bold;
					height: 34rpx;
					border-radius: 10rpx;
					font-size: 22rpx;
					line-height: 34rpx;
					padding: 0rpx 12rpx;
					text-align: center;
				}

				.typeCon-1 {

					color: #FFFFFF;

					background: linear-gradient(0deg, #DBA17A 0%, #C89181 100%);
				}

				.typeCon-2 {

					color: #FFFFFF;

					background: linear-gradient(0deg, #DBA17A 0%, #C89181 100%);
				}

				.typeCon-3 {

					color: #FFFFFF;

					background: linear-gradient(0deg, #DBA17A 0%, #C89181 100%);
				}

				.typeCon-4 {

					color: #FFFFFF;

					background: linear-gradient(0deg, #DBA17A 0%, #C89181 100%);
				}

				.typeCon-5 {

					color: #FFFFFF;

					background: linear-gradient(0deg, #DBA17A 0%, #C89181 100%);
				}

				.typeCon-6 {

					color: #FFFFFF;

					background: linear-gradient(0deg, #DBA17A 0%, #C89181 100%);
				}

				.bottomflexCom {
					padding: 5rpx 10rpx;
					background: #FFECE3;
					border-radius: 8rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					color: $uni-primary;
					font-size: 22rpx;
					width: 130rpx;

					.icon {
						width: 23rpx;
						height: 17rpx;
						margin-right: 10rpx;
					}
				}

				.bottomflexCom2 {
					display: flex;
					align-items: center;
					color: #3787FF;
					font-size: 22rpx;
					width: 130rpx;
					padding: 5rpx 10rpx;
					background: #DEF0FF;
					border-radius: 10rpx;

					justify-content: center;

					.icon {
						width: 23rpx;
						height: 17rpx;
						margin-right: 10rpx;
					}
				}
			}

			.contentTxt {
				font-size: 24rpx;
				color: #666666;
				width: 100%;
				text-align: left;
				margin: 18rpx 0 18rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				// white-space: nowrap;
			}
		}
	}

	.listItem {

		background: #FFFFFF;
		border-radius: 20rpx;
		padding: 28rpx 24rpx 28rpx 26rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid #f3f3f3;

		.goodsImg {
			width: 195rpx;
			height: 135rpx;
			border-radius: 20rpx;
		}

		.rightCon {
			width: 426rpx;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			margin-left: 25rpx;

			.flexCon {
				// width: 135rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-right: 15rpx;



				.typeCon {
					// width: 106rpx;
					// font-weight: bold;
					height: 34rpx;
					border-radius: 10rpx;
					font-size: 22rpx;
					line-height: 34rpx;
					padding: 0rpx 12rpx;
					// padding: 7rpx 12rpx;
					text-align: center;
				}

				.typeCon-1 {

					color: #FFFFFF;

					background: linear-gradient(0deg, #DBA17A 0%, #C89181 100%);
				}

				.typeCon-2 {

					color: #FFFFFF;

					background: linear-gradient(0deg, #DBA17A 0%, #C89181 100%);
				}

				.typeCon-3 {

					color: #FFFFFF;

					background: linear-gradient(0deg, #DBA17A 0%, #C89181 100%);
				}

				.typeCon-4 {

					color: #FFFFFF;

					background: linear-gradient(0deg, #DBA17A 0%, #C89181 100%);
				}

				.typeCon-5 {

					color: #FFFFFF;

					background: linear-gradient(0deg, #DBA17A 0%, #C89181 100%);
				}

				.typeCon-6 {

					color: #FFFFFF;

					background: linear-gradient(0deg, #DBA17A 0%, #C89181 100%);
				}

				.bottomflexCom {
					display: flex;
					align-items: center;
					justify-content: center;
					color: $uni-primary;
					font-size: 22rpx;
					width: 130rpx;
					padding: 5rpx 10rpx;
					background: #FFECE3;
					border-radius: 8rpx;

					.icon {
						width: 23rpx;
						height: 17rpx;
						margin-right: 10rpx;
					}
				}

				.bottomflexCom2 {
					display: flex;
					align-items: center;
					color: #3787FF;
					font-size: 22rpx;
					width: 130rpx;
					padding: 5rpx 10rpx;
					background: #DEF0FF;
					border-radius: 10rpx;

					justify-content: center;

					.icon {
						width: 23rpx;
						height: 17rpx;
						margin-right: 10rpx;
					}
				}
			}

			.contentTxt {
				font-size: 24rpx;
				color: #666666;
				width: 100%;
				text-align: left;
				margin: 18rpx 0 18rpx;
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
