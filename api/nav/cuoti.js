import {
	postHttp,
	getHttp,
	delHttp,
	putHttp
} from "@/uview-ui/http.js";

// 移除错题
export function removeQuestionError(data) {
	return getHttp('/questionPractice/removeQuestionError', data)
}

// 查询错题题干
export function dieError(data) {
	return getHttp('/questionbank/practice/dieError', data)
}

// 分页查询错题列表
export function listError(data) {
	return getHttp('/questionPractice/page', data)
}

// \api\做题\通过id查询
// export function oneError(data) {
// 	return getHttp('/questionApi/questionbank/practice/queryById', data)
// }

// 获取错题类型
export function findByType(data) {
	return getHttp('/questionPractice/type', data)
}
