<template>
	<view class="list">
		<view class="item" v-for="(item,index) in list" :key="index">
			<div class="left">
				<image :src="item.teacherImagePhoto"  class="image" />
			</div>
			<div class="righ">
				<div class="right-top">
					<div class="name">
						{{ item.teacherName }}
					</div>
					<div class="name2">
						{{ item.teacherTitle }}
					</div>
				</div>
				<div class="right-bottom">
					{{
					  item.teacherIntroduce
					}}
				</div>
			</div>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['list'],
		mounted() {
			console.log(this.list, '教师组件接受')
		}
	}
</script>

<style scoped lang="scss">
	.list {
		.item {
			box-sizing: border-box;
			width: 100%;
			height: 189rpx;
			padding: 0 35rpx;
			background: #FFFFFF;
			border: 2px solid #EEEEEE;
			border-radius: 30rpx;
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;

			.left {
				margin-right: 25rpx;
				border-radius: 50%;

				.image {
					width: 112rpx;
					height: 112rpx;
					border-radius: 50%;
					border: 5rpx solid #ff6f1f;
				}
			}

			.righ {
				.right-top {
					display: flex;
					align-items: center;

					.name {
						margin-right: 26rpx;
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #333333;
						line-height: 26rpx;
					}

					.name2 {
						background: linear-gradient(89deg, #FF8849 0%, #FF5E04 100%);
						border-radius: 14rpx 14rpx 15rpx 0px;
						padding: 0 12rpx;
						height: 30rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 20rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #FFFFFF;
						line-height: 26rpx;
					}
				}

				.right-bottom {
					margin-top: 30rpx;
					text-align: left;
					font-size: 22rpx;
					line-height: 33rpx;
					font-family: Microsoft YaHei;
					font-weight: 300;
					color: #666666;
				}
			}
		}
	}
</style>
