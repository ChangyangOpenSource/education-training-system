<template>
	<view class="bg">
		<!-- <top_nav_return :topNavTitle="topNavTitle" :returnState="true"></top_nav_return> -->
		<view class="top_nav_return">
			<view class="imgbox" @click="backPage()">
				<image :src="imageUrl+'/icon/arrow_l.png'" mode=""></image>
			</view>
			<view class="top_nav_title">
				答题卡
			</view>
			<view class="imgbox">

			</view>
		</view>
		<view class="classify_bg">
			<view class="classify_box">
				<view class="classify_box_title"> 题型 </view>
				<view class="classify_box_content">
					<view class="classify_box_content_item" v-for="(item,index) in tixing_list" :key="index">
						<view class="tixing_btn" v-show="item.value ==0 && ON_0 == false"
							@click="num_tixing_change(item.value)">
							全部
						</view>
						<view class="active_tixing_btn " v-show="item.value == 0 && ON_0 == true"
							@click="num_tixing_change(item.value)">
							全部
						</view>
						<view class="tixing_btn" v-show="item.value == 1 && ON_1 == false"
							@click="num_tixing_change(item.value)">
							单选
						</view>
						<view class="active_tixing_btn" v-show="item.value == 1 && ON_1 == true"
							@click="num_tixing_change(item.value)">
							单选
						</view>
						<view class="tixing_btn" v-show="item.value == 2 && ON_2 == false"
							@click="num_tixing_change(item.value)">
							多选
						</view>
						<view class="active_tixing_btn" v-show="item.value == 2 && ON_2== true"
							@click="num_tixing_change(item.value)">
							多选
						</view>
						<view class="tixing_btn" v-show="item.value == 3 && ON_3 == false"
							@click="num_tixing_change(item.value)">
							共用题干
						</view>
						<view class="active_tixing_btn" v-show="item.value == 3 && ON_3 == true"
							@click="num_tixing_change(item.value)">
							共用题干
						</view>
						<view class="tixing_btn" v-show="item.value == 4 && ON_4 == false"
							@click="num_tixing_change(item.value)">
							共用选项
						</view>
						<view class="active_tixing_btn" v-show="item.value == 4 && ON_4 == true"
							@click="num_tixing_change(item.value)">
							共用选项
						</view>

						<view
							:class="{'tixing_btn':num_tixing.indexOf(item.value)==-1,'active_tixing_btn':num_tixing.indexOf(item.value)!=-1}"
							v-show="item.value == 5 " @click="num_tixing_change(item.value)">
							{{item.text}}
						</view>
						<view
							:class="{'tixing_btn':num_tixing.indexOf(item.value)==-1,'active_tixing_btn':num_tixing.indexOf(item.value)!=-1}"
							v-show="item.value == 9 " @click="num_tixing_change(item.value)">
							{{item.text}}
						</view>
						<view
							:class="{'tixing_btn':num_tixing.indexOf(item.value)==-1,'active_tixing_btn':num_tixing.indexOf(item.value)!=-1}"
							v-show="item.value == 10" @click="num_tixing_change(item.value)">
							{{item.text}}
						</view>

					</view>

				</view>
			</view>
			<view class="classify_box2">
				<view class="classify_box_title"> 类型 </view>
				<view class="classify_box_content">
					<view class="classify_box_content_item" v-for="(item,index) in classify_fenlei.classify"
						:key="index" :class="num_fenlei == item.type ? 'active_classify_box_content_item' : ''"
						@click="num_fenlei_change(item.type)">
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="classify_box2">
				<view class="classify_box_title"> 模式 </view>
				<view class="classify_box_content">
					<view class="classify_box_content_item" v-for="(item,index) in classify_model.classify" :key="index"
						:class="sourType == item.type ? 'active_classify_box_content_item' : ''"
						@click="num_model_change(item.type)">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		<view class="answerSheetbox" v-if="noQuestionState == false">
			<view class="" v-for="(item,index) in listArr" :key="index">
				<view
					v-if="item.type==1 && item.list.length != 0 || item.type == 2 && item.list.length != 0 || item.type == 5 && item.list.length != 0 || item.type == 9 && item.list.length != 0">
					<view class="answerSheetbox_title">
						<text v-if="item.type==1">单选题</text>
						<text v-else-if="item.type==2">多选题</text>
						<text v-else-if="item.type==5">解答题</text>
						<text v-else-if="item.type==9">判断题</text>
					</view>
					<view class="answerSheetbox_content">
						<view :class="{answerSheetbox_content_item:true,right:itemA.isAss==1,wrong:itemA.isAss==2}"
							v-for="(itemA,indexA) in item.list" :key="indexA" @click="onQestions(index,indexA)">
							{{itemA.parentNo}}
							<view class="answerSheetbox_content_doing2"
								v-if="itemA.id == nodoId && doingState == true && (indexA+1)%6==0">
								继续做 </view>
							<view class="answerSheetbox_content_doing"
								v-else-if="itemA.id == nodoId && doingState == true">
								继续做</view>
						</view>
					</view>
				</view>
				<view
					v-if="item.type==3 && item.list.length != 0 || item.type == 4 && item.list.length != 0 || item.type == 10 && item.list.length != 0">
					<view class="answerSheetbox_title">
						<text v-if="item.type==3">共用题干</text>
						<text v-else-if="item.type==4">共用选项</text>
						<text v-else-if="item.type==10">材料题</text>
					</view>
					<view class="answerSheetbox_content" v-if="item.type==3">
						<view class="answerSheetbox_content3" v-for="(itemA,indexA) in shareArr" :key="indexA">
							<view :class="{answerSheetbox_content_item2:true,right:itemA.isAss==1,wrong:itemA.isAss==2}"
								@click="onQestions(index,itemA.clickIndex,itemA.childNo-1)">
								{{itemA.parentNo}}-{{itemA.childNo}}
								<view class="answerSheetbox_content_doing2"
									v-if="itemA.id == nodoId && doingState == true&& (indexA+1)%6==0">
									继续做 </view>
								<view class="answerSheetbox_content_doing"
									v-else-if="itemA.id == nodoId && doingState == true">
									继续做 </view>
							</view>
						</view>
					</view>
					<view class="answerSheetbox_content" v-if="item.type==4">
						<view class="answerSheetbox_content3" v-for="(itemA,indexA) in AboutArr" :key="indexA">
							<view :class="{answerSheetbox_content_item2:true,right:itemA.isAss==1,wrong:itemA.isAss==2}"
								@click="onQestions(index,itemA.clickIndex,itemA.childNo-1)">
								{{itemA.parentNo}}-{{itemA.childNo}}
								<view class="answerSheetbox_content_doing2"
									v-if="itemA.id == nodoId && doingState == true&& (indexA+1)%6==0">
									继续做 </view>
								<view class="answerSheetbox_content_doing"
									v-else-if="itemA.id == nodoId && doingState == true">
									继续做 </view>
							</view>
						</view>
					</view>
					<view class="answerSheetbox_content" v-if="item.type==10">
						<view class="answerSheetbox_content3" v-for="(itemA,indexA) in sexswtArr" :key="indexA">
							<view :class="{answerSheetbox_content_item2:true,right:itemA.isAss==1,wrong:itemA.isAss==2}"
								@click="onQestions(index,itemA.clickIndex,itemA.childNo-1)">
								{{itemA.parentNo}}-{{itemA.childNo}}
								<view class="answerSheetbox_content_doing2"
									v-if="itemA.id == nodoId && doingState == true&& (indexA+1)%6==0">
									继续做 </view>
								<view class="answerSheetbox_content_doing"
									v-else-if="itemA.id == nodoId && doingState == true">
									继续做 </view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="submitBtn" @click="submit()" v-if="doingState == false"> 开始答题 </view>
			<view class="submitBtn" @click="reDo()" v-else-if="doingState == true"> 重做 </view>
		</view>
		<view class="tip" v-else-if="noQuestionState == true">
			<view class="tip_imgbox">
				<image :src="imageUrl+'/icon/noquestion_tip.png'"  />
				<view class="tip_text">
					没有合适的题目哦~可以尝试修改筛选项
				</view>
			</view>
		</view>
		<view class="zhezhao" v-if="tishiAss">
			<view class="center">
				<image class="gunbni" @click="tishiAss=false" :src="imageUrl+'/image/gunbiicon.png'" mode=""></image>
				<view class="mar-bu2">
					重做将会清空当前展示题目的答题记录，确定要重做吗
				</view>
				<view class="flexsw">
					<view class="colose" @click="tishiAss=false">
						取消
					</view>
					<view class="yesAido" @click="onAgain()">
						清空重做
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import {
		get_lnzt_listById,
		get_lnzt_listAll,
		get_lnzt_queryBySubjectId,
		get_question_type
	} from '@/api/index/lnzt.js'
	import {
		SubjectList,
		SubjectQueryById,
		answerAll,
		practiceCheck,
		practiceAgain
	} from '@/api/professionalChoice.js'
	import {
		getToken,
		getchapter, //章
		getlistById, //节
		getpaper
	} from '@/common/util/index.js'
	export default {
		data() {
			return {
				shareArr: [],
				AboutArr: [],
				sexswtArr: [],
				subjectIdList: [],
				tishiAss: false,
				// 题型按钮状态
				ON_0: true,
				ON_1: false,
				ON_2: false,
				ON_3: false,
				ON_4: false,
				imageUrl: getApp().globalData.imageUrl,
				sourceType: 1, //1是章节练习 2是历年真题
				sourType: 1, //1是练习 2测试  模式选择
				topNavTitle: '答题卡',
				nodoId: 0, // 没有做的第一题，用于显示【正在做】
				doingState: false, // 试卷做题状态，默认false，获取试题时判断若做过为true
				noQuestionState: false, // 未获取到题，【默认false，获取到】，当获取的题的长度位0时，为true ，展示无题提示图片
				listArr: [], // 答题卡数据
				newListAll: [], // 【新】答题卡数据，储存重构的答题卡数据，四种题型的题放进同一个数组
				num_tixing: [0], // 题型筛选
				num_fenlei: 0, // 分类筛选
				num_model: 0, // 模式选择
				tixing_list: [], // 后台返回的题型
				classify_tixing: {
					title: '题型',
					classify: [{
							name: '全部',
							type: '0'
						},
						{
							name: '单选',
							type: '1'
						},
						{
							name: '多选',
							type: '2'
						},
						{
							name: '公共题干',
							type: '3'
						},
						{
							name: '公共选项',
							type: '4'
						}
					]
				},
				classify_fenlei: {
					title: '类型',
					classify: [{
							name: '全部',
							type: '0'
						},
						{
							name: '未做的',
							type: '1'
						},
						{
							name: '收藏的',
							type: '2'
						},
						{
							name: '做错的',
							type: '3'
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
		watch: {
			num_tixing(newval, oldval) {
				// console.log('new:', newval, '---oldval:', oldval);
				this.ON_0 = false
				this.ON_1 = false
				this.ON_2 = false
				this.ON_3 = false
				this.ON_4 = false
				newval.forEach((item) => {
					if (item == 0) {
						this.ON_0 = true
					} else if (item == 1) {
						this.ON_1 = true
					} else if (item == 2) {
						this.ON_2 = true
					} else if (item == 3) {
						this.ON_3 = true
					} else if (item == 4) {
						this.ON_4 = true
					}
				})
			}
		},
		onLoad(option) {
			console.log('答题卡接受数据：', option);
			if (option.sourceType == 1) {
				// 章节练习
				this.sourceType = 1
				this.get_question_type()
			} else if (option.sourceType == 2) {
				// 历年真题
				this.sourceType = 2
				this.get_question_type()
			}

		},
		methods: {
			reDo() {
				this.tishiAss = true
			},
			onAgain() {
				this.shareArr = []
				this.AboutArr = []
				this.sexswtArr = []
				practiceAgain({
					subjectIdList: this.subjectIdList,
					paperId: this.sourceType == 2 ? getpaper().id : '', //试卷ID
					type: this.sourType, //	做题形式 1练习 2测试
					sourceType: this.sourceType, //	题来源 1章节 2试卷
					// requestSubjectIdList:'',
					chapterId: this.sourceType == 1 ? getchapter().id : '', //	章节试卷ID
					templateId: this.sourceType == 1 ? getlistById().templateId : '', //节ID
				}).then(res => {
					console.log(res, 'poop')
					if (res.code == 200) {
						this.listArr = []
						this.get_question_type()
						this.doingState = false
						this.tishiAss = false
					}
				})
			},
			go_write(item) {
				this.index = item.subNo - 1
				this.submit()
			},
			get_question_type() {
				let data = {
					sourceType: this.sourceType,
					chapterId: this.sourceType == 1 ? getchapter().id : '',
					paperId: this.sourceType == 2 ? getpaper().id : '',
					templateId: this.sourceType == 1 ? getlistById().templateId : ''
				}
				// console.log('获取题型请求数据：', data);
				get_question_type(data).then((res) => {
					console.log('获取题型：', res.result);
					this.tixing_list = res.result
					this.SubjectList()
				}).catch((err) => {
					console.log(err);
				})
			},
			submit() {
				if (this.listArr.length == 0) {
					return
				}
				let cuoti
				if (this.sourType == 1) {
					cuoti = 1
				} else {
					cuoti = 2
				}
				uni.navigateTo({
					// url: '/pagesB/parsing/index?sourceType=' + this.sourceType + '&couti'=  cuoti + '&num_tixing=' + this.num_tixing.toString() + '&num_fenlei=' + this.num_fenlei+ '&sourType=' + this.sourType
					url: `/pagesB/parsing/index?sourceType=${this.sourceType}&couti=${cuoti}&num_tixing=${this.num_tixing.join(',')}&num_fenlei=${this.num_fenlei}&sourType=${this.sourType}`
				})
			},
			onQestions(item, index, zindex) {
				console.log(item, index, zindex)
				let cuoti = ''
				if (this.sourType == 1) {
					cuoti = 1
				} else {
					cuoti = 2
				}
				uni.navigateTo({
					url: '/pagesB/parsing/index?sourceType=' + this.sourceType + '&couti=' + cuoti +
						'&num_tixing=' + this.num_tixing
						.toString() + '&num_fenlei=' + this.num_fenlei + '&type=' + item +
						'&index=' + index + '&zindex=' + zindex + '&sourType=' + this.sourType
				})
			},
			//获取题
			SubjectList() {
				this.shareArr = []
				this.AboutArr = []
				this.sexswtArr = []
				let data = {
					liftingType: this.num_tixing.toString(),
					// liftingType: '1,2', // 多选时的示例
					sourceClassify: this.num_fenlei,
					sourceType: this.sourceType, //1是章节 2是试卷
					chapterId: this.sourceType == 1 ? getchapter().id : '',
					paperId: this.sourceType == 2 ? getpaper().id : '',
					templateId: this.sourceType == 1 ? getlistById().templateId : '',
					type: this.sourType
				}
				console.log('章节练习列表获取reqdata：', data);

				get_lnzt_listAll(data).then((res) => {
					console.log('获取提返回值：', res);
					this.listArr = res.result.list
					this.subjectIdList = res.result.subjectIdList
					// 判断获取到题的长度
					let all_question_length = 0
					this.listArr.forEach((item, index) => {
						all_question_length += item.list.length
					})
					console.log('all_question_length:', all_question_length);
					if (all_question_length == 0) {
						this.noQuestionState = true
					} else {
						this.noQuestionState = false
					}
					// console.log(index, item,'判断这套卷子是否做过');
					let state_1 = 'ON'
					this.listArr.forEach((item, index) => {
						// console.log(index, item,'判断这套卷子是否做过');
						if (item.type == 1 || item.type == 2 || item.type == 5 || item.type == 9) {
							if (state_1 == 'ON') {
								item.list.forEach((itemA, indexA) => {
									if (itemA.isAss != 0) {
										console.log('做过', itemA)
										this.doingState = true
										state_1 = 'Off'
										return
									} else {
										// console.log('没做过', itemA)
										// this.doingState = false
									}
								})
							} else {
								return
							}

						} else {
							if (state_1 == 'ON') {
								item.list.forEach((itemA, indexA) => {
									itemA.questionPaperSubjectSubordinatesList.forEach((itemB,
										indexB) => {
										if (itemB.isAss != 0) {
											this.doingState = true
											state_1 = 'Off'
											return
										} else {
											// this.doingState = false
										}
									})
								})
							} else {
								return
							}

						}
					})
					// console.log(index, item,'找第一道未作的题');
					let state_2 = 'ON'
					this.listArr.forEach((item, index) => {
						// console.log(index, item,'找第一道未作的题');
						if (item.type == 1 || item.type == 2 || item.type == 5 || item.type == 9) {
							if (state_2 == 'ON') {
								item.list.forEach((itemA, indexA) => {
									if (state_2 == 'ON' && itemA.isAss == 0) {
										this.nodoId = itemA.id
										state_2 = 'Off'
										return
									}

								})
							} else {
								return
							}
						} else {
							if (state_2 == 'ON') {
								item.list.forEach((itemA, indexA) => {
									itemA.questionPaperSubjectSubordinatesList.forEach((itemB,
										indexB) => {
										if (state_2 == 'ON' && itemB.isAss == 0) {
											this.nodoId = itemB.id
											state_2 = 'Off'
											return
										}
									})
								})
							} else {
								return
							}
						}

					})
					this.listArr.forEach((res, index) => {
						if (res.type == 3) {
							res.list.forEach((resd, indexs) => {
								resd.questionPaperSubjectSubordinatesList.forEach((ite, ind) => {
									ite.clickIndex = indexs
									ite.type = index
									this.shareArr.push(ite)
								})
							})
							console.log(this.shareArr)
						} else if (res.type == 4) {
							res.list.forEach((resd, indexs) => {
								resd.questionPaperSubjectSubordinatesList.forEach((ite, ind) => {
									ite.clickIndex = indexs
									ite.type = index
									this.AboutArr.push(ite)
								})
							})
							console.log(this.AboutArr)
						} else if (res.type == 10) {
							res.list.forEach((resd, indexs) => {
								resd.questionPaperSubjectSubordinatesList.forEach((ite, ind) => {
									ite.clickIndex = indexs
									ite.type = index
									this.sexswtArr.push(ite)
								})
							})
							console.log(this.sexswtArr)
						}
					})
					// console.log('this.nodeId:', this.nodoId);
					console.log('this.listAll：', this.listArr);
				}).catch((err) => {
					console.log(err);
				})
			},
			backPage() {
				if (this.sourceType == 1) {
					uni.navigateBack()
					// uni.reLaunch({
					// 	url: '/pages/index/home?tabbarIndex=3'
					// })
				} else {
					uni.navigateBack()
					// let pages = getCurrentPages(); //获取所有页面栈实例列表
					// let nowPage = pages[pages.length - 1]; //当前页页面实例
					// let prevPage = pages[pages.length - 2]; //上一页页面实例
					// prevPage.$vm.tabbarIndex = 3; //修改上一页data里面的参数值
					// uni.navigateBack({ //uni.navigateTo跳转的返回，默认1为返回上一级
					// 	delta: 1
					// });
				}

				// uni.navigateBack()
			},
			num_tixing_change(type) {
				console.log('题型筛选:', type);
				if (type == 0) {
					this.num_tixing = [0]
				} else {
					if (this.num_tixing[0] == 0) {
						this.num_tixing = []
						this.num_tixing[0] = type
					} else {
						let index = this.num_tixing.indexOf(type)
						if (index == -1) {
							this.num_tixing.push(type)
						} else {
							this.num_tixing.splice(index, 1)
						}
						console.log('num_tixing:', this.num_tixing);
					}
				}
				// this.num_tixing = type
				console.log('this.num_tixing:', this.num_tixing);
				this.SubjectList()
			},
			num_fenlei_change(type) {
				// 类型，分类筛选
				this.num_fenlei = type
				console.log('this.num_fenlei:', this.num_fenlei);
				this.SubjectList()
			},
			num_model_change(type) {
				// 模式选择
				this.sourType = type
				if (type == 2) {
					this.shareArr = []
					this.AboutArr = []
					this.sexswtArr = []
					this.onAgain()
				} else {
					this.SubjectList()
				}
				console.log('this.num_model:', this.sourType);
			}
		}
	}
</script>

<style scoped lang='scss'>
	.colose {
		width: 230rpx;
		height: 66rpx;
		border: 2rpx solid #B5B5B5;
		border-radius: 33rpx;
		font-size: 30rpx;
		font-weight: 400;
		color: #999999;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.yesAido {
		width: 230rpx;
		height: 66rpx;
		background: $uni-primary;
		border: 2rpx solid #E5E5E5;
		border-radius: 33rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
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

	.zhezhao {
		width: 100%;
		height: 100%;
		background-color: rgba(51, 51, 51, 0.6);
		position: fixed;
		top: 0;
		z-index: 99999;
		left: 0;
	}

	.tip {
		overflow: hidden;
		margin-top: 30rpx;
		width: 100%;
		background: #fff;

		.tip_imgbox {
			margin: 100rpx auto;
			display: flex;
			flex-direction: column;
			align-items: center;
			/* width: 400rpx; */

			image {
				width: 400rpx;
				height: 400rpx;
			}

			.tip_text {
				margin: 0 auto;
				/* width: 350rpx; */

				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;
			}
		}

	}

	.answerSheetbox_content3 {
		display: flex;
		justify-content: space-between;
	}

	.answerSheetbox {
		margin-top: 30rpx;
		/* padding: 0 30rpx; */
		background: #fff;
		overflow: hidden;
		padding-bottom: 140rpx;
	}

	.answerSheetbox_title {
		margin: 30rpx 0 0 0;
		font-size: 30rpx;
		font-weight: 500;
		padding-left: 30rpx;
	}

	.answerSheetbox_content {
		display: flex;
		flex-wrap: wrap;
		padding-right: 5rpx;
	}

	.answerSheetbox_content2 {
		display: flex;
		flex-wrap: wrap;

		:first-child {
			margin-left: 0 !important;
		}

	}

	.answerSheetbox_content_item {
		margin-top: 30rpx;
		/* margin-left: 57rpx; */
		margin-left: 30rpx;
		/* margin-right: 28rpx; */
		width: 92rpx;
		height: 92rpx;
		background: #F7F7F7;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		font-size: 24rpx;
		color: #999999;

	}

	.answerSheetbox_content_item2 {
		margin-top: 30rpx;
		/* margin-left: 57rpx; */
		margin-left: 30rpx;
		/* margin-right: 28rpx; */
		width: 92rpx;
		height: 92rpx;
		background: #F7F7F7;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		font-size: 24rpx;
		color: #999999;

	}

	.right {
		margin-top: 30rpx;
		margin-left: 30rpx;
		/* margin-right: 28rpx; */
		width: 92rpx;
		height: 92rpx;
		background: #0CD8C2;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		color: #fff;
	}

	.wrong {
		margin-top: 30rpx;
		margin-left: 30rpx;
		/* margin-right: 28rpx; */
		width: 92rpx;
		height: 92rpx;
		background: #FF8737;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		color: #fff;
	}

	.answerSheetbox_content_doing {
		position: absolute;
		z-index: 2;
		top: -10%;
		left: 50%;
		height: 35rpx;
		width: 99rpx;
		background-image: url($fileBaseUrl + '/icon/doing.png');
		background-size: cover;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 22rpx;
		font-family: PingFang SC;
		font-weight: 500;
		white-space: nowrap;
		color: #FFFFFF;
	}

	.answerSheetbox_content_doing2 {
		position: absolute;
		z-index: 2;
		top: -10%;
		height: 35rpx;
		left: 15%;
		width: 99rpx;
		background-image: url($fileBaseUrl + '/icon/doing.png');
		background-size: cover;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 22rpx;
		font-family: PingFang SC;
		font-weight: 500;
		white-space: nowrap;
		color: #FFFFFF;
	}

	.submitBtn {
		overflow: hidden;
		/* margin: 70rpx auto 200rpx auto; */
		position: fixed;
		bottom: 30rpx;
		left: 50%;
		margin-left: -345rpx;
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

	.classify_bg {
		background: #fff;
		padding-bottom: 70rpx;
	}

	.classify_box {
		padding: 0 30rpx;
		padding-top: 40rpx;

	}

	.classify_box2 {
		margin-top: 80rpx;
		padding: 0 30rpx;
	}

	.classify_box_title {
		display: flex;
		align-items: center;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		/* color: #132B2E; */
		color: #333333;

		image {
			display: inline-block;
			margin-right: 12rpx;
			width: 30rpx;
			height: 30rpx;
		}
	}

	.classify_box_content {
		display: flex;
		/* // justify-content: space-between; */
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

	.bg {
		padding-top: 170rpx;
		background: #fafafa;
		/* background: red; */
		min-height: 100vh;
	}


	.returnbox {
		position: absolute;
		top: -15rpx;
		left: -15rpx;
		height: 60rpx;
		width: 70rpx;
		// border:1px red solid;
	}

	.top_nav_return {
		position: fixed;
		z-index: 10;
		top: 0;
		left: 0;
		width: 100%;
		padding-top: 110rpx;
		padding-bottom: 30rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.top_nav_title {
		position: relative;
		text-align: center;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #132B2E;


	}

	.imgbox {
		width: 59rpx;

		image {
			height: 36rpx;
			width: 19rpx;
		}
	}

	/* -------------------------------------------------------------  动态样式 ------------------------------------------- */
	.active_classify_box_content_item {
		background: $uni-primary !important;
		color: #FFFFFF !important;
		/* 		margin-top: 30rpx;
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
			border-radius: 25rpx; */
	}

	.tixing_btn {
		background: rgba(246, 246, 246, 0.9900);
		color: #95A2A3;
		border-radius: 25rpx;
	}

	.active_tixing_btn {
		background: $uni-primary !important;
		color: #FFFFFF !important;
		border-radius: 25rpx;
	}
</style>
