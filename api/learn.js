// 我的
import {
	getHttp,
	putHttp,
	uploadHttp,
	postHttp
} from "@/uview-ui/http.js";


// ali视频vid换凭证   获取阿里云视频播放凭证- tokenNo
export function getPolyvToken(data) {
	return getHttp('/polyv/findByToken', data)
}

// ali视频vid换凭证   获取阿里云视频播放凭证- tokenNo
export function findByPlayInfo(data) {
	return getHttp('/aliVideo/findByPlayInfo', data)
}

// ali视频vid换凭证   获取阿里云视频播放凭证- tokenNo
export function findByPlayAuth(data) {
	return getHttp('/aliVideo/findByPlayAuth', data)
}

// 查询我的课程信息
export function getMyCourse() {
	return getHttp('/courseapi/myCourse')
}

// 查询我的课程详细信息
export function getCourseDetail(data) {
	return getHttp(`/classes/queryCourseDetails?classid=${data.classId}&courseid=${data.courseId}&uid=${data.uid}`)
}


// 根据单元id获取视频id
export function getVidByUnitId(data) {
	return getHttp('/courseapi/getVidByUnitId', data)
}

// 查询我的班级下当前学习章节
export function getCurrentChapter(classid) {
	return getHttp(`/courseapi/queryCurrentChapter?classid=${classid}`)
}

// 查询我的班级下在线计划
export function getLivePlay(classid) {
	return getHttp(`/courseapi/queryLivePlay?classid=${classid}`)
}

//添加学习
export function addLearn(data) {
	return postHttp(`/lastTimeLearn/addLearn`, data)
}

// 添加视频单元播放次数
export function updateCoursePlayCount(id) {
	return getHttp(`/courseUnit/updateCoursePlayCount?id=${id}`)
}

// 查询视频课件
export function queryMaterial(id) {
	return getHttp(`/courseUnit/queryMaterial?id=${id}`)
}


// 根据视频单元查询是否购买
export function getCourseIsNoBuy(id) {
	return getHttp(`/courseUnit/getCourseIsNoBuy?unit_id=${id}`)
}

// 学习-我的课程-系列课程(购买过的班级)
export function findBySeriesOfCourses(data) {
	return getHttp('/classesStudents/findBySeriesOfCourses', data)
}

// 学习-直播计划-日历
export function findByPeepStreamCalendar(data) {
	return getHttp('/classesStudents/findByPeepStreamCalendar', data)
}


// 学习-直播计划-根据日期查询直播
export function findByPeepStreamLiveCourse(data) {
	return getHttp('/classesStudents/findByPeepStreamLiveCourse', data)
}


// 根据视频单元查询是否购买

// // 编辑我的信息
// export function mineEdit(data) {
//     return putHttp('/student/management/edit', data)
// }

// // 头像上传
// export function upload(data) {
//     return uploadHttp('/student/management/upload', data)
// }
