import {
	postHttp,
	getHttp,
	delHttp,
	putHttp
} from "@/uview-ui/http.js";

// 添加收藏
export function add_collection(data) {
	return postHttp('/questionCollect/saveOrUpdate', data)
}
// 通过id删除收藏
export function delete_collection(data) {
	return postHttp('/questionCollect/saveOrUpdate', data)
}

// 收藏列表查询 keywords为关键子
export function list_collection(data) {
	return getHttp('/questionCollect/page', data)
}
// 智能练习并获取所有试题
export function practice_collection(data) {
	return postHttp('/questionCollect/practice', data)
}
// 查询题目传入列表id
export function queryById_collection(data) {
	return getHttp('/questionCollect/queryById', data)
}
// 收藏列表题目类型
export function type_collection(data) {
	return getHttp('/questionCollect/type', data)
}
