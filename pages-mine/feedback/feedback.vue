<template>
	<view class="putquestions" style="padding-bottom: 200rpx;">
		<view class="top-box">
			<view class="imgbox">
				<image :src="userImg || imageUrl+'/static/avatar_boy2.png'"  />
			</view>
			<view class="text">
				{{userName ? userName : '未登录'}}
			</view>
		</view>
		<view class="body-content">
			<!-- 文本框 -->
			<view class="form-view">
				<textarea v-model.trim="feedContent" :maxlength="100" placeholder="HI,请输入你的反馈与意见吧"
					placeholder-style=" font-size: 24rpx; font-family: PingFang SC; font-weight: 400; color: #999999;"
					class="feedInput" />
				<text class="putchar">{{ putChar }} / 100</text>
			</view>
		</view>

		<view class="cont">
			<view class="content">
				<view class="imgList">
					<view class="upload" @click="upLoad">
						<image src="@/static/upload.png" mode="scaleToFill"></image>
						<view>上传图片</view>
					</view>

					<view v-for="(item,index) in feedImg" :key="index">
						<image @click="feedImg.splice(index,1)" class="cancel" src="@/static/cancel.png"></image>
						<image :src="item" mode="scaleToFill" style="width: 100%;height: 100%;"></image>
					</view>
				</view>

				<view class="fkType">
					<view class="title">反馈类型</view>
					<view class="radios">
						<label class="radio" v-for="(item,index) in feedTypeOptions" :key="index"
							@click="radioChange(index)">
							<image v-if="feedType==index" :src="imageUrl+'/xing/xz1.png'" class='sizexz' />
							<image v-else :src="imageUrl+'/xing/xz.png'" class='sizexz' />
							<text>{{item}}</text>
						</label>
					</view>
					<view class="phone-input">
						<input maxlength="16" class="input-text"
							placeholder-style=" font-size: 24rpx; font-family: PingFang SC; font-weight: 500; color: #999999;"
							type="text" v-model="feedPhone" placeholder="请输入联系方式，方便我们联系您，为您解决问题" />
					</view>

				</view>
			</view>
		</view>

		<view class="answering-footer">
			<button class="button" @click="putFeedBack">提交</button>
		</view>
		<view v-show='loginAss' class="back-tankuang">
			<login class="loginw" @guanbi='guanbi' />
		</view>
	</view>



</template>
<script>
	import baseConfig from "@/baseConfig.js";
	import {
		getToken,
		getUserInfo
	} from "@/common/util/index.js";
	import {
		suggestionFeedback
	} from '@/api/mine/feedback.js'
	export default {
		data() {
			return {
				loginAss: getApp().globalData.loginAss,
				imageUrl: getApp().globalData.imageUrl,
				feedContent: "",
				feedImg: [],
				feedPhone: '',
				feedType: 0,
				userName: '',
				userImg: "",
				feedTypeOptions: ['功能/系统操作', '课程/商品', '服务质量', '投诉举报', '其他'],
			};
		},
		onShow() {
			if (getUserInfo()) {
				const userInfo = getUserInfo();
				this.userName = userInfo.stuName;
				this.userImg = userInfo.headimgurl;
			}
		},
		computed: {
			// 返回输入文本框输入的长度
			putChar() {
				return this.feedContent.length;
			},
		},
		methods: {
			guanbi(loginAss) {
				this.loginAss = loginAss
			},
			radioChange(e) {
				this.feedType = e
			},
			upLoad() {
				let that = this
				if (that.feedImg.length == 5) {
					that.$uniNoIconTip('最多上传5张照片')
					return
				}
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: baseConfig.reqUrl + '/sys/common/upload',
							header: {
								'X-Access-Token': getToken() || ''
							},
							filePath: tempFilePaths[0],
							name: 'file',
							success: (uploadFileRes) => {
								let data = JSON.parse(uploadFileRes.data)
								if(data.success && data.message){
									that.feedImg.push(data.message)
								}else if(data.message){
									that.$uniNoIconTip(data.message)
								}
							}
						});
					}
				});
			},
			// 提交意见反馈
			putFeedBack() {
				if (!this.feedContent) {
					this.$uniNoIconTip('文本框不能为空')
					return;
				}
				if (this.feedType > 4 || this.feedType < 0) {
					this.$uniNoIconTip('请选择反馈类型')
					return;
				}
				if (!this.feedPhone) {
					this.$uniNoIconTip('请填写联系方式')
					return;
				}
				suggestionFeedback({
					feedContent: this.feedContent,
					feedImg: this.feedImg.length > 0 ? this.feedImg.join(',') : '',
					feedPhone: this.feedPhone,
					feedType: this.feedType
				}).then(res => {
					if (res.code === 200) {
						this.$uniNoIconTip('提交成功')
						this.feedContent = ''
						this.feedImg = []
						this.feedPhone = ''
					} else {
						this.$uniNoIconTip('提交失败')
					}
				})
			},
		},
	};
</script>

<style lang="scss" scoped>
	.top-box {
		margin: 30rpx;
		display: flex;
		align-items: center;

		.imgbox {
			width: 80rpx;
			height: 81rpx;
			background: $uni-primary;
			border: 2px solid #FFFFFF;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 59rpx;
				height: 59rpx;
				border-radius: 50%;
			}
		}

		.text {
			margin-left: 30rpx;
			// width: 222rpx;
			// height: 31rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
			line-height: 26rpx;
		}
	}

	.phone-input {
		padding: 30rpx 20rpx;
		// width: 650rpx;
		// height: 80rpx;
		// background: #FFFFFF;
		border: 1px solid #D9DADF;
		border-radius: 10rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;

		input {
			border: none;
		}
	}

	.putquestions {
		background: #fafafa;
		min-height: 100%;
		overflow: hidden;
	}

	.sizexz {
		width: 24rpx;
		height: 24rpx;
	}

	view {
		box-sizing: border-box;
	}

	.radio {
		/deep/.uni-radio-input-checked {
			background-color: #248067 !important;
		}
	}


	.feedback-tips {
		position: absolute;
		top: 200rpx;
		left: 50%;
		transform: translateX(-50%);
		z-index: 999;
		padding: 20rpx 30rpx;
		border-radius: 10rpx;
	}

	.cu-bar {
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.contents {
		margin-left: 160rpx;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		line-height: 26rpx;
	}

	.body-content {
		box-sizing: border-box;
		padding: 0 30rpx;
		width: 100%;
	}

	// 文本框
	.form-view {
		background-color: #fff;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		position: relative;
		margin-top: 20rpx;
	}

	.feedInput {
		height: 326rpx;
		padding: 16rpx 4rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
	}

	.textarea-placeholder {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
	}

	.uni-textarea-textarea {
		font-size: 32rpx;
	}


	.putchar {
		position: absolute;
		bottom: 20rpx;
		right: 26rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
	}

	.question-head {
		height: 48rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
	}

	//   底部
	.answering-footer {
		width: 100%;
		// height: 120rpx;
		background: #ffffff;
		// box-shadow: 0 0 20rpx 0rpx rgba(0, 0, 0, 0.3);
		box-sizing: border-box;
		padding: 0 30rpx;
		position: fixed;
		// bottom: 50rpx;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.ask-teacher {
			width: 335rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #002063;
			font-weight: bold;
			letter-spacing: 1rpx;
		}

		.button {
			color: #fff;
			font-size: 36rpx;
			background-color: $uni-primary;
			margin: 0;
			margin-bottom: 50rpx;
			width: 690rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 88rpx;
			border-radius: 65rpx;
		}
	}

	.cont {
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;

		.content {
			width: 100%;
			background-color: #ffffff;
			border-radius: 20rpx;
			padding: 30rpx 20rpx 55rpx 20rpx;
			box-sizing: border-box;
		}
	}

	.imgList {
		width: 100%;
		display: flex;
		// justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		box-sizing: border-box;

		>view {
			width: 31.333%;
			margin-right: 3%;
			height: 200rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border: 1px solid #DDDDDD;
			border-radius: 10rpx;
			margin-bottom: 20rpx;
			position: relative;

			.cancel {
				width: 34rpx;
				height: 34rpx;
				position: absolute;
				top: -17rpx;
				right: -17rpx;
				z-index: 99;
			}
		}

		>view:nth-of-type(3n+0) {
			margin-right: 0;
		}

		.upload {
			image {
				width: 70rpx;
				height: 60rpx;
			}

			view {
				font-size: 28rpx;
				font-family: PingFang SC;
				color: #666666;
				padding-top: 20rpx;
			}
		}
	}

	.fkType {
		width: 100%;
		padding-top: 20rpx;

		.title {
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
			margin-bottom: 30rpx;
		}
	}

	.radioList {
		width: 100%;
	}

	.radios {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	.radio {
		width: 50%;
		margin-bottom: 30rpx;
		padding-left: 10rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;

		radio {
			transform: scale(0.7)
		}

		text {
			margin-left: 15rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			color: #333333;
		}
	}

	.input {
		width: 100%;
		height: 80rpx;
		background: #FFFFFF;
		border: 1px solid #D9DADF;
		border-radius: 10rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.placeholder-class {
		font-size: 24rpx !important;
		font-family: PingFang SC !important;
		color: #999999 !important;
	}
</style>