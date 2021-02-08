const port = 8888;

module.exports = {
  lintOnSave: false,
  devServer: {
    port,
    open: true,
    host: "localhost", // 搞不懂一定要配置这个才可以热更新
    proxy: {
      '/api/': {
        target: 'http://localhost:4000',
        changeOrigin: true
      }
    }
  },
  chainWebpack: config => {
    config.resolve.symlinks(true); // 修复热更新失效
  },
  // 插件默认值
  // pluginOptions: {
  //   primary: {
  //     routeMatchPath: 'views',
  //     fileSavePath: './src/router/route.config.js',
  //     generateMenu: false,
  //     excludeFolder: 'api, hooks, components, utils, services'
  //   }
  // }
};
