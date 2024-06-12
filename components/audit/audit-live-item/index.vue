
<template>
	<view class="list-item">
		<view class="" style="display: flex;align-content: center;">
			<view
				class="heads ">
				<image
					:class="{head:dataInfo.liveClassroomStatus == 2 && (dataInfo.unlock.isUnLock == 1 ||dataInfo.unlock.unlockType==9 ),head1:dataInfo.liveClassroomStatus == 1 && (dataInfo.unlock.isUnLock == 1 ||dataInfo.unlock.unlockType==9 )&& dataInfo.isAgree !=1,head3:dataInfo.liveClassroomStatus == 1 && (dataInfo.unlock.isUnLock == 1 ||dataInfo.unlock.unlockType==9 )&& dataInfo.isAgree ==1,head2:dataInfo.liveClassroomStatus == 4 && (dataInfo.unlock.isUnLock == 1 ||dataInfo.unlock.unlockType==9 ) }"
					:src="dataInfo.teacherImagePhoto"></image>
				<view class="lefts">
					<view class="right-box" style="display: flex; align-items: center;justify-content: center;">
						<!-- 提醒我 -->
						<view
							v-if="dataInfo.isAudition==1&&dataInfo.unlock.unlockType!=9 && dataInfo.unlock.isUnLock == 0"
							class="live-box remind-box"
							:style="{'background-image': `url(${imageUrl} + "/ykstatic/beijchu.png")`,'background-size':'100%'}">
							<image class="size" :src="imageUrl + '/ykstatic/jiesuochu.png'" mode=""></image>
							解锁
						</view>
						<view
							v-if="dataInfo.liveClassroomStatus == 1 && (dataInfo.unlock.isUnLock == 1 ||dataInfo.unlock.unlockType==9 ) "
							class="live-box remind-box"
							:style="{background: dataInfo.isAgree == 1 ? 'linear-gradient(89deg, #0CD8C2 0%, #1CE8A7 100%)' : 'linear-gradient(89deg, #015EEA 0%, #00C0FA 100%)'}">
							<image v-if="dataInfo.isAgree !=1" class="size2" :src="imageUrl+'/xing/yuyue.png'" 
								mode=""></image>
							<image v-if="dataInfo.isAgree ==1" class="size3" :src="imageUrl+'/xing/dwx.png'"  mode="">
							</image>
							{{dataInfo.isAgree == 1 ? '已预约' : '提醒我'}}
						</view>
						<!-- 在线中 -->
						<view class="live-box"
							v-else-if="dataInfo.liveClassroomStatus == 2 && (dataInfo.unlock.isUnLock == 1 ||dataInfo.unlock.unlockType==9 )">
							<image :src="imageUrl + '/static/home/live.png'" />
							直播中
						</view>
						<!-- 在线完成 -->
						<view
							v-else-if="dataInfo.liveClassroomStatus == 3 && (dataInfo.unlock.isUnLock == 1 ||dataInfo.unlock.unlockType==9 )"
							class="live-box complete-box">
							<image :src="imageUrl + '/static/home/live.png'" />
							已结束
						</view>
						<!-- 在线回放 -->
						<view
							v-else-if="dataInfo.liveClassroomStatus == 4 && (dataInfo.unlock.isUnLock == 1 ||dataInfo.unlock.unlockType==9 )"
							class="live-box playback-box">
							<image class="size4" :src="imageUrl+'/xing/xq3.png'"  />
							回放
						</view>
					</view>
				</view>
			</view>
			<view class="">
				<view class="teacherName">
					{{dataInfo.teacherName}}
				</view>
				<view class="tests one-row">
					{{dataInfo.courseName}}
				</view>
				<view class="tests2">
					{{dataInfo.liveStartTime.substr(dataInfo.liveStartTime.indexOf('-')+1,dataInfo.liveStartTime.length)}}
				</view>
			</view>
		</view>
		<view class="bottoms one-row">
			{{dataInfo.liveClassroomName}}
		</view>

	</view>


</template>
<script>
	export default {
		components: {},
		//接收参数
		props: ["dataInfo"],
		data() {
			//这里存放数据
			return {
				imageUrl: getApp().globalData.imageUrl
			};
		},
		mounted() {
			console.log(this.dataInfo)
		},
		//方法集合
		methods: {},
	};
</script>
<style lang='scss' scoped>
	.size4 {
		width: 18rpx !important;
		height: 18rpx !important;
	}

	.size3 {
		width: 14rpx !important;
		height: 12rpx !important;
	}

	.size2 {
		width: 12rpx !important;
		height: 16rpx !important;
	}

	.bottoms {
		/* border-top: 2px solid #EEEEEE; */
		padding-top: 13rpx;
		margin-top: 18rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #3D3D3D;
	}

	.imsw {
		width: 39rpx;
		height: 39rpx;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -120rpx;
		margin-left: -120rpx;
	}

	.teacherName {
		width: 103rpx;
		height: 35rpx;
		background: rgba(189, 255, 248, 0.4);
		border-radius: 8rpx;
		font-size: 22rpx;
		font-weight: bold;
		color: #0CD8C2;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tests2 {
		font-size: 19rpx;
		font-weight: 500;
		color: #999999;
	}

	.tests {
		width: 180rpx;
		font-size: 24rpx;
		font-weight: bold;
		color: #3D3D3D;
		margin: 16rpx 0;
	}

	.lefts {
		width: 100%;
		position: absolute;
		bottom: -10rpx;
	}

	.serr-row2 {
		/* width: 200rpx; */
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.desc {
		font-size: 24rpx;
		color: #666666;
	}

	.desc1 {
		font-size: 24rpx;
		color: #666666;
	}

	.desc2 {
		font-size: 24rpx;
		color: #999999;
	}

	.shitin {
		width: 74rpx !important;
		height: 38rpx;
		background: #FFF2EB;
		border-radius: 4rpx;
		font-size: 24rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 500;
		color: rgba(250, 100, 44, 1);
		margin-left: 19rpx;
		white-space: nowrap;
		margin-right: 15rpx;
		padding: 0 10rpx;
		margin-top: 4rpx;
	}

	.size {
		width: 21rpx;
		height: 25rpx;
	}

	.marbyuo {
		margin-bottom: 27rpx;
		display: flex;
	}

	.list-item {
		width: 342rpx;
		background: #ffffff;
		height: 215rpx;
		/* box-shadow: 0px 2rpx 2rpx 0px rgba(0, 0, 0, 0.1); */
		border-radius: 20rpx;

		padding: 14rpx 15rpx 0rpx 15rpx;
		.heads {
			width: 113rpx;
			height: 106rpx;
			border-radius: 50%;
			position: relative;
			margin-right: 19rpx;
		}

		.head {
			width: 113rpx;
			height: 106rpx;
			border-radius: 50%;
			position: relative;
			margin-right: 19rpx;
			border: 2rpx solid RGBA(255, 94, 5, 1);
			position: relative;
		}
		
		.head1 {
			width: 113rpx;
			height: 106rpx;
			border-radius: 50%;
			position: relative;
			margin-right: 19rpx;
			border: 2rpx solid RGBA(1, 121, 238, 1);
			position: relative;
		}
		
		.head2 {
			width: 113rpx;
			height: 106rpx;
			border-radius: 50%;
			position: relative;
			margin-right: 19rpx;
			border: 2rpx solid #FFA340;
			position: relative;
		}
		
		.head3 {
			width: 113rpx;
			height: 106rpx;
			border-radius: 50%;
			position: relative;
			margin-right: 19rpx;
			border: 2rpx solid #1BE7A9;
			position: relative;
		}



		.info {
			width: 470rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.title {
				font-size: 32rpx;
				color: #333333;
				font-weight: bold;
				/* margin-bottom: 29rpx; */
			}


		}

		.right-box {
			.live-box {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 87rpx;
				height: 30rpx;
				border-radius: 15rpx;
				background: linear-gradient(90deg, #fd7a3f, #fa632b);
				font-size: 16rpx;
				color: #ffffff;

				image {
					width: 28rpx;
					height: 28rpx;
					margin-right: 6rpx;
				}
			}

			.remind-box {
				background: linear-gradient(90deg, #3bf0bb, #3b7cfe);
			}

			.complete-box {
				background-color: none !important;

				background-image: url($fileBaseUrl+'/ykstatic/startType3_1631613967962.png');
				background-size: 100% 100%;
			}

			.playback-box {

				background: linear-gradient(-89deg, #FFAC52 0%, #FF8502 99%);
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
