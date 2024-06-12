// 	反馈页

import {
	postHttp,
} from "@/uview-ui/http.js";


// 提交反馈信息
export function suggestionFeedback(data) {
	return postHttp('/feedback/operateFeedback/saveEntity',data)
}
