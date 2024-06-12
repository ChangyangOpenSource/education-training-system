<!-- 我的课程 -->
<template>
	<view class="u_mycourse">
		<view class="mask" v-if="listData.length == 0">
			<image :src="imageUrl+'/xing/zwsj.png'" mode=""></image>
			<view>您还未加入过课程</view>
		</view>
		<view class="list" v-else>
			<view :class="{tops:isATops,tiosheigrh:true}" id="tiosheigrh">
				<!-- 试听课程 -->
				<view class="topSize" v-if="listData.length > 0">
					<view class="bottoms">
						<view class='bottoms-view' v-for="item in listData" :key="item.id">
							<CourseItem :dataInfo="item" types="2" @onButton='onButton' />
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>


</template>
<script>
	// import ComponentItem from "@/pagesA/components/componentItem/componentItem.vue";
	import CourseItem from "@/components/course-item/index.vue";
	import Msodules from "@/components/modules-index/xuexi.vue";
	// import HomeTitle from "@/pages/index/components/home-title/indexse.vue";
	import {
		queryCourseDetailsCourseOrSubNew,
		findBySeriesOfCoursesDetail,
		findByModuleOfCoursesDetail
	} from "@/api/curriculumDetail.js";
	export default {
		components: {
			// ComponentItem,
			CourseItem,
			Msodules,
			// HomeTitle
		},
		data() {
			return {
				imageUrl: getApp().globalData.imageUrl,
				maxheight: 215,
				// 展开的课程列表
				openArr: [],
				detailsArr: {
					isNoBuy: 1
				}
				// listData: []
			};
		},
		props: ['listData'],
		created() {

		},
		methods: {
			onButton(value) {
				console.log(value)
				findBySeriesOfCoursesDetail({
					classesId: value.classesId,
					classesTypeId: value.classesTypeId,
				}).then((res) => {
					console.log(res, 'findBySeriesOfCoursesDetail')
					this.$emit('findBySeriesOfCoursesDetail', JSON.stringify(res.result), value)
					// this.$emit('onTabble',1)
				})
			},
			onButtonse(value) {
				console.log(value)
				findByModuleOfCoursesDetail({
					courseId: value.id,
					// classesTypeId:value.classesTypeId,
				}).then((res) => {
					console.log(res)
					if (res.result.courseType == 2) {
						this.queryCourseDetailsCourseOrSubNew({
							courseid: value.id
						})
					} else {
						this.$emit('findByModuleOfCoursesDetail', JSON.stringify(res.result.courseList), value)
					}
					// this.$emit('findByModuleOfCoursesDetail',JSON.stringify(res.result),value)
					// this.$emit('onTabble',1)
				})
			},
			async queryCourseDetailsCourseOrSubNew(data) {
				console.log(12321214214214214214)
				const res = await queryCourseDetailsCourseOrSubNew(data);
				console.log(res)
				console.log(data)
				if (Object.keys(res.result).length == 0) {
					// console.log('123')
					// console.log(data)

				} else {
					// window.location.href = res.result.obj.playUrl
					uni.navigateTo({
						url: '/pages-mine/webLink/webLink?src=' + encodeURIComponent(res.result.obj.playUrl)
					})
				}
			},

			closeList(id) {
				const index = this.openArr.indexOf(id);
				this.openArr.splice(index, 1);
			},
			// 跳转至详情
			curseDetail(classId, courseId) {
				console.log(classId, courseId)
				this.queryCourseDetailsCourseOrSubNew({
					classid: classId,
					courseid: courseId,
				})



			},
		},
	};
</script>

<style scoped lang="scss">
	.topSize {
		margin-bottom: 30rpx;
	}

	.bottoms-view2 {
		margin-top: 20rpx;
	}

	.bottoms-view {
		height: 340rpx;
		border-radius: 20rpx;
		background: #FFFFFF;
		margin-top: 20rpx;
	}

	.tops {
		margin-top: 94rpx;
	}

	.bottoms {
		margin-top: 23rpx;
	}

	.classesN {
		background-image: url($fileBaseUrl + '/oss/2_1641868998293.png');
		background-repeat: no-repeat;
		padding: 2rpx 20rpx 8rpx;
		background-size: 110rpx 100%;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		flex: 1;
		overflow: hidden;
	}

	.classTit {
		width: 100%;
		padding: 36rpx;
		min-height: 200rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-image: url($fileBaseUrl + '/oss/1_1641868506743.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;

		view {
			font-size: 28rpx;
			font-family: MF LiHei (Noncommercial);
			color: #FFFFFF;
			line-height: 56rpx;
			text-shadow: 0px 4px 6px rgba(31, 44, 146, 0.43);
		}
	}

	.mask {
		width: 100%;
		// background-color: #f1f1f1;
		padding-top: 26rpx;

		image {
			width: 349rpx;
			height: 312rpx;
			display: block;
			margin: 0 auto 20rpx;
		}

		view {
			width: 100%;
			text-align: center;
			font-size: 26rpx;
			color: #999999;
		}
	}

	.u_mycourse {
		// background-color: #fff;
		padding-top: 176rpx;

		.list {
			width: 100%;
			box-sizing: border-box;
			padding: 0 30rpx;
			display: inline-block;
			margin-bottom: 86rpx;
			padding-top: 20rpx;

			.list_item {
				width: 100%;
				box-shadow: 0 0 8rpx 0 rgba(0, 0, 0, 0.2);
				border-radius: 20rpx;
				margin-bottom: 20rpx;
				overflow: hidden;
				background-color: #fff;

				// 大图
				.course_img {
					width: 100%;
					height: 260rpx;
				}

				// 课程列表
				.course_list {
					overflow-y: hidden;
					transition: all 0.5s;

					.course_item {
						width: 100%;

						// 课程
						.course {
							width: 92%;
							padding: 25rpx 0;
							height: 100%;
							margin: 0 auto;
							display: flex;
							justify-content: flex-start;
							align-items: center;
							border-bottom: 3rpx solid #dddddd;

							.d_img {
								width: 195rpx;
								height: 130rpx;
							}

							.d_bodys {
								margin-left: 19.5rpx;
								width: 426rpx;
							}

							.d1 {
								display: flex;
								justify-content: space-between;
								margin-bottom: 10rpx;

								.d1_t_1 {
									font-size: 28rpx;
									font-weight: bold;
									color: #333333;
									width: 60%;
								}

								.d1_t_2 {
									font-size: 22rpx;
									font-weight: 500;
									padding: 7rpx 12rpx;
									border-radius: 10rpx;
									height: fit-content;
								}
							}

							.d2 {
								margin-bottom: 10rpx;
								text-overflow: ellipsis;
								overflow: hidden;

								.d2_t {
									font-size: 24rpx;
									font-weight: 500;
									color: #666666;
									// white-space: nowrap;
								}
							}

							.d3 {
								display: flex;
								align-items: center;
								justify-content: space-between;

								.d3_block {
									display: flex;
									align-items: center;

									.d3_icon {
										width: 36rpx;
										height: 36rpx;
									}

									.d3_text {
										color: #999999;
										margin-left: 15rpx;

										.d3_t {
											font-size: 22rpx;
											font-weight: 500;
											color: #999999;
										}
									}
								}
							}
						}
					}
				}

				// 底部展开收起
				.open-close {
					display: flex;
					justify-content: center;
					align-items: center;
					height: 85rpx;

					.more_course {
						font-size: 28rpx;
						font-weight: 500;
						color: #666666;
						margin-left: 19rpx;
					}
				}
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
