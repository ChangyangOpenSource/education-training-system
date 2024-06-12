// 对uView的Request请求进行统一配置

// 引入uView的Request方法
import http from '@/uview-ui/libs/request';
import {
	getToken,
	getTouristToken
} from '@/common/util/index.js'

import baseConfig from '@/baseConfig.js';
const BASE_URL = baseConfig.reqUrl; // 配置文件

http.setConfig({
	header: {
		// "Accept": "application/json;charset=UTF-8"
	},
	baseUrl: BASE_URL,
	// showLoading: false, // 是否显示请求中的loading
	withCredentials: true,
	// loadingText: '正在加载'
});

// 请求拦截部分，如配置，每次请求前都会执行
http.interceptor.request = (config) => {
	// #ifdef MP-WEIXIN
	config.header['appId'] = uni.getAccountInfoSync().miniProgram.appId; // 小程序appid
	config.header['clientType'] = 'MP'; // 可用值:MP,OA,PC
	// #endif
	// #ifdef H5
	config.header['appId'] = baseConfig.h5Appid; // 公众号appid
	config.header['clientType'] = 'OA'; // 可用值:MP,OA,PC
	// #endif
	if (getToken()) {
		config.header['X-Access-Token'] = getToken();
	} else if (getTouristToken()) {
		config.header['X-Access-Token'] = getTouristToken();
	} else {
		delete config.header['X-Access-Token'];
	}
	return config;
};

// 响应拦截，如配置，每次请求结束都会执行本方法
http.interceptor.response = (res) => {
	// 1006 代表账号未注册，会返回sessionKey
	// console.log(111,res) //  || res.data.code == 401
	if (res.code === 200) {
		return res;
	} else {
		if (res.code === 1003 || res.code === 1005 || res.code === 401) {
			// "您还未登录或登录失效，请重新登录！"
			uni.showToast({
				title: '登录失效，请重新登录',
				icon: 'none'
			});
			uni.clearStorageSync()
			setTimeout(() => {
				const pages = getCurrentPages().pop(); //获取页面栈
				// console.log(pages)
				if (pages.route == 'pages/webView1/webView') {
					uni.reLaunch({
						url: `${pages.$page.fullPath}`
					})
				}
				pages.$vm.loginAss = true; //前一个页面方法
			}, 500)
		} else {
			uni.showToast({
				title: res.message,
				icon: 'none'
			});
		}
		return Promise.reject(res);
	}
};

export const postHttp = (url, data) => {
	return http.post(url, data);
};

export const getHttp = (url, data) => {
	return http.get(url, data);
};

export const putHttp = (url, data) => {
	return http.put(url, data);
};

export const delHttp = (url, data) => {
	return http.delete(url, data);
};
// 上传文件
export const uploadHttp = (url, data) => {
	return http.post(url, data, {
		'content-type': 'multipart/form-data'
	});
};