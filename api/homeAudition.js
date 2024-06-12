// 首页接口
import {
	getHttp,
	postHttp
} from "@/uview-ui/http.js";

// 根据直播频道获取直播地址
export function findDistributionl(data) {
	return getHttp('/student/management/findDistribution',data)
}

// 根据直播频道获取直播地址
export function getLiveUrl(data) {
	return getHttp('/courseapi/getLiveUrl?channelId=' + data.channelId + '&userid=' + data.userid)
}

// 首页banner查询
export function getBanner(data) {
	return getHttp('/banner/operateBanner/findByBanner', data)
}

// // 根据专业查询直播中
// export function getLiveing(data) {
// 	return getHttp('/courseapi/findByMajorLive', data)
// }

// 获取试听在线列表
export function getAuditionLive(data) {
	return getHttp('/courseapi/auditionLivePageList', data)
}

// // 获取试听课程列表
export function getAuditionCourse(data) {
	return getHttp('/courseapi/auditionCoursePageList', data)
}

// 获取试听课程列表
export function findByDemoLesson(data) {
	return getHttp('/courseapi/findByDemoLesson', data)
}

// 获取热销课程列表
export function getBestSellerCoursePageList(data) {
	return getHttp('/classes/bestSellerCoursePageList', data)
}

// 获取系列课程列表
export function getSeriesCoursePageList(data) {
	return getHttp('/classes/seriesCoursePageList', data)
}


// 获取高端面授列表
export function getFaceCoursePageList(data) {
	return getHttp('/courseapi/faceCoursePageList', data)
}

// 面授班级详情查询
export function getFaceClassesDetails(data) {
	return getHttp('/courseapi/faceClassesDetails', data)
}

// 面授班级详情查询新
export function getfaceClassesDetailsNew(data) {
	return getHttp('/courseapi/faceClassesDetailsNew', data)
}

//获取小城序模板
export function getTemplateId(data) {
	return getHttp('/xcxTemplate/wdXcxTemplate/findByType', data)
}

//预约在线
export function reserveLive(data) {
	return postHttp('/push/wdPushVideo/add', data)
}

//直播预告
export function findByLivePreview(data) {
	return getHttp('/courseapi/findByLivePreview', data)
}



//分享
export function shareUnlock(data) {
	return postHttp('/student/lock/shareUnlock', data)
}

//助学分享
export function launchHelp(data) {
	return getHttp('/wdHelpStu/wdHelpStu/launchHelp', data)
}

//添加微信分享
export function keyUnlock(data) {
	return postHttp('/student/lock/keyUnlock', data)
}

//首页-直播预告未购买逻辑
export function findByNotBuyClasses(data) {
	return getHttp('/courseapi/findByNotBuyClasses', data)
}

//
export function isHomeTop(data) {
	return getHttp('/sys/isHomeTop', data)
}



// s邀请码
export function judge(data) {
	return postHttp('/wd-distributor/judge', data)
}


// 小程序媒体资源
export function findByMedial(data) {
	return getHttp('/wdMediaResources/mediaResources/findByMedial', data)
}


// 课程模块分页列表查询
export function queryCoursePageList(data) {
	return getHttp('/courseapi/queryCoursePageList', data)
}


// 推荐课程模块分页列表查询
export function queryBestSellerModuleCoursePageList(data) {
	return getHttp('/courseapi/queryBestSellerModuleCoursePageList', data)
}

// -分页列表查询图书
export function wdBookList(data) {
	return getHttp('/book/wdBook/list', data)
}

// -获取学习阶段列表
export function getLearningPhaseList(data) {
	return getHttp('/courseapi/getLearningPhaseList', data)
}

// -根据majorId查询课程标签
export function getLabelByMajorId(data) {
	return getHttp(`/wdCourseLabel/wdCourseLabel/getLabelByMajorId?majorId=${data}`)
}


// 活动列表
export function cyDistributorActivity(data) {
	return getHttp(`/distributorActivity/findByDistributorActivity`,data)
}

