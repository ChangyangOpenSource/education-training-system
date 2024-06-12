<template>
	<view class="listItem" @click="toCoursDetail(item)">
		<image class="goodsImg" :src="item.courseImgPath"></image>
		<view class="rightCon">
			<view class="tsiw">
				<view class="title two-row"> {{ item.courseName }} </view>
			</view>
			<view class="contentTxt two-row"> {{ item.courseLiveDescription }} </view>
			<view class="flexConse">
				<view class="" style="display: flex;align-items: center;">
					<view class="flexCon">
						<view class="typeCon typeCon-1" v-if="item.learningPhase == '1'">{{item.learningPhaseText}}</view>
						<view class="typeCon typeCon-2" v-else-if="item.learningPhase == '2'">{{item.learningPhaseText}}</view>
						<view class="typeCon typeCon-3" v-else-if="item.learningPhase == '3'">{{item.learningPhaseText}}</view>
						<view class="typeCon typeCon-4" v-else-if="item.learningPhase == '4'">{{item.learningPhaseText}}</view>
						<view class="typeCon typeCon-5" v-else-if="item.learningPhase == '5'">{{item.learningPhaseText}}</view>
						<view class="typeCon typeCon-6" v-else-if="item.learningPhase == '6'">{{item.learningPhaseText}}</view>
						<view class="typeCon typeCon-6" style="color: #3b7bff;background: #f1f4fb;" v-else>
							{{item.learningPhaseText}}
						</view>
					</view>
					<view class="bottomflexCom">
						<image v-if="item.courseType == 2" class="icon"
							:src="imageUrl+'/static/video_1632402245294.png'" mode=""></image>
						<image v-else style="width: 26rpx;height: 27rpx;" class="icon"
							:src="imageUrl+'/static/learn/liveIcons.png'" mode=""></image>
						<text>{{ item.classHour }}节</text>
					</view>
				</view>

				<view class="bottomflexCom3" v-if='item.registrationWay==2'>
					<view class="sizes" v-if="item.lineFficialPrice!=null && item.lineFficialPrice!=0">￥{{item.lineFficialPrice }}</view>
					<view class="zhengshiji">￥{{ item.fficialPrice }}</view>
				</view>
				<view class="bottomflexCom3" v-else>
					<view class="zhengshiji">免费课程</view>
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
		props: ['item', 'courseId', 'detailsArr'],
		onShow() {
			// console.log(this.detailsArr)
		},
		methods: {
			toCoursDetail(data) {
				console.log(data)
				console.log(this.detailsArr)
				console.log(this.courseId, 'this.courseId')
				if(data.isNoBuy==0){
						uni.navigateTo({
							url: `/pages-learn/courseDetail/courseDetail?courseId=${data.id}`
						})
				}else if(data.isNoBuy==1&&data.pwCourseType==2){
					this.queryCourseDetailsCourseOrSubNew({
						classid: this.courseId!=null?this.courseId:'' ,
						courseid: data.id,
					})
				}else{
					uni.navigateTo({
						url: `/pages-learn/courseDetail/courseDetail?courseId=${data.id}`
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
	.zhengshiji {

		font-size: 24rpx;
		font-weight: bold;
		color: #FA642C;
		margin-left: 15rpx;
	}

	.sizes {
		text-decoration: line-through;
		color: #999999;
		font-size: 22rpx;
		font-weight: 500;
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
		justify-content: space-between;
		align-items: center;


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
			display: flex;
			align-items: center;
			color: #999999;
			font-size: 22rpx;
			width: 130rpx;

			.icon {
				width: 27rpx;
				height: 24rpx;
				margin-right: 10rpx;
			}
		}
	}
	.bottomflexCom3{
		display: flex;
		align-items: center;
		color: #999999;
		font-size: 22rpx;
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
			height: 140rpx;
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
				width: 135rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;


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
					display: flex;
					align-items: center;
					color: #999999;
					font-size: 22rpx;
					width: 130rpx;

					.icon {
						width: 27rpx;
						height: 24rpx;
						margin-right: 10rpx;
					}
				}
			}

			.contentTxt {
				font-size: 24rpx;
				color: #666666;
				width: 100%;
				text-align: left;
				margin: 18rpx 0 25rpx;
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
