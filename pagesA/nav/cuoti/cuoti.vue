<template>
	<view class="bg">
		<top_nav_return_green :topNavTitle="topNavTitle" :router="'pages/index/index'"/>
		<!-- 错题搜索 -->
		<view class="search_box">
			<image :src="imageUrl+'/icon/search.png'"/>
			<input type="text" placeholder="搜索收藏关键词" v-model="searchText" @confirm="initData()" />
			<view class="search_box_btn" @click="initData()"> 搜索 </view>
		</view>
		<!-- 导航栏 -->
		<view class="tabber_box">
			<view class="tabber_item1" :class="{active_tabber_items : currentLiftingType == 0}"
				@tap="onChangeLiftingType(0)">
				<view class=""> 全部 </view>
			</view>
			<view class="tabber_item" :class="{active_tabber_item : currentLiftingType == item.liftingType}"
				@tap="onChangeLiftingType(item.liftingType)" v-for="(item,index) in typeList" :key="index">
				<view>{{liftingTypeKeyObj[item.liftingType] || ''}}</view>
			</view>
		</view>
		<!-- 错题列表 -->
		<view class="" v-if="list && list.length > 0">
			<view class="list_box">
				<view class="list" v-for="(item,index) in list" :key="index">
					<view class="list_content" @click.stop="queryStudentBySubjectId(item)">
						<view class="list_content_No">{{liftingTypeKeyObj[item.liftingType] || ''}}</view>
						<mp-html class='zitso' :content="item.stem"> </mp-html>
					</view>
					<view class="list_text">
						<view class="list_time">
							做错:<text style="color:#F1592A;"> {{item.number}}</text>次
							{{item.createTime != null ? item.createTime : '' }}
						</view>
						<view class="list_btn">
							<image :src="imageUrl+'/icon/collection_ed.png'"  v-if="item.isCollect == 1"
								@click.stop="active_collection(item,index)"/>
							<image :src="imageUrl+'/icon/before_collection.png'"  v-else-if="item.isCollect == 0"
								@click.stop="active_collection(item,index)"/>
							<image :src="imageUrl+'/icon/del_green.png'" 
								@click.stop="removeQuestionError(item,index)"/>
						</view>
					</view>
				</view>
			</view>
			<view class="list_end"> —— 到底了 —— </view>
		</view>

		<view class="censiw" v-else>
			<image :src="imageUrl+'/xing/sw.png'" class="zaws" mode=""></image>
			<view class="zanwubiji">
				暂无错题
			</view>
		</view>

		<view class="xmct_btn" @click="go_kill()" v-if="list.length>0">
			消灭错题
		</view>
	</view>
</template>

<script>
	import {
		findByType, // 错题类型
		listError, // 错题列表
		removeQuestionError, //移除错题
	} from '@/api/nav/cuoti.js'
	import {
		delete_collection, // 取消收藏
		add_collection, // 添加收藏
	} from '@/api/nav/shoucang.js'
	import {
		queryStudentBySubjectId, //查看原题
	} from '@/api/nav/biji.js'
	import {
		getToken,
		getMajorInfo2,
		getUserInfo
	} from '@/common/util/index.js'
	export default {
		data() {
			return {
				topNavTitle: '我的错题',
				searchText: '',
				pageNo: 1,
				pageSize: 10,
				typeList: [],
				list: [],
				currentLiftingType: 0,
				imageUrl: getApp().globalData.imageUrl,
				liftingTypeKeyObj: {
					1: '单选题',
					2: '多选题',
					3: '共用题干',
					4: '共用选项',
					5: '解答题',
					9: '判断题',
					10: '材料题',
				}
			}
		},
		onLoad() {
			this.get_findByType()
			this.initData()
		},
		onReachBottom() {
			this.pageNo++
			this.get_listError()
		},
		methods: {
			/**
			 * 查询原题
			 * @param {Object} item
			 */
			queryStudentBySubjectId(item) {
				queryStudentBySubjectId({
					majorId: getMajorInfo2().id,
					subjectId: item.id,
					type: 0, //0错题1其他
				}).then((res) => {
					uni.navigateTo({
						url: `/pagesB/parsing/index?sourceType=100&sourType=1&couti=1&isAss=true&listArr=${encodeURIComponent(JSON.stringify(res.result.list))}`
					})
				})
			},
			/**
			 * 收藏，取消收藏
			 * @param {Object} recieve
			 * @param {Number} index
			 */
			active_collection(recieve, index) {
				let wdQuestionCollect = {
					agencyId: getMajorInfo2().agencyId,
					createTime: '2022-10-10 12:00:00',
					id: '',
					majorId: getMajorInfo2().id,
					studentId: getUserInfo().id,
					subjectId: recieve.id, //题干id
				}
				add_collection(wdQuestionCollect).then((res) => {
					if (res.code == 200) {
						if (res.message == "添加成功") {
							this.$set(this.list[index], 'isCollect', 1)
						}
						if (res.message == '取消成功') {
							this.$set(this.list[index], 'isCollect', 0)
						}
					}
					uni.showToast({
						title: res.message,
						icon: 'none'
					})
				})
			},
			/**
			 * 移除错题
			 * @param {Object} recieve
			 * @param {Number} index
			 */
			removeQuestionError(recieve, index) {
				let that = this
				uni.showModal({
					title: '移除错题',
					success: function(res) {
						if (res.confirm) {
							removeQuestionError({
								majorId: getMajorInfo2().id,
								subjectId: recieve.id, //题干id
							}).then((res) => {
								if (res.code == 200) {
									uni.showToast({
										title: '移除错题成功',
										icon: 'none'
									})
									that.$delete(that.list, index)
								} else {
									uni.showToast({
										title: '移除错题失败',
										icon: 'none'
									})
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			/**
			 * 消灭错题
			 */
			go_kill() {
				// 智能组题[错题]，消灭错题
				uni.navigateTo({
					url: '/pagesA/nav/aiQuestionGroup/aiQuestionGroup?agreeChangeFrom=false&num_from=3'
				})
			},
			/**
			 * 题型筛选
			 * @param {Number} e
			 */
			onChangeLiftingType(e) {
				this.currentLiftingType = e
				this.initData()
			},
			/**
			 * 初始化数据
			 */
			initData() {
				this.pageNo = 1
				this.list = []
				this.get_listError()
			},
			/**
			 * 获取错题列表
			 */
			get_listError() {
				let reqObj = {
					agencyId: getMajorInfo2().agencyId,
					keyWord: this.searchText,
					majorId: getMajorInfo2().id,
					studentId: getUserInfo().id,
					pageNo: this.pageNo,
					pageSize: this.pageSize,
					topicCategory: ''
				}
				if (this.currentLiftingType) {
					reqObj.liftingType = this.currentLiftingType
				}
				listError(reqObj).then((res) => {
					this.list = this.list.concat(res.result.records)
				})
			},
			/**
			 * 获取错题题型筛选项
			 */
			get_findByType() {
				findByType({
					majorId: getMajorInfo2().id,
				}).then((res) => {
					let list = res.result
					// 过滤不符合的数据
					let arr = list.filter((item) => item != null)
					// 转化类型
					arr.forEach((item, index) => {
						item.liftingType = Number(item.liftingType)
					})
					// 排序
					var compare = function(prop) {
						return function(obj1, obj2) {
							var val1 = obj1[prop];
							var val2 = obj2[prop];
							if (val1 < val2) {
								return -1;
							} else if (val1 > val2) {
								return 1;
							} else {
								return 0;
							}
						}
					}
					arr.sort(compare('liftingType'))
					// 赋值
					this.typeList = arr
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.zitso {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
	}

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

	.list_end {
		padding: 50rpx 0;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		color: #ccc;
		font-size: 30rpx;
	}

	.xmct_btn {
		position: fixed;
		bottom: 30rpx;
		left: 50%;
		margin-left: -250rpx;
		width: 500rpx;
		height: 82rpx;
		text-align: center;
		line-height: 82rpx;
		background: $uni-primary;
		border-radius: 40rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}

	.list_box {
		margin: 0 30rpx;

		.list {
			background-color: white;
			padding: 30rpx 30rpx;
			margin-bottom: 30rpx;
			border-radius: 20rpx;


		}
	}

	.list_content {

		.list_content_No {
			display: inline-block;
			margin-right: 30rpx;
			width: 98rpx;
			height: 38rpx;
			line-height: 38rpx;
			text-align: center;
			align-items: center;
			background: rgba(241, 89, 42, 0.1);
			border-radius: 10rpx;
			font-size: 24rpx;
			font-weight: bold;
			color: $uni-primary
		}
	}

	.list_text {
		margin-top: 33rpx;
		display: flex;
		justify-content: space-between;
		font-size: 24rpx;
		font-weight: 400;
		color: #999999;

		.list_time {}

		.list_btn {
			display: flex;
			align-items: center;

			:last-child {
				margin-right: 0 !important;
			}

			image {
				margin-right: 40rpx;
				width: 26rpx;
				height: 26rpx;
			}
		}
	}

	.tabber_box {
		display: flex;
		padding: 33rpx 33rpx 33rpx 30rpx;
		overflow-x: scroll;

		.active_tabber_items {
			view {
				width: 135rpx !important;
				height: 51rpx;
				line-height: 51rpx;
				text-align: center;
				background: $uni-primary !important;
				border-radius: 26rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF !important;
				display: inline-table;
			}
		}


		.tabber_item1 {
			view {
				margin-right: 10rpx;
				width: 135rpx;
				height: 51rpx;
				line-height: 51rpx;
				text-align: center;
				background: #EEEEEE;
				border-radius: 26rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;
			}
		}

		.tabber_item {
			view {
				margin-right: 10rpx;
				width: 135rpx;
				height: 51rpx;
				line-height: 51rpx;
				text-align: center;
				background: #EEEEEE;
				border-radius: 26rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;
			}
		}


		.active_tabber_item {
			view {
				width: 135rpx;
				height: 51rpx;
				line-height: 51rpx;
				text-align: center;
				background: $uni-primary !important;
				border-radius: 26rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF !important;
			}
		}
	}

	.search_box {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 0 30rpx;
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



	.bg {
		padding-top: 170rpx;
		padding-bottom: 140rpx;
		background: rgba(249, 249, 249, 0.8);
		min-height: 100vh;

	}

	// --------------------------------------- 动态样式
</style>