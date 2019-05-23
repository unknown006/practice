const express=require('express');
const app=express();
const bodyParser=require('body-parser');

const multipart=require('connect-multiparty');
let multipartMiddleWare=multipart();

const fs=require('fs');
app.listen(3000,()=>{
    console.log('服务器启动成功');
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false,
}))
app.use(express.static('./public'))
app.get('/text',(req,res)=>{
    res.writeHead(200,{
        'Access-Control-Allow-Origin':'*',
        'Content-Type':'text/plain;charset=utf-8'
    })
    res.write("哈哈哈哈哈");
    res.end();
})
app.post('/uploadImg',multipartMiddleWare,(req,res)=>{
    let buf=Buffer.alloc(req.body.canvasImg.length,req.body.canvasImg);
    fs.writeFile(`./public/img/new_image.png`,buf,function(err){
        let obj={
            status:200,
            url:`http:localhost:3000/img/new_image.png`
        }
        if(err) throw err;
        res.writeHead(200,{
            'Access-Control-Allow-Origin':'*',
            'Content-Type':'application/json;charset=utf-8'
        })
        res.write(JSON.stringify(obj));
        res.end();
    })
})