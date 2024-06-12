import {
	postHttp,
	getHttp
} from "@/uview-ui/http.js";

// 微信绑定手机号并登陆
export function decodeUserInfo(data) {
	return postHttp('/changyang/home/decodeUserInfo', data)
}
// 微信授权登陆并绑定手机号
export function wxLogin(data) {
	return postHttp('/changyang/home/wxLogin', data)
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
	return postHttp('/course/wdCourseRecord/save', data)
}


//绑定专业
export function bindinMajor(data) {
	return getHttp('/student/management/bindingMajor', data)
}

// s邀请码
export function judge(data) {
	return postHttp('/wd-distributor/judge', data)
}

// 检测登陆状态，token是否过期
export function checkLoginState(data) {
	return getHttp('/student/management/userInfo', data)
}
