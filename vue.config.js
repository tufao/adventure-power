const path = require('path');
const ROOT_DIR = path.join(__dirname);

module.exports = {
    publicPath: './',

    configureWebpack: {
        stats: {warnings: false},

        resolve: {
            modules: [
            ],
            alias: {
                '@static': path.resolve(path.join(ROOT_DIR, './static'))
            },
        }
    },

    chainWebpack: config => {
        config.module
          .rule('ts')
          .use('ts-loader')
            .loader('ts-loader')
            .tap(options => {
                options.configFile = 'tsconfig.webpack.json';
                return options;
            })
            .end()
      }
}
