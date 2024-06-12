<template>
  <view style="width: 100%" class="cu-custom-dom">
    <view class="cu-custom" :style="[{ height: CustomBar + 'px' }]">
      <view
        class="cu-bar"
        :style="style"
        :class="[bgImage != '' ? 'none-bg text-white bg-img' : '', bgColor]"
      >
        <view class="action" @tap="BackPage" v-if="isBack">
          <text class="cuIcon-back"></text>
          <slot name="backText"></slot>
        </view>
        <view
          class="content"
          :style="[
            { top: StatusBar + 'px' },
            { fontWeight: fW },
            { fontSize: fS + 'rpx' },
          ]"
        >
          <slot name="content"></slot>
        </view>
        <view class="action">
          <slot name="right"></slot>
        </view>
      </view>
    </view>
  </view>


</template><script>
export default {
  data() {
    return {
      StatusBar: this.StatusBar,
      CustomBar: this.CustomBar,
    };
  },
  name: "cu-custom",
  computed: {
    style() {
      var StatusBar = this.StatusBar;
      var CustomBar = this.CustomBar;
      var bgImage = this.bgImage;
      var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
      if (this.bgImage) {
        style = `${style}background-image:url(${bgImage});`;
      }
      return style;
    },
  },
  props: {
    bgColor: {
      type: String,
      default: "",
    },
    fW: {
      type: String,
      default: "400",
    },
    fS: {
      type: String,
      default: "36",
    },
    isBack: {
      type: [Boolean, String],
      default: false,
    },
    bgImage: {
      type: String,
      default: "",
    },
    zidingyi: {
      type: Boolean,
      default: false,
    },
    zidingyiPath: {
      type: String,
      default: "/pages/index/home",
    },
  },
  methods: {
    BackPage() {
      if (this.zidingyi) {
        console.log("’自定义");
        if (this.zidingyiPath == "/pages/index/home") {
          uni.switchTab({
            url: this.zidingyiPath,
          });
        } else {
          uni.redirectTo({
            url: this.zidingyiPath,
          });
        }
      } else {
        uni.navigateBack({
          delta: 1,
        });
      }
    },
  },
};
</script>

<style scoped>
.cu-custom {
  width: 100%;
  height: 45rpx;
}
.cu-bar {
  height: 45rpx;
  position: fixed;
  top: 0rpx;
  background-color: #fff;
  width: 100%;
  z-index: 1000;
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
