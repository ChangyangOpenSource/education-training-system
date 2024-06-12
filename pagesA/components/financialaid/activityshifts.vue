<template>
	<view class="activityshifts">
		<view class="smj" @click="onSrtUpMajor">
			{{majorId.majorName}}
			<image src="@/static/youfanhui.png" class="youfanhui"  />
		</view>
		<view class="" v-if="isAss">
			<view class="kechang" v-for="(item,index) in classesAll" :key="index">
				<view class="kechang2">
					<view class="kechang-text">
						{{item.classesName}}
					</view>
					<view class="" style="display: flex;">
						<view class="label" v-if="item.courseCombination">
							{{ item.courseCombination }}
						</view>
						<view class="label2">
							在线{{ item.classHour }}节
						</view>
					</view>
				</view>
				<view class="twoLine">
					<view class="twoLine-text width1 over">
						{{item.classesDescribe}}
					</view>
					<view class="twoLine-text">
						{{item.students}}人学习
					</view>
				</view>
				<view class="scesLine">
					<view class="" style="display: flex;align-items: center;">
						<view class="border-yuan" v-for="items in item.teacherList" :key="items.id">
							<image class="border-yuan"
								:src="items.teacherImagePhoto == undefined ? items.imagePhoto : items.teacherImagePhoto" />
						</view>

					</view>
					<image class="sizeImg" :src="imageUrl+'/static/helpStuImg/img/participatin.png'" @click="participatin(item)" mode="">
					</image>
				</view>
				<view class="boeder-xuxian">

				</view>
				<view class="fourLine">

					<view class="" style="display: flex;align-items: center;">
						<view class="fourLine-letf" style="display: flex;align-items: center;">
							助学价￥ <view class="sizeText">
								{{item.student_price}}
							</view>
						</view>
						<view class="fourLine-centet">
							￥{{item.fficialPrice}}
						</view>
					</view>

					<view class="fourLine-right">
						助学金最高可减￥{{(item.fficialPrice-item.student_price).toFixed(2)<0?item.fficialPrice:(item.fficialPrice-item.student_price).toFixed(2)}}元
					</view>
				</view>
			</view>
		</view>
		<view class="wuzhuangtai" v-else>
			<view class="flex23">
				<image :src="imageUrl+'/static/helpStuImg/img/dengpao.png'"  class="dengpao" />
				<view class="dengpao-text">
					当前专业下没有相应课程
				</view>
			</view>
			<image class="doding" :src="imageUrl+'/static/helpStuImg/img/doding.png'"  />
			<view class="xuanze" @click="onSrtUpMajor">
				重新选择
			</view>
		</view>
	</view>
</template>

<script>
	import {
		findByMajorId,
		planJoin,

	} from "@/api/zhuli.js";
	import {
		getMajorInfo,
		getUpZhuvue
	} from "@/common/util/index.js";
	export default {
		props: {
			// 数据
			classesAll: {
				type: Array,
				default: [],
			},
		},
		data() {
			return {
				imageUrl: getApp().globalData.imageUrl,
				isAss: false,
				majorId: [],
			}
		},
		mounted() {
			if (getUpZhuvue()) {
				this.majorId = getUpZhuvue()
			} else {
				this.majorId = getMajorInfo()
			}
			console.log(this.classesAll, 123)
			if (this.classesAll.length > 0) {
				this.isAss = true
			} else {
				this.isAss = false
			}

		},
		methods: {
			onSrtUpMajor() {
				console.log(this.classesAll, 123)
				uni.setStorageSync('shareUrl', '/pagesA/index/index')
				uni.navigateTo({
					url: '/pagesA/setUpMajor/setUpZhu'
				})
			},
			participatin(value) {
				console.log(value)
				planJoin({
					classesId: value.classes_id,
					classesTypeId: value.classes_type_id,
				}).then((res => {
					console.log(res)
					this.$emit('plan', 1)
				}))
			},
		}
	}
</script>

<style scoped lang="scss">

	.youfanhui{
		width: 14rpx;
		height: 24rpx;
		margin-left:10rpx;
		margin-top:3rpx;
	}
	.xuanze {
		width: 297rpx;
		height: 72rpx;
		background: #FFFFFF;
		border-radius: 36rpx;
		font-size: 32rpx;
		font-weight: 800;
		color: #FF575A;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 68rpx;
	}

	.doding {
		width: 126rpx;
		height: 192rpx;
		margin-top: 61rpx;
	}

	.wuzhuangtai {
		margin: 79rpx auto 0;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.flex23 {
		display: flex;
		align-items: center;
	}

	.dengpao-text {
		font-size: 32rpx;
		font-weight: bold;
		color: #FFFFFF;
	}

	.dengpao {
		width: 32rpx;
		height: 40rpx;
		margin-right: 26rpx;
	}

	.fourLine-centet {
		font-size: 22rpx;
		font-weight: 500;
		text-decoration: line-through;
		color: #C0C0C0;
		margin-left: 15rpx;
	}

	.fourLine-letf {
		font-size: 26rpx;
		font-weight: bold;
		color: #FA642C;
	}

	.sizeText {
		font-size: 36rpx;
	}

	.fourLine-right {
		font-size: 24rpx;
		font-weight: 500;
		color: #92503C;
	}

	.fourLine {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 18rpx;
	}

	.sizeImg {
		width: 180rpx;
		height: 55rpx;
	}

	.boeder-xuxian {
		width: 100%;
		height: 1rpx;
		border: 1rpx dashed #E7DBDB;
		margin-top: 18rpx;
	}

	.scesLine {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 18rpx;
	}

	.border-yuan {
		width: 59rpx;
		height: 59rpx;
		border-radius: 50%;
		margin-right: 18rpx;
		// background-color: #000000;
	}

	.over {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box; //使用自适应布局
		-webkit-line-clamp: 1; //设置超出行数，要设置超出几行显示省略号就把这里改成几
		-webkit-box-orient: vertical;
	}

	.width1 {
		width: 500rpx;
	}

	.twoLine-text {
		ont-size: 24rpx;
		font-weight: 500;
		color: #999999;
	}

	.label {
			height: 42rpx;
		font-size: 22rpx;
		font-weight: 500;
		color: #3B7BFF;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 10rpx;
		padding: 10rpx 13rpx;
		background: rgba(231, 238, 255, 0.9);
	}

	.label2 {
		height: 42rpx;
		font-size: 22rpx;
		font-weight: 500;
		color: #FA642C;
		display: flex;
		align-items: center;
		border-radius: 10rpx;
		justify-content: center;
		padding: 10rpx 13rpx;
		background: #FFECE2;
		margin-left: 13rpx;
	}

	.kechang-text {
		width: 350rpx;
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box; //使用自适应布局
		-webkit-line-clamp: 2; //设置超出行数，要设置超出几行显示省略号就把这里改成几
		-webkit-box-orient: vertical;
	}

	.activityshifts {
		padding: 0 22rpx;
	}

	.kechang2 {
		display: flex;
		height: 84rpx;
		// align-items: center;
		justify-content: space-between;
	}

	.twoLine {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 18rpx;
	}

	.kechang {
		width: 705rpx;
		height: 340rpx;
		// background-size: 100%;
		// background-repeat: no-repeat;
		background: linear-gradient(182deg, #FFFFFF 51%, #FFF2E8 100%);
		box-shadow: 0px 2rpx 8rpx 0rpx rgba(0, 0, 0, 0.2);
		margin-top: 27rpx;
		border-radius: 30rpx;
		padding: 30rpx 30rpx 0rpx 30rpx;
	}

	.smj {
		width: 260rpx;
		height: 48rpx;
		background: #FFFFFF;
		border-radius: 24rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		font-weight: bold;
		color: #FF575A;
		margin-left: 10rpx;
	}
</style>
