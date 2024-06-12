<template>
	<view class="bg">
		<!-- 顶部 -->
		<!-- 主体部分 -->
		<view class="address-list">
			<u-form :model="form" ref="uForm" :label-width="180" :label-style="{
          textIndent: '30rpx',
          fontWeight: '500',
          fontSize: '30rpx',
          color: '#333',
        }">
				<u-form-item label="姓名" prop="name">
					<u-input :clearable="false" v-model="form.name" placeholder="收货人姓名" />
				</u-form-item>
				<u-form-item label="电话" prop="phone">
					<u-input :clearable="false" v-model.number="form.phone" placeholder="收货人手机号" />
				</u-form-item>
				<u-form-item label="地区" prop="areaText">
					<u-input disabled :clearable="false" v-model="form.areaText" type="text" placeholder="选择省/市/区"
						@click="OnchooseLocatio" />

					<view class="postopms" style="display: flex;align-items: center;" @click="OnchooseLocatio">
						<image :src="imageUrl+'/tabBarIcon/dizhi.png'" class="img-size"  />
						<view class="img-text">
							定位
						</view>
					</view>
					<!-- <u-icon slot="right" :name="show ? 'arrow-down' : 'arrow-right'" color="#999"
						style="margin-right: 30rpx" size="30"></u-icon> -->
				</u-form-item>
				<!-- 地区选择器 -->
				<WPicker ref="picker" mode="region" :visible="show" defaultType="value" :value="defaultAreaText"
					@confirm="onConfirm" @cancel="onCancel">选择地区</WPicker>
				<u-form-item label="详细地址" prop="address">
					<textarea class="textsoe" v-model="form.address" placeholder="街道门牌、楼层房间号等信息" />
				</u-form-item>
				<u-form-item label="邮政编码" prop="code">
					<u-input :clearable="false" v-model="form.code" placeholder="邮政编码" />
				</u-form-item>
				<u-form-item label="是否设为默认地址" :label-width="280" style="margin-top: 16rpx" class="form-item">
					<u-switch slot="right" v-model="isDefault" style="margin: 10rpx 30rpx 0 10rpx"></u-switch>
				</u-form-item>
			</u-form>
		</view>
		<!-- 保存地址 -->
		<view class="newAddr">
			<button class="btn" @click="addressFun">保存地址</button>
		</view>
	</view>


</template>
<script>
	import WPicker from "@/pages-mine/components/w-picker/w-picker.vue";
	import {
		editAddress,
		addAddress,
		getAddress,
		findByAreaTexts
	} from "@/api/receivingAddress.js";
	import areaData from "@/components/w-picker/areadata/areadata.js";
	export default {
		components: {
			WPicker,
		},
		data() {
			return {
				imageUrl: getApp().globalData.imageUrl,
				show: false,
				isAdd: false,
				defaultAreaText: [],
				areaText: "",
				isDefault: false,
				form: {
					id: "",
					name: "", //姓名
					phone: "", //电话
					area: "", //地区
					address: "", //详细地址
					code: "", //邮政编码
					isdefault: "", //是否设为默认地址
					areaText: "",
				},
				//  验证规则demo
				rules: {
					name: [{
						required: true,
						message: "姓名不能为空",
						trigger: "blur",
					}, ],
					phone: [{
						required: true,
						pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
						message: "手机号码不正确",
						trigger: "blur",
					}, ],
					areaText: [{
						required: true,
						message: "地区不能为空",
						trigger: "change",
					}, ],
					address: [{
						required: true,
						message: "地址不能为空",
						trigger: "blur",
					}, ],
					code: [{
						required: true,
						message: "邮政编码不能为空",
						trigger: "blur",
					}, ],
				},
			};
		},
		onReady() {
			// 表单绑定规则
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad(props) {
			console.log(props)
			if (props.wxAddressData) {
				var wxAddress = JSON.parse(props.wxAddressData)
				this.form.name = wxAddress.userName
				this.form.phone = wxAddress.telNumber
				this.form.areaText = wxAddress.provinceName + wxAddress.cityName + wxAddress.countyName
				this.form.address = wxAddress.detailInfo
				this.form.code = wxAddress.postalCode
			}
			if (props.id) {
				this.isAdd = false;
				console.log("编辑", props);
				this.getInfo(props);
			} else {
				this.isAdd = true;
				console.log("新增");
			}
		},
		methods: {
			OnchooseLocatio() {
				let _this = this

				uni.chooseLocation({
					success: function(res) {
						console.log(res)
						if (res.address != '') {
							findByAreaTexts({
								latitude: res.latitude,
								longitude: res.longitude
							}).then((resd) => {
								if (res.address.indexOf(resd.result.addressArea) != -1) {
									_this.form.areaText = resd.result.addressArea
									var arr = res.address.replace(resd.result.addressArea, '')
									_this.form.address = arr + res.name
								} else {
									_this.form.areaText = resd.result.addressArea
									_this.form.address = resd.result.formattedAddress
								}
							})
							console.log(_this.areaText)
							console.log(arr)
							console.log(_this.form)
						}
					},

					fail: function(res) {
						console.log(res)

					}
				})
			},
			getData(value) {
				//用来处理初始化数据
				let provinces = areaData;
				let a1 = value[0];
				let a2 = value[1];
				let a3 = value[2];
				console.log(a1, a2, a3);
				let province, city, area;
				// 找省
				let provinceIndex = provinces.findIndex((v) => {
					return v["value"] == a1;
				});
				// 找市
				let citys = provinces[provinceIndex].children;
				let cityIndex = citys.findIndex((v) => {
					return v["value"] == a2;
				});
				// 找区
				let areas = citys[cityIndex].children;
				let areaIndex = areas.findIndex((v) => {
					return v["value"] == a3;
				});
				province = provinces[provinceIndex];
				city = citys[cityIndex];
				area = areas[areaIndex];
				let obj = {
					province,
					city,
					area,
				};
				console.log(this.form, 999999999)

				let newarea = JSON.parse(JSON.stringify(this.form.area))
				newarea = newarea.split(',')
				this.form.area = newarea[2]
				return {
					obj,
				};
			},
			// 编辑查询信息
			async getInfo(data) {
				const res = await getAddress(data);
				this.form.name = res.result.name;
				this.form.phone = res.result.phone;
				this.form.address = res.result.address;
				this.form.code = res.result.code;
				this.form.id = res.result.id;
				this.form.area = res.result.area;
				this.form.isdefault = res.result.isdefault;
				this.isDefault = res.result.isdefault == "0" ? true : false;
				this.defaultAreaText = res.result.area.split(",");
				// 调用方法返回省市区
				this.form.areaText = res.result.areaText
			},
			// 确定
			onConfirm(e) {
				console.log(e);
				this.form.area = e.value[e.value.length - 1];
				console.log(this.form.area, "区");
				this.areaText = `${e.obj.province.label} / ${e.obj.city.label} / ${e.obj.area.label}`;
				this.show = false;
			},
			onCancel() {
				this.show = false;
			},
			// 验证表单
			validateFun() {
				let isTrue = null;
				this.$refs.uForm.validate((valid) => {
					if (valid) {
						isTrue = true;
					} else {
						isTrue = false;
					}
				});
				return isTrue;
			},
			// 新增地址-----编辑地址
			async addressFun() {
				const bool = this.validateFun();
				if (bool) {
					if (this.isDefault) {
						this.form.isdefault = 0;
					} else {
						this.form.isdefault = 1;
					}
					// 判断是编辑地址还是新增地址
					if (this.isAdd) {
						const res = await addAddress(this.form);
						console.log(res, this.form, "新增");
					} else {
						this.form.area = ''
						console.log(this.form, "编辑");
						// this.form.area.substring(this.form.area.lastIndexOf(',') + 1, this.form.area.length)
						const res = await editAddress(this.form);
						console.log(res, this.form, "编辑");
					}
					// // 返回上一页
					// uni.redirectTo({
					// 	url: "/pages-mine/receivingAddress/receivingAddress",
					// });.
					let pages = getCurrentPages(); //获取所有页面栈实例列表
					let nowPage = pages[pages.length - 1]; //当前页页面实例
					let prevPage = pages[pages.length - 2]; //上一页页面实例
					prevPage.$vm.type = true; //修改上一页data里面的参数值
					if (this.form.isdefault == 0) {
						prevPage.$vm.value = this.form.id; //修改上一页data里面的参数值
					}
					uni.navigateBack({ //uni.navigateTo跳转的返回，默认1为返回上一级
						delta: 1
					});
				}
			},
		},
	};
</script>

<style lang="scss">
	.bg {
		background: #fafafa;
		min-height: 100%;
	}

	.textsoe {
		width: 550rpx;
		height: 100rpx;
		line-height: 50rpx;
	}

	.postopms {
		position: absolute;
		right: 30rpx;
		top: 18rpx;
	}

	.img-text {
		font-size: 30rpx;
		font-weight: 500;
		color: #333333;
		margin-left: 11rpx;
	}

	.img-size {
		width: 30rpx;
		height: 30rpx;
	}

	.address-list {
		width: 100%;
		box-sizing: border-box;
		display: inline-block;
		width: 100%;
		margin-bottom: 120rpx;

		.u-form-item {
			padding: 15rpx 0;
			border-top: 1rpx solid #e5e5e5;
			background-color: #fff;
			position: relative;
		}
	}

	// 保存地址
	.newAddr {
		box-sizing: border-box;
		padding: 0 30rpx;
		margin-bottom: 30rpx;
		position: fixed;
		bottom: 0;
		width: 100%;

		.btn {
			width: 100%;
			background: $uni-primary;
			color: #fff;
			border-radius: 50rpx;

			&::after {
				border: none;
				border-radius: 0;
			}
		}

		.button-hover {
			background-color: #1c8dff;
		}
	}

	.u-input__right-icon {
		display: none;
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
