module.exports = {
    plugins: [
        // require('autoprefixer')({// 自动为css3属性添加前缀
        //     browsers: ['last 2 versions']
        // }), 
        require('postcss-import'),
        require('postcss-cssnext'),
        // require('postcss-px2rem')({
        //     remUnit: 75 //设计图的总宽度/10决定，表示1rem对应的px值
        // }),
        require('postcss-mixins')
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