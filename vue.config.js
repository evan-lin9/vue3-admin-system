const port = 8888;

module.exports = {
  lintOnSave: false,
  devServer: {
    port,
    open: true,
    host: "localhost" // 搞不懂一定要配置这个才可以热更新
  },
  chainWebpack: config => {
    config.resolve.symlinks(true); // 修复热更新失效
  }
};
