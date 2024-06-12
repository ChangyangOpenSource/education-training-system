<template>
	<view class="end">
		<view class="Answersew">
			<cover-image class="imageses" :src="imageUrl+'/static/topImgs.png'" mode=""></cover-image>
			<cover-view class="questions-top">
				<cover-view class="questions-right" @tap="goLastPage()">
					<cover-image class="image" :src="imageUrl+'/image/fanhui2(2).png'" mode=""></cover-image>
				</cover-view>
				<cover-view class="daojishi">
					答题报告
				</cover-view>
				<cover-view class="questions-right21">
				</cover-view>
			</cover-view>
			<view class="questions-top2">
				<image :src="imageUrl + '/xcxImg2/static/question_beijing.png'"  />
			</view>
			<!-- <view class="back"> </view> -->
			<view class="top">
				<view class="top-jindutiao">
					<ctx ref="popup" type="bottom" :value='((arr.successCount/arr.countAll*100).toFixed(0))*1'>
					</ctx>
					<view class="lfes">
						<view class="top2"> {{arr.proportion}}% </view>
						<view class="top-Flex">
							<view class="top3"> 正确率 </view>
						</view>
					</view>
					<view class="flex23s">
						<view class="border-y7uan">
							<view class="flex-center">
								<view class="flex9">
									<view class="sizes femng"> {{arr.successCount}} </view>
								</view>
								<view class="flex9 femng fontSize"> 分 </view>
							</view>
						</view>
						<view class="flex-center">
							<view class="flex9">
								<view class="sizes"> {{arr.successCount}} </view>
							</view>
							<view class="flex9 fontSize"> 答对 </view>
						</view>
						<view class="flex-center">
							<view class="flex9">
								<view class="sizes"> {{arr.doCount - arr.successCount}} </view>
							</view>
							<view class="flex9 fontSize"> 答错 </view>
						</view>
						<view class="flex-center">
							<view class="flex9">
								<view class="sizes"> {{arr.countAll - arr.doCount}} </view>
							</view>
							<view class="flex9 fontSize"> 未答 </view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="dataTable">
			<view class="dataTable-canvas">
				<view class="dataTable-canvas-ti">
					<view style="display: flex;align-items: center;"> 正确率趋势 <view class="textxiaiz"> （最近七条） </view>
					</view>
				</view>
				<errorQuestionChart :data="chartData"></errorQuestionChart>
			</view>
		</view>
		<view class="lofolex"> 答题卡 </view>
		<view class="cenet">

			<view class="zhanshi">

				<view class="flexx mar-r">
					<image class="syuan" :src="imageUrl+'/image/zhenqueicon.png'" mode=""></image>
					{{arr.successCount}}
				</view>
				<view class="flexx mar-r">
					<image class="syuan2" :src="imageUrl+'/image/cuowu.png'" mode=""></image>
					{{arr.doCount - arr.successCount}}
				</view>
				<view class="flexx">
					<image class="syuan2" :src="imageUrl+'/image/weida.png'" mode=""></image>
					{{arr.countAll - arr.doCount}}
				</view>
			</view>
			<view class="">
				<view class="" v-for="(item,index) in listAll" :key='index'>
					<view class="okdwx" v-if="item.type==1"> 单选 </view>
					<view class="okdwx" v-else-if="item.type==2"> 多选 </view>
					<view class="okdwx" v-else-if="item.type==3"> 共用题干 </view>
					<view class="okdwx" v-else-if="item.type==4"> 共用选项 </view>
					<view class="okdwx" v-else-if="item.type==5"> 解答题 </view>
					<view class="okdwx" v-else-if="item.type==9"> 判断题 </view>
					<view class="okdwx" v-else-if="item.type==10"> 材料题 </view>
					<view class="okdwx" v-else> </view>
					<view class="flex">
						<template v-if="item.type==1">
							<view class="" v-for="(value,inx) in item.list" :key='inx'>
								<view :class="{bordeRdoun:true,bordeRdoun1:value.isAss==2,bordeRdoun2:value.isAss==1}">
									{{value.subNo}}
								</view>
							</view>
						</template>
						<template v-if="item.type==2">
							<view class="" v-for="(value,inx) in item.list" :key='inx'>
								<view :class="{bordeRdoun:true,bordeRdoun1:value.isAss==2,bordeRdoun2:value.isAss==1}">
									{{value.subNo}}
								</view>
							</view>
						</template>
						<template v-if="item.type==5">
							<view class="" v-for="(value,inx) in item.list" :key='inx'>
								<view :class="{bordeRdoun:true,bordeRdoun1:value.isAss==2,bordeRdoun2:value.isAss==1}">
									{{value.subNo}}
								</view>
							</view>
						</template>
						<template v-if="item.type==9">
							<view class="" v-for="(value,inx) in item.list" :key='inx'>
								<view :class="{bordeRdoun:true,bordeRdoun1:value.isAss==2,bordeRdoun2:value.isAss==1}">
									{{value.subNo}}
								</view>
							</view>
						</template>
						<template v-if="item.type==3">
							<view class="flex" v-for="(value,inx) in shareArr" :key='inx'>
								<view
									:class="{bordeduooun:true,bordeduooun1:value.isAss==2,bordeduooun2:value.isAss==1}"
									:key="inx">
									{{value.parentNo}}-{{value.childNo}}
								</view>
							</view>
						</template>
						<template v-if="item.type==4">
							<view class="flex" v-for="(value,inx) in AboutArr" :key='inx'>
								<view
									:class="{bordeduooun:true,bordeduooun1:value.isAss==2,bordeduooun2:value.isAss==1}"
									:key="inx">
									{{value.parentNo}}-{{value.childNo}}
								</view>
							</view>
						</template>
						<template v-if="item.type==10">
							<view class="flex" v-for="(value,inx) in sexswtArr" :key='inx'>
								<view
									:class="{bordeduooun:true,bordeduooun1:value.isAss==2,bordeduooun2:value.isAss==1}"
									:key="inx">
									{{value.parentNo}}-{{value.childNo}}
								</view>
							</view>
						</template>
						<view class="bordersie"> </view>
					</view>

				</view>
			</view>

		</view>

		<view class="butonss">
			<view class="datqw" @click="tishiAss=true"> 重新答题 </view>
			<view class="jeisi" @click="jiexi"> 查看解析 </view>
		</view>
		<cover-view class="zhezhao" v-if="tishiAss">
			<cover-view class="center">
				<cover-image class="gunbni" @click="tishiAss=false" :src="imageUrl+'/image/gunbiicon.png'" mode="">
				</cover-image>
				<cover-view class="mar-bu2"> 重做将会清空当前展示题目的答题记录 </cover-view>
				<cover-view class="mar-bu3"> 确定要重做吗 </cover-view>
				<cover-view class="flexsw">
					<cover-view class="colose" @click="tishiAss=false"> 取消 </cover-view>
					<cover-view class="yesAido" @click="onAgain"> 清空重做 </cover-view>
				</cover-view>

			</cover-view>
		</cover-view>

	</view>
</template>

<script>
	import {
		practiceCheck,
		practiceAgain,
		findByFail
	} from "@/api/professionalChoice.js";
	import ctx from './ctx.vue'
	import {
		getMajorInfo2,
		setMajorInfo,
		getchapter, //章
		getlistById, //节
		getpaper,
		getTitle
	} from "@/common/util/index.js";
	import errorQuestionChart from '@/pagesB/errorQue.vue'
	export default {
		data() {
			return {
				tishiAss: false,
				arr: {
					doCount: 0,
					userTime: 0,
					successCount: 0,
					countAll: 0,
					successScore: 0,
					scoreAll: 0,
					proportion: 0
				},
				listAll: [],
				subjectIdList: [],
				imageUrl: getApp().globalData.imageUrl,
				isRight: [],
				maxScore: '',
				peopleNum: '',
				vlaue: 0,
				seconds: '',
				scoreId: '',
				isAss: false,
				fengfx: false,
				type: '1',
				sourceType: "1",
				chartData: {},
				propos: [],
				couti: 1,
				num_tixing: '', // 获取试题时的请求参数【题型】（全部，单选，多选，共用题干，共用选项）
				num_fenlei: '', // 获取试题时的请求参数【分类】（未作，做错，收藏）
				shareArr: [],
				AboutArr: [],
				sexswtArr: [],
			}
		},
		components: {
			ctx,
			errorQuestionChart
		},
		// 分享给好友
		onShareAppMessage(options) {
			console.log(options)
			// if(options.target.id=='right'){
			// 	this.onShareTimeline()
			// }else{

			var that = this;
			// 设置菜单中的转发按钮触发转发事件时的转发内容
			var shareObj = {
				title: getTitle(), // 默认是小程序的名称(可以写slogan等)
				desc: '', // 小程序的描述
				path: '/pages/index/home', // 默认是当前页面，必须是以‘/’开头的完整路径
				imageUrl: '', // 图片封面，本地文件路径、网络图片路，支持PNG及JPG，默认当前页面截图，显示图片长宽比是 5:4。
				success: function(res) {
					// 转发成功之后的回调
					console.log(123)
					if (res.errMsg == 'shareAppMessage:ok') {
						console.log(res, 124214214214214214)
						// 根据专业查询直播中

					}
				},
				fail: function(res) {
					console.log(456)
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
					console.log(789)
					// 转发结束之后的回调（转发成不成功都会执行）
				}
			}
			// 来自页面内的按钮的转发
			if (options.from == 'button') {
				if (options.target.dataset.hi) {

				} else {
					shareScore({
						scoreId: this.arr.id
					}).then(res => {
						console.log(res)
						this.fengfx = true
						this.isAss = false
					})
				}


			}
			// 返回shareObj
			return shareObj;
			// }
		},
		// onLoad(options) {
		onShow() {
			// onLoad() {
			//#ifdef H5
			var aaa = getCurrentPages()
			console.log(aaa, '首页-接受值')
			// var options = JSON.parse(aaa[aaa.length - 1].options.query);
			if (aaa[aaa.length - 1].options.query) {
				var options = JSON.parse(aaa[aaa.length - 1].options.query);
			} else {
				var options = aaa[aaa.length - 1].options;
			}

			//#endif

			//#ifdef MP-WEIXIN
			var aaa = getCurrentPages()
			console.log(aaa, '首页-接受值')
			var options = aaa[aaa.length - 1].options;
			//#endif


			this.getServerData()
			console.log(options, '结果页')
			if (options.seconds) {
				this.seconds = options.seconds
			}
			this.type = options.type
			this.couti = options.couti
			this.sourceType = options.sourceType
			this.num_tixing = options.num_tixing
			this.num_fenlei = options.num_fenlei
			this.subjectIdList = options.subjectIdList.split(',')
			this.listAll = JSON.parse(decodeURIComponent(options.listAll))
			this.shareArr = []
			this.AboutArr = []
			this.sexswtArr = []
			this.listAll.forEach((res, index) => {
				if (res.type == 3) {
					res.list.forEach((resd, indexs) => {
						resd.questionPaperSubjectSubordinatesList.forEach((ite, ind) => {
							this.shareArr.push(ite)
						})
					})
				} else if (res.type == 4) {
					res.list.forEach((resd, indexs) => {
						resd.questionPaperSubjectSubordinatesList.forEach((ite, ind) => {
							this.AboutArr.push(ite)
						})
					})
				} else if (res.type == 10) {
					res.list.forEach((resd, indexs) => {
						resd.questionPaperSubjectSubordinatesList.forEach((ite, ind) => {
							this.sexswtArr.push(ite)
						})
					})
				}
			})
			this.check()
			console.log(this.listAll)


		},
		// onShow() {
		// 	uni.setPageOrientation({
		// 		orientation: 'landscape'
		// 	});
		// },
		methods: {
			goLastPage() {
				let pages = getCurrentPages(); //获取所有页面栈实例列表
				let nowPage = pages[pages.length - 1]; //当前页页面实例
				let prevPage = pages[pages.length - 2]; //上一页页面实例
				console.log(pages)
				console.log(nowPage)
				console.log(prevPage)
				// prevPage.$vm.tabbarIndex = 3; //修改上一页data里面的参数值
				uni.navigateBack({ //uni.navigateTo跳转的返回，默认1为返回上一级
					delta: 3
				});
			},
			getServerData() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						categories: ["1", "2", "3", "4", "5", "6", "7"],
						series: [{
							name: '正确率',
							data: this.propos.reverse(),
						}]
					};
					this.chartData = JSON.parse(JSON.stringify(res));
				}, 500);
			},
			onAgain() {
				practiceAgain({
					subjectIdList: this.subjectIdList,
					paperId: this.sourceType == 2 ? getpaper().id : '', //试卷ID
					type: this.type, //	做题形式 1练习 2测试
					sourceType: this.sourceType, //	题来源 1章节 2试卷
					chapterId: this.sourceType == 1 ? getchapter().id : '', //	章节试卷ID
					templateId: this.sourceType == 1 ? getlistById().templateId : '', //节ID
					examinationId: this.sourceType == 3 ? this.listAll[0].list[0].associatedId : ''
				}).then(res => {
					console.log(res)
					if (res.code == 200) {
						if (this.sourceType == 3) {
							uni.redirectTo({
								url: `/pagesB/parsing/index?subjectIdList=${this.subjectIdList}&sourType=${this.type}&sourceType=${this.sourceType}&couti=${this.couti}&isAss=false&num_tixing=${this.num_tixing}&num_fenlei=${this.num_fenlei}&listArr=${encodeURIComponent(JSON.stringify(this.listAll))}`
							})
						} else {
							uni.redirectTo({
								url: `/pagesB/parsing/index?subjectIdList=${this.subjectIdList}&sourType=${this.type}&sourceType=${this.sourceType}&couti=${this.couti}&isAss=false&num_tixing=${this.num_tixing}&num_fenlei=${this.num_fenlei}`
							})
						}

					}
				})
			},
			jiexi() {
				if (this.sourceType == 3) {
					uni.navigateTo({
						url: `/pagesB/parsing/index?subjectIdList=${this.subjectIdList}&sourType=${this.type}&sourceType=${this.sourceType}&isAss=true&couti=3&num_tixing=${this.num_tixing}&num_fenlei=${this.num_fenlei}&listArr=${encodeURIComponent(JSON.stringify(this.listAll))}`
					})
				} else {
					uni.navigateTo({
						url: `/pagesB/parsing/index?subjectIdList=${this.subjectIdList}&sourType=${this.type}&sourceType=${this.sourceType}&isAss=true&couti=3&num_tixing=${this.num_tixing}&num_fenlei=${this.num_fenlei}`
					})
				}

			},
			check() {
				practiceCheck({
					subjectIdList: this.subjectIdList,
					paperId: this.sourceType == 2 ? getpaper().id : '', //试卷ID
					type: this.type, //	做题形式 1练习 2测试
					sourceType: this.sourceType, //	题来源 1章节 2试卷
					chapterId: this.sourceType == 1 ? getchapter().id : '', //	章节试卷ID
					templateId: this.sourceType == 1 ? getlistById().templateId : '', //节ID
					examinationId: this.sourceType == 3 ? this.listAll[0].list[0].associatedId : '',
					viewFlg: 1,
				}).then(res => {
					console.log(res)
					if (res.code == 200) {
						console.log(res)
						this.arr = res.result
						this.findByFail()
						console.log(this.arr)

					}
				})
			},
			findByFail() {
				findByFail({
					paperId: this.sourceType == 2 ? getpaper().id : '', //试卷ID
					type: this.type, //	做题形式 1练习 2测试
					sourceType: this.sourceType, //	题来源 1章节 2试卷
					chapterId: this.sourceType == 1 ? getchapter().id : '', //	章节试卷ID
					templateId: this.sourceType == 1 ? getlistById().templateId : '', //节ID
				}).then(res => {
					console.log(res)
					if (res.code == 200) {
						console.log(res, 23)
						res.result.forEach((res) => {
							this.propos.push(res.proportion)
						})
					}
				})
			},
		}
	}
</script>

<style scoped lang='scss'>
	.dataTable-canvas-ti {
		display: flex;
		align-items: center;
		font-size: 34rpx;
		font-weight: bold;
		color: #333333;
	}

	.textxiaiz {
		font-size: 26rpx !important;
	}

	.colose {
		width: 230rpx;
		height: 66rpx;
		border: 1rpx solid #B5B5B5;
		border-radius: 33rpx;
		font-size: 30rpx;
		font-weight: 400;
		color: #999999;
		line-height: 66rpx !important;
		text-align: center;
	}

	.yesAido {
		width: 230rpx;
		height: 66rpx;
		background: $uni-primary;
		border: 1rpx solid #E5E5E5;
		border-radius: 33rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 66rpx !important;
		text-align: center;
		/* display: flex !important;
			align-items: center !important;
			justify-content: center !important; */
		margin-left: 29rpx;
	}

	.flexsw {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 62rpx;
	}

	.mar-bu2 {
		font-size: 28rpx;
		font-weight: 500;
		padding: 0 36rpx;
		color: #666666;
		margin-top: 45rpx;
	}

	.mar-bu3 {
		font-size: 28rpx;
		font-weight: 500;
		padding: 0 36rpx;
		color: #666666;
	}

	.mar-bu {
		font-size: 30rpx;
		font-weight: bold;
		color: #333333;
		margin-bottom: 50rpx;
	}

	.gunbni {
		width: 30rpx;
		height: 30rpx;
		position: absolute;
		top: 25rpx;
		right: 25rpx;
	}

	.center {
		width: 600rpx;
		height: 311rpx;
		background-color: #FFFFFF;
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 999999;
		margin-left: -300rpx;
		margin-top: -150rpx;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.border-y7uan {
		width: 116rpx;
		height: 116rpx;
		background: #FFFFFF;
		border: 2rpx solid $uni-primary;
		box-shadow: 0rpx 0rpx 21rpx 0rpx rgba(122, 134, 135, 0.16);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.bordersie {
		width: 1005;
		height: 20rpx;
		background: #F7F7F7;
		margin-top: 57rpx;
	}

	.Answersew {
		height: 700rpx;
	}

	.dataTable {
		padding: 10rpx;
		margin: 0 23rpx;
		/* width: 100%; */
		height: 100%;

		&-canvas {
			&-title {
				padding: 20rpx 0rpx;

				>text {
					padding-left: 20rpx;
					width: 100%;
					height: 100%;
					font-size: 34rpx;
					font-weight: bold;
					color: #333333;
					/* border-left: 10rpx solid #28b5b1; */
				}
			}
		}
	}

	.datqw {
		width: 345rpx;
		height: 82rpx;
		background: #FFE8E1;
		border-radius: 40rpx 0rpx 0rpx 40rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: $uni-primary;
		display: flex;
		justify-content: center;
		align-items: center;

		border: 2rpx solid $uni-primary;
	}

	.jeisi {
		width: 345rpx;
		height: 82rpx;
		background: $uni-primary;
		border-radius: 0rpx 40rpx 40rpx 0rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.femng {
		color: $uni-primary !important;
	}

	.daojishi {
		/* width: 300rpx; */
		height: 70rpx;
		display: flex;
		justify-content: center;
		font-size: 34rpx;
		font-weight: bold;
		color: #FFFFFF;
		align-items: center;
		/* margin-left: 135rpx; */
	}

	.questions-right21 {
		width: 80rpx;
		height: 70rpx;
		line-height: 70rpx;
		text-align: left;
		display: flex;
		align-items: center;
		padding-right: 30rpx;
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

	.imageses {
		height: 180rpx;
		position: fixed;
		top: -10rpx;
		z-index: 9999;
	}

	.questions-top {
		width: 100%;
		/* height: 151rpx; */
		padding-top: 100rpx;
		display: flex;
		justify-content: space-between;
		align-content: flex-end;
		position: fixed;
		top: 0;
		z-index: 99999;
	}

	.questions-top2 {
		position: absolute;
		top: -40rpx;

		image {
			width: 750rpx;
			height: 450rpx;
		}


	}


	.image {
		/* margin-left: 30rpx; */
		width: 19rpx;
		height: 34rpx;
	}

	.fengxiang-center-left2 {
		border: none !important;
		background-color: #516C86 !important;
		color: #FFFFFF !important;
		margin: 0 !important;
		padding: 0 !important;
		text-align: center;
		line-height: 50rpx;
		width: 200rpx;
		height: 50rpx;
		background: rgba(79, 106, 133, 0.99);
		border-radius: 25rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		margin-top: 15rpx;
	}

	.gunbni {
		width: 30rpx;
		height: 30rpx;
		position: absolute;
		top: 25rpx;
		right: 25rpx;
	}

	.center {
		width: 600rpx;
		height: 300rpx;
		background-color: #FFFFFF;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -300rpx;
		margin-top: -150rpx;
		border-radius: 10rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.mar-bu {
		margin-bottom: 15rpx;
	}

	.buttonse {
		width: 250rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(75, 110, 152, 1);
		color: #FFFFFF;
		border-radius: 50rpx;
		margin-top: 15rpx;
	}

	.zhezhao {
		width: 100%;
		height: 100%;
		background-color: rgba(51, 51, 51, 0.6);
		position: fixed;
		top: 0;
		z-index: 99999;
		left: 0;
	}

	.fengxiang-center-left {
		border: none !important;
		background-color: #516C86 !important;
		color: #FFFFFF !important;
		margin: 0 !important;
		padding: 0 !important;
	}

	.fengxiang-center-left::after {
		border: none !important;
	}

	.siwzcj {
		width: 35rpx;
		height: 37rpx;
		margin-right: 23rpx;
	}

	.fenx {
		width: 33rpx;
		height: 33rpx;
		margin-right: 26rpx;
	}

	.fenshu {
		font-size: 48rpx;
		font-weight: 400;
		color: #333333;
	}

	.fontSize {
		font-size: 24rpx;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		margin-top: 14rpx;
	}

	.back {
		width: 750rpx;
		height: 620rpx;
		background: #516C86;
		position: absolute;
		top: 0;
		left: 0;
		/* z-index: -1; */
	}

	.butonss {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 202rpx;
		background: #fff;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		left: 0;
		font-size: 32rpx;
		z-index: 999;
	}

	.okdwx {
		padding-left: 30rpx;
		margin-bottom: 15rpx;
	}

	.bordeRdoun {
		width: 74rpx;
		height: 74rpx;
		background: #F7F7F7;
		border-radius: 50%;
		font-size: 32rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
		margin-right: 49rpx;
		margin-bottom: 43rpx;
		margin: 0rpx 25rpx 43rpx 25rpx;
	}

	.bordeRdoun1 {
		width: 74rpx;
		height: 74rpx;
		background: rgba(237, 154, 82, 1);
		border-radius: 50%;
		font-size: 32rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 500;
		color: #FFFFFF;
		margin-right: 49rpx;
		margin-bottom: 43rpx;
		margin: 0rpx 25rpx 43rpx 25rpx;
	}

	.bordeRdoun2 {
		width: 74rpx;
		height: 74rpx;
		background: #0CD8C2;
		border-radius: 50%;
		font-size: 32rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 500;
		color: #FFFFFF;
		margin-right: 49rpx;
		margin-bottom: 43rpx;
		margin: 0rpx 25rpx 43rpx 25rpx;
	}

	.bordeduooun {
		width: 74rpx;
		height: 74rpx;
		background: #F7F7F7;
		border-radius: 50%;
		font-size: 22rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
		margin-right: 49rpx;
		margin-bottom: 43rpx;
		margin: 0rpx 25rpx 43rpx 25rpx;
	}

	.bordeduooun1 {
		width: 74rpx;
		height: 74rpx;
		background: rgba(237, 154, 82, 1);
		border-radius: 50%;
		font-size: 22rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 500;
		color: #FFFFFF;
		margin-right: 49rpx;
		margin-bottom: 43rpx;
		margin: 0rpx 25rpx 43rpx 25rpx;
	}

	.bordeduooun2 {
		width: 74rpx;
		height: 74rpx;
		background: #0CD8C2;
		border-radius: 50%;
		font-size: 22rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 500;
		color: #FFFFFF;
		margin-right: 49rpx;
		margin-bottom: 43rpx;
		margin: 0rpx 25rpx 43rpx 25rpx;
	}

	.flex {
		display: flex;
		flex-wrap: wrap;
	}

	.flex-center {
		width: 116rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.border-dati {
		height: 125rpx;
		border-right: 1rpx solid rgba(238, 238, 238, 1);
		border-left: 1rpx solid rgba(238, 238, 238, 1);
	}

	.flex23s {
		width: 560rpx;
		height: 134rpx;

		box-shadow: 0rpx 0rpx 21rpx 0rpx rgba(122, 134, 135, 0.16);
		border-radius: 67rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 0 50rpx 0 25rpx;
		position: absolute;
		bottom: 15rpx;
		left: 43rpx
	}

	.sizes {
		font-size: 36rpx;
	}

	.flex9 {
		display: flex;
		align-items: center;
	}

	.lfes {
		width: 130rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		top: 100rpx;
		left: 50%;
		margin-left: -65rpx;
	}

	.top-Flex {
		display: flex;
		margin-top: 34rpx;
		font-size: 26rpx;
	}

	.top3 {
		color: $uni-primary;
	}

	.top4 {
		color: red;
	}

	.top1 {
		font-size: 26rpx;
		color: rgba(126, 126, 126, 1);
		margin-bottom: 20rpx;
	}

	.top2 {
		font-size: 80rpx;
		font-family: Bahnschrift;
		font-weight: bold;
		color: $uni-primary;
	}

	.top-jindutiao {}

	.zhanshi {
		width: 600rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		border-radius: 5rpx;
		padding: 0 30rpx 0 0;
		margin-left: 30rpx;
		border-bottom: 1rpx solid #EEEEEE;
	}

	.mar-r {
		margin-right: 55rpx;
	}

	.lofolex {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		font-size: 34rpx;
		font-weight: bold;
		color: #333333;
		margin-top: 69rpx;
	}

	.flexx {
		display: flex;
		align-items: center;
		font-size: 26rpx;
		font-weight: 500;
		color: #808080;
	}

	.syuan {
		width: 27rpx;
		height: 27rpx;
		background-color: rgba(34, 82, 96, 1);
		border-radius: 100%;
		margin-left: 15rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 15rpx;
		color: #FFFFFF;
	}

	.syuan2 {
		width: 27rpx;
		height: 27rpx;
		border-radius: 100%;
		margin-left: 15rpx;
		display: flex;
		align-items: center;
		margin-right: 15rpx;
		justify-content: center;
		color: #FFFFFF;
	}

	.syuan3 {
		width: 27rpx;
		height: 27rpx;
		background-color: rgba(238, 238, 238, 1);
		border-radius: 100%;
		margin-left: 15rpx;
		margin-right: 15rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FFFFFF;
	}

	.top-yuan {
		width: 20rpx;
		height: 20rpx;
		background-color: rgba(34, 82, 96, 1);
		border-radius: 100%;
		margin-right: 10rpx;

	}

	.top-yuan2 {
		width: 20rpx;
		height: 20rpx;
		background-color: red;
		border-radius: 100%;
		margin-right: 10rpx;

	}

	.top-yuan3 {
		width: 20rpx;
		height: 20rpx;
		background-color: rgba(247, 247, 247, 1);
		border-radius: 100%;
		margin-right: 10rpx;

	}

	.yuan {
		width: 10rpx;
		height: 10rpx;
		background-color: rgba(34, 82, 96, 1);
		border-radius: 100%;
		margin-right: 10rpx;

	}

	.yuan2 {
		width: 10rpx;
		height: 10rpx;
		background-color: red;
		border-radius: 100%;
		margin-right: 10rpx;

	}

	.yuan3 {
		width: 10rpx;
		height: 10rpx;
		background-color: rgba(247, 247, 247, 1);
		border-radius: 100%;
		margin-right: 10rpx;

	}

	.cenet {
		height: auto;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		padding: 20rpx 0rpx;
		margin-top: 30rpx;
		margin-bottom: 200rpx;
	}

	.brder {
		/* border-top: 1rpx solid rgba(238, 238, 238, 1); */
		padding-top: 20rpx;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		/* top: -80rpx; */
	}

	.buttomn {
		background-color: rgba(81, 108, 134, 1);
		height: 80rpx;
		width: 600rpx;
		border-radius: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FFFFFF;
		margin: 0 auto;
	}

	.flex231 {
		display: flex;
		align-items: center;
		flex-direction: column;
		font-size: 26rpx;
		font-weight: 500;
		color: #808080;
	}

	.flex341 {
		display: flex;
		align-items: center;
		margin-bottom: 42rpx;
	}

	.flex2 {
		/* height: 80rpx; */
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 0 30rpx;
		position: relative;
		top: -40rpx;
	}

	.size {
		width: 40rpx;
		height: 40rpx;
		margin-right: 15rpx;
	}

	.top {
		/* width: 100%; */
		width: 644rpx;
		height: 471rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		padding: 0 30rpx;

		box-shadow: 0rpx 7rpx 40rpx 0rpx rgba(94, 94, 94, 0.27);
		position: absolute;
		top: 178rpx;
		left: 50%;
		z-index: 99;
		margin-left: -322rpx;
	}

	.end {
		/* width: 100%; */
		height: auto;
		min-height: 100%;
		background-color: #fafafa;
		/* padding: 60rpx 30rpx 150rpx; */
		position: relative;
		padding-bottom: 180rpx;

	}
</style>