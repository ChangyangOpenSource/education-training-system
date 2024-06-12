const path = require('path')
module.exports = {
  parser: 'postcss-comment',
  plugins: {
    'postcss-import': {
      resolve(id, basedir, importOptions) {
        if (id.startsWith('~@/')) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substr(3))
        } else if (id.startsWith('@/')) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substr(2))
        } else if (id.startsWith('/') && !id.startsWith('//')) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substr(1))
        }
        return id
      }
    },
    'autoprefixer': {
      overrideBrowserslist: ["Android >= 4", "ios >= 8"],
      remove: process.env.UNI_PLATFORM !== 'h5'
    },
    // 借助postcss-px-to-viewport插件，实现rpx转px，文档：https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md
    // 以下配置，可以将rpx转换为1/2的px，如20rpx=10px，如果要调整比例，可以调整 viewportWidth 来实现
    'postcss-px-to-viewport': {
      unitToConvert: 'px', // 需要转换的单位
      viewportWidth: 750,
      unitPrecision: 1,
      propList: ['*'],
      fontViewportUnit: 'rem', // 字体需要转成的单位，只针对 font-size 属性
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: undefined,
      include: undefined,
      landscape: false
    },
    '@dcloudio/vue-cli-plugin-uni/packages/postcss': {}
  }
}
