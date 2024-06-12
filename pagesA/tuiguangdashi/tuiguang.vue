<template>
	<view class="">
		<web-view id="webview" :src="url"></web-view>
		<view v-show='loginAss' class="back-tankuang">
			<login class="loginw" @guanbi='guanbi' />
		</view>
	</view>



</template>
<script>
	import {
		getToken
	} from "@/common/util/index.js";
	export default {
		data() {
			return {
				loginAss: getApp().globalData.loginAss,
				url: '',
			}
		},
		onLoad(item) {
			console.log(item)
			// this.url = item.url
			this.juedge(item)
		},
	
		methods: {
			guanbi(value) {
				this.loginAss = value
			},
			juedge(item) {
				var token = getToken()
				if (token && item.code) {
					this.url = item.url + '?token=' + token + '&code=' + item.code
				} else if (token) {
					this.url = item.url + '?token=' + token
				} else {
					this.loginAss = true
				}


				console.log(this.url)
			}
		}
	}
</script>

<style scoped lang="scss">
	#webview {
		max-width: 100%;
		max-height: 100%;
	}
</style>

