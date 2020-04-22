
    // interface Test{
    //     firstName:string,
    //     lastName?:any,    //可有可无
    //     [propName:string]:string | number, //任意属性名

    // }
    import { Name } from './interface'
    let obj = { firstName:'Wang',lastName:'Chaofan',gender:'男' };
    function staticType(obj:Name={firstName:'wang',lastName:'hha'}){
        return `hello:'${obj.firstName} ${obj.lastName}-${obj.gender}'`
    }
    console.log(staticType(obj))

