
<template>
	<view class=''>
		<!-- <ppt /> -->
		<!-- <plv :apiId="apiId" :apiSecret="apiSecret" :options="options"></plv>
		<polyv></polyv> -->
		<live-player @statechange="statechange" mode="live" id="polyvLiveVideo" class="vp-v" :src="video.src" autoplay></live-player>
	</view>


</template><script>
	// import plv from '../polyv-sdk/index';
	// import polyv from '../polyv-sdk/components/polyv/polyv';
	// import ppt from '../polyv-sdk/components/ppt/ppt';


	// import plv from '../polyv-sdk/index';

	import polyvLive from '@/common/util/polyvlive.js';

	export default {
		data() {
			//这里存放数据
			return {
				options: {
					channelId: '2558288', // 频道ID
					openId: 'Dreamer', // 用户openId
					userName: 'Dreamer', // 用户名
					userId: '3116002084',
					avatarUrl: 'http://livestatic.videocc.net/assets/wimages/missing_face.png', // 用户头像
					forceVideo: true
				},
				// 填写在线后台的 AppID 和 AppSecret
				apiId: 'fxo0udf44v',
				apiSecret: 'f6b9b6020ff2479f84641c4412809f2e',
				video: {
					src: '',
					poster: ''
				}
			};
		},
		computed: {},
		watch: {},
		// 过滤器
		filters: {},
		onReady() {
			var liveUid = "b7130a8d0b";
			var liveVid = "2560973";
			var liveVideoContext = wx.createLivePlayerContext('polyvLiveVideo');
			
			polyvLive.getVideo({
				uid: liveUid,
				vid: liveVid,
				videoContext: liveVideoContext,
				success: (videoInfo) => {
					// set video src and poster
					this.setPlayerSrc(videoInfo);
				},
				error: (res) => {
					console.log(res.error);
				},
				onStartLive: () => {
					// set latest video src
					this.setNewPlayerSrc();
				}
			});
		},
		mounted() {
			


			// const options = {
			// 	channelId: 2475411, // 频道ID
			// 	openId: '', // 用户openId
			// 	userName: 'nong', // 用户名
			// 	appId: 'fxo0udf44v',
			// 	appSecret: 'f6b9b6020ff2479f84641c4412809f2e',
			// };
			// plv.init(options).then(data => {

			// }).catch(err => {
			// 	// 异常处理
			// 	console.log(err, '222---');
			// });
		},
		beforeDestroy() {
			plv.destroy();

		},
		//方法集合
		methods: {
			// 监听当前在线视频流状态
			onStateChange(e) {
			  console.log('stateChnage:', e);
			},
			setNewPlayerSrc() {
				polyvLive.getNewVideo((videoInfo) => {
					this.setPlayerSrc(videoInfo);
				});
			},
			setPlayerSrc(videoInfo) {
				console.log(videoInfo,'999999999')
				this.video = {
					src: videoInfo.flvSrc,
					poster: videoInfo.poster
				}
			},



			// 播放器错误
			handlePolyvError(e) {
				const err = e.detail;
				if (err.errorCode >= 30000 && err.errorCode < 40000) {
					wx.showToast({
						title: '播放器' + err.msg,
						icon: 'none',
						duration: 2000
					});
				}
			},
			// 用户被踢出
			handleUserBanned() {
				wx.showModal({
					title: '温馨提示',
					content: '您未被授权观看本在线',
					showCancel: false,
					complete: () => {

					}
				});
			},
		},
	}
</script>
<style lang='scss' scoped>
	.chucuno {
		position: absolute;
		top: 50%;
		margin-top: -150rpx;
		z-index: 99999;
		left: 50%;
		margin-left: -325rpx;
	}

.back-tankuang {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 99999;
		height: 100%;
		background: rgba(51, 51, 51, 0.5);
	}</style>
