// 专业选择
import {
	postHttp,
	getHttp
} from "@/uview-ui/http.js";

// 专业科目查询
export function getMajor(data) {
	return postHttp('/major/resourcesMajor/findByMajorAll',data)
}

// 专业科目查询
export function newList(data) {
	return postHttp('/major/resourcesMajor/findByMajorGroupAll', data)
}

// 题干查询分页列表查询 chapterId和templateId为章节模板二级查询对应字段
export function SubjectList(data) {
	return getHttp('/chapter/wdQuestionChapterSubject/list', data)
}

// 题干查询分页列表查询 chapterId和templateId为章节模板二级查询对应字段
export function SubjectQueryById(data) {
	return getHttp('/chapter/wdQuestionChapterSubject/queryBySubjectId', data)
}

// 答题或修改答题(公用)
export function answerAll(data) {
	return postHttp('/questionPractice/answerAll', data)
}

// 评分(公用)
export function practiceCheck(data) {
	return postHttp('/questionSubject/check', data)
}

// 重新答题(公用)
export function practiceAgain(data) {
	return postHttp('/questionPractice/again', data)
}



// 根据条件查询记录 只查询最新7条的数据
export function findByFail(data) {
	return getHttp('/questionSubjectScoreRecord/findByFail', data)
}

//智能组卷 查看错题
export function findBySmartParam(data) {
	return getHttp('/questionbank/wdQuestionPaperSubject/findBySmartParam', data)
}



//兑换记录
export function findByUser(data) {
	return getHttp('/invitationCode/findByUser', data)
}
