// vue.config.js
const path = require('path');

module.exports = {
    publicPath: './',
    assetsDir: 'assets/',
    outputDir: 'www/web', // 输出
    transpileDependencies: ['vuetify'], // IE11 兼容 vuetify
    lintOnSave: false, // eslint
    runtimeCompiler: false, // 运行时编译
    parallel: require('os').cpus().length > 1, // babel或Typescript使用thread-loader
    // 开发本地服务器
    devServer: {
        https: false, // 设置前端https进行访问
        port: 9000, // 固定开发服务端口
        overlay: {
            warning: false,
            errors: false
        },
    },
    // css
    css: {
        sourceMap: true
    },
    // 多页面
    pages: {
        index: {
            entry: 'web/src/main.js',
            template: 'web/public/index.html',
            filename: 'index.html',
            title: '接口文档 | Node Turf',
            favicon: path.join(__dirname, 'web/public/favicon.ico')
        }
    },
    // 额外修改或添加webpack配置
    configureWebpack: {
        module: {
            rules: [{
                test: /\.s(c|a)ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        // Requires sass-loader@^7.0.0
                        // options: {
                        //     implementation: require('sass'),
                        //     indentedSyntax: true // optional
                        // },
                        // Requires >= sass-loader@^8.0.0
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                indentedSyntax: true // optional
                            },
                        },
                    },
                ],
            },],
        }
    },
    // webpack链式操作，细粒度控制配置
    chainWebpack: (config) => {
        config.cache(true); // 设置缓存,加快项目启动时间
    }
};
