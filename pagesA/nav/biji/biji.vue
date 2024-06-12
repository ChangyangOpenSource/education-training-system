<template>
	<view class="bg">
		<top_nav_return_green :topNavTitle="topNavTitle"/>
		<!-- 笔记搜索 -->
		<view class="search_box">
			<image :src="imageUrl+'/icon/search.png'" />
			<input type="text" placeholder="搜索笔记关键词" v-model="searchText" @confirm="initData()" />
			<view class="search_box_btn" @click="initData()"> 搜索 </view>
		</view>
		<!-- 笔记列表 -->
		<view class="" v-if="list && list.length > 0">
			<view class="list" v-for="(item,index) in list" :key="index">
				<!-- 创建时间、编辑笔记、删除笔记 -->
				<view class="content">
					<view class="content_time"> {{item.createTime}} </view>
					<view class="content_btn">
						<image :src="imageUrl+'/icon/bianji_2.png'" @click="queryBySubjectId(item.subjectId)"/>
						<view class="content_btn_yuanti" @click="queryBySubjectId(item.subjectId)">编辑</view>
						<image :src="imageUrl+'/icon/delicon@2x.png'" @click="delete_note(item.id,index)"/>
						<view class="content_btn_delete" @click="delete_note(item.id,index)">删除</view>
					</view>
				</view>
				<!-- 笔记内容 -->
				<view class="text">
					<mp-html class='zitso' :content="item.note"> </mp-html>
				</view>
				<!-- 笔记图片 -->
				<view class="img_list" v-if="item.imageUrl != '' && item.imageUrl != null ">
					<view class="img_box" v-for="(itemA,indexA) in item.imageUrl" :key="indexA">
						<image :src="itemA" @click="previewImage(itemA)"/>
					</view>
				</view>
				<!-- 查看原题 -->
				<view class="yuanti" @click="queryStudentBySubjectId(item)"> 查看原题
					<image :src="imageUrl+'/icon/arrow_bottom.png'"  />
				</view>
			</view>
			<!-- 到底提示 -->
			<view class="list_end" v-if="list && list.length>0"> —— 到底了 —— </view>
		</view>
		<view class="censiw" v-else>
			<image :src="imageUrl+'/xing/wu.png'" class="zaws" mode=""></image>
			<view class="zanwubiji"> 暂无笔记 </view>
		</view>

		<!-- 编辑笔记弹窗 -->
		<view class="popup_bg" v-if="popupState == true" @click.stop="popupState = false"> </view>
		<view class="popup_writeNote" v-if="popupState == true">
			<view class="inputbox">
				<textarea name="" id="" cols="50" rows="10" placeholder="好记性不如烂笔头" maxlength="500"
					v-model="noteInfo.note"></textarea>
				<view class="tip">
					<text v-if="noteInfo.note.length < 500">{{noteInfo.note.length}}</text>
					<text v-else-if="noteInfo.note.length >= 500" style="color:red;">{{noteInfo.note.length}}</text>
					/<text>500</text>
				</view>
			</view>
			<view class="btnbox">
				<view class="imgDad">
					<view class="imgChild" v-for="(item,index) in imgArr" :key="index">
						<image :src="item" @click="previewImage(item)" />
						<image :src="imageUrl+'/icon/imgdel.png'" class="imgChild_del" @click="del_img(index)" />
					</view>
					<view class="imgChild_add" @click="add_img()"> + </view>
				</view>
				<view class="submitbtn" @click="edit_note()"> 确定 </view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		delete_note, // 删除笔记
		edit_note, // 更新笔记
		list_note, // 获取笔记列表
		queryBySubjectId, // 题干id查笔记
		queryStudentBySubjectId // 查询与安提
	} from '@/api/nav/biji.js'
	import {
		getMajorInfo2
	} from '@/common/util/index.js'
	export default {
		data() {
			return {
				topNavTitle: '我的笔记',
				pageNo: 1,
				pageSize: 10,
				searchText: '', // 搜索
				imageUrl: getApp().globalData.imageUrl,
				list: [],
				popupState: false, // 笔记添加，编辑弹窗状态，默认false关闭，true为打开状态
				noteInfo: {}, // 笔记添加，编辑弹窗，信息
				imgArr: [], // 笔记添加，编辑弹窗，图片信息
			}
		},
		onLoad() {
			// 禁止用onShow请求数据,因为调用相册选择图片会触发onShow
			this.initData()
		},
		onReachBottom() {
			this.pageNo++
			this.list_note()
		},
		methods: {
			previewImage(url) {
				let arr = []
				arr[0] = url
				uni.previewImage({
					indicator: "none", //图片指示器样式
					current: 0, //图片索引值
					urls: arr //需要预览的图片链接列表
				});
			},
			queryStudentBySubjectId(item) {
				queryStudentBySubjectId({
					majorId: getMajorInfo2().id,
					subjectId: item.subjectId,
					type: 1, //0错题1其他
				}).then((res) => {
					uni.navigateTo({
						url: `/pagesB/parsing/index?asnwer=false&sourceType=99&sourType=1&couti=1&isAss=true&listArr=${encodeURIComponent(JSON.stringify( res.result.list))}`
					})
				})
			},
			edit_note() {
				if (this.noteInfo.note.length == 0) {
					uni.showToast({
						title: '笔记内容为空',
						icon: 'none'
					})
				} else {
					var data = {
						"agencyId": this.noteInfo.agencyId,
						"createTime": this.noteInfo.createTime,
						"id": this.noteInfo.id,
						"imageUrl": this.imgArr.join(','),
						"majorId": this.noteInfo.majorId,
						"note": this.noteInfo.note,
						"subjectId": this.noteInfo.subjectId
					}
					edit_note(data).then((res) => {
						if (res.code == 200) {
							uni.showToast({
								title: '更新成功',
								icon: 'none'
							})
							let index = this.list.findIndex((item) => {
								return item.id == data.id
							})
							if (data.imageUrl.length > 0) {
								data.imageUrl = data.imageUrl.split(',');
							}
							this.list.splice(index, 1, data)
							this.popupState = false
						} else {
							uni.showToast({
								title: '更新失败',
								icon: 'none'
							})
							this.popupState = false
						}
					})
				}

			},
			del_img(index) {
				this.imgArr.splice(index, 1)
			},
			add_img() {
				let that = this
				if (that.imgArr.length < 3) {
					uni.chooseImage({
						count: 1, //默认9
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album'], //从相册选择
						success: (chooseImageRes) => {
							// 获取的格式是数组，多选会同时返回，单选只返回一项
							console.log('chooseImage success =>', chooseImageRes);
							uni.uploadFile({
								url: baseConfig.reqUrl + '/sys/common/upload',
								header: {
									'X-Access-Token': gett() || ''
								},
								filePath: chooseImageRes.tempFilePaths[0],
								name: 'file',
								success: (uploadFileRes) => {
									let data = JSON.parse(uploadFileRes.data)
									if(data.success && data.message){
										that.imgArr.push(data.message)
									}else if(data.message){
										that.$uniNoIconTip(data.message)
									}
								}
							});
						}
					})
				} else {
					uni.showToast({
						title: '最多三张',
						icon: 'none'
					})
				}

			},
			queryBySubjectId(id) {
				queryBySubjectId({
					id: id,
					majorId: getMajorInfo2().id
				}).then((res) => {
					this.popupState = true
					this.noteInfo = res.result
					if (this.noteInfo.imageUrl != '') {
						this.imgArr = this.noteInfo.imageUrl.split(',')
					}
				})
			},
			initData() {
				this.pageNo = 1
				this.list = []
				this.list_note()
			},
			list_note() {
				list_note({
					majorId: getMajorInfo2().id,
					pageNo: this.pageNo,
					pageSize: this.pageSize,
					keyWord: this.searchText
				}).then((res) => {
					let arr = this.list.concat(res.result.records)
					arr.forEach((res, i) => {
						if (res.imageUrl != '' && res.imageUrl != null) {
							res.imageUrl = res.imageUrl.split(',')
						} else {
							res.imageUrl = ''
						}
					})
					this.list = arr
				})
			},
			delete_note(id, index) {
				let that = this
				uni.showModal({
					title: '要删除这条笔记吗',
					success: function(res) {
						if (res.confirm) {
							delete_note(id).then((res) => {
								if (res.code == 200) {
									uni.showToast({
										title: '删除成功',
										icon: 'none'
									})
									that.$delete(that.list, index)
								} else {
									uni.showToast({
										title: '删除失败',
										icon: 'none'
									})
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.censiw {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}

	.zaws {
		width: 600rpx;
		height: 600rpx;
	}

	.zanwubiji {
		font-size: 32rpx;
		font-weight: 500;
		color: rgba(102, 102, 102, 0.5);
		text-align: center;
	}

	.popup_writeNote {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 500rpx;
		z-index: 12;
		background: #fff;

		.inputbox {
			position: relative;
			margin: 50rpx 30rpx 0 30rpx;
			padding: 30rpx;
			width: auto;
			height: 180rpx;
			background: #f8f8fa;
			overflow: hidden;

			textarea {
				width: auto;
				height: 180rpx;
			}

			.tip {
				position: absolute;
				z-index: 12;
				right: 30rpx;
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;
			}
		}

		.btnbox {
			margin: 40rpx 30rpx 30rpx 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.imgDad {
				display: flex;

				:first-child {
					margin-left: 0 !important;
				}

				.imgChild {
					position: relative;
					margin-left: 30rpx;
					width: 79rpx;
					height: 79rpx;
					background: red;

					image {
						width: 100%;
						height: 100%;
					}

					.imgChild_del {
						position: absolute;
						z-index: 13;
						width: 32rpx;
						height: 32rpx;
						top: -20%;
						right: -20%;
					}

				}

				.imgChild_add {
					margin-left: 30rpx;
					width: 79rpx;
					height: 79rpx;
					font-weight: 200;
					text-align: center;
					line-height: 79rpx;
					font-size: 90rpx;
					border: 1rpx solid #c4c4c4;
				}
			}


			.submitbtn {
				width: 132rpx;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				background: $uni-primary;
				border-radius: 10rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #FFFFFF;
			}
		}
	}

	.popup_bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 11;
		background: rgba(0, 0, 0, 0.3);
	}

	.search_box {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 30rpx;
		padding-left: 22rpx;
		padding-right: 10rpx;
		width: 690rpx;
		height: 70rpx;
		background: #FFFFFF;
		border: 1rpx solid $uni-primary;
		border-radius: 35rpx;
		background: #fff;

		input {
			width: 70%;
		}

		image {
			width: 34rpx;
			height: 34rpx;
			margin-right: 20rpx;
		}

		.search_box_btn {
			width: 121rpx;
			height: 51rpx;
			line-height: 51rpx;
			text-align: center;
			background: $uni-primary;
			border-radius: 26rpx;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
		}
	}

	.list_end {
		padding: 50rpx 0;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		color: #ccc;
		font-size: 30rpx;
	}


	.bg {
		background: #fafafa;
		min-height: 100vh;
		padding: 0 30rpx;
		padding-top: 170rpx;
	}

	.list {
		margin-top: 30rpx;
		background: #fff;
		padding: 40rpx 25rpx;
		box-shadow: 0px 7rpx 40rpx 0px rgba(180, 180, 180, 0.1);
		border-radius: 20rpx;
	}

	.text {
		margin-top: 45rpx;
		margin-bottom: 30rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
	}

	.img_list {
		display: flex;
		flex-wrap: wrap;

		.img_box {
			width: 200rpx;
			height: 200rpx;
			margin-bottom: 30rpx;
			margin-right: 20rpx;
			border-radius: 20rpx;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		:nth-child(3) {
			margin-right: 0 !important;
		}

		:nth-child(6) {
			margin-right: 0 !important;
		}
	}

	.yuanti {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 140rpx;
		height: 37rpx;
		border: 1rpx solid #E5E5E5;
		border-radius: 19rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #4F5C5E;

		image {
			width: 12rpx;
			height: 8rpx;
			margin-left: 5rpx;
		}
	}

	.content {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.content_time {
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #999999;
		}

		.content_btn {
			display: flex;
			align-items: center;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;

			image {
				margin-left: 27rpx;
				margin-right: 8rpx;
				width: 22rpx;
				height: 22rpx;
			}

			.content_btn_yuanti {
				color: $uni-primary;
				// margin-right: 35rpx;
			}

			.content_btn_delete {
				color: #B2B9BA;
			}
		}
	}
</style>