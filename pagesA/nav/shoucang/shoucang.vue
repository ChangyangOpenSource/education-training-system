<template>
	<view class="bg">
		<top_nav_return_green :topNavTitle="topNavTitle" />
		<view class="search_box">
			<image :src="imageUrl+'/icon/search.png'" />
			<input type="text" placeholder="搜索收藏关键词" v-model="searchText" @confirm="initData()" />
			<view class="search_box_btn" @click="initData()"> 搜索 </view>
		</view>
		<!-- 导航栏 -->
		<view class="tabber_box">
			<view class="tabber_item1" :class="{active_tabber_items : currentLiftingType == 0}" @click="onChangeLiftingType(0)">
				<view> 全部 </view>
			</view>
			<view class="tabber_item" :class="{active_tabber_item : currentLiftingType == item.liftingType}"
				@click="onChangeLiftingType(item.liftingType)" v-for="(item,index) in typeList" :key="index">
				<view>{{liftingTypeKeyObj[item.liftingType] || ''}}</view>
			</view>
		</view>
		<!-- 收藏列表 -->
		<view class="" v-if="list && list.length>0">
			<view class="list_box">
				<view class="list" v-for="(item,index) in list" :key="index">
					<view class="list_content" @click.stop="queryStudentBySubjectId(item)">
						<view class="list_content_No"> {{liftingTypeKeyObj[item.liftingType] || ''}} </view>
						<mp-html class='zitso' :content="item.stem"> </mp-html>
					</view>
					<view class="list_text">
						<view class="list_time"> {{item.createTime}} </view>
						<view class="list_btn" @click.stop="delete_collection(item,index)">
							<image :src="imageUrl+'/icon/collection_ed.png'" />移除
						</view>
					</view>
				</view>
			</view>
			<view class="list_end"> —— 到底了 —— </view>
		</view>
		<view class="censiw" v-else>
			<image :src="imageUrl+'/xing/sc.png'" class="zaws" mode=""/>
			<view class="zanwubiji"> 暂无收藏 </view>
		</view>
		<!-- 智能练习 -->
		<view class="xmct_btn" v-if="list.length>0" @click="onIntelligentPractice()"> 智能练习 </view>
	</view>
</template>

<script>
	import {
		list_collection,
		type_collection,
		delete_collection,
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
				topNavTitle: '我的收藏',
				imageUrl: getApp().globalData.imageUrl,
				searchText: '',
				pageNo: 1,
				pageSize: 10,
				typeList: [],
				list: [],
				currentLiftingType: 0, // 选项卡状态
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
			this.type_collection()
			this.initData()
		},
		onReachBottom() {
			this.pageNo++
			this.list_collection()
		},
		methods: {
			/**
			 * 查询原题
			 * @param {Object} item
			 */
			queryStudentBySubjectId(item) {
				queryStudentBySubjectId({
					majorId: getMajorInfo2.id,
					subjectId: item.id,
					type: 1, //0错题1其他
				}).then((res) => {
					uni.navigateTo({
						url: `/pagesB/parsing/index?asnwer=false&sourceType=99&sourType=1&couti=1&isAss=true&listArr=${encodeURIComponent(JSON.stringify( res.result.list))}`
					})
				})
			},
			/**
			 * 智能练习
			 */
			onIntelligentPractice() {
				uni.navigateTo({
					url: '/pagesA/nav/aiQuestionGroup/aiQuestionGroup?agreeChangeFrom=false&num_from=4'
				})
			},
			/**
			 * 查询收藏类型
			 */
			type_collection() {
				type_collection({
					majorId: getMajorInfo2().id,
				}).then((res) => {
					let list = res.result
					// 过滤
					let arr = list.filter((item) => item != null)
					// 转换类型
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
					this.typeList = arr
				})
			},
			/**
			 * 初始化数据
			 */
			initData() {
				this.pageNo = 1
				this.list = []
				this.list_collection()
			},
			/**
			 * 获取收藏列表
			 */
			list_collection() {
				let reqObj = {
					keyWord: this.searchText,
					majorId: getMajorInfo2().id,
					pageNo: this.pageNo,
					pageSize: this.pageSize,
					studentId: getUserInfo().id,
					topicCategory: ''
				}
				if (this.currentLiftingType) {
					reqObj.liftingType = this.currentLiftingType
				}
				list_collection(reqObj).then((res) => {
					this.list = this.list.concat(res.result.records)
				})
			},
			/**
			 * 移除收藏
			 * @param {Object} recieve
			 * @param {Number} index
			 */
			delete_collection(recieve, index) {
				let that = this
				uni.showModal({
					title: '移除收藏',
					success(res) {
						if (res.confirm) {
							let wdQuestionCollect = {
								agencyId: getMajorInfo2().agencyId,
								majorId: getMajorInfo2().id,
								subjectId: recieve.id, //题干id
								studentId: getUserInfo().id
							}
							delete_collection(wdQuestionCollect).then((res) => {
								if (res.code == 200) {
									uni.showToast({
										title: '移除成功',
										icon: 'none'
									})
									that.$delete(that.list, index)
								} else {
									uni.showToast({
										title: '移除失败',
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
			 * 题型筛选
			 * @param {Number} e
			 */
			onChangeLiftingType(e) {
				this.currentLiftingType = e
				this.initData()
			},
		}
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

	.bg {
		width: 100%;
		padding-top: 170rpx;
		padding-bottom: 140rpx;
		background: rgba(249, 249, 249, 0.8);
		min-height: 100vh;

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
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;

		.list_time {}

		.list_btn {
			display: flex;
			align-items: center;

			image {
				margin-right: 15rpx;
				width: 26rpx;
				height: 26rpx;
			}
		}
	}




	.footer {
		position: fixed;
		bottom: 0;
		background-color: white;
		width: 100vw;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.footer_tip {
			margin-left: 30rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #132B2E;
		}

		.footer_btn {
			margin: 25rpx 30rpx 25rpx 0;
			width: 270rpx;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			background: $uni-primary;
			border-radius: 10rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
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

	// -----------------------------------------------
</style>