var babelPolyfill = require("babel-polyfill");
var webpack = require("webpack");
var htmlWebpackPlugin = require("html-webpack-plugin");

var config = {
    mode: 'production',
    entry: ["babel-polyfill", __dirname + "/src/main.js"],
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: "./build",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg|png|jpg|jpeg|bmp)$/,
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
            },
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader', options: {
                            sourceMap: true,
                            localIdentName: '[local]_[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: 'postcss.config.js'  // 这个得在项目根目录创建此文件
                            }
                        }
                    },
                    {
                        loader: 'sass-loader', options: { sourceMap: true }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('Crystal_cst版权所有，翻版必究'),
        new htmlWebpackPlugin({
            template: __dirname + "/src/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin()//热加载插件
    ],
}
module.exports = config;