import {
    postHttp,
	getHttp
} from "@/uview-ui/http.js";

// 游客登录
export function touristLogin(data) {
	return postHttp('/login/touristLogin', data)
}

// 微信绑定手机号并登陆
export function decodeUserInfo(data) {
    return postHttp('/login/decodeUserInfo', data)
}
// 微信授权登陆并绑定手机号
export function wxLogin(data) {
    return postHttp('/login/wxLogin', data)
}

export function isApplet() {
	return getHttp('/sys/isApplet')
}

export function querySaleShare(data) {
   	return getHttp(`/sys/querySaleShare`, data)
}

export function bindinDealer(data) {
   	return getHttp(`/sys/bindinDealer`, data)
}

export function loginRecord(data) {
	return postHttp('/loginRecord/save', data)
}

export function courseRecord(data) {
	return postHttp('/courseRecord/saveRecord', data)
}

export function bindinMajor(data) {
	return getHttp('/student/management/bindUserMajor', data)
}

// s邀请码
export function judge(data) {
    return postHttp('/wd-distributor/judge', data)
}