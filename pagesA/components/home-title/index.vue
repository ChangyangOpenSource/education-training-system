
/**
* 首页模块 title
*/
<template>
    <view :class="{titleRow:types!=2,titleRow2:types==2, titleRow09:type==6}">
        <view class="title-left blue-line" :class="{'yellow-line' : type == '2','deep-blue-line' : type == '3','deep-yellow-line' : type == '4'}">
            {{title}}
        </view>
        <view class="title-right" v-if="showListen" @click="onMore">
            更多预告 >
        </view>
    </view>


</template><script>
export default {
  props: {
    showListen: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: '2' // 1 蓝色  2  黄色 3 深蓝
    },
	types: {
	  type: String,
	  default: '0' // 1 蓝色  2  黄色 3 深蓝
	},
  },
  methods: {
    onMore(){
      this.$emit('onMore')
    }
  },
}
</script>

<style scoped lang="scss">
.titleRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30rpx;
  padding-top: 40rpx;

  .title-left {
    font-size: 34rpx;
    color: #333333;
    font-weight: bold;
  }

  .blue-line {
    position: relative;

    // &::before {
    //   content: "";
    //   width: 6rpx;
    //   height: 30rpx;
    //   border-radius: 4rpx;
    //   position: absolute;
    //   background: linear-gradient(0deg, #2bddea, #16f2f9);
    //   left: -20rpx;
    //   top: 8rpx;
    //   z-index: 10;
    // }

    // &::after {
    //   content: "";
    //   width: 100%;
    //   height: 14rpx;
    //   background: linear-gradient(90deg, #cbeff1 0%, #c7f3f4 100%);
    //   border-radius: 50%;
    //   position: absolute;
    //   left: 0;
    //   bottom: 0;
    //   right: 0;
    //   z-index: -1;
    // }
  }

  .yellow-line {
    position: relative;

    // &::before {
    //   background: linear-gradient(0deg, #fbb752, #fee94c);
    // }

    // &::after {
    //   background: linear-gradient(90deg, #f5e6d1 0%, #f5f1cf 100%);
    // }
  }
  .deep-blue-line {
    position: relative;

    // &::before {
    //   background: linear-gradient(0deg, #4682FE, #5F93FF);
    // }

    // &::after {
    //   background: linear-gradient(90deg, #CDDAF5 0%, #C3D3F5 100%);
    // }
  }
  .deep-yellow-line{
     position: relative;

    // &::before {
    //   background: linear-gradient(0deg, #FD7682, #FF8624);
    // }

    // &::after {
    //   background: linear-gradient(90deg, #F5DADD 0%, #F5DDC9 100%);
    // }
  }

  .title-right {
    font-size: 26rpx;
    color: #999999;
  }
}

.titleRow2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  // padding: 0 30rpx;
  // padding-top: 30rpx;

  .title-left {
    font-size: 34rpx;
    color: #333333;
    font-weight: bold;
    margin-left: 20rpx;
  }

  .blue-line {
    position: relative;

    // &::before {
    //   content: "";
    //   width: 6rpx;
    //   height: 30rpx;
    //   border-radius: 4rpx;
    //   position: absolute;
    //   background: linear-gradient(0deg, #2bddea, #16f2f9);
    //   left: -20rpx;
    //   top: 8rpx;
    //   z-index: 10;
    // }

    // &::after {
    //   content: "";
    //   width: 100%;
    //   height: 14rpx;
    //   background: linear-gradient(90deg, #cbeff1 0%, #c7f3f4 100%);
    //   border-radius: 50%;
    //   position: absolute;
    //   left: 0;
    //   bottom: 0;
    //   right: 0;
    //   z-index: -1;
    // }
  }
  
  .titleRow09 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    // padding: 0 30rpx;
    // padding-top: 30rpx;
  
    .title-left {
      font-size: 34rpx;
      color: #333333;
      font-weight: bold;
      margin-left: 20rpx;
    }
  
    }

  .yellow-line {
    position: relative;

    // &::before {
    //   background: linear-gradient(0deg, #fbb752, #fee94c);
    // }

    // &::after {
    //   background: linear-gradient(90deg, #f5e6d1 0%, #f5f1cf 100%);
    // }
  }
  .deep-blue-line {
    position: relative;

    // &::before {
    //   background: linear-gradient(0deg, #4682FE, #5F93FF);
    // }

    // &::after {
    //   background: linear-gradient(90deg, #CDDAF5 0%, #C3D3F5 100%);
    // }
  }
  .deep-yellow-line{
     position: relative;

    // &::before {
    //   background: linear-gradient(0deg, #FD7682, #FF8624);
    // }

    // &::after {
    //   background: linear-gradient(90deg, #F5DADD 0%, #F5DDC9 100%);
    // }
  }

  .title-right {
    font-size: 26rpx;
    color: #999999;
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