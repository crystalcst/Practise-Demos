var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var config = {
    entry: __dirname + "/src/app.js",
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    }, 
    devtool: 'eval-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        host: 'localhost',
        port: 8080,
        inline: true,//实时刷新
        hot: true,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(gif|png)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: '[path][name].[ext]',//path为相对于context的路径
                        context: 'src',
                        publicPath: function (url) {//返回最终的资源相对路径
                            return path.relative(distDir, url).replace(/\\/g, '/');
                        }
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('Crystal_cst版权所有，翻版必究'),
        new htmlWebpackPlugin({
            template: __dirname + "/src/app.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin()//热加载插件
    ],
};

module.exports = config;