// 我的
import {
    getHttp,
    putHttp,
    postHttp
} from "@/uview-ui/http.js";

// 查询我的信息
export function mineQueryById(data) {
    return getHttp('/student/management/queryById', data)
}

// 编辑我的信息
export function mineEdit(data) {
    return putHttp('/student/management/edit', data)
}

// 查询我的订单详情
export function getOrderDetail(data) {
    return getHttp('/order/queryById', data)
}