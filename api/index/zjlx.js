// 章节练习相关接口
import {
	getHttp,
	postHttp
} from "@/uview-ui/http.js";

// 题库下的章节练习一级查询
export function get_zjlx_list(data) {
	return getHttp('/questionChapter/findByParentList', data)
}



// 章节练习二级查询 id为一级查询列表id
export function get_zjlx_listById(data) {
	return getHttp('/questionChapter/findByChildList', data)
}

// 游客登录
export function touristLogin(data) {
	return postHttp('/login/touristLogin', data)
}