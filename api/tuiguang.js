import baseConfig from "@/baseConfig";
const DOMAIN_PREFIX = baseConfig.reqUrl; // 配置文件


module.exports = {
	wdDistributor: DOMAIN_PREFIX + "/wd-distributor", //  申请推广大师 ||获取推广大使首页信息
	distributor: DOMAIN_PREFIX + "/wd-distributor/distributor", //  获取团队分销员列表
	customer: DOMAIN_PREFIX + "/wd-distributor-student/customer", //  获取客户列表
	promote: DOMAIN_PREFIX + "/wd-distributor/promote", //  获取客户列表
	judge: DOMAIN_PREFIX + "/wd-distributor/judge",//判断当前用户是否已成为分销员
	statistic: DOMAIN_PREFIX + "/wd-distributor-order/team/statistic",//获取团队业绩统计
	teamList: DOMAIN_PREFIX + "/wd-distributor-order/team/list",//团队业绩列表
	list: DOMAIN_PREFIX + "/wd-distributor-order/list",//获取分销订单列表
	withdraw: DOMAIN_PREFIX + "/wd-distributor-withdraw",//提现统计get
	withdrawList: DOMAIN_PREFIX + "/wd-distributor-withdraw/list",//获取提现统计列表
	bind: DOMAIN_PREFIX + "/wd-distributor/bind",//绑定客户关系, 没有返回值
	bank: DOMAIN_PREFIX + "/wd-distributor-withdraw/bank",//绑定银行卡
	
};
