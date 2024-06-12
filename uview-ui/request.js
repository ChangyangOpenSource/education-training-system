import {
	getToken
} from '@/common/util/index.js'
const app = getApp()
// console.log(app.globalData)


const request = (url, data, method = "GET") => {
	return new Promise((resolve, reject) => {
		let header = {
			"Content-Type": "application/json",
		};
		// const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTI2OTAyMDMsInVzZXJuYW1lIjoiMTczOTU5MDM4NTIifQ.EfNW2KIj76s7RUNjioMjOoF1yken-tB9IaPdNvDtKW4';
		const token = getToken();
		if (token) {
			header["X-Access-Token"] = token;
		}
		uni.request({
			url: url,
			data: data,
			method: method,
			header: header,
			success: (res) => {
				console.log(1)
				// console.log(res)
				if (res.statusCode == 200) {
					if (res.data.code === 200) {
						resolve(res.data);
					} else {
						if (res.data.code === 1003 || res.data.code === 1005) {
							// "您还未登录或登录失效，请重新登录！"

							uni.showToast({
								title: '登录失效，请重新登录',
								icon: 'none'
							});
							// store.commit('loginOut');
							uni.clearStorageSync()
							setTimeout(() => {
								const pages = getCurrentPages().pop(); //获取页面栈
								console.log(pages, 141414)
								pages.$vm.loginAss = true; //前一个页面方法
								// getApp().globalData.loginAss = true
								// uni.reLaunch({
								// 	url: '/pages/login/login'
								// })
							}, 500)


						} else {
							uni.showToast({
								title: res.message,
								icon: 'none'
							});
						}
						resolve(res.data);
					}
				} else {
					reject(res);
				}
			},
			fail: (res) => {
				reject(res);
			},
		});
	});
};
//不带token接口请求，首页
const request1 = (url, data, method = "GET") => {
	return new Promise((resolve, reject) => {
		let header = {
			"Content-Type": "application/json",
			tenant: "MDAwMA==",
		};
		uni.request({
			url: url,
			data: data,
			method: method,
			header: header,
			success: (res) => {
				if (res.data.code === "200" || data.code === "") {
					resolve(res.data);
				} else {
					reject(res);
				}
			},
			fail: (res) => {
				reject(res);
			},
		});
	});
};

module.exports = {
	request: request,
	request1: request1,
};
