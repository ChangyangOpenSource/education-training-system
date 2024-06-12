<template>
	<view class="bg">
		<view class="questions-top">
			<view class="questions-right" @tap="goLastPage()">
				<image :src="imageUrl+'/image/fanhui.png'" mode=""></image>
			</view>
			<view class="daojishi">
				{{topNavTitle}}
			</view>
			<view class="questions-right21">
			</view>
		</view>
		<view class="classify_bg">
			<view class="classify_title">
				<image :src="imageUrl+'/icon/fenlei.png'"  />题型
			</view>
			<view class="classify_tixing"  v-if="tingTypes.includes('1')">
				<view class="classify_tixing_title">
					单选
				</view>
				<view class="classify_tixing_btn"
					:class="num_danxuan == item.type? 'active_classify_box_content_item' : ''"
					@click="num_tixing_change(1,item.type)" v-for="(item,index) in radio_num" :key="index">
					{{item.type}}道
				</view>
			</view>
			<view class="classify_tixing" v-if="tingTypes.includes('2')">
				<view class="classify_tixing_title">
					多选
				</view>
				<view class="classify_tixing_btn"
					:class="num_duoxuan == item.type? 'active_classify_box_content_item' : ''"
					@click="num_tixing_change(2,item.type)" v-for="(item,index) in checkbox_num" :key="index">
					{{item.type}}道
				</view>
			</view>
			<view class="classify_tixing" v-if="tingTypes.includes('3')">
				<view class="classify_tixing_title">
					共用题干
				</view>
				<view class="classify_tixing_btn"
					:class="num_gytg == item.type? 'active_classify_box_content_item' : ''"
					@click="num_tixing_change(3,item.type)" v-for="(item,index) in gytg_num" :key="index">
					{{item.type}}道
				</view>
			</view>
			<view class="classify_tixing" v-if="tingTypes.includes('4')">
				<view class="classify_tixing_title">
					共用选项
				</view>
				<view class="classify_tixing_btn"
					:class="num_gyxx == item.type? 'active_classify_box_content_item' : ''"
					@click="num_tixing_change(4,item.type)" v-for="(item,index) in gyxx_num" :key="index">
					{{item.type}}道
				</view>
			</view>
			<view class="classify_tixing" v-if="tingTypes.includes('5')">
				<view class="classify_tixing_title">
					解答题
				</view>
				<view class="classify_tixing_btn"
					:class="jiedatyi == item.type? 'active_classify_box_content_item' : ''"
					@click="num_tixing_change(5,item.type)" v-for="(item,index) in jiedati" :key="index">
					{{item.type}}道
				</view>
			</view>
			<view class="classify_tixing" v-if="tingTypes.includes('9')">
				<view class="classify_tixing_title">
					判断题
				</view>
				<view class="classify_tixing_btn"
					:class="panduantisw == item.type? 'active_classify_box_content_item' : ''"
					@click="num_tixing_change(9,item.type)" v-for="(item,index) in panduanti" :key="index">
					{{item.type}}道
				</view>
			</view>
			<view class="classify_tixing" v-if="tingTypes.includes('10')">
				<view class="classify_tixing_title">
					材料题
				</view>
				<view class="classify_tixing_btn" :class="cailiti == item.type? 'active_classify_box_content_item' : ''"
					@click="num_tixing_change(10,item.type)" v-for="(item,index) in cailiaoti" :key="index">
					{{item.type}}道
				</view>
			</view>
			<view class="classify_title marginTop1" v-if="agreeChangeFrom == true">
				<image :src="imageUrl+'/icon/project.png'"  />题源
			</view>
			<view class="classify_box_content" v-if="agreeChangeFrom == true">
				<view class="classify_box_content_item" v-for="(item,index) in classify_from.classify" :key="index"
					:class="num_from == item.type ? 'active_classify_box_content_item' : ''"
					@click="num_from_change(item.type)">
					{{item.name}}
				</view>
			</view>
			<view class="classify_title marginTop1">
				<image :src="imageUrl+'/icon/bianji.png'"  />模式
			</view>
			<view class="classify_box_content">
				<view class="classify_box_content_item" v-for="(item,index) in classify_model.classify" :key="index"
					:class="num_model == item.type ? 'active_classify_box_content_item' : ''"
					@click="num_model_change(item.type)">
					{{item.name}}
				</view>
			</view>
		</view>
		<view class="submit" @click="submit()">
			组题
		</view>
		<view v-show='loginAss' class="back-tankuang">
			<login class="loginw" @guanbi='guanbi' />
		</view>
	</view>
</template>

<script>
	import {
		smartTest,
		smartTestLiftingTypes
	} from '@/api/cySubjectSmart.js'
	import {
		getToken,
		getMajorInfo2,
		getUserInfo
	} from '@/common/util/index.js'
	import {
		checkLoginState
	} from '@/api/login2.js'
	export default {
		data() {
			return {
				viewFlg: 0,
				viewFlgTip: '激活会员即可体验',
				loginAss: getApp().globalData.loginAss,
				agreeChangeFrom: true,
				topNavTitle: '智能组题',
				num_danxuan: 10,
				num_duoxuan: 10,
				num_gytg: 10,
				num_gyxx: 10,
				jiedatyi: 10,
				panduantisw: 10,
				cailiti: 10,
				num_from: 0,
				imageUrl: getApp().globalData.imageUrl,
				subjectIdList: [],
				num_model: 1,
				tingTypes:"",
				radio_num: [{
						type: 10,
					},
					{
						type: 20,
					},
					{
						type: 40,
					},
					{
						type: 50,
					}
				],
				checkbox_num: [{
						type: 10,
					},
					{
						type: 20,
					},
					{
						type: 40,
					},
					{
						type: 50,
					}
				],
				gytg_num: [{
						type: 10,
					},
					{
						type: 20,
					},
					{
						type: 40,
					},
					{
						type: 50,
					}
				],
				gyxx_num: [{
						type: 10,
					},
					{
						type: 20,
					},
					{
						type: 40,
					},
					{
						type: 50,
					}
				],
				jiedati: [{
						type: 10,
					},
					{
						type: 20,
					},
					{
						type: 40,
					},
					{
						type: 50,
					}
				],
				panduanti: [{
						type: 10,
					},
					{
						type: 20,
					},
					{
						type: 40,
					},
					{
						type: 50,
					}
				],
				cailiaoti: [{
						type: 10,
					},
					{
						type: 20,
					},
					{
						type: 40,
					},
					{
						type: 50,
					}
				],
				classify_from: {
					title: '题源',
					classify: [{
							name: '全部',
							type: '0'
						},
						{
							name: '章节练习',
							type: '1'
						},
						{
							name: '历年真题',
							type: '2'
						},
						{
							name: '错题',
							type: '3'
						}, {
							name: '收藏',
							type: '4'
						},
					]
				},
				classify_model: {
					title: '模式',
					classify: [{
							name: '练习',
							type: '1'
						},
						{
							name: '测试',
							type: '2'
						},
					]
				},
			}
		},
		onLoad(option) {
			// console.log('接收数据：', option);
			if (option.agreeChangeFrom == "false") {
				console.log('111');
				this.agreeChangeFrom = false
				this.num_from = option.num_from
				if (option.num_from == 3) {
					console.log('222');
					this.topNavTitle = '消灭错题'
				} else if (option.num_from == 4) {
					console.log('333');
					this.topNavTitle = '智能练习'
				}
			}
		},
		onShow() {
			this.smartTestLiftingTypes()
			if (getUserInfo().majorIdStr.indexOf(getMajorInfo2().id) == -1) {
				this.viewFlg = 0
			} else {
				this.viewFlg = 1
			}
		},
		methods: {
			smartTestLiftingTypes(){
				smartTestLiftingTypes({
					majorId:getMajorInfo2().id
				}).then((res)=>{
					console.log(res)
					this.tingTypes=res.result
				})
			},
			guanbi(value) {
				this.loginAss = value
			},
			goLastPage() {
				let pages = getCurrentPages(); //获取所有页面栈实例列表
				let nowPage = pages[pages.length - 1]; //当前页页面实例
				let prevPage = pages[pages.length - 2]; //上一页页面实例
				// prevPage.$vm.type = that
				// .stype; //修改上一页data里面的参数值
				uni.navigateBack({ //uni.navigateTo跳转的返回，默认1为返回上一级
					delta: 1
				});
			},
			onAgain() {
				practiceAgain({
					paperId: this.sourceType == 2 ? getpaper().id : '', //试卷ID
					type: this.sourType, //	做题形式 1练习 2测试
					sourceType: this.sourceType, //	题来源 1章节 2试卷
					chapterId: this.sourceType == 1 ? getchapter().id : '', //	章节试卷ID
					templateId: this.sourceType == 1 ? getlistById().templateId : '', //节ID
				}).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.listArr = []
						this.get_question_type()
						this.doingState = false
					}
				})
			},
			submit() {
				// uni.showLoading({
				//     mask: true,
				//     title: "加载中...",
				// });
				if (!getToken()) {
					// 如果没token
					// uni.showToast({
					// 	title: '请先登录',
					// 	icon: 'error',
					// 	duration: 2000
					// })
					this.loginAss = true
					return
				} else {
					if (this.viewFlg == 0) {
						uni.showToast({
							title: this.viewFlgTip,
							icon: 'none'
						})
					} else {
						checkLoginState().then((res) => {
							// 有token且token有效
							console.log('登陆状态：', res);
							let smartVo = {
								"liftingTypeVos": [{
										"liftingType": "1",
										"num": this.num_danxuan,
										"topicCategory": ""
									}, {
										"liftingType": "2",
										"num": this.num_duoxuan,
										"topicCategory": ""
									}, {
										"liftingType": "3",
										"num": this.num_gytg,
										"topicCategory": ""
									}, {
										"liftingType": "4",
										"num": this.num_gyxx,
										"topicCategory": ""
									},
									{
										"liftingType": "5",
										"num": this.jiedatyi,
										"topicCategory": ""
									},
									{
										"liftingType": "9",
										"num": this.panduantisw,
										"topicCategory": ""
									},
									{
										"liftingType": "10",
										"num": this.cailiti,
										"topicCategory": ""
									},
								],
								"majorId": getMajorInfo2().id,
								"sourceType": this.num_from, //1章节 2试卷 3错题 4收藏
								"type": this.num_model // 1练习 2测试
							}
							console.log('请求参数：', smartVo);
							smartTest(smartVo).then((res) => {
								console.log('智能组题请求：', res);
								if (res.result.list.length != 0) {
									var lengrhts = this.num_danxuan + this.num_duoxuan + this.num_gytg +
										this.num_gyxx + this.jiedatyi + this.panduantisw + this.cailiti
									console.log(lengrhts)
									if (res.result.subjectIdList.length < lengrhts) {
										uni.showToast({
											title: `共有${res.result.subjectIdList.length}道题目符合条件正在进入..`,
											icon: 'none'
										})
									}

									setTimeout(() => {
										uni.navigateTo({
											url: `/pagesB/parsing/index?couti=${this.num_model}&sourceType=3&subjectIdList=${res.result.subjectIdList}&sourType=${this.num_model}&listArr=${encodeURIComponent(JSON.stringify( res.result.list))}`
										})
									}, 2000)

								} else {
									uni.showToast({
										title: '没有合适的题目哦~可以尝试修改选项。',
										icon: 'none'
									})
								}

							}).catch((err) => {
								console.log('智能组题err:', err);
							})
						}).catch((err) => {
							// 有token但token失效
							console.log('err：', err);
							if (err.data.code == 401 && err.data.message == "账号在其他设备登录") {
								uni.showToast({
									title: '登录过期',
									icon: 'error',
									duration: 2000
								})
								this.loginAss = true;
							}
						})
					}


				}

			},
			num_tixing_change(num, type) {
				if (num == 1) {
					// 改变单选数量
					if (this.num_danxuan == type) {
						this.num_danxuan = 0
					} else {
						this.num_danxuan = type
					}
				} else if (num == 2) {
					// 改变多选数量
					if (this.num_duoxuan == type) {
						this.num_duoxuan = 0
					} else {
						this.num_duoxuan = type
					}
				} else if (num == 3) {
					// 改变共用题干数量
					if (this.num_gytg == type) {
						this.num_gytg = 0
					} else {
						this.num_gytg = type
					}
				} else if (num == 4) {
					// 改变共用选项数量
					if (this.num_gyxx == type) {
						this.num_gyxx = 0
					} else {
						this.num_gyxx = type
					}
				} else if (num == 5) {
					// 改变共用选项数量
					if (this.jiedatyi == type) {
						this.jiedatyi = 0
					} else {
						this.jiedatyi = type
					}
				} else if (num == 9) {
					// 改变共用选项数量
					if (this.panduantisw == type) {
						this.panduantisw = 0
					} else {
						this.panduantisw = type
					}
				} else if (num == 10) {
					// 改变共用选项数量
					if (this.cailiti == type) {
						this.cailiti = 0
					} else {
						this.cailiti = type
					}
				}
			},
			num_from_change(type) {
				// 改变题源
				this.num_from = type
				console.log(this.num_from)
			},
			num_model_change(type) {
				// 改变模式
				this.num_model = type
				console.log(this.num_model)
			}
		}
	}
</script>

<style scoped lang="scss">
	.questions-right21 {
		width: 80rpx;
		height: 70rpx;
		line-height: 70rpx;
		text-align: left;
		display: flex;
		align-items: center;
		padding-right: 30rpx;
	}

	.daojishi {
		/* width: 300rpx; */
		height: 70rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 34rpx;
		font-weight: bold;
		color: #333333;
		/* margin-left: 135rpx; */
	}

	.questions-right {
		width: 80rpx;
		height: 70rpx;
		line-height: 70rpx;
		text-align: left;
		display: flex;
		align-items: center;
		padding-left: 30rpx;
	}

	.questions-top {
		width: 100%;
		height: 88rpx;
		/* padding-left: 30rpx; */
		/* padding-right: 30rpx; */
		padding-top: 80rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		top: 0;
		z-index: 99999;
		background-color: #FFFFFF;

		image {
			/* margin-left: 30rpx; */
			width: 19rpx;
			height: 34rpx;
		}

		.top-title {
			width: 301rpx;
			height: 71rpx;
			border: 1rpx solid #0191A0;
			border-radius: 6rpx;
			display: flex;
			align-items: center;
			/* justify-content: space-between; */
			margin-left: 95rpx;
			padding: 6rpx 7rpx;
		}

		.Answer {
			width: 150rpx;
			font-size: 28px;
			font-weight: 500;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #132B2E;
		}

		.Answer2 {
			width: 145rpx;
			height: 58rpx;
			background: #0191A0;
			border: 1rpx solid #0191A0;
			border-radius: 5rpx;
			font-size: 30px;
			font-weight: bold;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #FFFFFF;
		}

	}

	view {
		box-sizing: inherit !important;
	}

	.bg {
		min-height: 100vh;
		width: 100%;
		padding-bottom: 200rpx;
		overflow: hidden;
		background: #fff;
		box-sizing: inherit !important;
	}

	.classify_bg {
		overflow: hidden;
		margin-top: 170rpx;
		padding: 0 30rpx;
		background: #fff;
	}

	.classify_title {
		display: flex;
		align-items: center;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;

		image {
			width: 30rpx;
			height: 30rpx;
			margin-right: 16rpx;
		}
	}

	.marginTop1 {
		margin-top: 80rpx;
	}

	.classify_tixing {
		margin-top: 45rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.classify_tixing_title {
			width: 130rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #666666;
		}

		.classify_tixing_btn {
			width: 120rpx;
			height: 50rpx;
			line-height: 50rpx;
			text-align: center;
			background: rgba(249, 249, 249, 0.99);
			border: 1rpx solid #EEEEEE;
			border-radius: 25rpx;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #666666;
		}
	}

	.classify_box_content {
		display: flex;
		// justify-content: space-between;
		flex-wrap: wrap;

		:first-child {
			margin-left: 0 !important;
		}

		:nth-child(5) {
			margin-left: 0 !important;
		}

		:nth-child(9) {
			margin-left: 0 !important;
		}

		.classify_box_content_item {
			margin-top: 30rpx;
			margin-left: 30rpx;
			height: 50rpx;
			width: 150rpx;
			text-align: center;
			line-height: 50rpx;
			background: rgba(246, 246, 246, 0.9900);
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #95A2A3;
			border-radius: 25rpx;
		}
	}

	.submit {
		position: fixed;
		bottom: 30rpx;
		left: 50%;
		margin-left: -345rpx;
		// margin: 260rpx 30rpx 50rpx 30rpx;
		width: 690rpx;
		height: 82rpx;
		line-height: 82rpx;
		text-align: center;
		background: $uni-primary;
		border-radius: 40rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}


	/* -------------------------------------------------------------  动态样式 ------------------------------------------- */
	.active_classify_box_content_item {
		background: $uni-primary !important;
		color: #FFFFFF !important;
	}
</style>