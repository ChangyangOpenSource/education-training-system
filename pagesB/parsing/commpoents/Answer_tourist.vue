<template>
	<view class="">
		<view class="questions-title" v-if="show">
			<view class="biaoqian">
				解答题
			</view>
		</view>
		<view class="theTitle" v-if="show">
			{{lists.subNo==undefined? '':lists.subNo+'.'}}
			<mp-html class='zitso' :content="topicList.stem"> </mp-html>
		</view>
		<textarea v-if="lists.isAss==0" class="tuihus" maxlength='500' v-model="values" placeholder="填写答案" />
		<textarea v-else class="tuihus" maxlength='500' v-model="values" placeholder="填写答案" />
		<view class="" v-if="couti==2">
			<view class="ojwo">
				<view class="button32s" v-if="values.length>0" @click="onDetermine">
					提交答案
				</view>
				<view class="button321" @click="onDetermine" v-else>
					提交答案
				</view>
			</view>
		</view>
		<view class="" v-else-if="couti!=2 && showa">
			<view class="ojwo" v-if="lists.isAss==0">
				<view class="button32s" v-if="values.length>0" @click="onDetermine">
					提交答案
				</view>
				<view class="button321" @click="onDetermine" v-else>
					提交答案
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: ['topicList', 'lists', 'show', 'showa', 'couti'],
		data() {
			return {
				values: '',
				imageUrl: getApp().globalData.imageUrl,
			}
		},
		watch: {
			topicList: {
				handler(newVal, oldVal) {
					console.log(newVal)
					console.log(oldVal)
					if (newVal.liftingType == 10) {
						if (newVal.questionPaperSubjectSubordinatesList[0].questionChapterPractice) {
							this.values = newVal.questionPaperSubjectSubordinatesList[0].questionChapterPractice
								.solution
						} else {
							this.values = ''
						}
					} else if (newVal.questionChapterPractice) {
						this.values = newVal.questionChapterPractice.solution
					} else {
						this.values = ''
					}
				},
				immediate: true
			},

		},
		methods: {
			onDetermine(item, index) {

				//#ifdef H5
				var aaa = getCurrentPages();
				console.log(aaa, 'h5 解答题提交')
				var thatPage = aaa[aaa.length - 1];
				thatPage.onAnswersw(item, this.values)
				// this.$parent.$parent.$parent.$parent.onAnswersw(item, this.values)
				//#endif
				//#ifdef MP-WEIXIN
				this.$parent.onAnswersw(item, this.values)
				//#endif
			},
		}
	}
</script>

<style scoped lang='scss'>
	.ojqwde {
		white-space: nowrap;
	}

	.wenhao {
		width: 26rpx;
		height: 26rpx;
		margin-right: 10rpx;
		margin-top: 0 !important;
	}

	.yichu-img3 {
		width: 66.3rpx;
		height: 66.3rpx;
	}

	.tuihus2 {
		width: 285rpx;
		height: 66rpx;
		background: $uni-primary;
		border-radius: 33rpx;
		font-size: 28rpx;
		font-weight: bold;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tishiyu {
		text-align: center;
		font-size: 32rpx;
		font-weight: 500;
		color: #333333;
	}

	.flexzanti {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		margin-top: 54rpx;
	}

	.flexzanti2 {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 54rpx;
	}

	.tuihus {
		width: 100%;
		border: 1rpx solid $uni-primary;
		font-size: 28rpx;
		font-weight: 500;
	}

	.juxu {
		width: 180rpx;
		height: 66rpx;
		/* border: 1rpx solid #B5B5B5; */
		border-radius: 33rpx;
		font-size: 28rpx;
		font-weight: 500;
		background: $uni-primary;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.time-img {
		width: 153rpx;
		height: 159rpx;
		position: absolute;
		left: 50%;
		margin-left: -76.5rpx;
		top: -41rpx;
	}

	.time-img2 {
		width: 153rpx;
		height: 170rpx;
		position: absolute;
		left: 50%;
		margin-left: -76.5rpx;
		top: -46rpx;
	}

	.div-time {
		width: 481rpx;
		height: 399rpx;
		background-image: url($fileBaseUrl + '/xing/zanti.png');
		background-size: 100%;
		background-repeat: no-repeat;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -200rpx;
		margin-left: -240.5rpx;
		padding-top: 192rpx;
	}

	.text6 {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		display: flex;
		align-items: center;
	}

	.gotop_btn {
		width: 91rpx;
		height: 91rpx;
		position: fixed;
		z-index: 9;
		right: 50rpx;
		bottom: 150rpx;
	}

	.all-list {
		overflow: hidden;
		position: fixed;
		height: 100%;
		width: 100%;
		padding-top: 170rpx;
		padding-bottom: 180rpx;
		background-color: rgba(247, 247, 247, 1);
		min-height: 100%;
	}

	.zitso {
		max-width: 100%;
		/* font-size: 28px;
		 */
		font-size: 32px;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
	}

	.borderColor {
		border: 2rpx solid rgba(1, 145, 160, 1) !important;
		color: rgba(1, 145, 160, 1) !important;
		background-color: #FFFFFF !important;
	}

	.szieFont {
		width: 67rpx;
		height: 67rpx;
		background: #F7F7F7;
		border-radius: 50%;
		font-size: 24rpx;
		font-weight: 400;
		color: #999999;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 55rpx;
	}

	.szieFont2 {
		width: 67rpx;
		height: 67rpx;
		background: #F7F7F7;
		border-radius: 50%;
		font-size: 28rpx;
		font-weight: 400;
		color: #999999;
		display: flex;
		align-items: center;
		margin-right: 55rpx;
		justify-content: center;
	}

	.szieFont3 {
		width: 67rpx;
		height: 67rpx;
		background: #F7F7F7;
		border-radius: 50%;
		font-size: 32rpx;
		font-weight: 400;
		color: #999999;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.shopn-flex {
		display: flex;
		align-items: center;
	}

	.shopName-text {
		font-size: 30rpx;
		font-weight: bold;
		color: #333333;
		margin-right: 55rpx;
	}

	.shopName {
		width: 95%;
		height: 152rpx;
		background: #FFFFFF;
		border-radius: 50rpx 50rpx 0rpx 0rpx;
		display: flex;
		align-items: center;
		/* justify-content: space-around; */
		padding-left: 39rpx;
		box-shadow: 0px 0rpx 20rpx 0rpx rgba(0, 0, 0, 0.3000);
		position: fixed;
		bottom: 0;
	}

	.shopName2 {
		background: #FFFFFF;
		border-radius: 50rpx 50rpx 0rpx 0rpx;
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 9999;
	}

	.naozhong {
		width: 34rpx;
		height: 33rpx;
		margin-right: 17rpx;
	}

	.zantin {
		width: 32rpx;
		height: 32rpx;
		margin-left: 17rpx;
	}

	.colo2ww {
		color: rgba(250, 100, 45, 1);
	}

	.mar-bu2 {
		font-size: 28px;
		font-weight: 500;
		color: #666666;
	}

	.colose {
		width: 230rpx;
		height: 66rpx;
		border: 2rpx solid #B5B5B5;
		border-radius: 33rpx;
		font-size: 30rpx;
		font-weight: 400;
		color: #999999;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.yesAido {
		width: 230rpx;
		height: 66rpx;
		background: $uni-primary;
		border: 2rpx solid #E5E5E5;
		border-radius: 33rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 19rpx;
	}

	.flexsw {
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 44rpx;
		padding-bottom: 10rpx;
	}

	.gunbni {
		width: 30rpx;
		height: 30rpx;
		position: absolute;
		top: 25rpx;
		right: 25rpx;
	}

	.center {
		width: 600rpx;
		height: 311rpx;
		background-color: #FFFFFF;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -300rpx;
		margin-top: -150rpx;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.mar-bu {
		font-size: 30px;
		font-weight: bold;
		color: #333333;
		margin-bottom: 50rpx;
	}

	.buttonse {
		width: 250rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(75, 110, 152, 1);
		color: #FFFFFF;
		border-radius: 50rpx;
		margin-top: 15rpx;
	}

	.zhezhao {
		width: 100%;
		height: 100%;
		background-color: rgba(51, 51, 51, 0.6);
		position: fixed;
		top: 0;
		z-index: 999;
		left: 0;
	}

	.button321 {
		width: 220rpx;
		height: 74rpx;
		/* border: 1rpx solid #0191A0; */
		border-radius: 37rpx;
		background: #EEEEEE;
		font-size: 30rpx;
		/* font-family: PingFang SC; */
		font-weight: 500;
		color: #999999;
		/* margin: 66rpx auto 0; */
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.button32s {
		width: 218rpx;
		height: 74rpx;
		border: 2rpx solid #0191A0;
		border-radius: 37rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #0191A0;
		/* margin: 66rpx auto 0; */
		display: flex;
		align-items: center;
		justify-content: center;
		/* padding-right: 10rpx; */
	}

	.ojwo {
		width: 250rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 66rpx auto 0;
	}

	.daanjiexi {
		margin-top: 30rpx;
		height: auto;
		background: #FFFFFF;
		border-radius: 20rpx;
		padding: 39rpx 37rpx 58rpx 30rpx;
	}

	.flexbodsw {
		display: flex;
		margin-bottom: 25rpx;
		align-items: center;
		font-size: 30rpx;
	}

	.bodsw {
		width: 15rpx;
		height: 15rpx;
		background: #0191A0;
		border-radius: 50%;
		margin-right: 15rpx;
	}

	.textTonji {
		font-size: 26rpx;
		font-weight: bold;
		color: #333333;
		white-space: nowrap;
	}

	.colorcuo {
		display: flex;
		align-items: center;
		height: 96rpx;
		background: rgba(252, 242, 234, 0.8);
		border-radius: 20rpx 20rpx 0px 0px;
	}

	.colordui {
		display: flex;
		align-items: center;
		height: 96rpx;
		background: rgba(237, 247, 248, 0.8);
		border-radius: 20rpx 20rpx 0px 0px;
	}

	.border-sizes {
		width: 28rpx;
		height: 28rpx;
		margin-right: 15rpx;
	}

	.border-sizes2 {
		width: 32rpx;
		height: 32rpx;
		margin-right: 19rpx;
	}

	.fon-stz {
		position: absolute;
		left: 47%;
		font-size: 24rpx;
		font-weight: bold;
		top: 68rpx;
		color: #333333;
	}

	.fon-stz2 {
		position: absolute;
		left: 44%;
		font-size: 24rpx;
		font-weight: bold;
		top: 68rpx;
		color: #333333;
	}


	.masr {
		margin-left: 57rpx;
		margin-right: 40rpx;
	}

	.masr2 {
		margin-right: 63rpx;
		margin-left: 40rpx;
	}

	.flex-dibu {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.flex-dibu-img {
		width: 30rpx;
		height: 30rpx;
		margin-bottom: 18rpx;
	}

	.flex-dibu-text {
		font-size: 22rpx;
		font-weight: 500;
		color: #333333;
	}

	.moren {
		width: 53rpx;
		height: 53rpx;
		margin-right: 22rpx;
		/* padding: 22rpx; */
	}

	.moren2 {
		width: 53rpx;
		height: 53rpx;
		border: 2rpx solid #DCE0E8;
		border-radius: 50%;
		/* margin-right: 22rpx; */
	}

	.jeixise-flex {
		display: flex;
		align-items: center;
		font-size: 30px;
		font-weight: bold;
		color: #4F6A85;
	}

	.jeixise {
		height: 94rpx;
		background-color: #FFFFFF;
		/* margin-top: 170rpx; */
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 40rpx 0 45rpx;
		border-top: 1rpx solid #EEEEEE;
	}

	.yichu {
		width: 100rpx;
		height: 100rpx;
		display: flex;
		justify-content: center;
		/* align-items: center; */
		position: absolute;
		left: 50%;
		margin-left: -50rpx;
		top: -50rpx;
		background: #FFFFFF;
		border-radius: 50rpx;
	}

	.yichu2 {
		width: 100rpx;
		height: 100rpx;
	}

	.bu3 {
		width: 200rpx;
		height: 80rpx;
	}

	.yichu-img {
		width: 50rpx;
		height: 35rpx;
		/* margin-top: 16rpx; */
	}

	.yichu-img2 {
		width: 66.3rpx;
		height: 66.3rpx;
		/* margin-top: 20rpx; */
	}

	.yichu-img23 {
		width: 70rpx;
		height: 67rpx;
		/* margin-top: 18rpx; */
	}

	.button32 {
		width: 100rpx;
		height: 90rpx;

		line-height: 90rpx;
		text-align: right;
		/* justify-content: center; */
	}

	.button32-img {
		width: 39rpx;
		height: 24rpx;

	}

	.questions-right21 {
		width: 80rpx;
		height: 70rpx;
		line-height: 70rpx;
		text-align: left;
		display: flex;
		align-items: center;
		padding-right: 30rpx;
	}

	.imgw2 {
		margin-left: 71rpx;
	}

	.flex1 {
		display: flex;
	}

	.daoImage {
		width: 40rpx !important;
		height: 40rpx !important;
		margin-left: 15rpx;
	}

	.daojishi {
		/* width: 300rpx; */
		height: 70rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 34rpx;
		font-weight: bold;
		color: #333333;
		/* margin-left: 135rpx; */
	}

	.jioajuan {
		width: 240rpx;
		height: 70rpx;
		background: RGBA(1, 145, 160, 1);
		border-radius: 20rpx;
		font-size: 32px;
		font-weight: 500;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.borderBottom {
		width: 690rpx;
		height: 2rpx;
		background: #DDDDDD;
		margin: 0 auto;
	}

	.jiandan {
		width: 85rpx;
		height: 42rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(57, 208, 78, 0.2);
		border-radius: 10%;
		color: rgba(57, 208, 78, 1);
	}

	.zho {
		width: 85rpx;
		height: 42rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(241, 180, 34, 0.2);
		border-radius: 10%;
		color: rgba(241, 180, 34, 1);
	}

	.nan {
		width: 85rpx;
		height: 42rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(237, 102, 3, 0.2);
		border-radius: 10%;
		color: rgba(237, 102, 3, 1);
	}

	.kunnan {
		width: 85rpx;
		height: 42rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(237, 47, 3, 0.2);
		border-radius: 10%;
		color: rgba(237, 47, 3, 1);
	}

	.flex5 {
		display: flex;
		align-items: center;
	}

	body {
		margin: 0 auto;
		line-height: 25px;
		letter-spacing: 1px;
		color: #666666;
	}

	ul {
		margin: 0;
		width: 100%;
		border-bottom: 0;
	}

	video,
	img {
		margin-top: 10px;
	}

	.righrt {
		width: 100rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: right;
		padding-top: 20rpx;
	}

	.questions-right {
		width: 80rpx;
		height: 70rpx;
		line-height: 70rpx;
		text-align: left;
		display: flex;
		align-items: center;
		padding-left: 30rpx;
	}

	.flex1 {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}

	.flex1344 {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}

	.bordeRdoun {
		width: 92rpx;
		height: 92rpx;
		background: #F7F7F7;
		border-radius: 50%;
		font-size: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
		margin-right: 49rpx;
		margin-bottom: 43rpx;
		margin: 0rpx 25rpx 43rpx 25rpx;
	}

	.bordeRdoun2 {
		width: 92rpx;
		height: 92rpx;
		/* border: 2rpx solid #DDDDDD; */
		border-radius: 100%;
		background: rgba(1, 145, 160, 1);
		border-radius: 50%;
		font-size: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 500;
		color: #FFFFFF;
		margin-right: 49rpx;
		margin-bottom: 43rpx;
		margin: 0rpx 25rpx 43rpx 25rpx;
	}

	.bordeRdoun3 {
		width: 92rpx;
		height: 92rpx;
		/* border: 2rpx solid #DDDDDD; */
		border-radius: 100%;
		background: rgba(238, 154, 81, 1);
		border-radius: 50%;
		font-size: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 500;
		color: #FFFFFF;
		margin-right: 49rpx;
		margin-bottom: 43rpx;
		margin: 0rpx 25rpx 43rpx 25rpx;
	}

	.bordeRdoun4 {
		width: 92rpx;
		height: 92rpx;
		background: #F7F7F7;
		border-radius: 50%;
		font-size: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
		margin-right: 49rpx;
		margin-bottom: 43rpx;
		margin: 0rpx 25rpx 43rpx 25rpx;
	}

	.bordeRdoun5 {
		width: 92rpx;
		height: 92rpx;
		/* border: 2rpx solid #DDDDDD; */
		border-radius: 100%;
		background: rgba(1, 145, 160, 1);
		border-radius: 50%;
		font-size: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 500;
		color: #FFFFFF;
		margin-right: 49rpx;
		margin-bottom: 43rpx;
		margin: 0rpx 25rpx 43rpx 25rpx;
	}

	.bordeRdoun6 {
		width: 92rpx;
		height: 92rpx;
		/* border: 2rpx solid #DDDDDD; */
		border-radius: 100%;
		background: rgba(238, 154, 81, 1);
		border-radius: 50%;
		font-size: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 500;
		color: #FFFFFF;
		margin-right: 49rpx;
		margin-bottom: 43rpx;
		margin: 0rpx 25rpx 43rpx 25rpx;
	}

	.itemList {
		display: flex;
		flex-wrap: wrap;
		padding: 0 0 0 5rpx;
	}

	.titleText {
		font-size: 34px;
		font-weight: bold;
		color: #333333;
		margin-bottom: 29rpx;
		margin-left: 30rpx;
	}



	.liebieao {
		margin-top: 19rpx;
	}

	.liebieao:nth-child(1) {
		margin-top: 75rpx !important;
	}

	.border1text {
		font-size: 26px;
		font-weight: 500;
		color: #999999;
		display: flex;
		margin-left: 31rpx;
		align-items: center;
	}

	.border1 {
		width: 26rpx;
		height: 26rpx;
		background: #0191A0;
		border-radius: 100%;
		margin-right: 11rpx;
	}

	.flexbnorder {
		display: flex;
		margin-top: 27rpx;
		margin-bottom: 22rpx;
		/* position: absolute; */
		/* 		right: 35rpx;
		top: 120rpx; */
		/* line-height: 26rpx; */
		/* width: 100%; */
		/* text-align: right;'' */
	}

	.border2 {
		width: 26rpx;
		height: 26rpx;
		border: 2rpx solid #DDDDDD;
		border-radius: 100%;
		margin-right: 11rpx;
	}

	.datika {
		/* margin-right: 272rpx; */
		font-size: 32px;
		font-weight: 500;
		color: #333333;
	}

	.clatop {
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* border-bottom: 2rpx solid #EAEAEA; */
		/* padding-bottom: 39rpx; */
		margin: 0 30rpx 0rpx;
	}

	.tanchu {
		/* width: 100%; */
		height: 1062rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		padding: 150rpx 0rpx 30rpx;
		overflow-y: scroll;
		position: relative;
	}

	.flwox {
		width: 100%;
		background: #FFFFFF;
		position: fixed;
		top: 0rpx;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
	}

	.datiImg {
		width: 26rpx;
		height: 26rpx;
	}

	.tigan {
		display: flex;
		margin-bottom: 40rpx;
		font-size: 28rpx;
	}

	.colo223 {
		color: rgba(1, 145, 160, 1);
	}

	.colo2ww {
		color: rgba(250, 100, 45, 1);
	}

	.colo2ww23 {
		color: #A3A3A3;
	}

	.right1-0 {
		margin-right: 10rpx;
	}

	.tishipsm {
		font-size: 30px;
		font-weight: bold;
		color: #333333;
		display: flex;
		align-items: center;
		margin-right: 15rpx;
		margin-left: 30rpx;
	}

	.leid {
		margin-right: 15rpx;
		white-space: nowrap;
	}

	.parsing-content {
		/* width: 690rpx; */
		/* height: 140rpx; */
		background: #FFFFFF;
		border-radius: 10rpx;
		padding: 35rpx 27rpx 36rpx 30rpx;
		margin-bottom: 30rpx;
	}

	.contetimg {
		max-width: 300rpx;
		max-height: 300rpx;
	}

	.felx3 {
		display: flex;
		align-items: center;
		font-size: 28px;
		font-weight: 500;
		color: #333333;
	}

	.answerText {
		font-size: 26px;
		font-weight: 500;
		color: #333333;
		margin-top: 15rpx;
	}

	.answerText2 {
		font-size: 26px;
		font-weight: 500;
		color: #333333;
		margin-bottom: 30rpx;
		display: flex;
	}




	.buttom {
		width: 93%;
		height: 120rpx;
		background: #FFFFFF;
		box-shadow: 0px 0rpx 20rpx 0rpx rgba(0, 0, 0, 0.3000);
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		bottom: 0;
		padding: 0 28rpx 18rpx;
	}

	.imgw {
		font-size: 24px;
		font-weight: 500;
		color: #333333;
		display: flex;
		align-items: center;
	}

	.datiicon {
		width: 30rpx;
		height: 30rpx;
		/* margin-bottom: 11rpx; */
		/* margin-right: 36rpx; */
	}

	.datiicon2 {
		width: 36rpx;
		height: 40rpx;
		margin-bottom: 11rpx;
	}

	.before_collection {
		width: 30rpx;
		height: 30rpx;
		margin-bottom: 18rpx;
	}

	.bijiicon {
		width: 41rpx;
		height: 44rpx;
		margin-bottom: 11rpx;
	}

	.button {
		width: 180rpx;
		height: 80rpx;
		background: #0191A0;
		border-radius: 10rpx;
		font-size: 32px;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.button2 {
		width: 180rpx;
		height: 80rpx;
		background: #0191A0;
		border-radius: 10rpx;
		font-size: 32px;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.button3 {
		width: 80rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: left;
	}

	.button3-img {
		width: 39rpx;
		height: 24rpx;
	}

	.blue {
		width: 6rpx;
		height: 30rpx;
		background: #0191A0;
		border-radius: 3rpx;
		margin-right: 16rpx;
	}

	.flex2 {
		display: flex;
		align-items: center;
		margin-bottom: 39rpx;
	}

	.parsing {
		padding: 30rpx 30rpx 0rpx;
		/* margin-bottom: 120rpx; */
	}

	.zhenqueicon {
		width: 56rpx !important;
		height: 56rpx;
		margin-right: 22rpx;
		/* padding: 8rpx; */
	}

	.tishipsmeicon {
		width: 30rpx;
		height: 31rpx;
		margin-left: 10rpx;
	}

	.flex {
		width: 100%;
		display: flex;
		align-items: center;
		margin-bottom: 41rpx;
		position: relative;
	}

	.theAnswer {
		width: 430rpx;
		margin-right: 25rpx;
		font-size: 30px;
		font-weight: 500;
		color: #132B2E;
	}

	.theAnswer2 {
		width: 430rpx;
		margin-right: 25rpx;
		font-size: 30px;
		font-weight: 500;
		color: #09BDAE;
	}

	.theAnswer3 {
		width: 430rpx;
		margin-right: 25rpx;
		font-size: 30px;
		font-weight: 500;
		color: #FA642D;
	}

	.border {
		width: 50rpx;
		height: 50rpx;
		/* border: 2rpx solid #DDDDDD; */
		/* border-radius: 100%; */
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 15rpx;
		font-size: 28px;
		font-weight: 500;
		color: #333333;
	}

	.borderDui {
		width: 50rpx;
		height: 50rpx;
		/* border-radius: 100%; */
		/* background: #09BDAE; */
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 25rpx;
		font-size: 32px;
		font-weight: 500;
		color: #000000;
		/* border: 2rpx solid #09BDAE; */
	}

	.borderCuo {
		width: 50rpx;
		height: 50rpx;
		/* background: #FA642D; */
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 25rpx;
		/* border-radius: 100%; */
		font-size: 32px;
		font-weight: 500;
		color: #000000;
		/* border: 2rpx solid #FA642D; */

	}

	.theTitle {
		height: auto;
		font-size: 32px;
		font-weight: bold;
		color: #333333;
		margin-top: 30rpx;
		margin-bottom: 29rpx;
		display: flex;
	}

	.color {
		font-size: 36rpx;
		margin-right: 10rpx;
		color: rgba(4, 146, 161, 1) !important;
	}

	.color2 {
		font-size: 30rpx;
		color: rgba(102, 102, 102, 1) !important;
	}

	.color23 {
		font-size: 30rpx;
		color: rgba(4, 146, 161, 1) !important;
	}

	.color24 {
		font-size: 30rpx;
		color: rgba(102, 102, 102, 1) !important;
	}

	.questions-title {
		display: flex;
		align-items: center;
		font-size: 26px;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
	}

	.biaoqian {
		width: auto;
		height: 38rpx;
		background: rgba(241, 89, 42, 0.1);
		border-radius: 6rpx;
		font-size: 24px;
		font-weight: 500;
		color: $uni-primary;
		display: flex;
		white-space: nowrap;
		align-items: center;
		padding: 5rpx 10rpx;
		justify-content: center;

	}

	.questions-center {
		margin: 30rpx 31rpx 0rpx;
		padding: 30rpx 23rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}

	.questions {
		padding-top: 169rpx;
		padding-bottom: 200rpx;
		background-color: rgba(247, 247, 247, 0.58);
		min-height: 100%;
	}

	.questions-top {
		width: 100%;
		height: 88rpx;
		/* padding-left: 30rpx; */
		/* padding-right: 30rpx; */
		padding-top: 80rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		top: 0;
		z-index: 99999;
		background-color: #FFFFFF;

		image {
			/* margin-left: 30rpx; */
			width: 19rpx;
			height: 34rpx;
		}

		.top-title {
			width: 301rpx;
			height: 71rpx;
			border: 1rpx solid #0191A0;
			border-radius: 6rpx;
			display: flex;
			align-items: center;
			/* justify-content: space-between; */
			margin-left: 95rpx;
			padding: 6rpx 7rpx;
		}

		.Answer {
			width: 150rpx;
			font-size: 28px;
			font-weight: 500;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #132B2E;
		}

		.Answer2 {
			width: 145rpx;
			height: 58rpx;
			background: #0191A0;
			border: 1rpx solid #0191A0;
			border-radius: 5rpx;
			font-size: 30px;
			font-weight: bold;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #FFFFFF;
		}

	}
</style>
