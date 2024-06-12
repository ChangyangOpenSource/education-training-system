// 设置考试时间接口
import {
    getHttp,
    postHttp
} from "@/uview-ui/http.js";

// 添加考试时间
export function addExamTime(data) {
    return postHttp('/student/examTime/wdStudentExam/add', data)
}

// 查询考试时间
export function queryExamTime(data) {
    return getHttp('/student/examTime/wdStudentExam/queryById', data)
}