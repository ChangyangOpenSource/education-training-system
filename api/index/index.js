import {
	postHttp,
	getHttp
} from "@/uview-ui/http.js";

// 查询用户信息
export function userInfo(data) {
	return getHttp('/student/management/userInfo')
}
