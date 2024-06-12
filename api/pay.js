// 支付
import {
    getHttp,
    postHttp
} from "@/uview-ui/http.js";

// 生成订单
export function orderAdd(data) {
    return postHttp('/order/createOrder', data)
}

// 查询订单
export function orderQueryById(data) {
    return getHttp('/order/queryById', data)
}

// 查询微信支付详情
export function orderQueryWxPay(data) {
    return postHttp('/order/queryWxPay', data)
}

// 微信支付
export function wxPay(data) {
    return postHttp('/pay/wxPay', data)
}

// 取消订单/关闭交易
export function cancelById(data) {
    return getHttp('/order/cancelById', data)
}

// 查询课程订单
export function courseOrder(data) {
    return getHttp('/order/findByClassesStudent', data)
}




// s邀请码
export function judge(data) {
    return postHttp('/wd-distributor/judge', data)
}

// 根据视频单元查询是否购买
export function distributorId(id) {
    return postHttp(`/wd-distributor/bind/${id}`)
}