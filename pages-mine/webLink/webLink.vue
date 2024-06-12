<template>
	<view>
		<web-view :src="src"></web-view>
		<view v-show='loginAss' class="back-tankuang">
			<login class="loginw" @guanbi='guanbi' />
		</view>
	</view>


</template>
<script>
	export default {
		data() {
			return {
				loginAss: getApp().globalData.loginAss,
				src: ''
			}
		},
		onLoad(opt) {
			console.log(opt)
			this.src = decodeURIComponent(opt.src)
		},
		methods: {
			guanbi(value) {
				this.loginAss = value
			},
		}
	}
</script>

<style>

</style>
