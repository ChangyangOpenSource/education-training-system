import {
	postHttp,
	getHttp,
	delHttp,
	putHttp
} from "@/uview-ui/http.js";

// 添加笔记
export function add_note(data) {
	return postHttp('/questionNote/add', data)
}
// 通过id删除笔记
export function delete_note(data) {
	return delHttp('/questionNote/delete?id=' + data)
}
// 编辑笔记
export function edit_note(data) {
	return putHttp('/questionNote/edit', data)
}
// 分页列表查询笔记
export function list_note(data) {
	return getHttp('/questionNote/list', data)
}
// 笔记id查询笔记
export function queryById_note(data) {
	return getHttp('/questionNote/queryById', data)
}
// 题干id查询笔记
export function queryBySubjectId(data) {
	return getHttp('/questionNote/queryBySubjectId', data)
}

// 原题
export function queryStudentBySubjectId(data) {
	return getHttp('/questionSubject/queryStudentBySubjectId', data)
}
