class Test{
    constructor(...arr){
        arr.forEach((elem)=>{
            Object.defineProperty(this,Symbol(),{
                value:elem,
                writable:false,
                enumerable:false,
                configurable:false,
            })
        })
        this.sum=this.getSum();
        this.factorial=this.getFactorial()
    }
    getSum(){
        let keys=Object.getOwnPropertySymbols(this);
        return keys.reduce((res,elem)=>{
            return res+this[elem];
        },0)
    }
    getFactorial(){
        let keys=Object.getOwnPropertySymbols(this);
        return keys.reduce((res,elem)=>{
            return res*this[elem];
        },1)
    }
}

let obj=new Test(1,2,3,4,5);
console.log(obj)