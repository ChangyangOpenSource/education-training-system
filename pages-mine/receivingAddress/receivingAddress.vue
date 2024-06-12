<template>
	<view class="bg">
		<!-- 顶部 -->
		<!-- 主体部分 -->
		<view class="address-list" v-if="list && list.length > 0">
			<!-- <view class="d-card"><text class="tips">长按地址删除</text></view> -->

			<!-- 地址列表 -->
			<radio-group width="100%" class="radio-grounpx" >

				<!-- 地址信息 -->
				<view class="radiox" v-for="item in list" :key="item.id" @click="radioGroupChange(item)" @longpress="logoTime(item)">
					<image v-if="item.isdefault==1" :src="imageUrl+'/xing/xz.png'"  class='sizexz'  />
					<image v-else :src="imageUrl+'/xing/xz1.png'"  class='sizexz'  />
					<view class="u--label">
						<view style="margin: 0 20rpx;width: 100%;">
							<view class="addr">
								<view class="" style="display: flex;justify-content:space-between;
								align-items: center;">
									<view class="">
										<text>{{ item.name }}</text>
										<text style="padding-left: 10rpx">{{
										  item.phone | phoneRep
										}}</text>
									</view>
									<view class="binaji" @click.stop.native="
                  goto(
                    '/pages-mine/receivingAddress/editAddress/editAddress?id=' +
                      item.id
                  )
                ">
										编辑
									</view>
								</view>
								<text class="default-text" v-if="value == '' && item.isdefault == '0'">默认</text>
								<!-- ======= -->
								<text class="default-text" v-if="item.id == value">默认</text>
							</view>
							<view class="addr-info">{{ item.address }}</view>
						</view>
						<view>
							<!-- <u-icon name="edit-pen" color="#000" size="44" ></u-icon> -->
						</view>
					</view>
				</view>

			</radio-group>
		</view>
		<view v-else class="mask">
			<image :src="imageUrl+'/xing/zwsj.png'"  mode=""></image>
			<view>请添加收货地址</view>
		</view>

		<!-- 弹出框 -->
		<u-modal v-model="show" :show-cancel-button="true" confirm-text="删除" confirm-color="#f51212" title="提示"
			@cancel="cancel" @confirm="confirm">
			<view class="u-update-content">
				<view class="del-address-tips">确认删除该收货地址吗?</view>
			</view>
		</u-modal>
		<!-- 新增地址 -->
		<view class="newAddr" style="display: flex;align-items: center;">
			<button class="btn2" @click="wxAddFn" v-if="dingISass">
				<image :src="imageUrl+'/tabBarIcon/WXS.png'"  class='img-ASize'  />
				微信导入
			</button>
			<button :class="{btn:dingISass,btn3:!dingISass}" @click="goto('/pages-mine/receivingAddress/editAddress/editAddress')">
				新增地址
			</button>
		</view>
		<view v-show='loginAss' class="back-tankuang">
			<login class="loginw" @guanbi='guanbi' />
		</view>
	</view>


</template>
<script>
	import {
		listAddress,
		delAddress,
		editAddress,
	} from "@/api/receivingAddress.js";
	export default {
		data() {
			return {
				loginAss: getApp().globalData.loginAss,
				imageUrl: getApp().globalData.imageUrl,
				color: '#FF6109',
				list: [],
				value: "",
				timeOut: null,
				show: false,
				type: false,
				willDelAddressInfo: {},
				dingISass:true
			};
		},
		filters: {
			phoneRep(val) {
				if (val) {
					const newphone1 = val.slice(0, 3);
					const newphone2 = val.slice(7);
					return newphone1 + "****" + newphone2;
				} else {
					return "";
				}
			},
		},
		mounted() {
			
			console.log(this.type, 1)
			this.getAll();
		},
		onShow() {
			if(uni.getStorageSync("ipfit")==1){
				this.dingISass=false
			}else if(uni.getStorageSync("ipfit")==2){
				this.dingISass=true
			}
			console.log(this.type, 2)
			if (this.type == true) {
				this.getAll();
			}
		},
		methods: {
			// 微信导入
			wxAddFn() {
				console.log('微信导入地址');
				let self = this;
				uni.chooseAddress({
					success(res) {
						console.log(res, "fsfsdfs");

						uni.showLoading({
							mask: true,
							title: "导入中...",
						});
						setTimeout(() => {
							uni.hideLoading();
							uni.navigateTo({
								url: "/pages-mine/receivingAddress/editAddress/editAddress?wxAddressData=" +
									JSON.stringify(res),
							});
						}, 500);
					},
				});
			},
			guanbi(value) {
				this.loginAss = value
			},
			cancel() {
				console.log("取消");
			},
			confirm() {
				console.log("确定");
				this.delAddressFun(this.willDelAddressInfo);
			},
			// 长按屏幕删除
			logoTime(data) {
				console.log(data);
				this.willDelAddressInfo = data;
				this.show = true;
			},
			goto(url) {
				uni.navigateTo({
					url,
				});
			},

			// 点击设为默认地址
			async radioGroupChange(e) {
				console.log(e)
				const that = this;
				// clearTimeout(that.timeOut);
				const t = e
				that.value = t.id;
				// 定个时，防止用户疯狂切换默认地址
				// that.timeOut = setTimeout(async function () {
				const form = {
					name: t.name, //姓名
					phone: t.phone, //电话
					area: t.area!=null?t.area.split(",")[2]:'', //地区
					id: t.id,
					address: t.address, //详细地址
					code: t.code, //邮政编码
					isdefault: "0", //设为默认地址!!
				};
				uni.showLoading({
					mask: true
				})
				const res = await editAddress(form);
				console.log(res);
				that.getAll();
				// }, 800);
			},
			// 删除地址
			async delAddressFun(data) {
				const res = await delAddress(data.id);
				console.log(res);
				this.getAll();
			},
			// 收货地址列表
			async getAll() {
				const res = await listAddress();
				console.log(res);
				this.list = res.result;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.bg{
		background: #fafafa;
		min-height: 100%;
	}
	.sizexz{
		width: 37rpx;
		height: 37rpx;
	}
	.binaji {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: $uni-primary;
	}

	/deep/.uni-radio-input-checked {
		background-color: #248067 !important;
	}

	.img-ASize {
		width: 45rpx;
		height: 37rpx;
		margin-right: 18rpx;
	}

	.mask {
		width: 100%;
		padding-top: 60rpx;

		image {
			width: 349rpx;
			height: 312rpx;
			display: block;
			margin: 0 auto 20rpx;
		}

		view {
			width: 100%;
			text-align: center;
			font-size: 26rpx;
			color: #999999;
		}
	}

	.d-card {
		box-sizing: border-box;
		width: 100%;
		padding: 23rpx 20rpx;
		border-radius: 16rpx;
		background-color: #fff;
		margin-bottom: 20rpx;
	}

	.tips {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #666666;
	}

	.address-list {
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx 30rpx 0;
		display: inline-block;
		width: 100%;
		margin-bottom: 120rpx;

		// 单选框
		/* #ifndef MP-WEIXIN */
		uni-radio::before,
		uni-checkbox::before {
			left: 28rpx;
			font-weight: bold;
		}

		/* #endif */
		/* #ifdef MP-WEIXIN*/
		radio::before,
		checkbox::before {
			left: 32rpx;
			font-weight: bold;
		}

		/* #endif */
		.radio-grounpx {
			width: 100%;

			.radiox {
				position: relative;
				width: 100%;
				height: 200rpx;
				background: #ffffff;
				border-radius: 16rpx;
				margin-bottom: 20rpx;
				box-sizing: border-box;
				padding: 0 20rpx;
				display: flex;
				align-items: center;
			}

			// 地址信息
			.u--label {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 590rpx;

				.addr {
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #333333;
					margin-bottom: 26rpx;

					.default-text {
						padding: 5rpx 12rpx;
						font-size: 25rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #ffffff;
						width: 70rpx;
						height: 40rpx;
						border-radius: 6rpx;
						background-image: url($fileBaseUrl + '/xing/dizhi.png');
						background-size: 100%;
						background-repeat: no-repeat;
						position: absolute;
						left: -5rpx;
						top: -5rpx;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}

				.addr-info {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #666666;
				}
			}
		}
	}

	.del-address-tips {
		text-align: center;
		margin: 30rpx 0;
	}

	// 新增地址
	.newAddr {
		box-sizing: border-box;
		padding: 0 30rpx;
		margin-bottom: 30rpx;
		position: fixed;
		bottom: 0;
		width: 100%;

		.btn {
			width: 320rpx;
			height: 80rpx;
			background-color: rgba(241, 89, 42, 1);
			color: #fff;
			border-radius: 50rpx;
			display: flex;
			font-size: 32rpx;
			align-items: center;
			justify-content: center;

			&::after {
				border: none;
				border-radius: 0;
			}
		}
		
		.btn3{
			width: 500rpx;
			height: 80rpx;
			background-color: rgba(241, 89, 42, 1);
			color: #fff;
			border-radius: 50rpx;
			display: flex;
			font-size: 32rpx;
			align-items: center;
			justify-content: center;
			margin: 0 auto;
			
			&::after {
				border: none;
				border-radius: 0;
			}
		}


		.btn2 {
			width: 320rpx;
			height: 80rpx;
			background-color: #fff;
			color: #000;
			border-radius: 50rpx;
			display: flex;
			align-items: center;
			font-size: 32rpx;
			justify-content: center;
			margin-right: 50rpx;
			border: 2rpx solid #DCDCDC;
			;

			&::after {
				border: none;
				border-radius: 0;
			}
		}

		// .button-hover {
		// 	background-color: #1c8dff;
		// }
	}
</style>
