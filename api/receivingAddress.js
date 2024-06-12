import {
    getHttp,
    postHttp,
    putHttp,
    delHttp
} from "@/uview-ui/http.js";

// 添加收货地址
export function addAddress(data) {
    return postHttp('/orderArea/add', data)
}

// 编辑收货地址
export function editAddress(data) {
    return putHttp('/orderArea/edit', data)
}

// 收货地址列表
export function listAddress() {
    return getHttp('/orderArea/userAreaList')
}

// 查询收货信息
export function getAddress(data) {
    return getHttp('/orderArea/queryById', data)
}

// 删除收货地址
export function delAddress(data) {
    return delHttp('/orderArea/delete?id=' + data)
}


// 获取神是去收货地址
export function findByAreaTexts(data) {
     return getHttp('/orderArea/findByAreaText', data)
}