const path=require('path')
const resolve= dir => path.join(__dirname,dir);
const publicPath = process.env.NODE_ENV === 'production' ?  '/test' : '/'
module.exports={
    publicPath,
    chainWebpack:config =>{
        config.resolve.alias
        .set('@',resolve('src'))
    },
    //打包时不生成.map 文件
    productionSourceMap:false,
    devServer:{
        port:8080,
        // proxy:'http://localhost:3000',
        proxy:{
            '/api':{
                target:'http://localhost:3000',
                pathRewrite:{
                    '^/api':''
                }
            }
        },
    }
}   