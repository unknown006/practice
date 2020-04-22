const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackBaseConfig = function (NODE_ENV = 'development') {

    const webpackConfig = {
        // 定义入口文件
        entry: {
            app: path.resolve(__dirname, '../src/index.jsx'),
        },
        resolve: {
            // 自动补充后缀
            extensions: ['.js', '.jsx', '.scss', '.json'],
            // 定义路径别名
            alias: {
                '@api': path.resolve(__dirname, '../src/api'),
                '@assets': path.resolve(__dirname, '../src/assets'),
                '@components': path.resolve(__dirname, '../src/components'),
                '@views': path.resolve(__dirname, '../src/views'),
                '@store': path.resolve(__dirname, '../src/store'),
                '@router': path.resolve(__dirname, '../src/router'),
            }
        },
        module: {
            // 定义loader
            rules: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                loader: 'url-loader',
                query: {
                    limit: 5000,
                    name: '[name].[ext]?[hash:8]',
                    outputPath: 'images/',
                    // publicPath: config.publicPath,
                    // useRelativePath: false,
                }
            },
            {
                test: /\.(svg|ttf|eot|woff|woff2)$/,
                loader: 'url-loader',
                exclude: [
                    path.resolve(__dirname, '../src', '../src/assets', '../src/components'),
                ],
                query: {
                    limit: 5000,
                    name: '[name].[ext]?[hash:8]',
                    outputPath: 'fonts/',
                    // publicPath: config.publicPath,
                    // useRelativePath: false,
                }
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                include: [
                    path.resolve(__dirname, '../src', '../src/assets', '../src/components'),
                ],
                query: {
                    name: '[name]',
                    esModule: false,
                },
            }
            ]
        },
        // 添加插件
        plugins: [
            new HtmlWebpackPlugin({
                favicon: path.resolve(__dirname, '../public/favicon.ico'),
                template: path.resolve(__dirname, '../public/index.html'),
                filename: 'index.html',
                minify: true
            }),
        ]
    };

    return webpackConfig;
};

module.exports = webpackBaseConfig;
