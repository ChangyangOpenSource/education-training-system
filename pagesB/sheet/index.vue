<template>
	<view class="end">
		<view class="end-div">
			<textarea class="texrts" maxlength='500' v-model="noteInfo.note" placeholder="好记性不如烂笔头，快来记笔记吧！" />
			<view class="porde">
				{{noteInfo.note.length}}/500
			</view>
			<view class="example-body">
				<view class="imgList">


					<view class="ondsw" v-for="(item,index) in imgList" :key="index" style="width:80rpx;height:80rpx;">
						<image @click="imgList.splice(index,1)" class="cancel" src="@/static/cancel.png"></image>
						<image :src="item" mode="scaleToFill" style="width: 100%;height: 100%;"
							@click="previewImage(item)"></image>
					</view>

					<image class="upload" @click="upLoad" :src="imageUrl+'/xing/zengjia.png'"  />

				</view>
				<view class="boses" @click="onBoses">
					确认
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		add_note, //添加笔记
		delete_note, // 删除笔记
		edit_note, // 更新笔记
		list_note, // 获取笔记列表
		queryBySubjectId, // 题干id查笔记
		queryStudentBySubjectId // 查询与安提
	} from '@/api/nav/biji.js'
	import {
		getUserInfo,
		getMajorInfo2,
		setMajorInfo,
		getchapter, //章
		getlistById //节
	} from "@/common/util/index.js";
	export default {
		props: ['add_note_state'],
		data() {
			return {
				imageUrl: getApp().globalData.imageUrl,
				imgList: [],
				noteInfo: {
					note: ''
				},
				time: '',
				addNoteState: '',
			}
		},
		mounted() {
			this.getCurrentTime()
			this.noteInfo = uni.getStorageSync('noteInfo')
			if (this.noteInfo.imageUrl != '') {
				this.imgList = this.noteInfo.imageUrl.split(',')
			}
			// 将接收的值另存起来，后续在组件内修改，避免直接修改接收的数据
			this.addNoteState = this.add_note_state
			console.log('写笔记组件接受：', this.noteInfo, '是添加笔记吗：', this.addNoteState)
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
				// uni.previewImage({
				// 	indicator: "none", //图片指示器样式
				// 	current: msg,  //图片索引值
				// 	urls: arr   //需要预览的图片链接列表
				// });
			},
			onBoses() {
				if (this.addNoteState == true) {
					// 添加笔记
					console.log('添加笔记：', this.$parent);
					if (this.noteInfo.note.length == 0) {
						uni.showToast({
							title: '笔记内容为空',
							icon: 'none'
						})
					} else {
						let data = {
							'agencyId': getUserInfo().agencyId,
							'createTime': this.time,
							// id: "",
							"imageUrl": this.imgList.join(','), // 图片
							"majorId": getMajorInfo2().id, // 专业id
							"note": this.noteInfo.note, // 笔记内容
							'studentId': getUserInfo().id,
							"subjectId": this.noteInfo.subjectId, // 题干id
						}
						add_note(data).then((res) => {
							// console.log('添加笔记：', res);
							this.$emit('onSheetde', false)
							uni.showToast({
								title: '添加成功'
							})
							this.addNoteState = false
						})
					}
				} else {
					// 更新笔记
					// console.log('更新笔记');
					if (this.noteInfo.note.length == 0) {
						uni.showToast({
							title: '笔记内容为空',
							icon: 'none'
						})
					} else {
						let data = {
							'agencyId': getUserInfo().agencyId,
							'createTime': this.time,
							'id': this.noteInfo.id,
							"imageUrl": this.imgList.join(','), // 图片
							"majorId": getMajorInfo2().id, // 专业id
							"note": this.noteInfo.note, // 笔记内容
							'studentId': getUserInfo().id,
							"subjectId": this.noteInfo.subjectId // 题干id
						}
						edit_note(data).then((res) => {
							// console.log('更新笔记：', res);
							this.$emit('onSheetde', false)
							uni.showToast({
								title: '更新成功'
							})
						})
					}
				}
			},
			upLoad() {
				if (this.imgList.length == 3) {
					uni.showToast({
						title: '最多上传3张照片',
						icon: 'none'
					})
					return
				}
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						console.log(tempFilePaths)
						console.log(chooseImageRes)
						uni.uploadFile({
							url: baseConfig.reqUrl + '/sys/common/upload',
							filePath: tempFilePaths[0],
							name: 'file',
							success: (uploadFileRes) => {
								console.log(uploadFileRes, '111')
								console.log(tempFilePaths, '222')
								let data = JSON.parse(uploadFileRes.data)
								if (data.code == 200 && data.result) {
									this.imgList.push(data.result)
									console.log('笔记图片数组：', this.imgList);
								} else {
									uni.showToast({
										title: data.message,
										icon: 'none'
									})
								}
							}
						});
					}
				});
			},
			getCurrentTime() {
				//获取当前时间并打印
				let yy = new Date().getFullYear();
				let mm = new Date().getMonth() + 1;
				let dd = new Date().getDate();
				let hh = new Date().getHours();
				let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
				let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
				this.time = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
				console.log(this.time)
			}



		}
	}
</script>

<style scoped lang='scss'>
/* 	view {
		box-sizing: inherit !important;
	}

	textarea {
		box-sizing: inherit !important;
	}
 */
	.imgList {
		width: 100%;
		display: flex;
		/* // justify-content: space-between; */
		align-items: center;
		flex-wrap: wrap;
		box-sizing: border-box;

		.ondsw {
			width: 20.333%;
			margin-right: 3%;
			height: 100rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border: 1px solid #DDDDDD;
			border-radius: 10rpx;
			/* margin-bottom: 20rpx; */
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
			width: 78rpx;
			height: 78rpx;
			/* 
			view {
				width: 80rpx;
				height: 80rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 90rpx;
				color: #666666;
			} */
		}
	}

	.boses {
		width: 132rpx;
		height: 60rpx;
		background: $uni-primary;
		border-radius: 10rpx;
		font-size: 28rpx;
		font-weight: bold;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.example-body {
		display: flex;
		align-items: center;
		padding: 10px;
		padding-top: 0;
		margin-top: 40rpx;
	}

	.end-div {
		/* box-sizing: border-box; */
		height: 434rpx;
		width: 100vw;
		background-color: #FFFFFF;
		/* background: tan; */
		padding: 40rpx 30rpx 0rpx;
		/* border: 1rpx solid #FF9900; */
		position: relative;
		box-sizing: inherit ;
	}

	.texrts {
		/* width: 630rpx; */
		width: 100%;
		height: 200rpx;
		background: #F8F8FA;
		border-radius: 10rpx;
		font-size: 24rpx;
		font-weight: 500;
		padding: 30rpx 30rpx;
	}

	.porde {
		position: absolute;
		right: 60rpx ;
		top: 250rpx;
		font-size: 22rpx;
		font-weight: 500;
		color: #999999;
	}
</style>
