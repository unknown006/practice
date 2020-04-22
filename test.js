// let arr=[{id:1},{id:2},{id:3}];

// let obj=arr.find((elem)=>{
//     return elem.id==1;
// })
// obj.test=20;
// console.log(arr);
// let b='back=%3A%2F%2Fapp2.baojunev.com%2F%23%2F%3s%31'
// let a=decodeURIComponent(b);
// console.log(a) 

// console.log(decodeURIComponent(decodeURIComponent('%253D')))

// let str1='w',str2='c',str3='f';
// switch(str1,str2,str3){
//     case 'w','c','f':
//         alert('成功')
//     break;
// }




// let obj = {
//     a: 1,
//     b: 2,
//     c: 3,
//     d: 4,
//     e: 5,
//     f: 6,
// };

// Object.prototype[Symbol.asyncIterator] = async function* () {
//     let that=this;
//     let i = 0;
//     //为了体现上面async的意义
//     for(let key in this){
//         await new Promise((resolve)=>{  
//             setTimeout(()=>{
//                 that[that[key]]=key; 
//                 resolve();
//             },1000)
//         })
//     }
//     //为了体现yield最终结果处于遍历器对象什么地方(value)
//     for (let key in this) {
//         yield new Promise((resolve)=>{
//             setTimeout(()=>{
//                 resolve([key, that[key]])
//             },500*i++)
//         })
//     }
// };

// (async function () {
//     let arr = [];
//     //for await 可以遍历promise对象列表并直接接收resolve中的参数
//     for await (let res of obj) {
//         let x=await res;
//         arr=[...arr,x]
//         console.log(x)
//     }
//     return arr;
// })().then((resArr) => {
//     console.log(resArr)
// })

// Object.prototype[Symbol.iterator]=function* (){
//     for(let key in this){
//         yield [key,this[key]];
//     }
// }

// (async function(){
//    let a= await new Promise((resolve)=>{
//         resolve(1)
//     })
//     let b=await new Promise((resolve)=>{
//         resolve(2)
//     })
//     return [a,b]
// })().then((res)=>{
//     console.log(res)
// });




// let arr=[1,2,3,4,5]
// let [a,b,...rest]=arr;
// let obj={a:1,b:2,c:3,d:4,e:5};
// let {a,c,...rest}=obj
// console.log(rest)

let list=[
    {id:1},
    {id:2},
    {id:3},
]
let obj=list.reduce((res,v)=>(res[v.id]=v,res),{})
console.log(obj)

console.log((a=1,a,2))