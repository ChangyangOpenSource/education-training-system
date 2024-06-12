<template>
  <view class="majorCon">
    <view class="listCon">
      <view class="titleCon">医学考研 {{ _num }}</view>
      <view class="myRadioCon">
        <view
          v-for="(item, index) in items"
          :key="index"
          class="myRadio"
          :class="{ active: _num == item.value }"
          @click="radioChange(item.value)"
        >
          {{ item.name }}
        </view>
      </view>
    </view>
    <!-- <view class="listCon">
			<view class="titleCon">医学考研</view>
			<view class="myRadioCon">
				<view v-for="(item,index) in items" :key="index" :data-num="item.value" :class="['myRadio' , _num === item.value ? 'active' : '']"  @click="radioChange">
					{{item.name}}
				</view>
			</view>
		</view>
		<view class="listCon">
			<view class="titleCon">医学考研</view>
			<view class="myRadioCon">
				<view v-for="(item,index) in items" :key="index" :data-num="item.value" :class="['myRadio' , _num === item.value ? 'active' : '']"  @click="radioChange">
					{{item.name}}
				</view>
			</view>
		</view> -->
		<view v-show='loginAss' class="back-tankuang">
			<login class="loginw" @guanbi='guanbi' />
		</view>
  </view>


</template><script>
export default {
  components: {},
  data() {
    return {
		loginAss: getApp().globalData.loginAss,
      _num: 1,
      items: [
        {
          value: 1,
          name: "西医-专硕",
        },
        {
          value: 2,
          name: "西医-专硕",
        },
        {
          value: 3,
          name: "西医-专硕",
        },
        {
          value: 4,
          name: "西医-专硕",
        },
        {
          value: 5,
          name: "西医-专硕",
        },
        {
          value: 6,
          name: "西医-专硕",
        },
        {
          value: 7,
          name: "西医-专硕",
        },
      ],
    };
  },
  onLoad: function () {},
  methods: {
	  guanbi(value) {
	  	this.loginAss = value
	  },
    radioChange(val) {
      this._num = val;
      console.log(this._num);
      // this.$forceUpdate()
    },
  },
};
</script>

<style scoped lang="scss">
.majorCon {
  margin-top: 100rpx;
  width: 100%;

  .listCon {
    padding: 35rpx 30rpx;

    .titleCon {
      background-image: url($fileBaseUrl+"/ykstatic/titleBg.png");
      background-size: 100%;
      padding: 0 5rpx 15upx 20upx;
      width: 160rpx;
      height: 40rpx;
      line-height: 35rpx;
      font-size: 34rpx;
      font-weight: bold;
      color: #333333;
    }

    .myRadioCon {
      display: flex;
      flex-wrap: wrap;

      .myRadio {
        display: flex;
        margin-top: 29rpx;
        justify-content: center;
        align-items: center;
        width: 206rpx;
        height: 70rpx;
        border: 2rpx solid #dddddd;
        border-radius: 35rpx;
        margin-right: 36rpx;
      }
      .myRadio:nth-of-type(3n + 3) {
        margin-right: 0rpx;
      }
      .active {
        background-color: #e3ecff;
        border: 2rpx solid #3b7bff;
        color: #3b7bff;
      }
    }
  }
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
