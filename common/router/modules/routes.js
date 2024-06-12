const routes = [{
		path: "/pages/login/login",
		name: 'login',
		meta: {
			title: '登录',
		},
	},
	{
		path: "/pages/webView/webView",
		name: 'webView'
	},
	{
		path: "/pages/webView1/webView",
		name: 'webViews'
	},
	{
		path: "/pagesA/major/index",
		name: 'major'
	},
	{
		path: "/pagesA/fenxiang/fenxiang",
		name: 'major'
	},
	{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/index/home',
		// aliasPath:'/',  //对于h5端你必须在首页加上aliasPath并设置为/
		name: 'home',
		meta: {
			title: '首页',
		},
	},
	{
		path: '/pagesA/setUpMajor/setUpMajor',
		name: 'setUpMajor',
		meta: {
			title: '设置专业',
		},
	},
	{
		path: '/pages-mine/audit-live-list/index',
		name: 'tests',
		meta: {
			title: '试听在线',
		},
	},
	{
		path: '/pagesA/audit-course-list/index',
		name: 'testx',
		meta: {
			title: '试听课程',
		},
	},
	{
		path: '/pages-learn/courseDetail/courseDetail',
		name: 'courseDetail',
		meta: {
			title: '课程详情',
		},
	},
	{
		path: '/pagesA/curriculumDetail/index',
		name: 'curriculumDetail',
		meta: {
			title: '班级详情',
		},
	},
	{
		path: '/pages-mine/courseOrder/courseOrder',
		name: 'goCourseOrder',
		meta: {
			title: '课程订单',
		},
	},
	{
		path: '/pagesA/payOrder/payOrder',
		name: 'payOrder',
		meta: {
			title: '支付订单',
		},
	},{
		path: '/pagesA/phone/phone',
		name: 'phone',
		meta: {
			title: '手机号',
		},
	},
	{
		path: '/pagesA/nav/cuoti/cuoti',
		name: 'cuoti',
		meta: {
			title: '我的错题',
		},
	},
	{
		path: '/pagesA/nav/shoucang/shoucang',
		name: 'shoucang',
		meta: {
			title: '我的收藏',
		},
	},
	{
		path: '/pagesA/nav/biji/biji',
		name: 'biji',
		meta: {
			title: '我的笔记',
		},
	},
	{
		path: '/pagesA/nav/mokao/mokao',
		name: 'mokao',
		meta: {
			title: '模考小程序导航页',
		},
	},
	{
		path: '/pagesA/nav/statisticalReport/statisticalReport',
		name: 'statisticalReport',
		meta: {
			title: '统计报告',
		},
	},
	{
		path: '/pagesA/nav/aiQuestionGroup/aiQuestionGroup',
		name: 'aiQuestionGroup',
		meta: {
			title: '智能组题',
		},
	},
	{
		path: '/pagesA/nav/lnzt/lnzt',
		name: 'lnzt',
		meta: {
			title: '历年真题',
		},
	},
	{
		path: '/pagesA/nav/bannerInfo/bannerInfo',
		name: 'bannerInfo',
		meta: {
			title: '轮播图详情',
		},
	},
	{
		path: '/pagesA/nav/bannerInfo/xiangqiang',
		name: 'bannerInfo',
		meta: {
			title: '协议',
		},
	},
	
	{
		path: '/pages/mobilePhone/mobilePhone',
		name: 'mobilePhone',
		meta: {
			title: '电话授权',
		},
	},
	{
		path: '/pagesA/orderDetail/orderDetail',
		name: 'orderDetail',
		meta: {
			title: '订单详情',
		},
	},
	{
		path: '/pagesA/graphic/graphic',
		name: 'graphic',
		meta: {
			title: '资讯详情',
		},
	},
	{
		path: '/pagesA/tuiguan/index',
		name: 'orderDetail',
		meta: {
			title: '推广大使',
		},
	},
	{
		path: '/pagesA/team/index',
		name: 'orderDetail',
		meta: {
			title: '团队业绩',
		},
	},
	{
		path: '/pagesA/shenqing/index"',
		name: 'shenqing',
		meta: {
			title: '推广大使',
		},
	},
	{
		path: '/pagesA/withdrawal/index',
		name: 'withdrawal',
		meta: {
			title: '提现',
		},
	},
	{
		path: '/pagesA/orders/index',
		name: 'orders',
		meta: {
			title: '分销订单',
		},
	},
	{
		path: '/pagesA/Distribution/index',
		name: 'Distribution',
		meta: {
			title: '分销员',
		},
	},
	{
		path: '/pagesA/bankCard/index',
		name: 'bankCard',
		meta: {
			title: '填写银行卡信息',
		},
	},
	{
		path: '/pagesA/customer/index',
		name: 'customer',
		meta: {
			title: '客户',
		},
	},
	{
		path: '/pagesA/orderDetail/orderDetail',
		name: 'orderDetail',
		meta: {
			title: '',
		},
	},
	{
		path: '/pagesA/setUpMajor/setUpZhu',
		name: 'setUpZhu',
		meta: {
			title: '专业选择',
		},
	},
	{
		path: '/pagesA/index/index',
		name: 'index',
		meta: {
			title: '温度计划',
		},
	},
	{
		path: '/pagesA/zhuxue/zhuxue',
		name: 'zhuxue',
		meta: {
			title: '温度计划',
		},
	},
	{
		path: '/pagesA/curriculumDetail/index',
		name: 'curriculumDetail',
		meta: {
			title: '班级详情',
		},
	},
	{
		path: '/pages-mine/webLink/webLink',
		name: 'webLink',
		meta: {
			title: '',
		},
	},
	{
		path: '/pagesA/tuiguangdashi/tuiguang',
		name: 'orderDetail',
		meta: {
			title: '推广大使',
		},
	},
	{
		path: '/pagesA/videoRoom/videoRoom',
		name: 'materiales',
		meta: {
			title: '订单详情',
		},
	},
	{
		path: '/pagesA/highEndCourse/highEndCourse',
		name: 'highEndCourse',
		meta: {
			title: '高端面授班级详情',
		},
	},
	{
		path: '/pagesA/setUpMajor/setUpMajor2',
		name: 'setUpMajor2',
		meta: {
			title: '专业选择',
		},
	},
	{
		path: '/pagesB/answerSheet/answerSheet',
		name: 'answerSheet',
		meta: {
			title: '答题卡',
		},
	},
	{
		path: '/pages-mine/accountBalance/accountBalance',
		name: 'accountBalance',
		meta: {
			title: '账户余额',
		},
	},
	{
		path: '/pagesA/tuijian/index',
		name: 'accountBalance',
		meta: {
			title: '推荐',
		},
	},
	{
		path: '/pages-mine/aboutUs/aboutUs',
		name: 'aboutUs',
		meta: {
			title: '关于我们',
		},
	},
	{
		path: '/pages-mine/feedback/feedback',
		name: 'feedback',
		meta: {
			title: '意见反馈',
		},
	},
	{
		path: '/pages-mine/receivingAddress/receivingAddress',
		name: 'receivingAddress',
		meta: {
			title: '收货地址',
		},
	},
	{
		path: '/pages-mine/receivingAddress/editAddress/editAddress',
		name: 'editAddress',
		meta: {
			title: '新建收货地址',
		},
	},
	{
		path: '/pages-mine/contact/contact',
		name: 'contact',
		meta: {
			title: '立即咨询',
		},
	},
	{
		path: '/pagesB/parsing/index',
		name: 'parsing',
		meta: {
			title: '答题',
		},
	},
	{
		path: '/pagesB/end/index',
		name: 'end',
		meta: {
			title: '答题结果',
		},
	},
	{
		path: '/pagesB/end/ctx',
		name: 'ctx',
		meta: {
			title: '答题结果',
		},
	},
	{
		path: '/pagesB/sheet/index',
		name: 'sheet',
		meta: {
			title: '答题卡',
		},
	},
	{
		path: '/pages-mine/vip/vip',
		name: 'vip',
	},
	{
		path: '/pages-mine/about/about',
		name: 'about',
	},
	{
		path: '/pages-mine/exchangeRecords/index',
		// name: 'vip',
	},



	


]
export default routes
