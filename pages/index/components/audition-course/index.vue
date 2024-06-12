
<template>
	<view>
		<view class="" v-if="auditionCourseArr.wdCourseLiveList||auditionCourseArr.wdCourseList">
			<HomeTitle title="试听课程" :showListen='false' type="1" @onMore="onMore"
				v-if="auditionCourseArr.wdCourseLiveList.length > 0 ||auditionCourseArr.wdCourseList.length > 0" />
			<view class="list-box"
				v-if="auditionCourseArr.wdCourseLiveList.length > 0 ||auditionCourseArr.wdCourseList.length > 0">
				<view class="felx" v-if="auditionCourseArr.wdCourseLiveList.length!=0">
				<!-- 	<view class="list-item" v-for="(item,index) in auditionCourseArr.wdCourseLiveList" :key="item.id">
						<AuditCrouseItemlive :dataInfo="item" :index='index' @onERnd='onERnd' />
					</view> -->
					<view class="list-item" v-for="item in auditionCourseArr.wdCourseList" :key="item.id">
						<AuditCrouseItem :dataInfo="item" />
					</view>
				</view>
				<view class="felx" v-else>
					<view class="list-item" v-for="item in auditionCourseArr.wdCourseList" :key="item.id">
						<AuditCrouseItem :dataInfo="item" />
					</view>
				</view>
				<view class="flosw" @click="onMore">
					<image :src="imageUrl+'/xing/xaingyou.png'" class="xiangs"  />
					<view class="shitin">
						更多试听
					</view>
				</view>

			</view>
		</view>

		<!-- <image style="width: 310rpx;height: 280rpx;margin: 40rpx auto;display: block;" v-else :src="imageUrl + '/oss/1_1632274541287.png'" mode=""></image> -->
	</view>


</template>
<script>
	import HomeTitle from "../home-title/index.vue";
	import AuditCrouseItem from "@/components/audit/audit-course-item";
	// import AuditCrouseItemlive from "@/components/audit/audit-course-live";
	import {
		findByDemoLesson
	} from "@/api/homeAudition.js";
	import {
		getMajorInfo
	} from "@/common/util/index.js";
	export default {
		components: {
			HomeTitle,
			AuditCrouseItem,
			// AuditCrouseItemlive
		},
		props: {
			type: {
				type: Number,
				default: 1,
			},
			majorId: {
				type: [Number, String],
				default: 1,
			},
		},
		data() {
			return {
				imageUrl: getApp().globalData.imageUrl,
				pageInfo: {
					majorId: this.majorId,
					pageNo: 1,
					pageSize: 2,
				},
				auditionCourseArr: [],
			};
		},

		mounted() {
			// this.getAll(this.pageInfo);
		},
		methods: {
			onERnd(data) {
				this.$emit('onERnd', data)
			},

			onMore() {
				// console.log(6666)
				uni.navigateTo({
					url: "/pagesA/audit-course-list/index",
				});
			},
			async getAll() {
				let data = {
					majorId: getMajorInfo().id
				}
				const res = await findByDemoLesson(data);
				console.log(res.result, '试听');
				this.auditionCourseArr = res.result;
				console.log(this.auditionCourseArr, '试听');
			},
		},
	};
</script>

<style scoped lang="scss">
	.flosw {
		// width: 131rpx;
		height: 342rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		padding: 0 28rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 20rpx;
	}

	.shitin {
		font-size: 19rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #3D3D3D;
		white-space: nowrap;
	}

	.xiangs {
		width: 43.5rpx;
		height: 43.52rpx;
		margin-bottom: 23.15rpx;
	}

	.felx {
		display: flex;
	}

	.list-box {
		padding: 0 30rpx;
		display: flex;
		overflow-y: scroll;

		.list-item {
			margin-right: 14rpx;
			// display: flex;

			// &:nth-child(2n) {
			// 	margin-right: 0;
			// }
		}
	}

	.chucuno {
		position: absolute;
		top: 50%;
		margin-top: -150rpx;
		z-index: 99999;
		left: 50%;
		margin-left: -325rpx;
	}

	.back-tankuang {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 99999;
		height: 100%;
		background: rgba(51, 51, 51, 0.5);
	}
</style>
