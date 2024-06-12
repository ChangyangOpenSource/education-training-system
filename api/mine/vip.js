//	vip 邀请码激活页

import {
	putHttp
} from "@/uview-ui/http.js";

// 提交激活码
export function invitationCode(data) {
	return putHttp('/invitationCode/'+data)
}

