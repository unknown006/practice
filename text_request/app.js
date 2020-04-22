const express=require('express');
const app=express();
const bodyParser=require('body-parser');

const multipart=require('connect-multiparty');
let multipartMiddleWare=multipart();

const multer=require('multer');


let storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './img');
    },
    filename: function(req, file, cb) {
      cb(null, `${Date.now()}-${'AAAAAA'}`)
    }
  })
  
var upload = multer({ storage }).array('img', 2);

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
app.post('/uploadImg',(req,res)=>{
    upload(req,res,function(err){
        let obj={
            data:123,
            status:200,
        }
        res.writeHead(200,{
            'Access-Control-Allow-Origin':'*',
            'Content-Type':'application/json;charset=utf-8'
        })
        res.write(JSON.stringify(obj));
        res.end();
    });
})