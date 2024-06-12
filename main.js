
import Vue from 'vue'
import App from './App'
import store from './store'
import MinCache from './common/util/MinCache.js'
import tip from './common/util/tip.js'
import configService from './common/service/config.service.js'
import router from './common/router'

import {
	RouterMount
} from './plugin/uni-simple-router/index.js'
import baseConfig from '@/baseConfig.js';
// 注册缓存器
Vue.use(MinCache, {
	timeout: 6
})


// 引入全局uniapp框架方法配置文件
import '@/common/uniTools.global.js'


// store
Vue.prototype.$store = store;
// tip
Vue.prototype.$tip = tip;
// config
Vue.prototype.$config = configService;
// 自定义全局公众号h5端appid
Vue.prototype.$appid = baseConfig.h5Appid;

// 金额补零
Vue.filter('amounts', function(val) {
	if (val) {
		return val.toFixed(2)
	} else {
		return '0.00'
	}
})

// #ifdef H5
// uniapp只有h5端能正常使用vconsole
if (baseConfig.vconsole) {
	// 如果需要导入文件，则执行相应操作
	import('@/common/vconsole.js').then(function() {
		console.log("成功导入vconsole文件");
	}).catch(function(error) {
		console.error("无法导入vconsole文件 => ", error);
	});
} else {
	// 不需要导入文件时的处理逻辑
	console.log("不需要导入vconsole文件");
}
// #endif

// request请求
import {
	http
} from '@/common/service/service.js'
Vue.prototype.$http = http

import login from './pages/login/login.vue'
Vue.component('login', login)
import mobilePhone from './pages/mobilePhone/mobilePhone.vue'
Vue.component('mobilePhone', mobilePhone)

import top_nav_return_green from '@/components/top_nav_return_green.vue'
Vue.component('top_nav_return_green', top_nav_return_green)

// import top_nav_return from '@/components/top_nav_return.vue'
// Vue.component('top_nav_return', top_nav_return)

// 自定义底部导航栏
import Tabbar from '@/components/tabbar.vue'
Vue.component('Tabbar', Tabbar)

import cuCustom from './plugin/colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)

import uView from "uview-ui";
Vue.use(uView);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	MinCache,
	...App
})
//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app, '#app');
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
