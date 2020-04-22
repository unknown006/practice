module.exports={
    publicPath:'./',
    devServer:{
        port:8080,
        open:true,
    }, 
    chainWebpack:config => {
        config.entry('main'),add('babel-polyfill')
    }
}