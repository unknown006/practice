// interface Test{
//     firstName:string,
//     lastName?:any,    //可有可无
//     [propName:string]:string | number, //任意属性名
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var obj = { firstName: 'Wang', lastName: 'Chaofan', gender: '男' };
    function staticType(obj) {
        if (obj === void 0) { obj = { firstName: 'wang', lastName: 'hha' }; }
        return "hello:'" + obj.firstName + " " + obj.lastName + "-" + obj.gender + "'";
    }
    console.log(staticType(obj));
});
