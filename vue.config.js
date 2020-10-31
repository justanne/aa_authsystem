module.exports = {
  chainWebpack: config => {
     config.module
      .rule('pug')
      .test(/\.pug$/)
      .use('pug-plain-loader')
        .loader('pug-plain-loader')
       .end()
      config.module
      .rule('stylus')
      .test(/\.styl(us)?$/)
      .use('stylus-loader')
        .loader('vue-loader','stylus-loader')
       .end()
  }
}