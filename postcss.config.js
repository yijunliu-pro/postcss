module.exports = {
    plugins: [
        // require('autoprefixer')({// 自动为css3属性添加前缀
        //     browsers: ['last 2 versions']
        // }), 
        require('postcss-import'),
        require('postcss-cssnext'),
        require('postcss-pxtorem')({
            rootValue: 16,
            unitPrecision: 5,
            propList: ['font', 'font-size', '!width'], //可以从px更改为rem的属性,'*'通配符表示所有
            selectorBlackList: [], //要忽略的选择器并保留为px
            replace: true,
            mediaQuery: false, //允许在媒体查询中转换px
            minPixelValue: 0 //设置要替换的最小像素值
        }),
        require('postcss-mixins'),
        // require('postcss-cssnano')({
        //     autoprefixer: false //设置该插件为关闭状态
        // }),
        //require('postcss-sprites')({}),
        // 
    ]
}


// module.exports = {
//     plugins: {
//         'postcss-import': {},
//         'postcss-cssnext': {
//             browsers: ['last 2 versions', '> 5%'],
//         },
//     },
// };