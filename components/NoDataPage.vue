<template>
  <view>
    <view class="body">
      <image :src="noDataImg" class="img"></image>
    </view>
    <view class="title">
      {{ title }}
    </view>
  </view>


</template><script>
export default {
  props: ["title", "noDataImg"],
};
</script>

<style scoped lang="scss">
.body {
  width: 100%;
  margin-top: 165rpx;
  .img {
    display: block;
    margin: 0 auto;
    width: 314rpx;
    max-height: 290rpx;
  }
}
.title {
  font-size: 26rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: #999999;
  margin-top: 50rpx;
  text-align: center;
}
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