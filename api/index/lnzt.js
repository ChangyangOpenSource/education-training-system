// 历年真题相关接口
import {
	getHttp
} from "@/uview-ui/http.js";

// 题库下的历年真题一级查询
export function get_lnzt_list(data) {
	return getHttp('/questionPaper/findByList', data)
}

// 历年真题试卷详情查询
export function get_lnzt_listById(data) {
	return getHttp('/questionbank/wdQuestionPaper/queryById', data)
}


//根据条件查询试题
export function get_lnzt_listAll(data) {
	return getHttp('/questionSubject/findListAll', data)
}


//根据试题ID查询出试题的结构
export function get_lnzt_queryBySubjectId(data) {
	return getHttp('/questionSubject/queryBySubjectId', data)
}

//根据来源(章节,历年) 查询出题型
export function get_question_type(data) {
	return getHttp('/questionSubject/answerSheetType', data)
}
