// 统计报告
import {
	postHttp,
	getHttp
} from "@/uview-ui/http.js";


// 统计报告
export function obtainStatisticalReport(data) {
	return getHttp('/statisticalReport/obtainStatisticalReport', data)
}


//获取验证码
export function gzhBindPhonesms(data) {
	return postHttp('/sys/sms', data)
}



// //绑定手机号
// export function obtainStatisticalReport(data) {
// 	return getHttp('/statisticalReport/StatisticalReport/obtainStatisticalReport', data)
// }


//绑定手机号
export function gzhBindPhone(data) {
	return postHttp('/sys/gzhBindPhone', data)
}

