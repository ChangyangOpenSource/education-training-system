<template>
	<view class="bg">
		<view class="" v-if="list.length>0">
			<view class="list" v-for="(item,index) in list" :key="index">
				<view class="text">
					{{item.majorName}}
				</view>
				<view class="text2">
					兑换时间：{{item.activationTime}}
				</view>
				<view class="text3">
					结束时间：{{item.timeMessage}}
				</view>
				<view class="text4">
					兑换码：{{item.invitationCode}}
				</view>
			</view>
		</view>
		
		<view class="mask" v-else>
			<image :src="imageUrl+'/xing/zwsj.png'"  mode=""></image>
			<view>您还未兑换</view>
		</view>
		<view v-show='loginAss' class="back-tankuang">
			<login class="loginw" @guanbi='guanbi' />
		</view>
	</view>
</template>

<script>
	import {
		findByUser // 上传图片
	} from "@/api/professionalChoice.js";
	export default {
		data(){
			return{
				list:[],
				loginAss: getApp().globalData.loginAss,
				imageUrl: getApp().globalData.imageUrl,
			}
		},
		onShow(){
			this.findByUser()
		},
		methods:{
			guanbi(value) {
				this.loginAss = value
			},
			findByUser(){
				findByUser().then((res) => {
					console.log('登陆状态：', res);
					this.list=res.result
					// console.log('前往:', route);
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
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
	.bg{
		width: 100%;
		height: 100%;
		background: #FAFAFA;
		padding-top: 30rpx;
	}
	.list{
		height: 262rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		padding: 23rpx 0 26rpx 30rpx;
		margin: 0 30rpx 18rpx;
	}
	.text{
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #282828;
		margin-bottom: 26rpx;
	}
	
	.text2{
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #666666;
		margin-bottom: 26rpx;
	}
	
	.text3{
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #666666;
		margin-bottom: 21rpx;
	}
	
	.text4{
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #282828;
		padding-top: 21rpx;
		border-top: 1rpx solid #EEEEEE;
	}
</style>