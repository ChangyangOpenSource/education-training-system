import {
    getHttp,
	postHttp
} from "@/uview-ui/http.js";



// 查询订单
export function findByRecord(data) {
    return getHttp('/wdHelpStu/wdHelpStu/findByRecord', data)
}
// 查询订单
export function queryByStudent(data) {
    return getHttp('/wdHelpStu/wdHelpStu/queryByStudent', data)
}
// // 查询订单
// export function planJoin(data) {
//     return postHttp('/wdHelpStu/wdHelpStu/planJoin', data)
// }
// 查询订单
export function shareEntity(data) {
    return getHttp('/wdHelpStu/wdHelpStu/shareEntity', data)
}


// 查询订单
export function queryByStudentAndHelpId(data) {
    return getHttp('/wdHelpStu/wdHelpStu/queryByStudentAndHelpId', data)
}



///新百万助学金计划


// 根据专业ID查询可以参与的班型
export function findByMajorId(data) {
    return getHttp('/wdHelpStu/wdHelp/findByMajorId', data)
}

// 根据专业ID查询可以参与的班型
export function findByUserId(data) {
    return getHttp('/wdHelpStu/wdHelp/findByUserId', data)
}

// 分享后查询对方活动详情
export function findByOthersActivity(data) {
    return getHttp('/wdHelpStu/wdHelp/findByOthersActivity', data)
}


// 分享后查询对方活动详情
export function findByActivity(data) {
    return getHttp('/wdHelpStu/wdHelp/findByActivity', data)
}

// 放弃或者重新参与活动
export function operationActivity(data) {
    return postHttp('/wdHelpStu/wdHelp/operationActivity', data)
}

// 用户助力(新)
export function assistance(data) {
    return postHttp('/wdHelpStu/wdHelp/assistance', data)
}

//立即使用助学金
export function immediatelyUse(data) {
    return postHttp('/wdHelpStu/wdHelp/immediatelyUse', data)
}

//立即使用助学金
export function outrightPurchase(data) {
    return postHttp('/wdHelpStu/wdHelp/outrightPurchase', data)
}


// 加入助学计划(新)
export function planJoin(data) {
    return postHttp('/wdHelpStu/wdHelp/planJoin', data)
}

