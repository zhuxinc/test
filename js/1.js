/*
    原生js
    第三方库：用原生JS将常用的功能按照一定的逻辑封装起来，方便快速开发
    常见的库：jQuery  Prototype  YUI MoolTool...
    getElementById  getElementByTagName   getElementByClassName   设置（设置）样式

*/
//库对象
function Base(){
    this.else=[];//数组  保存节点对象
}

//根据ID查找节点对象
Base.prototype.getId=function(id){
    var o=document.getElementById(id);
    this.else.push(o);
    return this;//返回当前对象，目的为了连缀（调用当前对象的其他方法）
};

//根据TagName查找节点对象
Base.prototype.getTag=function(TagName){
    var os=document.getElementsByTagName(TagName);
    for(var i=0;i<os.length;i++){
        this.else.push(os[i]);
    }
    return this;
}

//根据ClssName修改节点对象
Base.prototype.getClass=function(cls){
    var os=document.getElementsByClassName(cls);
    for(var i=0;i<os.length;i++){
        this.else.push(os[i]);
    }
    return this;
}
//修改样式  property 样式名  value  样式值
Base.prototype.css=function(property,value){
    //遍历节点对象
    for(var i=0;i<this.else.length;i++){
        this.else[i].style[property]=value;
    }
    return this;
}

// var Base={
//     getId:function(id){
//         var o=document.getElementById(id);//查找节点对象
//         // return o;
//         return this;//返回当前对象，目的是为了连缀
//     },
//     getTagName:function(TagName){
//         var os=document.getElementsByTagName(TagName);
//         return os;
//     },
//     getClass:function(ClassName){
//         var os=document.getElementsByClassName(ClassName);
//         return os;
//     },
//     css:function(property,value){
        
//     }
// }