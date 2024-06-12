// 环境配置 
import envConfig from '@/envConfig.js';
const env = envConfig.env;
if (!env) {
	console.error("envConfig环境配置缺失");
}

const commonConfig = {
	myself_vx_mp_appid: 'wx54c9ba71215b5d72', // 自己的微信小程序appid
	myself_vx_h5_appid: 'wx4be230789b0353f4', // 自己的微信公众号appid
}


// 项目基础配置
const baseConfigs = {
	// 开发环境配置
	development: {
		reqUrl: "http://127.0.0.1:3000/api", // 接口地址
		vconsole: true, // 是否显示vconsole
		h5Appid: 'wx4be230789b0353f4', // 公众号appid
		myself_vx_mp_appid: commonConfig.myself_vx_mp_appid, // 自己的微信小程序appid
		myself_vx_h5_appid: commonConfig.myself_vx_h5_appid, // 自己的微信公众号appid
	},
	// 测试环境配置
	test: {
		reqUrl: "http://127.0.0.1:3000/api", // 接口地址
		vconsole: true, // 是否显示vconsole
		h5Appid: 'wx4be230789b0353f4', // 公众号appid
		myself_vx_mp_appid: commonConfig.myself_vx_mp_appid, // 自己的微信小程序appid
		myself_vx_h5_appid: commonConfig.myself_vx_h5_appid, // 自己的微信公众号appid
	},
	// 生产环境配置
	production: {
		reqUrl: "http://127.0.0.1:3000/api", // 接口地址
		vconsole: false, // 是否显示vconsole
		h5Appid: 'wx4be230789b0353f4', // 公众号appid
		myself_vx_mp_appid: commonConfig.myself_vx_mp_appid, // 自己的微信小程序appid
		myself_vx_h5_appid: commonConfig.myself_vx_h5_appid, // 自己的微信公众号appid
	},
	// 其他环境……
}



const baseConfig = baseConfigs[env];
export default baseConfig;


// 其他文件导入
// import baseConfig from '@/baseConfig.js';