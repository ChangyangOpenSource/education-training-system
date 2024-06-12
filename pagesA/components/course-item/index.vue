
<template>
	<view class="item-box" @click="goto(dataInfo)">
		<view class="item-top ">
			<view class="one-row">{{ dataInfo.classesName }}</view>
		</view>
		<view class="item-desc one-row"> {{ dataInfo.classesDescribe }} </view>
		<view class="item-tag">
			<view class="course-type" v-if="dataInfo.courseCombination">{{ dataInfo.courseCombination }}</view>
			<view class="course-type course-num" v-if="dataInfo.classHour"><text
					v-if="dataInfo.faceDays">面授{{ dataInfo.faceDays }}天+</text>
				在线{{ dataInfo.classHour }}节</view>
			<view class=" academicYear" v-if="dataInfo.academicYear">{{dataInfo.academicYear}}</view>

			<view class="bottom-right-top" v-if="dataInfo.faceLocation">
				<image :src="imageUrl+'/xing/dw.png'" mode="scaleToFill" />
				<view>{{ dataInfo.faceLocation.substr(0,5) }}</view>
			</view>
		</view>
		<view class="item-bottom">
			<view class="bottom-left">
				<view class="head-item" v-for="item in dataInfo.teacherList" :key="item.id">
					<image class="head-img" :src="
              item.teacherImagePhoto == undefined
                ? item.imagePhoto
                : item.teacherImagePhoto
            " />
				</view>
			</view>
			<view class="bottom-right" v-if="dataInfo.price ">

				<view class="item-top-right" v-if="dataInfo.registrationWay == 1"> 免费班 </view>
				<view class="item-top-right" v-else>
					<view class="item-top-right2">
						<text class="poksw">
							¥
						</text> {{ dataInfo.price }}
					</view>
					<view class="" v-if="dataInfo.lineFficialPrice">
						<view class="item-henxian" v-if="dataInfo.lineFficialPrice!=0 && dataInfo.lineFficialPrice!=''">
							{{dataInfo.lineFficialPrice}}
						</view>
					</view>

				</view>
			</view>
			<view class="bottom-right2" v-else>
				<view class="dibu"> {{ dataInfo.students }}人学习 </view>
			</view>
		</view>
	</view>


</template>
<script>
	export default {
		components: {},
		//接收参数
		props: {
			showLocal: {
				// 是否显示地址
				type: Boolean,
				default: false,
			},
			// 数据
			dataInfo: {
				type: Object,
				default: {},
			},
			types: {
				type: String,
				default: '0' // 1 蓝色  2  黄色 3 深蓝
			},
			tise: {
				type: String,
				default: '0' // 1 蓝色  2  黄色 3 深蓝
			},
		},
		data() {
			//这里存放数据
			return {
				imageUrl: getApp().globalData.imageUrl
			};
		},
		computed: {},
		watch: {},
		mounted() {
			console.log(this.dataInfo, '7001')
		},
		//方法集合
		methods: {
			goto(data) {
				if (this.types == 2) {
					console.log(data)
					this.$emit('onButton', data)
					return
				}
				if (data.faceClass == 2) {
					uni.navigateTo({
						url: "/pagesA/highEndCourse/highEndCourse?id=" + data.id,
					});
				} else {
					uni.navigateTo({
						url: "/pagesA/curriculumDetail/index?id=" + data.id + '&price=' + data.price,
					});
				}
			},
		},
	};
</script>
<style lang='scss' scoped>
	.bottom-right2 {
		width: 124rpx;
		height: 32rpx;
		background: #FFF2EB;
		border-radius: 8rpx;
		font-size: 20rpx;
		font-weight: 500;
		color: $uni-primary;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.poksw {
		font-size: 26rpx !important;
	}

	.bottom-right-top {
		padding: 10rpx 14rpx;
		background: linear-gradient(0deg, #DBA17A 0%, #C89181 100%);
		border-radius: 4rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		margin-left: 17rpx;

		view {
			max-width: 140rpx;
			font-size: 24rpx;
			color: rgba(255, 255, 255, 1);
			text-align: right;
		}

		image {
			width: 22rpx !important;
			height: 28rpx !important;
			margin-right: 8rpx;
		}
	}

	.item-top-right {
		min-width: 200rpx;
		color: rgba(255, 91, 0, 1);
		font-size: 36rpx;
		text-align: right;

		font-weight: bold;
	}

	.item-top-right2 {
		text-align: right;
	}

	.academicYear {
		padding: 6rpx 14rpx;
		font-size: 22rpx;
		color: #FD8C01;
		border: 2rpx solid $uni-primary;
		border-radius: 4rpx;
	}

	.item-henxian {
		font-size: 26rpx;
		text-decoration: line-through;
		color: #999999;
	}

	.item-box {
		padding: 30rpx 20rpx;
		background: #ffffff;
		border-radius: 20rpx;

		.item-top {
			font-size: 32rpx;
			color: #333333;
			display: flex;
			align-items: center;
			justify-content: space-between;


		}

		.item-desc {
			color: #999999;
			font-size: 24rpx;
			margin-top: 8rpx;
		}

		.item-tag {
			display: flex;
			align-items: center;
			margin-top: 23rpx;
			/* border-bottom: 2rpx solid #EEEEEE; */
			padding-bottom: 22rpx;

			.course-type {
				padding: 8rpx 14rpx;
				background: linear-gradient(90deg, #F6911F 0%, $uni-primary 100%);
				font-size: 22rpx;
				color: #FFFFFF;
				border-radius: 4rpx;
				margin-right: 12rpx;
			}

			.course-num {
				background: rgba(12, 216, 194, 1);
				color: rgba(255, 255, 255, 1);
				/* margin-left: 12rpx; */
			}
		}

		.item-bottom {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 28rpx;

			.bottom-left {
				display: flex;
				align-items: center;


				// flex-wrap: wrap;
				width: 71%;
				// height: 98rpx;
				overflow-x: hidden;

				.head-item {
					font-size: 20rpx;
					color: #999999;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					margin-right: 35rpx;

					.head-img {
						width: 60rpx;
						height: 60rpx;
						margin-bottom: 12rpx;
						border: 4rpx solid RGBA(255, 125, 53, 1);
						border-radius: 50%;
					}
				}
			}

			.bottom-right {
				display: flex;
				flex-direction: column;
				justify-content: center;
				font-size: 24rpx;
				color: #999999;
				align-items: flex-end;
				flex: 1;


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
