/**
 * 统一注册uniapp框架全局方法
 */


import Vue from 'vue'


Vue.prototype.$uniNoIconTip = (title, duration = 2000) => {
	/**
	 * uniapp框架无图标提示框
	 * @param {String} title 提示文案
	 * @param {Number} duration 显示时长（毫秒）
	 */
	if (title) {
		uni.showToast({
			title,
			icon: 'none',
			duration
		})
	}
};

Vue.prototype.$uniSetClipboardData = (data) => {
	/**
	 * uniapp框架设置剪切板数据
	 * @param {String} data 数据
	 */
	if (data) {
		uni.setClipboardData({
			data,
			success() {
				console.log('setClipboardData success:', data);
			},
			fail(err) {
				console.error('setClipboardData err', err);
			}
		})
	}
};

Vue.prototype.$uniGetClipboardData = () => {
	/**
	 * uniapp框架获取剪切板数据
	 */
	uni.getClipboardData({
		success(data) {
			console.log('getClipboardData success:获取到的内容为：', data);
		},
		fail(err) {
			console.error('getClipboardData err', err);
		}
	});
};


Vue.prototype.$uniMakePhoneCall = (phoneNumber) => {
	/**
	 * uniapp框架拨打电话
	 * @param {Number} phoneNumber 电话号
	 */
	if (phoneNumber) {
		uni.makePhoneCall({
			phoneNumber,
			success() {
				console.log('makePhoneCall success:', data);
			},
			fail(err) {
				console.error('makePhoneCall err', err);
			}
		})
	}

};

Vue.prototype.$uniPreviewImage = (url) => {
	/**
	 * uniapp框架预览图片
	 * @param {String} url 图片（网络地址、base64）
	 */
	if (url) {
		uni.previewImage({
			urls: [url], // 需要预览的图片http链接列表
			success(res) {
				console.log("previewImage success", res);
			},
			fail(err) {
				console.error("previewImage fail", err);
			},
			complete() {}
		})
	}

};