import {
    postHttp,
	getHttp
} from "@/uview-ui/http.js";

// 首页，智能组题
export function findBySmartList(data) {
    return getHttp('/cySubjectSmart/cySubjectSmart/findBySmartList', data)
}

// 首页，智能组题页
export function smartTest(data) {
    return postHttp('/subjectSmart/smartTest', data)
}


// 首页，智能组题页
export function smartTestLiftingTypes(data) {
    return getHttp('/subjectSmart/smartTestLiftingTypes', data)
}