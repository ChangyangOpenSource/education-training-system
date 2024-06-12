//	关于我们

import {
	getHttp,
} from "@/uview-ui/http.js";


/**
 * 获取机构信息
 */
export function componentInfoBrief(data) {
	return getHttp('/componentInfoBrief', data)
}
