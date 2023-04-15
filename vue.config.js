const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = ({
  devServer: {
    host: '0.0.0.0',
    //这个是前端的端口
    // 访问 http://localhost:8081/dev-api/captchaImage，浏览器请求显示的URL地址
    port: 8081,
    proxy: {
      //匹配到了这个 【xx】，进行转发
      [process.env.VUE_APP_BASE_API]: {
        //换发的后端服务器的地址，转发后台访问的是  http://localhost:8080/dev-api/captchaImage
        target: "http://localhost:8080",
        changeOrigin: true,
        pathRewrite: {
          //"^"表示匹配字符串的开头,匹配成功之后，变成 ‘’  （空）（/dev-api）
          //因为这里匹配路径，进行了重写
          //真正访问的路径是  http://localhost:8008/captchaImage
          ["^" + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
  configureWebpack:  {
    resolve: {
      fallback: {
        fs: false,
        crypto: require.resolve("crypto-browserify")
      }
    },
    plugins: [new NodePolyfillPlugin()],
  },
  chainWebpack(config) {

    //svg-icon 图标的加载显示的设置
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
})


