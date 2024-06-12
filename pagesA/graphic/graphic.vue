<template>
	<view class="onse">
		<view class="status_bar">
			<view class="top">
				<view class="size" @click="onFanhui">
					<image class="fanhui" :src="imageUrl+'/static/live/黑返回键.png'" mode=""></image>
				</view>
				<view class="tuiguang2">
					详情
				</view>
				<view class="">

				</view>
			</view>
		</view>
		<view class="padd">
			<mp-html :content="content"> </mp-html>
		</view>
		<view class="bottoms">
			<button class="button" open-type="share">
				分享
				<!-- 	<image class="imgfex" src="@/static/fenx.png" mode=""></image> -->
			</button>
		</view>

	</view>

</template>

<script>
	import mpHtml from '@/components/mp-html/index'
	export default {
		// 分享给好友
		onShareAppMessage(options) {
			console.log(options)
			// if(options.target.id=='right'){
			// 	this.onShareTimeline()
			// }else{

			var that = this;
			// 设置菜单中的转发按钮触发转发事件时的转发内容
			var shareObj = {
				title: '畅阳教培', // 默认是小程序的名称(可以写slogan等)
				desc: '', // 小程序的描述
				path: `/pagesA/videoRoom/videoRoom?q=%3FisAss%3Dtrue%26resources%3D${this.resources}%26resourcesType%3D${this.resourcesType}%26template%3D${this.template}%26mediaId%3D${this.mediaId}`, // 默认是当前页面，必须是以‘/’开头的完整路径
				imageUrl: '', // 图片封面，本地文件路径、网络图片路，支持PNG及JPG，默认当前页面截图，显示图片长宽比是 5:4。
				success: function(res) {
					// 转发成功之后的回调
					console.log(res)
					if (res.errMsg == 'shareAppMessage:ok') {
						console.log(res)
						// 根据专业查询直播中

					}
				},
				fail: function(res) {
					// 转发失败之后的回调
					if (res.errMsg == 'shareAppMessage:fail cancel') {
						console.log(res)
						// 用户取消转发
					} else if (res.errMsg == 'shareAppMessage:fail') {
						console.log(res)
						// 转发失败，其中 detail message 为详细失败信息
					}
				},
				complete: function(res) {
					console.log(res)
					// 转发结束之后的回调（转发成不成功都会执行）
				}
			}
			// 来自页面内的按钮的转发
			if (options.from == 'button') {

				// 此处可以修改 shareObj 中的内容
				// shareObj.path = `/pagesA/graphic/graphic?`
			}
			// 返回shareObj
			return shareObj;
			// }
		},

		data() {
			return {
				value: {},
				imageUrl: getApp().globalData.imageUrl,
				content: ""
			};
		},
		onUnload() {
			console.log('likai', 12321321321321321213)
			uni.removeStorageSync('resour');
		},
		onLoad(options) {
			console.log(JSON.parse(decodeURIComponent(options.value)), 'plps')
			console.log(options, 'plps')
			if (options.value) {
				this.value = JSON.parse(decodeURIComponent(options.value))
			}
			this.resources = options.resources,
				this.resourcesType = options.resourcesType,
				this.template = options.template,
				this.mediaId = options.mediaId

			// if (this.value.content.replace(/\<img/gi)) {
			this.content = this.value.content.replace(/\<img/gi, '<image style="width:100%;height:auto"');
			// }
			//自适应图片大小
			// this.content = this.value.content.replace(/\<td/gi, '<table style="border:1;border-color:#000"');
		},
		methods: {
			onFanhui() {
				uni.reLaunch({
					url: `/pagesA/videoRoom/videoRoom?q=%3FisAss%3D1%26resources%3D${this.resources}%26resourcesType%3D${this.resourcesType}%26template%3D${this.template}`
				})
			},
		}


	};
</script>

<style lang="scss" scoped>
	.status_bar {
		position: fixed;
		top: 0;
		width: 100%;
		height: 160rpx;
		background-color: #FFFFFF;
		z-index: 9999;
	}

	.imgfex {
		width: 80rpx;
		height: 80rpx;
	}

	.top {
		display: flex;
		// padding-left: 24rpx;
		padding-top: 105rpx;
		padding-right: 80rpx;
		background-color: #FFFFFF;
		align-items: center;
		padding-bottom: 32rpx;
		justify-content: space-between;
	}

	.size {
		width: 80rpx;
		display: flex;
		justify-content: center;
	}

	.fanhui {
		width: 19rpx;
		height: 34rpx;
		// margin-right: 230rpx;
	}

	.tuiguang2 {
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #000000;
	}

	.padd {
		padding: 200rpx 30rpx 130rpx;
		max-width: 100%;

		image {
			width: 100rpx;
		}
	}

	.bottoms {
		width: 100%;
		height: 121rpx;
		background-color: rgba(247,247,247, 1);
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		bottom: 0rpx;
		right: 0rpx;
		z-index: 999;
	}

	.button {
		width: 690rpx;
		height: 80rpx;
		border-radius: 40rpx;
		background: #3D7DFF;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32rpx;
		font-weight: 500;
		color: #FFFFFF;

	}
</style>
