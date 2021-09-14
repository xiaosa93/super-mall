module.exports = {
    configureWebpack:{
        resolve:{
            alias:{
                // 内部已经将@配置为src
                'assets':'@/assets',
                'common':'@/common',
                'network':'@/network',
                'components':'@/components',
                'views':'@/views',
            }
        }
    }
}
