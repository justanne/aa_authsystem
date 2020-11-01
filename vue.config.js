const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './dist' : '/'
}

module.exports = {
  chainWebpack: config => {
     config.module
      .rule('pug')
      .test(/\.pug$/)
      .use('pug-plain-loader')
        .loader('pug-plain-loader')
       .end()

      config.module
      .rule('eslint')
      .use('eslint-loader')
        .tap(options => {
          options.rules = {
            'no-console': isProd ? 'error' : 'off'
          }
          return options
        })
  }
}