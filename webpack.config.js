var webpack = require("webpack");
var path = require("path");
var htmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextWebapckPlugin = require("extract-text-webpack-plugin"); //抽离css为独立的css文件
const StyleLintPlugin = require('stylelint-webpack-plugin');
// //打包时先删除旧文件插件
var CleanWebpackPlugin = require('clean-webpack-plugin');
// var UglifyJsPlugin = require('uglifyjs-webpack-plugin');//js压缩插件，webpack4.0以上运行npm run build会自动压缩所以不再需要此插件

module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname + "/dist",
        filename: "js/[name].[chunkhash].js"
    },
    devServer: { //配置此静态文件服务器，可以用来预览打包后项目
        contentBase: path.resolve(__dirname, 'dist'), //开发服务运行时的文件根目录
        host: 'localhost', //主机地址
        port: 7070, //端口号
        compress: true, //开发服务器是否启动gzip等压缩
        inline: true, //实时刷新
        historyApiFallback: true, //不跳转
        //open:true,
        //hot:true
    },
    module: {
        rules: [{
                test: /\.css$/,
                //loader: ['style-loader', 'css-loader', 'postcss-loader'], //生成页面内联样式，挂在head里的style
                use: ExtractTextWebapckPlugin.extract({ //生成独立的css文件
                        use: [{
                                loader: 'css-loader',
                                options: {
                                    //minimize: true, //css压缩
                                    mportLoaders: 1
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                // options: {
                                //     ident: 'postcss',
                                //     plugins: () => [
                                //         postcssPresetEnv( /* options */ )
                                //     ]
                                // }
                            }
                        ],
                        publicPath: '../' //解决css背景图的路径问题
                    }) //不再需要style-loader

            },
            //img图片
            {
                test: /\.(htm|html)$/i,
                loader: 'html-withimg-loader'
            },
            {
                test: /\.(png|gif|jpg|svg|jpeg)$/i,
                use: {
                    loader: 'file-loader',
                    query: {
                        name: 'images/[name]_[hash].[ext]'
                    }
                }
            },
            //presets:指定哪些代码转换器将启用babel
            {
                test: /\.js$/,
                loader: "babel-loader",
                //exclude:/node_modules/,//排除node_modules这个文件夹中的代码
                //include:/(admin|consumer)//表示只针对这两个文件夹中的代码进行打包
                //include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）
                exclude: /node_modules/
            },
            { //json-loader
                test: /\.json$/,
                use: 'json-loader'
            }
            // {
            //     test: require.resolve('jquery'),
            //     loader: 'expose-loader?jQuery!expose-loader?$'
            // },
            // {
            //     test: require.resolve('jquery'),
            //     loader: 'expose-loader?jQuery!expose-loader?$!expose-loader?scrollable'
            // },
        ]
    },
    plugins: [
        //产出html
        new htmlWebpackPlugin({
            title: "this is 模板",
            template: path.resolve(__dirname, 'src', 'index.html'), //模板
            filename: 'index.html',
            hash: true, //防止缓存
            //inject: "head",
            minify: {
                removeAttributeQuotes: true //压缩 去掉引号
            }
        }),
        //生成独立的css文件，括号里要生成的css路径和名,配合着css文件使用
        new ExtractTextWebapckPlugin('css.css'),
        //new Webpack.HotModuleReplacementPlugin() //调用webpack的热更新插件



        new CleanWebpackPlugin(
            ['dist/js/*.js', 'dist/index.*.html'], //要删除的文件目录匹配
            {
                root: __dirname, //根目录
                verbose: true, //开启在控制台输出信息
                dry: false　 //启用删除文件
            }
        ),

        new StyleLintPlugin(options),

        // new StyleLintPlugin({
        //     context: "src",
        //     configFile: path.resolve(__dirname, './stylelint.config.js'),
        //     files: '**/*.css',
        //     failOnError: false,
        //     quiet: true,
        //     syntax: 'less'
        // })

    ]
};