// 班级详情接口
import {
    getHttp
} from "@/uview-ui/http.js";

// 班级资料查询
export function getClassesBooks(data) {
    return getHttp('/courseapi/classesBooks', data)
}

// 班级课程查询
export function getClassesCourse(data) {
    return getHttp('/classes/classesCourse', data)
}

// 班级详情查询
export function getClassesDetails(data) {
    return getHttp('/classes/classesDetails', data)
}


// 普维查询
export function queryCourseDetailsCourseOrSubNew(data) {
    return getHttp('/classesStudents/queryCourseDetailsCourseOrSubNew', data)
}



// 学习-我的课程-系列课程详情(购买过的班级)
export function findBySeriesOfCoursesDetail(data) {
    return getHttp('/classesStudents/findBySeriesOfCoursesDetail', data)
}

// 学习-我的课程-模块课程详情(购买过的课程)courseType 0视频 1直播 2普为
export function findByModuleOfCoursesDetail(data) {
    return getHttp('/api/myStudent/findByModuleOfCoursesDetail', data)
}